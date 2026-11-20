# Spec Delta

## Purpose

Define the first complete reusable cover-based card candidate, with the desk as its synthetic acceptance composition. This contract covers observable candidate behavior and evidence; it does not establish production installation, physical desk success, stable public configuration or stage 1 performance acceptance.

## ADDED Requirements

### Requirement: Complete composition with independent roles

The candidate SHALL provide fixed identity/information, primary-control and three additional-action regions. A primary entity SHALL supply defaults, with explicit supported overrides for information sources and control/action targets. Changing one binding SHALL preserve all other roles. No private installation IDs SHALL be required defaults.

#### Scenario: Configure the full desk composition

- **WHEN** a cover, an independent height source and three distinct button actions are configured
- **THEN** the card presents the complete composition with each action directed to its own configured target

#### Scenario: Override a source independently of its action

- **WHEN** an information source or one effective action target is changed while other roles remain configured
- **THEN** only that role changes and no sibling source, label, target or action is replaced

#### Scenario: Identity defaults and overrides

- **WHEN** a primary entity is selected and then its displayed name or icon is overridden
- **THEN** the selected defaults or explicit overrides appear without altering control targets

### Requirement: Preserve source meaning and missing numeric data

The candidate SHALL display cover percent and independent height information with their own source units. It SHALL NOT derive physical height from cover percent or substitute zero for missing, unknown, unavailable or nonnumeric numeric-role data. Textual state information SHALL retain its meaning. An attribute binding SHALL read the selected attribute rather than a guessed alternative.

#### Scenario: Independent percent and centimeters

- **WHEN** cover position and the configured cm sensor change independently
- **THEN** each information region reflects its own source and unit without conversion between them

#### Scenario: Numeric information is absent

- **WHEN** a selected numeric position or height reading is missing, unknown, unavailable or nonnumeric
- **THEN** its limitation remains explicit without a fabricated zero, stale normal value or alternate source

### Requirement: Capability-aware cover actions

The candidate SHALL issue the supported open, close, stop and set-position intents with the effective cover target and required percent data. Unsupported, missing or unavailable targets SHALL NOT dispatch. Display overrides SHALL NOT redirect actions. Holding an endpoint button SHALL NOT replace its cover action semantics.

#### Scenario: Supported primary controls

- **WHEN** each supported primary control is activated once
- **THEN** exactly its corresponding cover intent is recorded for the effective target, including the selected percent for set-position

#### Scenario: Capability or target is unusable

- **WHEN** one action's required capability is absent or its target becomes missing or unavailable
- **THEN** that control cannot dispatch while independent usable controls remain available

### Requirement: Local position preview and explicit commit

During a position gesture the candidate SHALL change only a local requested-value preview. A completed changed pointer gesture SHALL commit exactly one finite percent request on release, without intermediate commands. Keyboard adjustment SHALL remain local until Enter commits once. Requested position SHALL remain distinct from actual HA feedback.

#### Scenario: Drag and release

- **WHEN** a user moves through several values during one valid position drag and releases at a changed value
- **THEN** no intermediate intent is recorded and exactly one set-position intent contains the final requested percent

#### Scenario: Duplicate completion events or unchanged value

- **WHEN** release is followed by native change/click events, or a gesture ends without changing an already known requested value
- **THEN** no duplicate intent is recorded and an unchanged gesture records no position intent

#### Scenario: Concurrent actual feedback

- **WHEN** HA position feedback changes while a local draft is being edited
- **THEN** actual feedback remains separately identifiable and does not overwrite the draft or trigger a command

#### Scenario: Keyboard commit and unknown feedback

- **WHEN** a user adjusts position with the keyboard and presses Enter, including when actual position feedback is unknown
- **THEN** at most one intent contains the explicitly selected finite percent; unknown actual feedback is not presented as the requested value or zero

### Requirement: Cancel interrupted position interactions

The candidate SHALL discard an uncommitted position draft after cancellation, Escape, focus loss, unexpected capture loss, disconnect, configuration/target change or target/capability loss. It SHALL revalidate the effective target and requested value before committing, including after confirmation. An interrupted gesture SHALL NOT replay after recovery.

