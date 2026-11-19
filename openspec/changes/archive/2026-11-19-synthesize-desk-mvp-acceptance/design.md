# Design

## Context

See [proposal.md](proposal.md) for motivation and [research.md](research.md), E1–E6, for evidence. The implementation target is documentation. A short design is useful because evidence/status reconciliation crosses several documents and must distinguish dated contracts, future acceptance and demonstrated experimental behavior.

## Goals / Non-Goals

**Goals:** Establish one acceptance reference with traceable criteria, conservative evidence labels and consistent stage ownership.

**Non-Goals:** Define a production architecture, public configuration schema, exact layout dimensions, numerical performance requirements or a new validation harness. The research plan's unresolved coverage questions are the work of this synthesis, not assumptions for product implementation.

## Decisions

### Keep the acceptance reference in the existing MVP document

Refine `docs/mvp.md` rather than creating a parallel desk specification or extending the experimental main spec. Preserve the existing `acceptance-criteria` anchor and coverage of all eleven checklist items. Use compact scenario rows or short scenario descriptions with stable identifiers, preconditions, triggers, expected results, evidence methods, provenance and owning milestones. Split rows where a combined expectation would hide a distinct failure or evidence requirement.

Alternative: a new acceptance document would add another scope authority and link-maintenance burden without evidence of need. A main runtime spec would imply a delivered contract beyond the two-slot experiment (E5). `skip_specs: true` therefore applies to this change.

### Reconcile semantics using recorded evidence without extending scope

Use the existing role map and E2/E3 as the baseline: cover percent and supported actions, direct cm sensor display, three independent memory presses, external lock prerequisite and no invented arrival/selection feedback. Preserve domain-aware handling of `unknown` buttons. Clarify ambiguous wording without adding mandatory controls or choosing a generic expression system. If reconciliation exposes missing user intent, record and resolve it before adopting the affected behavior.

Alternative: infer new behavior from domain names or stale snapshots. That would undermine the stage 0 exit and exceed a documentation synthesis. No current-installation claim is needed; preserve dates and require later revalidation against the implementation environment.

### Separate acceptance definition, supporting evidence and execution results

Scenarios are prospective full-MVP checks. Link relevant two-slot findings as supporting evidence without marking full-desk scenarios passed. Assign performance-budget approval to stage 1 and repetition on the final desk card to stage 2. Keep allocated-size, long-label/text-scaling, keyboard/touch/focus/name and remaining reference-device coverage explicit. Distinguish local UI feedback, HA transport and actual desk movement, especially when the external lock can prevent execution (E2, E4–E6).

Alternative: count archived tasks or prototype correctness as full acceptance. Neither proves the complete desk experience, costs or physical results. This change introduces no runtime loading, update, lifecycle, accessibility or compatibility cost; it documents the checks whose future implementations must supply evidence.

### Close stage 0 only from a completed coverage review

Stage 0 completion requires a coherent short scope, every existing criterion mapped to observable scenarios, role/action provenance, explicit limitations and no unresolved material intent. Record the review outcome in `research.md` before updating stage 0 statements in the roadmap and affected current documents. Readiness for later implementation remains subject to its own proposal and gates. Keep archived files and `openspec/config.yaml` unchanged; current docs and this change carry the updated state.

Alternative: bundle performance closure with the synthesis. E6 shows unresolved requirement agreement and measurement limitations, so a separate bounded stage 1 delivery is more reviewable. The handoff here lists those gaps rather than supplying budgets or measurement code.

## Risks / Trade-offs

- [Historical evidence mistaken for current installation facts] → Retain original dates/versions and label later live/physical validation as pending.
- [Acceptance refinement grows into product design] → Preserve agreed scope; stop on material missing intent and leave stack, public syntax and exact dimensions to dependent work.
- [Scenario definition is mistaken for a passed test] → Keep prospective desk results pending and experimental evidence explicitly bounded.
- [Stage 0 status diverges across documents] → Review README, roadmap, MVP, decisions and discovery together; adjust only statements affected by actual synthesis results.
- [A compact matrix becomes unreadable] → Keep each expected result testable, split independent cases and link shared provenance instead of copying source narratives.

## Migration Plan

Apply the documentation edits, review traceability and relative links, then update status from the recorded outcome. No deployment, runtime migration or HA operation is involved. Reverting the documentation diff restores the previous state; archived evidence and experimental contracts remain intact.
