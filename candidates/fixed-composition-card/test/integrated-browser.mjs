import assert from 'node:assert/strict';
import {completeConfig,role,checkRendering,checkActionInputs,checkGestures,checkUpdatesAndLifecycle} from './runtime-browser.mjs';

export async function checkIntegrated(page) {
 const rendering=await checkRendering(page);
 const actions=await checkActionInputs(page);
 const gestures=await checkGestures(page);
 const lifecycle=await checkUpdatesAndLifecycle(page);
 await page.evaluate(config=>{fccCandidate.setConfig({...config,confirm:'invalid'});fccCandidate.sink.reset();},completeConfig);
 assert.equal(await role(page,'action_1').isEnabled(),false);
 await page.evaluate(()=>fccCandidate.activate('action_1'));
 assert.equal(await page.evaluate(()=>fccCandidate.sink.events.length),0);
 await page.evaluate(config=>{
  fccCandidate.setConfig(config);fccCandidate.sink.reset();
  fccCandidate.hass={...fccCandidate.context,states:{...fccCandidate.context.states,'cover.fcc_primary':{state:'unknown',attributes:{supported_features:15}}}};
 },completeConfig);
 await role(page,'action_1').click();
 const feedback=await page.evaluate(()=>{
  const original=fccCandidate.context;
  const states={...original.states,'button.fcc_memory_1':{...original.states['button.fcc_memory_1'],state:'2026-11-19T23:00:00+00:00'}};
  fccCandidate.hass={...original,states};
  const before={actual:fccCandidate.nodes.actual.textContent,memory:fccCandidate.nodes.action_1.textContent,status:fccCandidate.nodes['action_1-status'].textContent};
  states['cover.fcc_primary']={state:'open',attributes:{supported_features:15,current_position:57}};
  fccCandidate.hass={...original,states};
  return {before,after:{actual:fccCandidate.nodes.actual.textContent,memory:fccCandidate.nodes.action_1.textContent},intents:fccCandidate.sink.events.length};
 });
 assert.equal(feedback.before.actual,'Actual cover: unknown');assert.equal(feedback.before.memory,'Memory one');
 assert.equal(feedback.after.actual,'Actual cover: 57 %');assert.equal(feedback.after.memory,'Memory one');assert.equal(feedback.intents,1);
 await page.evaluate(config=>{fccCandidate.hass=document.querySelector('home-assistant').hass;fccCandidate.setConfig(config);fccCandidate.sink.reset();},completeConfig);
 const range=role(page,'range');await range.scrollIntoViewIfNeeded();
 const box=await range.boundingBox();const point=p=>({x:box.x+8+(box.width-16)*p/100,y:box.y+box.height/2,id:0});
 const cdp=await page.context().newCDPSession(page);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(42)]});
 for(const p of [52,66,78]){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(p)]});assert.equal(await page.evaluate(()=>fccCandidate.sink.events.length),0);}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await page.waitForFunction(()=>fccCandidate.sink.events.length===1);
 const touch=await page.evaluate(()=>fccCandidate.sink.events[0]);assert.equal(touch.service,'set_cover_position');assert.equal(touch.data.position,78);
 return {rendering,actions,gestures,lifecycle,invalidConfirmNoDispatch:true,feedback,emulatedTouchDrag:{method:'CDP touchStart/touchMove/touchEnd',previewIntents:0,releaseIntents:1,percent:touch.data.position}};
}
