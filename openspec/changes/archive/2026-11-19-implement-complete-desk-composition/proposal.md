# Proposal

## Why

The two-slot experiment demonstrates binding/editor feasibility but cannot represent the complete desk: capability-aware cover controls, direct height data and three independent memory actions. The maintainer now requests the first complete stage 2 candidate and confirmed local position preview during drag with one command on release.

## What Changes

- Build a complete fixed-composition card candidate with identity defaults/overrides, independent state/attribute information, cover percent and direct height-sensor data, supported open/close/stop/position controls, three independently configured additional actions and a separate body action.
- Preserve reusable presentation, binding and action boundaries. The desk is the acceptance configuration, not a hardcoded installation or a dedicated firmware integration. No private entity defaults, inferred cm-from-percent conversion, automatic unlock or invented memory-arrival feedback.
- Keep position editing local while dragging; commit at most one set-position intent on release, discard cancelled/interrupted gestures and prevent body-action propagation. Define equivalent keyboard commit behavior and separation from actual position feedback.
- Deliver real HA visual configuration for every supported field, full save/reload/reopen and independent edits; represent missing/unavailable/domain-specific unknown states and action errors without disabling unrelated usable controls or replaying commands.
- Validate the full composition in an isolated synthetic HA lab first, with intercepted action descriptors, capability/error/reconnection fixtures, recorded Sections/Masonry layouts and ordinary keyboard/emulated-touch input. Publish sanitized coverage and reproducible evidence.
- Measure the complete candidate separately from the frozen two-slot subject. Carry the existing stage 1 performance requirements, historical cold failures and unsupported methods forward; publish actual findings and explicit acceptance gaps without declaring performance approved.

This is the first stage 2 implementation candidate, not completion of stage 2 or a declaration that stage 1 passed. Non-goals: production HA installation, real service execution, physical desk/lock operations, everyday replacement, reference-phone acceptance, release/distribution, a free grid, recipe catalog, general expressions or an unrestricted action engine. Those remaining stage 2 activities require their own corresponding scope and evidence. Planning creates no product code or lab changes.

## Capabilities

### New Capabilities

- `fixed-composition-card`: Complete reusable cover-based composition, independent information/action roles, three additional action slots, position preview/commit, real visual editing and observable failure/recovery behavior for the stage 2 candidate.

### Modified Capabilities

None. `independent-element-bindings` deliberately remains the bounded two-slot experimental contract. The complete candidate needs a new composition boundary; it does not modify the historical synthetic-only experiment or claim that experiment already supplies cover behavior, three memories or a production API.

## Impact

- Planning: this change's proposal, research, delta specification, design and tasks under the configured `research-first` schema.
- Proposed implementation area: `candidates/fixed-composition-card/`, containing maintained candidate runtime/editor modules, tests and a reproduction guide. Exact internal serialization is candidate-only; no stable public API or production renderer decision is adopted.
- Preserve `experiments/minimum-card-contract/` runtime/editor, dependency manifests, archived evidence and main specs. Reuse its versioned HA/browser tools as reference infrastructure without extending its allowlisted recorder into a real dispatch path.
- External lab adapters, acquisitions and raw observations: `~/research/ha-lovelace-extended/implement-complete-desk-composition/`; public sanitized outcomes/source provenance belong with the candidate. Apply must preflight isolation and acquisition/capture capacity with a 1 GiB free-space stop reserve. No host upgrade or new runtime dependency is planned.
- Apply documentation: candidate guide plus README, MVP, architecture, roadmap, decisions and discovery, updated only from delivered behavior and actual coverage.
- Material questions: complete-form persistence/conditional visibility, position cancellation and concurrent feedback, full-composition layout and candidate performance applicability. Use the existing versioned frontend/domain findings, focused source review, targeted synthetic pilots and measured candidate checks; no new generic discovery campaign or assumed phone conversion.
