import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {openHA,ws,result,base,area} from './common.mjs';
import {dashboard} from './editor.mjs';
const results=[];
await mkdir(resolve(area,'screenshots'),{recursive:true});
for(const language of ['en','pt-BR'])for(const theme of ['light','dark']){
 const {browser,page}=await openHA({touch:true,language,colorScheme:theme});
 try{
  await page.goto(`${base}/${dashboard}/sections`);
  await page.waitForFunction(()=>!!customElements.get('minimum-card-contract'));
  const stub=await page.evaluate(()=>customElements.get('minimum-card-contract').getStubConfig());
  for(const labels of ['ordinary','long']){
   const config=labels==='ordinary'?stub:{...stub,a_label:'First independent reading with a deliberately long label Pneumonoultramicroscopicsilicovolcanoconiosis',b_label:'Second independent reading with another long name Supercalifragilisticexpialidocious',body_label:'Separate body action with a long descriptive label and IndependentSyntheticTarget'};
   await ws(page,{type:'lovelace/config/save',url_path:dashboard,config:{views:[
    {title:'Sections',path:'sections',type:'sections',max_columns:1,sections:[{type:'grid',cards:[config]}]},
    {title:'Masonry',path:'masonry',type:'masonry',cards:[config]}
   ]}});
   for(const layout of ['sections','masonry'])for(const viewport of [256,376,632])for(const scale of [1,2]){
    await page.setViewportSize({width:viewport,height:900});
    await page.goto(`${base}/${dashboard}/${layout}`);
    const card=page.locator('minimum-card-contract');await card.waitFor();
    await card.evaluate((element,scale)=>{element.style.fontSize=16*scale+'px';},scale);
    await page.waitForFunction(({dark,language})=>{const c=document.querySelector('home-assistant');const find=root=>{for(const e of root.querySelectorAll('*')){if(e.localName==='minimum-card-contract')return e;if(e.shadowRoot){const v=find(e.shadowRoot);if(v)return v;}}};const card=find(document);return card?.hass?.themes?.darkMode===dark && card.hass.language===language && !!card.shadowRoot.querySelector('link').sheet;},{dark:theme==='dark',language});
    await page.waitForTimeout(150);
    const data=await card.evaluate(element=>{
     const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
     const buttons=[...element.shadowRoot.querySelectorAll('button')];
     const nodes=[element,element.shadowRoot.querySelector('article'),...buttons,...element.shadowRoot.querySelectorAll('span')];
     let wrapper=element;
     while(wrapper && wrapper.localName!=='hui-card')wrapper=wrapper.parentElement??wrapper.getRootNode().host;
     return {width:rect(element).width,height:rect(element).height,wrapper:wrapper?rect(wrapper):null,rect:rect(element),
      font:getComputedStyle(element).fontSize,background:getComputedStyle(element.shadowRoot.querySelector('article')).backgroundColor,
      locale:element.hass.language,dark:element.hass.themes.darkMode,labels:buttons.map(x=>x.getAttribute('aria-label')),
      buttons:buttons.map(rect),overflow:nodes.filter(x=>x.scrollWidth>x.clientWidth+1).map(x=>({tag:x.localName,class:x.className,scroll:x.scrollWidth,client:x.clientWidth}))};
    });
    const expected=viewport-16>500?(layout==='sections'?500:492):viewport-16;
    assert.equal(data.width,expected);assert.equal(data.font,16*scale+'px');assert.equal(data.locale,language);assert.equal(data.dark,theme==='dark');
    assert.deepEqual(data.overflow,[]);assert.ok(data.wrapper.height>=data.height-1);
    for(let i=0;i<3;i++){
     assert.ok(data.buttons[i].width>=48 && data.buttons[i].height>=48);
     for(let j=i+1;j<3;j++)assert.ok(Math.min(data.buttons[i].right,data.buttons[j].right)-Math.max(data.buttons[i].x,data.buttons[j].x)<=1 || Math.min(data.buttons[i].bottom,data.buttons[j].bottom)-Math.max(data.buttons[i].y,data.buttons[j].y)<=1);
    }
    assert.deepEqual(data.labels,[config.a_label,config.b_label,config.body_label]);
    const buttons=card.locator('button');
    await buttons.nth(0).focus();await page.keyboard.press('Tab');
    assert.equal(await buttons.nth(1).evaluate(x=>x.matches(':focus-visible')),true);
    const focus=await buttons.nth(1).evaluate(x=>({width:getComputedStyle(x).outlineWidth,style:getComputedStyle(x).outlineStyle}));
    assert.deepEqual(focus,{width:'3px',style:'solid'});
    await page.keyboard.press('Shift+Tab');
    for(let i=0;i<3;i++){
     assert.equal(await buttons.nth(i).evaluate(x=>x===x.getRootNode().activeElement),true);
     await page.evaluate(()=>mccRecorder.reset());await page.keyboard.press(i===1?'Space':'Enter');
     assert.deepEqual(await page.evaluate(()=>mccRecorder.events.map(x=>x.target)),[config[['a_target','b_target','body_target'][i]]]);
     if(i<2)await page.keyboard.press('Tab');
    }
    for(let i=0;i<3;i++){
     await buttons.nth(i).scrollIntoViewIfNeeded();await page.evaluate(()=>mccRecorder.reset());
     const box=await buttons.nth(i).boundingBox();await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);
     assert.deepEqual(await page.evaluate(()=>mccRecorder.events.map(x=>x.target)),[config[['a_target','b_target','body_target'][i]]]);
    }
    const name=`${language}-${theme}-${labels}-${layout}-${viewport}-${scale}`;
    await page.screenshot({path:resolve(area,'screenshots',name+'.png'),fullPage:true});
    results.push({language,theme,labels,layout,viewport,scale,...data,keyboard:'pass',touch:'emulated pass',focus,pass:true,screenshot:'screenshots/'+name+'.png'});
    console.log('PASS layout',name,data.width+'px');
   }
  }
 }finally{await browser.close();}
}
await result('layout-check',results);
console.log('Layout cases passed:',results.length);
