import assert from 'node:assert/strict';
import {common,workloads,prepare,ready,save,json} from './followup-common.mjs';
const {openHA,createPage,base}=common;
const {fixture,workload,metrics}=workloads;
const {browser,page:control,auth}=await openHA();
const series=[];
try{
 for(const count of [1,10])for(let repeat=0;repeat<3;repeat++)for(const variant of ['empty','native','experimental']){
  await prepare(control,variant,count);
  const {context,page}=await createPage(browser,auth);
  try{
   const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable');
   await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
   const version=await cdp.send('Browser.getVersion');
   // A positive control verifies that a deliberately retained object is visible,
   // then that releasing it permits collection across separate JavaScript jobs.
   await page.evaluate(()=>{globalThis.mccPositive={};globalThis.mccPositiveWeak=new WeakRef(mccPositive);});
   await cdp.send('HeapProfiler.collectGarbage');
   assert.equal(await page.evaluate(()=>!!mccPositiveWeak.deref()),true);
   await page.evaluate(()=>{globalThis.mccPositive=null;});
   await cdp.send('HeapProfiler.collectGarbage');
   const releasedPositive=await page.evaluate(()=>!mccPositiveWeak.deref());
   assert.equal(releasedPositive,true);
   await page.evaluate(()=>{
    delete globalThis.mccPositive;delete globalThis.mccPositiveWeak;
    globalThis.mccWeakCards=[];
    const host=document.createElement('div');host.id='mcc-lifecycle-host';document.body.append(host);
   });
   const readings=[];
   async function checkpoint(cycle){
    await cdp.send('HeapProfiler.collectGarbage');
    const retained=await page.evaluate(()=>mccWeakCards.filter(r=>r.deref()).length);
    const m=await metrics(cdp);const dom=await cdp.send('Memory.getDOMCounters');
    const item={cycle,created:cycle*count*(variant==='native'?3:1),weakTargetsStillPresent:retained,heapBytes:m.JSHeapUsedSize,...dom};
    readings.push(item);await save('lifecycle-checkpoint',{variant,count,repeat,...item});
   }
   await checkpoint(0);
   for(let cycle=1;cycle<=50;cycle++){
    // Evaluation returns scalars only, so Playwright/CDP owns no node handles.
    const owned=await page.evaluate(async({variant,count,configs})=>{
     const nodes=variant==='empty'?Array.from({length:count},()=>document.createElement('div')):configs.map(config=>{
      const card=document.createElement(variant==='experimental'?'minimum-card-contract':'hui-tile-card');card.setConfig(config);card.hass=document.querySelector('home-assistant').hass;return card;
     });
     const host=document.querySelector('#mcc-lifecycle-host');
     for(const card of nodes){host.append(card);mccWeakCards.push(new WeakRef(card));}
     await new Promise(r=>setTimeout(r,100));
     for(const card of nodes)card.remove();
     mccRecorder.reset();
     return nodes.map(card=>card.ownedResources??null);
    },{variant,count,configs:variant==='empty'?[]:workload(variant,count)});
    if(variant==='experimental')assert.ok(owned.every(x=>Object.values(x).every(v=>v===0)));
    await page.waitForTimeout(100);
    if(cycle%10===0)await checkpoint(cycle);
   }
   const item={variant,count,repeat,version,positiveControl:{retainedVisible:true,releasedCollected:releasedPositive},cycles:50,settleMs:100,readings,ownedAfterRemoval:variant==='experimental'?'zero after every removal':'not exposed; control/global diagnostics only',method:'Fresh nodes per cycle; harness retains WeakRefs only; scalar results and no node handles; GC/checkpoint observations across separate jobs',limitation:'Forced GC and weak-reference observations are diagnostic. Uncollected targets require retainer investigation; zero observations do not prove universal leak absence or bound renderer-global memory. Empty div control does not reproduce native internals.'};
   series.push(item);await save('lifecycle-series',item);
   await page.evaluate(()=>{document.querySelector('#mcc-lifecycle-host').remove();delete globalThis.mccWeakCards;});
   console.log('LIFECYCLE',variant,count,repeat,readings.map(r=>r.weakTargetsStillPresent).join(','));
  }finally{await context.close();}
 }
 await json('lifecycle',{series,acceptance:'pending; diagnostic method investigation'});
}catch(error){await json('rejection',{reason:String(error),completedSeries:series.length});throw error;}
finally{await browser.close();}
