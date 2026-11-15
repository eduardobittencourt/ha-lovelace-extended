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

## D1. Visual discovery and frontend contracts

**Before:** choosing a reference, dependencies, and the initial architecture.

- Check the candidate native card in the selected version: regions, states, actions, dimensions, and editor/Sections behavior.
- Consult official documentation and relevant code for card, editor, selector, action, and sizing contracts.
- Identify documented APIs, internal components, and their compatibility risks. Native appearance does not require coupling to private DOM structure.
- Pin frontend implementation observations to the revision bundled by the selected Core release. Evaluate public custom-card precedents for specific questions, without treating their internals as HA extension contracts or adopting their code.
- Evaluate visual editing of independent sources and actions, including errors and unavailability.
- Define the initial browser, language, theme, and device scope without assuming universal support.

**Exit evidence:** a versioned visual reference, editor flows, usable contracts, and technical questions requiring experiments.

## D2. Baselines, alternatives, and technical experiments

**Before:** assuming a final stack and feasible performance.

- Define comparable scenarios and measure the native reference and current solution where relevant; separate cold/warm loading and local/remote/physical latency.
- Set acceptance criteria from target devices and measurements using a reproducible method.
- Compare minimal Web Components and relevant alternatives such as Lit without treating comparison as adoption.
- Demonstrate two-entity binding, selective updates, lifecycle behavior, and event isolation; check theme and language changes too.
- Verify separate editor loading and saved/reopened configuration. Measure cost as element/card count grows.

**Exit evidence:** results, limitations, a justified choice, and a decision to proceed, adjust, or discard the approach.

An experiment needing code must be an explicitly bounded experimental change. Success does not automatically make its prototype production code.

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

Not every change needs to investigate the entire map. When existing evidence is sufficient, cite it and explain its applicability. When research refutes a hypothesis, update affected proposal, design, and tasks before proceeding.
