# Stage 1 performance diagnosis

## Readiness

The [120-load diagnostic](readiness.json) completed the frozen alternating
cache and rotating workload schedule with 120 unique valid observations and no
exclusions. The [protocol](protocol.md) describes the failed and corrected pilots
and the diagnostic observer. The [lab checks](environment.json) identify the
pinned environment, verified served bytes and intercepted synthetic controls.

Reference readiness is shown in milliseconds as minimum / median / maximum,
with ten samples per cell.

| Fixture | Groups | Cold | Warm |
| --- | ---: | ---: | ---: |
| Empty | 1 | 615.2 / 648.8 / 685.5 | 349.3 / 356.3 / 363.9 |
| Native | 1 | 631.6 / 655.8 / 687.0 | 445.8 / 462.6 / 478.6 |
| Experimental | 1 | 630.0 / 646.8 / 712.1 | 442.8 / 459.9 / 477.1 |
| Empty | 10 | 619.5 / 658.8 / 1272.7 | 344.3 / 363.1 / 379.5 |
| Native | 10 | 684.6 / 719.8 / 855.1 | 442.4 / 463.7 / 575.8 |
| Experimental | 10 | 641.5 / 662.5 / 917.4 | 447.2 / 463.8 / 582.9 |

The 1272.7 ms cold empty control (ten-group schedule, trial 6, zero
cards) reached detected mount at 839.7 ms. The reference followed the
independent second frame by 425.4 ms. A dashboard with no benchmark cards
can exceed 1000 ms under these conditions. This identifies shared variance
without isolating HA from host scheduling or driver observation. On the
917.4 ms experimental ten-group cold load (trial 8), detected mount was
846.5 ms and mount-to-settle was 0.4 ms. Native ten-group cold mount
also reached 821.4 ms (trial 9). These are distinct observations and
their differences cannot establish card-owned cost.

In experimental cold loads, maximum mount-to-style/font settlement was
3.2 ms. Each load recorded one runtime entry each for the card, recorder
and stylesheet. Cold durations were 2.3–3.4 ms, 2.3–3.8 ms and 2.3–6.3 ms
respectively. The stylesheet began at 566.1–826.9 ms. Warm observations
showed zero transferred bytes for those entries. A single entry establishes
observed network accounting, with per-instance CSS application and other
renderer work still unisolated. Navigation, HA detection, resources and mount
overlap. The per-load record preserves that distinction and the signed
reference gap. Group labels on empty controls identify matched schedule cells.

### Ranked follow-up

1. Correlate slow cold loads with finer shared-shell/renderer and driver timings
   before altering the subject. Empty trial 6 and the late mount observations
   above support prioritizing both pre-mount and post-frame variance. Keep the
   original readiness reference and interception, and measure observer overhead
   with randomized paired controls. Host and automation effects may overlap.
2. If a reproducible pre-mount product contribution remains, test module
   registration/dispatch and per-card construction separately. The cold
   resource start times vary more than the recorded request durations.
   The current data cannot separate scheduling, import evaluation and HA
   bootstrap. A later comparison must preserve editor persistence, binding
   isolation, single dispatch and selective updates.
3. Investigate stylesheet reuse only if a matched perturbation shows a material
   delay. Mount-to-settle and network durations are short in these samples,
   so CSS is a lower-priority candidate. Preserve layout, theme, reconnect
   behavior and keyboard accessibility if a later change tests it.

Keep 1108.60 and 1104.80 ms as historical failures. The current 1000 ms
approved ceiling stays in effect. These diagnostics do not justify a tighter
ceiling or show repeatable optimization headroom on intended devices.

## Retained bytes (R2)

