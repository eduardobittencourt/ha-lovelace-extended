import assert from 'node:assert/strict';
import {openHA,ws,result} from './common.mjs';
import {createVisual,saveVisual,openExisting,storedCard,openDashboard,dashboard} from './editor.mjs';
const {browser,page}=await openHA();
const requests=[],errors=[],changes=[];
let phase='normal';
page.on('response',response=>{if(response.url().startsWith('http://127.0.0.1:18123/'))requests.push({phase,path:new URL(response.url()).pathname,status:response.status()});});
page.on('pageerror',error=>errors.push({phase,message:error.message.slice(0,240)}));
const names={a_source:'Slot A display',a_target:'Slot A action target',a_label:'Slot A label*',b_source:'Slot B display',b_target:'Slot B action target',b_label:'Slot B label*',body_target:'Body action target',body_label:'Body action label*'};
const friendly={'input_number.mcc_display_a':'Experiment display A','input_number.mcc_display_b':'Experiment display B','input_boolean.mcc_target_a':'Experiment target A','input_boolean.mcc_target_b':'Experiment target B','input_boolean.mcc_target_body':'Experiment body target'};
async function assertForm(config){
 for(const [key,name]of Object.entries(names)){
  if(key.endsWith('_label'))assert.equal(await page.getByRole('textbox',{name,exact:true}).inputValue(),config[key]);
  else assert.equal(await page.getByRole('button',{name:name+' '+friendly[config[key]],exact:true}).count(),1);
 }
 assert.equal(await page.getByRole('switch',{name:'Confirm synthetic intent'}).isChecked(),config.confirm);
}
try{
 // Reset only the experiment dashboard, so visual creation is reproducible.
 const current=await ws(page,{type:'lovelace/config',url_path:dashboard,force:true});
 for(const view of current.views){if(view.sections)for(const section of view.sections)section.cards=section.cards.filter(c=>c.type!=='custom:minimum-card-contract');}
 await ws(page,{type:'lovelace/config/save',url_path:dashboard,config:current});
 await openDashboard(page);
 await page.waitForTimeout(200);
 const normal=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('/minimum-card-contract/')).map(r=>new URL(r.name).pathname));
 phase='first_open';await createVisual(page,{reload:false});
 const stub=await page.evaluate(()=>customElements.get('minimum-card-contract').getStubConfig());
 await assertForm(stub);await page.waitForTimeout(200);
 await saveVisual(page);
 const initial=await storedCard(page);assert.deepEqual(initial,stub);
 phase='same_document_reopen';
 await page.getByRole('button',{name:'Edit dashboard',exact:true}).click();
 await page.getByRole('button',{name:'Edit card',exact:true}).last().press('Enter');
 await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
 await assertForm(initial);await page.waitForTimeout(200);
 await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('button',{name:'Done',exact:true}).click();
 phase='round_trips';
 for(const [key,value]of [
  ['a_source','input_number.mcc_display_b'],['a_target','input_boolean.mcc_target_body'],['a_label','First reading edited visually'],
  ['b_source','input_number.mcc_display_a'],['b_target','input_boolean.mcc_target_a'],['b_label','Second reading edited visually'],
  ['body_target','input_boolean.mcc_target_b'],['body_label','Body intent edited visually'],['confirm',true],['confirm',false]
 ]){
  const before=await storedCard(page);
  await openExisting(page);await assertForm(before);
  if(key.endsWith('_label')){await page.getByRole('textbox',{name:names[key],exact:true}).fill(value);await page.keyboard.press('Tab');}
  else if(key==='confirm'){const control=page.getByRole('switch',{name:'Confirm synthetic intent'});if(await control.isChecked()!==value)await control.press('Space');}
  else{
   await page.getByRole('button',{name:names[key]+' '+friendly[before[key]],exact:true}).click();
   await page.getByRole('option',{name:new RegExp('^'+friendly[value]+' ')}).click();
  }
  await saveVisual(page);
  const after=await storedCard(page);
  assert.deepEqual(after,{...before,[key]:value});
  await openExisting(page);await assertForm(after);
  const runtime=await page.locator('minimum-card-contract').first().evaluate(card=>card._config);
  assert.deepEqual(runtime,after);
  await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('button',{name:'Done',exact:true}).click();
  changes.push({key,before,after,untouchedPreserved:true});
  console.log('Verified visual round trip:',key);
 }
 const experimentalRequests=requests.filter(r=>r.path.includes('/minimum-card-contract/'));
 assert.ok(normal.includes('/local/minimum-card-contract/card.js'));
 assert.ok(experimentalRequests.every(r=>['card.js','recorder.js','card.css'].some(name=>r.path.endsWith('/'+name))));
 assert.deepEqual(errors,[]);
 const data={initial,changes,normal,requests,errors,editorCustomModule:false,final:await storedCard(page)};
 await result('persistence-check',data);console.log(JSON.stringify({roundTrips:changes.length,fields:9,errors,normal,phaseRequestCounts:Object.fromEntries(['first_open','same_document_reopen'].map(x=>[x,requests.filter(r=>r.phase===x).length]))}));
}finally{await browser.close();}
