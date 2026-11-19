"""Reconcile frozen public evidence offline; write only to a new external directory."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess

experiment = Path(__file__).resolve().parents[1]
checkout = experiment.parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('output', type=Path)
args = parser.parse_args()
output = args.output.resolve()
for protected in [checkout, Path.home() / 'research/ha-lovelace-extended/demonstrate-minimum-card-contract',
                  Path.home() / 'research/ha-lovelace-extended/evaluate-stage-one-performance']:
    if output == protected.resolve() or output.is_relative_to(protected.resolve()):
        parser.error('Output must be outside the checkout and historical campaign roots')
output.mkdir(parents=True, exist_ok=False)

def read(name):
    return json.loads((experiment / name).read_text())

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

plan = read('performance-followup/verification-plan.json')
samples = read('performance-followup/verification-samples.json')
execution = read('performance-followup/execution.json')
approval = read('performance-followup/approval.json')
assert plan['approval'] == approval
assert samples['approvalId'] == approval['id']
assert samples['planSha256'] == digest(experiment / 'performance-followup/verification-plan.json')
identities = {}
for mapping in [plan['sources'], execution['source_hashes_sha256'], execution['reviewed_tooling_sha256']]:
    for name, expected in mapping.items():
        actual = digest(experiment / name)
        assert actual == expected, f'Frozen source changed: {name}'
        identities[name] = actual
assert samples['sourceHashes'] == plan['sources']
history = read('performance-followup/method-history.json')
reconstructed = []
for entry in history:
    source = experiment / entry.get('file', 'tools/followup-measure.mjs')
    target = output / (entry['revision'] + source.suffix)
    target.write_bytes(source.read_bytes())
    if entry['patch_from_current_published_source']:
        subprocess.run(['patch', '--batch', '--silent', str(target)],
                       input=entry['patch_from_current_published_source'], text=True, check=True)
    assert digest(target) == entry['sha256'], entry['revision']
    reconstructed.append({'revision': entry['revision'], 'sha256': digest(target)})
replay = output / 'verification-replay.json'
subprocess.run(['node', 'tools/followup-evaluate.mjs', 'performance-followup/verification-plan.json',
                'performance-followup/verification-samples.json', str(replay)], cwd=experiment, check=True)
assert json.loads(replay.read_text()) == read('performance-followup/verification-review.json')
assert len(plan['rows']) == 10 and len({r['id'] for r in plan['rows']}) == 10
assert samples['completed'] and len(samples['rows']) == 300
cold = [r for r in samples['rows'] if r['kind'] == 'load' and r['cache'] == 'cold'
        and r['variant'] == 'experimental' and r['count'] == 10]
maximum = max(r['readyMs'] for r in cold)
assert round(maximum, 2) == 1104.80
assert plan['historicalColdOutlierMs'] == read('performance-followup/discovery.json')['historical_cold_outlier_ms'] == 1108.60
assert '1108.60' in (experiment / 'results/measurements.md').read_text()
assert approval['limits'] == {'runtime-decoded-bytes': 16384, 'cold-ready': 1000,
                              'warm-ready': 750, 'local-intent': 16.7}
evidence = {str(p.relative_to(experiment)): digest(p)
            for folder in ['src', 'results', 'performance-followup']
            for p in sorted((experiment / folder).rglob('*')) if p.is_file()}
report = {
    'phase': 'offline diagnostic preflight; no lab or acceptance collection',
    'source_hashes_sha256': identities, 'historical_evidence_sha256': evidence,
    'reconstructed_method_identities': reconstructed,
    'verification_replay': 'exact match with published evaluator output',
    'historical_cold_observations_ms': [1108.60, maximum],
    'approval': approval,
    'required_rows': [{'id': r['id'], 'approval': r['approval'], 'supported': r['supported']}
                      for r in plan['rows']],
    'capacity': {'free_bytes': os.statvfs(output).f_bavail * os.statvfs(output).f_frsize,
                 'reserve_bytes': 1024**3},
    'stage1': 'open; historical failure and all required pending rows preserved',
}
(output / 'preflight.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'sources_verified': len(identities), 'historical_files': len(evidence),
                  'method_reconstructions': len(reconstructed), 'required_rows': len(plan['rows'])}))
