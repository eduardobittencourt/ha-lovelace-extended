"""Publish only the explicitly named completed discovery runs, never old results."""
from collections import Counter, defaultdict
from pathlib import Path
import hashlib
import argparse
import json
import os
import statistics

experiment = Path(__file__).resolve().parents[1]
area = Path(os.environ.get('MCC_RESEARCH', str(Path.home() / 'research/ha-lovelace-extended/evaluate-stage-one-performance')))
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, help='Publish to a new external directory without overwriting repository evidence')
args = parser.parse_args()
out = args.output.resolve() if args.output else experiment / 'performance-followup'
if args.output:
    out.mkdir(parents=True, exist_ok=False)
runs = {'loads': 'discovery-loads', 'editors': 'discovery-editors',
        'updates': 'discovery-updates-v3', 'lifecycle': 'discovery-lifecycle',
        'rendering': 'discovery-rendering', 'methods': 'method-validation-v2'}
files = {'loads': 'samples.json', 'editors': 'samples.json', 'updates': 'samples.json',
         'lifecycle': 'lifecycle.json', 'rendering': 'rendering.json', 'methods': 'methods.json'}
data = {}
provenance = {}
for kind, run in runs.items():
    path = area / run / files[kind]
    raw = path.read_bytes()  # Missing/unfinished runs block publication.
    data[kind] = json.loads(raw)
    provenance[kind] = {'run': run, 'file': files[kind], 'sha256': hashlib.sha256(raw).hexdigest()}

assert Counter(r['kind'] for r in data['loads']['rows']) == {'load': 120, 'input': 180}
assert len(data['editors']['rows']) == 120
assert len(data['updates']['rows']) == 72
assert len(data['lifecycle']['series']) == 18
assert len(data['rendering']['rows']) == 240

def stats(values):
    return {'n': len(values), 'minimum': min(values), 'median': statistics.median(values), 'maximum': max(values)}

def grouped(rows, keys, metrics):
    groups = defaultdict(list)
    for row in rows:
        groups[tuple(row[k] for k in keys)].append(row)
    return [{**dict(zip(keys, key)), **{m: stats([r[m] for r in group if r.get(m) is not None])
            for m in metrics if any(r.get(m) is not None for r in group)}} for key, group in groups.items()]

loads = [r for r in data['loads']['rows'] if r['kind'] == 'load']
inputs = [r for r in data['loads']['rows'] if r['kind'] == 'input']
updates = data['updates']['rows']
contrasts = []
for kind, rows, keys, metrics in [
    ('load', loads, ['count', 'trial', 'cache'], ['readyMs', 'scriptMs', 'taskMs', 'transferBytes']),
    ('update', updates, ['count', 'repeat', 'kind', 'hz'], ['scriptMs', 'taskMs'])]:
    controls = {tuple(r[k] for k in keys): r for r in rows if r['variant'] == 'empty'}
    for row in rows:
        if row['variant'] == 'empty':
            continue
        control = controls[tuple(row[k] for k in keys)]
        contrasts.append({'comparison': kind, 'variant': row['variant'],
                          **{k: row[k] for k in keys},
                          **{m: row[m] - control[m] for m in metrics}})

rejected = []
for run in ['control-preflight', 'discovery-updates', 'discovery-updates-v2', 'method-validation']:
    rejection = area / run / 'rejection.json'
    if not rejection.exists():
        continue  # Successful reproductions need not recreate rejected pilots.
    reason = json.loads(rejection.read_text())
    partial = area / run / 'observations.ndjson'
    observations = [json.loads(line) for line in partial.read_text().splitlines()] if partial.exists() else []
    rejected.append({'run': run, **reason, 'partial_observations': observations})
report = {
    'phase': 'discovery/method validation only; no acceptance collection',
    'historical_cold_outlier_ms': 1108.60,
    'provenance': provenance,
    'public_samples': ['timing-discovery.json', 'lifecycle-discovery.json', 'rendering-discovery.json'],
    'load_summary': grouped(loads, ['variant', 'count', 'cache'], ['readyMs', 'scriptMs', 'taskMs', 'transferBytes', 'customDecoded', 'customTransfer']),
    'input_summary': grouped(inputs, ['variant', 'count'], ['intentMs']),
    'editor_summary': grouped(data['editors']['rows'], ['variant', 'count', 'phase'], ['setupMs', 'editorMs', 'totalReadyMs', 'scriptMs', 'taskMs', 'transferBytes']),
    'update_summary': grouped(updates, ['variant', 'count', 'kind', 'hz'], ['scriptMs', 'taskMs', 'elapsedMs', 'late']),
    'rendering_summary': grouped(data['rendering']['rows'], ['variant', 'count', 'instrumented'], ['setterMs', 'mutationMs', 'frameMs']),
    'contrasts': contrasts,
    'contrasts_limit': 'Adjacent trial/repetition blocks with rotated order, not simultaneous exact isolation. Full ranges expose variation; no confidence intervals or universal per-card ranking. Native includes extra body-state rendering.',
    'lifecycle': data['lifecycle'],
    'rendering_limit': data['rendering']['finalPresentation'],
    'methods': data['methods'],
    'rejected_attempts': rejected,
    'approval': 'all numerical rows remain unapproved',
    'stage1': 'open',
}
with (out / 'discovery.json').open('x') as stream:
    json.dump(report, stream, indent=2)
    stream.write('\n')
print(json.dumps({'counts': {kind: len(value.get('rows', value.get('series', []))) for kind, value in data.items()}, 'stage1': 'open'}))
