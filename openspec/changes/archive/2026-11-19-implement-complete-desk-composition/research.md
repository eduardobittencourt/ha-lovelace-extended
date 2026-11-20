# Research

## Scope

D3 / initial stage 2 implementation candidate. Determine the contracts needed to implement the complete fixed composition safely in the existing synthetic lab. This record grounds a new candidate; it neither adopts the two-slot prototype as production code nor closes stage 1. No lab acquisition, product implementation, production HA access or physical test occurred during planning.

## Evidence

Reviewed on 2026-11-19. Historical installation observations are not a current-device verification.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The acceptance map separates cover percent/control, a direct cm sensor and three button presses; lock remains external and memory arrival is not exposed. | [MVP roles and scenarios](../../../../docs/mvp.md), originating read-only Core 2026.11.1 inspection on 2026-11-14; [role map](../2026-11-15-discover-desk-and-frontend-contracts/research.md#desk-role-map-task-13) | Re-read the role/action table and complete scenario matrix. | No current HA/firmware identity or physical motion check; private IDs are intentionally absent. | Synthetic role aliases can cover the full composition; never infer cm from percent, unlock automatically or equate press/transport with arrival. |
| E2 | Current source accepts only two synthetic input_number sources and three input_boolean targets; its recorder has no real service path. | [card.js](../../../../experiments/minimum-card-contract/src/card.js), [recorder.js](../../../../experiments/minimum-card-contract/src/recorder.js), inspected 2026-11-19; [existing specification](../../../specs/independent-element-bindings/spec.md) | Read normalization, getConfigForm, render/activation and interception code plus the full specification/scenarios. | Does not implement cover/button domains or complete-desk layout. | Preserve the frozen experiment and introduce the complete composition capability/candidate separately. A new typed record-only action boundary is needed; loosening the old allowlist is insufficient. |
| E3 | Pinned HA defines cover open/close/position/stop feature bits and independent availability/state helpers; absent position is allowed. | Core 2026.11.1 / frontend 20261028.5, commit e32bc0696ebefde323f5b791269ad0c57f3f99d9: [cover feature flags](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/data/feature/cover_entity_feature.ts), [cover helpers](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/data/cover.ts); [Core flags](https://github.com/home-assistant/core/blob/d8a0dc698c8946b44e455d904000db563cfbf1ba/homeassistant/components/cover/const.py) | Rechecked immutable upstream frontend sources and the archived source excerpts. Flags are OPEN=1, CLOSE=2, SET_POSITION=4, STOP=8. | Source evidence for the pinned lab, not a supported-version policy or physical contract. | Resolve controls against each effective target's flags and availability; keep unknown numeric feedback distinct from a user-selected finite request. |
| E4 | Maintainer confirmed a complete stage 2 candidate, local position preview while dragging and one command when released. | Explicit exploration response and openspec-propose invocation in this conversation, 2026-11-19 | Read the confirmed scope and interaction choice. | No approval of a production stack, performance budget, real service transport or physical testing. | Treat release-only dispatch as a requirement; cancellation and stale-target guards preserve it. Keyboard Enter-to-commit/Escape-to-cancel is a proposed candidate default, not an observed user preference. |
| E5 | HA exposes getConfigForm and getConfigElement; the unchanged prototype completed ten round trips across nine flat fields. | [Pinned Lovelace types](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/types.ts), [official editor guide](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/), [fresh editor pilot](../../../../experiments/minimum-card-contract/performance-benchmark/editor-pilot.json) | Rechecked primary documentation and pinned type definitions; inspected actual saved/reopened evidence. The guide distinguishes structural form assertion from field rendering. | Expanded complete-card persistence is untested. Throwing from assertConfig can disable the visual editor; flat prototype success does not prove arbitrary nested bindings. | Use a bounded flat schema, tolerate fillable incomplete config and test every delivered field in real HA. A custom editor remains a conditional fallback within the same visual requirements. |
| E6 | Pointer Events defines cancellation and capture-loss events separately from pointer release. | [W3C Pointer Events Level 3, 2026-06-30](https://www.w3.org/TR/2026/REC-pointerevents3-20260630/#the-pointercancel-event), accessed 2026-11-19 | Read primary event/cancellation definitions. | Does not establish event ordering or touch behavior of this unimplemented card or Safari. | Use an explicit gesture state machine with one commit transition, cancellation, pointer identity/config generation and tests for duplicate release/change/click and capture loss. |
| E7 | The completed benchmark has full retained-variant coverage but no new target numerical agreement; cold, retention and presentation remain open. | [Benchmark review](../../../../experiments/minimum-card-contract/performance-benchmark/review.md), [budget packet](../../../../experiments/minimum-card-contract/performance-benchmark/budget-review.json), [stage review](../../../../experiments/minimum-card-contract/performance-diagnostics/stage-review.json), 2026-11-19 | Re-read actual coverage, agreement and failure dispositions. | Two-slot costs do not pass a changed full composition or establish phone/displayed-feedback performance. | Allow a bounded functional candidate without performance acceptance or cost-based production adoption. Measure its actual subject separately and carry all independent gates forward. |
| E8 | Existing lab tooling pins Core/frontend/browser, isolation and dependencies; rootfs/layers were reclaimed and approximately 6.2 GiB is currently free. | [Experiment reproduction](../../../../experiments/minimum-card-contract/README.md), [package manifest](../../../../experiments/minimum-card-contract/package.json), [cleanup](../../../../experiments/minimum-card-contract/performance-benchmark/cleanup.json); current df observation on 2026-11-19 | Inspected tool/source boundaries and current capacity without starting HA. | Current capacity is not a future acquisition guarantee; existing fixture recorder cannot intercept cover/button descriptors. | Reuse tool versions, extend only external/new-candidate fixture adapters, enforce fresh preflight plus a 1 GiB reserve and preserve old evidence/hashes. |
| E9 | Pinned ha-icon accepts an icon identifier and loads HA-managed icon chunks; HA's more-info action emits an entity-scoped UI event. | [ha-icon](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/components/ha-icon.ts), [action handling](https://github.com/home-assistant/frontend/blob/e32bc0696ebefde323f5b791269ad0c57f3f99d9/src/panels/lovelace/common/handle-action.ts), rechecked 2026-11-19 | Read primary implementation without copying it. | Version-bound internals, not guaranteed independent APIs; shared icon/dialog loading counts as HA cost. | Isolate optional icon/more-info integration behind a pinned HA adapter, test actual icon override/details behavior and fail visibly rather than importing private action helper code or traversing HA private DOM. |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| Reusable role/binding modules can express the whole desk without hardcoded installation IDs or a general engine. | Complete independent-source/target fixture and sibling-edit matrix. | Every required role works and single changes preserve siblings; a missing role cannot silently substitute another entity. |
| Flat schema-driven configuration is sufficient for the full candidate. | Real picker creation from empty, every field edited, saved/reloaded/reopened. | All delivered options survive; if the schema form cannot represent the required flow, demonstrate the gap and implement the same contract through getConfigElement rather than omit options. |
| A gesture state machine prevents command flooding and stale releases. | Unit transitions plus real browser pointer, keyboard and emulated-touch sequences under state/config/availability changes. | Preview updates stay local; exactly one valid commit, zero cancelled/interrupted commits and zero body actions. |
| The full composition remains usable within HA allocation. | Recorded narrow/intermediate/wide Sections/Masonry matrices with long labels and enlarged text. | No overlap/overflow or inaccessible required control in the claimed allocations; failures keep layout acceptance pending. |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Are role semantics and available extension contracts sufficient for this candidate? | Resolved for planning by E1–E6/E9. | The required cover/button roles and form/gesture boundaries are known; implementation outcomes are not assumed. | Implement against the pinned lab and verify the explicit scenarios. |
| Does the complete form preserve every field from empty through independent edits? | Blocking for claiming delivered visual configuration, not for defining its required outcome. | Expanded persistence is a specific implementation validation, with a scoped custom-editor fallback. | Perform the complete-form pilot before finalizing editor coverage; no YAML workaround or field reduction. |
| What layout/minimum allocation is actually usable? | Blocking for layout acceptance; deferrable until rendered candidate exists. | No complete card has yet been rendered. | Record actual allocation/overflow/input evidence; do not copy Tile dimensions as proof. |
| Can the changed candidate satisfy justified performance acceptance? | Blocking for performance acceptance, stage 1 exit and production adoption; outside this change's closure claim. | E7 remains unresolved and old-subject passes cannot be transferred. | Capture a scoped candidate profile and an explicit requirement/approval/verification ledger; do not launch another full research campaign or invent ceilings here. |
| Are real desk capabilities, reference Safari and physical/everyday use validated? | Deferred to separately scoped integration/device/physical work. | None is needed to implement the synthetic candidate; all remain required before full MVP acceptance. | Carry current-installation verification, exact device builds, supervised lock/motion plan and everyday acceptance into the next handoff. |

## Research and Experiments

### R1 — Complete form and fixture pilot during apply

Use the pinned isolated HA with synthetic cover, height sensor and three button states, including an available never-pressed button reporting unknown. Intercept every service path; validate allowed descriptor types/targets/data and reject all other requests before transport. Verify empty creation, complete visual editing, single-field/sibling round trips, body details/none, icon overrides and cancellation/error behavior. Completion requires a public field/role coverage record and dispatch assertions. The candidate can use HA's schema form or the scoped custom-editor fallback without reducing functionality. No live HA or physical action is part of this pilot.

### R2 — Position and complete-composition validation during apply

Test local preview against release, capture loss, pointer cancellation, Escape/blur, invalid values, duplicate native events, target/config changes and concurrent actual position updates. Keyboard arrows adjust only the draft, Enter commits once and Escape/blur cancels. Requested percent and actual percent/cm feedback remain visibly distinct. Record ordinary keyboard/emulated-touch reachability and the full layout/error/recovery matrix. Completion is demonstrated behavior per delta scenario, not a script or artifact's mere existence.

### R3 — Bounded candidate profiling and handoff

Before capture, freeze subject/source hashes, versions, allocations, cache/network conditions and comparable workload boundaries. Collect one/ten-group native/empty/candidate profiles, separate first/reopen editor context, relevant/unrelated updates and local input, without presenting descriptive samples as acceptance. Preserve all slow/invalid attempts and unsupported ownership/presentation endpoints. Use the inherited performance ledger to document exact applicability/approval gaps and final-MVP repeat requirements. Full budget derivation/approval, new retention/presentation method campaigns and real device/physical testing are not smuggled into this implementation change.

## Outcome

Planning evidence was sufficient for the specified bounded functional candidate.
E1–E6/E9 resolved the dependent domain/form/gesture contracts; E7/E8 constrained
acceptance and execution. Apply now implements the separately maintained
[candidate](../../../../candidates/fixed-composition-card/README.md), preserving the
historical runtime/editor and dependency locks. Stage 1 and full stage 2/MVP
acceptance remain open.

### Apply functional observations — 2026-11-19

| Area | Actual observation | Evidence and limitations |
| --- | --- | --- |
| Capacity/isolation | Pinned image acquired under a continuously supervised 1 GiB reserve, with an early 1.25 GiB trip point. All six HA worker namespaces differ, effective capabilities are zero and relay access is loopback-only. Stop checks passed before functional work. | [Preflight](../../../../candidates/fixed-composition-card/evidence/preflight.json); own image/caches are separately reclaimed on final exit. |
| Role/action model | Pure modules implement independent sources/targets, exact feature bits/data, domain-specific unknown behavior and record-only descriptors. Whitespace-only accessible labels inherit readable defaults without rewriting persisted input. | 22 maintained Node unit tests, [rendering](../../../../candidates/fixed-composition-card/evidence/rendering.json), [action/input matrix](../../../../candidates/fixed-composition-card/evidence/actions.json) and [integrated checks](../../../../candidates/fixed-composition-card/evidence/integrated.json). No service client/enable switch. |
| Requested position | Multiple real mouse and emulated-touch previews produce zero intermediate intents, one valid release and zero cancelled/stale/duplicate commits. Ordinary keyboard requires Enter; actual feedback remains separate. | [Gesture matrix](../../../../candidates/fixed-composition-card/evidence/gestures.json), pure transition tests and integrated CDP touch sequence. No physical touch, movement or compositor-presentation claim. |
| Layout/lifecycle | 96 actual Sections/Masonry cells pass at 240/360/500 px (wide Masonry 492 px), long labels, 16/32 px card text, en/pt-BR and light/dark. Fifty removal/reinsertion cycles release owned work and allow one subsequent activation without replay. | [Layout](../../../../candidates/fixed-composition-card/evidence/layout.json), [lifecycle](../../../../candidates/fixed-composition-card/evidence/lifecycle.json); 240 px is a tested candidate minimum, not a supported-device promise. Retained bytes remain unsupported. |
| Complete form | The actual HA schema form supports all 23 fields from an incomplete stub with no fixture IDs. All slot/body catalogs and confirm values are selectable. Thirty-one independent actual save/reload/reopen edits preserve untouched fields and runtime use, with zero preview intents. | [Creation](../../../../candidates/fixed-composition-card/evidence/editor-create.json), [round trips](../../../../candidates/fixed-composition-card/evidence/editor-roundtrip.json). No YAML or custom-editor fallback; field-update waits are part of automation, not an omitted persistence requirement. |

### Method and review corrections

The public [pilot history](../../../../candidates/fixed-composition-card/evidence/pilot-history.json)
preserves the corrected outer-bwrap namespace probe, provisional HTTP expiry,
slotted-dialog locator and launch-overlay input pilot. Actual HA field changes
must settle before the next automated edit; dropdown menus are scoped to their
selector, and entity labels distinguish the alternate cover from the similarly
named height sensor. These automation failures are not promoted to functional
success or silently mixed into timing samples.

The first complete profile was valid for its frozen source. Final review found
that whitespace-only action labels could remove accessible names. That defect
was fixed within the existing labeled-control contract, with a regression test
and integrated browser recheck. Its [initial protocol](../../../../candidates/fixed-composition-card/evidence/profile-initial-protocol.json),
[samples](../../../../candidates/fixed-composition-card/evidence/profile-initial-samples.json),
[sources](../../../../candidates/fixed-composition-card/evidence/profile-initial-sources.json)
and report remain separately reviewable. The final source repeats the same
bounded diagnostic schedule; no valid slow observation is replaced or pooled.

### Profile interpretation and next delivery

The candidate [protocol](../../../../candidates/fixed-composition-card/evidence/profile-protocol.json),
public samples and offline report describe one/ten-group native/empty/candidate
loads, actual editors, relevant/unrelated updates and local input. The native
group uses five Tiles; its editor row is the cover Tile only, and empty input is
a driver-only control. Shared HA/driver resource work and the additional delivery
observer remain included. Ten-second windows and three load/editor pairs do not
establish sustained performance, robust tails, component ownership or presentation.

The [applicability ledger](../../../../candidates/fixed-composition-card/evidence/acceptance-ledger.json)
keeps every candidate performance row pending. Four bounded historical passes
remain historical; the two 1108.60/1104.80 ms cold failures stay unresolved.
CPU/transfer/update budgets still need representative objectives and numerical
agreement, and retention/presentation still need calibrated methods. No production
stack, public format or compatibility policy is adopted.

The [33 delta / 21 MVP scenario handoff](../../../../candidates/fixed-composition-card/coverage.md)
links synthetic support and remaining gates for every scenario. The next scope
must reverify the real installation, authorize transport and registration/rollback,
record exact reference-device/accessibility conditions, plan supervised motion
and external lock prerequisites, repeat final PERF and obtain explicit everyday
replacement acceptance. None of those operations was executed here.
