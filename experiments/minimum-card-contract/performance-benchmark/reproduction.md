# Benchmark reproduction and capacity preflight

## Preflight — 2026-11-19

The pinned rootfs and compressed layers are absent. Existing Node 24.22.0, Python 3.14.9, Bubblewrap and Playwright dependencies are available. A Bubblewrap all-namespace test with dropped capabilities exited successfully; this checks namespace creation only, not the still-pending pinned-image identity or running sandbox isolation. Port 18123 is closed. No campaign sandbox has been started.

The filesystem reported 6710702080 available bytes after the maintainer-authorized removal of the regenerable ESPHome ESP-IDF cache (1791533056 bytes reclaimed). Historical evidence, private HA state and the Playwright browser cache were preserved. The existing experiment remains fixed.

Pre-acquisition allocation plan (estimates, not observed peak allocation):

| Allocation | Planned bytes |
| --- | ---: |
| Compressed pinned HA layers | 673894439 |
| Expanded image streams | 2550238720 |
| Filesystem/extraction overhead allowance | 536870912 |
| At most two comparator assets and upstream review sources | 16777216 |
| Scalar captures, calibration and disposable state growth | 268435456 |
| Required free-space stop reserve | 1073741824 |
| Total preflight requirement | 5119958567 |

Available capacity exceeds this plan. Actual extraction allocation can differ; an external one-second storage guard terminates acquisition if available bytes fall below 1 GiB. Do not launch unguarded `image.py`. Full collection requires a fresh preflight and continuous guard; avoid traces outside bounded calibration. Remove only verified campaign-owned incomplete extraction after a storage stop, preserving source notes and raw attempts. The cache cleanup is authorized by the current maintainer instruction; the historical design's unrelated-cache restriction does not override that instruction.

## Acquisition plan

Use the existing `tools/image.py` with `MCC_RESEARCH` set to an external campaign directory. Image digest: `sha256:1e25a28cb9ee48dbcd33b65cbdcf2919d01991fe11f71cdae0a09c9fc3017ebb`. Reuse the existing pinned dependency/browser installation; do not upgrade the host. Acquire only the comparator bundles selected in [selection.md](selection.md), with their immutable source and license references. Keep original notices externally; no upstream implementation is bundled in this repository.

Acquisition completed successfully. Available space fell from 6710697984 to 3150639104 bytes; the one-second guard observed a 3150651392-byte minimum while the process was running. Pinned-image identity returned Core 2026.11.1 / frontend 20261028.5. The unchanged all-namespace sandbox launcher is running with read-only rootfs, isolated networking and loopback relay; active process/namespace checks remain required before admitting collection. No performance collection is authorized by preflight alone; selection, pilots, calibration and a frozen protocol remain required.

Active preflight passed: the inside process has distinct net/PID/mount/user/IPC/UTS namespaces, zero effective capabilities and no eth0 interface. The host relay listens only on 127.0.0.1:18123. Rootfs mounts and fixture-only writable state follow the unchanged versioned sandbox launcher. Startup/authentication and fixture pilots are separate checks.

## Pilot reconstruction

Run from the experiment directory with BENCH_REPO pointing to the checkout root and MCC_RESEARCH to an external campaign directory. Install nothing beyond the already pinned prerequisites. Reacquire the pinned image under the storage guard, run sandbox identity, setup.py, then copy only the selected bundles into the disposable state's `config/www/benchmark-comparators/`. Verify the bundle hashes in selection.md before serving them. Run the guarded sandbox from the checkout root. Use `node tools/ha-smoke.mjs`, then `node tools/allocate.mjs` to create only the disposable dashboard before the external pilot. The initial omitted allocation produced a rejected lovelace/config lookup, which is recorded in pilot.json; no measured sample resulted.

The external pilots use the repository's existing common.mjs, workloads.mjs, recorder.js and dependency lock. Reconstruction requires this repository revision; fixed subject identities are in selection.md. The pilot stops at its first failed composition. The second script separately tests Mushroom after the preserved Button Card failure; it does not replace a slow or invalid timing observation. The inspection script records ordinary focus reachability in the resulting Mushroom dashboard. No script is a calibrated timing collector; there is no frozen benchmark protocol yet.

Recreate these original scripts verbatim, retaining the trailing newline; SHA-256 values identify the exact executed versions. These listings contain no upstream implementation or private authentication state. Existing helper code retains the repository license. Example invocation: `BENCH_REPO=/path/to/checkout MCC_RESEARCH=/path/to/external/campaign node /path/to/external/campaign/pilot.mjs`. Stop via the existing sandbox.py stop command on every exit. Do not publish private state, tokens or authenticated traces.

### acquire-guarded.py

SHA-256: `af92abbe21402b0e9d83be9c04f44f8aa7353dab66519c1b3dc393e2210f283f`

```python
import json, os, shutil, subprocess, time
from pathlib import Path
area=Path(__file__).parent
reserve=1024**3
initial=shutil.disk_usage(area).free
assert initial > 673894439+2550238720+reserve, 'Insufficient preflight reserve'
env=dict(os.environ,MCC_RESEARCH=str(area))
with (area/'image-acquisition.log').open('w') as log:
    proc=subprocess.Popen(['python3','experiments/minimum-card-contract/tools/image.py'],env=env,stdout=log,stderr=subprocess.STDOUT)
    minimum=initial
    while proc.poll() is None:
        free=shutil.disk_usage(area).free
        minimum=min(minimum,free)
        if free < reserve:
            proc.terminate(); proc.wait()
            (area/'storage-stop.json').write_text(json.dumps({'reason':'free space below 1 GiB reserve','free_bytes':free}))
            raise SystemExit('STOP: storage reserve reached; image process terminated')
        time.sleep(1)
    print(json.dumps({'exit_code':proc.returncode,'initial_free_bytes':initial,'minimum_free_bytes':minimum,'final_free_bytes':shutil.disk_usage(area).free}))
    raise SystemExit(proc.returncode)
```

### serve-guarded.py

SHA-256: `61b1925d0855b14d3848de9467ae6a73a8675f1e63772b4856c2fb0d2b5241ca`

```python
import os,subprocess,shutil,time,json,signal
from pathlib import Path
area=Path(__file__).parent
minimum=shutil.disk_usage(area).free
p=subprocess.Popen(['python3','experiments/minimum-card-contract/tools/sandbox.py','serve'],env=dict(os.environ,MCC_RESEARCH=str(area)))
def stop(*args):
 if p.poll() is None:p.terminate()
signal.signal(signal.SIGTERM,stop)
signal.signal(signal.SIGINT,stop)
try:
 while p.poll() is None:
  free=shutil.disk_usage(area).free;minimum=min(minimum,free)
  (area/'storage-monitor.json').write_text(json.dumps({'minimum_free_bytes':minimum,'current_free_bytes':free,'reserve_bytes':1024**3}))
  if free<1024**3:
   stop();raise RuntimeError('Storage reserve reached; sandbox stopped')
  time.sleep(1)
finally:
 stop();p.wait(timeout=30)
```

### pilot.mjs

SHA-256: `6fd07683fd7f081765d0a36b84eeee873fcd5079422c3c3f0c4ec6496a178c17`

```javascript
import assert from 'node:assert/strict';
import {readFile,writeFile,statfs} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const repo=process.env.BENCH_REPO;
assert.ok(repo);
const area=process.env.MCC_RESEARCH;
const common=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/common.mjs'));
const workloads=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/workloads.mjs'));
const {fixture}=workloads;
const resource={experimental:'/local/minimum-card-contract/card.js',button:'/local/benchmark-comparators/button-card.js',mushroom:'/local/benchmark-comparators/mushroom.js'};
const selector={native:'hui-tile-card',experimental:'minimum-card-contract',button:'button-card',mushroom:'mushroom-entity-card'};
const rows=[];
const {browser,page:control,auth}=await common.openHA();
async function prepare(variant){
 const resources=await common.ws(control,{type:'lovelace/resources'});
 for(const r of resources)if(Object.values(resource).includes(r.url)&&r.url!==resource[variant])await common.ws(control,{type:'lovelace/resources/delete',resource_id:r.id});
 if(resource[variant]&&!resources.some(r=>r.url===resource[variant]))await common.ws(control,{type:'lovelace/resources/create',res_type:'module',url:resource[variant]});
 let cards=workloads.workload(variant==='experimental'?'experimental':'native',1);
 if(['button','mushroom'].includes(variant))cards=['a','b','body'].map(slot=>({type:'custom:'+(variant==='button'?'button-card':'mushroom-entity-card'),entity:slot==='body'?fixture.body_target:fixture[slot+'_source'],name:fixture[slot+'_label'],...(variant==='button'?{show_state:true}:{}),tap_action:{action:'perform-action',perform_action:'input_boolean.toggle',target:{entity_id:fixture[slot+'_target']}}}));
 const config=await common.ws(control,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 config.views=config.views.filter(v=>v.path!=='bench');config.views.push({title:'Benchmark',path:'bench',type:'masonry',cards});
 await common.ws(control,{type:'lovelace/config/save',url_path:'mcc-experiment',config});
}
try{
 for(const variant of ['native','experimental','button','mushroom']){
  await prepare(variant);
  const {context,page}=await common.createPage(browser,auth);
  const row={variant,checks:[],status:'pending'};rows.push(row);
  try{
   await page.goto(common.base+'/mcc-experiment/bench');
   await page.locator(selector[variant]).first().waitFor();
   await page.waitForTimeout(1000);
   row.browser=browser.version();
   row.cards=await page.locator(selector[variant]).count();
   assert.equal(row.cards,variant==='experimental'?1:3);
   row.editor=await page.evaluate(tag=>typeof customElements.get(tag)?.getConfigElement==='function',selector[variant]);
   for(const [i,slot] of ['a','b','body'].entries()){
    const card=page.locator(selector[variant]).nth(variant==='experimental'?0:i);
    const target=variant==='experimental'?card.locator('button').nth(i):variant==='native'?card.getByRole('button').first():variant==='button'?card.locator('#card'):card.locator('mushroom-state-item');
    for(const method of ['pointer','keyboard']){
     await page.evaluate(()=>mccRecorder.reset());
     if(method==='pointer')await target.click();
     else {
      await target.focus();
      // Do not synthesize action events or add tabindex: ordinary focused Enter only.
      row.focusable=await target.evaluate(e=>({tabIndex:e.tabIndex,role:e.getAttribute('role'),focused:e.getRootNode().activeElement===e}));
      await page.keyboard.press('Enter');
     }
     await page.waitForTimeout(200);
     const observed=await page.evaluate(()=>({events:mccRecorder.events.map(({target,origin})=>({target,origin})),states:['a','b','body'].map(s=>document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_'+s].state)}));
     row.checks.push({slot,method,...observed});
     assert.equal(observed.events.length,1,variant+' '+slot+' '+method+' single dispatch');
     assert.equal(observed.events[0].target,fixture[slot+'_target']);
     assert.deepEqual(observed.states,['off','off','off']);
    }
   }
   row.resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,host:new URL(r.name).host,transfer:r.transferSize})));
   assert.ok(row.resources.every(r=>r.host==='127.0.0.1:18123'));
   row.status='actions-pass; state-update pilot pending';
  }catch(e){row.status='blocked';row.reason=String(e);console.log('PILOT BLOCKER',variant,row.reason);}
  finally{await context.close();await writeFile(area+'/pilot.json',JSON.stringify({rows},null,2)+'\n');}
  if(row.status==='blocked')break;
 }
}finally{await browser.close();}
```

