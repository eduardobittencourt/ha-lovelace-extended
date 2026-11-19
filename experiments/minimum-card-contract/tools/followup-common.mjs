// Campaign-only helpers. Set the output root before importing historical helpers.
import assert from 'node:assert/strict';
import {mkdir, realpath, appendFile, writeFile, statfs} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve, relative, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
assert.ok(process.env.MCC_RESEARCH,'Set MCC_RESEARCH to an explicit external campaign root');
const root=await realpath(resolve(process.env.MCC_RESEARCH));
const legacy=resolve(homedir(),'research/ha-lovelace-extended/demonstrate-minimum-card-contract');
const legacyRoot=await realpath(legacy).catch(error=>{if(error.code==='ENOENT')return legacy;throw error;});
const checkout=resolve(dirname(fileURLToPath(import.meta.url)),'../../..');
for(const protectedRoot of [legacyRoot,checkout]){
 const path=relative(protectedRoot,root);
 assert.ok(path==='..'||path.startsWith('../'),'Raw campaign root must be outside historical evidence and the checkout');
}
export const run=process.argv[2];
assert.match(run ?? '',/^[a-z][a-z0-9-]{0,63}$/,'Supply a unique discovery run name');
export const output=resolve(root,run);
assert.equal(relative(root,output),run);
await mkdir(output); // Exclusive: an existing run is never overwritten.
process.env.MCC_RESEARCH=output;
export const common=await import('./common.mjs');
export const workloads=await import('./workloads.mjs');
export async function save(kind,data){
 const space=await statfs(root);
 assert.ok(space.bavail*space.bsize>=1024**3,'Stop: free disk space below campaign reserve');
 await appendFile(resolve(output,'observations.ndjson'),JSON.stringify({kind,...data})+'\n');
}
export async function json(name,data){await writeFile(resolve(output,name+'.json'),JSON.stringify(data,null,2)+'\n',{flag:'wx'});}
export async function prepare(control,variant,count){
 assert.ok(['empty','native','experimental'].includes(variant));
 assert.ok([1,10].includes(count));
 await workloads.prepare(control,variant==='empty'?'native':variant,variant==='empty'?0:count);
}
export async function ready(page,variant,count){
 if(variant!=='empty')return workloads.ready(page,variant,count);
 await page.getByRole('button',{name:'Edit dashboard',exact:true}).waitFor();
 assert.equal(await page.locator('hui-tile-card, minimum-card-contract').count(),0);
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
}
export async function button(page,variant){
 if(variant==='empty'){
  await page.evaluate(target=>{
   const b=document.createElement('button');b.id='mcc-driver-control';b.textContent='Driver-only local intent';
   b.style.cssText='position:fixed;left:300px;top:300px;z-index:2147483647';
   b.onclick=()=>mccRecorder.record(target,{origin:'driver-control'});document.body.append(b);
  },workloads.fixture.a_target);
  return page.locator('#mcc-driver-control');
 }
 return variant==='experimental'?page.locator('minimum-card-contract').first().locator('button').first():page.locator('hui-tile-card').first().getByRole('button').first();
}
