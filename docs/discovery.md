# Research and discovery

This document maps questions and methods; it is not a report of completed research. Product stages are in the [roadmap](roadmap.md), and the per-change workflow is in the [OpenSpec guide](openspec.md).

The archived [stage 0 research](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md) records actual evidence separately. The desk is the first acceptance example, not the final library objective. Public contracts and contrasting examples must challenge installation-specific assumptions before they become shared behavior.

## Working with evidence

Before a decision, identify the question, what depends on it, and sufficient evidence to answer it. Look for relevant earlier material in `~/research/ha-lovelace-extended/` and recheck historical conclusions against the current source.

Each material conclusion needs its source, date/version, method, observation, limitations, and consequence. Distinguish observed facts, hypotheses to test, and pending questions. Official documentation describes a contract; source inspection reveals an implementation; experiments demonstrate only the scenarios executed. A mock does not establish physical behavior.

Use the change's `research.md` to maintain this record. Public sources should have links and versions/commits where needed. Raw evidence, reference clones, and investigation scripts belong in `~/research/ha-lovelace-extended/<task>/`. Durable sanitized conclusions belong in the repository, in English; do not depend exclusively on local paths unavailable to other contributors.

## D0. Problem discovery and the actual desk contract

**Before:** specifying integration-dependent behavior and completing the MVP.

- Identify actual flows: check position, move the desk, and trigger each memory; verify which controls exist.
- Read relevant entities, capabilities, attributes, units, and actions. Assume neither memory domains nor a conversion from percentage position to physical height without evidence.
- Understand how the integration confirms receipt, movement, and arrival, if it provides that information.
- Record use dimensions and what makes the current solution insufficient.
- Compare the sanitized desk map with a publicly documented non-desk cover and an explicitly sourced non-cover composition. Separate reusable bindings, domain semantics, and installation mappings; label constructed examples and avoid treating documentation review as tested compatibility.

**Exit evidence:** a sanitized role/data/action map, known limitations, and acceptance scenarios. Physical observation is separate from reading data and requires corresponding task scope.

