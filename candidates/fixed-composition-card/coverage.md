# Candidate coverage and next delivery

Synthetic observations support this bounded candidate only. Full MVP acceptance remains open. The active delta is not consolidated into a production contract.

## Delta scenarios

| Scenario | Evidence | Disposition |
| --- | --- | --- |
| Configure the full desk composition | [editor-create.json](evidence/editor-create.json), [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Override a source independently of its action | [editor-roundtrip.json](evidence/editor-roundtrip.json), [rendering.json](evidence/rendering.json) | Synthetic candidate evidence; no real transport/physical claim |
| Identity defaults and overrides | [rendering.json](evidence/rendering.json) | Synthetic candidate evidence; no real transport/physical claim |
| Independent percent and centimeters | [rendering.json](evidence/rendering.json), [lifecycle.json](evidence/lifecycle.json) | Synthetic candidate evidence; no real transport/physical claim |
| Numeric information is absent | [config.test.js](test/config.test.js), [integrated.json](evidence/integrated.json) | Synthetic candidate evidence; no real transport/physical claim |
| Supported primary controls | [actions.json](evidence/actions.json), [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Capability or target is unusable | [cover.test.js](test/cover.test.js), [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Drag and release | [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Duplicate completion events or unchanged value | [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Concurrent actual feedback | [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Keyboard commit and unknown feedback | [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Cancel a gesture | [gestures.json](evidence/gestures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Invalidate the target during editing | [gestures.json](evidence/gestures.json), [position.test.js](test/position.test.js) | Synthetic candidate evidence; no real transport/physical claim |
| Reject an invalid request | [position.test.js](test/position.test.js), [actions.test.js](test/actions.test.js) | Synthetic candidate evidence; no real transport/physical claim |
| Activate each memory separately | [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Never-pressed or unavailable button | [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Additional details or no action | [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Activate inner controls and body separately | [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Body action is none | [actions.json](evidence/actions.json) | Synthetic candidate evidence; no real transport/physical claim |
| Create from empty | [editor-create.json](evidence/editor-create.json) | Synthetic candidate evidence; no real transport/physical claim |
| Edit one binding after reload | [editor-roundtrip.json](evidence/editor-roundtrip.json) | Synthetic candidate evidence; no real transport/physical claim |
| Display loss with independent usable action | [lifecycle.json](evidence/lifecycle.json), [rendering.json](evidence/rendering.json) | Synthetic candidate evidence; no real transport/physical claim |
| Configuration error, action error or confirmation cancellation | [actions.json](evidence/actions.json), [integrated.json](evidence/integrated.json) | Synthetic candidate evidence; no real transport/physical claim |
| Command without arrival feedback | [integrated.json](evidence/integrated.json) | Synthetic candidate evidence; no real transport/physical claim |
| Reconnect after an abandoned interaction | [gestures.json](evidence/gestures.json), [lifecycle.json](evidence/lifecycle.json) | Synthetic candidate evidence; no real transport/physical claim |
| Relevant and unrelated updates | [lifecycle.json](evidence/lifecycle.json) | Synthetic candidate evidence; no real transport/physical claim |
| Presentation context and repeated lifecycle | [lifecycle.json](evidence/lifecycle.json) | Synthetic candidate evidence; no real transport/physical claim |
| Complete composition layout matrix | [layout.json](evidence/layout.json) | Synthetic candidate evidence; no real transport/physical claim |
| Keyboard and emulated-touch operation | [layout.json](evidence/layout.json), [integrated.json](evidence/integrated.json) | Synthetic candidate evidence; no real transport/physical claim |
| Record valid descriptors and reject other targets | [fixtures.json](evidence/fixtures.json), [actions.test.js](test/actions.test.js) | Synthetic candidate evidence; no real transport/physical claim |
| Preview and other HA UI service paths | [editor-create.json](evidence/editor-create.json), [fixtures.json](evidence/fixtures.json) | Synthetic candidate evidence; no real transport/physical claim |
| Candidate profile and unresolved limits | [profile-protocol.json](evidence/profile-protocol.json), [report/report.json](evidence/report/report.json), [acceptance-ledger.json](evidence/acceptance-ledger.json) | Descriptive evidence; acceptance pending |
| Initial candidate handoff | [coverage.md](coverage.md), [acceptance-ledger.json](evidence/acceptance-ledger.json) | Scoped handoff; remaining gates explicit |

## MVP scenario handoff

| MVP scenario | Synthetic support | Remaining acceptance gate |
| --- | --- | --- |
| EDIT-CREATE | [editor-create.json](evidence/editor-create.json) | Production installation and supported editor/device scope |
| DATA | [rendering.json](evidence/rendering.json), [lifecycle.json](evidence/lifecycle.json) | Current real installation roles/units and final-device behavior |
| PRIMARY | [actions.json](evidence/actions.json), [gestures.json](evidence/gestures.json) | Real transport and supervised physical response |
| MEMORY-1 | [actions.json](evidence/actions.json) | Real memory target and supervised physical response |
| MEMORY-2 | [actions.json](evidence/actions.json) | Real memory target and supervised physical response |
| MEMORY-3 | [actions.json](evidence/actions.json) | Real memory target and supervised physical response |
| ISOLATION | [actions.json](evidence/actions.json), [gestures.json](evidence/gestures.json) | Actual reference-device/input/accessibility acceptance |
| EDIT-ROUNDTRIP | [editor-roundtrip.json](evidence/editor-roundtrip.json) | Real installation persistence/rollback |
| INVALID | [integrated.json](evidence/integrated.json), [editor-create.json](evidence/editor-create.json) | Supported deployment/version validation |
| MISSING | [rendering.json](evidence/rendering.json), [actions.json](evidence/actions.json) | Real integration/source behavior |
| UNAVAILABLE | [actions.json](evidence/actions.json), [config.test.js](test/config.test.js) | Real integration recovery/availability |
| UNKNOWN | [actions.json](evidence/actions.json), [gestures.json](evidence/gestures.json) | Current integration feedback/capability validation |
| ERROR | [actions.json](evidence/actions.json) | Real adapter/HA error behavior |
| CANCEL | [actions.json](evidence/actions.json), [gestures.json](evidence/gestures.json) | Real adapter and device confirmation behavior |
| RECOVER | [lifecycle.json](evidence/lifecycle.json), [integrated.json](evidence/integrated.json) | Real connection/transport recovery, without replay |
| FEEDBACK | [integrated.json](evidence/integrated.json) | Supervised physical observation; no inferred arrival |
| LAYOUT | [layout.json](evidence/layout.json) | Final installation and actual reference-device fit |
| INPUT | [layout.json](evidence/layout.json), [integrated.json](evidence/integrated.json) | Exact reference-device builds, real touch and assistive method |
| PHYSICAL | None; excluded by scope | Separate operator-supervised authorization and motion/lock plan |
| EVERYDAY | None; excluded by scope | Prerequisites, agreed observation period and explicit user acceptance |
| PERF | [profile-samples.json](evidence/profile-samples.json), [report/report.json](evidence/report/report.json), [acceptance-ledger.json](evidence/acceptance-ledger.json) | Applicable agreed budgets, calibrated retention/presentation, final-MVP/device repeats |

## Prerequisites for a separately scoped real-installation delivery

- Reverify actual HA/frontend/integration/firmware versions, cover capabilities, three button roles, height attributes/units and external lock behavior through current read-only inspection. Historical November 14 observations are not current verification. Publish portable aliases, not private IDs/inventories.
- Scope a real-transport adapter explicitly. Preserve target/domain/data/generation checks, confirmation cancellation, local requested-versus-actual feedback and zero recovery replay. This candidate has no transport switch.
- Authorize production resource/card registration separately. Keep a private scoped backup, identify the exact resource/configuration change, and verify rollback by restoring the previous resource/card configuration and removing only the candidate registration. No production change occurred here.
- Record the actual iPhone 14 Pro/Safari OS/browser builds, usable viewport/allocation, text scale/zoom, physical input and assistive method before reference-device INPUT acceptance. Chromium emulation does not pass this gate.
- Agree an operator-supervised PHYSICAL plan: clear movement area, available stop control, explicit stop conditions, current external lock/unlock prerequisites and separate observations for command completion, reported feedback and real movement/rejection. Lock remains in existing HA controls; never auto-unlock.
- Agree an EVERYDAY observation period after functional/device/performance prerequisites and obtain explicit acceptance of replacing the existing desk solution. No automatic replacement or promotion follows from this candidate.
- Resolve representative CPU/transfer/update objectives and explicit numerical agreement; calibrate retained-byte ownership/final presentation. Preserve both historical cold failures and repeat applicable accepted protocols on the final MVP/reference device. The short candidate diagnostic establishes no new budget or production stack.