#### Scenario: Cancel a gesture

- **WHEN** a pointer gesture is cancelled or loses capture before completion, or keyboard editing is cancelled with Escape or focus loss
- **THEN** no position or body intent is recorded and the draft is discarded in favor of separately observed feedback

#### Scenario: Invalidate the target during editing

- **WHEN** configuration, effective target, capability or availability changes before release or while confirmation is pending
- **THEN** the old interaction cannot dispatch to either an old or replacement target

#### Scenario: Reject an invalid request

- **WHEN** a commit would contain a nonfinite or out-of-range percent
- **THEN** the request is rejected visibly with no silently substituted value and zero dispatch

### Requirement: Three independently configured additional actions

The candidate SHALL provide three stable labeled action slots with independent supported action types and targets. The initial catalog SHALL include button press, entity details and none. Each configured memory press SHALL target its own button once. An available button reporting unknown SHALL remain pressable; its timestamp SHALL NOT imply selected memory or arrival.

#### Scenario: Activate each memory separately

- **WHEN** memory slots 1, 2 and 3 are activated separately with distinct button targets
- **THEN** each activation records exactly one button.press intent to that slot's target, zero sibling intents and no selected/reached-memory indication

#### Scenario: Never-pressed or unavailable button

- **WHEN** an available button reports unknown and a different button reports unavailable
- **THEN** the available button remains independently pressable and the unavailable button cannot dispatch

#### Scenario: Additional details or no action

- **WHEN** an additional slot is configured for entity details or none
- **THEN** activation requests only that configured entity's details or produces no action respectively

### Requirement: Separate body action and isolated inner activation

The body action SHALL be configured independently for entity details or none, defaulting to none. Inner controls and position gestures SHALL NOT trigger body actions. Body activation SHALL NOT move or unlock a cover or activate an additional action. Ordinary pointer, keyboard and tested touch activation SHALL preserve this separation.

#### Scenario: Activate inner controls and body separately

- **WHEN** each inner control and then the configured body area is activated by each recorded input method
- **THEN** inner activation records only its intended action and body activation requests only its configured details action

#### Scenario: Body action is none

- **WHEN** the body area is activated with no body action configured
- **THEN** zero action is recorded and keyboard/focus behavior does not imply an enabled action

### Requirement: Complete visual configuration and round trips

Every delivered binding, override, label, supported action option and confirmation option SHALL be configurable in the real HA visual editor from an initially empty configuration. Fillable incomplete fields SHALL remain editable with clear validation. Saving, reloading and reopening SHALL preserve the complete configuration without YAML edits.

#### Scenario: Create from empty

- **WHEN** the user selects the card and fills every role through the visual editor
- **THEN** incomplete fields remain editable, no preview action executes and a valid complete configuration can be saved without private default IDs or YAML

#### Scenario: Edit one binding after reload

- **WHEN** the complete configuration is saved, reloaded, reopened and exactly one source, target or action field is edited and saved again
- **THEN** that edit persists after a second reload/reopen and every untouched field remains identical

### Requirement: Honest failures and independent availability

Invalid configuration and missing/unavailable roles SHALL be identified without silent source/target substitution or false success. A failed display source SHALL NOT disable a separately valid action. Rejected actions, injected action errors and cancelled confirmation SHALL NOT produce a success, body action or physical-arrival indication.

#### Scenario: Display loss with independent usable action

- **WHEN** an information source disappears while its independent action target and sibling roles remain usable
- **THEN** missing information is explicit and the independent valid action and siblings continue to work

#### Scenario: Configuration error, action error or confirmation cancellation

- **WHEN** invalid configuration is rendered, an attempted action returns an injected error, or confirmation is cancelled
- **THEN** the relevant limitation/error/cancellation is represented, with zero unintended action and no claimed physical success

### Requirement: Recovery and truthful feedback

