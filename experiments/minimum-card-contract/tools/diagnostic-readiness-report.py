"""Validate and publish a compact replay of the frozen R1 measurements."""
import hashlib
import json
import statistics
import sys
from pathlib import Path

run, destination = map(Path, sys.argv[1:])
raw = (run / 'samples.json').read_bytes()
capture = json.loads(raw)
schedule = json.loads((run / 'schedule.json').read_bytes())
observations = [json.loads(line) for line in (run / 'observations.ndjson').read_text().splitlines()]
assert capture['completed'] and capture['schedule'] == schedule
assert capture['noSlowValidObservationReplaced'] and capture['exclusions'] == []
assert observations == [{'kind': 'load', **row} for row in capture['rows']]
assert schedule['pairs'] == 10 and schedule['mode'] == 'campaign'
groups, variants, caches = [1, 10], ['empty', 'native', 'experimental'], ['cold', 'warm']
assert schedule['groups'] == groups and schedule['variants'] == variants
expected = [(count, trial, variant, cache)
            for count in groups for trial in range(10)
            for variant in variants[trial % 3:] + variants[:trial % 3]
            for cache in caches]
rows = capture['rows']
assert len(rows) == len(expected) == 120 and len(set(expected)) == len(expected)
assert [(r['count'], r['trial'], r['variant'], r['cache']) for r in rows] == expected
for path, digest in schedule['sourceHashes'].items():
    assert hashlib.sha256(Path(path).read_bytes()).hexdigest() == digest, path
plan = json.loads(Path('performance-followup/verification-plan.json').read_bytes())
assert schedule['environment'] == plan['environment'] and schedule['cache'] == plan['schedule']['cache']
lab = json.loads(Path('performance-diagnostics/environment.json').read_bytes())
for key in ('core', 'frontend', 'image_amd64', 'browser_revision', 'playwright'):
    assert lab[key] == schedule['environment'][key], key
assert lab['browser_observed'] == schedule['environment']['browserVersion']
for asset, digest in lab['served_source_sha256'].items():
    assert schedule['sourceHashes']['src/' + asset] == digest, asset

samples = []
for row in rows:
    assert row['interception'] is True and row['instrumented'] is True
    assert row['traced'] is False and row['phaseError'] is None
    assert row['space']['freeBytes'] >= row['space']['reserveBytes'] == 1024**3
    m = row['milestones']
    ordered = [m[key] for key in ('init', 'dom', 'mounted', 'settled', 'frame1', 'frame2')]
    assert ordered == sorted(ordered) and m['reference'] == row['readyMs']
    custom = [r for r in row['resources'] if r['path'].startswith('/local/minimum-card-contract/')]
    assert sorted(r['path'] for r in custom) == (plan['runtimeAssetPaths'] if row['variant'] == 'experimental' else [])
    assert all((r['transfer'] > 0 if row['cache'] == 'cold' else r['transfer'] == 0) for r in custom)
    samples.append({
        'count': row['count'], 'trial': row['trial'], 'variant': row['variant'], 'cache': row['cache'],
        'readyMs': row['readyMs'], 'mountedMs': m['mounted'], 'hassDetectedMs': m.get('hass'),
        'domContentLoadedMs': row['navigation']['domContentLoaded'],
        'hostElapsedMs': row['hostElapsedMs'], **row['phases'], 'runtimeResources': custom,
    })

fields = ['readyMs', 'hassDetectedMs', 'domContentLoadedMs', 'mountedMs', 'mountToSettleMs',
          'settleToFramesMs', 'observerAfterFramesMs', 'hostElapsedMs']
summary = []
for count in groups:
    for variant in variants:
        for cache in caches:
            workload = [s for s in samples if (s['count'], s['variant'], s['cache']) == (count, variant, cache)]
            stats = {}
            for field in fields:
                values = [s[field] for s in workload if s[field] is not None]
                stats[field] = {'n': len(values), 'minimum': min(values), 'median': statistics.median(values),
                                'maximum': max(values)} if values else {'n': 0}
            summary.append({'count': count, 'variant': variant, 'cache': cache, **stats})
result = {
    'phase': 'R1 diagnostic only', 'completed': True, 'sampleCount': len(samples),
    'rawSamplesSha256': hashlib.sha256(raw).hexdigest(),
    'scheduleSha256': hashlib.sha256((run / 'schedule.json').read_bytes()).hexdigest(),
    'sourceHashes': schedule['sourceHashes'], 'cachePolicy': schedule['cache'],
    'order': schedule['order'], 'hostLoadBefore': schedule['hostLoadBefore'],
    'minimumFreeBytes': min(row['space']['freeBytes'] for row in rows),
    'historicalColdFailuresMs': [1108.6, 1104.8], 'excludedLoads': [],
    'summary': summary, 'samples': samples,
}
with destination.open('x') as out:
    json.dump(result, out, indent=2, allow_nan=False)
    out.write('\n')
