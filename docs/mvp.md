# MVP: a familiar card with independent bindings

## Problem

The user has a height-adjustable desk. A `cover` entity provides its primary information and controls, while three memory positions are triggered through other entities. The goal is to bring these controls together in one visually configured card.

The desk is the first acceptance example, not the final objective of the library. Research also compares public cases outside this installation; those comparisons do not add implemented devices or compatibility promises.

Read-only inspection on 2026-11-14 verified this example's `cover` with open, close, stop, and position capabilities, three `button` memory actions, and a separate height `sensor` in centimeters. These are installation mappings, not universal desk requirements. See the [research record](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md) for provenance and limits.

| Role in the example | Verified data/action contract | Limit |
| --- | --- | --- |
| Primary control | `cover`, `current_position` in percent; `cover.open_cover`, `close_cover`, `stop_cover`, `set_cover_position` | `supported_features: 15` in this snapshot; capabilities must be checked per entity |
| Height information | Separate distance `sensor`, unit `cm` | Display this source directly; deriving physical height from rounded cover percent loses information |
| Memory 1 / 2 / 3 | Three independent `button` targets, each using `button.press` | A press timestamp is not a selected memory or arrival indication; `unknown` can mean never pressed, not unavailable |
| Movement context | Separate `lock`, connectivity and problem indicators | Local firmware may reject a command while HA reports no action error; do not auto-unlock or infer success |

The local firmware source maps its specific 62–128 cm range to cover position and guards movement using local readiness conditions. This is source evidence for this example, not physical validation of the installed build. There is no exposed per-memory target/arrival entity in the inspected role map. Primary controls operate toward endpoints/positions; a UI hold gesture must not be substituted for their semantics.

## Proposed experience

Use a native HA card as the layout and visual reference. The initial research reference is horizontal Tile with bottom-aligned controls in Sections, matched to Core 2026.11.1 / frontend 20261028.5. This establishes a source reference; rendered fit and supported-version policy still need validation.

The card will have a fixed composition with designated regions for an icon, title, subtitle/state, primary controls, and additional actions. These are fixed semantic regions; their internal placement can adapt to the allocated card space. Usable minimum allocations and precise placement still require rendered validation.

| Part | Expected configuration for the desk |
| --- | --- |
| Icon and text | Primary entity defaults and overrides supported by the editor |
| State or position/height | Information available from the `cover` entity, preserving its meaning and unit |
| Primary controls | Desk-supported actions verified against the integration |
| Three additional actions | Buttons with their own labels and independent bindings for each memory |
| Card body action | Configured separately from individual element actions |

A primary entity supplies defaults. Each element can use another binding. Information source and action target are independent concepts; the initial contract must cover the real use case without requiring a universal expression editor.

## Candidate layout and editor flows

This is a research-backed proposal, not an implemented interface. The candidate starts at full-section width, with an identity/information region, a primary-control region and a region for three additional actions. HA controls dashboard allocation: `getGridOptions` supplies Sections sizing, while `getCardSize` supplies a height estimate for Masonry placement. The card adapts its internal arrangement to the available width. Exact row count, minimum allocations and touch dimensions require rendered checks across recorded container widths, long labels and enlarged text, followed by full desk validation before MVP completion. Do not assume the additional actions fit a standard Tile footprint.

| Region | Candidate content | Evidence / validation boundary |
| --- | --- | --- |
| Identity and information | Primary name/icon defaults, optional overrides, independently selected state/attribute source with its unit | Tile structure and the desk's separate height sensor support this split; long names, text scaling and missing data need testing |
| Primary controls | Capability-aware cover endpoint/stop/position controls | The observed desk supports these actions; the public MQTT counterexample shows that availability and position cannot be assumed |
| Additional actions | Three labeled controls, each with its own action target | Map the desk memories to independent `button.press` targets; do not expose their press timestamps as arrival or selection |
| Body action | Configured independently, initially a details action or none | Never implicitly move or unlock the desk; inner-control events must remain isolated |

Candidate visual editor flow:

1. Start from an empty configuration and select a primary entity. A preview must not execute actions or require private default IDs.
2. Configure identity/information defaults and explicitly choose any independent source. Preserve unit/meaning; a missing numeric attribute must not become zero.
3. Choose supported primary controls, then configure the label, action type, target and required data for each additional action. Display/action sources remain separate. Evaluate schema forms first; use a custom editor only if the later experiment demonstrates the need.
4. Validate required fields and known capabilities. Distinguish invalid configuration, missing entity, `unavailable`, and domain-specific `unknown`; a never-pressed button is not inherently unusable.
5. Save the complete configuration, reload, reopen the editor and change one binding. Other labels, actions and sources must persist. No YAML editing is part of the intended flow.
6. Exercise keyboard/focus, touch and screen-reader names in a later validation task. Each inner action dispatches once and does not trigger the body action. Error/confirmation cancellation must not produce success feedback.
7. After a command, represent only evidence actually supplied by HA. Transport completion or a button press is not physical arrival. Missing feedback stays unknown; reconnection must not replay previous actions.

The observed desk also has a lock. On 2026-11-14, the user chose to keep lock/unlock in existing HA controls. No in-card lock control or automatic unlock is included. Physical desk-operation validation must explicitly account for that external prerequisite; transport completion while locked is not proof that movement happened.

Reference devices, including iPhone 14 Pro / Safari / reported iOS 27, identify validation conditions rather than a fixed product viewport or exclusive support scope. The separately scoped experiment may use another reproducible environment; its results cannot establish untested Safari behavior. Native appearance does not require depending on private HA components. Stage 1 tests the minimal surface, while stage 2 must validate the complete desk composition and remaining accessibility/device cases.

## Included

- One card type with a fixed layout and a visual language aligned with the chosen reference.
- A visual editor for every delivered capability, including bindings and additional actions.
- A primary entity and per-element overrides for supported regions.
- Information and controls sufficient to operate the desk, including the three memories.
- Handling of unavailable/missing entities, invalid configuration, and action failures.
- Internal controls that do not accidentally trigger the card body action.
- Configuration persistence, subsequent editing, and coherent behavior after reconnection.
- Performance and accessibility verification in recorded reference environments and allocated card sizes, with explicit tested coverage and limitations.

## Deferred

- Free grid placement, dragging elements, and arbitrary layouts.
- Recipe catalog, importing, sharing, and recipe updates.
- Multiple-room selection and other composite interactions.
- Complete cards for 3D printers, washing machines, and other devices.
- A general condition/expression system, arbitrary CSS, or arbitrary JavaScript.
- Marketplace, release infrastructure, and active promotion. An open source repository is compatible with the MVP stage.

## Acceptance criteria

- [ ] Add and configure the card entirely through the visual editor without editing YAML.
- [ ] Select the desk's primary entity and correctly display available information.
- [ ] Use supported primary controls without changing command semantics.
- [ ] Configure and trigger each of the three memories independently from the same card.
- [ ] Preserve independence between internal controls and the card body action.
- [ ] Save, reload, and edit configuration without losing bindings.
- [ ] Represent unavailability and errors without indicating false success.
- [ ] Never represent a memory position as reached without device-provided evidence.
- [ ] Support touch and keyboard use, visible focus and accessible names across selected card allocations, long labels and enlarged text; complete the remaining reference-device checks.
- [ ] Pass justified performance budgets using the protocol defined before experimental execution, with comparable samples collected during experimentation and repeated on the final MVP.
- [ ] Replace the current desk solution and receive user validation in everyday use.

## What the MVP demonstrates

A real problem solved through visual configuration and independent bindings. It does not demonstrate complete dashboard coverage or generic support for every `cover` entity.
