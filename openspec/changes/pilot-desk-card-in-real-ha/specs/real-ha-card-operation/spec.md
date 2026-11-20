# Spec Delta

## Purpose

Define reversible installation and bounded real operation of the complete card in an HA test view, without enabling real transport in the preserved synthetic candidate or implying final MVP acceptance.

## ADDED Requirements

### Requirement: Separately identifiable pilot installation

The pilot SHALL load as a separately identified HA module/card with its complete local asset closure and no embedded credentials or private entity defaults. Installation SHALL add only the declared asset directory, resource and dedicated pilot dashboard with its test view, preserving the existing desk solution and dashboard default.

#### Scenario: Install beside the existing card

- **WHEN** the prepared pilot is installed in the verified resource mode
- **THEN** the module and its imports load at the recorded revision, the pilot is visually selectable, and the existing card and default dashboard remain usable

#### Scenario: Incompatible installation prerequisite

- **WHEN** serving, registration or frontend compatibility cannot be established within the scoped changes
- **THEN** deployment stops with the unmet prerequisite recorded and no automatic HA restart, resource-mode change or integration upgrade

### Requirement: Scoped rollback and update

Pilot deployment SHALL retain a scoped backup and identify its owned files, resource, dashboard and view. Updating or rolling back SHALL preserve unrelated and concurrent changes, remove obsolete pilot registrations and verify the resulting dashboard/resource configuration.

#### Scenario: Remove the pilot

- **WHEN** the pilot installation is rolled back
- **THEN** only pilot-owned changes are removed or restored, the original desk solution remains usable and a fresh page load no longer requests the removed pilot resource

#### Scenario: Concurrent dashboard edit

- **WHEN** the resource or dashboard configuration changes after the deployment snapshot
- **THEN** installation or rollback reconciles the current configuration or stops rather than overwriting the concurrent edit

### Requirement: Preserve complete visual desk behavior

The pilot SHALL preserve the complete candidate's independent source/action roles, direct height units, capability-aware controls, three additional actions, local position preview, cancellation, body isolation and visual configuration. Pilot-specific options SHALL also be visually editable and persist without YAML.

#### Scenario: Create and independently edit the real composition

- **WHEN** the user configures the actual cover, height source and three memory buttons, saves, reloads and edits one binding
- **THEN** all selected fields persist, sibling bindings remain unchanged and numeric feedback retains its supplied source and units

#### Scenario: Single completed position interaction

- **WHEN** position changes through several preview values and is committed by a valid changed release or Enter
- **THEN** only the final finite percent is requested once, with no intermediate, duplicate, cancelled or stale command and no optimistic replacement of actual feedback

### Requirement: Bounded real-service dispatch

The pilot SHALL send only explicitly activated configured cover open, close, stop and set-position actions, or configured button presses, through the current HA session. It SHALL validate target, domain, capability, availability and exact data immediately before dispatch, including after confirmation. It SHALL NOT unlock devices or dispatch unrelated services.

#### Scenario: Each real control dispatches independently

- **WHEN** a valid configured cover control or memory slot is activated once outside preview
- **THEN** exactly one corresponding HA invocation targets that control's effective entity with the required data, zero sibling/body invocations and no implicit unlock

#### Scenario: Missing or unavailable target and invalid data

- **WHEN** the target is absent, unavailable, in the wrong domain, lacks the required capability or receives invalid position data
- **THEN** no service invocation occurs, the limitation is visible and independently valid controls remain usable

#### Scenario: Cancelled or invalidated confirmation

- **WHEN** confirmation is cancelled or configuration, connection, target or capability changes before dispatch
- **THEN** the pending activation produces no invocation to either the original or replacement target

### Requirement: No commands from configuration or preview

The pilot SHALL suppress real service invocations in picker/editor previews and during configuration, save, reload, mounting and programmatic state updates. Preview restrictions SHALL apply even if a control is clicked or a position gesture is completed there. Unverified frontend preview behavior SHALL block transport enablement.

#### Scenario: Exercise editor and picker previews

- **WHEN** preview controls are activated, bindings are changed and the configuration is saved and reopened
- **THEN** zero real service invocations occur and the saved configuration remains editable

#### Scenario: State update without activation

- **WHEN** the card mounts, reloads or receives new HA feedback without an explicit user command
- **THEN** the information updates without sending commands

### Requirement: Truthful command outcomes and recovery

The pilot SHALL distinguish pending transport, HA completion/error, supplied state and observed physical outcome. It SHALL NOT infer arrival or selected memory from transport completion, timestamps or elapsed time. Disconnect/remount SHALL invalidate unsent work, suppress stale status updates and never retry or replay a prior command automatically.

#### Scenario: Transport error or ambiguous disconnect

- **WHEN** an invocation rejects or its outcome becomes uncertain after connection loss
- **THEN** the UI reports error or uncertainty without physical success, automatic retry or replay after reconnection

#### Scenario: Locked desk or absent arrival feedback

- **WHEN** HA accepts a command while firmware rejects motion or supplies no memory-arrival evidence
- **THEN** only the available command/state information is represented, with no automatic unlock or invented arrival

#### Scenario: Late result after reconfiguration

- **WHEN** an earlier invocation settles after the card's target or lifecycle generation changes
- **THEN** it cannot overwrite the new control's status or cause another invocation

### Requirement: Recorded real-device and physical validation

Pilot validation SHALL identify the installed revision, actual HA/frontend and device/browser conditions, scenario outcomes and limitations. Physical checks SHALL wait for a recorded operator-ready session with external lock prerequisites and an available stop control. Command completion, reported feedback and observed motion/rejection SHALL be recorded separately.

#### Scenario: Reference-device input check

- **WHEN** the user exercises touch, position cancellation and visual editing on the reference device
- **THEN** exact browser/OS builds, allocation, text scale, input/accessibility method and observed outcomes are recorded; emulation does not substitute for unobserved device checks

#### Scenario: Operator-supervised motion

- **WHEN** the operator is ready for the planned primary-control and three-memory checks
- **THEN** only the agreed operations run, lock changes stay in existing controls and unexpected behavior ends the session with its findings retained

#### Scenario: Operator unavailable

- **WHEN** software preparation is complete but the physical session cannot run
- **THEN** physical scenarios remain pending and the report identifies the outstanding handoff without claiming motion validation

### Requirement: Pilot evidence does not close acceptance gates

Pilot reporting SHALL keep stage 1 failures and unsupported metrics visible, distinguish initial use from everyday replacement acceptance and apply adopted performance budgets only to comparable measurements. Historical passes SHALL NOT pass the changed pilot. A pilot installation SHALL NOT imply final MVP, production-stack or distribution acceptance.

#### Scenario: Useful pilot with unresolved performance

- **WHEN** the pilot provides functional or user feedback while performance rows fail or remain unmeasured
- **THEN** those pilot findings are published with the unresolved rows and no stage 1 or full-MVP pass is declared

#### Scenario: Initial-use feedback

- **WHEN** the user reports initial usability impressions from the test view
- **THEN** feedback and defects are recorded while the original desk card remains available and EVERYDAY replacement acceptance remains separately pending
