import assert from 'node:assert/strict';
import {common,prepare,ready,save,json,workloads} from './followup-common.mjs';
const {openHA,createPage,base}=common;
const {browser,page:control,auth}=await openHA();
try{
 await prepare(control,'empty',1);
 const {context,page}=await createPage(browser,auth);
 try{
  const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('Network.enable');
  const version=await cdp.send('Browser.getVersion');
  await cdp.send('Network.clearBrowserCache');
  await page.goto(base+'/mcc-experiment/bench');await ready(page,'empty',1);
  const initial=await workloads.metrics(cdp);
  const beforeOrigin=await page.evaluate(()=>performance.timeOrigin);
  await page.evaluate(()=>{const button=document.createElement('button');button.id='mcc-counter-probe';button.textContent='Counter probe';button.style.cssText='position:fixed;left:300px;top:300px;z-index:2147483647';button.onclick=()=>{const start=performance.now();while(performance.now()-start<500){}};document.body.append(button);});
  await page.locator('#mcc-counter-probe').click();
  const busy=await workloads.metrics(cdp);
  await save('counter-probe-before-reload',{initial,busy});
  assert.ok(busy.ScriptDuration-initial.ScriptDuration>=0.4,'Same-document counter must include the 500 ms busy probe');
  await page.reload();await ready(page,'empty',1);
  const reloaded=await workloads.metrics(cdp);
  const afterOrigin=await page.evaluate(()=>performance.timeOrigin);
  assert.notEqual(beforeOrigin,afterOrigin);
  assert.ok(reloaded.ScriptDuration<busy.ScriptDuration,'Navigation counters reset in the observed browser');
  const value={version,method:'Separate diagnostic run; deliberate 500 ms page click-handler script, then reload; never mixed with timing samples',counterProbe:{beforeMs:initial.ScriptDuration*1000,busyMs:busy.ScriptDuration*1000,afterReloadMs:reloaded.ScriptDuration*1000,beforeOrigin,afterOrigin},decision:'Use CDP totals after navigation and differences only inside one document. Readiness is driver-observed CSS/fonts/card completion plus two rAF opportunities; no final-paint claim.',cacheProof:'All workload trials include resource transfer observations; same-context warm reload is distinct from cold new context plus explicit cache clear.',primarySources:{heapProtocol:'https://chromium.googlesource.com/v8/v8/+/cde7a77e3a253dc96424a7ef8d7118022cd26dfd/include/js_protocol.pdl',weakReferences:'https://github.com/v8/v8.dev/blob/a1dc18bd5c9d0577cee563179fa3922665c68e31/src/features/weak-references.md',animationFrames:'https://github.com/whatwg/html/blob/c4aab9ee4477adbbb7e546b2c4abfc864e918e04/source'},sourceScope:'Versioned primary method definitions; pinned runtime API and observed controls establish compatibility here. These documentation revisions are not asserted to be the browser build source.'};
  await save('method-validation',value);await json('methods',value);console.log('METHODS pass');
 }finally{await context.close();}
}finally{await browser.close();}
