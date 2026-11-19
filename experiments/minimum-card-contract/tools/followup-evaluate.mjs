// Approval-aware evaluation. No historical candidate value is a default.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
export function evaluateVerification(plan,capture,planHash){
 const expected=[];
 for(const count of plan.schedule.groups)for(const variant of plan.schedule.variants){
  for(const cache of ['cold','warm'])for(let trial=0;trial<plan.schedule.loadsPerCache;trial++)expected.push(`load:${variant}:${count}:${cache}:${trial}`);
  for(let trial=0;trial<plan.schedule.inputsPerWorkload;trial++)expected.push(`input:${variant}:${count}::${trial}`);
 }
 const keys=capture.rows.map(r=>`${r.kind}:${r.variant}:${r.count}:${r.cache??''}:${r.trial}`);
 const complete=keys.length===expected.length&&new Set(keys).size===keys.length&&expected.every(key=>keys.includes(key))&&capture.rows.every(r=>Number.isFinite(r.kind==='load'?r.readyMs:r.intentMs)&&(r.kind==='load'?r.readyMs:r.intentMs)>=0);
 const provenance=capture.phase==='verification'&&capture.planSha256===planHash&&capture.approvalId===plan.approval.id&&Object.entries(plan.sources).every(([path,hash])=>capture.sourceHashes?.[path]===hash)&&capture.completed===true;
 const rows=plan.rows.map(row=>{
  const result={id:row.id,required:row.required,approval:row.approval.status,status:'pending',workloads:[]};
  if(!row.supported)return {...result,reason:'Required method unsupported; no pass inferred'};
  if(row.approval.status!=='approved'||!plan.approval.date_utc||row.approval.maintainer_agreement!==plan.approval.id)return {...result,reason:'Explicit dated approval absent'};
  if(!Number.isFinite(row.maximum)||row.maximum<0||row.statistic!=='maximum per workload')return {...result,reason:'Approved maximum/statistic missing; no candidate fallback'};
  let failed=false,missing=!complete||!provenance;
  for(const count of plan.schedule.groups)for(const variant of row.selector.variants){
   const samples=capture.rows.filter(r=>r.kind===row.selector.kind&&r.variant===variant&&r.count===count&&(!row.selector.cache||r.cache===row.selector.cache));
   const values=samples.map(r=>r[row.field]);
   const valid=values.every(value=>Number.isFinite(value)&&value>=0);
   const expectedCount=row.selector.kind==='input'?plan.schedule.inputsPerWorkload:plan.schedule.loadsPerCache;
   const covered=samples.length===expectedCount&&new Set(samples.map(r=>r.trial)).size===expectedCount;
   const maximum=valid&&values.length?Math.max(...values):null;
   const exceeds=maximum!==null&&maximum>row.maximum;
   failed ||= exceeds;missing ||= !valid||!covered;
   result.workloads.push({variant,count,samples:samples.length,expected:expectedCount,maximum,limit:row.maximum,status:exceeds?'fail':valid&&covered&&complete&&provenance?'pass':'pending'});
  }
  return {...result,status:failed?'fail':missing?'pending':'pass',reason:failed?'Observed maximum exceeds approved limit':missing?'Incomplete/invalid samples or frozen provenance mismatch':'All scheduled maxima meet the approved limit'};
 });
 const combine=items=>items.some(r=>r.status==='fail')?'fail':!items.length||items.some(r=>r.status!=='pass')?'pending':'pass';
 return {phase:'verification review',approvalId:plan.approval.id,planSha256:planHash,complete,provenance,rows,approvedSubsetStatus:combine(rows.filter(r=>r.approval==='approved')),stage1Status:combine(rows.filter(r=>r.required)),historicalColdOutlierMs:plan.historicalColdOutlierMs,historicalObservationRetained:true,scope:'Frozen local headless UI measurements only; unsupported/unapproved required rows remain pending. No transport/physical or production-stack acceptance.'};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [planPath,capturePath,outputPath]=process.argv.slice(2);
 if(!planPath||!capturePath||!outputPath)throw new Error('Usage: followup-evaluate.mjs PLAN CAPTURE NEW_OUTPUT');
 const raw=await readFile(planPath);const value=evaluateVerification(JSON.parse(raw),JSON.parse(await readFile(capturePath,'utf8')),sha256(raw));
 await writeFile(outputPath,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({approvedSubset:value.approvedSubsetStatus,stage1:value.stage1Status,complete:value.complete,provenance:value.provenance}));
}