### mushroom-pilot.mjs

SHA-256: `da8a935cddd5b14c891134a058224abbd141f9e079eb927cee955d9440bb3725`

```javascript
import assert from 'node:assert/strict';
import {readFile,writeFile,statfs} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const repo=process.env.BENCH_REPO;
assert.ok(repo);
const area=process.env.MCC_RESEARCH;
const common=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/common.mjs'));
const workloads=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/workloads.mjs'));
const {fixture}=workloads;
const resource={experimental:'/local/minimum-card-contract/card.js',button:'/local/benchmark-comparators/button-card.js',mushroom:'/local/benchmark-comparators/mushroom.js'};
const selector={native:'hui-tile-card',experimental:'minimum-card-contract',button:'button-card',mushroom:'mushroom-entity-card'};
const rows=[];
const {browser,page:control,auth}=await common.openHA();
async function prepare(variant){
 const resources=await common.ws(control,{type:'lovelace/resources'});
 for(const r of resources)if(Object.values(resource).includes(r.url)&&r.url!==resource[variant])await common.ws(control,{type:'lovelace/resources/delete',resource_id:r.id});
 if(resource[variant]&&!resources.some(r=>r.url===resource[variant]))await common.ws(control,{type:'lovelace/resources/create',res_type:'module',url:resource[variant]});
 let cards=workloads.workload(variant==='experimental'?'experimental':'native',1);
 if(['button','mushroom'].includes(variant))cards=['a','b','body'].map(slot=>({type:'custom:'+(variant==='button'?'button-card':'mushroom-entity-card'),entity:slot==='body'?fixture.body_target:fixture[slot+'_source'],name:fixture[slot+'_label'],...(variant==='button'?{show_state:true}:{}),tap_action:{action:'perform-action',perform_action:'input_boolean.toggle',target:{entity_id:fixture[slot+'_target']}}}));
 const config=await common.ws(control,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 config.views=config.views.filter(v=>v.path!=='bench');config.views.push({title:'Benchmark',path:'bench',type:'masonry',cards});
 await common.ws(control,{type:'lovelace/config/save',url_path:'mcc-experiment',config});
}
try{
 for(const variant of ['mushroom']){
  await prepare(variant);
  const {context,page}=await common.createPage(browser,auth);
  const row={variant,checks:[],status:'pending'};rows.push(row);
  try{
   await page.goto(common.base+'/mcc-experiment/bench');
   await page.locator(selector[variant]).first().waitFor();
   await page.waitForTimeout(1000);
   row.browser=browser.version();
   row.cards=await page.locator(selector[variant]).count();
   assert.equal(row.cards,variant==='experimental'?1:3);
   row.editor=await page.evaluate(tag=>typeof customElements.get(tag)?.getConfigElement==='function',selector[variant]);
   for(const [i,slot] of ['a','b','body'].entries()){
    const card=page.locator(selector[variant]).nth(variant==='experimental'?0:i);
    const target=variant==='experimental'?card.locator('button').nth(i):variant==='native'?card.getByRole('button').first():variant==='button'?card.locator('#card'):card.locator('mushroom-state-item');
    for(const method of ['pointer','keyboard']){
     await page.evaluate(()=>mccRecorder.reset());
     if(method==='pointer')await target.click();
     else {
      await target.focus();
      // Do not synthesize action events or add tabindex: ordinary focused Enter only.
      row.focusable=await target.evaluate(e=>({tabIndex:e.tabIndex,role:e.getAttribute('role'),focused:e.getRootNode().activeElement===e}));
      await page.keyboard.press('Enter');
     }
     await page.waitForTimeout(200);
     const observed=await page.evaluate(()=>({events:mccRecorder.events.map(({target,origin})=>({target,origin})),states:['a','b','body'].map(s=>document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_'+s].state)}));
     row.checks.push({slot,method,...observed});
     assert.equal(observed.events.length,1,variant+' '+slot+' '+method+' single dispatch');
     assert.equal(observed.events[0].target,fixture[slot+'_target']);
     assert.deepEqual(observed.states,['off','off','off']);
    }
   }
   row.resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,host:new URL(r.name).host,transfer:r.transferSize})));
   assert.ok(row.resources.every(r=>r.host==='127.0.0.1:18123'));
   row.status='actions-pass; state-update pilot pending';
  }catch(e){row.status='blocked';row.reason=String(e);console.log('PILOT BLOCKER',variant,row.reason);}
  finally{await context.close();await writeFile(area+'/mushroom-pilot.json',JSON.stringify({rows},null,2)+'\n');}
  if(row.status==='blocked')break;
 }
}finally{await browser.close();}
```

### keyboard-inspect.mjs

SHA-256: `bb833c1befd0b6ec1e5f8040603f0942b7c0fdae2ecce208b1f16af861c7c273`

```javascript
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const common=await import(pathToFileURL(process.env.BENCH_REPO+'/experiments/minimum-card-contract/tools/common.mjs'));
const {browser,page}=await common.openHA();
try{
 await page.goto(common.base+'/mcc-experiment/bench');
 await page.locator('mushroom-entity-card').first().waitFor();
 const controls=await page.locator('mushroom-entity-card').first().evaluate(card=>{
  const all=[];function visit(n){for(const e of n.querySelectorAll('*')){if(e.tabIndex>=0||e.hasAttribute('role'))all.push({tag:e.localName,role:e.getAttribute('role'),tabIndex:e.tabIndex});if(e.shadowRoot)visit(e.shadowRoot);}}visit(card.shadowRoot);return all;
 });
 const tab=[];for(let i=0;i<20;i++){
  await page.keyboard.press('Tab');tab.push(await page.evaluate(()=>{let e=document.activeElement;const path=[];while(e){path.push(e.localName);e=e.shadowRoot?.activeElement;}return path;}));
 }
 await writeFile(process.env.MCC_RESEARCH+'/keyboard-inspection.json',JSON.stringify({controls,tab},null,2)+'\n');console.log(JSON.stringify({controls,cardReached:tab.some(p=>p.includes('mushroom-entity-card'))}));
}finally{await browser.close();}
```

## Resumed negative-comparator campaign

The maintainer authorized continuation with native/experimental/empty only on 2026-11-19. [protocol.json](protocol.json) is frozen before discovery and records all counts, ordering, endpoints, hashes, environment/allocation and invalidation rules. [calibration.json](calibration.json), [retained-pilot.json](retained-pilot.json) and [editor-pilot.json](editor-pilot.json) are pre-collection evidence. Both third-party resources are removed from the disposable resource registry before each retained workload; their failed pilots remain preserved.

Use an exclusive external resume directory. Reconstruct the scripts below there, with their exact filenames and trailing newlines. Run acquisition and serve guards from the checkout root; run Node scripts from `experiments/minimum-card-contract/`, setting `BENCH_REPO` to the checkout root and `MCC_RESEARCH` to the external resume directory. The Node helper asserts this working directory before opening a browser. Existing private disposable HA state supplies generated authentication; it is never published. Recreate it through versioned setup/smoke/allocation tools if absent. Reacquisition observed 6663847936 bytes initially and 3106717696 bytes after extraction, above the 1 GiB reserve. The active isolation and allocation checks are frozen in the protocol environment.

The historical first resume helper is retained as `bench-common-initial.mjs`; reproduce that version as `bench-common.mjs` for the first retained pilot/initial calibration. The final helper gives the unrelated fixture its own friendly name, checks the working directory and bounds input dispatch with a 2000 ms timeout. Final calibration uses that helper and the frozen collector. Earlier fixture assertions and their resolutions are preserved in editor-pilot.json; no discovery sample is replaced. The native source-edit pilot explicitly allows only HA's observed two default additions while comparing every supplied field and sibling exactly.

After reconstructing and verifying every subject/tool hash against protocol.json, run `node collect.mjs loads`, then `node collect.mjs updates`, then `node collect.mjs interactions`, then `node collect.mjs editors`, using the external script's full path if outside the working directory. Never run these modes concurrently. Every mode creates an exclusive output directory and checks hashes before collection. Raw scalar outputs stay outside the checkout; public discovery must contain all attempts with coverage dispositions. End the sandbox on every success/failure/storage exit and verify the listener, PID, socket and owned processes. Keep historical evidence; remove only owned extraction/layer caches when reclaiming space.

### Resumed script index

| External filename | SHA-256 |
| --- | --- |
| `bench-common-initial.mjs` | `01c0564d8f84a9aeb28467e681ee0709d1dd9ef3eebe24e4b1241b23c2fa0644` |
| `bench-common.mjs` | `6e0185d075a67b39a3318ed5154366354dc1a983966e349ad4ccc4602909d0d9` |
| `remaining-pilot.mjs` | `9d80a527421d63ec49546974abe5ccf5ff6c8b5153c44f2cfb2b3ae21db99acc` |
| `native-editor-roundtrip-initial.mjs` | `143f4d14cc305f906417bb88e1030f9e1fcca1f07228743a21ffb10e3acc1d5d` |
| `native-editor-roundtrip.mjs` | `e62cac8aefa0dc28041ad3cf887056bced07b0c0961b610a0e9705e3f72168ac` |
| `calibrate-initial.mjs` | `a65a183524f6323fc42456280bcc7ad35e843e2eb32ea577a29a81ce0f12a272` |
| `calibrate.mjs` | `97eb68feeb9281a7b4114d2991a441755935df50f6b8e5f9d9787df8e673aea8` |
| `driver-calibration.mjs` | `28e40940fd7a8482bd0ffbf9a8a5cfd08e1bff8ed0d2d37717981ef24b98d57b` |
| `collect.mjs` | `49b8f6007607aa99b77d503029f57c9f5e84e86469322eef656555766b883786` |

