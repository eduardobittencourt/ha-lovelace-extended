# Readiness diagnostic protocol

Date: 2026-11-19. This campaign diagnoses the unchanged experimental subject;
it is not acceptance collection and does not replace either historical failure.

## Pilot and correction

The [initial incomplete pilot](readiness-pilot-incomplete.json) preserved ten
completed observations. Its empty observer searched `title`/`aria-label`, missing
the pinned component's property-based label. The
[versioned hui-root source](https://github.com/home-assistant/frontend/blob/20261028.5/src/panels/lovelace/hui-root.ts)
passes `.label` and `hide-title`; the
[icon-button source](https://github.com/home-assistant/frontend/blob/20261028.5/src/components/ha-icon-button.ts)
passes the accessible name to its inner component. The correction recognizes
trimmed `label` as well as the existing attribute paths, with visible/enabled
geometry checks. It changes only diagnostic observation, not the HA component
or the frozen subject. An isolated browser regression checks a property-only
label through shadow roots, rejecting disabled and hidden controls.

The [corrected pilot](readiness-pilot-fixed.json) completed all 24 unique loads:
empty/native/experimental, one/ten groups, two cold/warm pairs. Trial zero uses
the original readiness helper without phase polling or tracing; trial one adds
polling and tracing. All twelve instrumented loads have ordered milestones and
a unique same-document trace/browser clock anchor. The prior incomplete pilot
remains a separate retained attempt.

These are small, ordered controls rather than a causal overhead estimate.
Tracing and phase polling are combined, first-use effects and host variance
remain possible, and some instrumented observations are slower. No overhead
constant is subtracted from later observations. A single clock anchor establishes
an offset in that document, not clock drift or physical presentation. Observer
frame waits and the historical reference run independently; their signed gap
can be negative and is not solely automation cost.

## Full R1 schedule and boundaries

Freeze before opening the measurement browser: unchanged subject/helper hashes,
diagnostic driver hashes, pinned environment, host load, disk reserve, cache
policy and all 120 load identities in the run's `schedule.json`. Run one then
ten groups; for each of ten trials rotate empty/native/experimental, recording
a cold load in a fresh context with explicit cache clear and its same-context
warm reload. Service workers remain blocked. Run serially, without concurrent
browser checks. Retain every slow valid observation, and stop on invalid capture
without replacing or completing a partial series from another run.

The full series uses phase polling without tracing. It retains the original
driver-observed cards/styles/fonts/two-frame reference. Resource timing,
DOMContentLoaded, detected HA availability, mounted cards, style/font settlement,
independent frame opportunities and host elapsed time are diagnostic boundaries.
Polling traverses open shadow roots every ten milliseconds until mount, and may
perturb timing. Detected mount is an upper observation bound, not exact
construction cost. Shared HA/driver intervals overlap; do not sum them into a
card-owned total. Traces are retained only for the separate pilot.

## Reproduction

Reconstruct and preflight only the disposable lab as documented in the experiment
guide, with its continuous storage guard. Use a new external campaign root and
new run names:

```sh
export MCC_DIAGNOSTICS="$HOME/research/ha-lovelace-extended/diagnose-stage-one-performance-gaps/resume-1"
node --test tools/diagnostic-paths.test.mjs tools/diagnostic-phases.test.mjs tools/diagnostic-empty.test.mjs
node tools/diagnostic-loads.mjs readiness-pilot-fixed pilot
# Review pilot calibration and provenance before this separate campaign:
node tools/diagnostic-loads.mjs readiness-campaign campaign
```

Names above identify retained executions and cannot be overwritten. A later
reproduction must use new names. The full series creates its own frozen schedule
before collection; its published outcome must verify unique complete coverage,
method/subject identities and any phase failures. A later unchanged pass would
not demonstrate an optimization or erase 1108.60/1104.80 ms.
