# Conceptual architecture

This document records directions and hypotheses. It does not define an implemented API, configuration syntax, or settled stack.

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
- HA arranges the card in the dashboard; the internal layout belongs to the library.
- Using native appearance as a reference does not require depending on undocumented internal components.
- Reusing HA components, choosing Lit, build tools, data strategies, and minimum versions require later evaluation.
- No need for a Python integration or additional service has been established at this stage.

### Stage 0 contract findings

The [versioned research](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md#frontend-contract-assessment-task-22) targets Core 2026.11.1 / frontend 20261028.5. Its documented card/editor boundaries include `setConfig`, `hass`, `getConfigForm` or `getConfigElement`, and full configuration events from custom editors. Schema-driven forms are a candidate to investigate before building a custom editor; independent fields and save/reopen behavior still require a code experiment.

The pinned frontend separates state, API, UI and internationalization contexts. Selective updates must still account for locale, theme, configuration and availability changes; tracking only the primary entity is insufficient for this library. Subscriptions need explicit cleanup. Context use is an available approach, not an adopted strategy or demonstrated performance result.

Tile is the selected visual research reference, with bottom controls in Sections. Its source separates inner actions from body actions and checks cover capabilities. The library must demonstrate its own event isolation and touch/keyboard behavior. `getGridOptions` and masonry `getCardSize` describe different layout contracts; Tile's size is not proof that the additional actions fit.

Direct reuse of `ha-*` / `hui-*` elements and internal action helpers remains version-coupled even when the native source is useful as a reference. Documented form schemas do not make every internal selector element a stable API. No production dependency, serialization format, minimum HA version, or stack is settled by this research.

## Performance

Hypotheses to validate in the technical experiment:

- Prepare structure and bindings when configuration changes, avoiding that work on every received state update.
- Update only affected elements while also considering relevant language, theme, and context changes.
- Avoid duplicate subscriptions and requests; release resources when removing the card.
- Separate editor loading from everyday use.
- Load specialized resources when needed and avoid work for hidden content.
- Keep local interactions responsive and control command frequency where applicable.

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