### resume-1/bench-common-initial.mjs

SHA-256: `01c0564d8f84a9aeb28467e681ee0709d1dd9ef3eebe24e4b1241b23c2fa0644`

```javascript
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile,appendFile,statfs} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {performance as clock} from 'node:perf_hooks';
import {setTimeout as delay} from 'node:timers/promises';
export {assert,clock,delay};
export const repo=process.env.BENCH_REPO;
export const area=process.env.MCC_RESEARCH;
assert.ok(repo&&area);assert.ok(relative(repo,area).startsWith('../'));
export const sha=data=>createHash('sha256').update(data).digest('hex');
export const common=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/common.mjs'));
export const workloads=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/workloads.mjs'));
export const variants=['empty','native','experimental'];
export const rotate=n=>variants.map((_,i)=>variants[(i+n)%variants.length]);
export const {fixture,metrics}=workloads;
export const {base}=common;
export async function space(){const s=await statfs(area);assert.ok(s.bavail*s.bsize>=1024**3,'1 GiB storage reserve reached');return s.bavail*s.bsize;}
export async function output(name){assert.match(name,/^[a-z][a-z0-9-]+$/);const path=resolve(area,name);await space();await mkdir(path);return path;}
export async function json(path,data){await space();await writeFile(path,JSON.stringify(data,null,2)+'\n',{flag:'wx'});}
export async function record(path,data){await space();await appendFile(path,JSON.stringify(data)+'\n');}
export async function prepare(control,variant,count){
 assert.ok(variants.includes(variant));assert.ok([1,10].includes(count));
 // Remove only the two rejected campaign resources, never unrelated registrations.
 for(const r of await common.ws(control,{type:'lovelace/resources'}))if(r.url.startsWith('/local/benchmark-comparators/'))await common.ws(control,{type:'lovelace/resources/delete',resource_id:r.id});
 await workloads.prepare(control,variant==='empty'?'native':variant,variant==='empty'?0:count);
}
export async function ready(page,variant,count){
 if(variant!=='empty')await workloads.ready(page,variant,count);
 else{
  await page.getByRole('button',{name:'Edit dashboard',exact:true}).waitFor();
  assert.equal(await page.locator('hui-tile-card, minimum-card-contract').count(),0);
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 }
}
export async function fresh(browser,auth){
 const data=await common.createPage(browser,auth);const cdp=await data.context.newCDPSession(data.page);
 await cdp.send('Network.enable');await cdp.send('Performance.enable');
 const wire=[];const resources=[];
 cdp.on('Network.webSocketFrameReceived',event=>{try{const m=JSON.parse(event.response.payloadData);wire.push(m);}catch{}});
 cdp.on('Network.responseReceived',event=>{const r=event.response;resources.push({path:new URL(r.url).pathname,host:new URL(r.url).host,fromDiskCache:!!r.fromDiskCache,fromServiceWorker:!!r.fromServiceWorker,status:r.status});});
 return {...data,cdp,wire,resources};
}
export async function activate(page,variant,slot='a'){
 if(variant==='empty'){
  assert.equal(slot,'a');
  if(!await page.locator('#bench-driver').count())await page.evaluate(target=>{const b=document.createElement('button');b.id='bench-driver';b.textContent='Driver-only intent';b.style.cssText='position:fixed;left:300px;top:300px;z-index:2147483647';b.onclick=()=>mccRecorder.record(target,{origin:'driver-control'});document.body.append(b);},fixture.a_target);
  return page.locator('#bench-driver');
 }
 const i=['a','b','body'].indexOf(slot);
 return variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').nth(i):page.locator('hui-tile-card').nth(i).getByRole('button').first();
}
export async function observeInputs(page){
 await page.evaluate(()=>{
  globalThis.benchInputs=[];
  globalThis.benchInputHandler=e=>benchInputs.push({type:e.type,stamp:e.timeStamp,entry:performance.now(),trusted:e.isTrusted});
  document.addEventListener('pointerdown',benchInputHandler,true);document.addEventListener('click',benchInputHandler,true);
 });
}
export async function point(page,variant){const loc=await activate(page,variant);await loc.scrollIntoViewIfNeeded();const b=await loc.boundingBox();assert.ok(b);return {x:b.x+b.width/2,y:b.y+b.height/2};}
export async function dispatch(cdp,p){await cdp.send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});}
export async function targets(page){return page.evaluate(()=>['a','b','body'].map(s=>document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_'+s].state));}
export async function setState(auth,id,value,attributes={}){
 assert.ok(['input_number.mcc_display_a','input_number.mcc_display_b','input_number.mcc_unrelated'].includes(id));
 const r=await fetch(base+'/api/states/'+id,{method:'POST',headers:{Authorization:'Bearer '+auth.access_token,'Content-Type':'application/json'},body:JSON.stringify({state:String(value),attributes})});assert.ok(r.ok,'Synthetic state POST failed: '+r.status);
}
export async function session(){const s=await common.openHA();assert.equal(s.browser.version(),'159.0.8154.6');return s;}
```

### resume-1/bench-common.mjs

SHA-256: `6e0185d075a67b39a3318ed5154366354dc1a983966e349ad4ccc4602909d0d9`

```javascript
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile,appendFile,statfs} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {performance as clock} from 'node:perf_hooks';
import {setTimeout as delay} from 'node:timers/promises';
export {assert,clock,delay};
export const repo=process.env.BENCH_REPO;
export const area=process.env.MCC_RESEARCH;
assert.ok(repo&&area);assert.equal(process.cwd(),repo+'/experiments/minimum-card-contract','Run from the experiment directory');assert.ok(relative(repo,area).startsWith('../'));
export const sha=data=>createHash('sha256').update(data).digest('hex');
export const common=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/common.mjs'));
export const workloads=await import(pathToFileURL(repo+'/experiments/minimum-card-contract/tools/workloads.mjs'));
export const variants=['empty','native','experimental'];
export const rotate=n=>variants.map((_,i)=>variants[(i+n)%variants.length]);
export const {fixture,metrics}=workloads;
export const {base}=common;
export async function space(){const s=await statfs(area);assert.ok(s.bavail*s.bsize>=1024**3,'1 GiB storage reserve reached');return s.bavail*s.bsize;}
export async function output(name){assert.match(name,/^[a-z][a-z0-9-]+$/);const path=resolve(area,name);await space();await mkdir(path);return path;}
export async function json(path,data){await space();await writeFile(path,JSON.stringify(data,null,2)+'\n',{flag:'wx'});}
export async function record(path,data){await space();await appendFile(path,JSON.stringify(data)+'\n');}
export async function prepare(control,variant,count){
 assert.ok(variants.includes(variant));assert.ok([1,10].includes(count));
 // Remove only the two rejected campaign resources, never unrelated registrations.
 for(const r of await common.ws(control,{type:'lovelace/resources'}))if(r.url.startsWith('/local/benchmark-comparators/'))await common.ws(control,{type:'lovelace/resources/delete',resource_id:r.id});
 await workloads.prepare(control,variant==='empty'?'native':variant,variant==='empty'?0:count);
}
export async function ready(page,variant,count){
 if(variant!=='empty')await workloads.ready(page,variant,count);
 else{
  await page.getByRole('button',{name:'Edit dashboard',exact:true}).waitFor();
  assert.equal(await page.locator('hui-tile-card, minimum-card-contract').count(),0);
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 }
}
export async function fresh(browser,auth){
 const data=await common.createPage(browser,auth);const cdp=await data.context.newCDPSession(data.page);
 await cdp.send('Network.enable');await cdp.send('Performance.enable');
 const wire=[];const resources=[];
 cdp.on('Network.webSocketFrameReceived',event=>{try{const m=JSON.parse(event.response.payloadData);wire.push(m);}catch{}});
 cdp.on('Network.responseReceived',event=>{const r=event.response;resources.push({path:new URL(r.url).pathname,host:new URL(r.url).host,fromDiskCache:!!r.fromDiskCache,fromServiceWorker:!!r.fromServiceWorker,status:r.status});});
 return {...data,cdp,wire,resources};
}
export async function activate(page,variant,slot='a'){
 if(variant==='empty'){
  assert.equal(slot,'a');
  if(!await page.locator('#bench-driver').count())await page.evaluate(target=>{const b=document.createElement('button');b.id='bench-driver';b.textContent='Driver-only intent';b.style.cssText='position:fixed;left:300px;top:300px;z-index:2147483647';b.onclick=()=>mccRecorder.record(target,{origin:'driver-control'});document.body.append(b);},fixture.a_target);
  return page.locator('#bench-driver');
 }
 const i=['a','b','body'].indexOf(slot);
 return variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').nth(i):page.locator('hui-tile-card').nth(i).getByRole('button').first();
}
export async function observeInputs(page){
 await page.evaluate(()=>{
  globalThis.benchInputs=[];
  globalThis.benchInputHandler=e=>benchInputs.push({type:e.type,stamp:e.timeStamp,entry:performance.now(),trusted:e.isTrusted});
  document.addEventListener('pointerdown',benchInputHandler,true);document.addEventListener('click',benchInputHandler,true);
 });
}
export async function point(page,variant){const loc=await activate(page,variant);await loc.scrollIntoViewIfNeeded();const b=await loc.boundingBox();assert.ok(b);return {x:b.x+b.width/2,y:b.y+b.height/2};}
export async function dispatch(cdp,p){let timer;const work=(async()=>{await cdp.send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});})();try{await Promise.race([work,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Input dispatch timeout after 2000 ms')),2000);})]);}finally{clearTimeout(timer);}}
export async function targets(page){return page.evaluate(()=>['a','b','body'].map(s=>document.querySelector('home-assistant').hass.states['input_boolean.mcc_target_'+s].state));}
export async function setState(auth,id,value,attributes={}){
 assert.ok(['input_number.mcc_display_a','input_number.mcc_display_b','input_number.mcc_unrelated'].includes(id));
 const r=await fetch(base+'/api/states/'+id,{method:'POST',headers:{Authorization:'Bearer '+auth.access_token,'Content-Type':'application/json'},body:JSON.stringify({state:String(value),attributes:id==='input_number.mcc_unrelated'?{...attributes,friendly_name:'Benchmark unrelated'}:attributes})});assert.ok(r.ok,'Synthetic state POST failed: '+r.status);
}
export async function session(){const s=await common.openHA();assert.equal(s.browser.version(),'159.0.8154.6');return s;}
```

