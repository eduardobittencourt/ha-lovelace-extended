# Research

## Scope

Roadmap stage 1 / discovery D2. Determine what prevents acceptance of the unchanged two-slot experiment and what evidence would justify a cold-readiness improvement below 1000 ms. This artifact records the planning-time evidence and the 2026-11-19 campaign outcome. No runtime optimization or physical desk execution is included.

## Evidence

All repository paths below are relative to this change. Published records were reread against the current checkout; no lab was started during planning.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | Cold readiness failed at 1104.80 ms; runtime size, warm readiness and local intent passed; six required rows are pending. | [Review](../../../../experiments/minimum-card-contract/performance-followup/review.md), 2026-11-19; isolated Core 2026.11.1 / frontend 20261028.5 campaign. | Read review, [budget matrix](../../../../experiments/minimum-card-contract/performance-followup/budget-review.json) and [frozen plan](../../../../experiments/minimum-card-contract/performance-followup/verification-plan.json). | Historical bounded environment, not a new capture or a tail estimate. | Preserve failure, approved maxima and all ten required rows. |
| E2 | Readiness waits for card presence/count, native update completion or experimental stylesheet loading, fonts and two frame opportunities; the driver then reads browser time. | [Workloads helper](../../../../experiments/minimum-card-contract/tools/workloads.mjs), [verification driver](../../../../experiments/minimum-card-contract/tools/followup-verify.mjs), inspected 2026-11-19. | Source inspection of `ready` and navigation/capture sequence. | No elapsed-time attribution from source inspection; driver scheduling and shared shell are included. | Diagnose individual milestones alongside the original boundary; do not shorten it to obtain a pass. |
| E3 | Each experimental instance attaches a stylesheet link; the runtime imports the recorder and performs synchronous element construction/rendering. | [Card source](../../../../experiments/minimum-card-contract/src/card.js), current experimental source inspected 2026-11-19. | Read constructor, imports, lifecycle and hass setter. | Potential contributors only; neither request duplication nor a bottleneck is demonstrated. | Examine resource timing and script/style costs before proposing asset or render changes. |
| E4 | Fresh-instance diagnostics use WeakRefs and forced GC, with retained/released positive controls; global heap includes harness bookkeeping. | [Lifecycle driver](../../../../experiments/minimum-card-contract/tools/followup-lifecycle.mjs), [discovery](../../../../experiments/minimum-card-contract/performance-followup/discovery.md), 2026-11-19. | Inspect driver and published method limitations. | Collected weak targets do not quantify isolated retained bytes or guarantee all owned objects were collected. | Investigate retained-size/ownership methods with calibration and explicit unsupported outcomes. |
| E5 | Rendering diagnostics match visible content via MutationObserver and record rAF; final presentation is unsupported. | [Rendering driver](../../../../experiments/minimum-card-contract/tools/followup-rendering.mjs), [review](../../../../experiments/minimum-card-contract/performance-followup/review.md), 2026-11-19. | Inspect content association and end-clock boundaries. | DOM/frame opportunity is not compositor/display confirmation. | Require independently validated content/frame association for any stronger endpoint. |
| E6 | CPU, transfer, editor and updates have discovery observations but no approved numerical budgets. | [Matrix](../../../../experiments/minimum-card-contract/performance-followup/budget-review.json), 2026-11-19. | Inspect required rows, boundaries and approval fields. | Shared totals and unequal native composition limit attribution; observed values alone do not justify requirements. | Reuse sufficient existing observations and request explicit approval for new budgets. |
| E7 | The current experimental spec requires honest failing/incomplete evidence and does not establish production support. Stage 0 definition is complete; stage 1 remains open. | [Spec](../../../specs/independent-element-bindings/spec.md), [roadmap](../../../../docs/roadmap.md), current checkout 2026-11-19. | Read full requirement scenarios and current stage gates. | Completed archived tasks do not close product milestones. | Research-only scope, no spec delta or stage 2 implementation. |
| E8 | The maintainer prefers readiness below 1000 ms if feasible. | User request invoking this proposal, 2026-11-19. | Direct request, recorded here without private conversation details. | No specific tighter ceiling, new statistic or waiver was approved. | Treat headroom as an investigation objective, keeping the existing approved limit. |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| HA/bootstrap or driver observation accounts for a material share of cold exceedances. | Correlated browser/driver milestones, matched empty/native/experimental controls, host conditions and instrumented/uninstrumented pairs. | Repeated phase evidence supports a bounded contribution; inconsistent timing or observer perturbation leaves attribution unresolved. |
| Experimental resource/style or construction work offers a useful optimization opportunity. | Resource initiators/cache behavior and trace slices correlated to card readiness for one/ten groups. | A reproducible contribution on the critical path supports a later optimization proposal; shared totals or source appearance alone do not. |
| Retained-byte attribution can be calibrated without harness ownership masking the result. | Snapshot/retainer diagnostics with known retained and released object controls and a harness-only control. | Detect known retained ownership and distinguish release with documented size uncertainty; otherwise retain unsupported status. |
| Pinned-browser evidence can associate changed content with a presented frame. | Versioned protocol/source support, controlled changing content and trace/frame correlation with a common clock. | Demonstrate endpoint and content identity including deliberately delayed changes; otherwise publish only the supported weaker milestone. |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Which cold phases dominate and how much is instrumentation overhead? | Blocking for optimization selection and claims of headroom. | Existing totals cannot choose a runtime intervention. | R1 controlled diagnosis. |
| Can owned retained bytes and content presentation be measured defensibly here? | Blocking for those required rows and overall acceptance. | Existing diagnostics support weaker conclusions only. | R2/R3 calibrated method pilots with stop conditions. |
| Which new budgets/statistics reflect the intended responsiveness and cost constraints? | Blocking for new-row acceptance only. | Neither apply authorization nor recorded observations approve numbers. | R4 requirement-backed proposals and explicit agreement. |
| Is a tighter cold ceiling sustainable across the intended workloads? | Deferrable until diagnosis. | Current 1000 ms ceiling remains valid; no tighter number is required to perform research. | Report achievable evidence and uncertainty, then seek agreement if proposing a new ceiling. |
| Which production optimization or additional platform should be adopted? | Deferrable, outside this change. | Findings may support a separate change, not an assumed implementation. | Deliver a ranked recommendation with affected correctness checks. |

