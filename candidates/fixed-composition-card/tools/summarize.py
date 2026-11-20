"""Offline descriptive report from public frozen candidate observations."""
import argparse
import hashlib
import json
from pathlib import Path
from statistics import median


def distribution(values):
    return {'n': len(values), 'min': min(values), 'median': median(values),
            'range': max(values) - min(values), 'max': max(values)}


def report(samples):
    rows = []
    def emit(metric, group, values):
        rows.append({'metric': metric, **group, **distribution(values)})
    for variant in ['empty', 'native', 'candidate']:
        for count in [1, 10]:
            group = {'variant': variant, 'groups': count}
            loads = [r for r in samples['loads'] if r.get('valid') and r['variant'] == variant and r['count'] == count]
            for cache in ['cold', 'warm']:
                selected = [r for r in loads if r['cache'] == cache]
                if selected:
                    emit('ready-ms', {**group, 'phase': cache}, [r['readyMs'] for r in selected])
                    emit('load-script-ms', {**group, 'phase': cache}, [r['metrics']['ScriptDuration'] * 1000 for r in selected])
                    for metric, field in [('http-transfer-bytes', 'transfer'), ('http-decoded-bytes', 'decoded')]:
                        emit(metric, {**group, 'phase': cache}, [sum(x[field] for x in r['resources']) for r in selected])
                    emit('candidate-decoded-bytes', {**group, 'phase': cache}, [sum(x['decoded'] for x in r['resources'] if '/fixed-composition-card/' in x['path']) for r in selected])
            editors = [r for r in samples['editors'] if r.get('valid') and r['variant'] == variant and r['count'] == count]
            for phase in ['first-open', 'same-document-reopen']:
                selected = [r for r in editors if r['phase'] == phase]
                for metric, values in [('editor-ms', [r['editorMs'] for r in selected]), ('editor-script-ms', [r['scriptSeconds'] * 1000 for r in selected]), ('editor-http-transfer-bytes', [sum(x['transfer'] for x in r['resources']) for r in selected])]:
                    if values:
                        emit(metric, {**group, 'phase': phase}, values)
            for phase in ['idle', 'under-updates']:
                selected = [r for r in samples['inputs'] if r.get('valid') and r['variant'] == variant and r['count'] == count and r['phase'] == phase]
                values = [x['localIntentMs'] for r in selected for x in (r['rows'] if phase == 'idle' else r['inputs']['rows'])]
                if values:
                    emit('local-intent-ms', {**group, 'phase': phase}, values)
                if phase == 'under-updates' and selected:
                    emit('input-update-script-ms', {**group, 'phase': phase}, [r['scriptSeconds'] * 1000 for r in selected])
                    emit('input-update-elapsed-ms', {**group, 'phase': phase}, [r['elapsedMs'] for r in selected])
                    emit('input-max-schedule-lateness-ms', {**group, 'phase': phase}, [max(r['inputs']['latenessMs']) for r in selected])
            updates = [r for r in samples['updates'] if r.get('valid') and r['variant'] == variant and r['count'] == count]
            for rate in [1, 20]:
                for related in [True, False]:
                    selected = [r for r in updates if r['rate'] == rate and r['related'] == related]
                    if selected:
                        key = {**group, 'phase': f'{rate}Hz-' + ('relevant' if related else 'unrelated')}
                        emit('update-script-ms', key, [r['scriptSeconds'] * 1000 for r in selected])
                        emit('update-elapsed-ms', key, [r['elapsedMs'] for r in selected])
                        emit('update-max-schedule-lateness-ms', key, [max(r['latenessMs']) for r in selected])
    expected = {'loads': 36, 'editors': 36, 'updates': 24, 'inputs': 12}
    coverage = {key: {'expected': number, 'attempted': len(samples[key]), 'valid': sum(bool(r.get('valid')) for r in samples[key])} for key, number in expected.items()}
    invalid = {key: [r for r in values if not r.get('valid')] for key, values in samples.items() if isinstance(values, list)}
    return {'status': 'descriptive; acceptance pending', 'coverage': coverage, 'invalid': invalid, 'distributions': rows,
            'limitations': ['Only three load/editor pairs per workload and ten inputs per condition; no robust tail claim.',
                            'Ten-second update windows are diagnostic, with one window per cell; no sustained-load acceptance.',
                            'Additional state_changed delivery observer and journal instrumentation add shared driver work.',
                            'HTTP resource timing excludes WebSocket payload bytes and component ownership attribution.',
                            'Native group uses five Tiles; native editor row covers the cover Tile only.',
                            'Empty input is driver-only. Local intent excludes HA transport and physical response.',
                            'No retention-byte, compositor-presentation, reference-device or final-MVP pass.']}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('samples', type=Path)
    parser.add_argument('output', type=Path, help='New output directory; must not exist')
    args = parser.parse_args()
    raw = args.samples.read_bytes()
    data = json.loads(raw)
    result = report(data['phases'])
    result['lifecycle'] = data.get('lifecycle')
    result['samplesSha256'] = hashlib.sha256(raw).hexdigest()
    result['protocolSha256'] = data['protocolSha256']
    args.output.mkdir(parents=True, exist_ok=False)
    (args.output / 'report.json').write_text(json.dumps(result, indent=2) + '\n')
    lines = ['# Descriptive candidate profile', '', 'All observations are descriptive; candidate acceptance remains pending.', '',
             'Range is max minus min. CPU is CDP script time including shared HA/driver work.', '',
             '| Metric | Variant | Groups | Phase | n | Min | Median | Range | Max |',
             '| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: |']
    for row in result['distributions']:
        lines.append('| ' + ' | '.join(str(row[k]) if k not in ['min', 'median', 'range', 'max'] else f'{row[k]:.3f}' for k in ['metric', 'variant', 'groups', 'phase', 'n', 'min', 'median', 'range', 'max']) + ' |')
    lines.extend(['', '## Limits', '', *['- ' + item for item in result['limitations']], ''])
    (args.output / 'report.md').write_text('\n'.join(lines))
    print(json.dumps(result['coverage']))


if __name__ == '__main__':
    main()