### resume-1/remaining-pilot.mjs

SHA-256: `9d80a527421d63ec49546974abe5ccf5ff6c8b5153c44f2cfb2b3ae21db99acc`

```javascript
import {assert,common,workloads,fixture,base,prepare,ready,fresh,activate,targets,setState,session,output,json,delay,area} from './bench-common.mjs';
const out=await output('remaining-pilot');const rows=[];const s=await session();
const originals=await s.page.evaluate(()=>Object.fromEntries(['a','b'].map(k=>{const id='input_number.mcc_display_'+k;return [id,document.querySelector('home-assistant').hass.states[id]];})));
try{
 for(const count of [1,10])for(const variant of ['empty','native','experimental']){
  await prepare(s.page,variant,count);const d=await fresh(s.browser,s.auth);const row={variant,count,actions:[],updates:[],status:'pending'};rows.push(row);
  try{
   await d.page.goto(base+'/mcc-experiment/bench');await ready(d.page,variant,count);
   row.interception=await d.page.evaluate(()=>__MCC_INTERCEPT_NATIVE__);assert.equal(row.interception,true);
   for(const slot of variant==='empty'?['a']:['a','b','body'])for(const method of ['pointer','keyboard']){
    await d.page.evaluate(()=>mccRecorder.reset());const b=await activate(d.page,variant,slot);
    if(method==='pointer')await b.click();else await b.press('Enter');
    await d.page.waitForFunction(()=>mccRecorder.events.length===1);
    const events=await d.page.evaluate(()=>mccRecorder.events.map(({target,origin})=>({target,origin})));
    assert.equal(events.length,1);assert.equal(events[0].target,fixture[slot+'_target']);assert.deepEqual(await targets(d.page),['off','off','off']);row.actions.push({slot,method,events});
   }
   // Inspect ordinary compressed entity messages outside the browser; no new subscription.
   for(const kind of ['relevant','unrelated']){
    const id=kind==='relevant'?fixture.a_source:'input_number.mcc_unrelated';
    if(kind==='relevant'){await setState(s.auth,id,31,originals[fixture.a_source].attributes);await d.page.waitForFunction(id=>Number(document.querySelector('home-assistant').hass.states[id]?.state)===31,id);}
    const baseline=await d.page.locator(variant==='experimental'?'minimum-card-contract':variant==='native'?'hui-tile-card':'body').evaluateAll(es=>{function text(e){return (e.textContent??'')+[...(e.shadowRoot?.querySelectorAll('*')??[])].map(n=>n.shadowRoot?text(n):n.textContent??'').join('');}return es.map(text);});
    d.wire.length=0;
    for(let i=0;i<5;i++){await setState(s.auth,id,41+i,originals[fixture.a_source].attributes);await d.page.waitForFunction(({id,value})=>Number(document.querySelector('home-assistant').hass.states[id]?.state)===value,{id,value:41+i});}
    const incoming=d.wire.filter(m=>m.event?.c?.[id]||m.event?.a?.[id]);
    const after=await d.page.locator(variant==='experimental'?'minimum-card-contract':variant==='native'?'hui-tile-card':'body').evaluateAll(es=>{function text(e){return (e.textContent??'')+[...(e.shadowRoot?.querySelectorAll('*')??[])].map(n=>n.shadowRoot?text(n):n.textContent??'').join('');}return es.map(text);});
    row.updates.push({kind,sent:5,compressedFrames:incoming.length,example:incoming[0]?.event?.c?.[id]??incoming[0]?.event?.a?.[id],final:await d.page.evaluate(id=>document.querySelector('home-assistant').hass.states[id].state,id),visibleChanged:JSON.stringify(baseline)!==JSON.stringify(after)});
    assert.equal(incoming.length,5,'Every synthetic change must reach existing entity stream');
    if(kind==='unrelated'&&variant==='experimental')assert.deepEqual(after,baseline);
    if(kind==='relevant'&&variant!=='empty')assert.notDeepEqual(after,baseline);
   }
   row.resources=d.resources;assert.ok(row.resources.every(r=>r.host==='127.0.0.1:18123'));
   const own=row.resources.filter(r=>r.path.startsWith('/local/'));
   assert.equal(own.some(r=>r.path.includes('benchmark-comparators')),false);
   assert.equal(own.some(r=>r.path.includes('minimum-card-contract')),variant==='experimental');
   row.status='pass';console.log('PILOT',variant,count,'pass');
  }catch(e){row.status='failed';row.reason=String(e);throw e;}
  finally{await d.context.close();}
 }
 await json(out+'/samples.json',{rows,completed:true,empty:'Driver/shared-shell context only; no equivalent card or editor'});
}catch(e){await json(out+'/incomplete.json',{rows,reason:String(e)});throw e;}
finally{
 for(const [id,state] of Object.entries(originals))await setState(s.auth,id,state.state,state.attributes);
 await s.browser.close();
}
```

### resume-1/native-editor-roundtrip-initial.mjs

SHA-256: `143f4d14cc305f906417bb88e1030f9e1fcca1f07228743a21ffb10e3acc1d5d`

```javascript
import {common,prepare,base,session,output,json,ready,assert,setState,fixture} from './bench-common.mjs';
const out=await output('native-editor-roundtrip');const s=await session();
try{
 await setState(s.auth,'input_number.mcc_unrelated',0,{friendly_name:'Benchmark unrelated'});
 await prepare(s.page,'native',1);
 const before=await common.ws(s.page,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 async function open(){await s.page.goto(base+'/mcc-experiment/bench');await ready(s.page,'native',1);await s.page.getByRole('button',{name:'Edit dashboard',exact:true}).click();await s.page.getByRole('button',{name:'Edit',exact:true}).first().press('Enter');await s.page.locator('hui-tile-card-editor').waitFor();}
 await open();await s.page.getByRole('button',{name:'Entity Experiment display A',exact:true}).click();
 await s.page.getByRole('option',{name:/^Experiment display B /}).click();
 await s.page.getByRole('button',{name:'Save',exact:true}).click();await s.page.getByRole('button',{name:'Done',exact:true}).click();
 const after=await common.ws(s.page,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 const expected=structuredClone(before);expected.views.find(v=>v.path==='bench').cards[0].entity=fixture.b_source;assert.deepEqual(after,expected);
 await open();await s.page.getByRole('button',{name:'Entity Experiment display B',exact:true}).waitFor();
 const saved=after.views.find(v=>v.path==='bench').cards;
 assert.equal(saved[0].tap_action.target.entity_id,fixture.a_target);assert.equal(saved[1].entity,fixture.b_source);assert.equal(saved[1].tap_action.target.entity_id,fixture.b_target);
 await s.page.getByRole('button',{name:'Cancel',exact:true}).click();await s.page.getByRole('button',{name:'Done',exact:true}).click();
 await json(out+'/samples.json',{completed:true,before:before.views.find(v=>v.path==='bench').cards,after:saved,changed:'First Tile display entity',allUntouchedFieldsPreserved:true,reloadedAndReopened:true,limitation:'Three individual Tile editors, not a composite two-slot editor'});
 console.log('NATIVE VISUAL ROUNDTRIP pass');
 await prepare(s.page,'experimental',1);
}finally{await s.browser.close();}
```

### resume-1/native-editor-roundtrip.mjs

SHA-256: `e62cac8aefa0dc28041ad3cf887056bced07b0c0961b610a0e9705e3f72168ac`

```javascript
import {common,prepare,base,session,output,json,ready,assert,setState,fixture} from './bench-common.mjs';
const out=await output('native-editor-roundtrip-final');const s=await session();
try{
 await setState(s.auth,'input_number.mcc_unrelated',0,{friendly_name:'Benchmark unrelated'});
 await prepare(s.page,'native',1);
 const before=await common.ws(s.page,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 async function open(){await s.page.goto(base+'/mcc-experiment/bench');await ready(s.page,'native',1);await s.page.getByRole('button',{name:'Edit dashboard',exact:true}).click();await s.page.getByRole('button',{name:'Edit',exact:true}).first().press('Enter');await s.page.locator('hui-tile-card-editor').waitFor();}
 await open();await s.page.getByRole('button',{name:'Entity Experiment display A',exact:true}).click();
 await s.page.getByRole('option',{name:/^Experiment display B /}).click();
 await s.page.getByRole('button',{name:'Save',exact:true}).click();await s.page.getByRole('button',{name:'Done',exact:true}).click();
 const after=await common.ws(s.page,{type:'lovelace/config',url_path:'mcc-experiment',force:true});
 const expected=structuredClone(before);expected.views.find(v=>v.path==='bench').cards[0].entity=fixture.b_source;Object.assign(expected.views.find(v=>v.path==='bench').cards[0],{vertical:false,features_position:'bottom'});assert.deepEqual(after,expected);
 await open();await s.page.getByRole('button',{name:'Entity Experiment display B',exact:true}).waitFor();
 const saved=after.views.find(v=>v.path==='bench').cards;
 assert.equal(saved[0].tap_action.target.entity_id,fixture.a_target);assert.equal(saved[1].entity,fixture.b_source);assert.equal(saved[1].tap_action.target.entity_id,fixture.b_target);
 await s.page.getByRole('button',{name:'Cancel',exact:true}).click();await s.page.getByRole('button',{name:'Done',exact:true}).click();
 await json(out+'/samples.json',{completed:true,before:before.views.find(v=>v.path==='bench').cards,after:saved,changed:'First Tile display entity',allUntouchedFieldsPreserved:true,nativeNormalization:{vertical:false,features_position:'bottom'},reloadedAndReopened:true,limitation:'Three individual Tile editors, not a composite two-slot editor'});
 console.log('NATIVE VISUAL ROUNDTRIP pass');
 await prepare(s.page,'experimental',1);
}finally{await s.browser.close();}
```

