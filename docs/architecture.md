# Conceptual architecture

This document records directions and hypotheses. The [bounded experimental source](../experiments/minimum-card-contract/README.md) and [synthetic complete-composition candidate](../candidates/fixed-composition-card/README.md) do not define a public API, stable configuration syntax or settled production stack.

## System parts

1. **Surface and layout:** card presentation and element arrangement. A fixed composition for the MVP; later, an internal grid with size and accessibility constraints.
2. **Elements:** icon, text, indicator, progress, slider, button, switch, and selection, added as each stage needs them.
3. **Bindings and behaviors:** state/attribute reading, value conversion, and action execution. These can involve different entities.
4. **Editor:** visual configuration of available capabilities and validation before persistence.
5. **Future recipes:** ready-made compositions using the same elements and behaviors.

These parts can be internal modules. Separate packages or a Web Component for every text fragment are not required.

## Binding model

The primary entity is a convenience for inheriting defaults, not a restriction for the entire card. Elements have stable identities and can override relevant bindings.

Separate these concepts:

- Displayed information: state, attribute, fixed text, or a value derived by a supported behavior.
- Interaction: executed action and its parameters/targets.
- Availability: conditions needed to show information and enable actions.
- Temporary state: a local selection or edit that has not yet been sent to HA.

Not every element needs all four capabilities. The MVP implements only contracts needed for the desk; future room selection will require temporary state and translation into integration-specific commands.

A reusable visual element does not solve domain semantics by itself: brightness, speed, and temperature may share a slider but require different scales and commands. Supported controls should include that translation to avoid repeated logic in every recipe.

## HA integration

- Agreed direction: Web Components using the custom card and editing contracts available in the target version.
- HA allocates dashboard space: Sections uses `getGridOptions` for grid sizing/resize limits, while Masonry uses `getCardSize` as a height estimate. The library arranges its internal content responsively within that allocated space; neither hook proves content fit.
- Using native appearance as a reference does not require depending on undocumented internal components.
- Reusing HA components, choosing Lit, build tools, data strategies, and minimum versions require later evaluation.
- No need for a Python integration or additional service has been established at this stage.

### Stage 0 contract findings

The [versioned research](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md#frontend-contract-assessment-task-22) targets Core 2026.11.1 / frontend 20261028.5. Its documented card/editor boundaries include `setConfig`, `hass`, `getConfigForm` or `getConfigElement`, and full configuration events from custom editors. The [stage 1 experiment](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md) has demonstrated schema-driven forms and independent flat-field save/reload/reopen on the pinned isolated release. Nested/general bindings and public configuration stability remain unproven.

The pinned frontend separates state, API, UI and internationalization contexts. Selective updates must still account for locale, theme, configuration and availability changes; tracking only the primary entity is insufficient for this library. Subscriptions need explicit cleanup. Context use is an available approach, not an adopted strategy or demonstrated performance result.

Tile is the selected visual research reference, with bottom controls in Sections. Its source separates inner actions from body actions and checks cover capabilities. The two-slot experiment has demonstrated local action isolation and recorded Chromium keyboard/emulated-touch behavior; complete desk and actual-device validation remain open. `getGridOptions` and masonry `getCardSize` describe different layout contracts; Tile's size is not proof that the additional actions fit.

Direct reuse of `ha-*` / `hui-*` elements and internal action helpers remains version-coupled even when the native source is useful as a reference. Documented form schemas do not make every internal selector element a stable API. No production dependency, serialization format, minimum HA version, or stack is settled by this research.

### Allocation, composition and test conditions

The MVP fixes semantic regions and supported controls, not a phone viewport or immutable pixel positions. Internal placement may adapt to available card width while preserving information, action independence and usable controls. The later free grid concerns user-defined composition; it is not required for this adaptation.

Validate concrete narrow/intermediate/wide allocations in Sections and Masonry, long labels, enlarged text, focus order, touch reachability and accessible names before accepting tested layout coverage. Establish minimum allocations from usable content rather than copying Tile's footprint. Complete the full desk composition and remaining device/accessibility checks before MVP acceptance.

The iPhone reference is one test environment. Pin versions and record actual widths for each experiment; other recorded environments can start discovery, without establishing Safari or universal compatibility. Follow the [roadmap gates](roadmap.md#performance-protocol-define-before-execution-measure-during-the-experiment). Native visual alignment does not select a private-component dependency or production stack.

## Performance

The complete candidate separates flat configuration, source resolution, cover
capabilities, typed local descriptors, position transitions and pinned HA UI/form
adapters. It uses a stable native custom-element DOM and ordinary `hass` delivery,
with no per-card polling/subscription. Native buttons/range input and an explicit
generation/token guard implement release/Enter-only commits and cancellation.
This is a functional candidate baseline, with actual HA form/persistence and
Chromium role/layout evidence; it is not a cost-based production renderer choice.
The original two-slot source and dependency locks remain unchanged. A future
real-transport adapter requires separate scope and current-installation checks.

The two-slot experiment uses native JavaScript and ordinary `hass` delivery with
selective DOM patches. Synthetic correctness and lifecycle checks have passed;
comparative costs and fresh verification are reported, with overall performance
acceptance withheld in its research record. This is not production adoption.

Hypotheses to validate in the technical experiment:

- Prepare structure and bindings when configuration changes, avoiding that work on every received state update.
- Update only affected elements while also considering relevant language, theme, and context changes.
- Avoid duplicate subscriptions and requests; release resources when removing the card.
- Separate editor loading from everyday use.
- Load specialized resources when needed and avoid work for hidden content.
- Keep local interactions responsive and control command frequency where applicable.

Define comparable capture methods before execution and gather native/experimental samples during the experiment. Justify budgets and pass them before claiming acceptable performance or choosing a production approach based on cost.

Measure cost against element and binding count. A generic engine can also introduce overhead; its value depends on implementation and evidence.

## Recipes and evolution

Recipes will define elements, layout, bindings, and defaults. Both recipes and custom compositions must use the same contracts.

Copying a recipe into an independent composition versus keeping a versioned link with local overrides remains undecided. The earlier suggestion of versioned linkage is a hypothesis, not an accepted decision. Evaluation must include migrations, identifier changes, conflicts, and behavior after element removal.

## References for later investigation

- [HA custom cards](https://contributors.home-assistant.io/frontend/custom-ui/card/)
- [Card editor and picker](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/)
- [Custom card features](https://contributors.home-assistant.io/frontend/custom-ui/card-feature/)
- [Tile](https://www.home-assistant.io/dashboards/tile/) and [Sections](https://www.home-assistant.io/dashboards/sections/)
- [Button Card](https://github.com/custom-cards/button-card), an inspiration for composition flexibility.

Verify contracts against the chosen HA version before implementation. Mushroom, UI Lovelace Minimalist, and Bubble Card informed the product discussion; this documentation does not depend on permanent feature comparisons.
