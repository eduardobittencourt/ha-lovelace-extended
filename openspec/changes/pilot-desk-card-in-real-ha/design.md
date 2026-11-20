# Design

## Context

See [proposal.md](proposal.md) for motivation and [research.md](research.md) E1–E8 for inspected evidence. The existing complete card is a native JavaScript module graph with a schema-driven HA form, a pure position controller and a synthetic-only sink. It already distinguishes source/action roles and gesture commit, but has neither real transport nor deployment ownership. The historical performance results cover a different two-slot subject.

This design is required because transport, preview safety, deployment and lifecycle behavior cross several modules. It defines a bounded pilot, not a production library architecture.

## Goals / Non-Goals

**Goals:** Keep the change reviewable through a separate deployable module tree, a narrow service boundary and reversible owned installation. Prove the boundary in intercepted tests before exposing real commands. Obtain installation/device/operator findings without waiting for unrelated method research.

**Non-Goals:** Shared library extraction, package publication, arbitrary HA actions, custom integration/firmware changes, automatic desk unlock, deployment-wide fault injection and replacement of the existing desk solution. Do not retrofit real dispatch into the preserved candidate.

## Decisions

### 1. Separate pilot tree and identity

Create `pilots/desk-card/` from the candidate's relevant modules, retaining original licensing. Use `custom:lovelace-extended-desk-pilot` and a corresponding separate element/picker entry; change the discriminator validation and all synthetic-only product text. Preserve candidate and two-slot runtime/test identities. Copying a small baseline is preferable here to extracting a shared framework, which would couple historical evidence to a changed subject (E1–E3). Document the baseline revision and changes so duplication remains intentional and bounded.

Retain all current visual roles and options, including the confirmation field, with real-command wording. No private target defaults or hidden enable flags. Keep direct height feedback, local draft and actual percent separate; reuse controller semantics. Test every inherited behavior affected by the new boundary. The new operation spec adds real installation behavior; it does not weaken the synthetic contract.

### 2. Validate descriptors before invoking HA

