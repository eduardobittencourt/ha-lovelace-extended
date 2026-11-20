# Research

## Scope

D2 / roadmap stage 1. Determine whether matched HA card/library comparisons and interaction observations can justify `load-cpu`, `load-transfer` and `updates` limits. This investigation preserves the existing two-slot subject and performance contract. Comparator feasibility, new measurement calibration and budget derivation are deliverables of apply, not completed research.

## Evidence

Inspected on 2026-11-19. Relative links refer to reviewable repository evidence; historical observations are not current lab availability checks.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The maintainer requests evidence-backed limits and permits component-library benchmarks; no comparator or numerical allowance is selected. | [Consolidated response](../archive/2026-11-19-consolidate-stage-one-performance/research.md#focused-maintainer-review), 2026-11-19 | Read the recorded review and comparative direction. | Qualitative usability objective, not campaign results or budget approval. | Investigate comparisons and bring justified proposals back for review. |
| E2 | CPU, transfer and updates remain pending; cold has unresolved historical failures, and retention/presentation have unsupported methods. | [Combined review](../../../experiments/minimum-card-contract/performance-diagnostics/stage-review.json) and [matrix](../../../experiments/minimum-card-contract/performance-diagnostics/budget-matrix.json), 2026-11-19 | Inspect metric IDs, approvals and historical-failure disposition in current JSON. | Four bounded passes do not establish overall performance or final-MVP acceptance. | Preserve all ten dispositions; target only three rows here. |
| E3 | Existing discovery covers ten cold/warm pairs per variant/count and three update windows per class/rate; native composition and editors differ. | [Discovery](../../../experiments/minimum-card-contract/performance-followup/discovery.md) and [summary](../../../experiments/minimum-card-contract/performance-followup/discovery.json), 2026-11-19; Core 2026.11.1 / frontend 20261028.5 / HeadlessChrome 159.0.8154.6 | Read published schedule and summary structure against the load/update driver. | Whole-dashboard counters include shared HA work; bounded samples do not estimate robust tails or phone behavior. | Reuse boundaries and control design, recollect all selected variants together rather than ranking across campaigns. |
| E4 | The existing driver uses post-navigation CDP TaskDuration/ScriptDuration totals and resource transfer sums; update deltas stay within one document. It checks final synthetic state and late driver ticks. | [Driver](../../../experiments/minimum-card-contract/tools/followup-measure.mjs), inspected 2026-11-19 | Read load, editor and update branches. | Variant list is fixed to empty/native/experimental; no interaction-under-update measurement or third-party adapter exists here. | Use an external derivative harness with explicit hashes and reconstruction instructions; calibrate new endpoints before collection. |
| E5 | The lab has isolated networking, synthetic helpers, intercepted service calls and pinned tool dependencies; prior campaigns used a 1 GiB free-space stop reserve. | [Experiment guide](../../../experiments/minimum-card-contract/README.md), [package manifest](../../../experiments/minimum-card-contract/package.json), inspected 2026-11-19 | Inspect reproduction, isolation, storage and dependency instructions. | Historical prerequisites do not establish current capacity; newly selected third-party resources are uninspected. | Preflight capacity/isolation and pin/review external artifacts before acquisition or execution. |
| E6 | The current main spec requires justified reviewed budgets and passing measurements; no comparator behavior or production stack is promised. | [Independent element bindings](../../specs/independent-element-bindings/spec.md), full spec read 2026-11-19 | Read all requirements/scenarios, including explicit evidence and acceptance limits. | Experimental behavior only. | Keep `skip_specs: true`; publish findings rather than new runtime requirements. |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| Third-party HA compositions can provide a useful comparison for these three rows. | Pinned upstream source/license review, feature mapping and isolated pilot. | Supported per cell only if required data/action behavior and cache/resource boundaries match; reject or narrow unsupported cells openly. |
| Aggregate update work needs companion interaction evidence to address usability. | Matched idle/update local activation observations, correct final values and calibrated browser event timing. | Support a bounded responsiveness conclusion only when input delivery and dispatch remain observable under load; low aggregate CPU alone is insufficient. |
| Evidence can support a concrete budget proposal without arbitrary margins. | Absolute results, distributions, control/comparator variability and an explicit connection to usable dashboard behavior. | Produce a traceable proposed allowance/policy or identify the missing objective/calibration. No data-supported number means pending, not a guessed pass. |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Which at most two third-party artifacts can reproduce the composition? | Blocking for comparator collection, not for planning this investigation. | No upstream candidate has been verified in this proposal. | Review upstream HA cards/libraries against two independent display/action slots, body action, visual editing, pinned-HA compatibility and license availability; publish selection/rejection records. |
| Can the new harness observe interaction delay without hiding input queueing or adding material work? | Blocking for interaction collection and usability conclusions. | Existing pointerdown-to-intent omits pre-handler delay. | Calibrate normal and deliberately blocked event handling; publish browser-clock event/dispatch boundaries and paired observer overhead. Unsupported timing stays qualitative/pending. |
| What limits follow from representative objectives and comparative evidence? | Blocking for approvals and acceptance, research deliverable. | Native/comparator speed alone does not define usability; desktop results cannot be converted into phone results. | Present scoped proposals with rationale and explicit applicability; request agreement only after discovery evidence is reviewable. |
| Is the pinned lab available with sufficient disk capacity? | Blocking for acquisition and execution. | Prior low-capacity conditions cannot be assumed resolved. | Inventory only task-related caches and expected acquisition/capture size; require projected capacity plus a 1 GiB runtime reserve. Stop rather than remove unrelated material. |
| What is reference-phone performance? | Deferrable beyond this campaign. | No phone campaign is in scope; desktop observations establish only lab-scoped evidence. | Carry device-specific objectives and final MVP repeats forward. If phone evidence is essential to a proposed limit, leave that limit pending. |

## Research and Experiments

### R1 — Comparator selection and equivalence pilot

During apply, inspect primary upstream documentation, source and licenses. Select at most two third-party HA compositions, with URLs, release/commit, artifact hashes, dependency closure and rejection reasons. Prefer different relevant approaches where equivalence permits; do not use generic framework microbenchmarks as HA rankings. A missing visual editor excludes editor comparison, not automatically an otherwise equivalent runtime cell. If no third-party comparator qualifies, publish the negative feasibility result and retain native/empty evidence without claiming a comparative campaign succeeded.

Use existing pinned Core/frontend/browser tools in an isolated synthetic lab. Serve only selected downloaded assets locally; prohibit runtime CDN fetches. A pilot checks data/action independence, single dispatch, representative layout, saved/reopened configuration where supported, and exact resource membership/cache behavior. Side effects are bounded downloads, isolated HA state and external test adapters. Completion: a feature/cell equivalence ledger and passing fixture/isolation checks, or explicit exclusions. No production configuration is touched.

### R2 — Calibration and frozen discovery

Extend the harness outside the checkout; preserve subject source and old runs. Verify navigation-counter resets, same-document deltas, cold/warm cache classes, positive known-work input blocking, final fixture state and observer overhead before full collection. Freeze versions/hashes, environment/content dimensions, task scope, sample counts, sequence, endpoints, invalidation rules and storage guard in a published protocol. See [design](design.md) for the proposed schedule.

Collect serially with empty/native/experimental/eligible third-party variants and one/ten groups. Keep idle update windows separate from matched interaction windows so added input work cannot be mislabeled as update-only CPU. Measure CPU/transfer totals, update work and interaction results in distinct cells. Retain raw attempts and sanitize all published records. Completion means scheduled valid coverage or explicit missing/invalid reasons, with all valid slow samples retained. Do not infer displayed-frame timing from DOM/rAF, command transport from interception, or physical success from local dispatch.

### R3 — Budget proposals and conditional verification

Analyze absolute costs, control variation and equivalent-cell comparisons before proposing any allowance. Explain relevance to dashboard use, cache/network assumptions and sample uncertainty. A transfer-only wait estimate needs stated bandwidth/latency assumptions; it is not measured download responsiveness. Compare reported third-party benchmarks only as background when environments differ.

Present a review packet for each target row: endpoint, units, environment/workload, statistic, numerical proposal or unresolved gap, rationale, exceedance/missing-data policy and applicability. Leave pending until explicit dated agreement. Once agreement exists, freeze a separate verification manifest and recollect comparable observations; discovery samples cannot be reused as acceptance data. If agreement is deferred, complete the investigation with a pending disposition and specify the follow-up verification scope. Publish acceptance failures as failures. Side effects remain the same bounded lab/capture operations as R2.

## Outcome

Status: **investigation complete** (2026-11-19). All 18 tracked tasks are complete; unresolved acceptance requirements remain explicit research outcomes. The maintainer authorized the planned negative-comparator branch. No third-party composition qualified; their failed ordinary-keyboard pilots remain preserved rather than repaired or admitted by exception. Native/experimental/empty collection completed under the [frozen protocol](../../../experiments/minimum-card-contract/performance-benchmark/protocol.json).

### Published evidence and observed costs

- [Selection and exclusions](../../../experiments/minimum-card-contract/performance-benchmark/selection.md), [retained fixture pilot](../../../experiments/minimum-card-contract/performance-benchmark/retained-pilot.json) and [editor pilot](../../../experiments/minimum-card-contract/performance-benchmark/editor-pilot.json) separate actual runtime/editor behavior from absent or excluded functionality.
- [Calibration](../../../experiments/minimum-card-contract/performance-benchmark/calibration.json) detected the deliberately blocked browser event queue, navigation counter reset, same-document known work and deliberately late driver ticks. Observer/no-observer distributions remain disclosed without a zero-overhead assumption. Final presentation stays unmeasured.
- [Discovery](../../../experiments/minimum-card-contract/performance-benchmark/discovery.json) contains all 120 loads, 72 update-only windows, 90 interaction windows and 36 editor/setup observations, all valid. The editor count includes 24 real-editor observations and 12 empty setup controls. Each update campaign delivered all 9,360 synthetic changes. All 900 scheduled local activations produced one intended A intent with no target mutation, duplicate or dispatch timeout.
- The [report](../../../experiments/minimum-card-contract/performance-benchmark/review.md) and [derived summary](../../../experiments/minimum-card-contract/performance-benchmark/summary.json) publish cell-level counts, min/median/max, matched descriptive contrasts and limitations. For ten groups, experimental cold TaskDuration was 569.42–605.95 ms (median 574.70); native was 613.57–634.19 ms (median 623.96). These are whole-dashboard post-navigation totals, not isolated card CPU or readiness budgets. Experimental cold transfer was 1,368,049 bytes, including shared HA work; native's usual cold transfer was 1,364,934 bytes. Warm transfer was 3,931 bytes for all retained variants. Shared-resource variation and the extra native body display prevent a universal ranking.
- Across the 900 valid local activations, browser event-to-capture queue time was 0.20–4.00 ms (median 0.50), and pointerdown capture-to-intent was 1.00–6.40 ms (median 1.50), including release/driver work. This supports the disclosed local endpoints only; it is not displayed-feedback, transport, phone or physical acceptance.
- [Reproduction](../../../experiments/minimum-card-contract/performance-benchmark/reproduction.md) includes exact external source listings. Reconstructed report source generated byte-identical review.md and summary.json from public discovery.json without private HA access. [Environment](../../../experiments/minimum-card-contract/performance-benchmark/environment.json) records shared-host and offline-startup limitations.

### Budget disposition and independent gates

The [budget packet](../../../experiments/minimum-card-contract/performance-benchmark/budget-review.json) records load CPU, cold/warm transfer and class/rate-specific update cells as awaiting numerical agreement, with actual distributions, exact endpoints and unresolved requirements. No acceptable representative startup work share, network wait/cache objective or displayed-responsiveness/device/traffic allowance has been agreed. Observed maxima, a slow-reference ceiling or an arbitrary margin cannot replace those objectives. The continuation response is not budget approval. No new verification.json exists; the packet specifies the separately frozen, fresh-data prerequisites if cells are later agreed.

The investigation does not close stage 1. Existing runtime/warm/local-intent/editor bounded passes remain scoped to prior approvals; the valid 1108.60 and 1104.80 ms historical cold failures remain unresolved against the approved 1000 ms maximum. Retained-byte attribution and final presentation remain unsupported. Final-MVP repeats and stage 2 desk/device/accessibility/integration/physical/everyday validation retain their separate gates. No production stack, public configuration API or broader compatibility is adopted.

### Cleanup and storage

The [final cleanup](../../../experiments/minimum-card-contract/performance-benchmark/cleanup.json) verifies a stopped sandbox, closed loopback listener, absent PID/socket and no remaining sandbox processes. Resume-owned rootfs/layers were removed; all subject/tool hashes match prior verification. Available space after cleanup was about 6.16 GiB; minimum runtime availability was about 2.85 GiB, above the 1 GiB reserve. Raw scalar evidence, licenses, script snapshots, private synthetic state and historical evidence remain preserved. [Initial-pause cleanup](../../../experiments/minimum-card-contract/performance-benchmark/cleanup-initial-pause.json) remains separate evidence.

### Initial pause (historical)

Status: **paused during eligibility investigation** (2026-11-19). Tasks 1.1–1.3 are complete: starting dispositions and fixed subject hashes were reconciled, two upstream release artifacts were selected for pilots, and capacity/isolation preflight passed after authorized regenerable cache cleanup. See [selection](../../../experiments/minimum-card-contract/performance-benchmark/selection.md), [reproduction](../../../experiments/minimum-card-contract/performance-benchmark/reproduction.md) and [pilot observations](../../../experiments/minimum-card-contract/performance-benchmark/pilot.json). Both selected third-party compositions produced an intercepted A pointer intent but no ordinary focused-Enter intent; they are not admitted to collection. Native/prototype A, B and body actions passed pointer/keyboard checks; remaining fixture checks are incomplete. No new budget has been agreed. E1–E6 remain starting evidence, not campaign acceptance.

The run paused before completing task 2.1. Editor persistence, update delivery, calibration, protocol freeze and full discovery have not run. No discovery/verification manifest or invented timing result is published. The design permits a negative-comparator branch with native/experimental/empty controls; explicitly retain this outcome when resuming, or revise planning before changing selected compositions. Stage 1 remains open, including historical cold failures and unsupported retention/presentation.

The sandbox was stopped and campaign-owned extracted image/layers removed; [cleanup](../../../experiments/minimum-card-contract/performance-benchmark/cleanup.json) records the listener/process/socket checks, storage reserve and unchanged subject/tool hashes. Historical evidence, comparator bundles, licenses and exact external scripts are preserved. Reacquisition and fresh preflight are required before another run.

During apply, publish sanitized provenance, protocol, pilot/calibration outcomes, discovery data, analysis and budget dispositions under `experiments/minimum-card-contract/performance-benchmark/`; include public reconstruction instructions for externally stored scripts and artifacts. Update this record and the affected experiment/roadmap/decision/discovery documents. Keep stage 1 open unless all independent exit requirements are actually satisfied; this change leaves cold, retention and presentation unresolved.

### Checks at pause — 2026-11-19

- `git diff --check` passed; new evidence/artifact files were also inspected directly because they are untracked.
- Public JSON parsed, local Markdown file links resolved and all five source listings reconstructed to their recorded SHA-256 identities and external originals.
- `openspec validate benchmark-stage-one-performance --strict --no-interactive` passed with the expected skip_specs information; `openspec schema validate research-first --json` returned valid with no issues.
- Fixed subject/tool hashes match the preceding editor verification manifest. The final filesystem check reported about 6.3 GiB available (84% used), after owned-image cleanup.

These checks validate the partial package only. Tasks 2.1 onward, including integrated campaign review and final cleanup verification, remain unchecked. Re-run their applicable checks after resuming; no failed or missing pilot/measurement has been marked complete.

### Resume direction — 2026-11-19

The maintainer explicitly answered “yes” to continuing the planned negative-comparator branch: preserve the failed comparator pilots and collect native/experimental/empty controls only. This authorizes continuation of the existing investigation, not a keyboard exception, third-party ranking, numerical budget or performance acceptance. New attempts use an exclusive external resume directory; the earlier partial package and cleanup record remain historical evidence. Recheck storage, pinned identity and isolation before execution.

### Final integrated verification — 2026-11-19

[validation.json](../../../experiments/minimum-card-contract/performance-benchmark/validation.json) records full planned coverage/order, valid sent/delivered and input counts, preserved slow observations, all frozen hashes, local links, JSON and privacy/terms review. All 16 published source listings reconstructed to their recorded hashes. The reconstructed original report generator reproduced review.md and summary.json byte for byte using public discovery.json only; the reconstructed validator ran without private HA access.

`git diff --check` passed, with untracked artifacts separately inspected. `openspec validate benchmark-stage-one-performance --strict --no-interactive` passed with the expected skip_specs information; `openspec schema validate research-first --json` returned valid with no issues. No product/runtime source, dependency manifest, archived evidence or main specification changed. No upstream implementation or private HA state was added to the checkout. The final sandbox/listener/PID/socket/process and source-preservation checks passed; the image cache/rootfs were reclaimed while preserving evidence.

This closes the bounded investigation and its conditional unexecuted-verification branch, not performance acceptance. The three target budgets await requirements and explicit numerical agreement; cold/retention/presentation and final-MVP/stage 2 gates remain open. Review the completed evidence package before archiving.
