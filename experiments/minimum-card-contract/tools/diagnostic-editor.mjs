import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadavg} from 'node:os';
import {startRun} from './diagnostic-common.mjs';
import {sha256} from './followup-evaluate.mjs';
import {editorSchedule} from './diagnostic-editor-evaluate.mjs';

const approvalPath='performance-diagnostics/editor-approval.json';
const approvalBytes=await readFile(approvalPath);
const approval=JSON.parse(approvalBytes);
const environmentBytes=await readFile('performance-diagnostics/environment.json');
const environment=JSON.parse(environmentBytes);
assert.equal(sha256(environmentBytes),approval.environmentSha256);
assert.equal(approval.status,'approved');
assert.match(approval.date_utc,/^\d{4}-\d{2}-\d{2}$/);
const sourceHashes={};
for(const [path,expected] of Object.entries(approval.requiredSources)){
 sourceHashes[path]=sha256(await readFile(path));
 assert.equal(sourceHashes[path],expected,path);
}
for(const path of ['tools/diagnostic-editor.mjs','tools/diagnostic-editor-evaluate.mjs','tools/diagnostic-common.mjs']){
 sourceHashes[path]=sha256(await readFile(path));
}
const {output,common,workloads,json,save}=await startRun();
const trials=editorSchedule(approval);
const plan={phase:'frozen editor verification',approvalSha256:sha256(approvalBytes),sourceHashes,
 environmentSha256:approval.environmentSha256,browserVersion:environment.browser_observed,trials,
 cache:'Fresh context and cache clear per pair; reopen on the same document',
 boundary:approval.boundary,hostLoadBefore:loadavg()};
await json('plan',plan);

const {openHA,createPage,base}=common;
const rows=[];
let browser;
try{
 const session=await openHA();
 browser=session.browser;
 assert.equal(browser.version(),plan.browserVersion);
 for(const [first,reopen] of trials.filter((_,i)=>i%2===0).map((first,i)=>[first,trials[2*i+1]])){
  const {variant,count}=first;
  await workloads.prepare(session.page,variant==='empty'?'native':variant,variant==='empty'?0:count);
  const {context,page}=await createPage(browser,session.auth);
  try{
   const cdp=await context.newCDPSession(page);
   await cdp.send('Network.enable');
   await cdp.send('Network.clearBrowserCache');
   await page.goto(base+'/mcc-experiment/bench');
   const editDashboard=page.getByRole('button',{name:'Edit dashboard',exact:true});
   if(variant==='empty'){
    await editDashboard.waitFor();
    assert.equal(await page.locator('hui-tile-card, minimum-card-contract').count(),0);
   }else await workloads.ready(page,variant,count);
   for(const trial of [first,reopen]){
    const start=await page.evaluate(()=>performance.now());
    await editDashboard.click();
    const setup=await page.evaluate(()=>performance.now());
    if(variant!=='empty'){
     await page.getByRole('button',{name:'Edit',exact:true}).last().press('Enter');
     await page.getByRole('button',{name:'Cancel',exact:true}).waitFor();
     if(variant==='experimental')await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
     else await page.locator('hui-tile-card-editor').evaluate(editor=>editor.updateComplete);
    }
    const observed=await page.evaluate(()=>{
     const end=performance.now();
     const hass=document.querySelector('home-assistant').hass;
     const targets=['a','b','body'].map(name=>hass.states['input_boolean.mcc_target_'+name].state);
     return {end,timeOrigin:performance.timeOrigin,interception:__MCC_INTERCEPT_NATIVE__,targets};
    });
    assert.equal(observed.interception,true);
    assert.deepEqual(observed.targets,['off','off','off']);
    const row={...trial,setupMs:setup-start,totalReadyMs:observed.end-start,
     editorMs:variant==='empty'?null:observed.end-setup,timeOrigin:observed.timeOrigin,
     interception:observed.interception,targets:observed.targets};
    rows.push(row);
    await save('editor',row);
    if(variant!=='empty')await page.getByRole('button',{name:'Cancel',exact:true}).click();
    await page.getByRole('button',{name:'Done',exact:true}).click();
   }
   console.log('EDITOR VERIFICATION',variant,count,first.trial);
  }finally{await context.close();}
 }
 assert.equal(rows.length,trials.length);
 await json('samples',{completed:true,planSha256:sha256(await readFile(output+'/plan.json')),
  sourceHashes,environmentSha256:plan.environmentSha256,rows,exclusions:[],hostLoadAfter:loadavg()});
}catch(error){
 await json('incomplete',{completed:false,reason:String(error),rows});
 throw error;
}finally{await browser?.close();}
