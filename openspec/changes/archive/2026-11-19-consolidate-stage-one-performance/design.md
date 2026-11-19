# Design

## Context

The approved-limit matrix and combined review describe different things. The matrix records the acceptance rules and method coverage. The combined review records results for particular campaigns and the overall stage disposition. See the [proposal](proposal.md#why) and [research evidence](research.md#evidence).

## Goals / Non-Goals

**Goals**

- Produce a handoff that identifies each acceptance decision, its evidence, and the action that can resolve it.
- Translate performance findings into stage 2 planning inputs and repeat-verification criteria.

**Non-Goals**

- Implementing a new evaluator, changing existing measurement endpoints, or selecting an MVP runtime or editor architecture.

## Decisions

### Keep one decision record with traceable evidence

Add the ten-row disposition and MVP handoff to `research.md` during apply. Use the existing metric IDs so each row can cite the corresponding approval, results, method, and limitations. Record the measured result, approval state, overall disposition, and next evidence separately. Link to this record from the roadmap and decisions. A summary containing only the latest pass/fail column would obscure E2's distinction between the latest cold campaign and the unresolved historical failure.

### Derive candidate limits from the user experience

For load CPU, evaluate a representative device/workload and a main-thread processing allowance, using `TaskDuration` as a candidate metric and `ScriptDuration` as supporting evidence. For transfer, tie cold and warm byte allowances to a representative bandwidth and wait-time objective, documenting the shared HA contribution and any portion of the objective allocated to transfer. For updates, connect candidate task-time limits to a responsiveness or occupancy allowance for the intended device, and keep relevant/unrelated activity, group counts, and 1 Hz/20 Hz windows distinct. E4 provides starting measurements and candidate statistics. Choosing a limit from the largest observed sample would describe the lab run without justifying an experience budget.

For each supported candidate, record units, workload and environment, statistic, rationale, uncertainty, and exceedance handling. Explicit dated agreement establishes the limit. Performance acceptance also requires supported, comparable verification evidence under that limit. Document the verification still needed when approval or eligible evidence is absent. Reuse the existing verification policy's treatment of missing samples and valid outliers when defining follow-up criteria.

### Scope further measurement by the missing signal

For cold readiness, use E2's phase findings to document how a follow-up would distinguish pre-mount startup and post-frame observer delays while preserving the approved reference endpoint and measuring instrumentation overhead. Keep the 1000 ms ceiling and recorded exceedances in view. Consider a card intervention only after evidence isolates a contribution that it could address. For retention and presentation, E5 identifies what a new method or environment must show before a full schedule can be proposed. The previously completed campaigns already supply a baseline for these decisions.

### Make the roadmap disposition explicit

Compare the completed review to the [stage 1 exit criteria](../../../../docs/roadmap.md#1-demonstrate-the-minimum-card-contract). Record stage 1 as open whenever required evidence is missing or failing. The stage 2 handoff can still identify behavior and scenario preparation supported by E1, the PERF requirements and rows to repeat on the final MVP, and choices contingent on passing performance evidence. Carry forward full-desk layout, reference-device accessibility, physical validation, and everyday acceptance as stage 2 work. Use a separately scoped change for the next implementation or measurement delivery.

## Risks / Trade-offs

- **Shared costs can obscure a regression.** Preserve raw historical outcomes through source links and describe matched-control contrasts as descriptive until attribution is established.
- **A benchmark can satisfy the lab objective while missing the intended desk experience.** Record representative workload assumptions and require comparable verification on the final MVP.
- **A completed document review can be mistaken for a passed milestone.** Record document completion and roadmap disposition separately and make each remaining prerequisite visible in the handoff.
