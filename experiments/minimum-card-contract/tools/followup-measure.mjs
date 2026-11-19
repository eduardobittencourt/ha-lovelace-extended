import assert from 'node:assert/strict';
import {performance as clock} from 'node:perf_hooks';
import {setTimeout as delay} from 'node:timers/promises';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {common,workloads,prepare,ready,button,save,json,run} from './followup-common.mjs';
const mode=process.argv[3];
assert.ok(['loads','editors','updates'].includes(mode),'Choose loads, editors or updates');
const {openHA,createPage,base}=common;
const {fixture,metrics}=workloads;
const rows=[];
const schedule={mode,run,phase:'discovery only',coldWarmPairs:10,inputsPerWorkload:30,editorPairsPerWorkload:10,updateRepeats:3,steady:{hz:1,seconds:60},burst:{hz:20,seconds:10},order:'count 1 then 10; rotate empty/native/experimental by trial or repetition',settleMs:200,exclusions:'Retain invalid attempts with reasons; never replace slow valid observations',sourceHash:createHash('sha256').update(await readFile(new URL(import.meta.url))).digest('hex')};
await json('schedule',schedule);
const {browser,page:control,auth}=await openHA();
async function record(kind,data){const item={kind,...data};rows.push(item);await save(kind,data);}
async function newPage(){
 const data=await createPage(browser,auth);
 data.cdp=await data.context.newCDPSession(data.page);
 await data.cdp.send('Network.enable');await data.cdp.send('Performance.enable');
 return data;
}
const rotate=(trial)=>['empty','native','experimental'].map((_,i)=>['empty','native','experimental'][(trial+i)%3]);
async function load(page,cdp,variant,count,trial,cache){
 const previous=await metrics(cdp);
 if(cache==='cold')await page.goto(base+'/mcc-experiment/bench');else await page.reload();
 await ready(page,variant,count);
 const observed=await page.evaluate(()=>{
  const nav=performance.getEntriesByType('navigation')[0];
  const resources=performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize}));
  return {readyMs:performance.now(),timeOrigin:performance.timeOrigin,documentTransfer:nav.transferSize,resources,interception:__MCC_INTERCEPT_NATIVE__};
 });
 const totals=await metrics(cdp);
 const custom=observed.resources.filter(r=>r.path.includes('/minimum-card-contract/'));
 assert.equal(custom.length>0,variant==='experimental');assert.equal(observed.interception,true);
 const data={variant,count,trial,cache,...observed,transferBytes:observed.documentTransfer+observed.resources.reduce((a,r)=>a+r.transfer,0),customTransfer:custom.reduce((a,r)=>a+r.transfer,0),customDecoded:custom.reduce((a,r)=>a+r.decoded,0),scriptMs:totals.ScriptDuration*1000,taskMs:totals.TaskDuration*1000,previousScriptMs:previous.ScriptDuration*1000,counterBoundary:'post-navigation totals, never subtracted across documents'};
 await record('load',data);
 console.log('LOAD',variant,count,trial,cache,Math.round(data.readyMs));
}
async function inputs(page,variant,count){
 const activate=await button(page,variant);
 await page.evaluate(()=>document.addEventListener('pointerdown',()=>{globalThis.mccStart=performance.now();},{capture:true}));
 for(let trial=0;trial<30;trial++){
  await page.evaluate(()=>{mccRecorder.reset();globalThis.mccStart=undefined;});
  await activate.click();await page.waitForFunction(()=>mccRecorder.events.length===1);
  const observation=await page.evaluate(()=>({intentMs:mccRecorder.events[0].time-mccStart,target:mccRecorder.events[0].target,state:document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_a'].state}));
  assert.equal(observation.target,fixture.a_target);assert.equal(observation.state,'off');
  await record('input',{variant,count,trial,...observation});
 }
}
async function editor(page,cdp,variant,count,trial){
 for(const phase of ['first_open','same_document_reopen']){
  const start=await page.evaluate(()=>performance.now());const before=await metrics(cdp);
  await page.getByRole('button',{name:'Edit dashboard',exact:true}).click();
  const setupReady=await page.evaluate(()=>performance.now());
  const actionStart=await page.evaluate(()=>performance.now());
  if(variant!=='empty'){
   await page.getByRole('button',{name:'Edit',exact:true}).last().press('Enter');
   await page.getByRole('button',{name:'Cancel',exact:true}).waitFor();
   if(variant==='experimental')await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
   else await page.locator('hui-tile-card-editor').evaluate(e=>e.updateComplete);
  }
  const boundary=await page.evaluate(()=>performance.now());
  const after=await metrics(cdp);
  const resources=await page.evaluate(start=>performance.getEntriesByType('resource').filter(r=>r.startTime>=start).map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize})),start);
  await record('editor',{variant,count,trial,phase,setupMs:setupReady-start,editorMs:variant==='empty'?null:boundary-actionStart,totalReadyMs:boundary-start,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,taskMs:(after.TaskDuration-before.TaskDuration)*1000,transferBytes:resources.reduce((a,r)=>a+r.transfer,0),resources,control:variant==='empty'?'Edit-mode setup only; no card editor equivalent':'Actual HA editor; includes activation automation'});
  if(variant!=='empty')await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await page.getByRole('button',{name:'Done',exact:true}).click();
 }
}
async function updates(page,cdp,variant,count,repeat){
 const original=await control.evaluate(id=>document.querySelector('home-assistant').hass.states[id],fixture.a_source);
 const headers={'Authorization':'Bearer '+auth.access_token,'Content-Type':'application/json'};
 for(const kind of ['relevant','unrelated'])for(const hz of [1,20]){
  const seconds=hz===1?60:10,total=hz*seconds;
  const id=kind==='relevant'?fixture.a_source:'input_number.mcc_unrelated';
  const before=await metrics(cdp),start=clock.now();let late=0;
  console.log('WINDOW',variant,count,repeat,kind,hz,seconds+'s');
  for(let i=0;i<total;i++){
   const wait=start+i*1000/hz-clock.now();if(wait>0)await delay(wait);else if(wait < -1000/hz)late++;
   const response=await fetch(base+'/api/states/'+id,{method:'POST',headers,body:JSON.stringify({state:String((i+1)%99),attributes:original.attributes})});assert.ok(response.ok);
  }
  const remain=start+seconds*1000-clock.now();if(remain>0)await delay(remain);
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const observedState=await page.evaluate(id=>document.querySelector('home-assistant').hass.states[id]?.state,id);
  assert.equal(Number(observedState),total%99,'Measured page must observe the final synthetic update');
  const after=await metrics(cdp);
  await record('update',{variant,count,repeat,kind,hz,seconds,updates:total,observedFinalState:observedState,late,elapsedMs:clock.now()-start,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,taskMs:(after.TaskDuration-before.TaskDuration)*1000});
 }
 await fetch(base+'/api/states/'+fixture.a_source,{method:'POST',headers,body:JSON.stringify({state:original.state,attributes:original.attributes})});
 await fetch(base+'/api/states/input_number.mcc_unrelated',{method:'DELETE',headers});
}
try{
 for(const count of [1,10]){
  if(mode==='loads'||mode==='editors'){
   for(let trial=0;trial<10;trial++)for(const variant of rotate(trial)){
    await prepare(control,variant,count);const {context,page,cdp}=await newPage();
    try{
     await cdp.send('Network.clearBrowserCache');
     if(mode==='loads'){
      await load(page,cdp,variant,count,trial,'cold');await load(page,cdp,variant,count,trial,'warm');
     }else{
      await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);await editor(page,cdp,variant,count,trial);
      console.log('EDITOR',variant,count,trial);
     }
    }finally{await context.close();}
   }
   if(mode==='loads')for(const variant of rotate(0)){
    await prepare(control,variant,count);const {context,page}=await newPage();
    try{await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);await inputs(page,variant,count);}finally{await context.close();}
   }
  }else{
   for(let repeat=0;repeat<3;repeat++)for(const variant of rotate(repeat)){
    Object.assign(auth,await common.tokens()); // Renew outside timed windows for campaigns longer than a token lifetime.
    await prepare(control,variant,count);const {context,page,cdp}=await newPage();
    try{await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);await delay(200);await updates(page,cdp,variant,count,repeat);}finally{await context.close();}
   }
  }
 }
 await json('samples',{schedule,rows,acceptance:'pending; no approved limits'});
 console.log('COMPLETE',mode,rows.length);
}catch(error){await json('rejection',{reason:String(error),completedRows:rows.length,action:'Stop affected collection; preserve partial observations'});throw error;}
finally{await browser.close();}
