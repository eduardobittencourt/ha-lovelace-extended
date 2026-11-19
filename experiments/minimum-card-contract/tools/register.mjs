import {openHA,ws,base,result} from './common.mjs';
const {browser,page}=await openHA();
try{
 const resources=await ws(page,{type:'lovelace/resources'});
 const url='/local/minimum-card-contract/card.js';
 if(!resources.some(x=>x.url===url))await ws(page,{type:'lovelace/resources/create',res_type:'module',url});
 await page.goto(base+'/mcc-experiment/sections');
 await page.locator('hui-tile-card').first().waitFor();
 await page.waitForFunction(()=>!!customElements.get('minimum-card-contract'));
 console.log(await page.locator('body').ariaSnapshot());
 const requests=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/minimum-card-contract/')).map(x=>new URL(x.name).pathname));
 await result('registered-resource',{requests});
}catch(error){throw error;}finally{await browser.close();}
