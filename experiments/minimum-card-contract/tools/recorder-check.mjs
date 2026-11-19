import assert from 'node:assert/strict';
import { openHA, ws, result } from './common.mjs';
const {browser,page} = await openHA();
try {
 const direct = await page.evaluate(() => {
  const r=mccRecorder;
  r.reset();
  const accepted=r.record('input_boolean.mcc_target_a');
  const rejected=r.record('switch.not_a_fixture');
  r.nextOutcome='cancel';const cancelled=r.record('input_boolean.mcc_target_a');
  r.nextOutcome='reject';const injected=r.record('input_boolean.mcc_target_a');
  const count=r.events.length;
  r.reset();
  return {accepted,rejected,cancelled,injected,count};
 });
 assert.equal(direct.count,1);
 assert.equal(direct.accepted.status,'recorded');
 assert.equal(direct.rejected.status,'rejected');
 assert.equal(direct.cancelled.status,'cancelled');
 assert.equal(direct.injected.status,'rejected');
 const before=await page.evaluate(()=>document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_a'].state);
 await ws(page,{type:'call_service',domain:'input_boolean',service:'toggle',target:{entity_id:'input_boolean.mcc_target_a'}});
 const valid=await page.evaluate(()=>mccRecorder.events.map(({target,origin})=>({target,origin})));
 assert.equal(valid.length,1);
 await assert.rejects(ws(page,{type:'call_service',domain:'switch',service:'turn_on',target:{entity_id:'switch.not_a_fixture'}}));
 await page.evaluate(async()=>{
  const helpers=await window.loadCardHelpers();
  const card=helpers.createCardElement({type:'tile',entity:'input_boolean.mcc_target_a',tap_action:{action:'toggle'}});
  await customElements.whenDefined('hui-tile-card');
  card.hass=document.querySelector('home-assistant').hass;
  card.style.cssText='position:fixed;top:100px;left:400px;width:360px;z-index:99999';
  document.body.append(card);
  globalThis.mccNative=card;
  mccRecorder.reset();
 });
 await page.locator('hui-tile-card').last().getByRole('button').first().click();
 await page.waitForFunction(()=>mccRecorder.events.length===1, null, {timeout:3000});
 const native=await page.evaluate(()=>({events:mccRecorder.events.map(({target,origin})=>({target,origin})),state:document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_a'].state}));
 assert.equal(native.events.length,1);
 assert.equal(native.events[0].origin,'native');
 assert.equal(native.state,before);
 const data={direct,valid,native,transport:'all browser call_service messages intercepted; REST services blocked'};
 await result('recorder-check',data);
 console.log(JSON.stringify(data));
} finally { await browser.close(); }
