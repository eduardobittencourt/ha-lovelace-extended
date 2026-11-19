import assert from 'node:assert/strict';
import { openHA, result, base } from './common.mjs';
const {browser,page}=await openHA({touch:true});
const checks={};
try {
 await page.evaluate(async()=>{
  await import('/local/minimum-card-contract/card.js');
  const card=document.createElement('minimum-card-contract');
  const config=card.constructor.getStubConfig();
  const makeState=(state)=>({state,attributes:{},entity_id:'input_number.mcc_display_a'});
  const hass={language:'en',states:{
   'input_number.mcc_display_a':makeState('21.1'),
   'input_number.mcc_display_b':makeState('72.2'),
   'input_boolean.mcc_target_a':makeState('off'),
   'input_boolean.mcc_target_b':makeState('off'),
   'input_boolean.mcc_target_body':makeState('off'),
  }};
  card.style.cssText='position:fixed;top:80px;left:300px;width:500px;z-index:99999';
  card.setConfig(config);card.hass=hass;document.body.append(card);
  globalThis.testCard=card;globalThis.testConfig=config;globalThis.testHass=hass;
  globalThis.mutations={a:0,b:0,body:0};
  globalThis.observers=Object.entries(card._nodes).map(([slot,{button}])=>{
   const observer=new MutationObserver(records=>{mutations[slot]+=records.length;});
   observer.observe(button,{subtree:true,childList:true,characterData:true,attributes:true});
   return observer;
  });
  globalThis.flush=async()=>{await Promise.resolve();await Promise.resolve();};
  globalThis.resetMutations=async()=>{await flush();for(const key of Object.keys(mutations))mutations[key]=0;};
 });
 const slots=page.locator('minimum-card-contract');
 const a=slots.locator('button[data-slot=a]');
 const b=slots.locator('button[data-slot=b]');
 const body=slots.locator('button[data-slot=body]');
 checks.bindings=await page.evaluate(async()=>{
  const before=JSON.stringify(testConfig);
  const initial=[testCard._nodes.a.value.textContent,testCard._nodes.b.value.textContent];
  await resetMutations();
  testCard.setConfig({...testConfig,a_source:'input_number.mcc_display_b',a_target:'input_boolean.mcc_target_body',a_label:'Changed A'});
  await flush();
  const snapshot={initial,changedA:testCard._nodes.a.value.textContent,sibling:testCard._nodes.b.value.textContent,siblingMutations:mutations.b,originalUnchanged:JSON.stringify(testConfig)===before};
  mccRecorder.reset();testCard._nodes.a.button.click();testCard._nodes.b.button.click();
  snapshot.targets=mccRecorder.events.map(x=>x.target);mccRecorder.reset();
  testCard.setConfig(testConfig);await resetMutations();return snapshot;
 });
 assert.deepEqual(checks.bindings.initial,['21.1','72.2']);
 assert.deepEqual(checks.bindings.targets,['input_boolean.mcc_target_body','input_boolean.mcc_target_b']);
 assert.equal(checks.bindings.changedA,'72.2');assert.equal(checks.bindings.sibling,'72.2');
 assert.equal(checks.bindings.siblingMutations,0);assert.equal(checks.bindings.originalUnchanged,true);
 checks.validation=await page.evaluate(()=>{
  const invalid=[{...testConfig,a_source:undefined},{...testConfig,a_target:'switch.external'},{...testConfig,tap_action:{action:'toggle'}},{...testConfig,confirm:'yes'}];
  const messages=invalid.map(config=>{try{testCard.setConfig(config);return null;}catch(e){return e.message;}});
  const stale=testCard._nodes.a.value.textContent;
  testCard.setConfig(testConfig);
  return {messages,stale};
 });
 assert.ok(checks.validation.messages.every(Boolean));assert.equal(checks.validation.stale,'Configuration error');
 checks.availability=await page.evaluate(()=>{
  const snapshots=[];
  for(const state of [null,'unknown','unavailable']){
   const states={...testHass.states};
   if(state===null)delete states[testConfig.a_source];else states[testConfig.a_source]={...states[testConfig.a_source],state};
   testCard.hass={...testHass,states};
   snapshots.push({a:testCard._nodes.a.value.textContent,b:testCard._nodes.b.value.textContent});
  }
  const states={...testHass.states};delete states[testConfig.a_target];testCard.hass={...testHass,states};
  const disabledA=testCard._nodes.a.button.disabled,disabledB=testCard._nodes.b.button.disabled;
  mccRecorder.reset();
  testCard.hass={...testHass,states:{...testHass.states,[testConfig.a_source]:{...testHass.states[testConfig.a_source],state:'31.5'}}};
  const recovery={value:testCard._nodes.a.value.textContent,events:mccRecorder.events.length};
  testCard.hass=testHass;
  return {snapshots,disabledA,disabledB,recovery};
 });
 assert.deepEqual(checks.availability.snapshots.map(x=>x.a),['Missing source','Unknown','Unavailable']);
 assert.ok(checks.availability.snapshots.every(x=>x.b==='72.2'));
 assert.equal(checks.availability.disabledA,true);assert.equal(checks.availability.disabledB,false);
 assert.equal(checks.availability.recovery.events,0);assert.equal(checks.availability.recovery.value,'31.5');
 checks.actions=[];
 for(const method of ['pointer','Enter','Space','touch','body']) {
  await page.evaluate(()=>mccRecorder.reset());
  if(method==='pointer')await a.click();
  else if(['Enter','Space'].includes(method)){await a.focus();await page.keyboard.press(method);}
  else if(method==='touch'){const box=await b.boundingBox();await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);}
  else await body.click();
  const events=await page.evaluate(()=>mccRecorder.events.map(x=>x.target));
  const expected=method==='touch'?'input_boolean.mcc_target_b':method==='body'?'input_boolean.mcc_target_body':'input_boolean.mcc_target_a';
  assert.deepEqual(events,[expected]);checks.actions.push({method,events});
 }
 await page.evaluate(()=>{mccRecorder.reset();mccRecorder.nextOutcome='reject';});await a.click();
 checks.rejected=await a.locator('.status').innerText();assert.equal(checks.rejected,'Rejected');
 assert.equal(await page.evaluate(()=>mccRecorder.events.length),0);
 await page.evaluate(()=>testCard.setConfig({...testConfig,confirm:true}));
 page.once('dialog',dialog=>dialog.dismiss());await a.click();
 checks.cancelled=await a.locator('.status').innerText();assert.equal(checks.cancelled,'Cancelled');
 assert.equal(await page.evaluate(()=>mccRecorder.events.length),0);
 await page.evaluate(()=>{testCard.setConfig(testConfig);testCard.hass=testHass;});
 checks.updates=await page.evaluate(async()=>{
  await resetMutations();
  testCard.hass={...testHass,states:{...testHass.states,'input_number.mcc_unrelated':{state:'1',attributes:{}}}};
  await flush();const unrelated={...mutations};
  await resetMutations();
  testCard.hass={...testHass,states:{...testHass.states,[testConfig.a_source]:{...testHass.states[testConfig.a_source],state:'22.3'}}};
  await flush();const relevant={...mutations};
  testCard.hass={...testHass,language:'pt-BR'};const localized=testCard._nodes.a.value.textContent;
  testCard.style.setProperty('--card-background-color','rgb(17, 17, 17)');
  const dark=getComputedStyle(testCard.shadowRoot.querySelector('article')).backgroundColor;
  testCard.hass=testHass;
  return {unrelated,relevant,localized,dark};
 });
 assert.deepEqual(checks.updates.unrelated,{a:0,b:0,body:0});
 assert.ok(checks.updates.relevant.a>0);assert.equal(checks.updates.relevant.b,0);assert.equal(checks.updates.relevant.body,0);
 assert.equal(checks.updates.localized,'21,1');assert.equal(checks.updates.dark,'rgb(17, 17, 17)');
 checks.lifecycle=await page.evaluate(async()=>{
  const removed=[];
  for(let index=0;index<50;index++) {
   testCard.remove();removed.push({...testCard.ownedResources});
   testCard.hass={...testHass,states:{...testHass.states,[testConfig.a_source]:{...testHass.states[testConfig.a_source],state:String(index)}}};
   document.body.append(testCard);await new Promise(r=>setTimeout(r,100));
  }
  mccRecorder.reset();testCard._nodes.a.button.click();
  const data={removed,connected:testCard.ownedResources,value:testCard._nodes.a.value.textContent,events:mccRecorder.events.length};
  for(const observer of observers)observer.disconnect();testCard.remove();return data;
 });
 assert.ok(checks.lifecycle.removed.every(x=>Object.values(x).every(v=>v===0)));
 assert.equal(checks.lifecycle.connected.listeners,1);assert.equal(checks.lifecycle.value,'49');assert.equal(checks.lifecycle.events,1);
 await result('runtime-check',checks);console.log(JSON.stringify({...checks,lifecycle:{cycles:50,resources:checks.lifecycle.connected,singleDispatch:checks.lifecycle.events}}));
} finally {await browser.close();}
