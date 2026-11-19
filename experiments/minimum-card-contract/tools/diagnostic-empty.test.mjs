import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {installMilestones} from './diagnostic-phases.mjs';

test('empty observer finds a visible property-labelled button through shadow roots',async()=>{
 const browser=await chromium.launch();
 try{
  const context=await browser.newContext();
  await context.addInitScript(installMilestones,{variant:'empty',count:1});
  const page=await context.newPage();
  await page.goto('data:text/html,'+encodeURIComponent(`<home-assistant></home-assistant><script>
   const host=document.querySelector('home-assistant');host.hass={};
   const root=host.attachShadow({mode:'open'});
   const button=document.createElement('ha-icon-button');button.label='Edit dashboard ';
   button.disabled=true;button.style.cssText='display:block;width:40px;height:40px';root.append(button);
   globalThis.fixtureButton=button;
  </script>`));
  await page.evaluate(()=>new Promise(r=>setTimeout(r,100)));
  assert.equal(await page.evaluate(()=>__MCC_PHASES__.mounted),undefined,'Disabled button must not signal readiness');
  await page.evaluate(()=>{fixtureButton.disabled=false;fixtureButton.style.display='none';});
  await page.evaluate(()=>new Promise(r=>setTimeout(r,100)));
  assert.equal(await page.evaluate(()=>__MCC_PHASES__.mounted),undefined,'Hidden button must not signal readiness');
  await page.evaluate(()=>{fixtureButton.style.display='block';});
  await page.waitForFunction(()=>Number.isFinite(__MCC_PHASES__.frame2));
  const result=await page.evaluate(()=>({milestones:__MCC_PHASES__,attributes:fixtureButton.getAttributeNames()}));
  assert.deepEqual(result.milestones.emptyButton,{tag:'ha-icon-button',label:'Edit dashboard'});
  assert.ok(!result.attributes.includes('aria-label')&&!result.attributes.includes('title'));
 }finally{await browser.close();}
});
