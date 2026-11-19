// Fresh verification only: reads a frozen approval-backed plan before any browser work.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadavg} from 'node:os';
import {sha256} from './followup-evaluate.mjs';
import {common,workloads,prepare,ready,button,save,json} from './followup-common.mjs';
const raw=await readFile('performance-followup/verification-plan.json');
const plan=JSON.parse(raw),planSha256=sha256(raw),sourceHashes={};
for(const [path,hash] of Object.entries(plan.sources)){
 sourceHashes[path]=sha256(await readFile(path));assert.equal(sourceHashes[path],hash,'Frozen source changed: '+path);
}
assert.equal(plan.phase,'frozen verification');
assert.ok(plan.rows.some(r=>r.approval.status==='approved'));
const metadata={phase:'verification',planSha256,approvalId:plan.approval.id,sourceHashes,hostLoadBefore:loadavg()};
await json('frozen-inputs',metadata);
const {openHA,createPage,base}=common;
const {fixture,metrics}=workloads;
const rows=[];
const {browser,page:control,auth}=await openHA();
async function record(kind,data){rows.push({kind,...data});await save(kind,data);}
try{
 assert.equal(browser.version(),plan.environment.browserVersion);
 for(const count of plan.schedule.groups){
  for(let trial=0;trial<plan.schedule.loadsPerCache;trial++){
   const order=plan.schedule.variants.map((_,i)=>plan.schedule.variants[(trial+i)%plan.schedule.variants.length]);
   for(const variant of order){
    await prepare(control,variant,count);const {context,page}=await createPage(browser,auth);
    try{
     const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Performance.enable');await cdp.send('Network.clearBrowserCache');
     for(const cache of ['cold','warm']){
      if(cache==='cold')await page.goto(base+'/mcc-experiment/bench');else await page.reload();
      await ready(page,variant,count);
      const observed=await page.evaluate(()=>{
       const nav=performance.getEntriesByType('navigation')[0];
       const resources=performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize}));
       return {readyMs:performance.now(),timeOrigin:performance.timeOrigin,documentTransfer:nav.transferSize,resources,interception:__MCC_INTERCEPT_NATIVE__};
      });
      const totals=await metrics(cdp),custom=observed.resources.filter(r=>r.path.includes('/minimum-card-contract/'));
      assert.equal(custom.length>0,variant==='experimental');assert.equal(observed.interception,true);
      if(variant==='experimental')assert.deepEqual(custom.map(r=>r.path).sort(),plan.runtimeAssetPaths);
      await record('load',{variant,count,trial,cache,...observed,customDecoded:custom.reduce((a,r)=>a+r.decoded,0),customTransfer:custom.reduce((a,r)=>a+r.transfer,0),transferBytes:observed.documentTransfer+observed.resources.reduce((a,r)=>a+r.transfer,0),scriptMs:totals.ScriptDuration*1000,taskMs:totals.TaskDuration*1000});
      console.log('VERIFY LOAD',variant,count,trial,cache,Math.round(observed.readyMs));
     }
    }finally{await context.close();}
   }
  }
  for(const variant of plan.schedule.variants){
   await prepare(control,variant,count);const {context,page}=await createPage(browser,auth);
   try{
    await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
    const activate=await button(page,variant);
    await page.evaluate(()=>document.addEventListener('pointerdown',()=>{globalThis.mccStart=performance.now();},{capture:true}));
    for(let trial=0;trial<plan.schedule.inputsPerWorkload;trial++){
     await page.evaluate(()=>{mccRecorder.reset();globalThis.mccStart=undefined;});
     await activate.click();await page.waitForFunction(()=>mccRecorder.events.length===1);
     const observation=await page.evaluate(()=>({intentMs:mccRecorder.events[0].time-mccStart,target:mccRecorder.events[0].target,state:document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_a'].state}));
     assert.equal(observation.target,fixture.a_target);assert.equal(observation.state,'off');assert.ok(Number.isFinite(observation.intentMs)&&observation.intentMs>=0);
     await record('input',{variant,count,trial,...observation});
    }
   }finally{await context.close();}
  }
 }
 assert.equal(rows.length,plan.schedule.totalObservations);
 await json('samples',{...metadata,completed:true,rows,hostLoadAfter:loadavg(),exclusions:[],noSlowValidObservationReplaced:true});
 console.log('VERIFICATION COMPLETE',rows.length);
}catch(error){await json('rejection',{...metadata,reason:String(error),completedRows:rows.length,rows,policy:'Stop; preserve all observations. Do not silently retry or replace slow samples.'});throw error;}
finally{await browser.close();}
