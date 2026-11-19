# Stage 1 performance discovery

This is the pre-approval discovery record. The subsequent [verification review](review.md) records explicit partial approval, fresh measurements and the cold-readiness failure; historical discovery observations remain intact.

Date: 2026-11-19. Subject: unchanged two-slot experiment, Core 2026.11.1 / frontend 20261028.5, Playwright 1.65.1 / HeadlessChrome 159.0.8154.6. This is discovery and method validation, not an acceptance review or production-stack decision.

## Evidence and schedule

The [manifest](execution.json), [summary/contrasts](discovery.json), [timing samples](timing-discovery.json), [lifecycle observations](lifecycle-discovery.json), [rendering observations](rendering-discovery.json) and [driver source history](method-history.json) are sanitized and reviewable without private HA access. Reproduction commands are in the [experiment guide](../README.md#stage-1-performance-follow-up-campaign).

- 120 load observations: ten cold/warm pairs for each empty/native/experimental one/ten-group workload; explicit cold cache clear, same-context warm reload, rotated order.
- 180 local activations: thirty per workload, including the driver-only empty control.
- 120 editor/setup observations: ten independent first-open/reopen pairs per workload. Empty observations cover edit-mode setup only.
- 72 update windows: three repetitions per workload/class/rate, 60 seconds at 1 Hz and 10 seconds at 20 Hz; all final states observed, zero late driver ticks. No concurrent browser tests.
- 18 fresh-instance lifecycle series: fifty cycles each, six checkpoints/series. All positive retained/released controls passed; all 108 checkpoints observed zero surviving weak targets; experimental owned resources were zero after each removal.
- 240 controlled visible-content changes: thirty alternating with/without-observer pairs per native/experimental workload. All expected first-display values matched.

These bounded counts do not estimate robust tails. The schedule field `settleMs: 200` applies only before update windows. Discovery runs and rejected pilots are distinct from any future frozen verification series.

## Observed readiness and intent

Values below are descriptive median [minimum–maximum], not approved requirements or isolated card costs. Empty controls match the HA shell, authentication and interception. Native uses three Tiles/group including extra body-state display; layouts and editors differ.

| Workload | Cache | Ready ms | CDP script ms |
| --- | --- | --- | --- |
| empty / 1 groups | cold | 644.40 [612.70–670.10] | 128.39 [126.04–135.12] |
| empty / 1 groups | warm | 354.20 [339.90–455.20] | 41.13 [39.29–41.74] |
| native / 1 groups | cold | 660.70 [626.30–688.00] | 133.99 [131.18–136.51] |
| native / 1 groups | warm | 455.75 [440.00–473.10] | 43.40 [42.67–46.88] |
| experimental / 1 groups | cold | 639.80 [622.50–666.50] | 133.36 [132.62–138.72] |
| experimental / 1 groups | warm | 456.70 [452.60–473.50] | 44.70 [42.03–45.31] |
| empty / 10 groups | cold | 641.70 [616.60–659.00] | 128.88 [126.66–136.31] |
| empty / 10 groups | warm | 357.15 [353.20–389.30] | 41.75 [39.87–43.41] |
| native / 10 groups | cold | 698.15 [678.60–711.00] | 145.94 [142.71–155.15] |
| native / 10 groups | warm | 470.55 [456.00–572.70] | 57.06 [54.93–76.86] |
| experimental / 10 groups | cold | 658.35 [643.00–669.80] | 140.03 [135.59–155.74] |
| experimental / 10 groups | warm | 456.85 [453.70–473.40] | 48.61 [47.14–51.18] |

Raw signed control contrasts and full ranges are published in the summary. Some contrasts are comparable to control variation; do not turn subtraction into universal per-card cost or a renderer ranking. CDP script/task durations are scoped browser counters, not OS CPU accounting. The first inspector-evaluation calibration failed; the actual page click-handler calibration measured 129.427 → 630.900 ms, then 43.004 ms after reload. Use totals after navigation, differences only within one document.

## Required metric status

Every numerical acceptance row remains pending. The [draft budget matrix](budget-review.json) retains units, user-visible outcome, scope, statistic, repeat/exceedance policy and approval provenance. No limit has maintainer agreement.

| Required metric | Discovery result / remaining gate |
| --- | --- |
| runtime-decoded-bytes | Supported cold response-body measurement; approval pending; historical candidate 16384 bytes |
| cold-ready | Supported driver-observed readiness; final presentation not implied; historical candidate 1000 ms |
| warm-ready | Supported cached reload readiness; final presentation not implied; historical candidate 750 ms |
| local-intent | Supported pointerdown to intercepted local intent, first inner control only; historical candidate 16.7 ms |
| load-cpu | Whole-dashboard CDP durations supported; OS CPU and exact per-card isolation unsupported; no justified numerical candidate |
| load-transfer | Whole-dashboard timing totals supported; composition/HA shell contrasts are descriptive; no justified numerical candidate |
| editor | Repeated actual editor boundary supported; empty setup control is not a card-editor equivalent; no justified numerical candidate |
| updates | Repeated same-document windows supported; no isolated per-card CPU or end-to-end latency claim; no justified numerical candidate |
| retention | Calibrated released-object diagnostics supported; isolated retained-byte budget unsupported; no justified numerical candidate |
| presentation | DOM-content and following rAF opportunity supported; final presentation unsupported; no justified numerical candidate |

The historical **1108.60 ms** ten-group experimental cold observation remains in the original report and this campaign. It exceeds the historical 1000 ms proposal. Current lower observations do not erase it, approve a requirement or justify relaxing a limit.

The old candidates are 16384 decoded runtime bytes, 1000/750 ms cold/warm readiness and 16.7 ms pointerdown-to-intent. The proposed statistic is the maximum over scheduled valid observations for each workload, with no replacement of slow valid captures. Limits, statistic and exceedance rules all require explicit maintainer agreement before fresh acceptance collection.

## Retention and rendering limits

Released-object weak-reference diagnostics improve on intentionally retained same-node endpoints. They do not prove universal absence of leaks. The harness itself retains growing WeakRef arrays; global heap/DOM readings include bookkeeping, HA and browser work. Empty div controls reproduce the harness, not native internals. No surviving weak target was available for retainer-path inspection. Isolated retained-byte attribution remains unsupported. Separate same-node reconnect, single dispatch and owned-resource checks passed in the unchanged runtime driver.

The rendering start is the browser performance clock before observer setup/setter execution. The content-matching MutationObserver callback and following rAF are recorded before driver polling. Paired setter measurements do not account for all asynchronous observer overhead; sub-ms/zero values expose clock quantization. Neither callback establishes final compositor/display presentation. No validated final-presentation mapping was found; that required evidence remains unsupported. HA action transport, physical latency, Safari/device behavior and full-desk everyday acceptance were not measured.

Primary method definitions: [versioned V8 protocol](https://chromium.googlesource.com/v8/v8/+/cde7a77e3a253dc96424a7ef8d7118022cd26dfd/include/js_protocol.pdl), [versioned V8 weak-reference guidance](https://github.com/v8/v8.dev/blob/a1dc18bd5c9d0577cee563179fa3922665c68e31/src/features/weak-references.md), [versioned HTML animation-frame source](https://github.com/whatwg/html/blob/c4aab9ee4477adbbb7e546b2c4abfc864e918e04/source). Runtime protocol 1.3, browser revision and V8 15.9.128.1 are recorded in samples; these documentation revisions are not claimed to be the shipped browser source.

## Retained pilot failures

The summary retains each rejection reason and any partial observations:

- `control-preflight`: driver button was behind HA; corrected normal pointer placement, then all six controls passed.
- `discovery-updates`: long-run token lifetime needed renewal outside timed workloads.
- `discovery-updates-v2`: each window needed browser-observed final-state confirmation in addition to successful REST responses.
- `method-validation`: inspector evaluation was not a valid positive calibration for ScriptDuration; a real page event subsequently passed.

No completed slow valid sample was removed. Exact update-driver revisions are reconstructable from published patches and verified hashes. Load/editor/input branches stayed identical. Original manifests/results/archives and subject source remain unchanged.

## Gate outcome

**Stage 1 stays open.** No numerical approval or fresh acceptance series exists. Required retained-byte/presentation evidence and numerical attribution/CPU/editor/update requirements remain unresolved. Stage 0 definition stays complete; stage 2 full-desk/device/accessibility/integration/physical/everyday work remains pending. No optimization is justified merely to force a pass; any subject optimization, stack comparison or new platform requires separate scope.
