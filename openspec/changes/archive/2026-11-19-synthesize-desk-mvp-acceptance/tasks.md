# Tasks

## 1. Reconcile the desk scope

- [x] 1.1 Reconcile `docs/mvp.md` against research E2–E4, correcting the height/cover wording and preserving capabilities, units, three memory targets, domain-aware `unknown` handling, external lock and feedback limitations; verify every role/action has dated provenance and record the resolutions in this change's `research.md`. Resolve material missing intent before adopting affected wording.

## 2. Make acceptance verifiable

- [x] 2.1 Refine visual creation/editing, independent display/action bindings, supported primary controls, all three memories and body-action isolation into identifiable scenarios in `docs/mvp.md`; verify each has a precondition, trigger, observable expected result, evidence method, provenance and milestone, and that save/reload/reopen plus single-binding edits preserve untouched configuration.
- [x] 2.2 Define the remaining error/missing/unavailable/domain-specific-unknown, cancellation, reconnection, layout/input/accessibility and physical/everyday scenarios in `docs/mvp.md`; verify independent usable controls remain covered, no command replay or false arrival is allowed, external lock handling is explicit, and device metadata, allocations, long labels, enlarged text, keyboard/touch/focus/names and user acceptance have evidence destinations. Define checks only; execute no scenario.
- [x] 2.3 Map all eleven original MVP checklist criteria to the resulting scenario identifiers and record the coverage review in `research.md`; verify none is omitted, full-desk results remain pending, two-slot evidence is labeled supporting only, and performance coverage separates local UI cost, HA transport and physical response without adopting numerical limits.

## 3. Record milestone ownership and the next handoff

- [x] 3.1 Record the separate stage 1 performance handoff in `research.md` and link it from the appropriate current status document; verify it identifies requirement agreement, shared-cost attribution, the retained cold outlier and heap/paint limitations from E6, with budget approval and fresh acceptance explicitly outside this delivery.
- [x] 3.2 Evaluate the stage 0 exit using the reconciled scope and coverage review, then update affected statements in `docs/roadmap.md`, `docs/decisions.md`, `docs/discovery.md` and `README.md`; verify stage 0 is marked complete only if no material synthesis blocker remains, stage 1 and full-MVP gates stay open, links resolve and no future behavior is presented as delivered. Record the actual outcome and limitations in `research.md`.

## 4. Check the integrated documentation change

- [x] 4.1 Review the complete diff and new files, check relative links/anchors and consistent status across the affected documents, and run `git diff --check`, `openspec validate synthesize-desk-mvp-acceptance --strict --no-interactive` and `openspec schema validate research-first --json`; verify only scoped documentation/change artifacts were edited, `skip_specs: true` remains set, no delta specs were created and runtime, archived evidence, credentials and HA environments are untouched. Record check results in `research.md`.

## Workflow follow-up

- Review the completed synthesis before archiving this change.
- Propose stage 1 performance closure separately, using the handoff and any required user decisions; propose the complete desk MVP under its own implementation scope.
