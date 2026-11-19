// Separate diagnostic campaign; the frozen runtime and readiness helper are unchanged.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {loadavg} from 'node:os';
import {resolve} from 'node:path';
import {startRun,checkSpace} from './diagnostic-common.mjs';
import {installMilestones,validateMilestones,mapTraceClock} from './diagnostic-phases.mjs';
const mode=process.argv[3];
assert.ok(['pilot','campaign'].includes(mode),'Choose pilot or campaign');
const {output,common,workloads,save,json}=await startRun();
const {openHA,createPage,base}=common;
const plan=JSON.parse(await readFile('performance-followup/verification-plan.json'));
for(const [path,hash] of Object.entries(plan.sources))assert.equal(createHash('sha256').update(await readFile(path)).digest('hex'),hash,path);
const sourceHashes={};
for(const path of ['tools/diagnostic-common.mjs','tools/diagnostic-phases.mjs','tools/diagnostic-loads.mjs',...Object.keys(plan.sources)])sourceHashes[path]=createHash('sha256').update(await readFile(path)).digest('hex');
const rows=[];
const pairs=mode==='pilot'?2:10;
const schedule={phase:'diagnostic only; not acceptance',mode,pairs,groups:[1,10],variants:['empty','native','experimental'],
 order:'Count 1 then 10; rotate variants each trial; each cold load followed by warm reload',
 instrumentation:mode==='pilot'?'Trial 0 original helper only; trial 1 phase observer plus trace':'Phase observer only; traced pilots kept separate',
 expectedLoads:pairs*2*3*2,sourceHashes,cache:plan.schedule.cache,reference:plan.schedule.settle,
 environment:plan.environment,hostLoadBefore:loadavg(),space:await checkSpace(output),
 limitations:'Observer polling traverses open shadow roots every 10 ms until mount; overhead is diagnostic. Milestone observer and reference frame waits are independent.'};
await json('schedule',schedule);
const {browser,page:control,auth}=await openHA();
try{
 assert.equal(browser.version(),plan.environment.browserVersion);
 for(const count of [1,10])for(let trial=0;trial<pairs;trial++){
  const variants=['empty','native','experimental'];
  for(const variant of variants.map((_,i)=>variants[(i+trial)%3])){
   await workloads.prepare(control,variant==='empty'?'native':variant,variant==='empty'?0:count);
   const {context,page}=await createPage(browser,auth);
   const instrumented=mode!=='pilot'||trial===1;
   try{
    if(instrumented)await page.addInitScript(installMilestones,{variant,count});
    const cdp=await context.newCDPSession(page);
    await cdp.send('Network.enable');await cdp.send('Performance.enable');await cdp.send('Network.clearBrowserCache');
    for(const cache of ['cold','warm']){
     await checkSpace(output);
     const trace=[];const traced=mode==='pilot'&&instrumented;
     const listener=e=>trace.push(...e.value);
     if(traced){cdp.on('Tracing.dataCollected',listener);await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing',transferMode:'ReportEvents'});}
     const hostStart=performance.now();
     if(cache==='cold')await page.goto(base+'/mcc-experiment/bench');else await page.reload();
     if(variant==='empty'){
      await page.getByRole('button',{name:'Edit dashboard',exact:true}).waitFor();
      assert.equal(await page.locator('hui-tile-card, minimum-card-contract').count(),0);
      await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
     }else await workloads.ready(page,variant,count);
     const observed=await page.evaluate(()=>{
      const reference=performance.now();performance.mark('mcc-clock');
      const nav=performance.getEntriesByType('navigation')[0];
      return {readyMs:reference,timeOrigin:performance.timeOrigin,anchor:performance.getEntriesByName('mcc-clock')[0].startTime,
       navigation:{responseEnd:nav.responseEnd,domContentLoaded:nav.domContentLoadedEventEnd,load:nav.loadEventEnd},
       resources:performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,start:r.startTime,end:r.responseEnd,duration:r.duration,transfer:r.transferSize,decoded:r.decodedBodySize,initiator:r.initiatorType})),
       interception:__MCC_INTERCEPT_NATIVE__};
     });
     const hostElapsedMs=performance.now()-hostStart;
     assert.equal(observed.interception,true);
     const custom=observed.resources.filter(r=>r.path.includes('/minimum-card-contract/'));
     assert.equal(custom.length>0,variant==='experimental');
     let milestones=null,phases=null,phaseError=null;
     if(instrumented){
      await page.waitForFunction(()=>Number.isFinite(globalThis.__MCC_PHASES__?.frame2),{},{timeout:5000});
      milestones=await page.evaluate(()=>globalThis.__MCC_PHASES__);milestones.reference=observed.readyMs;
      try{phases=validateMilestones(milestones);}catch(e){phaseError=String(e);}
     }
     let traceClock=null;
     if(traced){
      const complete=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');await complete;cdp.off('Tracing.dataCollected',listener);
      await writeFile(resolve(output,`${variant}-${count}-${trial}-${cache}-trace.json`),JSON.stringify({traceEvents:trace}),{flag:'wx'});
      try{traceClock=mapTraceClock(trace,observed.anchor);}catch(e){phaseError=[phaseError,String(e)].filter(Boolean).join('; ');}
     }
     const totals=await workloads.metrics(cdp);
     const row={variant,count,trial,cache,instrumented,traced,...observed,hostElapsedMs,milestones,phases,phaseError,traceClock,
      scriptMs:totals.ScriptDuration*1000,taskMs:totals.TaskDuration*1000,hostLoad:loadavg(),space:await checkSpace(output)};
     rows.push(row);await save('load',row);
     console.log('DIAGNOSTIC',mode,variant,count,trial,cache,Math.round(row.readyMs),phaseError??'valid');
    }
   }finally{await context.close();}
  }
 }
 assert.equal(rows.length,schedule.expectedLoads);
 assert.equal(new Set(rows.map(r=>[r.variant,r.count,r.trial,r.cache].join('/'))).size,rows.length);
 await json('samples',{completed:true,schedule,rows,exclusions:[],noSlowValidObservationReplaced:true});
}catch(error){await json('incomplete',{completed:false,reason:String(error),schedule,rows,noAcceptanceClaim:true});throw error;}
finally{await browser.close();}
