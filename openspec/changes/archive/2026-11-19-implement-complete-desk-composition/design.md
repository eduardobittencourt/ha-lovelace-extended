# Design

## Context

See [proposal](proposal.md#why), [research E1–E9](research.md#evidence) and the [fixed-composition contract](specs/fixed-composition-card/spec.md). The only implemented card is the frozen two-slot experiment; its normalization, recorder and measured subject cannot be broadened in place. This design is necessary because the complete candidate adds domain controls, a gesture state machine, independent availability and a much larger visual configuration.

## Goals / Non-Goals

**Goals:** a reusable complete composition with a small inspectable configuration/binding/action boundary, a real editor and independently testable gesture behavior. Keep the new candidate and its evidence identifiable without altering the measured baseline.

**Non-Goals:** a generic layout/expression/action engine, final production renderer selection, real action transport or an implicit performance-gate waiver. Physical/reference-device/everyday acceptance remains outside this candidate delivery.

## Decisions

### 1. Isolate a maintained candidate and reuse proven mechanisms cautiously

Place maintained runtime/editor modules, tests, private package metadata and reproduction material under `candidates/fixed-composition-card/`. Use a browser-native custom element and ordinary hass delivery as the reversible candidate baseline, with native HTML controls and CSS variables. A private module-mode package can run Node's built-in tests without a runtime dependency or build pipeline. Reuse the already pinned Playwright/Chromium installation for tests; install no new host tool or framework.

This uses E2/E5's demonstrated mechanisms to implement functional requirements; it is not a cost-based production stack choice or adoption of the old code/API. Keep reusable functions internal until further use cases justify a stable library contract. Preserve all old runtime/editor sources, dependency locks, main specs and archived measurements.

Suggested module responsibilities:

| Candidate area | Responsibility |
| --- | --- |
| config.js | Normalize candidate-only flat configuration; return field errors and role models without inventing bindings |
| bindings.js | Resolve state/attribute values, units, independent sources and effective targets |
| cover.js | Evaluate target-specific capabilities/availability and construct cover intent data |
| position.js | Pure gesture/draft transitions, generation checks and single-commit decisions |
| actions.js | Validate typed descriptors; record/reject through the candidate-only sink; no service transport |
| ha-adapter.js | Small pinned icon/details integration and formatter boundaries |
| card.js / card.css | Stable DOM, responsive fixed regions, selective patches and event wiring |
| editor.js, only if needed | Dynamically loaded getConfigElement fallback with complete configuration events |
| test/ | Maintained unit/browser contract assertions and synthetic fixture definitions |

Alternative: extend the old experiment or build a generic component engine. Rejected because the former invalidates frozen evidence/allowlists and the latter adds unneeded scope before the complete use case is demonstrated.

### 2. Persist a bounded flat configuration and normalize roles internally

Use stable role identities rather than an arbitrary element list. Proposed candidate fields are implementation details, not a public versioned format:

| Group | Proposed fields / behavior |
| --- | --- |
| Identity | primary_entity; optional name and icon overrides; absent overrides inherit primary metadata |
| Information | state_entity/state_attribute and height_entity/height_attribute; omitted state source inherits primary; height uses the configured sensor directly and retains its HA unit |
| Primary actions | open_target, close_target, stop_target, position_target; absent overrides inherit primary; evaluate each effective target independently |
| Additional slots 1–3 | action_N_label, action_N_type and action_N_target; supported types press, more-info and none; press requires a button target |
| Body | body_action none/more-info and body_target; none is the default; details target inherits primary only when no explicit override exists |
| Confirmation | confirm boolean, visually editable; applies before recording action intents; cancellation records nothing |

Normalize absent optional overrides as explicit inheritance, preserving the distinction between no override and a broken configured entity. Invalid explicit bindings never fall back to primary. Read units and values from their actual sources; do not invent percent-to-cm conversion, memory state or position feedback. Validate attributes as observable values, representing unsupported/nonfinite data explicitly. Never use a blanket unknown=unavailable rule: E1 requires available never-pressed buttons to work; E3 permits missing position feedback.

Allow partially filled configuration to render a non-dispatching validation state. getStubConfig can suggest an available cover from HA-provided candidates; with no suitable entity it remains incomplete and editable. Do not prefill private/synthetic fixture IDs in the card's default config. Form assertConfig rejects unsupported structural shapes, not fillable missing fields that would otherwise disable the editor (E5).

Alternative: a nested general binding/action schema. Deferred because the bounded flat shape is already supported by evidence and covers the complete candidate without assuming nested form behavior.

### 3. Separate preview, feedback and commit through a gesture state machine

The position controller stores feedback, nullable draft, baseline request, active pointer, dirty flag, config generation and effective target identity separately. The displayed current percent/cm always comes from HA. A range control represents requested percent only; with unknown current feedback, its idle/internal default must not be announced or displayed as measured data. Require an explicit finite selection before recording. Use integer percent steps from 0 through 100 as the candidate UI default; reject invalid/nonfinite external values rather than silently coercing a different request.

```text
idle --> editing --> validating --> confirming (if configured) --> recorded --> idle
           |              |                |
           +--------------+----------------+--> cancelled/rejected --> idle
```

- Pointer input changes the draft only. Track the initiating pointer and explicit release; consuming native input/change/click does not independently commit. Claim the commit token before asynchronous work so repeated completion events cannot dispatch twice.
- Release commits once only when changed and still valid. Expected capture loss after a handled release is cleanup; unexpected capture loss before release cancels. Treat pointercancel, Escape, window/focus loss, detach and config/target changes as cancellation.
- Keyboard arrows/Home/End change only the draft. Enter commits once; key repeat and later native change events cannot duplicate it. Escape and leaving focus cancel the draft. Provide helper text and accessible names describing this candidate behavior.
- Keep concurrent HA feedback current without replacing the draft. On cancellation show the latest real feedback. On commit do not overwrite actual state or display requested percent as arrived.
- Immediately before recording, and again after confirmation, validate connection, generation, target identity/domain, capability, availability and finite range. An old generation cannot act on a newly configured target. Recovery never replays a gesture.

These defaults implement the maintainer's release-only choice (E4) while E6 motivates explicit cancellation. Exact event wiring is verified by browser tests, not inferred from a single native change event. Alternative: send on every input event or debounce movement commands. Rejected because both change the confirmed external behavior and can execute intermediate movement requests.

### 4. Use typed local descriptors and keep all service paths blocked

Represent candidate intents as immutable action kind, effective entity target, validated data, origin role and gesture/activation identity. Primary kinds map to cover.open_cover, close_cover, stop_cover and set_cover_position; the latter carries the requested percent unchanged. Additional press maps to button.press; details and none are UI-only actions. Do not add an arbitrary service/data editor or evaluate expressions.

The candidate's default sink cannot call hass.callService, REST services or WebSocket call_service. It records only approved synthetic fixtures; absent/real/unapproved targets are rejected explicitly, without fallback. The lab injects deterministic record/error/cancel behavior. A details request can reach the pinned HA UI only through the synthetic adapter after target validation; it is otherwise recorded/rejected like other UI intents. Native HA dialogs remain under the browser's catch-all service interception. No transport enable switch is provided in this delivery.

The external lab interceptor rejects every service message before send, including unknown actions/targets and REST/XHR service routes. Allowlisted descriptors must match the fixture manifest and exact permitted data. Never modify the legacy input_boolean recorder to forward new domains. Real transport will require a separately scoped adapter and revalidated installation capabilities.

Use isolated ha-icon and entity-details adapters supported by the pinned source observations in E9, without copying their implementation, importing private helpers or querying HA's private shadow DOM in runtime code. Verify registration, loading/error behavior and icon overrides in the lab. Labels/actions stay usable if decorative icon loading fails; report missing icon support rather than claim wider compatibility. Shared icon/dialog resources count in the profile.

Alternative: directly reuse HA's internal handle-action implementation. Rejected because it adds unbounded action/transport paths and undocumented dependency coupling.

### 5. Start with the actual schema form and preserve a scoped fallback

Expose all flat fields with entity/text/icon/select/boolean selectors and explicit labels/helpers. Initial action choices are the bounded supported catalog, not a free JSON/YAML field. Do not require dynamic conditional visibility for correctness: all supported fields can remain visible, with validation explaining applicable targets. Use static grouping only when the pinned form supports it without changing persisted shape.

Pilot from empty through complete save/reload/reopen, then edit every field independently with exact untouched-field comparison. Include default/inherited values, explicit overrides, unknown buttons, confirm, body none/details and all three slots. Preview never executes an action. Do not treat a stub configuration, DOM-only mock or YAML workaround as editor success.

If the complete schema form cannot represent these requirements, record the specific failed pilot and use the already documented getConfigElement path within the same candidate. Keep custom editor loading separate through dynamic import and emit complete normalized config events preserving siblings. This conditional implementation branch is scoped now; it does not permit dropping fields or claiming missing editor behavior as equivalent.

Alternative: implement a custom editor immediately. Rejected until a specific form limitation is observed (E5 and the agreed MVP sequence).

### 6. Adapt fixed semantic regions and update only affected content

Create DOM once per instance. Use an identity/information body-action area and separate sibling native controls, avoiding nested interactive buttons. Use a fixed primary-control group and three stable additional-action slots; responsive CSS wraps these within HA-allocated space instead of introducing a user grid. Identity/details activation remains independent of all inner controls and position gestures.

Rebuild binding dependencies on configuration changes; compare actual bound values/availability plus theme/locale context on hass delivery. Patch dependent text, attributes and control state only. No polling, timer per card or extra server subscription is needed. Clear per-role statuses/drafts on relevant reconfiguration; disconnect releases handlers/capture and pending work. Async results must verify instance/generation before touching UI. Render untrusted names/data with text nodes and validate icon/attribute identifiers; do not inject HTML from configuration or state.

Use getGridOptions and getCardSize as allocation hooks, not proof of fit. Validate actual card widths near 240, 360 and 500 pixels in Sections/Masonry with ordinary/long labels, normal/200% text, light/dark themes and en/pt-BR formatting. Record actual allocation; if a tested minimum fails, fix layout or document a supported minimum with a demonstrated usable allocation rather than silently count it as passing. Preserve accessible names, focus order and requested/actual/unit distinctions.

Alternative: copy Tile's private DOM or exact footprint. Rejected because complete controls/actions need their own rendered evidence and should not depend on undocumented structure (E1/E3/E9).

### 7. Make validation proportional and distinguish it from acceptance

Pure unit tests cover normalization, independent targets, typed descriptors, capability combinations, domain-specific unknown states and all gesture transitions. Maintained browser contract assertions are executed by an external runner using the existing pinned Playwright/browser installation; raw scripts/acquisitions/captures stay outside the checkout and are reconstructed from published sources/hashes. The runner can adapt versioned HA tools into a separate private candidate state, leaving the legacy experiment files and historical state/evidence intact.

Use Core 2026.11.1 / frontend 20261028.5 and Chromium 159.0.8154.6 as the initial lab target, without establishing a minimum-version or Safari policy. Seed synthetic cover/sensor/button states and inject rejected/error/disconnect/capability cases; require the full source/target and error matrix, not only default configuration. Freeze fixture/subject and adapter hashes before integrated capture. Ordinary keyboard/emulated touch is bounded input evidence, not physical touch or actual reference-device acceptance.

For a bounded initial candidate profile, use the following recorded schedule, separately from the completed stage 1 campaigns:

| Profile | Planned observations |
| --- | --- |
| Load | Three fresh-context cold/same-context warm pairs per native/empty/candidate variant and one/ten groups |
| Editor | Three first-open/reopen pairs per variant/count; empty is setup-only |
| Updates | One 10-second relevant and one unrelated window per rate (1 Hz and exploratory 20 Hz), variant and count; this is a short diagnostic, not the earlier 60-second sustained workload |
| Local input | Ten idle activations per variant/count and ten more during a separate 10-second 20 Hz relevant-update window; keep its CPU separate from update-only work |
| Lifecycle | Fifty mount/remove/reinsert cycles with owned-listener/work counts and a subsequent single activation; no retained-byte attribution claim |

Native context should represent the complete feature set using a capability-aware cover Tile/control group, a height Tile and three button Tiles; verify actual service/position/resource equivalence first and publish mismatches. Empty remains shared-shell/driver context. Never pool these changed workloads with old two-slot/three-Tile samples. Preserve full ranges, valid slow observations, invalid reasons, delivery/final-state checks and observer limitations. This profile is intentionally smaller than final acceptance; no robust tail, new budget or acceptance pass follows.

Publish candidate evidence including fixture/editor/gesture results, layout/input matrix, frozen profile protocol/samples, acceptance ledger, cleanup and original external source reconstruction. Map every MVP scenario: synthetic results can support functional checks; PHYSICAL/EVERYDAY, exact reference-device INPUT and final PERF remain pending. Record existing approved thresholds and changed-subject applicability, the unapproved CPU/transfer/update rows, historical cold failures and unsupported retention/presentation without soliciting guessed numbers. Closing this change means the scoped candidate and honest handoff, not stage 1/stage 2 acceptance.

### 8. Guard storage and leave a clean lab

Before acquisition/launch, verify required tools, pinned image/browser identities, isolated network/mounts, fixture origin and projected rootfs/capture allocation against current free space. Keep at least 1 GiB free, continuously guard acquisition/runtime and stop before unsafe growth; do not install host upgrades. User-authorized safe cache cleanup remains available if necessary, with ownership/removed-cache evidence; if capacity cannot be recovered, stop and report.

Use an exclusive external campaign directory and a separate private synthetic state. Keep scalar captures compact; no heap snapshots/traces or full benchmark campaign are added here. On every success/failure/storage exit, stop the sandbox, verify listener/process/PID/socket cleanup and reclaim only owned image/rootfs/cache when useful. Preserve raw evidence, licenses, source snapshots and historical subject hashes. No production HA dashboard, resource, integration, lock or device is changed.

## Risks / Trade-offs

- Expanded form can fail persistence -> exact per-field real-editor pilot and scoped custom-editor fallback; no YAML workaround.
- Duplicate/cancelled/stale position events can move a future target incorrectly -> pure transitions, generation validation and browser tests before a real transport is even scoped.
- Native-looking icons/details are version-coupled -> isolate adapters, test pinned behavior/resource closure, retain nonvisual labels and disclose the boundary.
- Missing feedback or unknown button state can be misrepresented -> separate source/target availability and draft/actual values, with domain-specific fixtures.
- Candidate costs may differ materially -> collect a changed-subject profile, preserve failures and keep acceptance/production adoption blocked where evidence is missing.
- Full card may not fit narrow allocations -> measure actual widths/overflow and fix/record a usable minimum rather than inherit Tile claims.
- Reacquisition can exhaust disk -> preflight plus continuous reserve guard, compact scalar outputs and owned-cache cleanup on exit.

## Migration Plan

No production migration is performed. Apply creates the candidate alongside the frozen experiment and tests it only in isolated synthetic state. A later real-installation proposal must recheck entity capabilities, scope a transport adapter, resource registration/rollback and supervised physical validation. Removal of this candidate consists of stopping its lab and removing only its owned registration/state/assets; historical experiments and evidence remain unchanged.

## Open Questions

Exact final CSS row count/minimum usable allocation and browser resource timings await rendered evidence; they cannot reduce the required controls or convert failed coverage into success. Production serialization, packaging, compatibility range, renderer adoption, actual Safari/device testing and physical/everyday acceptance remain later scoped decisions. None is assumed by this candidate design.
