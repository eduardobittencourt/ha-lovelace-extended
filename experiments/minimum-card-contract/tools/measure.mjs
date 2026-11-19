import assert from 'node:assert/strict';
import {performance as hostClock} from 'node:perf_hooks';
import {setTimeout as delay} from 'node:timers/promises';
import {appendFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {openHA,createPage,ws,result,base,area} from './common.mjs';
import {prepare,ready,metrics,fixture} from './workloads.mjs';
const {browser,page:control,auth}=await openHA();
const samples=[],interactions=[],updates=[],lifecycle=[],editors=[];
const diagnostic=process.argv.includes('--diagnostics');
const delta=(after,before,key)=>(after[key]-before[key])*1000;
async function save(){await result(diagnostic?'diagnostic-captures':'performance-captures',{samples,interactions,updates,lifecycle,editors});}
async function log(type,data){await appendFile(resolve(area,'measurements.ndjson'),JSON.stringify({type,...data})+'\n');}
async function capture(page,cdp,variant,count,trial,cache){
 const before=await metrics(cdp);
 if(cache==='cold')await page.goto(base+'/mcc-experiment/bench');else await page.reload();
 await ready(page,variant,count);
 const after=await metrics(cdp);
 const data=await page.evaluate(()=>{
  const navigation=performance.getEntriesByType('navigation')[0];
  const resources=performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,encoded:r.encodedBodySize,decoded:r.decodedBodySize,duration:r.duration}));
  return {usableMs:performance.now(),documentTransfer:navigation.transferSize,resources};
 });
 const custom=data.resources.filter(x=>x.path.includes('/minimum-card-contract/'));
 const sample={variant,count,trial,cache,usableMs:data.usableMs,transferBytes:data.documentTransfer+data.resources.reduce((a,x)=>a+x.transfer,0),experimentTransferBytes:custom.reduce((a,x)=>a+x.transfer,0),experimentDecodedBytes:custom.reduce((a,x)=>a+x.decoded,0),scriptMs:after.ScriptDuration*1000,taskMs:after.TaskDuration*1000,executionCounter:'post-navigation CDP totals; navigation resets counters',heapBytes:after.JSHeapUsedSize,resources:data.resources};
 assert.ok(Number.isFinite(sample.usableMs)&&sample.usableMs>0);
 assert.ok(sample.scriptMs>=0 && sample.taskMs>=0);
 assert.equal(custom.length>0,variant==='experimental');
 samples.push(sample);await log('load',sample);await save();
 console.log('CAPTURE',variant,count,trial,cache,Math.round(sample.usableMs)+'ms');
}
async function actionSamples(page,variant,count){
 const button=variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').first():page.locator('hui-tile-card').first().getByRole('button').first();
 await page.evaluate(()=>{
  document.addEventListener('pointerdown',()=>{globalThis.mccInputStart=performance.now();},{capture:true});
 });
 const observations=[];
 for(let n=0;n<30;n++){
  await page.evaluate(()=>{mccRecorder.reset();globalThis.mccInputStart=undefined;});
  await button.click();await page.waitForFunction(()=>mccRecorder.events.length===1);
  observations.push(await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>resolve({intentMs:mccRecorder.events[0].time-mccInputStart,nextFrameMs:performance.now()-mccInputStart,target:mccRecorder.events[0].target})))));
  assert.equal(observations.at(-1).target,fixture.a_target);
 }
 const item={variant,count,observations,method:'Pointerdown to local intercepted intent; next animation-frame opportunity after driver observes intent. Includes polling/automation delay; not compositor paint, transport or physical timing.'};
 interactions.push(item);await log('interactions',item);await save();
}
async function updateSamples(page,cdp,variant,count){
 const state=await control.evaluate(id=>document.querySelector('home-assistant').hass.states[id],fixture.a_source);
 const headers={'Authorization':'Bearer '+auth.access_token,'Content-Type':'application/json'};
 for(const kind of ['relevant','unrelated'])for(const hz of [1,20]){
  const seconds=hz===1?60:10, total=hz*seconds;
  const id=kind==='relevant'?fixture.a_source:'input_number.mcc_unrelated';
  const before=await metrics(cdp),start=hostClock.now();
  let late=0;
  for(let i=0;i<total;i++){
   const wait=start+i*1000/hz-hostClock.now();if(wait>0)await delay(wait);else if(wait < -1000/hz)late++;
   const response=await fetch(`${base}/api/states/${id}`,{method:'POST',headers,body:JSON.stringify({state:String((i+1)%99),attributes:state.attributes})});
   assert.ok(response.ok);
  }
  const remain=start+seconds*1000-hostClock.now();if(remain>0)await delay(remain);
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const after=await metrics(cdp);
  const item={variant,count,kind,hz,seconds,updates:total,elapsedMs:hostClock.now()-start,late,scriptMs:delta(after,before,'ScriptDuration'),taskMs:delta(after,before,'TaskDuration')};
  updates.push(item);await log('updates',item);await save();console.log('UPDATES',variant,count,kind,hz+'Hz');
 }
 await fetch(base+'/api/states/'+fixture.a_source,{method:'POST',headers,body:JSON.stringify({state:'21.0',attributes:state.attributes})});
 await fetch(base+'/api/states/input_number.mcc_unrelated',{method:'DELETE',headers});
}
async function diagnostics(page,cdp,variant,count){
 const selector=variant==='experimental'?'minimum-card-contract':'hui-tile-card';
 await page.locator(selector).evaluateAll(cards=>{globalThis.mccCycleNodes=cards;globalThis.mccCycleParents=cards.map(c=>({parent:c.parentNode,next:c.nextSibling}));});
 const readings=[];
 const snap=async(cycle)=>{
  await cdp.send('HeapProfiler.collectGarbage');
  const m=await metrics(cdp),dom=await cdp.send('Memory.getDOMCounters');
  return {cycle,heapBytes:m.JSHeapUsedSize,...dom};
 };
 readings.push(await snap(0));
 const resourceCounts=[];
 for(let cycle=1;cycle<=50;cycle++){
  const removed=await page.evaluate(()=>{for(const card of mccCycleNodes)card.remove();return mccCycleNodes.map(c=>c.ownedResources??null);});
  if(variant==='experimental')assert.ok(removed.every(x=>Object.values(x).every(v=>v===0)));
  resourceCounts.push(removed);
  await page.waitForTimeout(100);
  await page.evaluate(()=>mccCycleNodes.forEach((c,i)=>{const p=mccCycleParents[i];p.parent.insertBefore(c,p.next?.parentNode===p.parent?p.next:null);}));
  await page.waitForTimeout(100);
  if(cycle%10===0)readings.push(await snap(cycle));
 }
 await page.evaluate(()=>mccRecorder.reset());
 const button=variant==='experimental'?page.locator(selector).first().locator('button').first():page.locator(selector).first().getByRole('button').first();
 await button.click();await page.waitForFunction(()=>mccRecorder.events.length===1);
 const item={variant,count,cycles:50,settleMs:100,readings,ownedAfterRemoval:variant==='experimental'?resourceCounts:'Native ownership not exposed; global diagnostic counters only',singleDispatch:await page.evaluate(()=>mccRecorder.events.length),limitations:'Same nodes are intentionally retained and reinserted; forced GC and renderer-global DOM/heap counters are diagnostic and may include shared HA work. No proof of absence of all leaks.'};
 lifecycle.push(item);await log('lifecycle',item);await save();
 // Separate real editor loading from load/update timing and lifecycle diagnostics.
 for(const phase of ['first_open','same_document_reopen']){
  const before=await page.evaluate(()=>performance.now());const m1=await metrics(cdp);
  await page.getByRole('button',{name:'Edit dashboard',exact:true}).click();
  await page.getByRole('button',{name:'Edit',exact:true}).last().press('Enter');
  await page.getByRole('button',{name:'Cancel',exact:true}).waitFor();
  if(variant==='experimental')await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
  else await page.locator('hui-tile-card-editor').evaluate(element=>element.updateComplete);
  const readyMs=await page.evaluate(()=>performance.now());
  await page.waitForTimeout(200);const m2=await metrics(cdp);
  const resources=await page.evaluate(start=>performance.getEntriesByType('resource').filter(x=>x.startTime>=start).map(x=>({path:new URL(x.name).pathname,transfer:x.transferSize,decoded:x.decodedBodySize})),before);
  const item={variant,count,phase,readyMs:readyMs-before,scriptMs:delta(m2,m1,'ScriptDuration'),resources,transferBytes:resources.reduce((a,x)=>a+x.transfer,0)};
  editors.push(item);await log('editor',item);await save();
  await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('button',{name:'Done',exact:true}).click();
 }
}
try{
 for(const count of [1,10]){
  if(!diagnostic){
   for(let trial=0;trial<10;trial++)for(const variant of trial%2?['experimental','native']:['native','experimental']){
    await prepare(control,variant,count);
    const {context,page}=await createPage(browser,auth);
    try{
     const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Performance.enable');await cdp.send('Network.clearBrowserCache');
     await capture(page,cdp,variant,count,trial,'cold');await capture(page,cdp,variant,count,trial,'warm');
    }finally{await context.close();}
   }
  }
  for(const variant of ['native','experimental']){
   await prepare(control,variant,count);
   const {context,page}=await createPage(browser,auth);
   try{
    const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');
    await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
    if(diagnostic)await diagnostics(page,cdp,variant,count);
    else{await actionSamples(page,variant,count);await updateSamples(page,cdp,variant,count);}
   }finally{await context.close();}
  }
 }
}finally{
 await prepare(control,'experimental',1);
 await save();await browser.close();
}