The [protocol](retention-protocol.json) and [controls](retention-calibration.json)
use Headless Chromium 159.0.8154.6 / V8 15.9.128.1, with a forced collection before
each snapshot. The candidate sums node shallow sizes that cease to be
strong-reachable if an owner node is removed. Shared paths are excluded under
that graph convention. The retained, debugger-only root, released debugger
group, harness-only and shared-owner controls all passed. In both the default and
`exposeInternals` runs, the live `WeakMap` key attributed only its 52 bytes even
though the owner still held a 16,528-byte graph. Releasing the key removed the
owner. The snapshot encodes complementary internal edges from the key and table.
Treating those edges as independent strong paths loses the conditional ownership.
The [V8 protocol](https://github.com/v8/v8/blob/15.9.128.1/include/js_protocol.pdl)
and [profiler API](https://github.com/v8/v8/blob/15.9.128.1/include/v8-profiler.h)
define the capture and shallow sizes used here.

The prerequisite is an attribution method validated against conditional
ephemeron edges and browser/embedder ownership as well as debugger roots and
shared paths. The fifty-cycle retained-byte series would produce an invalid
metric with this graph and was skipped. Existing WeakRef and listener checks
continue to support their original release and lifecycle boundaries.

## Presentation (R3)

The [protocol and Chromium revision](presentation-protocol.json) and
[calibration controls](presentation-calibration.json) distinguish three
boundaries. The natural trace mapped a unique user-timing anchor to
`performance.now()` in each control and emitted display-related events, but
neither trace yielded a screenshot record with content and a display identity.
Frame event proximity cannot identify which pixels were presented.

The targeted revision used Chromium's
[begin-frame protocol](https://github.com/chromium/chromium/blob/98a2592026af8d673b9fa83b626ac68bdf4ae78a/third_party/blink/public/devtools_protocol/domains/HeadlessExperimental.pdl)
and [handler](https://github.com/chromium/chromium/blob/98a2592026af8d673b9fa83b626ac68bdf4ae78a/headless/lib/browser/protocol/headless_handler.cc).
It sampled red before the delay, then green only in the deliberate-change
control, and red in the negative control. The browser-clock samples bracket
the capture calls. Both controls reported damage, so damage itself was
insufficient to identify changed content. The command returned a screenshot and
damage flag with no common display-frame ID or presentation timestamp. The
initial trace observations were retained when a nested CDP session was rejected;
the revision used a target-local session to execute the probe.

The prerequisite is a validated shared identifier from the content-bearing
frame to successful presentation feedback for that same frame, with a tested
clock mapping and matched observer-overhead controls, or an environment that
provides those signals. The 30-pair-per-workload series was skipped. No timing of
actual screen display, HA transport or physical arrival was measured.

## Acceptance and correctness

The [fresh four-row verification](verification-result.json) completed 120 loads
and 180 activations, including controls. Maximum observed readiness was 738.3 ms
cold and 490.9 ms warm. Runtime decoded size reached 11,610 bytes and local
intercepted intent reached 2.5 ms. All four approved maxima passed in that run.
The separate diagnostic R1 series and the two earlier cold failures remain
visible.

The [editor approval](editor-approval.json) sets 1000 ms for first open and
750 ms for same-document reopen, maximum per workload. The [editor verification](editor-result.json)
measures from initiating entry into edit mode to actual editor readiness and
includes native/empty controls. It completed 120 observations, including 40
experimental openings across 20 independent pairs. Its experimental row
result was **pass**.

| Groups | First-open maximum | Reopen maximum |
| --- | ---: | ---: |
| 1 | 559.8 ms | 372.9 ms |
| 10 | 801.4 ms | 584.3 ms |

The first editor campaign overlapped a short headless browser test. Its
[attempt record](editor-overlap-attempt.json) retains its four maxima and the
identity of all 120 preserved observations. A new serial run supplied the
editor decision above.

The [combined review](stage-review.json) retains the historical cold failure.
CPU, transfer and update allowances need representative requirements and explicit
agreement. Retained bytes and presentation need valid measurement methods.
The [ten-row matrix](budget-matrix.json) records approved and pending boundaries.

The [correctness rerun](regression.json) passed recorder, binding, selective
updates, 50 same-node reconnects, editor load and visual save/reload/reopen.
All three synthetic targets were off before and after. The layout matrix
remains historical. The [final cleanup](cleanup-final.json) records lab
shutdown and preservation of evidence.
