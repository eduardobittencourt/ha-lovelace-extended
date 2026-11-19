import assert from 'node:assert/strict';
import {openHA,result} from './common.mjs';
import {openDashboard,openExisting} from './editor.mjs';
const {browser,page}=await openHA();
const requests=[],errors=[];let phase='normal';
page.on('response',r=>requests.push({phase,path:new URL(r.url()).pathname,status:r.status()}));
page.on('pageerror',e=>errors.push({phase,message:e.message.slice(0,200)}));
try{
 await openDashboard(page);await page.locator('minimum-card-contract').first().waitFor();await page.waitForTimeout(200);
 const baseline=await page.evaluate(()=>performance.getEntriesByType('resource').map(x=>({path:new URL(x.name).pathname,transfer:x.transferSize,encoded:x.encodedBodySize,decoded:x.decodedBodySize})));
 const phases=[];
 for(const name of ['first_open','same_document_reopen']){
  phase=name;
  const start=await page.evaluate(()=>performance.now());
  await openExisting(page,{reload:false});await page.waitForTimeout(200);
  const resources=await page.evaluate(start=>performance.getEntriesByType('resource').filter(x=>x.startTime>=start).map(x=>({path:new URL(x.name).pathname,transfer:x.transferSize,encoded:x.encodedBodySize,decoded:x.decodedBodySize,duration:x.duration})),start);
  phases.push({name,resources});
  await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('button',{name:'Done',exact:true}).click();
 }
 assert.ok(baseline.some(x=>x.path.endsWith('/card.js')));
 assert.ok(baseline.filter(x=>x.path.includes('/minimum-card-contract/')).every(x=>/\/(card.js|recorder.js|card.css)$/.test(x.path)));
 assert.ok(phases.flatMap(x=>x.resources).filter(x=>x.path.includes('/minimum-card-contract/')).every(x=>x.path.endsWith('/card.css')));
 assert.deepEqual(errors,[]);
 await result('editor-load-check',{baseline,phases,requests,errors});
 console.log(JSON.stringify({normalExperiment:baseline.filter(x=>x.path.includes('/minimum-card-contract/')),phases:phases.map(x=>({name:x.name,requests:x.resources.length,bytes:x.resources.reduce((a,r)=>a+r.transfer,0)})),errors}));
}finally{await browser.close();}
