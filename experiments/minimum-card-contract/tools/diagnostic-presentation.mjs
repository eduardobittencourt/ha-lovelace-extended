import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {startRun} from './diagnostic-common.mjs';
import {mapTraceClock} from './diagnostic-phases.mjs';
import {sha256} from './followup-evaluate.mjs';

const {json,save}=await startRun();
const {chromium}=await import('playwright');
const revision='98a2592026af8d673b9fa83b626ac68bdf4ae78a';
const sources=['third_party/blink/public/devtools_protocol/domains/HeadlessExperimental.pdl',
 'components/viz/service/display/display.cc','headless/lib/browser/protocol/headless_handler.cc']
 .map(path=>`https://github.com/chromium/chromium/blob/${revision}/${path}`);
async function screenshotColors(page,snapshots){
 return page.evaluate(async snapshots=>{
   const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   return await Promise.all(snapshots.map(async snapshot=>{
    const bytes=Uint8Array.from(atob(snapshot),c=>c.charCodeAt(0));
    const bitmap=await createImageBitmap(new Blob([bytes]));
    ctx.drawImage(bitmap,Math.floor(bitmap.width/2),Math.floor(bitmap.height/2),1,1,0,0,1,1);
    bitmap.close();
    const [red,green,blue]=ctx.getImageData(0,0,1,1).data;
    return red>200&&green<50&&blue<50?'red':green>200&&red<50&&blue<50?'green':'other';
   }));
 },snapshots);
}


const browser=await chromium.launch();
const results=[];
try{
 const cdp=await browser.newBrowserCDPSession();
 const version=await cdp.send('Browser.getVersion');
 assert.equal(version.revision,'@'+revision);
 await json('protocol',{version,sources,driverSha256:sha256(await readFile(new URL(import.meta.url))),
  controls:['delayed change from red to green','no change (red)'],
  boundary:'Trace screenshots identify content only; require a common explicit display frame identifier and successful presentation feedback to claim association.',
  revision:'When trace association fails, probe explicit begin-frame capture with frame control; drawing/hasDamage remains weaker than presentation.'});
 const context=await browser.newContext({viewport:{width:320,height:240}});
 const page=await context.newPage();
 for(const change of [true,false]){
  await page.goto('about:blank');
  const events=[];
  const listener=({value})=>events.push(...value);
  cdp.on('Tracing.dataCollected',listener);
  await cdp.send('Tracing.start',{categories:'viz,benchmark,cc,blink.user_timing,disabled-by-default-display.framedisplayed,disabled-by-default-devtools.screenshot',transferMode:'ReportEvents'});
  const timing=await page.evaluate(async change=>{
   performance.clearMarks();
   const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
   document.body.style.background='#f00';
   const start=performance.now();performance.mark('mcc-clock');
   await new Promise(resolve=>setTimeout(resolve,180));
   const changeMs=performance.now();
   if(change)document.body.style.background='#0f0';
   await frame();await frame();
   const end=performance.now();
   return {start,changeMs,end,anchor:performance.getEntriesByName('mcc-clock')[0].startTime};
  },change);
  const done=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));
  await cdp.send('Tracing.end');await done;cdp.off('Tracing.dataCollected',listener);
  const clock=mapTraceClock(events,timing.anchor);
  const screenshots=events.filter(e=>e.name==='Screenshot'&&e.args?.snapshot);
  const colors=await screenshotColors(page,screenshots.map(e=>e.args.snapshot));
  const frames=screenshots.map((e,i)=>({ms:e.ts/1000-clock.offsetMs,color:colors[i],
   argKeys:Object.keys(e.args).sort(),displayTraceId:e.args.display_trace_id??null}));
  const feedback=events.filter(e=>/FrameDisplayed|FramePresented|PresentationFeedback|DidPresentCompositorFrame/i.test(e.name))
   .map(e=>({name:e.name,ms:e.ts/1000-clock.offsetMs,argKeys:Object.keys(e.args??{}).sort()}));
  const hasBaseline=frames.some(f=>f.color==='red'&&f.ms<timing.changeMs);
  const greens=frames.filter(f=>f.color==='green');
  const controlPassed=hasBaseline&&(change?greens.length>0&&greens.every(f=>f.ms>=timing.changeMs):greens.length===0);
  const item={change,timing,clock,frames,feedback,controlPassed,
   explicitFrameIdentity:frames.some(f=>f.color==='green'&&f.displayTraceId!==null)};
  results.push(item);await save('trace-control',item);
 }
}finally{await browser.close();}

const revised=await chromium.launch({args:['--run-all-compositor-stages-before-draw']});
let frameControl;
try{
 const cdp=await revised.newBrowserCDPSession();
 const context=await revised.newContext({viewport:{width:320,height:240}});
 const seed=await context.newPage();
 const session=await context.newCDPSession(seed);
 const {targetInfo}=await session.send('Target.getTargetInfo');
 const pending=context.waitForEvent('page',{timeout:3000});
 try{
  await cdp.send('Target.createTarget',{url:'about:blank',browserContextId:targetInfo.browserContextId,enableBeginFrameControl:true,width:320,height:240});
  const page=await pending;
  const target=await context.newCDPSession(page);
  const controls=[];
  for(const change of [true,false]){
   await page.evaluate(()=>{document.body.style.background='#f00';});
   const capture=async()=>{
    const before=await page.evaluate(()=>performance.now());
    const result=await target.send('HeadlessExperimental.beginFrame',{screenshot:{format:'png'}});
    const after=await page.evaluate(()=>performance.now());
    const [color]=await screenshotColors(page,result.screenshotData?[result.screenshotData]:[]);
    return {before,after,color:color??null,hasDamage:result.hasDamage,responseFields:Object.keys(result).sort()};
   };
   const baseline=await capture();
   const changeMs=await page.evaluate(async change=>{
    await new Promise(resolve=>setTimeout(resolve,180));
    if(change)document.body.style.background='#0f0';
    return performance.now();
   },change);
   const following=await capture();
   controls.push({change,baseline,changeMs,following,controlPassed:baseline.color==='red'&&
    baseline.after<changeMs&&following.before>=changeMs&&following.color===(change?'green':'red')});
  }
  frameControl={controls};
 }catch(error){await pending.catch(()=>{});frameControl={error:String(error)};}
}finally{await revised.close();}
await json('calibration',{results,frameControl,calibrated:false,
 missing:'No validated identity join between the changed pixels and successful presentation of the same display frame. Begin-frame/damage and screenshot capture expose drawing or copy results.',
 acceptance:'pending',fullCampaignExecuted:false});
