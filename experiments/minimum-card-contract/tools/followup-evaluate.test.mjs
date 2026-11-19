import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateVerification} from './followup-evaluate.mjs';
function fixture(){
 const plan={approval:{id:'explicit-agreement',date_utc:'2026-11-19'},historicalColdOutlierMs:1108.6,schedule:{groups:[1,10],variants:['empty','native','experimental'],loadsPerCache:10,inputsPerWorkload:30},sources:{'src/card.js':'fixed'},rows:[{id:'cold-ready',required:true,supported:true,maximum:1000,statistic:'maximum per workload',approval:{status:'approved',maintainer_agreement:'explicit-agreement'},field:'readyMs',selector:{kind:'load',cache:'cold',variants:['native','experimental']}}]};
 const rows=[];
 for(const count of [1,10])for(const variant of plan.schedule.variants){for(const cache of ['cold','warm'])for(let trial=0;trial<10;trial++)rows.push({kind:'load',variant,count,cache,trial,readyMs:600});for(let trial=0;trial<30;trial++)rows.push({kind:'input',variant,count,trial,intentMs:1});}
 return {plan,capture:{phase:'verification',completed:true,planSha256:'frozen',approvalId:'explicit-agreement',sourceHashes:{'src/card.js':'fixed'},rows}};
}
const run=({plan,capture})=>evaluateVerification(plan,capture,'frozen');
test('complete approved supported row passes without erasing historical outlier',()=>{const r=run(fixture());assert.equal(r.rows[0].status,'pass');assert.equal(r.historicalColdOutlierMs,1108.6);});
test('one slow valid sample fails maximum even when median is within limit',()=>{const f=fixture();f.capture.rows.find(r=>r.variant==='experimental'&&r.count===10&&r.cache==='cold').readyMs=1108.6;assert.equal(run(f).rows[0].status,'fail');});
test('missing approval cannot pass plausible observations',()=>{const f=fixture();f.plan.rows[0].approval.status='proposed';assert.equal(run(f).rows[0].status,'pending');});
test('an unsupported required row keeps stage 1 pending despite approved subset pass',()=>{const f=fixture();f.plan.rows.push({id:'presentation',required:true,supported:false,approval:{status:'proposed'}});const r=run(f);assert.equal(r.approvedSubsetStatus,'pass');assert.equal(r.stage1Status,'pending');});
test('missing maximum never falls back to old candidate',()=>{const f=fixture();delete f.plan.rows[0].maximum;f.plan.rows[0].proposed_maximum=1000;assert.equal(run(f).rows[0].status,'pending');});
test('reads approved threshold rather than historical constant',()=>{const f=fixture();f.plan.rows[0].maximum=500;assert.equal(run(f).rows[0].status,'fail');});
test('missing ten-group capture or duplicate trial cannot pass',()=>{for(const duplicate of [false,true]){const f=fixture();if(duplicate)f.capture.rows[1]={...f.capture.rows[0]};else f.capture.rows.pop();assert.equal(run(f).rows[0].status,'pending');}});
test('changed source, plan identity, or non-finite observation prevents a pass',()=>{for(const change of ['source','plan','value']){const f=fixture();if(change==='source')f.capture.sourceHashes['src/card.js']='changed';else if(change==='plan')f.capture.planSha256='other';else f.capture.rows[0].readyMs=NaN;assert.equal(run(f).rows[0].status,'pending');}});
