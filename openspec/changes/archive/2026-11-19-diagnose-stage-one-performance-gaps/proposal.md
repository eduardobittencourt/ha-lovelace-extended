# Proposal

## Why

Roadmap stage 1 remains open: fresh verification measured experimental ten-group cold readiness at 1104.80 ms against the approved 1000 ms maximum, and six required performance rows remain pending. Diagnose the cold exceedances and resolve measurement/requirement gaps before choosing an optimization, aiming for readiness below 1000 ms with defensible headroom where feasible.

## What Changes

- Deliver a bounded D2 investigation of the unchanged minimum-card experiment, preserving the earlier 1108.60 ms observation and the approval-backed failure in the [verification review](../../../../experiments/minimum-card-contract/performance-followup/review.md).
- Distinguish HA/bootstrap, resource loading, card work and driver observation on the cold critical path through controlled diagnostics. Report uncertainty and competing causes instead of assigning shared elapsed time to the card.
- Investigate calibrated retained-byte attribution and content-to-presentation measurement. Keep unsupported required evidence pending; weak-reference collection and DOM/rAF milestones alone do not satisfy these rows.
- Develop requirement-backed budget proposals for load CPU, transfer, editor and updates, and for retention/presentation only where methods support them. Request explicit numerical agreement before acceptance collection for newly defined limits.
- Record the maintainer's preference from this request: seek measured cold readiness below 1000 ms and explore whether a tighter ceiling is feasible. Preserve the approved 1000 ms ceiling until a specific alternative is justified and explicitly agreed; no lower number or improvement is promised here.
- Publish sanitized diagnostics, a complete ten-row gate review and an evidence-backed optimization recommendation or a precise blocker report. Update affected stage 1 documentation from actual findings during apply.

### Boundaries and unknowns

This change delivers research, measurement tooling and documentation; it does not change the experimental runtime, CSS, recorder semantics or editor behavior. Runtime optimization belongs to a subsequent bounded change after causal evidence identifies a useful intervention. Production stack selection, full desk implementation, reference-device acceptance, production HA changes, physical commands, publication and releases are outside scope.

Blocking questions for dependent conclusions are the cold critical path, instrumentation bias, retained-byte attribution and presentation-method validity. Sources are the frozen local captures and driver/source identities, controlled runs in the pinned disposable lab, and versioned browser/protocol documentation inspected during execution. New numerical agreements block only dependent verification, not diagnostic research. A negative or unsupported result is a valid delivery and keeps the stage gate open.

## Capabilities

### New Capabilities

None. This is a research/tooling/documentation change with `skip_specs: true`.

### Modified Capabilities

None. The existing `independent-element-bindings` experimental requirements, including honest incomplete/failing evidence, remain unchanged.

## Impact

During apply, add separate diagnostic entry points under `experiments/minimum-card-contract/tools/` and sanitized outputs under `experiments/minimum-card-contract/performance-diagnostics/`; preserve historical helpers, results, frozen plans and archives. Raw captures and investigation scripts stay outside the checkout under the project's research convention. Reconstruct only the disposable isolated HA lab using the documented baseline and safe synthetic interception; record environment identities, storage safeguards and cleanup. No new production dependency or compatibility commitment is selected. Update README, experiment guidance, roadmap, discovery, decisions and OpenSpec guidance only as affected by actual outcomes.
