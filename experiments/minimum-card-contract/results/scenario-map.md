# Experimental scenario evidence

Source: [delta spec](../../../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/specs/independent-element-bindings/spec.md).
This maps every scenario to an observed result. Passing a reporting scenario
withholds unsupported acceptance; it does not turn pending performance into a pass.

| Scenario | Evidence / observation | Result |
| --- | --- | --- |
| Distinct display sources and action targets | `runtime-check.mjs`: 21.1/72.2; independent reconfigured A→body target and unchanged B target | Pass |
| Reconfigure one slot | Zero B mutations during A reconfiguration; original config unchanged; all untouched saved fields identical | Pass |
| Save and reopen | Real HA picker/form; ten visual save/reload/reopen round trips; [full configs](persistence.json) | Pass |
| Edit without sibling loss | Nine fields covered, confirmation on/off; complete before/after object comparisons | Pass |
| Inner activation across available input methods | Pointer, Enter, Space and emulated touch each produce one intended target; 96-case matrix keyboard/touch repetitions | Pass in recorded methods |
| Body activation | Separate sibling body button records only body target | Pass |
| Fixture activation | Allowlisted local recorder; browser WS/REST service boundaries blocked; native/experimental checks; fixture booleans remain off | Pass |
| Rejection and cancellation | Invalid target, injected rejection/cancellation and dismissed confirmation produce zero intents/no success | Pass |
| Invalid configuration | Required binding, target allowlist, unsupported action field and confirmation type rejected; stale normal output cleared | Pass |
| One source becomes unusable | A missing/unknown/unavailable does not alter B; unusable A target disables only its control | Pass |
| Recovery | Current value 31.5 appears, zero replayed intents | Pass |
| Relevant and unrelated state changes | A/B/body mutation counts: unrelated 0/0/0; A-only update 1/0/0; actual HA update windows also captured | Pass |
| Presentation context changes | Deterministic formatting/theme changes plus actual HA en/pt-BR and light/dark propagation in 96 cases | Pass in recorded environments |
| Repeated lifecycle cycles | Fifty cycles, 100 ms settling; experimental owned counts zero after each removal; post-cycle activation once | Pass; global heap remains diagnostic |
| State changes while disconnected | Removed card receives updates; current value 49 appears after reinsertion without replay | Pass |
| Layout matrix | Actual Sections 240/360/500 and Masonry 240/360/492 px; normal/long labels and 100/200% text; [96 cases](layout.json) | Pass in recorded allocations |
| Keyboard and touch coverage | A→B→body traversal, visible 3 px outline, configured accessible names, Enter/Space and reachable emulated touch | Pass; physical/assistive coverage pending |
| Comparable measurements | [80 discovery loads, 120 inputs, 16 update windows, lifecycle/editor costs](measurements.md); native composition/driver limits explicit; [fresh verification](fresh-verification.json) separate | Reporting demonstrated; descriptive scope only |
| Incomplete or failing evidence | [Budget review](budget-review.json) withholds performance; retained cold outlier; unsupported/unagreed metrics marked pending; no production adoption | Reporting demonstrated; performance/stage 1 exit open |

No Safari, physical touch, screen reader, complete desk experience, HA action
transport or physical-arrival result is claimed. Stage 0 synthesis and all stage 2
acceptance gates remain open. No capability is synchronized to main specs by apply.

The subsequent archive sync consolidated the same experimental contract in
[the main spec](../../../openspec/specs/independent-element-bindings/spec.md).
It preserves the pending performance gate and does not approve production use.
