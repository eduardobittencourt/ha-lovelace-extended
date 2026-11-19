import assert from 'node:assert/strict';
import {openHA,result,base,createPage} from './common.mjs';
import {prepare,ready,fixture,metrics} from './workloads.mjs';
const {browser,page:control,auth}=await openHA();
const checks=[];
try{
 for(const count of [1,10])for(const variant of ['native','experimental']){
  await prepare(control,variant,count);
  const {context,page}=await createPage(browser,auth);
  try{
   const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Performance.enable');
   await cdp.send('Network.clearBrowserCache');
   await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
   const requests=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/minimum-card-contract/')).map(x=>new URL(x.name).pathname));
   assert.equal(requests.length>0,variant==='experimental');
   await page.evaluate(()=>mccRecorder.reset());
   const button=variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').first():page.locator('hui-tile-card').first().getByRole('button').first();
   await button.click();
   await page.waitForFunction(()=>mccRecorder.events.length===1);
   assert.deepEqual(await page.evaluate(()=>mccRecorder.events.map(x=>x.target)),[fixture.a_target]);
   const cold=await page.evaluate(()=>performance.getEntriesByType('resource').reduce((sum,x)=>sum+x.transferSize,0));
   await page.reload();await ready(page,variant,count);
   const warm=await page.evaluate(()=>performance.getEntriesByType('resource').reduce((sum,x)=>sum+x.transferSize,0));
   const m=await metrics(cdp);
   assert.ok(Number.isFinite(m.ScriptDuration));
   checks.push({count,variant,coldTransfer:cold,warmTransfer:warm,requests,cards:variant==='native'?count*3:count,interception:'pass',cache:'new context + explicit cold clear; warm reload; no HTTP routing'});
  }finally{await context.close();}
 }
 await result('measurement-preflight',checks);console.log(JSON.stringify(checks));
}finally{await browser.close();}
