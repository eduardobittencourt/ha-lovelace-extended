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
| Implementation requires corresponding scope | The bounded stage 1 change authorized only its isolated experiment, local tooling and synthetic fixtures; production HA and physical commands remain outside scope |
| OpenSpec is adopted for SDD at the user's request | Changes must consider research, discovery, and tests before assuming contracts |
| The project is intended to be open source from the outset | Early public development is distinct from later active promotion; original material uses Apache-2.0 with third-party terms preserved |
| Public repository: `eduardobittencourt/ha-lovelace-extended` | Initial product documentation and OpenSpec setup are published on GitHub |
| All project content is in English | Documents, specs, examples, code, comments, commit messages, and default product text follow this policy; conversations may remain in Portuguese |

## Stage 0 research selections and user decisions

- On 2026-11-14, the user confirmed that the desk is a first acceptance example, not the library's final objective. The research includes public contrasting cases without expanding implemented support.
- The source reference is Core 2026.11.1 / frontend 20261028.5, with horizontal Tile and bottom controls in Sections. This is a research selection, not a minimum supported version or proof of rendered fit.
- The user selected iPhone 14 Pro / Safari / reported iOS 27 as a reference validation environment. Exact device/browser build and viewport must accompany its measurements; the sequencing decision below supersedes its earlier status as a prerequisite for experimentation.
- The user chose to keep desk lock/unlock in existing HA controls. The card must not automatically unlock; complete desk-operation validation includes that external prerequisite. No in-card lock control is added to the MVP.
- The historical [stage 1 experiment plan](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md#future-stage-1-experiment-and-gates-task-34) is documented, not executed. Its pre-experiment baseline gate is superseded below. Baselines, numerical limits, rendered fit and runtime binding/editor feasibility remain unproven and must be validated at their dependent gates. Minimal Web Components versus Lit and context versus hass update delivery are still open.

## Layout and validation sequence — 2026-11-18

The accepted documentation direction in [align-roadmap-with-native-ha-layout](../openspec/changes/archive/2026-11-18-align-roadmap-with-native-ha-layout/proposal.md) supersedes the archived plan's phone/baseline entry gate:

- Follow HA's documented Sections `getGridOptions` and Masonry `getCardSize` allocation conventions; adapt internal content to allocated card space. Tile remains a visual reference, without requiring its exact footprint or private components.
- Reference devices supply test conditions, not a fixed product viewport, required development host or exclusive support matrix. Concrete widths, HA/frontend revisions and capture environments must be selected before experimental execution.
- Start a separately scoped experiment once questions, versioned contracts, reproducible environment, safe fixtures, functional/layout checks and measurement methods are defined. It collects comparable samples; access to the iPhone and preset numerical budgets are not entry requirements.
- Require justified budgets and passing measurements before accepting performance or a cost-dependent production choice. Complete full desk fit, remaining accessibility/device checks, integration, separately scoped physical/everyday validation and accepted performance before MVP completion.

This avoids coupling discovery to one capture setup while keeping performance acceptance evidence-based. Native sizing hooks do not establish responsive correctness. The archive remains historical evidence; no runtime result, production stack, minimum HA version or wider support policy is selected here.

## Community foundation decisions

- The maintainer selected Apache-2.0 for original material, with the approved
  notice "Copyright 2026 Eduardo Bittencourt". See [LICENSE](../LICENSE) and
  [third-party notices](../THIRD_PARTY_NOTICES.md); OpenSpec material remains MIT
  and the adapted Contributor Covenant 2.1 remains CC BY 4.0.
- [CONTRIBUTING.md](../CONTRIBUTING.md) owns the public correction/proposal/review
  workflow. Focused documentation/proposal issue templates and a PR template
  match the documentation-only stage. Governance, support and releases are not
  implied by these files.
- The maintainer approved Contributor Covenant 2.1 and the reporting owner/contact
  in [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md). Vulnerabilities use the separate
  private GitHub route in [SECURITY.md](../SECURITY.md).
- On 2026-11-18, the maintainer separately authorized enabling GitHub private
  vulnerability reporting; the enabled state was verified. This does not
  authorize other settings changes, publication or releases.

## Proposed architecture, subject to adjustment

- A primary entity supplies defaults, with per-element overrides.
- MVP fixed composition with designated regions for additional actions.
- Conceptual separation of surface, elements, bindings, editor, and recipes.
- Incremental roadmap with exit criteria and no fixed schedule.
- Initial setup: OpenSpec 1.14.3, Codex/core, and the local `research-first` schema derived from `spec-driven`. This is an implemented process choice, not a decision about the card's stack.

## Resolve at the experimental and MVP acceptance gates

1. The initial research reference is horizontal Tile with bottom controls in Sections on Core 2026.11.1 / frontend 20261028.5. Test experimental fit during stage 1 and full desk fit before MVP completion; this is not the minimum supported version.
2. The read-only desk map verifies cover position/actions, a separate cm sensor and three button memories. Physical command/arrival validation remains separate; local firmware can reject a command without a surfaced HA error.
3. Candidate source/action needs are documented in the MVP; validate visual editing and persistence before settling the public contract.
4. Candidate fixed regions and editor flows are documented; rendered fit and exact minimum dimensions remain open.
5. iPhone 14 Pro / Safari / reported iOS 27 remains a reference test environment; its samples are not an experiment-entry requirement. What minimum HA version and wider support matrix will be promised remains unresolved.
6. Which concrete performance metrics, scenarios, and limits will be adopted?
7. Which minimal stack meets the HA and editor contracts with sustainable cost?

## Resolve when the relevant stage requires it

- Public syntax, versioning, and configuration migrations.
- Free-composition grid rules, conditions and temporary state; fixed-composition responsiveness is validated in stages 1–2.
- Turning a recipe into a custom composition.
- Copied versus linked/versioned recipes; no choice has been made.
- Entity discovery and integration-specific adapters.
- Extension interfaces, if needed, and their performance boundaries.
- Reference dashboard and coverage needed for active promotion.
- Distribution channel and release process. The license is selected; distribution remains undecided.

## Recording new decisions

Record context, choice, relevant alternatives, and consequences. State whether a decision was agreed with the user or proposed for validation. Update the affected scope document instead of accumulating contradictory decisions only in this record.

## Bounded experimental findings — 2026-11-19

The archived [minimum-card change](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md) has demonstrated two independently bound slots, the real HA schema-form round trip, local action isolation, selective updates/cleanup and the recorded Chromium layout/input matrix. It uses native JavaScript and ordinary `hass` delivery as experimental mechanisms. These findings do not adopt a production renderer/editor, stable public format, minimum supported release or distribution model. Comparative discovery samples, a recorded technical budget review and fresh verification are published separately from correctness. The review withholds overall performance acceptance: candidate limits are unapproved and shared-cost/heap/paint limitations remain. Stage 1 stays open. Stage 0 synthesis and stage 2 desk/device/physical validation remain unchanged.
