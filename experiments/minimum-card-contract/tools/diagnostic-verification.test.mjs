import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {evaluateDiagnostic} from './diagnostic-verification.mjs';
import {sha256} from './followup-evaluate.mjs';

const planBytes=await readFile(new URL('../performance-followup/verification-plan.json',import.meta.url));
const policy={planSha256:sha256(planBytes),policySha256:'policy',environmentSha256:'lab',
 wrapperSha256:'wrapper',historicalColdFailuresMs:[1108.6,1104.8]};
function fixture(){
 const plan=JSON.parse(planBytes),rows=[];
 for(const count of plan.schedule.groups)for(const variant of plan.schedule.variants){
  for(const cache of ['cold','warm'])for(let trial=0;trial<plan.schedule.loadsPerCache;trial++){
   const resources=(variant==='experimental'?plan.runtimeAssetPaths:[]).map(path=>({
    path,decoded:100,transfer:cache==='cold'?100:0
   }));
   rows.push({kind:'load',variant,count,cache,trial,readyMs:600,timeOrigin:123,
    resources,interception:true,customDecoded:resources.length*100});
  }
  for(let trial=0;trial<plan.schedule.inputsPerWorkload;trial++)rows.push({
   kind:'input',variant,count,trial,target:'input_boolean.mcc_target_a',state:'off',intentMs:1});
 }
 return {plan,freeze:{...policy},capture:{phase:'verification',completed:true,
  planSha256:policy.planSha256,approvalId:plan.approval.id,sourceHashes:{...plan.sources},rows}};
}
const evaluate=({plan,capture,freeze})=>evaluateDiagnostic(policy,plan,capture,freeze);
const slow=f=>f.capture.rows.find(row=>row.kind==='load'&&row.variant==='experimental'&&row.cache==='cold').readyMs=1100;

test('fresh approved passes preserve all required rows and historical failures',()=>{
 const result=evaluate(fixture());
 assert.equal(result.approvedSubsetStatus,'pass');
 assert.equal(result.rows.filter(r=>r.status==='pending').length,6);
 assert.deepEqual(result.historicalColdFailuresMs,[1108.6,1104.8]);
 assert.equal(result.stage1Status,'fail');
});
test('a single valid exceedance fails the approved row',()=>{
 const f=fixture();slow(f);
 assert.equal(evaluate(f).rows.find(r=>r.id==='cold-ready').status,'fail');
});
test('invalid controls, source, plan or method identity prevent fresh decisions',()=>{
 for(const invalidate of [
  f=>f.capture.rows[0].interception=false,
  f=>f.capture.rows.find(row=>row.kind==='input').state='on',
  f=>f.capture.rows.find(row=>row.kind==='input').target='wrong',
  f=>f.capture.rows.find(row=>row.cache==='warm'&&row.variant==='experimental').resources[0].transfer=100,
  f=>f.capture.sourceHashes['src/card.js']='changed',
  f=>f.capture.planSha256='other',
  f=>f.freeze.wrapperSha256='other',
  f=>f.freeze.environmentSha256='other'
 ]){
  const f=fixture();slow(f);invalidate(f);
  assert.equal(evaluate(f).approvedSubsetStatus,'pending');
 }
});
test('missing or duplicate samples cannot pass',()=>{
 for(const duplicate of [false,true]){
  const f=fixture();
  if(duplicate)f.capture.rows[0]={...f.capture.rows[1]};
  else f.capture.rows.pop();
  assert.equal(evaluate(f).approvedSubsetStatus,'pending');
 }
});
test('absent dated agreement and old candidate values cannot authorize a row',()=>{
 const f=fixture(),row=f.plan.rows.find(r=>r.id==='cold-ready');
 row.approval.status='proposed';row.proposed_maximum=row.maximum;delete row.maximum;
 assert.equal(evaluate(f).rows.find(r=>r.id===row.id).status,'pending');
});
