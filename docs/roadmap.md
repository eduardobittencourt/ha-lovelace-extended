# Incremental roadmap

Product stage 0 is complete as a documented scope/acceptance synthesis; stage 1 is in progress and stages 2–6 are pending. Stage 1 has a bounded experimental prototype; no production implementation or schedule is implied. Each stage should produce small, reviewable evidence before the next.

## Process setup — completed

- [x] Initialize OpenSpec with Codex integration.
- [x] Configure context, rules, and a local schema with `research.md` before specs/design.
- [x] Record the discovery questions and methods map.
- [x] Set English as the language of all repository content and future OpenSpec artifacts.

This setup does not complete product research. Stage 0 research is tracked separately below. Follow the [OpenSpec guide](openspec.md) and select relevant questions from the [discovery map](discovery.md). Each change must identify its stage, available evidence, blocking unknowns, required experiments, and exit criteria. Changes may deliver research only, without implementing the card.

## Open source setup — foundation completed

The project is intended to be open source from the outset. This is independent of stage 6 readiness for active promotion.

- [x] Adopt Apache-2.0 for original material and preserve third-party terms in [license notices](../THIRD_PARTY_NOTICES.md).
- [x] Publish the public repository at [eduardobittencourt/ha-lovelace-extended](https://github.com/eduardobittencourt/ha-lovelace-extended), accurately stating its then-documentation-only status.
- [x] Review contributor-facing instructions and tracked content for publication; keep durable findings understandable without private environment access.
- [x] Add public contribution guidance, conduct/security policies and focused issue/PR templates; verify reporting routes and preserve upstream terms.

Community foundation delivery is tracked in the
[OpenSpec change](../openspec/changes/archive/2026-11-18-establish-open-source-community-files/tasks.md).
Licensing, contribution guidance, conduct/security policies and GitHub templates
are complete in the working tree and await review/publication. Default-branch
publication and releases are separate actions; GitHub templates activate only
when published to that branch. This work does not close the product-stage gates below.

## 0. Specify the real use case and initial boundaries

Archived research evidence (2026-11-15): [discover-desk-and-frontend-contracts](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md). Public comparisons include a command-only MQTT cover and a constructed light-plus-sensor composition. These challenge assumptions without adding implemented devices. The previously selected iPhone 14 Pro / Safari / reported iOS 27 remains a useful validation environment; its exact build and usable viewport are unobserved. No target-device baseline, numeric acceptance limit or rendered fit has been measured.

The current sequence separates preparation from experimental evidence. It supersedes the archive's proposal to require phone baselines before the first experiment; historical observations and limitations remain valid. A reference device is neither a required development host nor an exclusive supported device.

- [x] Complete the short scope/acceptance specification from problem discovery and the actual desk contract ([D0](discovery.md#d0-problem-discovery-and-the-actual-desk-contract)), distinguishing read-only findings from later physical tests.
- [x] Research frontend contracts and select a versioned visual reference ([D1](discovery.md#d1-visual-discovery-and-frontend-contracts)); source findings do not prove runtime compatibility.
- [x] Read and verify the desk's entities, attributes, capabilities, and action metadata (read-only; physical execution remains separate).
- [x] Record only the necessary contract, without credentials or private inventories.
- [x] Choose the native visual research reference (Tile / Core 2026.11.1 / frontend 20261028.5; rendered fit pending).
- [x] Document candidate fixed semantic regions and desk editor flows in the [MVP](mvp.md#candidate-layout-and-editor-flows); validate their fit and persistence in stages 1–2.
- [x] Define the layout starting point: HA allocates dashboard space through Sections/Masonry contracts; the card adapts internally to that space. Concrete experimental allocations and environments are selected before stage 1 execution.
- [x] Record sources, versions, hypotheses and measurement methods without inventing baseline samples or numerical limits.

**Exit:** a short specification that makes MVP criteria verifiable without assumptions about the integration. Met on 2026-11-19 by the [desk acceptance reference](mvp.md#acceptance-criteria) and its [coverage review](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#r2-acceptance-coverage-review): dated roles/actions, all eleven criteria mapped and no material synthesis blocker. This closes definition only; all full-desk scenario results remain pending. Stage 1 performance and stage 2 desk/device/physical/everyday gates remain open.

## 1. Demonstrate the minimum card contract

The archived [demonstrate-minimum-card-contract experiment](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md) executes the separately scoped [bounded brief](../openspec/changes/archive/2026-11-18-align-roadmap-with-native-ha-layout/research.md#brief-for-a-subsequent-bounded-experiment). Its [source and reproduction guide](../experiments/minimum-card-contract/README.md) are experimental. Binding/editor correctness and recorded Chromium layout coverage are demonstrated. Comparative measurements, a negative technical budget review and fresh verification are published; performance acceptance remains open because candidate limits are unapproved and evidence limitations remain. This experiment alone does not establish desk scope completeness or complete the desk MVP; the separate stage 0 synthesis above supplies the scope definition.

The separate [performance handoff](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#stage-1-performance-handoff) records the requirement agreement, shared-cost attribution, retained cold outlier and heap/paint limitations still to resolve. This documentation synthesis approves no budget and performs no fresh acceptance measurements.

The [performance follow-up review](../experiments/minimum-card-contract/performance-followup/review.md) adds repeated controls and method diagnostics, then records explicit partial numerical agreement and fresh verification without changing the subject. Three approved metric rows passed; experimental ten-group cold readiness measured 1104.80 ms against the agreed 1000 ms maximum and failed. Six required rows remain pending, including retained-byte attribution and final presentation. No row was waived, the historical 1108.60 ms observation is retained, and stage 1 remains open.

The [stage 1 diagnosis](../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md) observed shared cold variance, including an empty control above 1000 ms. The [later verification](../experiments/minimum-card-contract/performance-diagnostics/verification-result.json) passed four approved rows in that run. The separate editor campaign evaluated its two approved limits. Both historical cold failures remain valid; five pending rows and unresolved cold variance keep this stage open.

**Entry:** document bounded questions, versioned contracts, a reproducible test environment, safe fixtures, functional/layout pass/fail checks and a measurement plan before execution. Select only the experimental mechanisms needed to investigate the questions. Neither access to a particular phone nor an existing numerical baseline is required. Experimental code, dependencies and test-environment changes require their own proposal and scope.

- [x] Bound hypotheses and checks for technical experiments ([D2](discovery.md#d2-baselines-alternatives-and-technical-experiments)); pin HA/frontend, browser, tools, theme/locale and concrete narrow/intermediate/wide card allocations before running.
- [x] Build the smallest surface with two elements bound to different entities.
- [x] Configure both visually in HA; save, reload, reopen and change one binding without losing the other.
- [x] Execute an independent inner action once and verify isolation from the card body action using safe intercepted dispatch.
- [x] Measure relevant/unrelated update work, editor loading and mount/unmount cleanup; check invalid/missing/unavailable states and theme/locale changes.
- [x] Validate Sections and Masonry allocations, long labels, enlarged text, keyboard focus, touch reachability and accessible names; record failures and tested coverage.
- [x] Collect comparable native/experimental performance samples using the protocol below; compare the current desk solution only where workloads match and it is available.
- [ ] Justify numerical budgets from evidence and requirements, then evaluate results against them before accepting performance or a cost-dependent production stack choice.
- [x] Update research and decisions with actual results, costs and limitations; scope another change if the approach must change.

**Exit:** demonstrated binding/editor correctness, layout coverage and measured costs with justified acceptance budgets met. Limited or negative feasibility findings are valid experimental outcomes, but do not close this exit or prove acceptable performance. Missing measurements remain pending. A free grid or recipe framework is not required; a prototype does not become production code automatically.

The [consolidated ten-row decision record](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#ten-row-decision-record--2026-11-19) reconciles four bounded passes, the fresh cold pass with two unresolved historical failures, and five pending requirements. Its [exit disposition and desk handoff](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#stage-1-exit-disposition-and-stage-2-handoff) keeps stage 1 open and identifies the requirements, calibration and verification needed per row. The maintainer requests evidence-backed CPU, transfer and update limits, with other component-library benchmarks as a possible input and usability as the objective; no numerical limits or benchmark campaigns are approved by this review.

## 2. Complete the desk MVP

Use the [D3 scenario handoff](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#d3-scenario-handoff) for separately scoped preparation; all full-desk results and final PERF repeats remain pending.

- [ ] Prepare validation scenarios and evidence for experience/integration ([D3](discovery.md#d3-experience-and-integration-validation)), separating synthetic and physical tests.
- [ ] Deliver the fixed composition, controls, and three memory actions.
- [ ] Complete visual creation and editing flows.
- [ ] Validate errors, unavailability, reconnection, and persistence.
- [ ] Check touch, keyboard, focus, selected sizes, and themes.
- [ ] Perform planned physical validation with the user, accounting for actual desk movement.
- [ ] Demonstrate all [acceptance criteria](mvp.md#acceptance-criteria).

**Exit:** a card that replaces the current desk solution in the personal dashboard.

## 3. Validate reuse in simple experiences

- [ ] Investigate actual needs in other cases before generalizing contracts ([D4](discovery.md#d4-reuse-and-composition-discovery)).
- [ ] Apply the same pieces to a light and another multi-entity composition.
- [ ] Identify visual elements, bindings, and domain behaviors.
- [ ] Extend only necessary building blocks and repeat performance measurement.
- [ ] Evaluate configuration stability and updates between library versions.

**Exit:** evidence that the model serves more than one device without accumulating device-specific exceptions in the core.

## 4. Introduce free composition and recipes

- [ ] Experiment with usability/grid constraints and compare recipe models before settling public APIs ([D4](discovery.md#d4-reuse-and-composition-discovery)).
- [ ] Define public element contracts and internal grid constraints.
- [ ] Allow visual addition, removal, movement, and resizing of elements.
- [ ] Define adaptation to available space.
- [ ] Implement recipes using the same contracts as custom compositions.
- [ ] Decide and validate copied versus linked/versioned recipes.

**Exit:** usable composition freedom without YAML, with consistent visuals and controlled cost.

## 5. Support composite experiences

- [ ] Perform device/integration-specific discovery ([D5](discovery.md#d5-composite-device-discovery)) with evidence for claimed capabilities and limits.
- [ ] Select one case at a time: a 3D printer, a vacuum with multiple-room selection, or a washing machine.
- [ ] Map capabilities and integration differences without inventing unavailable information.
- [ ] Add temporary state, behaviors, or adapters only when needed.
- [ ] Handle costly resources such as cameras/history with explicit loading and lifecycle behavior.

**Exit:** a complete validated experience per case, with reusable pieces and documented support boundaries.

## 6. Reach readiness for active promotion

- [ ] Research gaps and validate coverage/maintenance in the reference dashboard ([D6](discovery.md#d6-coverage-and-maintenance-discovery)).
- [ ] Define the complete reference dashboard and coverage matrix.
- [ ] Cover navigation, information, everyday controls, details, and error states.
- [ ] Validate prolonged use on selected phones, tablets, and desktops.
- [ ] Define and exercise compatibility, migration, and configuration recovery.
- [ ] Document installation, usage, limitations, and updates.
- [ ] Confirm the distribution channel; verify that early open source licensing/publication tasks are complete.

**Exit:** evidence of replacing a complete dashboard with consistent quality. Only then start active promotion.

## Performance protocol: define before execution, measure during the experiment

Define scenarios and methods during preparation; pin the actual environment and capture tools before experimental execution. Collect samples alongside the experiment, then justify numerical budgets before accepting performance. Measure cold/warm loading, JavaScript transfer and execution, control responsiveness, memory after use and mount/unmount cycles, and work caused by unrelated entity updates.

Compare with the native reference in equivalent scenarios, and the current desk solution where available and equivalent. Separate interface latency, HA communication, and physical device response. Do not attribute all command latency to the library.

| Outstanding evidence | Destination and acceptance gate |
| --- | --- |
| Exact device/browser metadata and rendered dimensions | Record each stage 1 capture environment and allocated card widths; complete desk-specific fit and remaining reference-device checks before stage 2 exit. A desktop sample does not establish Safari behavior. |
| Comparable baselines and numerical limits | Collect native/experimental samples in stage 1; justify and meet budgets before performance approval or a cost-dependent production choice. Repeat the relevant protocol on the final MVP. |
| Full desk composition, accessibility and integration behavior | Stage 2: validate all MVP criteria, with separately scoped physical commands and everyday user acceptance. |
| Wider compatibility and dashboard coverage | Validate claimed versions/devices at the relevant later stages; complete stage 6 coverage before active promotion. |

Results and limits must accompany the corresponding implementation; no measurements or numeric promises exist yet.
