// Validate output before importing helpers capable of browser or authentication work.
import assert from 'node:assert/strict';
import {mkdir, realpath, statfs, appendFile, writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve, relative, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export const reserveBytes=1024**3;
export async function allocateRun(rootInput,run){
 assert.ok(rootInput,'Set MCC_DIAGNOSTICS to an explicit external campaign root');
 assert.match(run??'',/^[a-z][a-z0-9-]{0,63}$/,'Supply a unique diagnostic run name');
 const root=await realpath(resolve(rootInput));
 const checkout=resolve(dirname(fileURLToPath(import.meta.url)),'../../..');
 for(const protectedPath of [checkout,...['demonstrate-minimum-card-contract','evaluate-stage-one-performance'].map(n=>resolve(homedir(),'research/ha-lovelace-extended',n))]){
  const protectedRoot=await realpath(protectedPath).catch(e=>{if(e.code==='ENOENT')return protectedPath;throw e;});
  const path=relative(protectedRoot,root);
  assert.ok(path==='..'||path.startsWith('../'),'Raw campaign root must be outside the checkout and historical campaigns');
 }
 await checkSpace(root);
 const output=resolve(root,run);
 await mkdir(output); // Exclusive and before browser/auth imports.
 assert.equal(await realpath(output),output,'Run path must not redirect output');
 return output;
}
export async function checkSpace(path){
 const s=await statfs(path);
 const freeBytes=s.bavail*s.bsize;
 assert.ok(freeBytes>=reserveBytes,'Stop: free disk space below 1 GiB reserve');
 return {freeBytes,reserveBytes};
}
export async function startRun(){
 const output=await allocateRun(process.env.MCC_DIAGNOSTICS,process.argv[2]);
 process.env.MCC_RESEARCH=output;
 const common=await import('./common.mjs');
 const workloads=await import('./workloads.mjs');
 async function save(kind,data){
  await checkSpace(output);
  await appendFile(resolve(output,'observations.ndjson'),JSON.stringify({kind,...data})+'\n');
 }
 async function json(name,data){
  assert.match(name,/^[a-z][a-z0-9-]*$/);
  await checkSpace(output);
  await writeFile(resolve(output,name+'.json'),JSON.stringify(data,null,2)+'\n',{flag:'wx'});
 }
 return {output,common,workloads,save,json};
}
