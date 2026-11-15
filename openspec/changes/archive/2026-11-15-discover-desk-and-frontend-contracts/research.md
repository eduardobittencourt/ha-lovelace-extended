# Research

## Scope

Roadmap stage 0: D0 (actual example and problem), D1 (public frontend contracts and visual reference), and the protocol portion of D2. Determine which initial boundaries are justified for a reusable open source library, using the desk as the first concrete acceptance example. The research/documentation delivery has been executed below; runtime, rendered-fit, baseline and physical validation remain unperformed.

## Evidence

All observations below were made on 2026-11-14. Repository documents describe intent, not tested HA behavior.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The project has no implemented card; stages 0–6 are pending. | [README](../../../../README.md), [roadmap](../../../../docs/roadmap.md), working tree read on 2026-11-14 | Read project status and stage exits | No runtime inspected | Keep this delivery research-only |
| E2 | The MVP is a fixed desk composition, with entity/action details and native reference unresolved. | [MVP](../../../../docs/mvp.md), [decisions](../../../../docs/decisions.md), working tree read on 2026-11-14 | Read scope and open questions | Intent does not verify integration behavior | Investigate D0/D1 before dependent choices |
| E3 | The broader intent includes independent bindings, visual configuration, and later reuse; it is not limited to one desk. | [Manifesto](../../../../docs/manifesto.md), [architecture](../../../../docs/architecture.md), working tree read on 2026-11-14 | Read product intent and hypotheses | No evidence of reuse or performance yet | Use public comparative cases without adding implementations |
| E4 | The user explicitly requires references beyond their own installation and treats their desk as an example rather than the final objective. | Change request, 2026-11-14 | Direct requirement | No additional integrations or support matrix selected | Require public, independently understandable evidence |
| E5 | There are no existing consolidated specs or active changes before this change was created. | `openspec list --json` and `openspec list --specs --json`, local root, 2026-11-14 | Read CLI inventories | Inventory says nothing about HA behavior | No existing runtime delta; skip specs for this delivery |
| E6 | The desk exposes cover position/capabilities, a separate cm sensor and three button memories. | Read-only HA API and source register in [desk role map](#desk-role-map-task-13), 2026-11-14 | Selected GET state/service fields; local source inspection | No actions, firmware identity check or physical accuracy measurement | Separate data/action/feedback roles; no press-to-arrival inference |
| E7 | A public command-only MQTT cover can lack position feedback and report optimistic state. | Official docs and pinned Core source in [comparison matrix](#comparative-matrix-task-14), 2026-11-14 | Documentation/source comparison | Not installed or physically tested | Do not infer capability/physical certainty from the cover domain |
| E8 | The selected Core release pins frontend 20261028.5. | Versioned manifest/commit register in [frontend reference](#versioned-frontend-reference-task-21), 2026-11-14 | Live Core version plus release manifest and GitHub ref resolution | Cached client bundle not inspected | Pin source research; no minimum-version promise |
| E9 | Public card/editor boundaries and version-specific internal examples exist for the required investigation. | [Contract assessment](#frontend-contract-assessment-task-22), official docs and pinned source, 2026-11-14 | Read types and selected implementation paths | No library/editor runtime or rendered tests | Candidate experiment is justified; production mechanism is not settled |
| E10 | Button Card and Mushroom offer distinct composition/editor precedents at the reviewed revisions. | [Public precedents](#public-precedents-task-23), 2026-11-14 | Maintainer README and selected card/editor source | Not an exhaustive feature audit or benchmark | Learn specific approaches without adoption or speed claims |
| E11 | The user selected iPhone 14 Pro / Safari / iOS 27 and external HA lock controls. | Direct answers during execution, 2026-11-14 | Explicit user decisions | Device build/settings not independently observed | Fix primary validation target and lock boundary |
| E12 | No target-device baseline samples are available from this execution. | [Baseline assessment](#baseline-assessment-task-32), 2026-11-14 | Inspect available evidence and capture feasibility | No numerical performance conclusion possible | Keep stage 0 baseline/limits gate open |

At proposal creation these external investigations were pending. Execution started on 2026-11-14 (America/Sao_Paulo); UTC evidence timestamps may be 2026-11-15. The conventional project research directory was checked again and contained no prior material. An evidence workspace was established at `~/research/ha-lovelace-extended/discover-desk-and-frontend-contracts/`; source references and observations below record the executed investigations. Repository intent E1–E5 was rechecked against the working tree; none is reused as runtime evidence.

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| Independent information sources and action targets can describe the initial examples without embedding personal entity IDs or desk-specific meaning in reusable elements. | Role/data/action matrix for all three cases, with public sources for the comparative cases | Supported at the modeling level if each role can be expressed without installation constants; refuted if domain behavior is being hidden in a generic control. Runtime feasibility remains untested. |
| A fixed native-inspired layout and visual editor can cover the desk example without needing the future grid or expression engine. | Versioned native reference and explicit create/edit/error/reload flow descriptions | Supported as a design candidate if every required flow has a bounded region and editor path; otherwise narrow or revise scope before implementation. |
| Public contracts can carry core extension needs, with private frontend dependencies avoided or explicitly bounded. | Versioned API/source assessment for each required interaction | Supported only for extension points with evidence; gaps become blockers or future experiments rather than assumed stable APIs. |

## Open Questions

| Question / current status | Blocking or deferrable | Consequence / next evidence |
| --- | --- | --- |
| Actual desk data/actions: answered by read-only map; per-command physical outcome remains unverified | Physical validation deferred to its own task | Do not claim arrival, precision or firmware identity from API snapshots/source review |
| Public contrasting cases: answered for a bounded sample | Wider support deferred to stages 3/5 | Three-case matrix is evidence for modeling, not generic compatibility |
| Target/reference/contracts: selected and source-reviewed | Rendered fit remains blocking for stage 0 exit | Measure actual control/text dimensions on target; private HA elements remain version-coupled |
| Editor and independent bindings: candidate flows documented | Code validation deferred to separately scoped stage 1 experiment | Verify schema form sufficiency, save/reopen, events and dependency updates |
| Device: user selected iPhone 14 Pro / Safari / iOS 27 | Exact build, observed viewport, capture workflow and baseline limits block readiness | Capture target metadata and comparable native/current samples; numeric budgets remain unset |
| Lock scope: resolved by user | Existing HA lock controls retained | No automatic unlock or in-card lock control; report external prerequisite honestly |
| Stack, config format, update strategy and minimum supported version | Deferred until corresponding experiments/product decisions | A research target is not a compatibility guarantee |
| Grid, recipes and specialized integrations | Deferred to relevant roadmap stages | No new support promises from these examples |
| Open source license | Separate early task | Must be selected before presenting the repo as licensed open source |

## Research and Experiments

The following R1–R4 sections preserve the approved investigation plan. Executed observations, assessments and remaining gates are in Execution findings below.

### R1. Establish a bounded public reference matrix

Use three reference cases. This is purposeful sampling to expose assumptions, not a representative compatibility survey:

1. **Desk example:** relevant read-only HA data plus the selected integration's public documentation/source. Use role aliases rather than personal entity IDs. Record data source, unit, capability, action/parameters, availability, command acknowledgment, movement/arrival evidence, and limitations for primary controls and each memory.
2. **Non-desk cover:** choose one publicly documented cover integration/use case with a capability difference that matters (for example, absent position or stop support, if source inspection establishes it). Start with the [cover domain](https://www.home-assistant.io/integrations/cover/) and select an actual integration source. Do not manufacture a difference or claim the case was physically tested.
3. **Non-cover composition:** use a light plus an independently sourced sensor or action as an initial candidate. Consult [light](https://www.home-assistant.io/integrations/light/) and [sensor](https://www.home-assistant.io/integrations/sensor/) contracts and document whether the composition is a published use case or an explicitly constructed example. Do not portray a constructed example as user demand.

For each case, separate reusable presentation/binding needs, domain semantics, and installation mapping. Identify which desk assumptions fail elsewhere. Record URL, access date, version/commit where applicable, method, observed contract, limitations, and supported consequence. If a source cannot establish a capability, record it as unknown. Completion requires all three rows with traceable evidence; additional cases need a concrete unanswered question. No actions or device movement.

### R2. Research frontend contracts and precedents

Starting points, to be verified during execution:

- Official [custom cards](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/) and [card editor](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card-editor/) documentation; resolve redirects or moved pages and record the canonical source actually used.
- [Tile](https://www.home-assistant.io/dashboards/tile/), [Sections](https://www.home-assistant.io/dashboards/sections/), [dashboard actions](https://www.home-assistant.io/dashboards/actions/), and [selectors](https://www.home-assistant.io/docs/blueprint/selectors/). Selector documentation alone does not establish a supported frontend component API.
- [HA frontend source](https://github.com/home-assistant/frontend), pinned to a release/revision corresponding to the selected target. Distinguish documented extension points, observed implementation, private elements, and experiment-dependent assumptions.
- Public maintainer documentation/source for [Button Card](https://github.com/custom-cards/button-card) and [Mushroom](https://github.com/piitaya/lovelace-mushroom), initially limited to independent bindings/composition and visual editor precedents. Record actual support, omissions, revision, and relevance; replace an inaccessible source transparently. A precedent is not a dependency choice or a stable HA contract.

Completion requires a versioned contract table for lifecycle/configuration, state updates, editor persistence, selectors/actions, event handling, themes/language, sizing, and accessibility. Derive candidate fixed regions and create/edit/reload/error flows, noting which need code validation. No external code adoption or installation.

### R3. Define validation and baseline methodology

Record HA/frontend version, native reference, current desk solution where comparable, browser/device, viewport, language/theme, network conditions, cache state, card/element counts, observation tools, repetitions, and raw-evidence destination before measurements. A reference version/device is a research target, not a universal minimum support guarantee.

Cover cold/warm loading, transferred/executed JavaScript, local control responsiveness, relevant/unrelated entity updates, memory after ordinary use and mount/unmount cycles, and editor loading separately from runtime. Specify comparable workloads and report median/spread or another justified summary. Separate UI response, HA transport, and physical device latency; mark unobserved phases as unmeasured. Define keyboard/touch/focus, unavailable/missing entities, action errors, save/reopen, and reconnection scenarios without disrupting live HA.

During research execution, existing-surface baselines may be collected only with passive, non-actuating observations and existing tools. If access, new code, physical commands, or environment changes are needed, record pending work for a separately scoped task. Proposed-card costs remain unmeasured until a later experiment. Set acceptance limits only from justified reference observations and user requirements; otherwise keep the implementation gate open. Completion requires the reproducible protocol and an honest baseline/threshold status, not fabricated numeric results.

### R4. Prepare a future bounded experiment, without running it

If R1–R3 support proceeding, describe a later stage 1 experiment: two elements with distinct bindings, visual editing and save/reopen, isolated inner/body actions, lifecycle cleanup, relevant/unrelated updates, and theme/language changes. Its hypothesis is acceptable binding/editor cost under the selected protocol. Its pass/fail gates must trace to measured baseline limits; if these are pending, the experiment is not yet ready to run. Code/dependency changes, synthetic updates, and any physical commands require their own later scope. This delivery only records the plan and evidence destination.

### Evidence handling

Keep auxiliary sources, captures, and raw observations under `~/research/ha-lovelace-extended/discover-desk-and-frontend-contracts/`. Publish sanitized conclusions, citations, and role-based examples in this change and affected docs so another contributor can assess them without private access. Do not store credentials, full private configurations, or personal installation inventories.

## Execution findings

### Public case selection (task 1.2)

Selected on 2026-11-14: an MQTT roller shutter using only a command topic, based on the official [MQTT Cover example](https://www.home-assistant.io/integrations/cover.mqtt/), and an explicitly constructed light-plus-temperature-sensor composition based on the official [light](https://www.home-assistant.io/integrations/light/) and [sensor](https://www.home-assistant.io/integrations/sensor/) contracts. The first challenges assumed position/arrival feedback; the second challenges assumptions that every information source is also the action target, or that all numeric values share a scale. Neither was installed or physically tested, and the constructed composition is not evidence of user demand.

### Desk role map (task 1.3)

Read-only authenticated REST GETs on 2026-11-14 returned HA **2026.11.1**, language **pt-BR**, a primary `cover` with `current_position` and `supported_features: 15`, three `button` memory targets, a distance sensor in **cm**, and separate lock/connectivity/problem entities. Service metadata exposes `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, `cover.set_cover_position` (position), and `button.press`. No action was called. The sanitized mapping is preserved in [docs/mvp.md](../../../../docs/mvp.md); no personal entity IDs are needed.

The local desk firmware configuration and coordinator/limit source were inspected, not deployed. File SHA-256 identifiers: configuration `c49e94c614401f638d744d559c8a7df1a167ea87ef75ef6fe51ddeeb01813cbd`, limits `ca10025c38e9ffd767333d93f6bada9bd477f1ebd46a66300447a7338f8d8cf4`, coordinator `d5c9c75fd0c358fdfb83c8581292166b4ea3d44d8ec21a3071199311b63e30fa`. Local source is private and is not a normative public dependency. It uses a non-optimistic template cover, maps a 62–128 cm range, and can log a locally rejected cover/memory command without exposing that rejection as an HA service error. Thus successful transport is insufficient to report execution or arrival. The inspected button entities expose no memory target/arrival attributes. Current state observation establishes neither movement accuracy nor firmware identity.

Public grounding: [ESPHome template cover](https://esphome.io/components/cover/template/), [HA button contract](https://www.home-assistant.io/integrations/button/), and Core 2026.11.1 [ESPHome cover](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/esphome/cover.py) / [ESPHome button](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/esphome/button.py) source. The cover adapter rounds normalized position to integer percent; the button adapter issues a command, not a per-memory arrival acknowledgment. Public sources were read on 2026-11-14, and their scope is the HA/ESPHome contract rather than the private controller implementation.

### Comparative matrix (task 1.4)

The two public examples were reviewed through documentation and source, not installed. All source accesses below occurred on 2026-11-14 local time.

| Case / provenance | Data, actions, availability and feedback | Reusable needs versus domain behavior | Installation mapping and conclusion |
| --- | --- | --- | --- |
| Desk: observed HA entities and local source, with public ESPHome contracts above | Cover percent and separate cm sensor; endpoint/position/stop actions; three memory presses; independent lock, connectivity and problem information. No per-memory arrival report. | Independent display/action bindings and separate status indicators are reusable; range conversion, motion guards and memory protocol belong to this device/integration. | Role aliases in docs/mvp.md; no private IDs. Use the cm source directly and never turn a press into a selected/reached indication. No physical test performed. |
| MQTT roller shutter: documented command-only configuration, adapted from the official [MQTT Cover example](https://www.home-assistant.io/integrations/cover.mqtt/) | Without state/position topics, reported open/closed state is optimistic. Exact position may be absent; a stop command can be disabled by configuration. Availability depends on configured reporting. | Same cover domain does not guarantee percent/stop or physical feedback. Capability-aware controls and honest absence of data are reusable. MQTT payloads/configuration remain integration concerns. | Illustrative role `cover.reference_shutter`, not an actual installed entity. Core 2026.11.1 [MQTT implementation](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/mqtt/cover.py) `_setup_from_config` derives features from command/position configuration and sets assumed state for optimism. No compatibility claim or measured movement. |
| Light plus temperature sensor: explicitly constructed comparison from [light](https://www.home-assistant.io/integrations/light/) and [sensor](https://www.home-assistant.io/integrations/sensor/) contracts | Display a sensor's value/unit independently of light on/off control. Sensor unavailable/unknown must not erase a valid light state or redirect its action. Brightness is optional, not inferred from domain alone. | A generic numeric control cannot reuse cover percent semantics for brightness or temperature; independent bindings and per-element availability are reusable. | Illustrative roles `light.reference_lamp` and `sensor.reference_temperature`. This is a modeling counterexample, not observed user demand. Core [light implementation](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/light/__init__.py) corroborates that light behavior is domain-specific. No extra card implementation is included. |

**Consequence:** The modeling hypothesis is supported for these bounded examples: the source of displayed information, action target, and feedback source need independent representation. It does not establish a universal binding engine or runtime feasibility. A blanket rule disabling every control whose entity state is `unknown` would incorrectly treat the desk memory buttons as unavailable; state interpretation must respect the domain.

### Versioned frontend reference (task 2.1)

**Selected research target:** Core **2026.11.1**, observed through authenticated read-only API. The release's [frontend manifest](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/frontend/manifest.json) pins **home-assistant-frontend 20261028.5**. The corresponding frontend commit is **e32bc0696ebefde323f5b791269ad0c57f3f99d9**; Core tag resolves to **d8a0dc698c8946b44e455d904000db563cfbf1ba**. GitHub commit APIs and raw source were read on 2026-11-14, with copies under the research sources directory. This is a release-source match, not verification of the active browser's cached bundle or a minimum supported version.

**Selected visual research reference:** horizontal Tile with bottom-aligned controls in Sections, using the [public Tile documentation](https://www.home-assistant.io/dashboards/tile/) and pinned [card implementation](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/cards/hui-tile-card.ts). Its icon/name/state area and control area fit the bounded composition better than beginning with a free grid. This selection does not adopt Tile's private elements. Source inspection establishes layout structure, not rendered fit or visual equivalence on the iPhone.

### Frontend contract assessment (task 2.2)

Official contributor pages were read on 2026-11-14; the card and editor pages show updates dated October 12 and October 14, 2026. Documentation is rolling; source observations below are pinned to frontend **e32bc0696ebefde323f5b791269ad0c57f3f99d9**. The proposal's older developer-doc URLs are superseded here by the contributor documentation. This table records observations and research consequences, not an adopted implementation.

| Interaction | Evidence and classification | Cost/compatibility consequence and remaining check |
| --- | --- | --- |
| Configuration/lifecycle | Documented custom-element boundary, `setConfig`, `hass` and standard connect/disconnect callbacks; [custom card guide](https://contributors.home-assistant.io/frontend/custom-ui/card/) and pinned [Lovelace types](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/types.ts) | Reject invalid config; release subscriptions/listeners on removal. Verify cleanup and reconnect in the later experiment. |
| Selective updates | The guide permits context subscriptions; pinned [context definitions](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/data/context/index.ts) separate states, UI, internationalization and API data | A states-only consumer misses locale/theme/context changes; context selection is not proof of per-element performance. Compare context versus hass delivery in the experiment before selecting a strategy. |
| Visual editor/persistence | Documented `getConfigForm` or `getConfigElement`; a custom editor emits complete `config-changed` payloads. [Editor guide](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/), pinned types and [Tile editor](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/editor/config-elements/hui-tile-card-editor.ts) corroborate the boundary | Begin investigation with schema forms; prove independent nested fields, no lost siblings, and reopen behavior before choosing form-only versus custom editor. Tile dynamically imports its editor; measure any equivalent separation rather than assume savings. |
| Selectors/actions | Official [dashboard action schema](https://www.home-assistant.io/dashboards/actions/) describes user behavior. Pinned [ui_action selector](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/components/ha-selector/ha-selector-ui-action.ts) delegates to an internal editor | Schema-driven selector use has a documented form route; direct `ha-*`/`hui-*` instantiation and internal `handleAction` imports are version-coupled. Do not promise all action types or helper stability from this inspection. |
| Inner/body event isolation | Pinned [cover feature](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/card-features/hui-cover-open-close-card-feature.ts) and Tile stop propagation in inner handlers; native cover feature checks capability flags | Internal example, not a reusable public action helper. Later tests must prove single dispatch for touch and keyboard and no body action, including confirmation/cancellation and action errors. |
| Locale/theme | Tile uses HA name/state formatting; [theming guidance](https://contributors.home-assistant.io/frontend/architecture/theming/) and pinned context definitions distinguish UI and internationalization | Use localized state/unit/name semantics and theme inputs. A bound-entity-only update filter is insufficient. Exact token/helper usage and style response need version-aware validation. |
| Sections/masonry sizing | Documented `getGridOptions` versus `getCardSize`, corroborated by pinned types/Tile | Tile defaults to six columns, increasing rows for bottom features. This does not prove a desk with three extra buttons fits the same size. Validate narrow widths, text scaling, and viewport changes before fixing minimum dimensions. |
| Accessibility | Pinned Tile uses group labeling and labeled inner controls; the cover feature supplies control labels. Native [tile container](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/components/tile/ha-tile-container.ts) is an internal example | Source labels do not establish keyboard or screen-reader success. Use semantic controls and verify focus, names, touch, VoiceOver and text size on the target. Do not copy private DOM. |

No production stack or internal HA component dependency is selected. The public extension boundaries are sufficient to plan an experiment; their runtime correctness and performance remain untested.

### Public precedents (task 2.3)

Access date: 2026-11-14. Method: read maintainer README and selected source at resolved commits; no packages were installed, benchmarked, or copied into the project.

| Reference | Observations and relevance | Limits / consequence |
| --- | --- | --- |
| Button Card, commit `dfa304f93ab73b41011b624960657c568672e9c9` ([README](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/README.md), [card source](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/src/button-card.ts)) | Independent icon interactions, custom fields, JavaScript templates, and explicit monitored-entity/update logic demonstrate flexibility and the need to track dependencies. | The reviewed card class exposes neither `getConfigElement` nor `getConfigForm`; the README/source reviewed do not establish the complete visual configuration required here. Arbitrary JavaScript/CSS is outside this MVP. No speed or maintenance ranking is inferred. |
| Mushroom, commit `68bc1ba6d3e480caedae28635bec24701c3a26e2` ([README](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/README.md), [template card](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/cards/template-card/template-card.ts), [editor](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/cards/template-card/template-card-editor.ts)) | The template editor exposes primary/secondary content and separate body/icon actions through forms. The card has template subscriptions and disconnect cleanup. | A visual field accepting a template is not the same as independent typed bindings without expressions. Template transport, subscriptions and internal form dependencies have costs not measured here. The library must prove its own simpler contract; no code or dependency is adopted. |

### Proposed regions and editor flows (task 2.4)

The [MVP flow description](../../../../docs/mvp.md#candidate-layout-and-editor-flows) is derived from the verified desk map, comparative cases, and pinned Tile/editor assessment. It is a paper-level candidate: full-section width and three vertical regions (identity/information, primary controls, additional actions). Source observations support this structure, not exact rendered dimensions. The initial code experiment must determine whether form schemas cover each independent source/action field without dropping sibling configuration.

The user resolved lock scope on 2026-11-14: keep lock/unlock in existing HA controls. No automatic unlock or in-card lock control is added. This external prerequisite must be recorded in physical-use validation; source/API evidence alone cannot demonstrate the complete desk experience.

### Reference environment and protocol (task 3.1)

The user selected **iPhone 14 Pro / Safari / iOS 27** on 2026-11-14. These are user-reported; exact OS build, Safari/WebKit version and display settings must accompany measurement. A desktop run cannot substitute for the selected device.

| Field | Selected condition / required capture |
| --- | --- |
| Server/reference | Core 2026.11.1 / frontend 20261028.5; horizontal Tile with bottom controls in Sections. Verify active browser asset hashes/cache before capture. |
| Current solution | Existing desk controls; relevant layout equivalence has not been inspected. Compare only equivalent information/control workloads. |
| Dimensions | Planned portrait test scenario: 393 × 852 CSS pixels, not an observed viewport. Record actual `innerWidth/innerHeight`, visual viewport/scale, pixel ratio, toolbar/keyboard state and orientation. Preserve actual usable dimensions; repeat landscape and enlarged text separately. |
| Language/theme | pt-BR initially and English comparison; default light/dark themes, normal and enlarged text. Confirm the client's locale independently of the server. |
| Connection | Same local Wi-Fi and HA route for comparisons; capture route class/latency without publishing private URLs. Remote runs, if later requested, form a separate set. |
| Tools | Safari Web Inspector/Timelines/Network, using an existing trusted Mac connection if available. Availability/pairing is not verified. No pairing change, installation or substituted Chromium benchmark is included in this delivery. |
| Evidence | Raw samples/traces under the project research directory, sanitized summaries and sample IDs in research.md. Do not publish authenticated HAR headers, private URLs or entity inventories. |

Protocol for a later measurement session:

1. Capture metadata, power/thermal state and idle background activity. Verify cache disabled/cleared for cold runs and preload once for warm runs. A reload alone does not establish a cold cache.
2. Plan 10 cold and 10 warm samples per comparable surface. Record first-usable timing, transferred JavaScript, execution/main-thread work and long tasks where exposed. Publish samples, median and range; do not estimate robust tail percentiles from this small set.
3. Compare one card, ten cards, two bindings per experimental card and a recorded higher binding count. Match entity/control content where possible and identify non-equivalent cases rather than publish misleading ratios.
4. In the later isolated experiment, deliver relevant versus unrelated entity updates at one per second for 60 seconds, plus a separately recorded burst. Count deliveries, renders/DOM changes and execution; repeat theme, language and configuration changes. These are chosen synthetic workloads, not observed HA traffic.
5. Plan 30 non-actuating action-stub interactions for input-to-next-frame observations. Measure HA completion and device feedback separately in later authorized integration/physical work. A press timestamp is not an arrival clock.
6. Record memory before/after ordinary use and 20 mount/unmount cycles with a fixed settling interval. Count retained subscriptions/listeners; use heap numbers only where tools expose comparable measurements. One noisy sample does not establish a leak.
7. Open the editor after normal-use captures and measure incremental loading separately. Save/reload/reopen runs belong to a later isolated environment, not live dashboard edits in this research.

Sample counts and test viewport are protocol choices, not performance targets. Baseline-dependent numerical acceptance limits remain unset pending actual device observations and review of acceptable regressions.

### Baseline assessment (task 3.2)

**Status: unmeasured.** This session has authenticated HA API reads and source access, but no provided iPhone Safari traces, established authenticated device capture session, or comparable prior measurements. No pairing, browser configuration, HA action, or physical test was performed. Devbox API GET duration would not measure iPhone rendering, so it was not substituted.

| Surface / metric | Samples | Result |
| --- | --- | --- |
| Native Tile load/execution/responsiveness/memory on target device | 0 | Capture pending |
| Current desk solution under equivalent conditions | 0 | Equivalence assessment and capture pending |
| Proposed library and editor | 0 | No implementation exists |
| HA command / physical movement latency | 0 | No commands executed |

The assessment task can complete with this explicit feasibility/gap report; baseline collection and threshold-setting do not complete. The stage 0 baseline checkbox remains unchecked. Next evidence needed is an available target-device capture workflow and samples under the protocol. No numeric performance promise is supported.

### Validation scenarios (task 3.3)

| Scenario | Expected evidence | Execution boundary |
| --- | --- | --- |
| Cold/warm runtime and first editor load | Requests/timings with cache state, assets and incremental editor cost | Later target-device capture |
| Relevant/unrelated updates and locale/theme/config changes | Correct visual output and measured dependency-specific work | Later isolated synthetic experiment |
| Remove/reinsert, hidden view, reconnect | Released resources, restored display, no stale/replayed actions | Later harness; no live network disruption |
| Invalid config, missing/unavailable/unknown data | Distinct messages/enabled states; absent numbers remain absent; available never-pressed buttons remain usable | Later synthetic fixtures, not production entity changes |
| Visual creation and independent edits | Complete save/reload/reopen without lost sibling fields; preview sends no actions | Later isolated dashboard |
| Inner/body action, confirmation cancel, HA failure | One intended stub dispatch, zero parent dispatch, no false success | Later non-actuating harness, then separately scoped integration checks |
| Touch, keyboard, VoiceOver, text size, themes and rotation | Names, focus, reading order, usable targets and no clipping at recorded widths | Later iPhone validation; external keyboard availability must be recorded |
| Desk movement and three memories | Device evidence distinct from transport; no invented selected/reached state | Later explicitly scoped physical task only |

### Future stage 1 experiment and gates (task 3.4)

**Hypothesis:** a fixed native-inspired card with two independently bound elements can be visually configured, saved/reopened and selectively updated at acceptable measured cost, without event leakage or retained resources. No stack, config syntax or context strategy is selected here.

Bound the later change to one fixed surface, two public role-based fixture entities (information from one and action to another), native comparator and action stub. Use the public matrix as a modeling review, not additional implemented cards. Synthetic writes stay in an isolated harness. A separate proposal must identify any code/build/dependency changes and their side effects.

**Functional pass/fail:** all delivered options are visually editable; one changed binding survives save/reopen without changing its sibling; inner dispatch count is one and body count zero; errors/cancellation never show success; missing/unknown/unavailable states remain domain-correct; reconnect does not replay actions; subscriptions/listeners are released; locale/theme updates remain correct without an entity change.

**Performance pass/fail:** compare target-device response, transfer/execution, update work and retained resources to reviewed baseline budgets. Numeric budgets are **unset**; no performance success can be declared until that gate closes. No monotonic retained subscription/listener growth is a correctness gate independent of timing budgets.

**Go/no-go:** confirm actual device metadata and a practical capture path, collect comparable native/current samples, review limits and scope decisions affecting the experiment, then explicitly request a separate experimental change. Open gates prevent declaring the experiment ready. Preserve raw results under the project research directory and durable findings in that change's research.md. A successful prototype is not automatically production code.

## Outcome

**Research/documentation delivery: complete within its stated observation limits.** E6–E10 establish the read-only example contract, public counterexamples, release-matched frontend reference and precedent assessment. E11 closes the reference-device and external-lock choices. The fixed-region/editor candidate, reproducible protocol, validation scenarios and future experiment gates are documented. E12 records absence of baseline evidence; this is not a successful benchmark.

**Roadmap stage 0 exit: not met.** Rendered fit/minimum dimensions, observed iPhone browser metadata, comparable native/current baseline captures and justified numerical acceptance limits remain open. API/source inspection does not prove physical movement or everyday user acceptance. No stage 1 code experiment, product implementation, dependency installation, HA change or physical command was executed.

Affected README and MVP/architecture/discovery/decisions/roadmap/OpenSpec documents were reconciled. The roadmap marks only the specific source/contract research items evidenced here; broader readiness and later stages remain pending. The desk is an acceptance example inside a reusable library, and comparative examples are not support promises. License selection remains a separate early task.

Validation: strict OpenSpec validation passed, local Markdown file links resolved, and the diff/whitespace and targeted private-data checks passed. External source hashes are recorded in `source-hashes.json` under the research workspace, with public versions/URLs preserved in this document. Structural checks do not verify runtime behavior or measured performance. Review this limited research outcome before requesting archive; do not treat a complete task counter as permission to proceed past the remaining stage 0 gates.

## Archive record

Archived on **2026-11-15** after confirming all artifacts complete (runtime specs deliberately skipped) and all **16/16** tracked tasks complete. The requested sync was assessed against the CLI-reported delta paths: none exist, consistent with `skip_specs: true`. No main specs were created or changed. Repository links and archived relative links were updated for the new location. The stage 0 measurement/rendered-fit gates recorded above remain open; archiving this research does not close them.
