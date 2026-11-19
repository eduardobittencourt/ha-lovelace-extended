# Proposal

## Why

Stage 1 has established the minimum card's functional contract and completed the cold-start diagnosis. The [combined performance review](../../../../experiments/minimum-card-contract/performance-diagnostics/stage-review.json) leaves five required rows pending and preserves two historical cold failures. A single decision record should make clear which findings can inform the desk MVP and which still block performance acceptance.

## What Changes

- Consolidate the existing D2 evidence into a ten-row review with separate fields for measured results, approved limits, unresolved findings, and the next decision or piece of evidence needed for each row.
- Use the measured workloads and intended desk usage to assess candidate budgets for dashboard load CPU, network transfer, and update work. Bring justified candidates to the maintainer for explicit agreement and record any requirements still missing.
- Preserve the approved cold-readiness limit and both historical exceedances. Use the completed diagnosis to specify what additional evidence could distinguish shared startup from measurement variance and card work.
- Record the measurement prerequisites for retained bytes and final presentation, and prepare a desk MVP handoff keyed to the existing D3 acceptance scenarios. State whether each unresolved item blocks stage 1 exit, a cost-dependent implementation choice, or a specific MVP verification result.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This change covers evidence review, decisions, and documentation and uses `skip_specs: true`.

## Impact

The deliverable is a published evidence review and an explicit roadmap disposition. The current [stage 1 exit](../../../../docs/roadmap.md#1-demonstrate-the-minimum-card-contract) applies. If essential evidence is still unavailable, publish the blocker and handoff for MVP planning with the stage open. Fresh browser campaigns, new instrumentation or lab environments, runtime changes, stack selection, desk implementation, and physical or production Home Assistant tests require separate scope.
