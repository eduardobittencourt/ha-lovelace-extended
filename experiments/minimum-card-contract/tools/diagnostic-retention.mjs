import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {startRun,checkSpace} from './diagnostic-common.mjs';
import {heapGraph} from './diagnostic-heap.mjs';
const {common,output,json,save}=await startRun();
const {chromium}=await import('playwright');
const browser=await chromium.launch();
const summaries=[];
try{
 const context=await browser.newContext();const page=await context.newPage();
 const cdp=await context.newCDPSession(page);await cdp.send('HeapProfiler.enable');
 const version=await cdp.send('Browser.getVersion');
 assert.equal(version.product,'HeadlessChrome/159.0.8154.6');assert.equal(version.jsVersion,'15.9.128.1');
 await json('protocol',{phase:'bounded retained-byte calibration; not acceptance',version,
  sourceHashes:Object.fromEntries(await Promise.all(['tools/diagnostic-retention.mjs','tools/diagnostic-heap.mjs'].map(async p=>[p,createHash('sha256').update(await readFile(p)).digest('hex')]))),
  size:'Sum of self_size for strong-reachable nodes disconnected by removal of owner vertex; candidate only',
  controls:['harness only','retained payload','debugger-only root','released debugger group','shared payload','ephemeron key/value'],
  stop:'One default pilot and at most one exposeInternals revision; full campaign only if every ownership control calibrates',
  references:['https://github.com/v8/v8/blob/15.9.128.1/include/js_protocol.pdl','https://github.com/v8/v8/blob/15.9.128.1/include/v8-profiler.h']});
 async function snapshot(name,exposeInternals){
  await checkSpace(output);await cdp.send('HeapProfiler.collectGarbage');
  const chunks=[];let bytes=0;
  const listener=({chunk})=>{bytes+=Buffer.byteLength(chunk);assert.ok(bytes<128*1024**2,'Snapshot exceeds pilot size cap');chunks.push(chunk);};
  cdp.on('HeapProfiler.addHeapSnapshotChunk',listener);
  try{await cdp.send('HeapProfiler.takeHeapSnapshot',{exposeInternals});}finally{cdp.off('HeapProfiler.addHeapSnapshotChunk',listener);}
  const raw=chunks.join('');await checkSpace(output);
  await writeFile(resolve(output,name+'.heapsnapshot.gz'),gzipSync(raw),{flag:'wx',mode:0o600});
  const graph=heapGraph(JSON.parse(raw));
  const owners=graph.nodes.filter(n=>n.type==='object'&&n.name==='MccDiagnosticOwner');
  const keys=graph.nodes.filter(n=>n.type==='object'&&n.name==='MccDiagnosticKey');
  const item={name,exposeInternals,snapshotBytes:bytes,owners:owners.map(n=>({shallowBytes:n.bytes,...graph.exclusive(n.index)})),
   keys:keys.map(n=>({shallowBytes:n.bytes,...graph.exclusive(n.index)}))};
  await save('heap-control',item);return item;
 }
 for(const exposeInternals of [false,true]){
  const prefix=exposeInternals?'revision':'pilot';
  await page.goto('about:blank');
  await page.evaluate(()=>{
   globalThis.MccDiagnosticOwner=class MccDiagnosticOwner{constructor(){this.payload=Array.from({length:4096},(_,i)=>i);}};
   globalThis.MccDiagnosticKey=class MccDiagnosticKey{};
  });
  const baseline=await snapshot(prefix+'-harness',exposeInternals);
  await page.evaluate(()=>{globalThis.mccOwner=new MccDiagnosticOwner();});
  const retained=await snapshot(prefix+'-retained',exposeInternals);
  const handle=await cdp.send('Runtime.evaluate',{expression:'globalThis.mccOwner',objectGroup:'mcc-calibration',returnByValue:false});
  assert.ok(handle.result.objectId);
  await page.evaluate(()=>{delete globalThis.mccOwner;});
  const debuggerRoot=await snapshot(prefix+'-debugger-root',exposeInternals);
  await cdp.send('Runtime.releaseObjectGroup',{objectGroup:'mcc-calibration'});
  const released=await snapshot(prefix+'-released',exposeInternals);
  await page.evaluate(()=>{globalThis.mccOwner=new MccDiagnosticOwner();globalThis.mccShared=mccOwner.payload;});
  const shared=await snapshot(prefix+'-shared',exposeInternals);
  await page.evaluate(()=>{delete globalThis.mccOwner;delete globalThis.mccShared;globalThis.mccKey=new MccDiagnosticKey();globalThis.mccMap=new WeakMap([[mccKey,new MccDiagnosticOwner()]]);});
  const ephemeron=await snapshot(prefix+'-ephemeron',exposeInternals);
  await page.evaluate(()=>{delete globalThis.mccKey;});
  const ephemeronReleased=await snapshot(prefix+'-ephemeron-released',exposeInternals);
  const checks={harness:baseline.owners.length===0,retained:retained.owners.length===1&&retained.owners[0].bytes>=4096*4,
   debuggerRoot:debuggerRoot.owners.length===1,released:released.owners.length===0,
   sharedExclusion:shared.owners.length===1&&shared.owners[0].bytes<4096*4,
   ephemeronAttribution:ephemeron.owners.length===1&&ephemeron.keys.length===1&&ephemeron.keys[0].bytes>=4096*4,
   ephemeronRelease:ephemeronReleased.owners.length===0};
  const item={exposeInternals,checks,controls:[baseline,retained,debuggerRoot,released,shared,ephemeron,ephemeronReleased]};
  summaries.push(item);await save('calibration',item);
  if(Object.values(checks).every(Boolean))break;
 }
 const calibrated=summaries.some(s=>Object.values(s.checks).every(Boolean));
 await json('calibration',{version,calibrated,summaries,
  boundary:'Candidate exclusive strong-edge snapshot bytes; shallow size and retained graph are distinguished; no renderer-global subtraction',
  next:calibrated?'Review calibration and freeze attribution before repeated card lifecycle series':'Unsupported: strong-edge traversal failed ownership calibration. Require validated ephemeron-aware/embedder dominator semantics before retained-byte acceptance; do not run the full lifecycle byte series.',
  acceptance:'pending; no numerical budget approved'});
 console.log(JSON.stringify({calibrated,checks:summaries.map(s=>s.checks)}));
}finally{await browser.close();}
