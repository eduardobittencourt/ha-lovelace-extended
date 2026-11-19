import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {openHA,createPage,result,base} from './common.mjs';
import {prepare,ready,fixture,metrics} from './workloads.mjs';
const review=JSON.parse(await readFile('results/budget-review.json','utf8'));
assert.equal(review.decision,'Withhold overall performance acceptance');
const {browser,page:control,auth}=await openHA();
const captures=[],interactions=[];
try{
 for(const count of [1,10])for(let trial=0;trial<3;trial++)for(const variant of trial%2?['experimental','native']:['native','experimental']){
  await prepare(control,variant,count);
  const {context,page}=await createPage(browser,auth);
  try{
   const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.clearBrowserCache');await cdp.send('Performance.enable');
   for(const cache of ['cold','warm']){
    if(cache==='cold')await page.goto(base+'/mcc-experiment/bench');else await page.reload();
    await ready(page,variant,count);
    const data=await page.evaluate(()=>({usableMs:performance.now(),experimentDecodedBytes:performance.getEntriesByType('resource').filter(r=>r.name.includes('/minimum-card-contract/')).reduce((a,r)=>a+r.decodedBodySize,0)}));
    const cpu=await metrics(cdp);
    const candidate=review.candidates.find(x=>x.metric==='usableMs'&&x.cache===cache);
    captures.push({variant,count,trial,cache,...data,scriptMs:cpu.ScriptDuration*1000,candidateReadinessWithin:data.usableMs<=candidate.maximum,candidateBytesWithin:variant==='experimental'?data.experimentDecodedBytes<=16384:null,acceptance:'pending: no approved budget'});
   }
   if(trial===0){
    await page.evaluate(()=>document.addEventListener('pointerdown',()=>{globalThis.mccInputStart=performance.now();},{capture:true}));
    const button=variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').first():page.locator('hui-tile-card').first().getByRole('button').first();
    for(let i=0;i<5;i++){
     await page.evaluate(()=>mccRecorder.reset());await button.click();await page.waitForFunction(()=>mccRecorder.events.length===1);
     const observation=await page.evaluate(()=>({intentMs:mccRecorder.events[0].time-mccInputStart,target:mccRecorder.events[0].target}));
     assert.equal(observation.target,fixture.a_target);
     interactions.push({variant,count,...observation,candidateWithin:observation.intentMs<=16.7,acceptance:'pending: no approved budget'});
    }
   }
  }finally{await context.close();}
 }
 assert.equal(captures.length,24);assert.equal(interactions.length,20);
 const data={reviewDecision:review.decision,captures,interactions,performanceAcceptance:'pending',stage1Exit:'open'};
 await result('fresh-verification',data);
 console.log(JSON.stringify({loads:captures.length,inputs:interactions.length,candidateReadinessOutside:captures.filter(x=>!x.candidateReadinessWithin).length,acceptance:'pending'}));
}finally{await prepare(control,'experimental',1);await browser.close();}
