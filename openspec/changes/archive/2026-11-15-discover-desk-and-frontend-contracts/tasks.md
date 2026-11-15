# Tasks

These tasks execute research and documentation only. They do not authorize product code, dependency installation, HA configuration changes, service/action calls, or physical tests. Public investigations can proceed if private access is missing; dependent conclusions must stay blocked. Every task is pending at proposal creation.

## 1. Establish evidence sources and public comparison cases

- [x] 1.1 Recheck the relevant project research directory and establish an evidence register in research.md; verify each reused conclusion has a current source check, date/version, method, limitation, and consequence, with auxiliary material stored under the prescribed project research path.
- [x] 1.2 Select the public non-desk cover and non-cover multi-entity examples described in R1; record selection rationale, accessible primary sources, provenance, and research-only scope in research.md, verifying that each challenges an identified desk assumption rather than claiming general support.
- [x] 1.3 Inspect the relevant actual desk entities and integration contracts through read-only access; record the sanitized role/data/action/unit/availability/feedback map in research.md and update docs/mvp.md with verified details only. Verify no private entity IDs, full configuration, unsupported height conversion, or assumed memory domain is published; if access is unavailable, record the exact evidence gap and leave this task and dependent contract work pending.
- [x] 1.4 Complete the public comparison rows from current official domain/integration docs and source; deliver the three-case matrix in research.md, distinguishing reusable bindings, domain behavior, and installation mappings. Verify citations and revisions support every claimed difference, and keep any missing private row explicitly incomplete.
- [x] 1.5 Reconcile D0/D1 guidance in docs/discovery.md and the example boundary in docs/mvp.md with the matrix; verify the desk remains the first concrete acceptance case while the library goal and comparative cases are understandable without private access. Do not settle desk-dependent details while task 1.3 is pending.

## 2. Assess frontend contracts and describe bounded flows

- [x] 2.1 Select and record a target HA/frontend revision and candidate native reference using official sources; deliver a source/version register in research.md and update docs/decisions.md, verifying that research target and minimum supported version are distinguished and that unresolved choices remain labeled.
- [x] 2.2 Inspect version-matched card/editor, selector/action, sizing, lifecycle, update, theme/language, event, and accessibility contracts; deliver the R2 classification table in research.md and update docs/architecture.md with supported observations, verifying that undocumented internals are never described as stable public APIs.
- [x] 2.3 Review the selected public custom-card precedents for bindings/composition and visual editing; record source/revision, observed approach, omissions, and relevance in research.md. Verify comparisons are supported by maintainer docs/source and imply neither dependency adoption nor copied code.
- [x] 2.4 After required case and frontend evidence exists, describe the proposed fixed regions and create/edit/validate/save/reopen/error flows in docs/mvp.md, including independent actions, missing/unavailable data, keyboard/focus/touch, and feedback limits. Verify each flow traces to evidence and mark any runtime-dependent claim as requiring the later experiment.

## 3. Define validation, baseline status, and the later experiment

- [x] 3.1 Record the reference device/browser, dimensions, language/theme, network/cache conditions, workloads, repetitions, tools, and evidence destination in research.md; deliver the R3 protocol and reconcile docs/roadmap.md, verifying reproducibility and separate treatment of interface, transport, and physical latency.
- [x] 3.2 Assess and, where possible with passive existing tools, collect comparable native/current-solution baselines without action calls or environment changes; record observations, samples, limitations, and justified candidate acceptance limits in research.md. Verify missing measurements remain explicitly pending, proposed-card performance is unmeasured, and no numeric limit is invented; leave measurement-dependent stage exits open when access is insufficient.
- [x] 3.3 Define validation scenarios for loading, updates, lifecycle/memory, editor persistence, event independence, availability/errors, reconnection, and accessibility; document expected evidence and which scenarios need synthetic/code/physical work later. Verify no scenario requires disrupting the live installation during this research delivery.
- [x] 3.4 Record the R4 stage 1 experiment plan and remaining go/no-go gates in research.md and docs/decisions.md; verify hypotheses, bounded workload, pass/fail criteria, side effects, and evidence destination are stated, with unresolved baseline gates labeled and no experiment implementation included.

## 4. Check consistency and report readiness

- [x] 4.1 Reconcile README.md and docs/openspec.md with the actual change/workflow state, and cross-check the touched MVP, architecture, discovery, decisions, and roadmap text; verify links resolve, content remains English, the desk is an example rather than the final library objective, license selection stays visible, and no future feature is presented as delivered.
- [x] 4.2 Update research.md Outcome with observed results, unanswered questions, and separate assessments of research-delivery completion and stage 0 exit criteria; verify each completed task/roadmap item has evidence and any access, measurement, or physical-validation blocker remains open before dependent work.
- [x] 4.3 Run `openspec validate discover-desk-and-frontend-contracts --strict --no-interactive`, inspect change status and the repository diff, and verify public conclusions have traceable sources, no secrets/private inventories are present, and no code, dependencies, HA changes, or runtime specs were introduced. Record validation results without equating structural validity with product readiness.

## Workflow follow-up

- Review actual findings before requesting archive; do not archive a plan as completed research.
- Scope product experimentation or physical validation as a separate, explicitly requested change after its prerequisite gates are satisfied.
