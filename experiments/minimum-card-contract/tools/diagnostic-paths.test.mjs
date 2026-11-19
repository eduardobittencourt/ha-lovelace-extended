import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdir, mkdtemp, symlink, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {homedir} from 'node:os';
import {allocateRun} from './diagnostic-common.mjs';

test('refuse historical, checkout, alias and existing run outputs before helper imports',async()=>{
 const campaign=resolve(homedir(),'research/ha-lovelace-extended/diagnose-stage-one-performance-gaps');
 await mkdir(campaign,{recursive:true});
 const root=await mkdtemp(resolve(campaign,'path-controls-'));
 try{
  await assert.rejects(allocateRun(undefined,'valid'),/explicit external/);
  await assert.rejects(allocateRun(root,'../escape'),/unique diagnostic/);
  await assert.rejects(allocateRun(process.cwd(),'valid'),/outside/);
  for(const n of ['demonstrate-minimum-card-contract','evaluate-stage-one-performance']){
   const historical=resolve(campaign,'..',n);
   await assert.rejects(allocateRun(historical,'valid'),/outside/);
  }
  await symlink(process.cwd(),resolve(root,'checkout-alias'));
  await assert.rejects(allocateRun(resolve(root,'checkout-alias'),'valid'),/outside/);
  assert.equal(await allocateRun(root,'valid'),resolve(root,'valid'));
  await assert.rejects(allocateRun(root,'valid'),{code:'EEXIST'});
  await symlink(process.cwd(),resolve(root,'existing-alias'));
  await assert.rejects(allocateRun(root,'existing-alias'),{code:'EEXIST'});
 }finally{await rm(root,{recursive:true});}
});
