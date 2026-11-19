import assert from 'node:assert/strict';

export function validateMilestones(m){
 const ordered=['init','dom','mounted','settled','frame1','frame2'];
 let previous=-Infinity;
 for(const name of ordered){
  assert.ok(Number.isFinite(m[name]),'Missing milestone: '+name);
  assert.ok(m[name]>=previous,'Out-of-order milestone: '+name);
  previous=m[name];
 }
 assert.ok(Number.isFinite(m.reference)&&m.reference>=m.init,'Missing/invalid reference');
 return {mountToSettleMs:m.settled-m.mounted,settleToFramesMs:m.frame2-m.settled,
         observerAfterFramesMs:m.reference-m.frame2};
}
export function mapTraceClock(events,mark){
 const anchors=events.filter(e=>e.name==='mcc-clock'&&Number.isFinite(e.ts));
 assert.equal(anchors.length,1,'Require one trace/browser clock anchor');
 assert.ok(Number.isFinite(mark));
 return {offsetMs:anchors[0].ts/1000-mark,
         boundary:'Single same-document user-timing anchor; no drift or physical-clock claim'};
}

// Diagnostics run in parallel with, and do not replace, the historical ready helper.
export function installMilestones({variant,count}){
 const m=globalThis.__MCC_PHASES__={init:performance.now()};
 document.addEventListener('DOMContentLoaded',()=>{m.dom=performance.now();},{once:true});
 const selector=variant==='native'?'hui-tile-card':'minimum-card-contract';
 function find(root){
  const found=[...root.querySelectorAll(selector)];
  for(const el of root.querySelectorAll('*'))if(el.shadowRoot)found.push(...find(el.shadowRoot));
  return found;
 }
 async function probe(){
  const cards=find(document);
  const ha=document.querySelector('home-assistant');
  if(ha?.hass&&!Number.isFinite(m.hass))m.hass=performance.now();
  const expected=variant==='empty'?0:variant==='native'?count*3:count;
  const mounted=variant==='empty'?ha?.hass&&findButton(document):cards.length===expected;
  if(!mounted){setTimeout(probe,10);return;}
  m.mounted=performance.now();
  if(variant==='native')await Promise.all(cards.map(c=>c.updateComplete));
  if(variant==='experimental')await Promise.all(cards.map(c=>new Promise(r=>{
   const link=c.shadowRoot.querySelector('link');if(link.sheet)r();else link.addEventListener('load',r,{once:true});
  })));
  await document.fonts.ready;m.settled=performance.now();
  requestAnimationFrame(()=>{m.frame1=performance.now();requestAnimationFrame(()=>{m.frame2=performance.now();});});
 }
 function findButton(root){
  // Pinned HA passes its accessible label as a property; hide-title suppresses title.
  if([...root.querySelectorAll('button,ha-icon-button')].some(e=>{
   const labels=[e.label,e.getAttribute('title'),e.getAttribute('aria-label')];
   if(!labels.some(value=>typeof value==='string'&&value.trim()==='Edit dashboard'))return false;
   const visible=e.getBoundingClientRect();
   if(!visible.width||!visible.height||e.disabled)return false;
   m.emptyButton={tag:e.localName,label:labels.find(value=>typeof value==='string'&&value.trim()==='Edit dashboard').trim()};
   return true;
  }))return true;
  for(const el of root.querySelectorAll('*'))if(el.shadowRoot&&findButton(el.shadowRoot))return true;
  return false;
 }
 setTimeout(probe,0);
}
