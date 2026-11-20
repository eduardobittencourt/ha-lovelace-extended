# Lovelace Extended Desk Pilot

The pilot starts from the [fixed-composition candidate](../../candidates/fixed-composition-card/README.md) delivered on 2026-11-19. It has a separate `custom:lovelace-extended-desk-pilot` identity and retains the candidate's Apache-2.0 plain-module implementation, visual form, binding model and position controller. The current source adds a bounded HA adapter and keeps commands unavailable until a saved view, live connection and the verified Core 2026.11.2 / frontend 20261028.6 are all present. Deployment and acceptance are tracked in the [OpenSpec change](../../openspec/changes/pilot-desk-card-in-real-ha/tasks.md).

## Local checks

```sh
node --test pilots/desk-card/test/*.test.js
```

The tests cover the candidate-derived composition and controller, all 23 visual fields, the pilot discriminator, descriptor validation and injected service transport. They use only Node and synthetic state fixtures.

### Preview and saved-view evidence

On 2026-11-20, the isolated Core 2026.11.2 / frontend 20261028.6 reproduction used Chromium and intercepted the WebSocket before `call_service` could leave the browser. The preliminary probe observed `undefined` in the picker, `true` during editor/dashboard editing and explicit `false` on saved views in Masonry and Sections. The pilot then exercised a populated picker fixture and populated editor with open and position activations and recorded zero calls in each. The saved Sections view emitted one intercepted open request and one intercepted position request through separate activations. Repeated Enter emitted no second position request. The selected 43% and reported 42% remained independent.

### Isolated integrated regression

The same run created the card through the actual visual picker, filled all 23 fields, saved, reloaded and reopened it. Changing just the height source preserved the other fields in both saved configuration and the reopened form. No service requests occurred during editing. The runtime check observed visible focus, the named position slider and labeled memory controls. It recorded a Portuguese decimal reading, inherited theme color and zero DOM mutations after one unrelated state update.

The isolated feedback check injected permission and generic rejection, a pending open followed by a completed stop, a concurrent actual-position update, a late result after reconfiguration, and a disconnect while a call was pending. A duplicate native click was ignored. Completion and disconnect messages made no physical claim. Reconnection did not replay the request. Unmount released the card's 24 input listeners and cleared its gesture state. Remount restored one listener set. An unsupported Core version left commands unavailable.

The initial browser runs used the existing Playwright/Chromium and the bounded isolation pattern from the [candidate guide](../../candidates/fixed-composition-card/README.md#guarded-lab-reproduction). They used the amd64 Core 2026.11.2 image `sha256:69193f00e76147a1649a910d39673680e37ce4362dfb410a328a806a824f2000`. The browser drivers and raw logs are kept in the external pilot research area. With that local harness and its disposable HA running on loopback, the runs were:

```sh
pilot_research="$HOME/research/ha-lovelace-extended/pilot-desk-card-in-real-ha"
node "$pilot_research/preview-proof.mjs"
node "$pilot_research/pilot-browser.mjs"
node "$pilot_research/runtime-test.mjs"
```

## Staged validation

1. **Isolated HA and Chromium.** Verify the frontend preview signal, exercise the visual form through save/reload/reopen, and assert exact service data and counts through interception. Inject disconnects, errors and unavailable entities here. Rehearse the resource and dedicated dashboard lifecycle while an independent dashboard changes.
2. **Real HA with commands unexercised.** Check the installed revision and fresh loads of both dashboards. Configure and reopen the test view visually. Compare live cover percent with independent sensor height and record the rendered allocation. Verify zero service invocations during the configuration flow.
3. **Reference device.** Record model, OS and browser builds, viewport, card allocation, zoom and text scaling, theme and assistive technology. Verify touch cancellation, focus, names and keyboard where available. Carry unobserved cells as pending.
4. **Supervised operation.** Record operator readiness, external lock and controller prerequisites, and available stop controls before activation. Keep the command request, HA outcome, reported state and observed movement separate. End the session on unexpected motion, wrong target, repeated motion, failed stop or loss of control.
5. **Follow-up.** Record initial use feedback and bounded pilot performance observations. Apply adopted budgets only to matching methods and workloads. Track everyday replacement acceptance separately.

## MVP evidence ledger

Use the [MVP scenarios](../../docs/mvp.md#acceptance-criteria) for the exact criteria. Each row begins pending for this pilot. Candidate unit checks are baseline evidence.

| ID | Required evidence at this stage | Pilot result |
| --- | --- | --- |
| EDIT-CREATE | Isolated visual creation and actual HA configuration with zero commands | Pending |
| DATA | Isolated independent source changes and actual HA live percent and cm feedback | Pending |
| PRIMARY | Isolated exact descriptors and supervised cover controls | Pending |
| MEMORY-1 | Isolated target and count check and supervised memory 1 | Pending |
| MEMORY-2 | Isolated target and count check and supervised memory 2 | Pending |
| MEMORY-3 | Isolated target and count check and supervised memory 3 | Pending |
| ISOLATION | Isolated input and count checks, reference-device input and supervised target check | Pending |
| EDIT-ROUNDTRIP | Isolated and actual HA save/reload/reopen with an independent binding edit | Pending |
| INVALID | Isolated validation and zero-call matrix | Pending |
| MISSING | Isolated missing-role matrix with independently usable siblings | Pending |
| UNAVAILABLE | Isolated unavailable-role matrix and any natural real HA observation | Pending |
| UNKNOWN | Isolated unknown feedback and available-button cases | Pending |
| ERROR | Isolated injected rejection and status checks | Pending |
| CANCEL | Isolated cancellation and reference-device gesture cancellation | Pending |
| RECOVER | Isolated disconnect/remount and stale-result checks | Pending |
| FEEDBACK | Isolated transport outcomes, actual HA readings and supervised motion observations | Pending |
| LAYOUT | Isolated allocation matrix, real test view and reference-device rendering | Pending |
| INPUT | Isolated input checks and reference-device accessibility and input | Pending |
| PHYSICAL | Supervised operation after documented operator readiness | Pending |
| EVERYDAY | Later replacement observation and maintainer acceptance | Deferred |
| PERF | Bounded pilot observations and later comparable final-MVP verification | Pending |

The [stage 1 verification](../../experiments/minimum-card-contract/performance-verification/review.md#stage-decision) records passes for runtime decoded bytes, warm readiness, local intent, editor and bounded retention. Cold readiness, load CPU, transfer and updates failed. Presentation attribution remains unsupported. These dispositions apply to the historical two-slot subject. Pilot and final-MVP performance remain pending under the [adopted budget policy](../../docs/performance-budgets.md).