The [desk scope/acceptance synthesis](mvp.md#acceptance-criteria) and [coverage review](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#r2-acceptance-coverage-review), completed on 2026-11-19, meet the stage 0 definition exit: all eleven criteria have prospective scenarios and no material synthesis blocker remains. Historical observations are not a current-installation check. Reverify actual capabilities during implementation validation; execute full-desk scenarios, including external lock and physical/everyday observations, only in separately scoped stage 2 work.

## D1. Visual discovery and frontend contracts

**Before:** choosing a visual reference and the contracts needed for an experiment; recheck version applicability before execution and dependency suitability before production adoption.

- Check the candidate native card in the selected version: regions, states, actions, dimensions, and editor/Sections behavior.
- Consult official documentation and relevant code for card, editor, selector, action, and sizing contracts.
- Identify documented APIs, internal components, and their compatibility risks. Native appearance does not require coupling to private DOM structure.
- Pin frontend implementation observations to the revision bundled by the selected Core release. Evaluate public custom-card precedents for specific questions, without treating their internals as HA extension contracts or adopting their code.
- Evaluate visual editing of independent sources and actions, including errors and unavailability.
- Define a reproducible experimental browser, language, theme and environment without assuming universal support. Treat devices as test conditions; distinguish HA dashboard allocation from internal content adaptation. Select concrete container widths before execution.

**Exit evidence:** a versioned visual reference, editor flows, usable contracts, and technical questions requiring experiments.

## D2. Baselines, alternatives, and technical experiments

**Before:** assuming a final stack or acceptable performance. The experiment gathers evidence for those decisions; its entry does not depend on an existing phone baseline.

- Before execution, define bounded questions, versioned contracts, reproducible conditions, safe fixtures, functional/layout pass/fail checks and a measurement plan. Scope code, dependencies and environment changes explicitly.
- During the experiment, measure comparable native/experimental scenarios and the current solution where available and equivalent; separate cold/warm loading and UI/transport/physical latency.
- Justify numerical budgets from measurements and requirements before accepting performance or making a cost-dependent production choice. Missing samples remain open; one device is not a prerequisite for starting.
- Check Sections/Masonry allocation and internal fit across recorded narrow/intermediate/wide card widths, long labels and enlarged text; record accessibility observations and coverage limits.
- Compare minimal Web Components and relevant alternatives such as Lit without treating comparison as adoption.
- Demonstrate two-entity binding, selective updates, lifecycle behavior, and event isolation; check theme and language changes too.
- Verify separate editor loading and saved/reopened configuration. Measure cost as element/card count grows.

**Exit evidence:** demonstrated correctness/layout coverage, comparable results, limitations and a decision to proceed, adjust or discard the approach. Acceptable-performance claims and production choices require justified budgets and passing results. A limited or negative feasibility report does not satisfy the stage 1 exit.

An experiment needing code must be an explicitly bounded experimental change. Success does not automatically make its prototype production code.

The archived [minimum-card experiment](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md) records actual two-slot binding/editor persistence, intercepted actions, selective updates/lifecycle and Chromium layout coverage. Its performance gate remains open. These findings are supporting evidence only; the separate D0 synthesis supplies scope completeness, while desk acceptance and untested device/assistive-technology support remain unproven.

The current [stage 1 follow-up](../experiments/minimum-card-contract/performance-followup/discovery.md) publishes repeated whole-dashboard/control observations, released-object diagnostics and browser-clock DOM-content milestones. Signed contrasts are descriptive; global heap and frame opportunities do not establish isolated retained-byte budgets or final presentation. The [subsequent verification review](../experiments/minimum-card-contract/performance-followup/review.md) records four explicitly approved limits: three passed and cold readiness failed; six other required rows remain pending. These findings keep D2/stage 1 open and do not change stage 0's completed definition or stage 2's separate device/physical gates.

The [D2 diagnostics](../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md) prioritize measuring shared pre-mount and post-frame variance. The pinned runtime's snapshot traversal failed conditional ownership calibration and headless captures provided no validated identity join from changed pixels to presentation feedback. The [current matrix](../experiments/minimum-card-contract/performance-diagnostics/budget-matrix.json) records prerequisites and measurement proposals.

The [consolidated decision record](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#ten-row-decision-record--2026-11-19) reconciles all ten metric IDs and their approvals. Its [budget requirements](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#cpu-transfer-and-update-budget-requirements) identify missing device/workload, bandwidth and responsiveness objectives; the [D3 handoff](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#d3-scenario-handoff) preserves all full-desk results as pending. Four bounded passes and a fresh cold pass do not resolve the two historical cold failures or five pending requirements. D2/stage 1 stays open.

## D3. Experience and integration validation

**Before:** declaring the MVP complete.

- Validate editor flows from empty configuration through editing after reload.
- Exercise synthetic error, missing entity, unavailability, and reconnection scenarios without disrupting production HA merely to test them.
- Plan physical testing of actual desk commands separately and record observations.
- Check touch, keyboard, focus, accessible names, selected themes, and sizes.
- Observe everyday use and repeat the relevant performance protocol on the final result.

**Exit evidence:** demonstrated MVP criteria, known discrepancies, and user acceptance of the replacement.

## D4. Reuse and composition discovery

**Before:** consolidating public contracts and developing the grid/recipes.

- Verify actual needs for a light and another multi-entity composition.
- Identify common building blocks and domain behaviors instead of generalizing from the desk alone.
- Experiment with grid rules, minimum size, adaptation, and editing flows against concrete usability problems.
- Compare copied and linked/versioned recipes, including customization, conflicts, and migrations.

**Exit evidence:** demonstrated abstraction boundaries and a composition/recipe choice supported by scenarios.

## D5. Composite device discovery

**Before:** each specialized experience.

- Investigate one case at a time: printing, washing, or cleaning multiple rooms.
- Verify capabilities and differences in the integrations actually selected.
- Demonstrate temporary state and command translation when needed; check media/history costs in the chosen scenario.

**Exit evidence:** a bounded contract and support scope for each case, without claiming generic compatibility from a single integration.

## D6. Coverage and maintenance discovery

**Before:** active promotion.

- Inventory only the experiences needed for the complete reference dashboard and identify gaps.
- Validate updates, migration, and prolonged use on selected versions/devices.
- Revisit distribution and documentation for the intended audience and maintenance scope. Licensing and initial public publication belong to the earlier open source setup milestone.

**Exit evidence:** demonstrated coverage and public support boundaries.

## Proceeding criteria

A question is blocking when its answer could change the next delivery's scope, contract, architecture, or acceptance criteria. Resolve it before that delivery or scope a research change to answer it. Deferrable questions need justification and a milestone for revisiting them.

An experiment can investigate unresolved feasibility questions when its scope, safe execution and evidence plan are defined. It cannot use those unknowns as settled contracts. Before MVP completion, finish desk-specific fit, device/accessibility, integration, separately scoped physical/everyday validation and final performance checks. Wider support requires evidence for the claimed scope.

Not every change needs to investigate the entire map. When existing evidence is sufficient, cite it and explain its applicability. When research refutes a hypothesis, update affected proposal, design, and tasks before proceeding.
