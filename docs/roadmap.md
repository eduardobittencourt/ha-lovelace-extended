# Incremental roadmap

Product stage 0 is in progress; stages 1–6 are pending. No schedule or implementation is implied. Each stage should produce small, reviewable evidence before the next.

## Process setup — completed

- [x] Initialize OpenSpec with Codex integration.
- [x] Configure context, rules, and a local schema with `research.md` before specs/design.
- [x] Record the discovery questions and methods map.
- [x] Set English as the language of all repository content and future OpenSpec artifacts.

This setup does not complete product research. Stage 0 research is tracked separately below. Follow the [OpenSpec guide](openspec.md) and select relevant questions from the [discovery map](discovery.md). Each change must identify its stage, available evidence, blocking unknowns, required experiments, and exit criteria. Changes may deliver research only, without implementing the card.

## Open source setup — foundation completed

The project is intended to be open source from the outset. This is independent of stage 6 readiness for active promotion.

- [x] Adopt Apache-2.0 for original material and preserve third-party terms in [license notices](../THIRD_PARTY_NOTICES.md).
- [x] Publish the public repository at [eduardobittencourt/ha-lovelace-extended](https://github.com/eduardobittencourt/ha-lovelace-extended), accurately stating its documentation-only status.
- [x] Review contributor-facing instructions and tracked content for publication; keep durable findings understandable without private environment access.
- [x] Add public contribution guidance, conduct/security policies and focused issue/PR templates; verify reporting routes and preserve upstream terms.

Community foundation delivery is tracked in the
[OpenSpec change](../openspec/changes/archive/2026-11-18-establish-open-source-community-files/tasks.md).
Licensing, contribution guidance, conduct/security policies and GitHub templates
are complete in the working tree and await review/publication. Default-branch
publication and releases are separate actions; GitHub templates activate only
when published to that branch. This work does not close the product-stage gates below.

## 0. Specify the real use case and initial boundaries

Archived research evidence (2026-11-15): [discover-desk-and-frontend-contracts](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md). Public comparisons include a command-only MQTT cover and a constructed light-plus-sensor composition. These challenge assumptions without adding implemented devices. The user-selected primary environment is iPhone 14 Pro / Safari / reported iOS 27. The validation protocol is documented, but no target-device baseline or numeric acceptance limit has been measured.

- [ ] Discover the problem and actual desk contract ([D0](discovery.md#d0-problem-discovery-and-the-actual-desk-contract)), distinguishing data inspection from physical tests.
- [ ] Research frontend contracts and the visual reference in the target version ([D1](discovery.md#d1-visual-discovery-and-frontend-contracts)), separating documented APIs from internals.
- [x] Read and verify the desk's entities, attributes, capabilities, and action metadata (read-only; physical execution remains separate).
- [x] Record only the necessary contract, without credentials or private inventories.
- [x] Choose the native card and HA version for the visual reference (Tile / Core 2026.11.1 / frontend 20261028.5; rendered fit pending).
- [ ] Define fixed layout regions and desk editor flows.
- [ ] Define the target version, reference device/browser, and dimensions.
- [ ] Record a baseline and performance acceptance limits before implementation.
- [x] Record sources, versions, hypotheses, and blockers in `research.md`; define baseline protocols and scenarios without inventing measurements.

**Exit:** a short specification that makes MVP criteria verifiable without assumptions about the integration.

## 1. Demonstrate the minimum card contract

In a future implementation task:

- [ ] Bound hypotheses and pass/fail criteria for technical experiments ([D2](discovery.md#d2-baselines-alternatives-and-technical-experiments)); decide only what is needed to run the experiment.
- [ ] Build the smallest surface with two elements bound to different entities.
- [ ] Configure both visually and persist the configuration.
- [ ] Execute an independent action and verify event isolation.
- [ ] Measure updates caused by relevant and unrelated entities.
- [ ] Record stack choice and costs based on the experiment.
- [ ] Update `research.md` and decisions with actual results; scope another change if the approach must change.

**Exit:** evidence that the binding model and editor work at acceptable cost. A free grid or recipe framework is not required.

## 2. Complete the desk MVP

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

## Performance protocol to specify in stage 0

Record the environment, scenario, and method before setting numeric targets. Measure cold/warm loading, JavaScript transfer and execution, control responsiveness, memory after use and mount/unmount cycles, and work caused by unrelated entity updates.

Compare with the native reference and current desk solution where scenarios are equivalent. Separate interface latency, HA communication, and physical device response. Do not attribute all command latency to the library.

Results and limits must accompany the corresponding implementation; no measurements or numeric promises exist yet.
