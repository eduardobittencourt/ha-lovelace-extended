# MVP: a familiar card with independent bindings

## Problem

The user has a height-adjustable desk. A `cover` entity provides its primary information and controls, while three memory positions are triggered through other entities. The goal is to bring these controls together in one visually configured card.

Entity IDs, memory entity domains, available attributes, and exact actions still need verification. This document assumes neither that memories use `button` entities nor that height is available in centimeters.

## Proposed experience

Use a native HA card as the layout and visual reference. The exact reference will be selected before implementation; Tile is a candidate, not a settled decision.

The card will have a fixed composition with designated regions for an icon, title, subtitle/state, primary controls, and additional actions. The placement and limits of these regions still need specification.

| Part | Expected configuration for the desk |
| --- | --- |
| Icon and text | Primary entity defaults and overrides supported by the editor |
| State or position/height | Information available from the `cover` entity, preserving its meaning and unit |
| Primary controls | Desk-supported actions verified against the integration |
| Three additional actions | Buttons with their own labels and independent bindings for each memory |
| Card body action | Configured separately from individual element actions |

A primary entity supplies defaults. Each element can use another binding. Information source and action target are independent concepts; the initial contract must cover the real use case without requiring a universal expression editor.

## Included

- One card type with a fixed layout and a visual language aligned with the chosen reference.
- A visual editor for every delivered capability, including bindings and additional actions.
- A primary entity and per-element overrides for supported regions.
- Information and controls sufficient to operate the desk, including the three memories.
- Handling of unavailable/missing entities, invalid configuration, and action failures.
- Internal controls that do not accidentally trigger the card body action.
- Configuration persistence, subsequent editing, and coherent behavior after reconnection.
- Performance and accessibility verification in the reference environment.

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
- [ ] Support touch and keyboard use, visible focus, accessible names, and the selected dimensions.
- [ ] Pass the performance protocol defined before implementation.
- [ ] Replace the current desk solution and receive user validation in everyday use.

## What the MVP demonstrates

A real problem solved through visual configuration and independent bindings. It does not demonstrate complete dashboard coverage or generic support for every `cover` entity.