### resume-1/calibrate-initial.mjs

SHA-256: `a65a183524f6323fc42456280bcc7ad35e843e2eb32ea577a29a81ce0f12a272`

```javascript
import {assert,common,fixture,base,prepare,ready,fresh,session,output,json,metrics,observeInputs,point,dispatch,clock,delay,setState,targets} from './bench-common.mjs';
const out=await output('calibration');const s=await session();const rows={navigation:{},inputs:[],overhead:[],support:{}};
let d;
try{
 await prepare(s.page,'experimental',1);d=await fresh(s.browser,s.auth);
 await d.cdp.send('Network.clearBrowserCache');await d.page.goto(base+'/mcc-experiment/bench');await ready(d.page,'experimental',1);
 async function capture(){const p=await d.page.evaluate(()=>({origin:performance.timeOrigin,now:performance.now(),document:performance.getEntriesByType('navigation')[0].transferSize,resources:performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize}))}));return {...p,metrics:await metrics(d.cdp)};}
 const cold=await capture();const before=await metrics(d.cdp);
 await d.page.evaluate(()=>{const start=performance.now();while(performance.now()-start<1500){};});
 const burned=await metrics(d.cdp);assert.ok((burned.TaskDuration-before.TaskDuration)*1000>=1400);
 await d.page.reload();await ready(d.page,'experimental',1);const warm=await capture();
 assert.notEqual(cold.origin,warm.origin);assert.ok(warm.metrics.TaskDuration<burned.TaskDuration,'Navigation resets rather than cumulative counters');
 const deltaBefore=await metrics(d.cdp);await d.page.evaluate(()=>{const start=performance.now();while(performance.now()-start<50){};});const deltaAfter=await metrics(d.cdp);
 assert.ok((deltaAfter.TaskDuration-deltaBefore.TaskDuration)*1000>=40);
 rows.navigation={cold,warm,knownWorkMs:1500,burnTaskMs:(burned.TaskDuration-before.TaskDuration)*1000,sameDocumentPositiveTaskMs:(deltaAfter.TaskDuration-deltaBefore.TaskDuration)*1000,postNavigationTotals:true,crossDocumentSubtraction:false};
 await observeInputs(d.page);const p=await point(d.page,'experimental');
 for(const blocked of [false,true,false,true,false,true]){
  await d.page.evaluate(()=>{mccRecorder.reset();benchInputs.length=0;globalThis.benchBlock=null;});
  if(blocked)await d.page.evaluate(()=>setTimeout(()=>{globalThis.benchBlock={start:performance.now()};while(performance.now()-benchBlock.start<250){};benchBlock.end=performance.now();},100));
  if(blocked)await delay(150);
  const sent=clock.now();await dispatch(d.cdp,p);const returned=clock.now();
  const obs=await d.page.evaluate(()=>({inputs:benchInputs,events:mccRecorder.events.map(({target,time})=>({target,time})),block:benchBlock,now:performance.now(),origin:performance.timeOrigin}));
  assert.equal(obs.events.length,1);assert.equal(obs.events[0].target,fixture.a_target);assert.equal(obs.inputs.filter(x=>x.type==='pointerdown').length,1);
  const input=obs.inputs.find(x=>x.type==='pointerdown');assert.ok(input.stamp>=0&&input.stamp<=input.entry+1&&input.entry<=obs.now);
  rows.inputs.push({blocked,hostRoundtripMs:returned-sent,...obs,queueMs:input.entry-input.stamp,handlerToIntentMs:obs.events[0].time-input.entry,eventToIntentMs:obs.events[0].time-input.stamp});
 }
 const idle=rows.inputs.filter(r=>!r.blocked).map(r=>r.queueMs),blocked=rows.inputs.filter(r=>r.blocked).map(r=>r.queueMs);
 rows.support.eventClock='DOM high-resolution event time relative to the same document performance.timeOrigin; domain checks passed';
 rows.support.queueing=Math.min(...blocked)>Math.max(...idle)+50?'supported by positive control':'unsupported: positive control did not distinguish pre-handler delay';
 rows.support.localIntent='supported, pointerdown capture entry to local recorded intent; excludes earlier queueing';
 // Paired instrumentation controls. Both variants retain interception and Performance counters.
 for(let repeat=0;repeat<5;repeat++)for(const observed of repeat%2?[true,false]:[false,true]){
  await d.page.evaluate(observed=>{benchInputs.length=0;mccRecorder.reset();for(const type of ['pointerdown','click'])document[observed?'addEventListener':'removeEventListener'](type,benchInputHandler,true);},observed);
  if(observed)await d.cdp.send('Network.enable');else await d.cdp.send('Network.disable');
  const before=await metrics(d.cdp),start=clock.now();
  for(let i=0;i<10;i++){await dispatch(d.cdp,p);await delay(20);}
  const after=await metrics(d.cdp);const check=await d.page.evaluate(()=>({events:mccRecorder.events.length,inputEvents:benchInputs.length}));assert.equal(check.events,10);assert.equal(check.inputEvents,observed?20:0);
  rows.overhead.push({repeat,observed,...check,elapsedMs:clock.now()-start,taskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000});
 }
 await d.cdp.send('Network.enable');
 rows.support.overhead='Matched observer/no-observer task/script distributions published; no zero-overhead assumption or subtraction from discovery';
 rows.support.presentation='pending; unmeasured';rows.support.transport='unmeasured; intercepted';
 assert.deepEqual(await targets(d.page),['off','off','off']);
 await json(out+'/samples.json',{completed:true,...rows});console.log('CALIBRATION',JSON.stringify(rows.support));
}catch(e){await json(out+'/incomplete.json',{reason:String(e),rows});throw e;}
finally{await d?.context.close();await s.browser.close();}
```

### resume-1/calibrate.mjs

SHA-256: `97eb68feeb9281a7b4114d2991a441755935df50f6b8e5f9d9787df8e673aea8`

```javascript
import {assert,common,fixture,base,prepare,ready,fresh,session,output,json,metrics,observeInputs,point,dispatch,clock,delay,setState,targets} from './bench-common.mjs';
const out=await output(process.argv[2]??'calibration');const s=await session();const rows={navigation:{},inputs:[],overhead:[],support:{}};
let d;
try{
 await prepare(s.page,'experimental',1);d=await fresh(s.browser,s.auth);
 await d.cdp.send('Network.clearBrowserCache');await d.page.goto(base+'/mcc-experiment/bench');await ready(d.page,'experimental',1);
 async function capture(){const p=await d.page.evaluate(()=>({origin:performance.timeOrigin,now:performance.now(),document:performance.getEntriesByType('navigation')[0].transferSize,resources:performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize}))}));return {...p,metrics:await metrics(d.cdp)};}
 const cold=await capture();const before=await metrics(d.cdp);
 await d.page.evaluate(()=>{const start=performance.now();while(performance.now()-start<1500){};});
 const burned=await metrics(d.cdp);assert.ok((burned.TaskDuration-before.TaskDuration)*1000>=1400);
 await d.page.reload();await ready(d.page,'experimental',1);const warm=await capture();
 assert.notEqual(cold.origin,warm.origin);assert.ok(warm.metrics.TaskDuration<burned.TaskDuration,'Navigation resets rather than cumulative counters');
 const deltaBefore=await metrics(d.cdp);await d.page.evaluate(()=>{const start=performance.now();while(performance.now()-start<50){};});const deltaAfter=await metrics(d.cdp);
 assert.ok((deltaAfter.TaskDuration-deltaBefore.TaskDuration)*1000>=40);
 rows.navigation={cold,warm,knownWorkMs:1500,burnTaskMs:(burned.TaskDuration-before.TaskDuration)*1000,sameDocumentPositiveTaskMs:(deltaAfter.TaskDuration-deltaBefore.TaskDuration)*1000,postNavigationTotals:true,crossDocumentSubtraction:false};
 await observeInputs(d.page);const p=await point(d.page,'experimental');
 for(const blocked of [false,true,false,true,false,true]){
  await d.page.evaluate(()=>{mccRecorder.reset();benchInputs.length=0;globalThis.benchBlock=null;});
  if(blocked)await d.page.evaluate(()=>setTimeout(()=>{globalThis.benchBlock={start:performance.now()};while(performance.now()-benchBlock.start<250){};benchBlock.end=performance.now();},100));
  if(blocked)await delay(150);
  const sent=clock.now();await dispatch(d.cdp,p);const returned=clock.now();
  const obs=await d.page.evaluate(()=>({inputs:benchInputs,events:mccRecorder.events.map(({target,time})=>({target,time})),block:benchBlock,now:performance.now(),origin:performance.timeOrigin}));
  assert.equal(obs.events.length,1);assert.equal(obs.events[0].target,fixture.a_target);assert.equal(obs.inputs.filter(x=>x.type==='pointerdown').length,1);
  const input=obs.inputs.find(x=>x.type==='pointerdown');assert.ok(input.stamp>=0&&input.stamp<=input.entry+1&&input.entry<=obs.now);
  rows.inputs.push({blocked,hostRoundtripMs:returned-sent,...obs,queueMs:input.entry-input.stamp,handlerToIntentMs:obs.events[0].time-input.entry,eventToIntentMs:obs.events[0].time-input.stamp});
 }
 const idle=rows.inputs.filter(r=>!r.blocked).map(r=>r.queueMs),blocked=rows.inputs.filter(r=>r.blocked).map(r=>r.queueMs);
 rows.support.eventClock='DOM high-resolution event time relative to the same document performance.timeOrigin; domain checks passed';
 rows.support.queueing=Math.min(...blocked)>Math.max(...idle)+50?'supported by positive control':'unsupported: positive control did not distinguish pre-handler delay';
 rows.support.localIntent='supported, pointerdown capture entry to local recorded intent; excludes earlier queueing';
 // Paired instrumentation controls. Both variants retain interception and Performance counters.
 for(let repeat=0;repeat<5;repeat++)for(const observed of repeat%2?[true,false]:[false,true]){
  await d.page.evaluate(observed=>{benchInputs.length=0;mccRecorder.reset();for(const type of ['pointerdown','click'])document[observed?'addEventListener':'removeEventListener'](type,benchInputHandler,true);},observed);
  if(observed)await d.cdp.send('Network.enable');else await d.cdp.send('Network.disable');
  const before=await metrics(d.cdp),start=clock.now();
  for(let i=0;i<10;i++){await dispatch(d.cdp,p);await delay(20);}
  const after=await metrics(d.cdp);const check=await d.page.evaluate(()=>({events:mccRecorder.events.length,inputEvents:benchInputs.length}));assert.equal(check.events,10);assert.equal(check.inputEvents,observed?20:0);
  rows.overhead.push({repeat,observed,...check,elapsedMs:clock.now()-start,taskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000});
 }
 await d.cdp.send('Network.enable');
 rows.support.overhead='Matched observer/no-observer task/script distributions published; no zero-overhead assumption or subtraction from discovery';
 rows.support.presentation='pending; unmeasured';rows.support.transport='unmeasured; intercepted';
 assert.deepEqual(await targets(d.page),['off','off','off']);
 await json(out+'/samples.json',{completed:true,...rows});console.log('CALIBRATION',JSON.stringify(rows.support));
}catch(e){await json(out+'/incomplete.json',{reason:String(e),rows});throw e;}
finally{await d?.context.close();await s.browser.close();}
```

