import assert from 'node:assert/strict';
import {openHA,result,base} from './common.mjs';
import {openDashboard,storedCard} from './editor.mjs';
const {browser,page,auth}=await openHA({touch:true});
try{
 await openDashboard(page);const card=page.locator('minimum-card-contract').first();await card.waitFor();
 const config=await storedCard(page);assert.equal(config.confirm,false);
 assert.deepEqual(await card.evaluate(c=>c._config),config);
 const statesBefore=await page.evaluate(()=>Object.fromEntries(Object.entries(document.querySelector('home-assistant').hass.states).filter(([id])=>id.startsWith('input_boolean.mcc_')).map(([id,s])=>[id,s.state])));
 const activations=[];
 for(const [slot,method]of [['a','pointer'],['b','keyboard'],['body','touch']]){
  await page.evaluate(()=>mccRecorder.reset());const button=card.locator(`button[data-slot=${slot}]`);
  if(method==='pointer')await button.click();
  else if(method==='keyboard'){await button.focus();await page.keyboard.press('Enter');}
  else{await button.scrollIntoViewIfNeeded();const b=await button.boundingBox();await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);}
  const targets=await page.evaluate(()=>mccRecorder.events.map(x=>x.target));assert.deepEqual(targets,[config[slot+'_target']]);activations.push({slot,method,targets});
 }
 await page.reload();await card.waitFor();
 assert.equal(await page.evaluate(()=>mccRecorder.events.length),0);
 assert.deepEqual(await card.evaluate(c=>c._config),config);
 const beforeValues=await card.locator('.value').allTextContents();
 await card.evaluate(c=>{
  globalThis.integratedMutations={a:0,b:0,body:0};
  globalThis.integratedObservers=Object.entries(c._nodes).map(([key,{button}])=>{
   const o=new MutationObserver(xs=>{integratedMutations[key]+=xs.length;});o.observe(button,{childList:true,subtree:true,characterData:true,attributes:true});return o;
  });
 });
 const original=await page.evaluate(()=>document.querySelector('home-assistant').hass.states['input_number.mcc_display_a']);
 const headers={'Authorization':'Bearer '+auth.access_token,'Content-Type':'application/json'};
 const post=async(id,state,attributes={})=>{const response=await fetch(base+'/api/states/'+id,{method:'POST',headers,body:JSON.stringify({state,attributes})});assert.ok(response.ok);};
 await post('input_number.mcc_unrelated','7');
 await page.waitForFunction(()=>document.querySelector('home-assistant').hass.states['input_number.mcc_unrelated']?.state==='7');
 await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const unrelated=await page.evaluate(()=>({...integratedMutations}));assert.deepEqual(unrelated,{a:0,b:0,body:0});
 await page.evaluate(()=>{integratedMutations={a:0,b:0,body:0};});
 await post('input_number.mcc_display_a','25',original.attributes);
 await page.waitForFunction(()=>document.querySelector('home-assistant').hass.states['input_number.mcc_display_a'].state==='25');
 await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const relevant=await page.evaluate(()=>({...integratedMutations}));
 assert.ok(relevant.b>0);assert.equal(relevant.a,0);assert.equal(relevant.body,0);
 await post('input_number.mcc_display_a',original.state,original.attributes);
 await fetch(base+'/api/states/input_number.mcc_unrelated',{method:'DELETE',headers});
 await page.evaluate(()=>{for(const o of integratedObservers)o.disconnect();});
 const after=await page.evaluate(()=>Object.fromEntries(Object.entries(document.querySelector('home-assistant').hass.states).filter(([id])=>id.startsWith('input_boolean.mcc_')).map(([id,s])=>[id,s.state])));
 assert.deepEqual(after,statesBefore);
 const data={config,activations,reloadReplay:0,beforeValues,actualHAUpdates:{unrelated,relevant},targetStatesBefore:statesBefore,targetStatesAfter:after,scope:'Actual persisted card and live HA hass delivery; intercepted actions only'};
 await result('integrated-check',data);console.log(JSON.stringify(data));
}finally{await browser.close();}
