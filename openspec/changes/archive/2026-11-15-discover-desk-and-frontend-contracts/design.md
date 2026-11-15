# Design

## Context

See [proposal.md](proposal.md) for motivation and scope. [Research E1–E5](research.md#evidence) establishes the documentation-only state, current desk MVP, broader product intent, and requirement for public references. The investigation below was planned around unresolved integration/frontend questions; executed E6–E12 findings now identify the answered questions and remaining gates. This design records the research method, not the production architecture.

## Goals / Non-Goals

**Goals:** Make research traceable, expose where a personal example could distort reusable contracts, and distinguish an actionable next experiment from an unsupported implementation decision.

**Non-Goals:** Select a generic runtime engine, settle configuration syntax, or validate additional integrations by documentation alone. Comparative cases are not extra product deliveries.

## Decisions

### 1. Use a small contrasting sample, anchored in public contracts

Use the desk, one non-desk cover, and one non-cover multi-entity composition as specified in research R1. For each, record roles, data, actions, availability, feedback, and uncertainties. Classify each need as reusable presentation/binding, domain behavior, or installation mapping. Explicitly identify which mappings are illustrative and which observations come from a real integration.

This implements the requirement in E4 while retaining the narrow first example in E2. An installation-only study cannot challenge accidental assumptions; a broad device survey would pull later roadmap work into stage 0. Three contrasting cases offer a bounded starting point, without claiming representative coverage. Add a case only to answer a specific remaining blocking question.

### 2. Separate source authority from observation

For each finding, record source URL/path, access date, target version/revision, method, observation, limitation, and decision supported. Official docs establish documented contracts; versioned source establishes observed implementation; project examples establish precedents; private data establishes only that example's current state. None of these alone proves physical behavior or performance.

Research R2 will produce a contract table with columns for required interaction, official contract, implementation evidence, stability classification, cost/risk, and unresolved test. Prefer documented extension points when sufficient, but do not select dependencies before that assessment. Copying a native card's private structure or adopting another custom card's internals now would prematurely turn a reference into an architecture choice.

### 3. Derive flows before proposing production mechanisms

After R1/R2 findings, describe fixed card regions and editor steps for initial creation, independent source/action selection, validation, save/reopen, and correction. Include missing/unavailable entities, errors, keyboard/focus/touch behavior, and separation between inner and body actions. Explain the meaning of each domain control before considering a shared visual element.

Record configuration/lifecycle, update invalidation (including theme/language), editor loading, event isolation, and sizing as questions with evidence and future experiment gates. E3 is intent rather than proof; a component hierarchy or serialization format chosen now would overstate the evidence. A research target version is distinct from a minimum supported version.

### 4. Treat performance methodology and results as separate deliverables

R3 defines repeatable workloads, environment metadata, repetitions, summaries, and comparable native/current-solution baselines. Record cold/warm load, transfer/execution, UI response, relevant/unrelated updates, memory/lifecycle, and editor cost separately. Explain mismatches between comparison surfaces instead of treating unlike workloads as equivalent.

Read-only existing-surface observations are allowed during research execution when available without new code, configuration changes, or actions. Missing baseline access leaves thresholds open. Runtime costs and binding/editor correctness belong to the later R4 experiment; physical latency belongs to separately scoped physical validation. Alternatives rejected: inventing numeric targets now, treating a source review as a benchmark, or moving the desk merely to gather a baseline.

### 5. Make public conclusions independent of private access

Keep durable evidence and role-based examples in research.md and affected English project docs. Store auxiliary captures and reference checkouts under the project research directory, with no private inventories or credentials. If private access is unavailable, continue independent public research and mark desk-dependent conclusions blocked rather than substitute a fictional contract.

Research completion and stage 0 readiness get separate assessments. A limited report may document an access blocker, but it must not mark dependent roadmap items complete. This avoids both requiring private access for every contributor and claiming the real MVP contract has been verified when it has not.

### 6. Reconcile documentation only after findings

During execution, update README.md and docs/mvp.md, architecture.md, discovery.md, decisions.md, roadmap.md, and openspec.md where findings or workflow status require it. Preserve the desk as the initial acceptance example, the library as the broader goal, and stages 3–6 as future work. Keep stage 0 boxes pending until their specific evidence exists. Record licensing as a separate outstanding early task.

No runtime specs are created (`skip_specs: true`); consolidating proposed behavior into main specs would imply a contract this research has not delivered. No deployment or runtime migration exists. Documentation changes remain reviewable and reversible through the repository diff.

### Execution reconciliation

The user selected iPhone 14 Pro / Safari / reported iOS 27 and explicitly kept lock/unlock in existing HA controls. These decisions do not expand the card with automatic unlocking or new lock controls. Research selected Tile / Core 2026.11.1 / frontend 20261028.5 as source references; actual rendered sizing, target-device measurements and numeric budgets remain open. See research.md Outcome for the distinction between completing this research delivery and satisfying stage 0 exit criteria.

## Risks / Trade-offs

- **Small sample misses integration differences** → Publish selection rationale and limits; defer broader validation to the corresponding reuse/device stages.
- **Desk-specific semantics leak into reusable controls** → Require the three-layer classification and a contrasting public case before proposing a shared contract.
- **A constructed example is mistaken for demand or tested support** → Label its provenance and validation level in the reference matrix.
- **Private access blocks desk details** → Continue public investigations, report the blocker, and leave dependent stage exits pending.
- **Public docs drift or hide private dependencies** → Record access dates and matching frontend revisions; classify each API claim and recheck before implementation.
- **A research plan is mistaken for completed research** → Keep tasks unchecked, findings separate from hypotheses, and baseline/threshold status explicit.
- **Public generality expands the MVP** → Use comparative cases for contract review only; retain the fixed desk implementation as a later bounded milestone.