### resume-1/driver-calibration.mjs

SHA-256: `28e40940fd7a8482bd0ffbf9a8a5cfd08e1bff8ed0d2d37717981ef24b98d57b`

```javascript
import {clock,delay,output,json,assert} from './bench-common.mjs';
const out=await output('driver-calibration');const trials=[];
for(const blocked of [false,true]){
 const start=clock.now(),ticks=[];
 for(let i=0;i<8;i++){
  const intended=i*50;await delay(Math.max(0,start+intended-clock.now()));ticks.push({intendedMs:intended,sentMs:clock.now()-start});
  if(blocked&&i===2){const until=clock.now()+160;while(clock.now()<until){}}
 }
 const late=ticks.filter(x=>x.sentMs-x.intendedMs>50).length,max=Math.max(...ticks.map(x=>x.sentMs-x.intendedMs));trials.push({blocked,ticks,late,maxLatenessMs:max});
}
assert.equal(trials[0].late,0);assert.ok(trials[1].late>=1&&trials[1].maxLatenessMs>90);
await json(out+'/samples.json',{completed:true,trials,boundary:'Host monotonic intended/send timestamps; known driver blocking detected independently of page event queueing',invalidation:'Retain late ticks and affected windows; missing delivery, final-state mismatch or action-count failure prevents valid coverage'});
console.log('DRIVER CALIBRATION pass');
```

### resume-1/collect.mjs

SHA-256: `49b8f6007607aa99b77d503029f57c9f5e84e86469322eef656555766b883786`

```javascript
import {readFile} from 'node:fs/promises';
import {loadavg} from 'node:os';
import {assert,common,fixture,base,prepare,ready,fresh,session,output,json,record,metrics,observeInputs,point,dispatch,clock,delay,setState,targets,rotate,area,repo,sha} from './bench-common.mjs';
const mode=process.argv[2];assert.ok(['loads','updates','interactions','editors'].includes(mode));
const protocolBytes=await readFile(repo+'/experiments/minimum-card-contract/performance-benchmark/protocol.json');const protocol=JSON.parse(protocolBytes);
for(const [path,hash] of Object.entries(protocol.subjectHashes))assert.equal(sha(await readFile(repo+'/experiments/minimum-card-contract/'+path)),hash,path);
for(const [path,hash] of Object.entries(protocol.externalScriptHashes))assert.equal(sha(await readFile(area+'/'+path)),hash,path);
const out=await output('discovery-'+mode);const rows=[];const s=await session();
const originals=await s.page.evaluate(()=>Object.fromEntries(['a','b'].map(k=>{const id='input_number.mcc_display_'+k;return [id,document.querySelector('home-assistant').hass.states[id]];})));
await json(out+'/manifest.json',{protocolSha256:sha(protocolBytes),mode,startedUtc:new Date().toISOString(),hostLoad:loadavg(),acceptance:'discovery only; no approved CPU/transfer/update budgets'});
async function save(row){rows.push(row);await record(out+'/observations.ndjson',row);console.log('SAMPLE',mode,row.variant,row.count,row.trial??row.repeat,row.cache??row.kind??row.phase,row.hz??'');}
async function load(d,variant,count,trial,cache){
 d.resources.length=0;
 if(cache==='cold')await d.page.goto(base+'/mcc-experiment/bench');else await d.page.reload();
 await ready(d.page,variant,count);
 const observation=await d.page.evaluate(()=>({timeOrigin:performance.timeOrigin,readyMs:performance.now(),interception:__MCC_INTERCEPT_NATIVE__,documentTransfer:performance.getEntriesByType('navigation')[0].transferSize,resources:performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize}))}));
 const m=await metrics(d.cdp);assert.equal(observation.interception,true);
 const custom=observation.resources.filter(r=>r.path.startsWith('/local/'));assert.equal(custom.length>0,variant==='experimental');assert.ok(custom.every(r=>r.path.startsWith('/local/minimum-card-contract/')));
 assert.ok(d.resources.every(r=>r.host==='127.0.0.1:18123'&&!r.fromServiceWorker));
 await save({mode,variant,count,trial,cache,...observation,network:d.resources.slice(),taskMs:m.TaskDuration*1000,scriptMs:m.ScriptDuration*1000,transferBytes:observation.documentTransfer+observation.resources.reduce((n,r)=>n+r.transfer,0),customTransferBytes:custom.reduce((n,r)=>n+r.transfer,0),sharedTransferBytes:observation.documentTransfer+observation.resources.filter(r=>!r.path.startsWith('/local/')).reduce((n,r)=>n+r.transfer,0),hostLoad:loadavg(),valid:true});
}
async function window(d,variant,count,repeat,kind,hz,interaction){
 const seconds=hz===20?10:60,total=hz*seconds,id=kind==='unrelated'?'input_number.mcc_unrelated':fixture.a_source;
 await setState(s.auth,id,0,originals[fixture.a_source].attributes);await d.page.waitForFunction(id=>Number(document.querySelector('home-assistant').hass.states[id]?.state)===0,id);
 let p;if(interaction){p=await point(d.page,variant);await observeInputs(d.page);}
 await delay(200);d.wire.length=0;await d.page.evaluate(()=>mccRecorder.reset());
 const origin=await d.page.evaluate(()=>performance.timeOrigin),before=await metrics(d.cdp),start=clock.now();const ticks=[],inputs=[];
 console.log('WINDOW',mode,variant,count,repeat,kind,hz,seconds);
 async function updates(){
  for(let i=0;i<total;i++){
   const intended=i*1000/hz;await delay(Math.max(0,start+intended-clock.now()));const sent=clock.now()-start;
   await setState(s.auth,id,(i+1)%99,originals[fixture.a_source].attributes);ticks.push({intendedMs:intended,sentMs:sent,returnedMs:clock.now()-start});
  }
 }
 async function activations(){
  if(!interaction)return;
  for(let i=0;i<10;i++){
   const intended=(i+.5)*seconds*1000/10;await delay(Math.max(0,start+intended-clock.now()));const sent=clock.now()-start;let error=null;
   try{await dispatch(d.cdp,p);}catch(e){error=String(e);}
   inputs.push({intendedMs:intended,sentMs:sent,returnedMs:clock.now()-start,error});
  }
 }
 await Promise.all([updates(),activations()]);await delay(Math.max(0,start+seconds*1000-clock.now()));
 await d.page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const observed=await d.page.evaluate(id=>({timeOrigin:performance.timeOrigin,finalState:document.querySelector('home-assistant').hass.states[id]?.state,events:mccRecorder.events.map(({target,time})=>({target,time})),inputs:globalThis.benchInputs??[]}),id);
 const after=await metrics(d.cdp),elapsed=clock.now()-start;const delivered=d.wire.filter(m=>m.event?.c?.[id]||m.event?.a?.[id]).length;
 const reasons=[];if(hz&&ticks.some(t=>t.sentMs-t.intendedMs>1000/hz))reasons.push('driver tick later than one update period');if(observed.timeOrigin!==origin)reasons.push('document changed');if(delivered!==total)reasons.push('delivered state count mismatch');if(Number(observed.finalState)!==total%99&&total)reasons.push('final state mismatch');
 if(!interaction&&observed.events.length)reasons.push('unexpected activation');
 if(interaction&&(observed.events.length!==10||observed.events.some(e=>e.target!==fixture.a_target)||inputs.some(e=>e.error)))reasons.push('activation count/target/timeout failure');
 const targetStates=await targets(d.page);if(targetStates.some(v=>v!=='off'))reasons.push('synthetic target changed despite interception');
 const pointer=observed.inputs.filter(e=>e.type==='pointerdown'),click=observed.inputs.filter(e=>e.type==='click');
 const timing=interaction?observed.events.map((event,i)=>({target:event.target,pointerStamp:pointer[i]?.stamp??null,pointerEntry:pointer[i]?.entry??null,clickStamp:click[i]?.stamp??null,clickEntry:click[i]?.entry??null,intent:event.time,queueMs:pointer[i]?pointer[i].entry-pointer[i].stamp:null,handlerToIntentMs:pointer[i]?event.time-pointer[i].entry:null,eventToIntentMs:pointer[i]?event.time-pointer[i].stamp:null})):[];
 if(interaction&&(pointer.length!==10||click.length!==10))reasons.push('input observer count mismatch');
 const row={mode,variant,count,repeat,kind,hz,seconds,exploratoryStress:hz===20,updatesSent:ticks.length,delivered,finalState:observed.finalState,timeOrigin:origin,targetStates,ticks,inputs,timing,eventCount:observed.events.length,pointerCount:pointer.length,clickCount:click.length,taskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,elapsedMs:elapsed,lateTicks:ticks.filter(t=>t.sentMs-t.intendedMs>1000/hz).length,maxTickLatenessMs:Math.max(0,...ticks.map(t=>t.sentMs-t.intendedMs)),maxInputLatenessMs:Math.max(0,...inputs.map(t=>t.sentMs-t.intendedMs)),hostLoad:loadavg(),valid:reasons.length===0,invalidReasons:reasons};
 await save(row);
 if(interaction)await d.page.evaluate(()=>{for(const type of ['pointerdown','click'])document.removeEventListener(type,benchInputHandler,true);});
 // Retain every attempted cell, including failures; do not retry or replace.
}
async function editors(d,variant,count,trial){
 for(const phase of ['first_open','same_document_reopen']){
  const before=await metrics(d.cdp),start=await d.page.evaluate(()=>performance.now());
  await d.page.getByRole('button',{name:'Edit dashboard',exact:true}).click();const setup=await d.page.evaluate(()=>performance.now());
  if(variant!=='empty'){
   await d.page.getByRole('button',{name:'Edit',exact:true}).last().press('Enter');await d.page.getByRole('button',{name:'Cancel',exact:true}).waitFor();
   if(variant==='experimental')await d.page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();else await d.page.locator('hui-tile-card-editor').evaluate(e=>e.updateComplete);
  }
  const end=await d.page.evaluate(()=>performance.now()),after=await metrics(d.cdp);
  await save({mode,variant,count,trial,phase,setupMs:setup-start,totalMs:end-start,editorMs:variant==='empty'?null:end-setup,taskMs:(after.TaskDuration-before.TaskDuration)*1000,scriptMs:(after.ScriptDuration-before.ScriptDuration)*1000,control:variant==='empty'?'Edit-mode setup only, no card editor':'Actual editor; automation included',valid:true});
  if(variant!=='empty')await d.page.getByRole('button',{name:'Cancel',exact:true}).click();await d.page.getByRole('button',{name:'Done',exact:true}).click();
 }
}
try{
 for(const count of [1,10])for(let repeat=0;repeat<(mode==='loads'?10:3);repeat++)for(const variant of rotate(repeat)){
  Object.assign(s.auth,await common.tokens());await prepare(s.page,variant,count);const d=await fresh(s.browser,s.auth);
  try{
   await d.cdp.send('Network.clearBrowserCache');
   if(mode==='loads'){await load(d,variant,count,repeat,'cold');await load(d,variant,count,repeat,'warm');}
   else{
    await d.page.goto(base+'/mcc-experiment/bench');await ready(d.page,variant,count);
    if(mode==='editors')await editors(d,variant,count,repeat);
    else{
     for(const kind of ['relevant','unrelated'])for(const hz of [1,20])await window(d,variant,count,repeat,kind,hz,mode==='interactions');
     if(mode==='interactions')await window(d,variant,count,repeat,'no-update',0,true);
    }
   }
  }finally{await d.context.close();}
 }
 await json(out+'/samples.json',{completed:true,protocolSha256:sha(protocolBytes),mode,rows,hostLoadAfter:loadavg(),completedUtc:new Date().toISOString()});
}catch(e){await json(out+'/incomplete.json',{completed:false,reason:String(e),rows});throw e;}
finally{
 for(const [id,state] of Object.entries(originals))await setState(s.auth,id,state.state,state.attributes);
 await s.browser.close();
}
```

