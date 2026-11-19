# Spec Delta

## Purpose

Define independent display/action binding behavior for the bounded two-slot experimental HA card. This contract does not establish a production library, public configuration stability, full desk support or untested compatibility.

## ADDED Requirements

### Requirement: Independent display and action bindings

The experimental card SHALL provide two stable slots with independently configurable display sources and action targets. An action target SHALL be independent of its slot's display source and the other slot's configuration.

#### Scenario: Distinct display sources and action targets

- **WHEN** slot A and slot B use different display entities and separately selected action targets
- **THEN** each slot shows its own entity value and routes activation only to its configured action target

#### Scenario: Reconfigure one slot

- **WHEN** the display source or action target for slot A changes
- **THEN** slot B retains its configuration and behavior

### Requirement: Visual configuration persistence

All experimental display bindings, action targets, labels and the separate body action SHALL be configurable through the real HA visual editor. Saving, reloading and reopening SHALL preserve the complete configuration without requiring user YAML edits.

#### Scenario: Save and reopen

- **WHEN** both slots and the body action are visually configured, saved, the dashboard reloaded and the editor reopened
- **THEN** all configured values remain visible and the card uses those values

#### Scenario: Edit without sibling loss

- **WHEN** only one binding is changed in the reopened visual editor and saved again
- **THEN** the change persists and every untouched binding, label and action remains unchanged

### Requirement: Inner and body action isolation

Activating an inner control SHALL produce exactly one intended action and zero body actions. Activating the body action area SHALL produce its own action without activating an inner control.

#### Scenario: Inner activation across available input methods

- **WHEN** an enabled inner control is activated separately by pointer, keyboard or the recorded touch test method
- **THEN** one inner action and no body action is recorded for each activation

#### Scenario: Body activation

- **WHEN** the separate body action area is activated
- **THEN** only the configured body action is recorded

### Requirement: Safe experimental action dispatch

Experimental actions SHALL be restricted to synthetic fixtures and intercepted before external device dispatch. An action cancellation or rejected action SHALL produce no success or physical-arrival indication.

#### Scenario: Fixture activation

- **WHEN** an allowed fixture action is activated
- **THEN** its intent is recorded without contacting a physical device

#### Scenario: Rejection and cancellation

- **WHEN** an action is rejected, targets an unapproved entity or is cancelled before dispatch
- **THEN** it produces no success indication, no body action and no external command

### Requirement: Invalid and unavailable binding handling

The card SHALL reject invalid configuration clearly and represent missing, unknown or unavailable sources without stale normal-state output or false success. Actions depending on unusable targets SHALL be disabled or rejected explicitly while an independent valid slot remains usable.

#### Scenario: Invalid configuration

- **WHEN** a required binding is absent or an experimental action configuration is unsupported
- **THEN** a configuration error is shown instead of silently selecting another entity or action

#### Scenario: One source becomes unusable

- **WHEN** slot A's source disappears or becomes unknown or unavailable while slot B remains valid
- **THEN** slot A shows its actual limitation and slot B continues working independently

#### Scenario: Recovery

- **WHEN** the missing source returns with a valid state
- **THEN** the slot shows that state without replaying any previous action

### Requirement: Selective visible updates

Unrelated entity updates SHALL cause no slot DOM changes. Relevant updates SHALL affect only dependent visible content; configuration, theme and locale changes SHALL remain reflected in the card.

#### Scenario: Relevant and unrelated state changes

- **WHEN** an unrelated entity changes and then only slot A's displayed value changes
- **THEN** the first change causes zero slot DOM mutations and the second updates slot A without mutating slot B

#### Scenario: Presentation context changes

- **WHEN** the recorded theme or locale changes without an entity state change
- **THEN** the card reflects the new theme and applicable localized presentation without losing bindings

### Requirement: Clean disconnect and reconnect

Removing the card SHALL release its owned listeners, subscriptions and scheduled work. Repeated removal and reinsertion SHALL not accumulate retained resources, duplicate dispatches or replay past actions.

#### Scenario: Repeated lifecycle cycles

- **WHEN** the card is repeatedly mounted, removed and reinserted under the recorded test protocol
- **THEN** owned resources return to their baseline after each removal and a subsequent activation dispatches once

#### Scenario: State changes while disconnected

- **WHEN** a bound entity changes while the card is removed and the card is later reinserted
- **THEN** the current state appears without replaying earlier actions

### Requirement: Allocated layout and accessible controls

The card SHALL adapt its fixed regions to recorded narrow, intermediate and wide allocations in Sections and Masonry. Tested controls SHALL have accessible names, visible focus, coherent keyboard order and reachable activation areas without overlap or unintended overflow, including long labels and enlarged text.

#### Scenario: Layout matrix

- **WHEN** the card is rendered in each recorded layout/allocation with ordinary and long labels and normal and enlarged text
- **THEN** information and controls remain usable without overlap, unintended clipping or horizontal overflow

#### Scenario: Keyboard and touch coverage

- **WHEN** controls are traversed and activated with the recorded keyboard and touch test methods
- **THEN** focus is visible, accessible names identify each action and activation areas remain reachable

### Requirement: Explicit evidence and acceptance limits

The experimental delivery SHALL report reproducible functional/layout coverage and comparable native/experimental costs. Performance SHALL be accepted only against explicitly reviewed, justified budgets and passing measurements. Unmeasured cases SHALL remain pending and a prototype SHALL not be promoted to production by default.

#### Scenario: Comparable measurements

- **WHEN** native and experimental workloads are captured
- **THEN** results identify environment, workload equivalence, samples, methods and limitations, separating local UI cost from transport and physical response

#### Scenario: Incomplete or failing evidence

- **WHEN** a required check fails, a metric cannot be measured comparably or budgets are not justified and met
- **THEN** the report records that limitation and leaves the corresponding acceptance gate open
