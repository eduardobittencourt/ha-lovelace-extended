import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateMilestones,mapTraceClock} from './diagnostic-phases.mjs';
const valid={init:0,dom:2,mounted:5,settled:7,frame1:10,frame2:20,reference:24};
test('phase validation rejects absent and out-of-order observations',()=>{
 assert.equal(validateMilestones(valid).observerAfterFramesMs,4);
 assert.throws(()=>validateMilestones({...valid,settled:undefined}),/Missing/);
 assert.throws(()=>validateMilestones({...valid,frame1:21}),/Out-of-order/);
});
test('trace clock uses microsecond anchor and refuses ambiguous/missing mappings',()=>{
 assert.equal(mapTraceClock([{name:'mcc-clock',ts:125000}],25).offsetMs,100);
 assert.throws(()=>mapTraceClock([],25),/one trace/);
 assert.throws(()=>mapTraceClock([{name:'mcc-clock',ts:125000},{name:'mcc-clock',ts:125001}],25),/one trace/);
});
