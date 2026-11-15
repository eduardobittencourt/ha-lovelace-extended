# Decisions and open questions

This initial record comes from the product discussion. “Agreed” identifies directions expressed by the user; “proposed” identifies choices still needing validation.

## Agreed

| Decision | Consequence |
| Project name: Lovelace Extended; repository: `ha-lovelace-extended` | Native-style Home Assistant cards with independent entity bindings and visual configuration |
| --- | --- |
| Performance is the number one priority | Capabilities and dependencies must justify their cost |
| Web Components are the technical direction | Avoid additional layers without demonstrated benefit |
| A card can combine several entities | Data source and action must be able to vary per element |
| Flexible content and control within a bounded style | Visual language and interaction patterns belong to the library |
| Visual configuration is central | Official capabilities must not require manual YAML editing |
| MVP layout close to a standard HA card | Defer free composition to reduce initial scope |
| The desk and its three memories are the first real problem | Initial acceptance depends on this complete experience |
| Future elements and recipes | Ready-made and custom experiences share building blocks |
| Active promotion follows readiness for complete dashboards | Completing the personal MVP does not trigger promotion |
| Current work is documentation and process setup | No product implementation, dependency installation, or HA changes in these tasks |
| OpenSpec is adopted for SDD at the user's request | Changes must consider research, discovery, and tests before assuming contracts |
| The project is intended to be open source from the outset | Early public development is distinct from later active promotion; selecting a license is still pending |
| Public repository: `eduardobittencourt/ha-lovelace-extended` | Initial product documentation and OpenSpec setup are published on GitHub |
| All project content is in English | Documents, specs, examples, code, comments, commit messages, and default product text follow this policy; conversations may remain in Portuguese |

## Proposed, subject to adjustment

- A primary entity supplies defaults, with per-element overrides.
- MVP fixed composition with designated regions for additional actions.
- Conceptual separation of surface, elements, bindings, editor, and recipes.
- Incremental roadmap with exit criteria and no fixed schedule.
- Initial setup: OpenSpec 1.14.3, Codex/core, and the local `research-first` schema derived from `spec-driven`. This is an implemented process choice, not a decision about the card's stack.

## Resolve before implementing the MVP

1. Which native card and HA version will serve as the visual reference? Tile is one possibility.
2. Which data, units, capabilities, and actions does the actual desk integration provide?
3. Which data source and action types are needed for the initial contract?
4. How will layout regions be arranged and additional actions configured?
5. What minimum HA version and initial browser/device matrix will be supported?
6. Which concrete performance metrics, scenarios, and limits will be adopted?
7. Which minimal stack meets the HA and editor contracts with sustainable cost?

## Resolve when the relevant stage requires it

- Public syntax, versioning, and configuration migrations.
- Grid rules, responsiveness, conditions, and temporary state.
- Turning a recipe into a custom composition.
- Copied versus linked/versioned recipes; no choice has been made.
- Entity discovery and integration-specific adapters.
- Extension interfaces, if needed, and their performance boundaries.
- Reference dashboard and coverage needed for active promotion.
- License and distribution. Select a license before presenting the repository as licensed open source; do not defer that choice to the active-promotion milestone.

## Recording new decisions

Record context, choice, relevant alternatives, and consequences. State whether a decision was agreed with the user or proposed for validation. Update the affected scope document instead of accumulating contradictory decisions only in this record.
