import {test} from 'node:test';
import assert from 'node:assert/strict';
import {heapGraph} from './diagnostic-heap.mjs';
test('candidate graph excludes shared and weak paths, and handles cycles',()=>{
 const snapshot={snapshot:{meta:{node_fields:['type','name','id','self_size','edge_count'],edge_fields:['type','name_or_index','to_node'],node_types:[['synthetic','object']],edge_types:[['property','weak']]}},
  strings:['root','owner','private','shared','weak','edge'],
  nodes:[0,0,1,0,3, 1,1,2,10,3, 1,2,3,20,1, 1,3,4,30,0, 1,4,5,40,0],
  edges:[0,5,5, 0,5,15, 1,5,20, 0,5,10, 0,5,15, 1,5,20, 0,5,5]};
 const graph=heapGraph(snapshot);assert.equal(graph.exclusive(1).bytes,30);assert.equal(graph.exclusive(1).objects,2);
 assert.equal(graph.reachable()[4],0);
 assert.throws(()=>heapGraph({...snapshot,edges:[]}),/Assertion/);
});
