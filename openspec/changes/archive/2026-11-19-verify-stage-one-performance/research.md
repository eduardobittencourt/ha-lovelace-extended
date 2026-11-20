# Research

## Scope

Stage 1 / D2: verify the unchanged two-slot prototype against adopted benchmark limits and investigate the three remaining methodological/causal gaps. No production implementation or candidate verification is included. This record separates inspected evidence from future measurements; the research delivery can be complete with explicit negative findings while stage 1 remains open.

## Evidence

E1–E7 are planning-time observations. The dated execution findings below record the subsequent actual campaign and supersede pending-execution language.

All observations below were inspected in the checkout on 2026-11-19. No sandbox, browser campaign or physical device was started during planning.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | Numerical selection is delegated to agents; native maxima are adopted for four load cells and eight update cells, with no further user-number or numerical-approval prerequisite. | [Policy](../../../../docs/performance-budgets.md), [exact ceilings](../../../../docs/performance-budgets.md), maintainer decision 2026-11-19. | Read the policy and machine-readable limits beside the published summary. | Adoption is a policy decision, not a new measured pass. | Freeze these values unchanged for fresh verification; select further comparator-backed limits autonomously. |
| E2 | The completed benchmark has native/experimental/empty data; Button Card and Mushroom failed keyboard eligibility. Its protocol pins 120 load rows, 72 update windows, 90 interaction windows and the served subject/tool hashes. | [Review](../../../../experiments/minimum-card-contract/performance-verification/review.md#evidence-and-reproduction), [protocol](../../../../experiments/minimum-card-contract/performance-verification/review.md#evidence-and-reproduction), [reproduction](../../../../experiments/minimum-card-contract/performance-verification/review.md#evidence-and-reproduction), 2026-11-19; Core 2026.11.1, frontend 20261028.5, HeadlessChrome 159.0.8154.6. | Inspect schedule, endpoints, exclusions, locally retained source listings and raw-evidence directory entries. | Whole-dashboard costs include shared HA/driver work; native has an extra body display. Three update repeats do not estimate robust tails. Local external scripts exist but must be hash-verified before reuse. | Reuse the published reconstruction and same schedule, boundaries and controls; do not claim third-party measurements or exact per-card subtraction. |
| E3 | The two historical cold failures are 1108.60 and 1104.80 ms against 1000 ms. A diagnostic empty control reached 1272.7 ms; later fresh cold data passed without resolving those failures. | [Diagnosis](../../../../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md), [stage review](../../../../experiments/minimum-card-contract/performance-diagnostics/stage-review.json), 2026-11-19, same pinned lab. | Inspect recorded milestone decomposition and historical/fresh dispositions. | Empty-control delay supports shared variance, not a proven host, HA or observer cause. A later pass is not causal resolution. | Keep the ceiling and historical failures; investigate pre-mount and post-frame shared/driver variance before product changes. |
| E4 | The heap method excludes weak edges and compares reachability with/without an owner. Default and exposeInternals pilots attributed only 52 bytes to a live WeakMap key despite a 16,528-byte owned graph. | [Retention protocol](../../../../experiments/minimum-card-contract/performance-diagnostics/retention-protocol.json), [diagnosis](../../../../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md), [analyzer](../../../../experiments/minimum-card-contract/tools/diagnostic-heap.mjs), V8 15.9.128.1. | Read analyzer/control logic and failed conditional-ownership findings. | Conditional ephemeron and browser/embedder ownership are unvalidated; global heap totals or WeakRef collection do not establish isolated retained bytes. | Try an externally implemented corrected ownership analysis only behind the full control suite; retain the original unsupported result. |
| E5 | Previous tracing and beginFrame probes identified changed pixels but could not join their identity to successful presentation feedback for the same frame. | [Presentation protocol](../../../../experiments/minimum-card-contract/performance-diagnostics/presentation-protocol.json), [diagnosis](../../../../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md), [probe](../../../../experiments/minimum-card-contract/tools/diagnostic-presentation.mjs), Chromium revision 98a2592026af8d673b9fa83b626ac68bdf4ae78a. | Read target-local CDP probe, color controls and clock mapping. | Screenshot capture, hasDamage, event proximity and two rAFs are weaker endpoints. Headless presentation feedback does not measure a physical display. | Source/trace capability pilot must show an explicit identity join and clock validity before a presentation series; otherwise stop that branch. |
| E6 | Existing verification wrappers preserve four historical limits and a separate editor approval, and explicitly keep historical cold failure unresolved. | [Matrix](../../../../experiments/minimum-card-contract/performance-diagnostics/budget-matrix.json), [wrapper](../../../../experiments/minimum-card-contract/tools/diagnostic-verification.mjs), [phase observer](../../../../experiments/minimum-card-contract/tools/diagnostic-phases.mjs), 2026-11-19. | Read evaluation, hash checks and observer milestones. | Old wrappers contain original approval prerequisites and cannot silently substitute for the new delegated budget policy. | Reuse unchanged helpers through external wrappers; publish a new evaluator and a ten-row reconciliation instead of modifying historical tooling/results. |
| E7 | Existing contracts require comparable evidence, justified budgets and passing results; the complete composition has separate coverage and pending acceptance. | [Two-slot spec](../../../specs/independent-element-bindings/spec.md), the locally inspected separate candidate spec (outside this delivery), [roadmap](../../../../docs/roadmap.md), read 2026-11-19. | Inspect requirements, scenarios and stage boundaries. | Neither specification makes this investigation production adoption. | No behavior delta or spec changes; use skip_specs and preserve stage 2 gates. |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| The unchanged prototype meets the adopted native-envelope limits. | Fresh complete load/update cells with exact hashes and controls. | Every valid experimental task/script/transfer value is at or below its matching ceiling; an exceedance fails its metric/cell and incomplete coverage stays pending. |
| Cold failures have an identifiable shared or observer contribution. | Paired observer on/off trials, original endpoint retained, host/shell/driver milestone correlation and controlled reproduction. | A proposed cause must reproduce under a documented perturbation and be distinguished from observer cost. Mere non-recurrence or a slow empty control is insufficient. |
| A corrected ownership model can handle conditional and embedder retention in this runtime. | Known retained/released, shared, debugger-root, WeakMap and DOM/listener/closure ownership controls. | All controls distinguish intentional retention from release and exclude shared/debugger-only ownership correctly. Any failure blocks byte-budget collection. |
| The pinned runtime exposes a usable content-to-successful-presentation join. | Content-bearing frame identifiers, successful matching feedback, browser-clock mapping, delayed-change/no-change controls and paired overhead. | The same changed frame is identified with valid feedback and clock association; proximity or screenshot timing alone refutes this method's sufficiency. |

## Open Questions

These questions were registered before execution; the dated findings below record their actual dispositions and remaining follow-up scope.

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Do the adopted cells pass in fresh data? | Blocking for CPU/transfer/update acceptance, not planning. | Discovery cannot be reused as acceptance. | R1 freezes and collects a separate campaign. |
| Can a cold cause be reproduced and addressed within a fixed subject/environment? | Blocking for cold disposition. | Historical failures survive later passes. | R2 probes shared/observer causes; subject or environment changes require a separately scoped change if needed. |
| Can conditional/embedder ownership be calibrated? | Blocking only for retained-byte acceptance. | The existing algorithm is invalid for that endpoint. | R3 bounded correction and controls before any full series or new numerical selection. |
| Can actual successful frame presentation be identified in the pinned lab? | Blocking only for presentation acceptance. | Draw/capture is not the required endpoint. | R4 source/capability pilot; no environment upgrade or weaker endpoint substitution. |
| Are phone, complete-candidate and physical results acceptable? | Deferrable to separately scoped stage 2. | Changed subjects/devices cannot inherit this lab's results. | Carry forward D3 and final-MVP repeats without blocking this bounded investigation. |

## Research and Experiments

### R1 — Fresh benchmark-limit verification

Reuse E1/E2 in the same pinned isolated lab. Reconstruct scripts from the public listings, check subject/tool/environment hashes, verify fixtures and interception, calibrate observer endpoints, and freeze the adopted-limit file hash and exact schedule before collection. Run serially: ten cold/warm pairs per variant/count (120 rows), three relevant/unrelated windows at 1 Hz for 60 s and 20 Hz for 10 s (72 windows), then their matched input windows plus no-update controls (90 windows, ten activations each). The 20 Hz cells are stress conditions, not assumed desk traffic.

Evaluate task and script separately, actual whole-dashboard transfer including cache behavior, and update-only deltas against the matching adopted ceilings. Keep matched interaction CPU separate; retain input queue/intent/target/count/timeout observations as companion evidence. Do not apply historical local-intent limits to a newly defined boundary. Runtime size and cold/warm readiness can be reevaluated only at their original endpoints; unchanged previously passed rows may retain their dated evidence. Real-editor persistence/correctness is a regression prerequisite, not an invitation to infer a new editor performance pass.

Completion: publish every attempted row, coverage and per-metric pass/fail/pending decisions; freeze mismatch or unsupported environment is an explicit stop. Side effects: disposable synthetic HA state, local external capture/tool files; no real service dispatch. Detailed durable outputs remain in the local research bundle; a compact repository summary records findings and provenance. No subject edits.

### R2 — Cold causal diagnosis

Reuse the unchanged phase observer and original readiness endpoint (E3/E6), with new external instrumentation only. Pre-register ten matched observer-on/off cold pairs per variant/count, rotate ordering, and keep host load, shell readiness, resource registration/mount/settlement, driver observation lag and all valid slow samples. This is a bounded 120-observation diagnostic series, separate from the 120-row R1 verification.

Try one evidence-led external observer/scheduling correction only if the initial pilot identifies a specific measurement contribution; preserve the original endpoint and pin the corrected tool hash. Test it in a separately frozen matched series of the same size; stop rather than repeat until a pass. If causality remains unresolved, or resolution needs a product/environment change, record the blocker and next scope. New passing samples never erase old failures. Completion is a reproducible causal disposition or a precise limited result, not a guaranteed cold pass. Same synthetic-only side effects as R1.

### R3 — Retained-byte method correction

Inspect the pinned snapshot metadata and conditional-edge representation before implementing an external candidate analyzer; reuse E4's failed controls as regression cases. Evaluate conditional ownership to a fixed point only if the source representation supports it; document root, shared-path and embedder conventions. Include deliberate retained/released payloads, shared owners, debugger-root release, live/released WeakMap keys and DOM/listener/closure ownership. One initial candidate and at most one evidence-led revision are allowed. If any control fails, publish unsupported status and skip full collection.

If calibrated, run separate native discovery using three fifty-cycle fresh-instance series for each group count, released harness/debugger references and checkpoints at baseline/every ten cycles after forced GC. Use empty controls and retainer paths. Select the native maximum residual owned bytes above baseline per count/checkpoint as the ceiling, using the exact same attribution boundary; record zero if that is the observed maximum. Freeze those values under the standing delegation, then run fresh native/experimental/empty verification with three fifty-cycle series per count. Retain signed deltas and paths; evaluate positive residuals against the ceiling, with any retained removed experimental owner or listener also reported explicitly. Do not equate aggregate heap growth with card-owned retention.

Completion: calibrated comparison and fresh decisions, or preserved failed controls with a specific missing capability. Snapshots stay outside the checkout; publish compact sanitized calibration/reproduction data. Do not run full byte series without valid ownership attribution.

### R4 — Presentation capability and calibration

Use E5's exact pinned Chromium/V8 revision and available local source/reference material to inspect candidate frame identity and feedback signals. Re-run delayed color-change/no-change controls with a deliberately delayed path and clock mapping; require explicit content/frame identity joined to successful feedback, not nearest timestamps. Compare observer-on/off overhead. One candidate plus at most one evidence-led revision; stop if the signal is unavailable. No headed-browser migration, binary rebuild or browser upgrade is included.

Only after calibration, collect native discovery with thirty visible relevant-change observations per count and matched empty/driver controls. Define input as the browser-clock synthetic state-change trigger and output as the successful presentation feedback for that changed content frame; do not mix this with action dispatch, HA transport or physical response. Select the native maximum per count as its ceiling, freeze it under delegated authority, then collect thirty fresh matched observer-on/off pairs per native/experimental count plus matched empty controls. Publish all association/clock/overhead failures. No arbitrary overhead tolerance is invented: if observer work cannot be separated sufficiently to validate this endpoint, it remains unsupported.

Completion: calibrated browser presentation evidence and fresh per-cell results, or a precise unsupported-method disposition. Trace/snapshot files are bounded, external and sanitized before publication; no actual display/device claim.

### R5 — Reconciliation and evidence delivery

Publish a new ten-row decision record preserving the four bounded prior passes, current editor evidence, both historical cold failures and all new dispositions. A cold row cannot close solely because a new run passes; require a documented causal resolution and passing fresh original-endpoint verification, otherwise leave it unresolved. Complete-stage acceptance additionally requires every required row's supported method, adopted applicable limit, passing fresh coverage and carried correctness/layout evidence. Negative findings complete research tasks, not missing acceptance.

Use a fresh disk preflight, the existing 1 GiB reserve and at most one live browser campaign. Allocate traces/heaps only after a bounded size estimate; preserve attempts and stop on reserve crossing. Stop the owned sandbox on all exits and verify PID/listener/socket/process cleanup. Retain source listings/hashes, protocol/calibration/limits/manifests, results, reproduction and cleanup in the local research bundle; keep a compact findings/provenance summary in the repository. Update affected docs from actual results only.

## Outcome

Status: **bounded investigation delivered**. The investigation is separate from performance acceptance. Fresh exceedances and unresolved/unsupported requirements keep stage 1 open; no row is waived or transferred to the complete candidate.

## Execution findings — 2026-11-20 (UTC)

### R1 — Frozen native-envelope verification

The locally retained protocol, calibration and source index, summarized in the [method record](../../../../experiments/minimum-card-contract/performance-verification/review.md#method), freeze the original subject, exact adopted budget hash, helpers and complete schedule. All 120 loads, 72 update windows and 90 interaction windows are valid; 900 local intents were recorded without dispatch timeout. The [evaluation](../../../../experiments/minimum-card-contract/performance-verification/review.md#fresh-ceiling-evaluation) fails load CPU/transfer and update script observations. Shared HA/driver work and the native extra body surface remain limitations; no ceiling or slow sample was changed. Equality/exceedance, missing/invalid coverage, hash mismatch and mixed failure/coverage tests passed.

### R2 — Cold diagnosis and one transparent observer revision

Two separately frozen 120-observation paired series retain five new experimental ten-group exceedances; the same-helper R1 readiness companion adds four, for nine fresh exceedances plus both historical failures. The single allowed host-only driver observer preserves receiver/arguments/results/errors and locates prolonged locator waits in instrumented slow trials. Phase mount/frame completion is weaker than proof that the locator's visibility predicate had passed. The [causal disposition](../../../../experiments/minimum-card-contract/performance-verification/review.md#cold-readiness) therefore remains unresolved; no passing run, subtraction or endpoint change closes history. A controlled visibility-versus-retry study is the precise next scope.

### R3 — Conditional/native ownership calibration and gated series

The single evidence-led revision passed every required retained/released/shared/debugger/WeakMap/native-DOM/listener/closure control in the pinned runtime. The initial auto-index parser failure remains preserved. This calibrates the stated exclusive production-root graph boundary, not a universal GC or production-memory claim. Independent discovery selected twelve exact native maxima; fresh experimental verification is pass. See the method-scoped records rather than global heap totals or a production-memory promise.

Complete native/empty discovery: 72 checkpoints across three fifty-cycle series per count/variant. Twelve exact native maxima frozen in retention-budgets.json under standing delegation. Complete independent coverage: 108 checkpoints and 900 mount/remove cycles across native/experimental/empty counts. Experimental result: pass; signed deltas, retainer paths, removed owners and listener/resource evidence retained.

The initial auto-index WeakMap parser failure and the unadmitted prefix-based instance-detection attempt remain preserved. A structural marker-property positive control identified five known mounted/removed-retained instances and their subsequent release, independent of concatenated-string representation. The [calibration summary](../../../../experiments/minimum-card-contract/performance-verification/review.md#retention), native discovery, limits and independent verification retain their actual scope. Raw authenticated heaps stay external; global heap deltas are not substituted.

### R4 — Presentation capability

Unsupported content-to-successful-presentation method in the pinned probe. One source-led target-local tracing correction restored screenshots and passed delayed/no-change/clock controls. Content carries source_id/frame_sequence, while the observed FramePresented and Display::FrameDisplayed records expose no matching identifier or ID/flow metadata. The pinned screenshot source describes expected_display_time as an estimate; it is not successful presentation feedback. No timestamp-proximity, screenshot, damage, local-intent or two-frame substitute is accepted.

Skipped: content-to-successful-feedback identity calibration failed; no native numerical latency discovery or ceiling selection is admitted. Unexecuted: no calibrated endpoint or frozen native-derived presentation limit. No value was invented and no environment/binary migration was performed.

The [presentation controls](../../../../experiments/minimum-card-contract/performance-verification/review.md#presentation) preserve delayed/no-change, clock and observer-overhead results. Capture, damage, adjacent timestamps and local intent are not successful presentation of the same identified content frame or physical-display timing.

### R5 — Ten-row delivery and limitations

The [ten-row summary](../../../../experiments/minimum-card-contract/performance-verification/review.md#stage-decision) independently accounts for all ten required IDs, original budget authority and scope, dated carried passes, fresh failures and missing capabilities. The [review and evidence-access summary](../../../../experiments/minimum-card-contract/performance-verification/review.md), regression and cleanup preserve original source identity and synthetic-only execution. Candidate/final-MVP, reference-device/accessibility, real integration/transport, physical/everyday validation and production-stack decisions remain separate. Completed investigation tasks do not imply accepted performance.

## Maintainer delivery clarification

After execution, the maintainer required the detailed evidence package to remain local-only. The full 67-file package was moved intact out of the checkout to the research task’s `delivery-evidence/performance-verification/` directory. No observation, limit or result was changed, and no experiment was rerun. The repository now keeps only the compact summary and a staging guard; old detailed-package checks are retained locally as historical validation records, not presented as validation of the new reduced file layout. Current relative links, whitespace and OpenSpec structure were rechecked. Full numerical replay needs the retained local bundle or a separately scoped rerun.