## Research and Experiments

The protocol below defined the R1–R4 investigation. See the outcome for completed and unsupported work. Execution is limited to new measurement tooling and the documented disposable lab; it preserves subject bytes and historical captures. Record image/frontend/browser/V8/protocol identities, tools and hashes, cache state, viewport/theme/locale, host load and scheduling before collection. Preserve interception and fixture allowlists. Raw traces/snapshots stay in the external campaign area; publish sanitized tables, conclusions, source versions and reproducible commands under `performance-diagnostics/` during apply. No secrets or complete private configurations enter the repository.

### R1 — Cold critical path and headroom

Recheck frozen identities and historical samples before collection. Use the original navigation-to-readiness boundary as a parallel reference and add diagnostic milestones for resource requests, HA availability, element definition/mount, style/font readiness, frame opportunities and driver observation where observable. Validate clock mapping and ordering; label unobservable intervals. Use matched empty/native/experimental one/ten-group workloads, ten cold/warm pairs per workload (120 loads), rotating variant order as in the prior campaign. Pilot traced/untraced pairs first and freeze the diagnostic plan before full collection. Publish medians, ranges, all maxima and phase uncertainty; shared intervals are not automatically additive or card-owned. Keep every slow valid observation and the 1108.60/1104.80 ms historical failures.

Completion is a reproducible causal analysis or explicit attribution limit, plus an intervention recommendation ranked by evidence, expected affected phase and risk. An unchanged baseline passing a later run does not erase the previous failure or demonstrate an optimization. No variant that changes subject behavior is implemented here. Tracing can perturb timing; separate diagnostic traces from acceptance samples.

### R2 — Retained-byte method

Consult version-matched browser HeapProfiler/snapshot documentation and implementation where necessary. Pilot known retained/released objects and harness-only controls, record debugger/automation roots and size conventions, and inspect ownership/retainer paths. If calibrated, use the prior three independent fifty-cycle series per variant/count, with checkpoints every ten cycles, fresh instances, released harness references and separate same-node reconnect checks. Freeze attribution rules before measurement. Completion is a validated bounded byte/ownership method and observations, or a specific unsupported report naming the missing capability. Stop after one pilot and one targeted method revision if calibration still fails; do not spend a full campaign repeating an invalid method. Forced GC and snapshots are diagnostic side effects, not production behavior.

