# Design

## Context

See [proposal](proposal.md#why) and [research E1–E7](research.md#evidence). The existing harness measures a complete dashboard plus driver, reuses lifecycle nodes and observes frame opportunities after automation polling. Its historical verification embeds unapproved constants. This design is an investigation protocol with dependency gates; unresolved requirements and measurement validity are research deliverables, not assumed production decisions.

## Goals / Non-Goals

**Goals:** make metric definitions and approval provenance inspectable, validate attribution and retention/presentation methods, and produce a fresh reproducible pass/fail/pending evaluation for the unchanged subject.

**Non-Goals:** modifying experimental runtime behavior, asserting exact per-card CPU isolation from dashboard subtraction, treating headless rendering milestones as physical display response, or selecting a production framework. Accessibility and compatibility remain bounded by existing coverage; measurement instrumentation must not silently change tested input semantics.

## Decisions

### 1. Separate campaign artifacts and keep the subject fixed

Add focused drivers under the existing `tools/` directory, preferring new entry points over changing historical drivers. A separate `performance-followup/` directory holds `execution.json`, `budget-review.json`, discovery/verification samples and `review.md`. These are planned execution outputs, not files created by this proposal. Keep the original `execution.json`, `results/`, archived research and `src/` intact; record hashes of the served runtime and measurement tooling for each run.

Existing helpers may be reused read-only. Extend shared measurement helpers only when necessary, with focused regression checks for their consumers. A new driver must set `MCC_RESEARCH` to the new campaign area before importing `common.mjs`, or accept an explicit equivalent output root, because E5's helper captures the environment at module initialization. It must not overwrite the old research area. Record exact commands and paths in the maintained experiment guide when implemented.

Alternative: repurpose the old verification output and constants. Rejected because it would obscure historical negative findings and conflate candidates with agreed requirements (E2/E4).

### 2. Treat agreement and method validity as separate prerequisites

Every budget row records metric, units, user-visible outcome, workload/environment, measurement boundaries, statistic, sample count, numerical bound, rationale, uncertainty, exceedance/retry policy, required coverage, approval status and dated maintainer response/reference. Record these for assets, cold/warm readiness, local intent, shared/incremental CPU and transfer, editor, update work, retention and supported presentation milestones. Required unsupported rows remain pending; scope changes need explicit review and consistent roadmap updates, not omission from the matrix.

The old candidates (16 KiB decoded assets, 1000/750 ms cold/warm readiness, 16.7 ms local intent) are historical proposals only. Do not put them in the new evaluator as defaults. An apply request authorizes investigation, not approval of numerical limits. Draft requirements before discovery, then review evidence and secure agreement before freezing verification. Missing agreement blocks only dependent acceptance work; method discovery and a useful gap report can proceed.

### 3. Bound attribution through matched controls

Retain the one/ten-group experimental and three-native-Tiles-per-group workloads, cache semantics, viewport/theme/locale, fixture values and relevant/unrelated update rates from E3. Add an empty-dashboard control with the same HA shell, authentication and instrumentation, plus driver-only update/input controls where their effects can be defined equivalently. Report total dashboard CPU/transfer first and paired control differences with variation; do not label differences as isolated card costs or divide them into universal per-card estimates. Document the extra native body-state rendering and editor differences.

Measure editor first-open and same-document reopen in distinct repeated series, separating dashboard edit-mode setup from the editor-ready boundary where feasible. Keep zero-unrelated-DOM-work and single-dispatch checks as correctness gates, distinct from nonzero shared CPU. Recheck CDP counter resets at navigation boundaries before choosing totals or interval deltas (E5).

Alternative: rank the existing native/experimental totals directly. Rejected because unequal composition and shared overhead invalidate that interpretation.

### 4. Investigate released-instance retention and observable rendering

For retention, create fresh card instances on each cycle, remove them, release harness references and reset scalar recorder history. Inspect snapshots/retainer paths or equivalent supported diagnostics in separate instrumented runs. Compare repeated checkpoint series and matched HA-only controls; reserve same-node reuse checks for reconnect correctness. Forced GC remains a diagnostic intervention; a flat global heap alone is not proof of leak absence. Select an acceptance statistic only after method validation and requirement agreement.

For rendering, first investigate documented browser-side event/trace milestones in the pinned browser. Validate event-to-content association and start/end clocks using controlled visible fixture changes, rather than attaching a final-paint label to `requestAnimationFrame`. Report local intent, DOM/render milestone, HA transport and physical response as separate concepts; the latter two are not measured here. If no defensible final-presentation method is available, state that explicitly and leave that required evidence open. The design chooses the validation procedure, not an unverified API or compositor guarantee.

### 5. Freeze discovery and verification schedules separately

Proposed collection defaults reuse the earlier loads/inputs: ten cold and ten warm loads per variant/group, thirty local input observations per workload, and 60-second 1 Hz / 10-second 20 Hz relevant/unrelated update windows. Extend editor observations to ten independent first-open/reopen pairs per variant/group. Use three independent fresh-instance lifecycle series of fifty cycles per workload, with checkpoints every ten cycles. Collect at least three independent update windows per workload/rate/class to expose variation; establish matching control repetition during pilots. These counts are bounded research defaults, not statistical proof or product limits.

Record execution order/seed, settle and stop rules, cache proof and host contention in the campaign manifest; alternate native/experimental and control order where compatible with paired cold/warm and first-open/reopen semantics. Validate overhead with separate instrumented and minimally instrumented discovery runs. Never disable action interception to reduce overhead. Use no concurrent browser tests during timing captures. Missing trials and invalid captures carry reasons and remain in the evidence record; do not silently replace slow observations.

After discovery and agreement, freeze the actual schedule, metric definitions, environment/source/tool identities, aggregation and exclusions before fresh verification. The evaluator reads the new approval matrix, refuses pass statuses for unapproved/unsupported rows and records failures without adjusting thresholds. New verification does not erase E3's outlier; the review explains whether changed methods remain comparable, with historical and current outcomes separate. If a pilot shows defaults are inadequate, revise and justify the schedule before agreement and verification rather than deriving acceptance from underpowered tails.

### 6. Use explicit gate outcomes and a reversible lab lifecycle

Reconstruct only the documented isolated lab after capacity/version/security checks; reuse the lockfile and pinned image/browser. Stop affected tasks if identities or isolation cannot be reproduced. Prove synthetic allowlisting and external-command interception before any activation. Keep tokens/private state outside published artifacts and sanitize resource paths, headers and traces. Browser observations belong to a later apply; planning opens no browser or server.

The final review maps every required metric to method, approval, samples, statistic and pass/fail/pending rationale, and revisits unchanged correctness gates. Stage 1 passes only when all required rows pass with adequate scope. Failure, missing agreement, unsupported presentation or unresolved retention/attribution keeps the exit open and motivates a separately bounded follow-up. Update current docs to match that outcome without rewriting archives. No production migration applies; rollback removes only new tooling/campaign outputs. Stop the lab and verify relay/process cleanup; remove only generated state/image artifacts owned by this run and retain evidence and existing managed caches.

## Risks / Trade-offs

- [No defensible budget agreement] --> Preserve proposed rows and present the concrete decision needed; continue independent method work, but leave dependent acceptance tasks unchecked.
- [Controls cannot isolate shared HA work] --> Report matched whole-dashboard costs with uncertainty; keep attribution-dependent decisions pending.
- [Tracing or GC perturbs results] --> Separate diagnostic/timing runs and quantify overhead; publish only claims supported by the observed milestone or retention evidence.
- [Small samples or sporadic cold delays] --> Preserve all samples, predeclare exceedance rules and avoid unsupported tail claims; retain the historical outlier.
- [Reconstruction requires unavailable resources/artifacts] --> Record a preflight blocker; do not upgrade tools, alter host security or substitute production HA.
- [Data suggests optimization is necessary] --> Finish a negative finding and propose a new runtime change; leave this subject unchanged.