## Offline report reproduction

The following original standard-library Python script reads only public discovery.json; it does not connect to HA, read private state or acquire dependencies. Recreate it externally as report.py, verify its hash, and run `python3 /path/to/report.py /path/to/discovery.json /path/to/review.md /path/to/summary.json`. The output Markdown/JSON must match the published files byte for byte. Invalid attempts remain in discovery.json; report tables summarize valid rows and retain attempted/valid coverage counts. Signed matched differences are descriptive and never interpreted as isolated per-card work.

### resume-1/report.py

SHA-256: `d58ba8e10f2043b20811aa7ebb2a47321d143df674086a341e99f6c1c0cdf601`

```python
"""Reproduce benchmark descriptive summaries from public sanitized scalar rows."""
import json,statistics,sys
from pathlib import Path
source,report,summary=map(Path,sys.argv[1:4])
data=json.loads(source.read_text())
def stats(values):
 values=[v for v in values if v is not None]
 return None if not values else {'n':len(values),'min':min(values),'median':statistics.median(values),'max':max(values)}
def cellkey(row,mode):
 return tuple(row.get(k) for k in {'loads':['variant','count','cache'],'updates':['variant','count','kind','hz'],'interactions':['variant','count','kind','hz'],'editors':['variant','count','phase']}[mode])
result={}
for mode,rows in data['rows'].items():
 groups={}
 for row in rows:groups.setdefault(cellkey(row,mode),[]).append(row)
 cells=[]
 for key,items in groups.items():
  valid=[r for r in items if r['valid']]
  metrics=['taskMs','scriptMs']+({'loads':['transferBytes','customTransferBytes','sharedTransferBytes','readyMs'],'updates':['elapsedMs','maxTickLatenessMs'],'interactions':['elapsedMs','maxTickLatenessMs','maxInputLatenessMs'],'editors':['setupMs','totalMs','editorMs']}[mode])
  cell={'key':list(key),'attempts':len(items),'valid':len(valid),'invalid':len(items)-len(valid),'metrics':{m:stats([r.get(m) for r in valid]) for m in metrics},'invalidReasons':[r.get('invalidReasons',[r.get('reason','unspecified')]) for r in items if not r['valid']]}
  if mode=='interactions':
   cell['activationCount']=sum(r['eventCount'] for r in items);cell['intendedActivationCount']=10*len(items)
   cell['inputMetrics']={m:stats([t.get(m) for r in valid for t in r['timing']]) for m in ['queueMs','handlerToIntentMs','eventToIntentMs']}
   cell['timeouts']=sum(bool(i['error']) for r in items for i in r['inputs'])
  if mode in ['updates','interactions']:
   cell['sent']=sum(r['updatesSent'] for r in items);cell['delivered']=sum(r['delivered'] for r in items)
  cells.append(cell)
 result[mode]={'attempts':len(rows),'valid':sum(r['valid'] for r in rows),'cells':cells}
# Matched native/experimental differences, never attributed as isolated element cost.
contrasts=[]
for mode,keys in [('loads',['count','trial','cache']),('updates',['count','repeat','kind','hz']),('interactions',['count','repeat','kind','hz'])]:
 pairs={}
 for row in data['rows'].get(mode,[]):
  if row['variant'] in ['native','experimental'] and row['valid']:pairs.setdefault(tuple(row[k] for k in keys),{})[row['variant']]=row
 for key,pair in pairs.items():
  if len(pair)!=2:continue
  contrasts.append({'mode':mode,'key':list(key),'experimentalMinusNativeTaskMs':pair['experimental']['taskMs']-pair['native']['taskMs'],'experimentalMinusNativeScriptMs':pair['experimental']['scriptMs']-pair['native']['scriptMs'],**({'experimentalMinusNativeTransferBytes':pair['experimental']['transferBytes']-pair['native']['transferBytes']} if mode=='loads' else {})})
result['matchedDescriptiveContrasts']=contrasts
contrast_groups={}
for row in contrasts:
 key=tuple([row['mode']]+[v for i,v in enumerate(row['key']) if i!=1])
 contrast_groups.setdefault(key,[]).append(row)
result['contrastDistributions']=[{'key':list(key),'metrics':{m:stats([r.get(m) for r in items]) for m in ['experimentalMinusNativeTaskMs','experimentalMinusNativeScriptMs','experimentalMinusNativeTransferBytes']}} for key,items in contrast_groups.items()]
valid_interactions=[r for r in data['rows']['interactions'] if r['valid']]
result['inputOverview']={'validWindows':len(valid_interactions),'recordedIntents':sum(r['eventCount'] for r in data['rows']['interactions']),'timeouts':sum(bool(i['error']) for r in data['rows']['interactions'] for i in r['inputs']),'queueMs':stats([t['queueMs'] for r in valid_interactions for t in r['timing']]),'handlerToIntentMs':stats([t['handlerToIntentMs'] for r in valid_interactions for t in r['timing']]),'maxInputLatenessMs':stats([r['maxInputLatenessMs'] for r in valid_interactions])}
summary.write_text(json.dumps(result,indent=2)+'\n')
def show(s):return 'pending' if not s else f"{s['min']:.2f} / {s['median']:.2f} / {s['max']:.2f}"
text='''# Stage 1 benchmark review

## Disposition

This is the authorized negative-comparator investigation. Button Card and Mushroom failed the selected ordinary-keyboard eligibility pilot and were excluded; no third-party ranking succeeded. Native/experimental/empty observations below are whole-dashboard costs in the pinned Linux/Chromium laboratory, not exact isolated per-card CPU, reference-phone performance or a production stack choice. Empty is shared-shell/driver context. Native uses three Tiles including an extra body display; the prototype uses three buttons inside one card.

CPU, transfer and update budgets remain awaiting explicit requirements and numerical agreement. The observed maxima and comparator variation alone cannot supply a justified allowance. Local input observations do not establish displayed feedback, HA transport or physical response. No discovery observation is fresh approval-backed acceptance. Historical cold failures at 1108.60 and 1104.80 ms remain unresolved against the existing 1000 ms maximum; retained-byte attribution and final presentation remain unsupported. Stage 1 stays open.

## Reproduction and coverage

[Protocol](protocol.json), [calibration](calibration.json), [discovery rows](discovery.json), [derived summary](summary.json), [selection and pilots](selection.md), [budget review](budget-review.json), [reproduction/source listings](reproduction.md) and [cleanup](cleanup.json) are separate evidence. This report and summary are reproduced solely from public discovery.json by the original report.py listing in reproduction.md. Min / median / max below are descriptive; three repeats do not establish robust tails. Invalid attempts remain in discovery and coverage counts; summaries use valid rows only. No valid slow observation was replaced.

| Mode | Scheduled rows | Attempted | Valid |
| --- | ---: | ---: | ---: |
'''
for mode,expected in [('loads',120),('updates',72),('interactions',90),('editors',36)]:text+=f"| {mode} | {expected} | {result[mode]['attempts']} | {result[mode]['valid']} |\n"
text+='''
## Load CPU and transfer

Post-navigation CDP totals through the recorded readiness boundary. Transfer includes the document and shared HA resources; custom bytes remain separate in the data. Cold means fresh context plus cache clear; warm means same-context reload. Actual cache flags and resource paths are retained, rather than assuming zero transfer on warm loads. The isolated HA logged offline resolver/analytics/marketplace warnings; this does not establish production compatibility. Cold refers to browser HTTP-cache conditions; OS filesystem caches, shared browser/server state and HA uptime are not reset. Fonts/two-frame readiness does not prove final presentation.

| Variant / groups / cache | Valid n | Task ms min / median / max | Script ms min / median / max | Transfer bytes min / median / max |
| --- | ---: | --- | --- | --- |
'''
for c in result['loads']['cells']:text+=f"| {' / '.join(map(str,c['key']))} | {c['valid']} | {show(c['metrics']['taskMs'])} | {show(c['metrics']['scriptMs'])} | {show(c['metrics']['transferBytes'])} |\n"
for mode,title in [('updates','Update-only work'),('interactions','Matched interaction/update work')]:
 text+=f'\n## {title}\n\nSame-document deltas include shared HA work and the disclosed CDP observation. 1 Hz uses 60-second windows; 20 Hz uses 10-second exploratory stress windows. Interaction-added CPU is never labeled update-only CPU. Intended/send timestamps, all late ticks, delivered counts and final state are retained. A driver tick later than one period invalidates its rate cell; other failures follow protocol.json.\n\n| Variant / groups / class / Hz | Valid / attempted | Task ms min / median / max | Script ms min / median / max | Sent / delivered |\n| --- | ---: | --- | --- | ---: |\n'
 for c in result[mode]['cells']:text+=f"| {' / '.join(map(str,c['key']))} | {c['valid']} / {c['attempts']} | {show(c['metrics']['taskMs'])} | {show(c['metrics']['scriptMs'])} | {c['sent']} / {c['delivered']} |\n"
 if mode=='interactions':
  text+='''
### Local input observations

Ten pre-scheduled first-A activations per window, including no-update controls. Empty's added button is driver-only. Pointerdown event timestamp to capture entry is browser queueing; capture entry to recorded intent includes release/CDP driver work. Both remain distinct from presentation and transport. Quantized near-zero values are not precise sub-millisecond claims. Failed/missing activations/timeouts invalidate coverage; all attempted counts remain visible.

| Variant / groups / class / Hz | Actual / intended intents | Queue ms min / median / max | Handler-to-intent ms min / median / max | Timeouts |
| --- | ---: | --- | --- | ---: |
'''
  for c in result[mode]['cells']:text+=f"| {' / '.join(map(str,c['key']))} | {c['activationCount']} / {c['intendedActivationCount']} | {show(c['inputMetrics']['queueMs'])} | {show(c['inputMetrics']['handlerToIntentMs'])} | {c['timeouts']} |\n"
text+='''
## Editor context

Three first-open/reopen pairs per retained variant/count. Empty measures edit-mode setup only and has no editor latency. Native is an individual Tile editor, not a composite editor. Prototype persistence and independent binding edits were checked separately in editor-pilot.json. These contextual observations do not replace or reapprove historical editor acceptance.

| Variant / groups / phase | Valid n | Editor ms min / median / max | Setup ms min / median / max |
| --- | ---: | --- | --- |
'''
for c in result['editors']['cells']:text+=f"| {' / '.join(map(str,c['key']))} | {c['valid']} | {('not applicable' if c['key'][0]=='empty' else show(c['metrics']['editorMs']))} | {show(c['metrics']['setupMs'])} |\n"
overview=result['inputOverview']
text+='\n## Bounded observations\n\n'
text+=f"The campaign recorded {overview['recordedIntents']} local intents with {overview['timeouts']} dispatch timeouts across {result['interactions']['attempts']} attempted interaction windows; {overview['validWindows']} windows met validity checks. Across valid windows, queue time min / median / max was {show(overview['queueMs'])} ms and pointerdown-capture-to-intent was {show(overview['handlerToIntentMs'])} ms. These are browser/driver endpoints in this workload, not a displayed-responsiveness acceptance threshold.\n"
text+='\nThe following signed matched load contrasts retain variability; negative means the experimental observation used less work/transfer than its native counterpart. Neither sign isolates card cost from shared HA work or defines a budget. Class/rate-specific update and interaction contrasts are retained in summary.json.\n\n| Groups / cache | Experimental minus native task ms min / median / max | Experimental minus native transfer bytes min / median / max |\n| --- | --- | --- |\n'
for cell in result['contrastDistributions']:
 if cell['key'][0]=='loads':text+=f"| {' / '.join(map(str,cell['key'][1:]))} | {show(cell['metrics']['experimentalMinusNativeTaskMs'])} | {show(cell['metrics']['experimentalMinusNativeTransferBytes'])} |\n"
text+='''
## Comparative interpretation and limitations

summary.json retains signed experimental-minus-native differences matched by count, trial/repeat, cache/class and rate. These differences are descriptive shared-dashboard contrasts, with all absolute ranges above; they are not isolated card costs or universal rankings. Three surfaces versus one card, extra native body display, shared startup/editor work, host contention and observer costs limit equivalence. Observer/no-observer calibration distributions are published without assuming zero overhead or subtracting noisy differences.

The investigated qualitative objective is avoiding processing weight that makes a dashboard nearly unusable. This protocol observes bounded local queueing and intent under synthetic update traffic; it does not calibrate displayed feedback, specify acceptable load share/network wait on a representative device, or establish final desk traffic. Each budget entry therefore identifies the missing objective rather than adopting an observed maximum, arbitrary margin, slow-reference ceiling or desktop-to-phone conversion. No row is waived. Final-MVP performance repeats, device/accessibility, integration, physical and everyday validation retain their separate gates.
'''
report.write_text(text)
print(json.dumps({mode:{k:v for k,v in result[mode].items() if k!='cells'} for mode in data['rows']}))
```

