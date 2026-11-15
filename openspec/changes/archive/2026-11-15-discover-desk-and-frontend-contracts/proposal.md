# Proposal

## Why

Lovelace Extended needs evidence for its first reusable card and visual editor before choosing integration-dependent behavior or a production stack. The maintainer's desk provides a concrete MVP example, but an open source library must derive its boundaries from public Home Assistant contracts and independently understandable examples, rather than reproduce one installation.

## What Changes

- Deliver research and documentation for roadmap stage 0, primarily discovery questions D0 and D1, with D2 limited to baseline methodology and future experiment planning.
- Inspect the actual desk through read-only access when available, recording sanitized roles, data, actions, units, availability, and confirmation limits. Treat it as one reference case, not the library's final objective or a universal integration contract.
- Research versioned official HA contracts for cards, visual editors, selectors, actions, and sizing; distinguish documented extension points from frontend internals.
- Create a bounded public reference matrix: the desk case, a documented non-desk cover case, and a simple multi-entity composition outside the cover domain. These are research comparisons, not additional MVP implementations or support promises.
- Review selected public custom-card projects for composition and editing approaches, attributing observations to their sources and revisions without assuming their APIs are stable or adopting their code.
- Propose fixed MVP regions and visual editor flows based on those findings. Separate reusable binding needs, domain semantics, and installation-specific mappings.
- Define the reference HA version, native card, device/browser scope, reproducible performance protocol, and baseline evidence needed before implementation. Do not invent measurements or acceptance limits.
- Plan documentation reconciliation so the desk remains the first acceptance case while the library's broader intent and public evidence remain explicit.

### Boundaries and completion

No card implementation, prototype, dependency installation, HA configuration changes, action execution, or physical desk tests are included. Grid editing, recipes, universal device support, final stack selection, distribution, and active promotion remain outside this delivery. License selection remains a separate early open source task.

Completion requires a traceable public reference matrix, a sanitized desk map or explicit access blocker, a versioned frontend contract assessment, a short MVP boundary/flow document, and a validation protocol with baseline status and remaining gates. Unresolved blockers must remain visible; writing these artifacts alone does not complete stage 0 or authorize stage 1. Physical behavior and product performance require later scoped validation.

### Material unknowns and intended sources

- Actual desk capabilities and feedback: relevant HA entity data and the integration's public documentation/source; no assumed memory domain or percentage-to-height conversion.
- Reusable versus device-specific semantics: official cover and other selected domain documentation plus the bounded public case matrix.
- Frontend/editor compatibility and native reference: official contributor documentation and HA frontend source pinned to the selected version.
- Composition/editor precedents: public maintainer documentation and source of selected projects already mentioned in project documentation, with selection rationale and limitations.
- Environment and performance thresholds: selected reference environment, comparable baseline observations where available without new code or physical actions, and a reproducible protocol; missing measurements remain pending.

## Capabilities

### New Capabilities

None. This delivery establishes research evidence and proposed boundaries, not runtime behavior. Change metadata sets `skip_specs: true`.

### Modified Capabilities

None. The current consolidated specification inventory is empty.

## Impact

Planning artifacts live in this change. Execution will reconcile affected portions of README.md and docs/{mvp,architecture,discovery,decisions,roadmap,openspec}.md as evidence warrants, preserving the desk MVP and later roadmap stages. No product code, public API, runtime dependency, or HA installation is changed. Public conclusions must be reproducible without access to the maintainer's private environment; auxiliary research belongs under `~/research/ha-lovelace-extended/discover-desk-and-frontend-contracts/`.