Replace the fixture-ID allowlist only in the pilot with validation against the effective configured role, allowed domain/service, current entity state and required capability. Explicit targets remain independent from display sources. Permit only `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, `cover.set_cover_position` with one finite 0–100 position value, and `button.press` with no extra data. Details stays a UI event and none produces no action. No wildcard, area/device/multi-target or arbitrary service configuration.

Use an injectable adapter with the documented `hass.callService(domain, service, data, { entity_id: target })` boundary (E6), rather than adding credentials, REST transport or a new socket. R1 verifies the installed signature/schema before integration. Preserve immutable descriptors, activation token and configuration/lifecycle generation through confirmation; immediately recheck current connection, preview mode, role, target, state and capabilities before the call. Consume the gesture token once. Do not globally serialize all commands in a way that prevents an explicit stop while an earlier request is pending.

This is one outbound invocation per admitted activation, not an exactly-once guarantee for device/network execution. Do not retry a rejected or ambiguous invocation. A fresh explicit activation is the only way to send another command.

### 3. Establish preview suppression before transport enablement

The candidate's lab interception cannot protect a real installation (E2). The R2 probe confirmed that frontend 20261028.6 assigns `preview === false` for a saved view, `true` for editor previews and dashboard edit mode, and no value for picker previews. The pilot starts with `preview` unset and requires explicit `false`, matching Core and frontend versions, and a live connection before any service invocation. A transition to preview cancels drafts and pending unsent activations. Configuration changes never arm or invoke an action. Test direct clicks and position completion in both preview contexts, including already populated configurations.

Read frontend version via the versioned `frontend/get_version` WebSocket command. Share the version check per connection, without adding a state subscription. A failed check or an unknown version leaves transport disabled. This compatibility gate covers the tested pilot, without establishing a supported-version policy.

### 4. Transport feedback belongs to the current activation

Use per-control pending/completed/error or uncertain status. Completion means only that HA accepted/completed its service call. Keep actual state driven by fresh hass data; no optimistic physical height, arrival or selected memory. Ignore promise results from obsolete lifecycle/configuration generations. Connection loss invalidates unsent confirmations/drafts; an already submitted call cannot be recalled, so report uncertainty without retry. Mount/reconnect updates current data without replay.

Reuse ordinary hass delivery, selective role patches and AbortController cleanup; no per-card polling or service subscription is needed (E7). In isolated tests, cover delayed promises, permissions, rejection, stale results and disconnect/recovery. Production error/unavailability cases are observed naturally; manufactured failures stay in fixtures.

### 5. Deploy a complete, revisioned module directory

Ship plain modules and styles already represented as JavaScript, with no new bundler/runtime dependency. Place the full module closure under a dedicated revision directory, proposed as `/config/www/lovelace-extended/desk-pilot/<revision>/`, and register its `card.js` as a module resource. Verify www and serving already exist in R1; creating a route that requires restart is outside the plan. A revision directory versions every relative import, avoiding an entry-only query string that leaves stale dependencies cached.

Registering a resource affects every dashboard even though only the test view instantiates the pilot (E6). Use a unique tag and no top-level service activity, credentials or installation maps. Verify existing dashboards still load. Use the verified storage management route for the module and a dedicated pilot dashboard with one test view. The dedicated dashboard stays out of the sidebar and leaves the existing dashboard outside the write path. The maintainer approved this placement after R1 identified whole-dashboard saves with no expected-revision check.

Prepare a private installation manifest with exact old/new resource, dashboard and view entries, asset hashes, owned paths, target versions and backup location. Keep public examples alias-based. Before mutation compare current config to the prepared snapshot. Create only unused entries and record their returned IDs. Verify the identity and content of owned entries before each update or rollback and stop on conflicts. Keep all other dashboards outside the write path.

### 6. Stage validation by what it can establish

First run unit/intercepted browser checks and a deployment/rollback rehearsal. Then deploy and validate the actual editor and live readings without activating controls. Record real-device conditions and inspect touch, focus, names, text scaling and the position interaction. Next run only the agreed operator-supervised motion session; the user handles any lock changes using existing controls. Record transport, reported state and physical observation separately.

Initial feedback can guide fixes with PERF open. Final EVERYDAY replacement and final performance acceptance remain outside this pilot. Gather bounded startup/editor/update/input/lifecycle observations; use the adopted budgets only for matched methods/workloads (E5). Do not expand into a new presentation calibration or exhaustive benchmark campaign. Unsupported/non-comparable observations stay labeled as such. Unknown device access or operator availability leaves the corresponding tasks pending.

## Risks / Trade-offs

- Real commands can move the desk → Prove the call boundary under interception first; require operator readiness for the concrete session, accessible stop and immediate stop on unexpected behavior; never auto-unlock.
- HA resource loading is global → Separate tag, complete revisioned imports, no top-level actions, verified existing-dashboard load and scoped rollback.
- A preserved candidate copied into the pilot duplicates modules → Document origin, preserve historical hashes and port fixes deliberately; defer library extraction until reuse evidence warrants it.
- Current frontend differs from the historical lab → Resolve R1/R2 before dependent integration; stop real transport when preview behavior is unproven.
- Successful transport is mistaken for successful motion → Distinct statuses and separate operator observations; retain lock-rejection and absent-feedback limitations.
- Performance findings are overgeneralized → Keep subjects/methods and gate statuses distinct; pilot usability cannot close stage 1 or final-MVP performance.

## Migration Plan

1. Resolve the current role/version/resource contract read-only; prepare alias findings and exact private manifest. If scope must expand, revise affected artifacts before mutation.
2. Implement the separate pilot and prove preview/transport/lifecycle boundaries under interception. Produce module hashes and rehearse installation/update/rollback with harmless fixtures.
3. Back up the scoped current configuration privately. Apply only owned resource/test-view changes using the verified management route; verify revision closure and unchanged existing card/default.
4. Complete actual no-command editor/data checks and record device findings. At the operator-ready session, run the agreed controls and memory checks; stop and remove the pilot resource/view if control integrity is in doubt.
5. Publish sanitized scenario results and initial feedback, keeping failed/pending gates explicit. A healthy pilot can remain in its test view; it never automatically replaces the existing card.
6. On removal, read current config, remove the pilot dashboard and resource by their verified owned identities, and remove the owned revision directory after reference checks. Verify a fresh load and compare the existing card and relevant unaffected entries. Already loaded browser classes require a page reload to unload.

## Open Questions

- Exact reference-device observation time and operator-ready motion session: arrange after the installable result and concrete check sequence exist. This affects scheduling, not the operation contract.
- Formal everyday observation period and replacement acceptance: a later scope after prerequisite outcomes; do not invent a duration here.

Current installation versions, resource mode and preview compatibility are mandatory execution gates in research R1/R2, not deferrable assumptions. Their results must be recorded before the dependent implementation/deployment branch proceeds.
