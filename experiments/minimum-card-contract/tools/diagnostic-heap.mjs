import assert from 'node:assert/strict';

// Candidate attribution only: graph reachability excluding weak edges is not a
// validated substitute for the browser's ephemeron/embedder ownership semantics.
export function heapGraph(snapshot){
 const meta=snapshot.snapshot.meta,nf=meta.node_fields,ef=meta.edge_fields;
 const width=nf.length,edgeWidth=ef.length;
 const ni=Object.fromEntries(nf.map((n,i)=>[n,i])),ei=Object.fromEntries(ef.map((n,i)=>[n,i]));
 for(const n of ['type','name','id','self_size','edge_count'])assert.ok(n in ni);
 for(const n of ['type','name_or_index','to_node'])assert.ok(n in ei);
 const count=snapshot.nodes.length/width;assert.ok(Number.isInteger(count));
 const nodes=[],edges=[];let cursor=0;
 for(let index=0;index<count;index++){
  const offset=index*width;
  nodes.push({index,id:snapshot.nodes[offset+ni.id],type:meta.node_types[ni.type][snapshot.nodes[offset+ni.type]],
   name:snapshot.strings[snapshot.nodes[offset+ni.name]],bytes:snapshot.nodes[offset+ni.self_size]});
  const outgoing=[];
  for(let j=0;j<snapshot.nodes[offset+ni.edge_count];j++,cursor+=edgeWidth){
   const type=meta.edge_types[ei.type][snapshot.edges[cursor+ei.type]];
   const value=snapshot.edges[cursor+ei.name_or_index];
   outgoing.push({type,name:['element','hidden'].includes(type)?String(value):snapshot.strings[value],to:snapshot.edges[cursor+ei.to_node]/width});
  }
  edges.push(outgoing);
 }
 assert.equal(cursor,snapshot.edges.length);
 function reachable(blocked=-1){
  const seen=new Uint8Array(count),queue=[0];
  while(queue.length){const i=queue.pop();if(i===blocked||seen[i])continue;seen[i]=1;
   for(const e of edges[i])if(e.type!=='weak'&&!seen[e.to])queue.push(e.to);
  }
  return seen;
 }
 const baseline=reachable();
 function exclusive(index){
  const without=reachable(index);let bytes=0,objects=0;
  for(let i=0;i<count;i++)if(baseline[i]&&!without[i]){bytes+=nodes[i].bytes;objects++;}
  const incoming=[];
  for(let i=0;i<count;i++)for(const e of edges[i])if(e.to===index)incoming.push({fromType:nodes[i].type,fromName:nodes[i].name,edge:e.name,type:e.type});
  return {bytes,objects,incoming};
 }
 return {nodes,edges,exclusive,reachable};
}
