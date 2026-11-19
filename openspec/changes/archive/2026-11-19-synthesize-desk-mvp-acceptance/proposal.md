# Proposal

## Why

The desk contract and acceptance intent are documented across research and product notes, but roadmap stage 0 still lacks its final scope/acceptance synthesis. The completed two-slot experiment makes this a small next delivery: establish a traceable desk acceptance reference before planning the full MVP and its remaining performance work.

## What Changes

- Consolidate the existing desk role/data/action map and explicit limitations in `docs/mvp.md`, using role aliases and preserving verified units, capabilities, external lock handling and command-feedback boundaries.
- Refine the existing acceptance checklist into identifiable scenarios with preconditions, expected outcomes, evidence methods and milestone ownership. Cover visual creation/editing, independent sources/actions, supported cover controls, all three memories, unavailable/error states, reconnection, accessibility and final everyday acceptance.
- Distinguish historical read-only findings, demonstrated two-slot behavior and unvalidated full-desk behavior; resolve documentation contradictions without changing agreed product scope.
- Update stage 0 status and relevant references only after the synthesis satisfies its exit. Keep stage 1 performance acceptance and stage 2 device/physical/everyday gates open.
- Record a concise handoff for the separate performance-budget delivery: known evidence gaps and decisions required, without approving limits or planning a new measurement campaign here.

This is a stage 0 research/documentation change. It excludes product or experimental implementation, dependency installation, live HA inspection or changes, physical commands, new benchmarks, numerical-budget adoption and production stack selection. Stages 1 and 2 are not bundled: the recorded budget review identifies unresolved requirements and measurement limitations that deserve their own scope.

## Capabilities

### New Capabilities

None. Future desk acceptance criteria remain product documentation, not delivered runtime specifications. Change metadata sets `skip_specs: true`.

### Modified Capabilities

None. `independent-element-bindings` remains the bounded two-slot experimental contract; this change does not extend its requirements to a production desk card.

## Impact

Primary delivery: `docs/mvp.md`. Affected references/status: `docs/roadmap.md`, `docs/decisions.md`, `docs/discovery.md` and `README.md` where the synthesis changes their current statements. Evidence and decisions for this delivery remain in this change's `research.md`.

No runtime files, main specs, archived artifacts, dependencies, public APIs or HA environments change. Existing archived evidence is reused with its original dates/versions; current product documents govern superseded sequencing. Material unknowns are acceptance traceability and any missing user intent uncovered during reconciliation; unresolved intent blocks the affected synthesis rather than authorizing invented behavior. Exact layout/device results, physical feedback and performance acceptance remain later validation work.
