import {ws,base,createPage} from './common.mjs';
import {dashboard} from './editor.mjs';
export const fixture={type:'custom:minimum-card-contract',a_source:'input_number.mcc_display_a',a_target:'input_boolean.mcc_target_a',a_label:'First reading',b_source:'input_number.mcc_display_b',b_target:'input_boolean.mcc_target_b',b_label:'Second reading',body_target:'input_boolean.mcc_target_body',body_label:'Body intent',confirm:false};
export const resource='/local/minimum-card-contract/card.js';
export function workload(variant,count){
 const group=variant==='experimental'?[fixture]:['a','b','body'].map(slot=>({type:'tile',entity:slot==='body'?fixture.body_target:fixture[slot+'_source'],name:fixture[slot+'_label'],tap_action:{action:'perform-action',perform_action:'input_boolean.toggle',target:{entity_id:fixture[slot+'_target']}},icon_tap_action:{action:'none'}}));
 return Array.from({length:count},()=>structuredClone(group)).flat();
}
export async function prepare(control,variant,count){
 const resources=await ws(control,{type:'lovelace/resources'});
 for(const item of resources.filter(x=>x.url===resource))if(variant==='native')await ws(control,{type:'lovelace/resources/delete',resource_id:item.id});
 if(variant==='experimental'&&!resources.some(x=>x.url===resource))await ws(control,{type:'lovelace/resources/create',res_type:'module',url:resource});
 const config=await ws(control,{type:'lovelace/config',url_path:dashboard,force:true});
 config.views=config.views.filter(x=>x.path!=='bench');
 config.views.push({title:'Benchmark',path:'bench',type:'masonry',cards:workload(variant,count)});
 await ws(control,{type:'lovelace/config/save',url_path:dashboard,config});
}
export async function ready(page,variant,count){
 await page.locator(variant==='native'?'hui-tile-card':'minimum-card-contract').first().waitFor();
 const selector=variant==='native'?'hui-tile-card':'minimum-card-contract';
 // Locator evaluation pierces the real dashboard's open shadow roots.
 await page.locator(selector).evaluateAll(async(cards,{variant,count})=>{
  if(cards.length!==(variant==='native'?count*3:count))throw new Error('Unexpected card count');
  if(variant==='native')await Promise.all(cards.map(c=>c.updateComplete));
  else await Promise.all(cards.map(c=>new Promise(resolve=>{
   const link=c.shadowRoot.querySelector('link');if(link.sheet)resolve();else link.addEventListener('load',resolve,{once:true});
  })));
  await document.fonts.ready;
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 },{variant,count});
}
export async function metrics(cdp){
 return Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
}
export async function newWorkloadPage(browser,auth,variant,count){
 const {context,page}=await createPage(browser,auth);
 const cdp=await context.newCDPSession(page);
 await cdp.send('Performance.enable');await cdp.send('Network.enable');
 await page.goto(`${base}/${dashboard}/bench`);await ready(page,variant,count);
 return {context,page,cdp};
}
