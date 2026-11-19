import assert from 'node:assert/strict';
import {readFile,writeFile,realpath} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {allocateRun} from './diagnostic-common.mjs';
import {evaluateVerification,sha256} from './followup-evaluate.mjs';

const originalPlan='performance-followup/verification-plan.json';
const policyPath='performance-diagnostics/verification-policy.json';
const assetPrefix='/local/minimum-card-contract/';
const expectedTarget='input_boolean.mcc_target_a';
const nonnegative=value=>Number.isFinite(value)&&value>=0;

export function evaluateDiagnostic(policy,plan,capture,freeze){
 const validFreeze=freeze.planSha256===policy.planSha256&&freeze.policySha256===policy.policySha256&&
  freeze.environmentSha256===policy.environmentSha256&&freeze.wrapperSha256===policy.wrapperSha256;
 const controlData=capture.rows.every(row=>{
  if(row.kind==='input')return row.target===expectedTarget&&row.state==='off'&&nonnegative(row.intentMs);
  if(row.kind!=='load'||row.interception!==true||!Array.isArray(row.resources)||
      !nonnegative(row.timeOrigin)||!nonnegative(row.readyMs))return false;
  const assets=row.resources.filter(r=>typeof r.path==='string'&&r.path.startsWith(assetPrefix));
  const scheduled=row.variant==='experimental'?plan.runtimeAssetPaths:[];
  if(JSON.stringify(assets.map(r=>r.path).sort())!==JSON.stringify(scheduled))return false;
  if(!assets.every(r=>nonnegative(r.decoded)&&nonnegative(r.transfer)&&
    (row.cache==='cold'?r.transfer>0:r.transfer===0)))return false;
  return row.customDecoded===assets.reduce((total,r)=>total+r.decoded,0);
 });
 const result=evaluateVerification(plan,capture,policy.planSha256);
 // A slow observation from a different method/source, or a failed safety control,
 // cannot establish a new acceptance result. Historical decisions are separate.
 if(!validFreeze||!controlData||!result.provenance){
  for(const row of result.rows)if(row.approval==='approved'){
   row.status='pending';row.reason='Invalid or mismatched freeze, capture provenance or fixture controls';
   for(const workload of row.workloads)workload.status='pending';
  }
  result.approvedSubsetStatus='pending';
 }
 return {...result,validFreeze,controlData,freshRequiredGate:result.approvedSubsetStatus==='fail'?'fail':'pending',
  stage1Status:'fail',historicalColdFailuresMs:policy.historicalColdFailuresMs,
  overallReason:'Historical approved cold maximum failure remains unresolved on the unchanged subject; six requirements remain pending.'};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [action,name,...paths]=process.argv.slice(2);
 const policyBytes=await readFile(policyPath);
 const policy=JSON.parse(policyBytes);
 policy.policySha256=sha256(policyBytes);
 const bytes=await readFile(originalPlan);
 const plan=JSON.parse(bytes);
 assert.equal(sha256(bytes),policy.planSha256);
 policy.wrapperSha256=sha256(await readFile(new URL(import.meta.url)));
 const environmentBytes=await readFile('performance-diagnostics/environment.json');
 assert.equal(sha256(environmentBytes),policy.environmentSha256);
 if(action==='capture'){
  assert.ok(paths[0],'Supply the resumed lab fixture preflight JSON');
  const root=await realpath(process.env.MCC_DIAGNOSTICS);
  assert.match(name,/^[a-z][a-z0-9-]{0,55}$/);
  const freezeDir=await allocateRun(root,name+'-freeze');
  const environment=JSON.parse(environmentBytes);
  const fixtures=JSON.parse(await readFile(paths[0]));
  assert.equal(fixtures.checks.length,6);
  assert.equal(new Set(fixtures.checks.map(c=>c.variant+'/'+c.count)).size,6);
  for(const c of fixtures.checks){
   assert.ok(plan.schedule.variants.includes(c.variant)&&plan.schedule.groups.includes(c.count));
   assert.equal(c.interception,true);assert.equal(c.state,'off');
   assert.equal(c.events.length,1);assert.equal(c.events[0].target,expectedTarget);
  }
  for(const field of ['core','frontend','image_amd64','playwright'])assert.equal(environment[field],plan.environment[field]);
  assert.equal(environment.browser_observed,plan.environment.browserVersion);
  for(const [path,hash] of Object.entries(plan.sources))assert.equal(sha256(await readFile(path)),hash,path);
  const approval=JSON.parse(await readFile('performance-followup/approval.json'));
  assert.deepEqual(plan.approval,approval);
  for(const row of plan.rows.filter(r=>r.approval.status==='approved')){
   assert.equal(row.maximum,approval.limits[row.id]);assert.equal(row.approval.date_utc,approval.date_utc);
   assert.equal(row.approval.maintainer_agreement,approval.id);assert.equal(row.supported,true);
  }
  const freeze={policySha256:policy.policySha256,planSha256:policy.planSha256,
   environmentSha256:policy.environmentSha256,wrapperSha256:policy.wrapperSha256,fixtures};
  await writeFile(resolve(freezeDir,'freeze.json'),JSON.stringify(freeze,null,2)+'\n',{flag:'wx'});
  const run=spawnSync(process.execPath,['tools/followup-verify.mjs',name],
   {env:{...process.env,MCC_RESEARCH:root},stdio:'inherit'});
  if(run.error)throw run.error;
  process.exitCode=run.status??1;
 }else{
  assert.equal(action,'evaluate');
  const [freezePath,out]=paths;
  const capture=JSON.parse(await readFile(name));
  const freeze=JSON.parse(await readFile(freezePath));
  const result=evaluateDiagnostic(policy,plan,capture,freeze);
  await writeFile(out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
 }
}
