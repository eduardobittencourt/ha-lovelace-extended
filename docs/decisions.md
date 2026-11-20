# Decisions and open questions

## Current performance budget authority — 2026-11-19

The maintainer delegates benchmark-based numerical selection to agents and rejects further requests for arbitrary user-supplied targets or separate numerical approval. The [standing policy and adopted limits](performance-budgets.md) supersede earlier approval/objective prerequisites below. Native per-cell maxima are now the authoritative CPU, transfer and update ceilings until the maintainer revises them. Fresh verification is now [published](../experiments/minimum-card-contract/performance-verification/review.md) and fails selected cells; numerical adoption does not convert discovery into acceptance or erase historical failures.

This initial record comes from the product discussion. “Agreed” identifies directions expressed by the user; “proposed” identifies choices still needing validation.

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
6. Apply the [adopted benchmark limits](performance-budgets.md), select further scenario-specific values under the standing delegation, and verify them without asking the maintainer for numerical targets.
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

The archived [minimum-card change](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md) has demonstrated two independently bound slots, the real HA schema-form round trip, local action isolation, selective updates/cleanup and the recorded Chromium layout/input matrix. It uses native JavaScript and ordinary `hass` delivery as experimental mechanisms. These findings do not adopt a production renderer/editor, stable public format, minimum supported release or distribution model. Comparative discovery samples, a recorded technical budget review and fresh verification are published separately from correctness. The review withholds overall performance acceptance: candidate limits are unapproved and shared-cost/heap/paint limitations remain. Stage 1 stays open. The separate synthesis below closes stage 0 definition; stage 2 desk/device/physical validation remains pending.

## Desk scope and acceptance synthesis — 2026-11-19

The [MVP scenarios](mvp.md#acceptance-criteria) now reconcile the dated read-only role/action map and map all eleven original checklist criteria to observable checks with provenance, evidence destinations and milestone ownership. The [coverage review](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#r2-acceptance-coverage-review) found no material missing intent; stage 0's definition exit is met. Height remains direct cm sensor data, cover position remains percent, memory buttons remain independent presses and lock/unlock remains external.

This is documentation synthesis, with every full-desk result pending. Stage 1 budget approval and stage 2 desk/device/accessibility, integration, physical and everyday acceptance remain open. The [performance handoff](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#stage-1-performance-handoff) lists the separate unresolved work; no numerical limit or production mechanism is adopted.

## Stage 1 performance method findings — 2026-11-19

The [follow-up discovery](../experiments/minimum-card-contract/performance-followup/discovery.md)
keeps the subject fixed and records repeated empty/native/experimental shell and
driver controls, editor/update windows, released fresh-instance diagnostics and
browser-clock content milestones. Its observations support the stated bounded
methods, without a universal per-card ranking, production renderer choice or
compatibility expansion. Calibrated weak references observed collected fresh
instances; renderer-global retained-byte isolation remains unsupported. DOM
content and following rAF remain distinct from unverified final presentation.

The [budget matrix](../experiments/minimum-card-contract/performance-followup/budget-review.json)
initially recorded proposed limits. The maintainer subsequently approved four
rows and their maximum/no-replacement rule; the [fresh verification review](../experiments/minimum-card-contract/performance-followup/review.md)
records runtime size, warm readiness and local intent passing, with experimental
ten-group cold readiness failing at 1104.80 ms against 1000 ms. Six other required
rows remain pending. The historical 1108.60 ms cold observation remains visible. Stage 1 stays open;
no required evidence was waived. Stage 0 definition stays complete and stage 2
full-desk/device/accessibility/integration/physical/everyday acceptance remains
pending. These are measured method findings and unresolved gates, not new
agreed production decisions or an optimization authorization.

## Stage 1 diagnostic findings — 2026-11-19

The [diagnosis](../experiments/minimum-card-contract/performance-diagnostics/diagnosis.md) prioritizes measuring shared startup and reference-observer variation before changing the experimental subject. No tighter cold maximum is proposed. The [budget matrix](../experiments/minimum-card-contract/performance-diagnostics/budget-matrix.json) records the dated approval of the experimental editor limits. The [combined review](../experiments/minimum-card-contract/performance-diagnostics/stage-review.json) preserves historical cold failures and five pending requirements.

## Stage 1 evidence consolidation — 2026-11-19

The [ten-row decision record](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#ten-row-decision-record--2026-11-19) reconciles approval provenance and measured outcomes against the combined diagnostic review. Runtime size, warm readiness, local intent and editor readiness retain bounded passes. Cold readiness passed the latest campaign but the 1108.60 and 1104.80 ms historical failures remain unresolved against the approved 1000 ms maximum. CPU, transfer and updates require representative user objectives and explicit budget agreement; retained bytes and presentation require calibrated methods before budgets and verification. No row is waived.

In the [budget review response](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#focused-maintainer-review), the maintainer declined to guess numerical thresholds and permitted other component-library benchmarks as supporting evidence. The stated objective is to avoid a component whose processing weight makes the dashboard nearly unusable. The [comparative direction](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#comparative-benchmark-direction) records proposed follow-up conditions; no comparator, relative tolerance, numerical budget or campaign is approved. The [stage disposition and D3 handoff](../openspec/changes/archive/2026-11-19-consolidate-stage-one-performance/research.md#stage-1-exit-disposition-and-stage-2-handoff) keep stage 1 open and carry final-MVP PERF repeats, full-desk layout/input, reference-device, physical and everyday validation forward. This is an evidence-based disposition under the existing roadmap exit, not a new agreed production stack or authorization for implementation or lab campaigns.

## Fresh stage 1 verification — 2026-11-20 (UTC)

The [fresh stage 1 verification](../experiments/minimum-card-contract/performance-verification/review.md) summarizes 120 valid load observations, 72 valid update-only windows and 90 valid interaction windows, with 900 recorded local intents and 0 dispatch timeouts. CPU, transfer and update-script observations exceed the unchanged adopted ceilings. Two separately frozen cold series retain 240 observations and five new ten-group experimental failures, while same-helper R1 cold observations add four more; the transparent driver observer locates prolonged locator waits without resolving visibility-versus-polling causality or either historical failure. Retention is **pass** under its documented calibrated boundary; presentation is **unsupported**. The [ten-row reconciliation](../experiments/minimum-card-contract/performance-verification/review.md#stage-decision) keeps stage 1 open. Candidate/final-MVP performance, reference-device/accessibility, real integration/transport, physical and everyday gates remain separate; no production stack is adopted.

The single evidence-led revision passed every required retained/released/shared/debugger/WeakMap/native-DOM/listener/closure control in the pinned runtime. The initial auto-index parser failure remains preserved. This calibrates the stated exclusive production-root graph boundary, not a universal GC or production-memory claim. Independent discovery selected twelve exact native maxima; fresh experimental verification is pass. See the method-scoped records rather than global heap totals or a production-memory promise. Unsupported content-to-successful-presentation method in the pinned probe. One source-led target-local tracing correction restored screenshots and passed delayed/no-change/clock controls. Content carries source_id/frame_sequence, while the observed FramePresented and Display::FrameDisplayed records expose no matching identifier or ID/flow metadata. The pinned screenshot source describes expected_display_time as an estimate; it is not successful presentation feedback. No timestamp-proximity, screenshot, damage, local-intent or two-frame substitute is accepted.
