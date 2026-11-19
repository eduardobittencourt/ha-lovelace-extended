# Tasks

## 1. Reconcile existing results

- [x] 1.1 Add a ten-row decision table to `research.md` using the metric IDs from the combined stage review. Check one-to-one coverage, source links, measured results, approval status, and current disposition against the budget matrix and campaign records. Preserve the four bounded passes and the distinct fresh and historical cold outcomes.
- [x] 1.2 Document the remaining cold, retention, and presentation evidence needs. Verify that the cold follow-up conditions preserve the approved endpoint, matched controls, observer-overhead checks, the 1000 ms ceiling, and both historical failures. Verify that the other two rows identify their failed calibrations and the conditions for a valid future method.

## 2. Review CPU, transfer, and update budgets

- [x] 2.1 Match the existing measurements to representative desk workloads and user objectives. For each of load CPU, transfer, and updates, record an evidence-backed candidate with its boundary, units, workload, statistic, rationale, uncertainty, and exceedance policy, or the specific requirement or observation that prevents choosing one. Check that shared HA costs, cache classes, and unlike update windows are represented correctly.
- [x] 2.2 Submit supported candidates or focused requirement questions for maintainer review. Record any explicit dated agreement and applicable verification evidence per metric. Check that absent agreement or missing comparable verification leaves the affected row pending and that the comparison preserves local UI, HA transport, and physical response as distinct endpoints.

## 3. Deliver the MVP handoff

- [x] 3.1 Publish a stage 1 exit disposition and stage 2 handoff in `research.md`. Verify that each open row names the next decision or evidence needed, and that the handoff identifies the PERF prerequisites and repeat-verification scope. Reference existing full-desk, reference-device, physical, and everyday scenarios with their current status.
- [x] 3.2 Link the decision record from the roadmap and decisions, updating the README or discovery map where their summaries would otherwise become stale. Verify that links resolve, historical records are preserved, and the milestone status reflects the evidence. Run `git diff --check` and `openspec validate consolidate-stage-one-performance --strict --no-interactive`.
