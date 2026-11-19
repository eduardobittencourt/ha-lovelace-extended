import assert from 'node:assert/strict';
import {common,workloads,prepare,ready,save,json} from './followup-common.mjs';
const {openHA,createPage,base}=common;
const {browser,page:control,auth}=await openHA();
const rows=[];
try{
 for(const count of [1,10])for(const variant of ['native','experimental']){
  await prepare(control,variant,count);const {context,page}=await createPage(browser,auth);
  try{
   const cdp=await context.newCDPSession(page);const version=await cdp.send('Browser.getVersion');
   await page.goto(base+'/mcc-experiment/bench');await ready(page,variant,count);
   const cards=page.locator(variant==='experimental'?'minimum-card-contract':'hui-tile-card');
   // Keep diagnostic references only for this separate rendering run, not in
   // released-instance retention runs. Do not modify card source or real state.
   await cards.evaluateAll(cards=>{globalThis.mccRenderCards=cards;});
   for(let pair=0;pair<30;pair++)for(const instrumented of pair%2?[true,false]:[false,true]){
    const value=String(30+(pair*2+Number(instrumented))%50);
    const observation=await page.evaluate(async({variant,value,instrumented})=>{
     const cards=mccRenderCards;
     const first=cards[0];
     const original=first.hass;
     const id='input_number.mcc_display_a';
     const hass={...original,states:{...original.states,[id]:{...original.states[id],state:value}}};
     // The actual experimental .value and native ha-tile-info state are read
     // recursively so a content match cannot be just the entity's input object.
     function visibleText(root){let text='';for(const node of root.childNodes){if(node.nodeType===Node.TEXT_NODE)text+=node.textContent;else if(node.nodeType===Node.ELEMENT_NODE&&!['STYLE','SCRIPT','SVG'].includes(node.tagName))text+=visibleText(node.shadowRoot??node);}return text;}
     const stateElement=first.shadowRoot.querySelector(variant==='experimental'?'[data-slot="a"] .value':'state-display');
     if(!stateElement)throw new Error('Expected visible value element not found');
     const stateRoot=stateElement.shadowRoot??stateElement;
     if(Number(visibleText(stateRoot).trim())===Number(value))throw new Error('Fixture change must differ from current rendered content');
     let observer,mutationMs=null,frameMs=null,domText=null,resolveContent;
     const content=new Promise(resolve=>{resolveContent=resolve;});
     const start=performance.now();
     function check(){
      const text=visibleText(stateRoot);
      if(Number(text.trim())!==Number(value))return;
      domText=text;mutationMs=performance.now()-start;
      observer?.disconnect();
      requestAnimationFrame(()=>{frameMs=performance.now()-start;resolveContent();});
     }
     if(instrumented){
      observer=new MutationObserver(check);
      observer.observe(first.shadowRoot,{subtree:true,childList:true,characterData:true,attributes:true});
      // Native nested shadow trees are observed explicitly, since MutationObserver
      // never crosses a shadow boundary on behalf of an ancestor observer.
      function observeRoots(root){for(const e of root.querySelectorAll('*'))if(e.shadowRoot){observer.observe(e.shadowRoot,{subtree:true,childList:true,characterData:true,attributes:true});observeRoots(e.shadowRoot);}}
      observeRoots(first.shadowRoot);
     }
     const setterStart=performance.now();for(const card of cards)card.hass=hass;
     const setterMs=performance.now()-setterStart;
     if(instrumented){
      // Experimental synchronous setters have already changed their text;
      // observer delivery still happens at the microtask checkpoint.
      let timeout;
      try{await Promise.race([content,new Promise((_,reject)=>{timeout=setTimeout(()=>{observer.disconnect();reject(new Error('Visible content milestone timed out'));},3000);})]);}finally{clearTimeout(timeout);}
     }else{
      if(variant==='native')await Promise.all(cards.map(c=>c.updateComplete));
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      domText=visibleText(stateRoot);
     }
     return {setterMs,mutationMs,frameMs,domContainsExpected:Number(domText.trim())===Number(value),observedValue:domText.trim(),value,startClock:'performance.now in browser setter job',endClock:instrumented?'MutationObserver content match and following rAF; neither is final presentation':'No observer; same setter boundary for overhead comparison'};
    },{variant,value,instrumented});
    assert.equal(observation.domContainsExpected,true);
    const item={variant,count,pair,instrumented,version,...observation};rows.push(item);await save('rendering',item);
   }
   await page.evaluate(()=>{delete globalThis.mccRenderCards;});
   console.log('RENDERING',variant,count);
  }finally{await context.close();}
 }
 await json('rendering',{rows,finalPresentation:'unsupported: no validated event/content-to-display/compositor presentation mapping; observed DOM and rAF milestones only',transportAndPhysical:'not measured',acceptance:'pending'});
}catch(error){await json('rejection',{reason:String(error),completedRows:rows.length});throw error;}
finally{await browser.close();}
