import { openHA, ws, result, base } from './common.mjs';
const {browser,page} = await openHA();
try {
 const list=await ws(page,{type:'lovelace/dashboards/list'});
 if(!list.some(x=>x.url_path==='mcc-experiment')) await ws(page,{type:'lovelace/dashboards/create',url_path:'mcc-experiment',title:'Minimum card experiment',mode:'storage',require_admin:true,show_in_sidebar:false});
 const tile={type:'tile',entity:'input_boolean.mcc_target_a',tap_action:{action:'toggle'},grid_options:{columns:12,rows:'auto'}};
 await ws(page,{type:'lovelace/config/save',url_path:'mcc-experiment',config:{views:[
  {title:'Sections',path:'sections',type:'sections',max_columns:1,sections:[{type:'grid',cards:[tile]}]},
  {title:'Masonry',path:'masonry',type:'masonry',cards:[tile]}
 ]}});
 const data=[];
 for(const layout of ['sections','masonry']) for(const width of [256,376,632]) {
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/mcc-experiment/'+layout);
  await page.locator('hui-tile-card').first().waitFor();
  await page.waitForTimeout(400);
  data.push({layout,viewport:width,card:await page.locator('hui-tile-card').first().evaluate(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height}))});
 }
 await result('allocation-preflight',data);console.log(JSON.stringify(data));
} finally {await browser.close();}