The candidate SHALL distinguish recorded local intent, supplied HA state and actual physical outcome. It SHALL NOT infer motion, arrival or memory selection from transport completion, time elapsed or a button timestamp. Reconnection/remount SHALL restore current information and saved configuration without replaying previous actions or abandoned drafts.

#### Scenario: Command without arrival feedback

- **WHEN** a memory timestamp, recorded/completed command or position update is supplied without physical-arrival evidence
- **THEN** the UI reports only the supplied information and never invents a reached/selected memory or automatic unlock

#### Scenario: Reconnect after an abandoned interaction

- **WHEN** the card disconnects during a draft or after an action and later reconnects with changed HA state
- **THEN** current feedback and bindings return, no old action/draft is replayed and the next explicit activation dispatches exactly once

### Requirement: Selective updates and lifecycle cleanup

Unrelated HA entity updates SHALL NOT mutate the candidate's role content. Relevant updates SHALL affect dependent information only. Configuration, theme and locale changes SHALL remain reflected. Disconnect SHALL release owned listeners, pending gestures and scheduled work without duplicate activation after repeated mount cycles.

#### Scenario: Relevant and unrelated updates

- **WHEN** an unrelated entity changes and then one bound display source changes
- **THEN** the first update leaves role content unchanged and the second changes only dependent information

#### Scenario: Presentation context and repeated lifecycle

- **WHEN** theme/locale changes and the candidate is repeatedly disconnected and reconnected
- **THEN** context and current data remain correct, owned work returns to baseline after removal and one subsequent activation produces one intent

### Requirement: Allocated layout and accessible input

The full composition SHALL adapt within recorded Sections/Masonry allocations without overlap or unintended overflow, including long labels and enlarged text. Controls SHALL have accessible names, visible focus, coherent keyboard order and reachable activation areas. Actual position, requested position and height units SHALL remain distinguishable.

#### Scenario: Complete composition layout matrix

- **WHEN** the full card is rendered at each claimed narrow/intermediate/wide allocation with the recorded themes, locales and text scales
- **THEN** all required information/actions remain usable without overlapping controls, clipped meaning or horizontal overflow

#### Scenario: Keyboard and emulated-touch operation

- **WHEN** the complete control order is traversed and activated through ordinary keyboard and the recorded touch method
- **THEN** names/focus identify the controls, position can be adjusted/committed/cancelled and ISOLATION is preserved for every activation

### Requirement: Synthetic-only candidate action boundary

This candidate delivery SHALL record validated synthetic action descriptors and SHALL NOT execute real HA services. Allowed targets, action types and required data SHALL be checked before recording. Preview/configuration changes SHALL NOT dispatch. Rejected real or unrelated targets SHALL never fall through to another transport.

#### Scenario: Record valid descriptors and reject other targets

- **WHEN** valid synthetic cover/button actions and then an unapproved target or action are activated
- **THEN** only the allowed descriptor is recorded and no service request is sent for either case

#### Scenario: Preview and other HA UI service paths

- **WHEN** the card is previewed or an action-bearing HA dialog/control is exercised in the lab
- **THEN** configuration causes no action and every service path remains intercepted or rejected before external dispatch

### Requirement: Explicit candidate coverage and acceptance boundaries

The delivery SHALL publish reproducible full-composition functional/layout coverage and candidate cost samples with actual conditions and limitations. It SHALL keep unresolved performance gates, reference-device and physical/everyday acceptance explicit. Historical two-slot passes SHALL NOT pass the changed candidate or establish production adoption.

#### Scenario: Candidate profile and unresolved limits

- **WHEN** candidate costs are reported beside comparable native/empty controls
- **THEN** subject hashes, workload/cache/count, samples and measurement boundaries are recorded; unapproved or unsupported metrics remain pending and no historical observation is relabeled fresh candidate acceptance

#### Scenario: Initial candidate handoff

- **WHEN** this implementation candidate is delivered
- **THEN** the report distinguishes demonstrated synthetic scenarios from pending stage 1, final-MVP, reference-device, real transport, physical and everyday validation
