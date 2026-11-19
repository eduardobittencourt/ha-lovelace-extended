import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256} from './followup-evaluate.mjs';

const phases=['first_open','same_document_reopen'];
export function editorSchedule(approval){
 const variants=['empty','native','experimental'];
 return approval.groups.flatMap(count=>Array.from({length:approval.pairsPerWorkload},(_,trial)=>
  variants.map((_,index)=>variants[(trial+index)%variants.length]).flatMap(variant=>
   phases.map(phase=>({count,trial,variant,phase})))).flat());
}
export function evaluateEditor(approval,plan,capture,identities){
 const expected=editorSchedule(approval);
 const matches=(sample,trial)=>['count','trial','variant','phase'].every(key=>sample[key]===trial[key]);
 const provenance=approval.status==='approved'&&Boolean(approval.date_utc)&&
  approval.statistic==='maximum per workload and phase'&&plan.phase==='frozen editor verification'&&
  plan.approvalSha256===identities.approval&&capture.planSha256===identities.plan&&
  plan.environmentSha256===approval.environmentSha256&&capture.environmentSha256===approval.environmentSha256&&
  Object.entries(approval.requiredSources).every(([path,hash])=>plan.sourceHashes[path]===hash)&&
  Object.entries(plan.sourceHashes).every(([path,hash])=>capture.sourceHashes[path]===hash&&identities.sources[path]===hash);
 const complete=capture.completed===true&&capture.exclusions?.length===0&&
  plan.trials.length===expected.length&&capture.rows.length===expected.length&&
  expected.every((trial,index)=>matches(plan.trials[index],trial)&&matches(capture.rows[index],trial));
 const controls=complete&&capture.rows.every((row,index)=>{
  const first=capture.rows[index-index%2];
  return row.interception===true&&JSON.stringify(row.targets)==='["off","off","off"]'&&
   Number.isFinite(row.timeOrigin)&&row.timeOrigin===first.timeOrigin&&
   Number.isFinite(row.setupMs)&&row.setupMs>=0&&Number.isFinite(row.totalReadyMs)&&row.totalReadyMs>=row.setupMs&&
   (row.variant==='empty'?row.editorMs===null:Number.isFinite(row.editorMs)&&row.editorMs>=0&&
    Math.abs(row.totalReadyMs-row.setupMs-row.editorMs)<0.001);
 });
 const valid=provenance&&complete&&controls;
 const workloads=['empty','native','experimental'].flatMap(variant=>approval.groups.flatMap(count=>phases.map(phase=>{
  const selected=capture.rows.filter(r=>r.variant===variant&&r.count===count&&r.phase===phase);
  const limit=variant==='experimental'?approval.limitsMs[phase]:null;
  const maximum=selected.length?Math.max(...selected.map(r=>r.totalReadyMs)):null;
  return {variant,count,phase,samples:selected.length,maximum,limit,
   status:variant!=='experimental'?'control':!valid||!Number.isFinite(limit)?'pending':maximum>limit?'fail':'pass'};
 })));
 const eligible=workloads.filter(r=>r.variant==='experimental');
 return {id:'editor',approvalId:approval.id,approvalDate:approval.date_utc,provenance,complete,controls,
  totalObservations:capture.rows.length,workloads,status:eligible.some(r=>r.status==='fail')?'fail':
  eligible.every(r=>r.status==='pass')?'pass':'pending'};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [approvalPath,planPath,capturePath,out]=process.argv.slice(2);
 assert.ok(out,'Usage: diagnostic-editor-evaluate.mjs APPROVAL PLAN CAPTURE NEW_OUTPUT');
 const [approvalBytes,planBytes,captureBytes]=await Promise.all([approvalPath,planPath,capturePath].map(path=>readFile(path)));
 const plan=JSON.parse(planBytes),sources={};
 for(const path of Object.keys(plan.sourceHashes))sources[path]=sha256(await readFile(path));
 const result=evaluateEditor(JSON.parse(approvalBytes),plan,JSON.parse(captureBytes),
  {approval:sha256(approvalBytes),plan:sha256(planBytes),sources});
 await writeFile(out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
}
