# MVP: a familiar card with independent bindings

## Problem

The user has a height-adjustable desk. A `cover` entity provides its primary information and controls, while three memory positions are triggered through other entities. The goal is to bring these controls together in one visually configured card.

The desk is the first acceptance example, not the final objective of the library. Research also compares public cases outside this installation; those comparisons do not add implemented devices or compatibility promises.

Read-only inspection on 2026-11-14 verified this example's `cover` with open, close, stop, and position capabilities, three `button` memory actions, and a separate height `sensor` in centimeters. These are installation mappings, not universal desk requirements. See the [research record](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md) for provenance and limits. All four role rows below share that dated read-only provenance (Core 2026.11.1); later implementation validation must recheck the actual entities and capabilities. Connectivity/problem entities are context, not additional mandatory MVP controls.

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
| State and position / height | State and percent position from the `cover`; physical height directly from the separate `cm` sensor, preserving each source and unit |
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

- [ ] Add and configure the card entirely through the visual editor without editing YAML. Scenarios: EDIT-CREATE.
- [ ] Select the desk's primary entity and correctly display available information. Scenarios: DATA.
- [ ] Use supported primary controls without changing command semantics. Scenarios: PRIMARY, PHYSICAL.
- [ ] Configure and trigger each of the three memories independently from the same card. Scenarios: MEMORY-1, MEMORY-2, MEMORY-3, PHYSICAL.
- [ ] Preserve independence between internal controls and the card body action. Scenarios: ISOLATION.
- [ ] Save, reload, and edit configuration without losing bindings. Scenarios: EDIT-ROUNDTRIP, RECOVER.
- [ ] Represent unavailability and errors without indicating false success. Scenarios: INVALID, MISSING, UNAVAILABLE, UNKNOWN, ERROR, CANCEL, RECOVER.
- [ ] Never represent a memory position as reached without device-provided evidence. Scenarios: FEEDBACK, PHYSICAL.
- [ ] Support touch and keyboard use, visible focus and accessible names across selected card allocations, long labels and enlarged text; complete the remaining reference-device checks. Scenarios: LAYOUT, INPUT.
- [ ] Pass justified performance budgets using the protocol defined before experimental execution, with comparable samples collected during experimentation and repeated on the final MVP. Scenarios: PERF.
- [ ] Replace the current desk solution and receive user validation in everyday use. Scenarios: EVERYDAY.

### Scenario evidence contract

All scenarios below define future full-desk acceptance; **every result is pending**. Their owning milestone is **stage 2**, except PERF's budget agreement/experimental acceptance prerequisite, owned by **stage 1**. Stage 0 supplies the definition only. No scenario is executed by this synthesis.

Provenance keys:

- **P1:** [Desk map and comparison](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md#desk-role-map-task-13), read-only 2026-11-14, Core 2026.11.1: data, capabilities, actions and feedback limits.
- **P2:** [Recorded product intent](decisions.md#agreed), this MVP's existing checklist/editor flows, reviewed 2026-11-19; external lock and reference-device choices recorded 2026-11-14 in [research selections](decisions.md#stage-0-research-selections-and-user-decisions).
- **P3:** [Validation sequence](decisions.md#layout-and-validation-sequence--2026-11-18), 2026-11-18: allocated space, evidence timing and milestone gates.
- **P4:** [Two-slot experiment](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md), 2026-11-19, Core 2026.11.1 / frontend 20261028.5: supporting editor/isolation/layout evidence only, never a full-desk pass.
- **P5:** [Technical budget review](../experiments/minimum-card-contract/results/budget-review.json), 2026-11-19: performance acceptance withheld.

Each future scoped validation change must put a sanitized scenario-indexed result in its `research.md`, linking durable captures/dispatch records/measurements in the repository. Record pass/fail/pending, date, implementation revision, HA/frontend versions, fixture or actual role mapping, method and limitations. Raw/private evidence stays outside the checkout; public findings must stand alone. Synthetic checks intercept dispatch before physical device calls. Physical checks require separately scoped authorization and evidence; a synthetic pass cannot substitute for them.

### Visual configuration and actions

| ID | Precondition | Trigger | Observable expected result | Evidence method | Provenance |
| --- | --- | --- | --- | --- | --- |
| EDIT-CREATE | Empty card configuration; safe desk-role fixtures available | Add the card visually; select primary entity, identity/source overrides, supported controls, three labels/actions/targets and body action or none | Every delivered option can be configured without YAML; preview sends no commands and contains no private default IDs | Real HA editor recording, saved sanitized configuration and intercepted-dispatch log | P1, P2; P4 supporting only |
| DATA | Valid primary cover with percent position and independent cm sensor; configured display and action targets differ | Change each source separately, then activate its configured control | Cover percent and direct cm value retain their units/meaning; dependent display changes only; activation uses the configured action target without changing sibling bindings | Controlled state changes, rendered captures and dispatch target/data log | P1, P2; P4 supporting only |
| PRIMARY | Available primary target; capability flags recorded | Activate open, close, stop and set-position separately; repeat with the corresponding capability absent | Supported controls issue exactly the corresponding cover action once; set-position preserves the requested percent parameter; unsupported controls cannot dispatch; no hold-to-move substitution | Capability fixtures and intercepted action/data/count assertions; actual execution deferred to PHYSICAL | P1, P2 |
| MEMORY-1 | Memory 1 label and independent target configured | Activate memory 1 | One `button.press` to target 1; no target 2/3 or body dispatch and no inferred selected/reached state | Per-target intercepted dispatch log plus capture | P1, P2 |
| MEMORY-2 | Memory 2 label and independent target configured | Activate memory 2 | One `button.press` to target 2; no target 1/3 or body dispatch and no inferred selected/reached state | Per-target intercepted dispatch log plus capture | P1, P2 |
| MEMORY-3 | Memory 3 label and independent target configured | Activate memory 3 | One `button.press` to target 3; no target 1/2 or body dispatch and no inferred selected/reached state | Per-target intercepted dispatch log plus capture | P1, P2 |
| ISOLATION | Inner controls and separate body action configured | Activate each inner control and then the body area separately by pointer, keyboard and recorded touch method; also test body action none | Each inner activation dispatches once with zero body actions; body activation dispatches only its own action, or none when unconfigured | Input-method/count matrix and intercepted dispatch log | P2; P4 supporting only |
| EDIT-ROUNDTRIP | Complete configuration including three memories and independent display/action bindings | Save, reload dashboard, reopen editor; change only one binding; save/reload/reopen again | All values survive the first round trip; the single change persists after the second while every untouched source, label, control and action remains unchanged | Actual HA round-trip recording and before/after sanitized configuration comparison | P2; P4 supporting only |

### Failures, recovery and complete-desk validation

| ID | Precondition | Trigger | Observable expected result | Evidence method | Provenance |
| --- | --- | --- | --- | --- | --- |
| INVALID | Required configuration field absent or action/data invalid | Open editor, attempt save or render invalid configuration | Clear validation/error identifies the limitation; no silent alternate target, command or success indication | Invalid-config fixtures, editor/render captures and zero-dispatch log | P2; P4 supporting only |
| MISSING | One configured source or action target removed; independent controls remain valid | Render and attempt the affected action | Missing role is explicit; no stale normal value, substituted zero or dispatch to missing target; independent usable controls still work | Separate source/target deletion fixtures, captures and dispatch log | P1, P2 |
| UNAVAILABLE | One source or action target reports `unavailable`; siblings valid | Update state and activate affected and unaffected controls | Unavailability is explicit; unusable target cannot dispatch; a failed display source does not disable an independent valid action; sibling information/actions remain usable | Source/target availability matrix and dispatch log | P1, P2 |
| UNKNOWN | Missing numeric feedback or domain-specific `unknown`; available never-pressed memory button | Render each case and activate the memory | Unknown numeric value stays absent/unknown, never zero or arrival; the available button remains pressable despite no press history; unknown is not globally treated as unavailable | Domain-specific fixtures, captures and single-press log | P1 |
| ERROR | Usable target; action boundary returns an error | Activate inner action | Error is represented without success/arrival or body action; independent usable controls remain usable | Injected action-error capture and dispatch log | P1, P2; P4 supporting only |
| CANCEL | Action is awaiting confirmation in a safe fixture | Cancel before dispatch | No command, body action or success/arrival indication | Cancellation recording and zero-dispatch assertion | P2; P4 supporting only |
| RECOVER | Prior action recorded; one bound role unavailable or connection/card disconnected | Change state while disconnected; restore connection/remount and activate once | Current state and saved bindings return; no stale normal state, replay or accumulated dispatch; next activation occurs exactly once | Disconnect/reconnect/remount sequence, state/config comparison and dispatch counts | P2; P4 supporting only |
| FEEDBACK | Memory has no target/arrival feedback; transport can complete even when local firmware rejects motion | Supply press timestamp, successful HA completion, absent feedback and reported position updates separately | UI distinguishes available data from command completion; no selected/reached-memory claim or invented arrival from timestamp, percent, transport or elapsed time | Synthetic feedback matrix with rendered captures; actual observations linked under PHYSICAL | P1, P2 |
| LAYOUT | Complete composition in recorded Sections and Masonry narrow/intermediate/wide allocations | Render ordinary/long labels and normal/enlarged text in selected light/dark themes and locales | All information and controls remain usable without overlap, unintended clipping or horizontal overflow; text/unit meaning and bindings survive presentation changes | Allocation matrix with actual card width/height, text scale, locale/theme, screenshots and measured overflow | P2, P3; P4 supporting only |
| INPUT | Complete composition in the selected allocations, including reference device | Traverse and activate controls using keyboard and touch; inspect names with recorded accessibility method | Coherent keyboard order, visible focus, reachable touch areas and accessible names identify each action; activation preserves ISOLATION | Focus/input recording and accessibility-name audit; record device model, OS/browser exact builds, usable viewport, card allocation, zoom/text scale and assistive method; iPhone 14 Pro / Safari / reported iOS 27 coverage stays pending until observed | P2, P3; P4 supporting only |
| PHYSICAL | Separately authorized desk-operation plan; actual capabilities reverified; external lock state and operator readiness recorded | With user supervision, test supported primary controls and each memory under planned external locked/unlocked conditions | No in-card or automatic unlock; record actual movement/rejection and available feedback separately from HA completion; report mismatches without invented arrival, especially while locked | Scenario-indexed operator observation, HA command/feedback timestamps and physical-response record; lock changes use existing HA controls | P1, P2 |
| EVERYDAY | Full composition and prerequisite functional/device/performance checks documented; separately scoped real use | Replace the current desk solution for the agreed observation period and obtain user review | User explicitly accepts the complete experience, including three memories; discrepancies and unresolved criteria remain visible rather than implied passes | Sanitized everyday-use notes, observation period, discrepancies and explicit user acceptance in the validation change | P2, P3 |
| PERF | Protocol/conditions recorded before execution; comparable workloads; stage 1 budgets justified and approved before acceptance | Evaluate experimental costs at stage 1; repeat relevant measurements on final MVP at stage 2 | Report cold/warm runtime and editor loading, bytes/execution, local input, relevant/unrelated updates, scaling and lifecycle/memory with comparable samples; pass only justified agreed budgets. Separate local UI cost, HA transport and physical response; unmeasured phases stay pending | Versioned protocol and samples with distribution/spread, workload equivalence, attribution/heap/paint limitations and budget decision; transport and physical records linked separately to PHYSICAL | P2, P3, P5 |

## What the MVP demonstrates

A real problem solved through visual configuration and independent bindings. It does not demonstrate complete dashboard coverage or generic support for every `cover` entity.
