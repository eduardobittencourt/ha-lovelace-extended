# Proposal

## Why

Roadmap stage 1 has demonstrated the minimum card's functional/editor/layout contract, but performance acceptance remains withheld. The [performance handoff](../2026-11-19-synthesize-desk-mvp-acceptance/research.md#stage-1-performance-handoff) identifies missing requirement agreement, shared-cost attribution and heap/paint evidence that must be resolved before claiming the stage's exit.

## What Changes

- Deliver a bounded stage 1 performance investigation using the existing two-slot experiment and its pinned disposable HA environment. Preserve stage 0's completed definition and stage 2's separate desk/device/physical gates.
- Build a metric/workload acceptance matrix from the existing samples and maintainer usability requirements. Record proposed versus explicitly agreed limits, aggregation rules, uncertainty and the evidence each decision needs before fresh acceptance captures.
- Extend measurement tooling only as needed to distinguish shared HA/driver work, repeated editor/update costs, released-node retention and observable rendering milestones. Validate each method before using it for acceptance; unsupported metrics remain pending.
- Collect separate discovery/method-validation and fresh verification evidence, retaining all historical samples, including the 1108.60 ms cold observation. Publish reproducible sanitized results and a per-metric pass/fail/pending decision.
- Update current documentation from actual outcomes. Close stage 1 only if every required performance gate has justified agreed budgets and passing evidence; a negative or incomplete investigation is a valid delivery, not a stage exit.

## Capabilities

### New Capabilities

None. This is research, measurement tooling and evidence reporting; metadata sets `skip_specs: true`.

### Modified Capabilities

None. The existing [independent-element-bindings contract](../../../specs/independent-element-bindings/spec.md), including explicit evidence and acceptance limits, remains unchanged. No product behavior or public API is introduced.

## Impact

Execution may add focused measurement drivers under `experiments/minimum-card-contract/tools/`, a separate campaign manifest and sanitized results under `experiments/minimum-card-contract/performance-followup/`, and evidence-based updates to README, the experiment guide and relevant roadmap/discovery/decision documents. Existing archived research, frozen execution manifest and published baseline results remain intact. Raw captures and auxiliary investigation scripts belong outside the checkout in `~/research/ha-lovelace-extended/evaluate-stage-one-performance/`.

The default plan reuses Core 2026.11.1 / frontend 20261028.5 and the pinned browser/toolchain, subject to a new reproduction/isolation preflight: the prior lab and generated credentials were removed. Execution may reacquire that disposable runtime and restore locked experiment dependencies, with resource/license checks; it does not install or upgrade host tools, change host security, or add a production dependency. This proposal itself performs none of those actions.

Non-goals: card/editor/recorder implementation changes under `src/`, production stack selection, framework comparisons, a full desk card, Safari/device acceptance, production HA access, physical actions, publication and releases. If the measurements indicate a runtime optimization or new platform is necessary, record the finding and scope a separate change rather than changing the subject under test to obtain a pass.
