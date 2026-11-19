import { openHA, result } from './common.mjs';
const { browser, page } = await openHA({intercept:false});
try {
 const data = await page.evaluate(() => {
  const hass=document.querySelector('home-assistant').hass;
  return {version:hass.config.version, language:hass.language,fixtures:Object.fromEntries(Object.entries(hass.states).filter(([id])=>id.includes('.mcc_')).map(([id,s])=>[id,s.state]))};
 });
 const assets=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/frontend_latest/')).map(x=>new URL(x.name).pathname));
 await result('ha-smoke', { ...data,assets });
 console.log(JSON.stringify(data));
 console.log((await page.locator('body').ariaSnapshot()).slice(0,2200));
} finally { await browser.close(); }
