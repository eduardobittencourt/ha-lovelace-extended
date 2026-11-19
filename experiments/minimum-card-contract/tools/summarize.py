"""Publish sanitized experiment samples and descriptive summaries, never auth data."""
import csv
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
from statistics import median

project=Path(__file__).resolve().parents[1]
area=Path(os.environ.get('MCC_RESEARCH',str(Path.home()/'research/ha-lovelace-extended/demonstrate-minimum-card-contract')))
out=project/'results'
out.mkdir(exist_ok=True)
load=json.loads((area/'performance-captures.json').read_text())
diag=json.loads((area/'diagnostic-captures.json').read_text())
assert len(load['samples'])==80 and len(load['interactions'])==4 and len(load['updates'])==16
assert len(diag['lifecycle'])==4 and len(diag['editors'])==8
for s in load['samples']:
    assert s['scriptMs']>=0 and s['taskMs']>=0
for series in diag['lifecycle']:
    if series['variant']=='experimental':
        assert len(series['ownedAfterRemoval'])==50
        assert all(all(value==0 for value in counts.values())for cycle in series['ownedAfterRemoval']for counts in cycle)
for group in load['interactions']:
    assert len(group['observations'])==30
    assert all(isinstance(x['intentMs'],(int,float)) and x['intentMs']>=0 for x in group['observations'])
metadata={
    'capture_date_utc':datetime.fromtimestamp((area/'performance-captures.json').stat().st_mtime,timezone.utc).date().isoformat(),
    'environment':'../execution.json',
    'runtime_source_sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in (project/'src').iterdir()if p.is_file()},
    'limits':['Single Linux x86_64 headless Chromium environment; no physical/Safari/assistive-technology validation',
              'Three native Tiles/group have different layout/editor and an additional body-target state; descriptive comparison only',
              'Driver interception remains active; execution includes shared HA/driver cost',
              'Input-to-frame includes automation observation delay; not compositor paint, HA action transport or physical response',
              'Retained same-node/forced-GC memory readings are diagnostic; no robust tail estimates from ten trials',
              'Invalid initial counter-delta collection is excluded; raw captures retained separately'],
    'acceptance':'Performance budgets require a separate recorded review and fresh verification; these are discovery samples'
}
fields=['variant','count','trial','cache','usableMs','transferBytes','experimentTransferBytes','experimentDecodedBytes','scriptMs','taskMs','heapBytes']
samples=[{k:x[k]for k in fields}for x in load['samples']]
with (out/'load-samples.csv').open('w')as f:
    writer=csv.DictWriter(f,fieldnames=fields,lineterminator='\n');writer.writeheader();writer.writerows(samples)
public={'metadata':metadata,'loads':samples,'interactions':load['interactions'],'updates':load['updates'],
        'lifecycle':[{k:v for k,v in x.items()if k!='ownedAfterRemoval'}|{'ownedCountsReturnedToZero':True if x['variant']=='experimental'else None}for x in diag['lifecycle']],
        'editors':diag['editors']}
(out/'measurements.json').write_text(json.dumps(public,indent=2)+'\n')
def band(xs):return f'{median(xs):.2f} [{min(xs):.2f}–{max(xs):.2f}]'
text=['# Descriptive experiment measurements','',
      'Environment: [execution manifest](../execution.json). Individual load samples: [CSV](load-samples.csv); all sanitized observations and metadata: [JSON](measurements.json). Raw resource lists stay outside the checkout. Values below are median [minimum–maximum], not tail percentiles. Acceptance remains separate.','',
      '## Load captures (ten trials per row)','',
      '| Variant | Groups | Cache | Usable ms | Script ms | Task ms | Total transfer bytes | Experiment transfer bytes |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |']
for count in [1,10]:
    for variant in ['native','experimental']:
        for cache in ['cold','warm']:
            xs=[x for x in samples if x['count']==count and x['variant']==variant and x['cache']==cache]
            assert len(xs)==10
            text.append(f'| {variant} | {count} | {cache} | '+' | '.join(band([x[k]for x in xs])for k in ['usableMs','scriptMs','taskMs','transferBytes','experimentTransferBytes'])+' |')
text+=['','## Local input observations (thirty per row)','',
       'These measure pointerdown to intercepted local intent and the next observed frame opportunity. They do not establish final paint or device response.','',
       '| Variant | Groups | Intent ms | Frame opportunity ms |','| --- | --- | --- | --- |']
for x in load['interactions']:
    text.append(f"| {x['variant']} | {x['count']} | {band([r['intentMs']for r in x['observations']])} | {band([r['nextFrameMs']for r in x['observations']])} |")
text+=['','## Actual synthetic updates','',
       '| Variant | Groups | Entity | Hz | Updates | Elapsed ms | Late ticks | Script ms | Task ms |','| --- | --- | --- | --- | --- | --- | --- | --- | --- |']
for x in load['updates']:
    text.append(f"| {x['variant']} | {x['count']} | {x['kind']} | {x['hz']} | {x['updates']} | {x['elapsedMs']:.2f} | {x['late']} | {x['scriptMs']:.2f} | {x['taskMs']:.2f} |")
text+=['','## Fifty lifecycle cycles','',
       'Each removal/reinsertion settles for 100 ms. The same nodes remain intentionally referenced; GC/heap/renderer-global listener and DOM figures are diagnostic. Experimental owned counts returned to zero after every removal.','',
       '| Variant | Groups | Initial heap bytes | Final heap bytes | Initial/final renderer listeners | Final single dispatch |','| --- | --- | --- | --- | --- | --- |']
for x in diag['lifecycle']:
    first,last=x['readings'][0],x['readings'][-1]
    text.append(f"| {x['variant']} | {x['count']} | {first['heapBytes']} | {last['heapBytes']} | {first['jsEventListeners']} / {last['jsEventListeners']} | {x['singleDispatch']} |")
text+=['','## Incremental editor observations','',
       'First-open includes dashboard edit-mode setup; reopen stays in the same document. These single observations have no statistical acceptance meaning.','',
       '| Variant | Groups | Phase | Ready ms | Script ms | Transfer bytes |','| --- | --- | --- | --- | --- | --- |']
for x in diag['editors']:
    text.append(f"| {x['variant']} | {x['count']} | {x['phase']} | {x['readyMs']:.2f} | {x['scriptMs']:.2f} | {x['transferBytes']} |")
text+=['','## Limits','']+['- '+x for x in metadata['limits']]
(out/'measurements.md').write_text('\n'.join(text)+'\n')
print('Published 80 load samples, 120 input observations, 16 update windows, 4 lifecycle series and 8 editor observations')
