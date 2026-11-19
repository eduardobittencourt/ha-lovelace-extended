import assert from 'node:assert/strict';
import {common,workloads,prepare,ready,button,save,json} from './followup-common.mjs';
const {openHA,createPage,base}=common;
const {browser,page:control,auth}=await openHA();
const checks=[];
try{
 for(const count of [1,10])for(const variant of ['empty','native','experimental']){
  await prepare(control,variant,count);
  const {context,page}=await createPage(browser,auth);
  try{
   await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
   const custom=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/minimum-card-contract/')).map(r=>new URL(r.name).pathname));
   assert.equal(custom.length>0,variant==='experimental');
   const activate=await button(page,variant);
   await page.evaluate(()=>mccRecorder.reset());await activate.click();
   await page.waitForFunction(()=>mccRecorder.events.length===1);
   const observed=await page.evaluate(()=>({events:mccRecorder.events.map(({target,origin})=>({target,origin})),state:document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_a'].state,interception:globalThis.__MCC_INTERCEPT_NATIVE__}));
   assert.deepEqual(observed.events.map(e=>e.target),[workloads.fixture.a_target]);
   assert.equal(observed.state,'off');assert.equal(observed.interception,true);
   const item={variant,count,custom,...observed,control:variant==='empty'?'Driver button added only after empty load; not equivalent to HA action semantics':'Recorded inner activation'};
   checks.push(item);await save('preflight',item);
  }finally{await context.close();}
 }
 await json('preflight',{checks,acceptance:'pending; discovery only'});
 console.log(JSON.stringify({checks:checks.length,status:'pass'}));
}finally{await browser.close();}