## Offline package validation

Recreate validate-public.py from the following original source and run it with the checkout root as its only argument after the package is complete. It verifies the planned schedule/order, coverage, source hashes, local links and public JSON without HA access. Its static private-data scan complements manual review.

### resume-1/validate-public.py

SHA-256: `4610019b118b40d9602854526783ff9e500b8c732ce197dcefa3275ff0383a61`

```python
"""Check the public benchmark package without private HA or raw state access."""
from pathlib import Path
import json,hashlib,re,collections,sys
root=Path(sys.argv[1]);out=root/'experiments/minimum-card-contract/performance-benchmark'
protocol=json.loads((out/'protocol.json').read_text());data=json.loads((out/'discovery.json').read_text())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert data['protocolSha256']==sha(out/'protocol.json')
for path,h in protocol['subjectHashes'].items():assert sha(root/'experiments/minimum-card-contract'/path)==h,path
assert sha(out/'calibration.json')==protocol['calibrationSha256']
assert set(data['rows'])=={'loads','updates','interactions','editors'}
variants=['empty','native','experimental'];expected_counts={'loads':120,'updates':72,'interactions':90,'editors':36}
coverage={}
for mode,total in expected_counts.items():
 rows=data['rows'][mode];assert len(rows)==total,(mode,len(rows));expected=[]
 for count in [1,10]:
  for repeat in range(10 if mode=='loads' else 3):
   for i in range(3):
    variant=variants[(i+repeat)%3]
    if mode=='loads':expected.extend((variant,count,repeat,c) for c in ['cold','warm'])
    elif mode=='editors':expected.extend((variant,count,repeat,c) for c in ['first_open','same_document_reopen'])
    else:
     expected.extend((variant,count,repeat,k,h) for k in ['relevant','unrelated'] for h in [1,20])
     if mode=='interactions':expected.append((variant,count,repeat,'no-update',0))
 actual=[tuple(r.get(k) for k in (['variant','count','trial','cache'] if mode=='loads' else ['variant','count','trial','phase'] if mode=='editors' else ['variant','count','repeat','kind','hz'])) for r in rows]
 assert actual==expected,mode
 for r in rows:
  assert r['mode']==mode
  if not r['valid']:assert r.get('invalidReasons'),r
  elif mode in ['updates','interactions']:
   assert r['updatesSent']==r['delivered']==r['hz']*r['seconds'];assert r['targetStates']==['off']*3
   assert r['lateTicks']==0
   if mode=='interactions':assert r['eventCount']==r['pointerCount']==r['clickCount']==len(r['timing'])==10;assert all(t['target']=='input_boolean.mcc_target_a' for t in r['timing']);assert not any(i['error'] for i in r['inputs'])
  elif mode=='loads':
   assert r['transferBytes']==r['customTransferBytes']+r['sharedTransferBytes'];assert r['interception'];assert all(n['host']=='127.0.0.1:18123' and not n['fromServiceWorker'] for n in r['network'])
  elif r['variant']=='empty':assert r['editorMs'] is None
 coverage[mode]={'expected':total,'attempted':len(rows),'valid':sum(r['valid'] for r in rows)}
 assert coverage[mode]==data['coverage'][mode]
for file in [*out.glob('*.md'),root/'README.md',root/'docs/roadmap.md',root/'docs/decisions.md',root/'docs/discovery.md',root/'experiments/minimum-card-contract/README.md',root/'openspec/changes/benchmark-stage-one-performance/research.md']:
 for dest in re.findall(r'\]\(([^)]+)\)',re.sub(r'^```.*?^```[ \t]*$','',file.read_text(),flags=re.S|re.M)):
  if '://' in dest or dest.startswith('#'):continue
  assert (file.parent/dest.split('#')[0]).exists(),(file,dest)
s=(out/'reproduction.md').read_text();sources=0
for digest,content in re.findall(r'SHA-256: `([a-f0-9]+)`\n\n```\w+\n(.*?)^```[ \t]*$',s,re.S|re.M):assert hashlib.sha256(content.encode()).hexdigest()==digest;sources+=1
for file in out.glob('*.json'):
 raw=file.read_text();json.loads(raw)
 for forbidden in ['"access_token"','"refresh_token"','"password"','192.168.']:
  assert forbidden not in raw,(file,forbidden)
for file in out.rglob('*'):
 if file.is_file():assert all(line==line.rstrip() for line in file.read_text().splitlines()),file
print(json.dumps({'coverage':coverage,'sourceListings':sources,'subjectHashes':'pass','links':'pass','json':'pass','privateDataScan':'pass','note':'Static secret-key/IP scan complements manual review; it is not a claim of universal secret detection'}))
```