### R3 — Presentation method

Consult version-matched tracing/compositor and browser timing sources during execution. Pilot identifiable visible changes, positive controls with deliberate content delays and negative/no-change controls; map clocks and frame/content identity. If defensible, freeze thirty instrumented/uninstrumented pairs per native/experimental one/ten-group workload, retaining observer-overhead evidence. Completion requires a precisely named endpoint; headless frame evidence never establishes physical display latency. If content-to-presentation association cannot be validated after one pilot and one targeted revision, retain the required row as unsupported and describe a separately scoped environment/method prerequisite. Do not silently substitute DOM mutation, rAF or screenshots for the required endpoint.

### R4 — Requirements, agreement and verification

Use E6 observations where sufficient; collect targeted missing evidence only after specifying the gap. For each required row record boundary, workload, unit, statistic, sample schedule, candidate limit, requirement rationale, uncertainty and exceedance policy. Request explicit agreement for newly proposed limits and any tighter cold ceiling. Preserve the approved four limits and maximum/no-replacement policy unless separately changed by explicit agreement. Freeze only supported and approved rows for fresh verification; unsupported/unapproved rows remain required and pending. Reuse offline evaluator patterns with meaningful negative tests for missing approvals, changed methods/identities and a single slow valid sample. Publish pass/fail/pending separately per row and aggregate stage status honestly. Missing agreement blocks dependent collection only; finish independent diagnostics and the gap report.

## Outcome

The [offline preflight](../../../../experiments/minimum-card-contract/performance-diagnostics/preflight.json)
verified 36 current identities, reconstructed five historical methods, preserved
35 historical evidence identities and exactly replayed the previous verification
decision. The [lab preflight](../../../../experiments/minimum-card-contract/performance-diagnostics/environment.json)
verified fixture interception and served subject bytes in the pinned environment.

The [initial R1 pilot](../../../../experiments/minimum-card-contract/performance-diagnostics/readiness-pilot-incomplete.json)
retains ten observations before the additional empty dashboard milestone timed out.
A property-based label correction passed the fresh 24-load pilot. The subsequent
[120-load diagnostic](../../../../experiments/minimum-card-contract/performance-diagnostics/readiness.json)
completed without replacement or exclusion. The largest experimental cold result
was 917.4 ms; a matched empty cold control reached 1272.7 ms. The
[diagnosis and handoff](../../../../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md)
prioritize attribution of shared pre-mount and observation variance. No causal
card-specific bottleneck or tighter ceiling was demonstrated.

R2 retained-byte calibration failed default and revised conditional
`WeakMap` ownership checks. R3 presentation calibration recovered changed
screenshot content with the begin-frame revision, while an identity join to
presentation feedback remained unavailable. Both full schedules were blocked by
their method prerequisites.

The [ten-row matrix](../../../../experiments/minimum-card-contract/performance-diagnostics/budget-matrix.json)
records the existing four approvals and the [editor agreement](../../../../experiments/minimum-card-contract/performance-diagnostics/editor-approval.json)
for 1000/750 ms maximum end-to-end first-open/reopen editor readiness. CPU,
transfer and update candidates still need requirement-backed ceilings and
agreement. Retention and presentation lack calibrated methods.
The [fresh four-row verification](../../../../experiments/minimum-card-contract/performance-diagnostics/verification-result.json)
completed 300 observations and passed all four approved rows in that campaign.
Historical 1108.60 and 1104.80 ms cold failures remain valid, and stage 1 stays open.

After the dated editor approval, the
[serial editor verification](../../../../experiments/minimum-card-contract/performance-diagnostics/editor-result.json)
completed 120 observations including controls; the experimental editor row
was **pass**. The
[combined review](../../../../experiments/minimum-card-contract/performance-diagnostics/stage-review.json)
records five pending rows and preserves the unresolved historical cold failure.
The [correctness rerun](../../../../experiments/minimum-card-contract/performance-diagnostics/regression.json)
passed, and [final cleanup](../../../../experiments/minimum-card-contract/performance-diagnostics/cleanup-final.json)
preserved raw evidence and reclaimed disposable lab space.

[Final validation](../../../../experiments/minimum-card-contract/performance-diagnostics/validation-final.json)
records offline replay, source/link checks, tests and the remaining gates.
