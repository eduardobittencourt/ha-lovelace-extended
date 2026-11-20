# Research

## Scope

Stage 2 / D3: can a separately installed complete card operate the actual desk and expose useful device/usability findings before stage 1 performance is accepted? Planning inspection on 2026-11-20 is read-only apart from this change's artifacts. No production HA query, installation or command has been performed for this proposal. D2 performance findings constrain claims, not entry to this reversible pilot.

## Evidence

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The complete candidate has 23 visual fields, 31 persistence edits and a recorded 96-cell Chromium layout matrix. | [Candidate guide](../../../candidates/fixed-composition-card/README.md), [coverage](../../../candidates/fixed-composition-card/coverage.md), delivery 2026-11-19; Core 2026.11.1 / frontend 20261028.5; reviewed 2026-11-20 | Read source and maintained evidence summaries | Synthetic, intercepted services; no real-device pass | Reuse composition and editor as the pilot starting point; repeat relevant checks after changes |
| E2 | Target validation allows only synthetic IDs; the sink records descriptors without a service client. UI text explicitly says no commands are sent. | [actions.js](../../../candidates/fixed-composition-card/actions.js), [card.js](../../../candidates/fixed-composition-card/card.js), [action tests](../../../candidates/fixed-composition-card/test/actions.test.js); inspected 2026-11-20 | Read implementation and regression assertions | Test definitions are not fresh execution | A real adapter and truthful UI are necessary; copying files into HA alone cannot provide working controls |
| E3 | The durable complete-card spec explicitly requires synthetic-only dispatch; the two-slot spec has separate experimental scope. | [Complete candidate spec](../../specs/fixed-composition-card/spec.md), [two-slot spec](../../specs/independent-element-bindings/spec.md); read in full 2026-11-20 | Compare requirements and scenarios | Neither covers real installation | Add a separate operation capability; preserve both subjects and contracts |
| E4 | Historical desk mapping includes capable cover, independent cm sensor and three button memories; the lock remains external. HA completion may not imply movement. | [Dated research](../archive/2026-11-15-discover-desk-and-frontend-contracts/research.md), [MVP scenarios](../../../docs/mvp.md); observation 2026-11-14, reviewed 2026-11-20 | Read provenance and acceptance expectations | Not a current installation/firmware check or physical test | Reverify only these roles before installation; never infer arrival or auto-unlock |
| E5 | Fresh stage 1 verification leaves cold readiness, CPU, transfer and updates failed; presentation unsupported; retention passes within its boundary. | [Verification](../../../experiments/minimum-card-contract/performance-verification/review.md), 2026-11-20; [budget policy](../../../docs/performance-budgets.md) | Read ten-row reconciliation and policy | Different two-slot subject and desktop lab | Keep failures visible, select relevant measurements under standing authority, and do not pass pilot/final performance from historical results |
| E6 | HA documents custom elements receiving configuration and hass, a schema-driven visual form, local module resources and hass.callService with data and target. Resources load across dashboards; local files are publicly served. | Official [card API](https://contributors.home-assistant.io/frontend/custom-ui/card/), [editor](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/), [resource registration](https://contributors.home-assistant.io/frontend/custom-ui/resources/), [hass API](https://contributors.home-assistant.io/frontend/reference/hass-object/); accessed 2026-11-20 | Read official documentation; source signature cross-check against historical frontend research | Moving documentation does not prove current installed compatibility; www creation can require restart | Use ordinary module loading and HA's authenticated client; keep deployment assets free of private configuration; verify installed contracts before deploy |
| E7 | Existing cancellation checks freeze descriptors and revalidate configuration generation, target availability and gesture validity after asynchronous confirmation. | [actions.js](../../../candidates/fixed-composition-card/actions.js), [position controller](../../../candidates/fixed-composition-card/position.js), inspected 2026-11-20 | Read bounded action path and tests | No transport failure/recovery tests for real services yet | Preserve checks through the adapter; add promise rejection, disconnect and late-result coverage |
| E8 | The user selected a real pilot with the existing card retained, after discussion of open performance gates. | Conversation 2026-11-20: “$openspec-propose vamos assim” | Scope confirmation | Planning authorization, no installation or motion yet | Plan preparation, reversible deployment and supervised checks; do not implement in propose |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| The candidate's role composition is sufficient for an initial real desk pilot. | Current role map, actual visual round trips and reference-device observation | Confirm only if information and all configured controls work independently; record any missing role or interaction as a defect |
| A bounded service adapter can preserve single activation and cancellation. | Intercepted actual call path, target/data/count assertions, delayed confirmation and error/reconnect cases | Exactly one outbound invocation per completed explicit activation, zero on preview/cancel/stale/recovery paths; any duplicate refutes |
| Testing the real installation provides useful feedback before every laboratory metric closes. | Scenario results and user observations with performance limitations carried | Pilot produces actionable findings without claiming stage 1/MVP acceptance; usability problems remain failures even if transport succeeds |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| What are the current Core/frontend versions, resource mode and effective desk capabilities? | Blocking deployment, not the portable operation contract | No private IDs, version promise or deployment route is assumed here | R1: narrowly scoped current read-only inspection during apply; revise affected choices before integration |
| Does the installed frontend reliably identify every card picker/editor preview? | Blocking real transport enablement on that frontend | The existing lab's network interception is insufficient for production preview suppression | R2: source inspection and intercepted picker/editor/runtime tests on the observed version; leave transport disabled if unproven |
| Which exact resource/view changes and backups are needed? | Blocking deployment | Existing resource management and concurrent edits must be preserved | R1/R3: resolve current mode, prepare a concrete manifest and rollback before mutation |
| Will Safari/device input and actual commands behave correctly? | Blocking claims of device/physical success; not generic implementation | These are pilot validation outcomes, never assumptions underlying the adapter | R4: record exact environment and operator-supervised outcomes |
| What observation period and replacement decision constitute EVERYDAY acceptance? | Deferrable beyond this pilot | Existing card stays; initial feedback is not replacement acceptance | Scope later everyday acceptance with the user after prerequisites |
| Can all final performance and presentation gates pass? | Deferrable for pilot entry; blocking final acceptance | E5 remains authoritative; instrumentation changes need their own bounded scope | Record applicable pilot observations and explicit pending rows; do not widen into another full method campaign |

Architecture-blocking questions are resolved at the portable boundary: E1–E3 establish what can be reused and what must remain separate; E6 supports modules and service calls; E7 supports the action-validation model. Installation-specific answers above are required before dependent implementation/deployment and cannot be assumed by these artifacts. If R1/R2 invalidate the proposed mechanism, update research, design and tasks before continuing that branch.

## Research and Experiments

### R1 — Current read-only preflight

During apply, inspect actual HA/frontend versions, configured resource mode, serving route, the existing desk card and only cover/height/three-button/lock roles. Verify action schemas and capabilities, identifying unknown firmware/build details explicitly. Consume credentials through existing private clients; do not print them. Completion: a portable alias-based contract and private exact installation manifest, including current object hashes, scope and rollback. No service calls, broad registries, HA changes or motion. Raw/private material belongs under `~/research/ha-lovelace-extended/pilot-desk-card-in-real-ha/`, with private backups in a protected subdirectory.

### R2 — Pilot transport and preview proof

Use observed frontend source/contracts and a controlled browser harness with an injected service client or interception before outbound service traffic. Cover picker and editor previews, saved view, pending confirmation, permission/rejection, connection loss, stale completions, multi-value drag/release, Enter repeat, each memory and body isolation. Prove preview suppression before installing service-enabled code; no private-DOM heuristic is accepted without versioned evidence and fail-closed behavior. Completion: a bounded adapter with exact allowed calls/counts and zero unintended calls, plus unchanged historical source hashes. This permits isolated test tooling, not commands against the real desk.

### R3 — Reversible installation and no-command checks

Prepare module closure, immutable revision directory, resource registration and separate test-view config, scoped backup and rollback. Rehearse install/update/remove in the isolated environment and check concurrent-change handling. On the real instance, deploy only after prerequisites; verify serving hashes, visual create/save/reload/reopen, live source meaning and zero commands during configuration. Resources are global even when the card is in one test view: verify the existing dashboard still loads. Do not restart HA, edit loaded storage files directly, change resource mode or overwrite unrelated configuration; stop and revise scope if those become necessary. Rollback must remove only pilot-owned changes and preserve later unrelated edits.

### R4 — Device and supervised operation

Record actual model, OS/browser build, usable viewport/card allocation, theme/text scale and accessibility method. Complete no-command rendering/editor observations first. Before motion, obtain operator readiness for the concrete session, record current external lock condition, accessible stop control and stop conditions (unexpected/repeated motion, wrong target, failed stop or lost control). Test open/close/stop, selected position and each memory as agreed with the operator. Separate local activation, HA outcome, reported state and observed movement/rejection. Lock changes use existing controls by the operator. Fault injection stays isolated; never deliberately drop production connectivity or make real entities unavailable. Stop immediately on a control defect. Incomplete operator/device access leaves those tasks pending without blocking completed software work.

### R5 — Findings and bounded cost observations

Map outcomes to the 21 [MVP scenario IDs](../../../docs/mvp.md#acceptance-criteria), including pending EVERYDAY and PERF. Record pilot revision, date, versions, input method, observations and limitations; keep initial-use notes distinct from formal acceptance. Collect relevant startup/editor/update/input/lifecycle observations with comparable conditions where available. Apply adopted budgets only where methods/workloads match; otherwise report non-comparability and plan the missing evidence. No invented margins, user numerical targets or new full benchmark campaign. Publish sanitized conclusions in this research record and pilot guide; preserve existing failed/unsupported rows.

## Outcome

Planning evidence supports preparing and executing a bounded pilot after the explicit apply handoff. The execution findings below track the current evidence. Installation, real transport, reference-device, physical and final-MVP acceptance remain pending.

## Execution findings

### R1 — Current desk roles and service metadata (2026-11-20)

Authenticated REST GETs selected eight known desk roles by entity and inspected the service metadata for `cover` and `button`. Installed package metadata in the running Core container independently identified Core **2026.11.2** and frontend **20261028.6**. The version differs from the historical candidate lab. The read-only collector emits only aliases and selected attributes, with no entity identifiers, credentials or full configuration. It has no command path.

| Portable alias | Current observation | Consequence for the pilot |
| --- | --- | --- |
| `primary_cover` | `open`, numeric `current_position`, `supported_features: 15` | Open, close, set-position and stop are individually advertised. Use position as reported percent. |
| `direct_height` | Separate distance sensor in `cm` | Read the height independently. |
| `memory_1`, `memory_2`, `memory_3` | Three `button` entities with state `unknown` at inspection, and no arrival fields | An available button can have `unknown` state. Missing and `unavailable` targets still suppress presses. Do not infer memory position or arrival. |
| `external_lock` | Separate lock reported `unlocked` | Recheck with the operator before physical testing. The pilot has no unlock action. |
| `controller_connected`, `controller_fault` | Reported `on` and `off`, respectively | These are point-in-time observations. Recheck external prerequisites before the session. |

HA advertises `cover.open_cover` (bit 1), `cover.close_cover` (bit 2), `cover.set_cover_position` (bit 4), `cover.stop_cover` (bit 8), and `button.press`. Set-position requires `position` within 0–100 percent; the selector steps by 1. Open, close and set-position also advertise optional speed; the pilot contract omits it. Stop and press advertise no service fields. The running firmware build, motion, physical arrival and command rejection behavior remain unverified in this session.

### R1 — Resource and dashboard preflight (2026-11-20)

Read-only Lovelace WebSocket queries reported storage mode for both resources and the existing desk dashboard. The cover card was located in the returned view configuration. The existing `www` directory and a successful HTTP response for an existing `/local/` resource confirmed serving without a restart. The proposed resource prefix and view path were unused at inspection. The protected external preflight records hashes of the current resources, dashboard, first view and desk-containing view, together with the proposed ownership and rollback scope. The selected asset revision and hashes depend on a tested pilot module graph.

The [Core 2026.11.2 Lovelace handler](https://github.com/home-assistant/core/blob/2026.11.2/homeassistant/components/lovelace/websocket.py) implements `lovelace/config/save` as a whole-dashboard write without an expected revision argument. A fresh read and hashes detect edits before that read. They cannot protect another writer between the read and the save. The maintainer approved a dedicated pilot dashboard on 2026-11-20. Its single view has its own configuration ownership and the original dashboard stays outside the write path. The private manifest records the dedicated route, dashboard and view ownership, resource prefix, and preflight checks.

### R2 — Frontend source findings (2026-11-20)

In frontend 20261028.6, [`hui-card`](https://github.com/home-assistant/frontend/blob/20261028.6/src/panels/lovelace/cards/hui-card.ts) assigns the card element a boolean `preview`. The [edit dialog](https://github.com/home-assistant/frontend/blob/20261028.6/src/panels/lovelace/editor/card-editor/hui-dialog-edit-card.ts) renders its direct wrapper with preview enabled and uses a [preview section](https://github.com/home-assistant/frontend/blob/20261028.6/src/panels/lovelace/sections/hui-section.ts) for its Sections path. The [card picker](https://github.com/home-assistant/frontend/blob/20261028.6/src/panels/lovelace/editor/card-editor/hui-card-picker.ts) creates the custom element directly for live previews without assigning `preview`. The [view](https://github.com/home-assistant/frontend/blob/20261028.6/src/panels/lovelace/views/hui-view.ts) propagates its current edit mode to card and section wrappers.

An isolated Core 2026.11.2 / frontend 20261028.6 instance running the digest-pinned public image confirmed the signal with a dedicated browser probe. The probe attempted a button command and position commit in each context. It saw `undefined` in the live picker, `true` in both editor previews and dashboard edit mode, and explicit `false` in saved Masonry and Sections views. The picker, editor and dashboard edit attempts produced zero service invocations. Each saved view produced exactly one intercepted open request and one position request with the expected fixture target and final value. Synthetic fixture traffic stayed within the isolated lab, and the browser intercepted service calls before sending them. This proves the boundary for these contexts and versions. The pilot must start with `preview` unset, require explicit `false`, and verify the Core and frontend versions before allowing a command. The same cases must pass on the pilot itself before deployment.
