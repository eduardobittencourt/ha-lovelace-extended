# Research

## Scope

Roadmap stage 0, principally D0: can existing evidence support a short, integration-aware desk scope and verifiable acceptance scenarios without adding product behavior? D1 and D2 are consulted only to preserve the versioned reference and remaining gates. This is a documentation synthesis, with no new HA access, source adoption, benchmarks or physical execution.

## Evidence

Sources were read in the checkout on 2026-11-19, before applying this synthesis; E1–E4 describe that input state. Historical dates and versions below describe the original observations; reading an archive again does not verify the current installation.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | Stage 0 has one remaining synthesis item; stage 1 has an open justified-budget gate; stage 2 remains pending. | [Roadmap](../../../../docs/roadmap.md), current checkout, 2026-11-19 | Read stage tasks and exits | A plan is not execution evidence | Scope this delivery to the stage 0 synthesis |
| E2 | Historical read-only inspection found a cover with percent position and open/close/stop/set-position actions, a separate cm sensor and three button memory targets. Command completion cannot establish arrival; memory press timestamps are not selected-memory state. | [Initial research, desk role map and comparative matrix](../2026-11-15-discover-desk-and-frontend-contracts/research.md#desk-role-map-task-13), observed 2026-11-14, Core 2026.11.1 | Reread the sanitized original findings and compare with the current MVP role map | No physical validation or current-installation check; private source is not a public normative dependency | Preserve role aliases, direct height source and honest feedback boundaries; reverify capabilities during later implementation validation |
| E3 | The user chose external lock/unlock, fixed composition, a visual editor and three memories. The current proposed-experience row still describes position/height as cover information despite the separate height source documented above it. | [MVP](../../../../docs/mvp.md), [decisions](../../../../docs/decisions.md), current checkout, 2026-11-19; lock decision dated 2026-11-14 | Compare role map, proposed experience, editor flows and acceptance checklist | Exact allocations and full desk behavior remain unvalidated | Reconcile the height wording without adding conversion or in-card lock controls |
| E4 | Current sequencing permits experiments before phone baselines, while requiring performance approval and full desk/device validation at their dependent exits. Earlier archive entry gates are superseded. | [Roadmap](../../../../docs/roadmap.md), [discovery](../../../../docs/discovery.md), [decisions: sequencing](../../../../docs/decisions.md#layout-and-validation-sequence--2026-11-18), decision dated 2026-11-18 | Compare current guidance with the original research's open questions and future experiment plan | Archive describes historical intent, not current stage ownership | Use current stage ownership; preserve archived history |
| E5 | The bounded two-slot contract has 9 requirements and 19 scenarios; its delivery demonstrates editor/binding correctness and recorded Chromium coverage, not a complete desk card. | [Consolidated experimental spec](../../../specs/independent-element-bindings/spec.md), [experiment research](../2026-11-19-demonstrate-minimum-card-contract/research.md), 2026-11-19, Core 2026.11.1 / frontend 20261028.5 | Read the complete spec and the recorded execution/acceptance findings | Synthetic targets and limited browser/layout/input coverage; no production or physical acceptance | Reference experimental evidence without marking full-desk scenarios passed or changing the main spec |
| E6 | Technical review explicitly withholds performance acceptance: unapproved numerical requirements, shared HA/driver attribution, a retained cold outlier, and heap/paint limitations remain. | [Budget review](../../../../experiments/minimum-card-contract/results/budget-review.json), [research: budget review](../2026-11-19-demonstrate-minimum-card-contract/research.md#budget-review-and-fresh-verification--task-54), 2026-11-19 | Read the recorded decision, candidate scope and limitations | Fresh within-candidate observations do not supply agreement or resolve unsupported metrics | Keep performance closure separate; carry the gaps into a concise handoff without accepting or changing limits |

Evidence reuse is sufficient to plan this synthesis: the delivery documents the dated contract rather than asserting unchanged live behavior. No external-source or installation revalidation is needed to make that editorial decision. New behavioral or current-compatibility claims would require separate evidence before adoption.

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| The existing intent and role map suffice for the stage 0 exit without broader discovery. | Traceability from every current MVP criterion to a scenario, provenance, expected result and later validation owner | Confirm if all criteria and verified roles are covered without invented integration behavior; refute if material user intent is missing |
| The synthesis can stay small inside the current MVP document. | Revised acceptance section, role map and consistency checks against linked status documents | Confirm if contributors can determine what to test and what remains unvalidated without another parallel scope document; reconsider if meaningful duplication remains |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Does each MVP criterion have sufficient preconditions, expected outcome and evidence provenance? | Resolved by R2 | All eleven criteria map to observable scenarios with provenance and evidence ownership | Execute and record results in later scoped validation; none passes here |
| Is there unrecorded user intent needed to resolve a scenario? | Resolved for this synthesis | R1/R2 found no material conflict or missing intent needed to define the existing scope | Revisit if later evidence changes scope; do not infer new behavior |
| What exact allocations and reference-device/accessibility results are acceptable for the complete desk composition? | Deferrable to scoped stage 2 validation | Stage 0 needs testable checks and recorded environments, not fabricated dimensions or a tested full card | Specify fit/input checks and evidence fields; leave results pending |
| What budgets and additional methods will justify stage 1 acceptance? | Deferrable to a separate stage 1 change | E6 establishes unresolved requirements and methodological work; this does not block documenting desk scope | Record the review gaps and agreement needed; do not approve limits here |
| Does the actual desk execute commands and provide usable feedback in everyday use? | Deferrable to separately scoped stage 2 physical/user validation | Dated read-only evidence cannot establish execution or arrival | Describe the external-lock prerequisite and distinguish UI, transport and physical observations |

## Research and Experiments

### R1. Reconcile the bounded desk contract

Use E2–E4 and the existing MVP only. Check each role, unit, action, capability precondition and feedback limitation against its dated source. Record editorial resolutions in this artifact during apply. Completion means no contradictory height/percent, unknown-button, lock or arrival semantics in the synthesized scope. Do not expand connectivity/problem entities into new mandatory controls or invent missing data. Side effects are documentation edits only.

### R2. Construct acceptance traceability

Use the current acceptance checklist, candidate editor flows and E5. Give each scenario a stable identifier, precondition, trigger, expected observable result, evidence method, provenance and owning milestone. Map every existing checklist item to one or more scenarios and identify which two-slot findings are only supporting evidence. Cover each of the three memory targets, capability-aware primary controls, independent cm/percent data, configuration/edit persistence, failure/cancellation, reconnection, allocated layout/input checks and physical/everyday validation. Keep all full-desk acceptance results pending. Completion is a coverage review with no orphaned criteria or implied passes; any missing material intent remains a blocker. No scenario is executed here.

### R3. Record gate ownership and review consistency

Use E1, E4 and E6 to distinguish stage 0 specification completeness, stage 1 performance approval and stage 2 full-MVP validation. List the separate performance follow-up's unresolved requirement agreement, cost attribution, retained outlier and heap/paint limitations without designing its experiment. Update only affected current documentation, then verify links and stage statements. Mark stage 0 complete only if R1/R2 actually meet its exit; otherwise record the specific blocker. No new measurements, stack decisions, runtime changes or archived edits are part of this change.

## Outcome

**Status: documentation synthesis complete; stage 0 definition exit met.** R1 reconciles the dated contract, R2 maps all eleven criteria, and R3 records consistent gate ownership and the separate performance handoff. No material synthesis blocker remains. Every full-desk acceptance result remains pending; stage 1 performance approval and stage 2 desk/device/accessibility, integration, physical and everyday validation remain open. No live inspection, command, benchmark, budget adoption or production decision occurred.

## Execution findings — 2026-11-19

### R1. Desk contract reconciliation

Compared E2's archived desk map and comparative matrix with E3's current intent and E4's sequencing. Every role row in the MVP now explicitly shares the 2026-11-14 / Core 2026.11.1 provenance. The primary cover retains percent `current_position`, observed feature mask 15 and open/close/stop/set-position actions (the latter takes position); the separate sensor retains direct cm display. Corrected the proposed-experience row that attributed height to the cover. No rounded-percent conversion is adopted.

All three memory aliases retain independent `button.press` targets; `unknown` from never having pressed is not equivalent to unavailable. Lock/connectivity/problem remain contextual observations, not added mandatory controls. The external-lock decision is dated 2026-11-14; no unlock control or automatic unlock is introduced. Local source inspection and action metadata cannot establish deployed firmware identity, execution, selected memory or physical arrival. No material intent conflict remains for this bounded scope; live capability revalidation and physical feedback remain later work. R1 is complete as documentation reconciliation only.

### R2. Acceptance coverage review

The eleven existing checklist criteria remain unchecked in `docs/mvp.md`, with stable scenario references added in their original order. Each scenario has an explicit precondition, trigger, expected observable result, evidence method and provenance key. Shared evidence instructions supply the destination, pending status and milestone (stage 2, with PERF's stage 1 prerequisite). No scenario was executed.

| Original criterion | Scenario coverage | Review result |
| --- | --- | --- |
| 1. Visual creation without YAML | EDIT-CREATE | All delivered fields, safe preview and actual HA editor covered |
| 2. Primary entity and correct available information | DATA, UNKNOWN | Percent and cm remain independent; missing numbers never become zero |
| 3. Supported primary semantics | PRIMARY, PHYSICAL | Open/close/stop/set-position, capability absence and later actual execution covered |
| 4. Three independent memories | MEMORY-1, MEMORY-2, MEMORY-3, PHYSICAL | Every target has a separate assertion and later physical observation |
| 5. Inner/body independence | ISOLATION, ERROR, CANCEL | Positive dispatch counts and negative/error/cancel paths covered |
| 6. Save/reload/edit persistence | EDIT-ROUNDTRIP, RECOVER | Whole configuration and single-binding preservation covered |
| 7. Unavailability/errors without false success | INVALID, MISSING, UNAVAILABLE, UNKNOWN, ERROR, CANCEL, RECOVER | Distinct limitations, domain-aware buttons and independent usable controls covered |
| 8. No unsupported reached-memory claim | FEEDBACK, PHYSICAL | Press/transport/position do not establish selected/reached memory |
| 9. Layout and accessible input | LAYOUT, INPUT | Sections/Masonry allocations, labels, enlarged text, themes/locales, keyboard/touch/focus/names and reference-device metadata covered |
| 10. Justified performance acceptance | PERF | Stage 1 approval plus final-MVP repetition; UI, transport and physical phases remain separate |
| 11. Replacement and user validation | EVERYDAY | Prerequisites, observation period, discrepancies and explicit user acceptance covered |

All eleven criteria have coverage, without adding device support, mandatory context controls, dimensions, gesture semantics or numerical limits. E5 supplies supporting two-slot editor/isolation/recovery/layout evidence only. Its synthetic fixtures, recorded Chromium and emulated inputs cannot pass any complete-desk row or establish Safari, assistive-technology or physical acceptance. Exact allocations/device findings, actual motion/feedback and everyday acceptance remain stage 2 evidence obligations. R2 is complete; no material missing user intent was uncovered. Both synthesis hypotheses are supported by the resulting single-document coverage, within dated-source limits.

### Stage 1 performance handoff

A separate bounded stage 1 delivery must resolve E6 before performance acceptance:

- Obtain explicit agreement on numerical usability requirements, metric/workload scope and justified budgets. The implementation agent's prior technical review and authorization to experiment supply no maintainer approval. This synthesis adopts none of the candidate numbers.
- Resolve attribution of shared HA/automation-driver load, editor/update CPU and transfer costs, including the different native composition. Current descriptive totals do not establish isolated per-card production costs or justify a stack choice.
- Retain the discovery cold observation of **1108.60 ms**, above the proposed one-second goal. Fresh within-candidate observations neither erase it nor supply requirement agreement; do not move a limit merely to turn that observation into a pass.
- Address retained-heap and paint evidence limits: the single same-node forced-GC series is diagnostic, not a general leak/budget result; the recorded next-frame opportunity includes automation observation and is not guaranteed final compositor paint or device response.

The [recorded review](../../../../experiments/minimum-card-contract/results/budget-review.json) and [fresh-verification discussion](../2026-11-19-demonstrate-minimum-card-contract/research.md#budget-review-and-fresh-verification--task-54) remain authoritative historical results. Budget approval, selection of additional methods and any fresh acceptance campaign are outside this delivery, not silently completed or designed here. PERF assigns final-desk repetition to stage 2 and preserves distinct UI/HA-transport/physical evidence. Stage 1's exit stays open.

### R3. Stage 0 exit evaluation

R1 preserves all observed roles/actions, units, capability guards and feedback limitations, and resolves the cover/height contradiction without adding behavior. R2 covers all eleven criteria with observable outcomes, provenance and later evidence ownership. No material intent or integration assumption remains necessary to define this bounded scope. Stage 0's specification exit is therefore met on 2026-11-19, not deferred merely because execution belongs to later stages.

Updated README, roadmap, decisions and discovery to distinguish completed definition from pending performance/full-MVP execution. Also corrected the OpenSpec guide's stale “remaining scope synthesis” reference so its historical archive summary points to this later outcome. Archived evidence, the experimental contract, config/schema and runtime remain unchanged. Unknown exact fit/device results, live capability/firmware identity, physical feedback and everyday acceptance are explicit stage 2 obligations, not synthesis blockers or inferred passes. R3 is complete.

### Integrated documentation checks — task 4.1

- Reviewed the complete tracked diff and all five new change files (including metadata); only README/current docs and this documentation change are affected. The OpenSpec guide edit repairs an affected status reference. Existing archives, main specs, experiment/runtime files, generated skills, dependencies and HA environments are untouched; no credentials or installation inventory were added.
- `git diff --check`: passed. Separately checked final new-file whitespace and terminal newlines, because untracked files are not included by that command.
- Relative-link/heading check: **101** local links/anchors across the six affected current Markdown documents and four change Markdown artifacts resolved. Scenario references cover all eleven unchanged checklist intentions; current stage statements consistently distinguish definition from execution.
- `openspec validate synthesize-desk-mvp-acceptance --strict --no-interactive`: passed; CLI explicitly accepted zero deltas because `skip_specs: true` remains set.
- `openspec schema validate research-first --json`: passed, `valid: true`, no issues. Change metadata still selects `research-first`; no delta-spec directory was created.

These are documentation/structural checks only. No browser/device, performance, integration, physical or everyday scenario was executed. All seven documentation tasks are complete; review the synthesis before separately requesting archive or subsequent performance/MVP work.

### Archive assessment — 2026-11-19

Archived with all four required planning artifacts complete, specs explicitly skipped and all seven tracked tasks complete under `research-first`. Sync assessment found no delta specs in the CLI-returned artifact paths; no main specification needed modification. Archive preserves the completed scope definition and all pending performance/full-desk gates. Relative links were adjusted for the archive depth and current documentation now points to this archived record.
