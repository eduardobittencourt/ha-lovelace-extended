import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {editorSchedule,evaluateEditor} from './diagnostic-editor-evaluate.mjs';

const record=await readFile(new URL('../performance-diagnostics/editor-approval.json',import.meta.url));
function fixture(){
 const approval=JSON.parse(record);
 const identities={approval:'approval',plan:'plan',sources:{...approval.requiredSources}};
 const plan={phase:'frozen editor verification',approvalSha256:identities.approval,sourceHashes:identities.sources,
  environmentSha256:approval.environmentSha256,trials:editorSchedule(approval)};
 const rows=plan.trials.map((trial,index)=>({...trial,setupMs:40,totalReadyMs:100,
  editorMs:trial.variant==='empty'?null:60,timeOrigin:Math.floor(index/2),
  interception:true,targets:['off','off','off']}));
 const capture={completed:true,exclusions:[],environmentSha256:approval.environmentSha256,
  planSha256:identities.plan,sourceHashes:plan.sourceHashes,rows};
 return {approval,plan,capture,identities};
}
const evaluate=({approval,plan,capture,identities})=>evaluateEditor(approval,plan,capture,identities);
test('approved editor schedule covers all first-open/reopen pairs with control workloads',()=>{
 const result=evaluate(fixture());
 assert.equal(result.totalObservations,120);
 assert.equal(result.workloads.filter(row=>row.status==='control').length,8);
 assert.equal(result.status,'pass');
});
test('one slow experimental reopen fails the editor row',()=>{
 const f=fixture();
 const row=f.capture.rows.find(r=>r.variant==='experimental'&&r.phase==='same_document_reopen');
 row.totalReadyMs=751;row.editorMs=row.totalReadyMs-row.setupMs;
 assert.equal(evaluate(f).status,'fail');
});
test('missing approval, controls, order or method provenance invalidate fresh acceptance',()=>{
 for(const invalidate of [
  f=>f.approval.status='pending',
  f=>f.capture.rows[1].timeOrigin++,
  f=>f.capture.rows[1].targets[0]='on',
  f=>f.capture.rows.pop(),
  f=>f.capture.rows[1]={...f.capture.rows[0]},
  f=>f.capture.planSha256='different',
  f=>f.capture.rows[1].totalReadyMs=NaN
 ]){
  const f=fixture();invalidate(f);
  assert.equal(evaluate(f).status,'pending');
 }
});
