# Tasks

Applying this change delivers research/documentation only. The experimental code described in the brief is not a tracked deliverable here.

## 1. Establish the revised validation sequence

- [x] 1.1 Recheck the sizing/editor references and current gate statements identified in research E1–E6; update research with any changed findings and verify that no conclusion depends on an unmeasured runtime result.
- [x] 1.2 Revise `docs/roadmap.md` stage 0, stage 1 and performance-protocol guidance using the design's dependency map; verify that experiment entry does not require a particular phone or numerical baseline and that every displaced validation item retains an explicit destination and acceptance gate.
- [x] 1.3 Reconcile D1/D2 and proceeding criteria in `docs/discovery.md`, and record the superseding layout/device and sequencing decisions in `docs/decisions.md`; verify agreement with the revised roadmap and preserve unselected stack/version/support decisions.

## 2. Align layout guidance and the next-experiment brief

- [x] 2.1 Update `docs/architecture.md` and `docs/mvp.md` to distinguish HA dashboard allocation, responsive internal arrangement and reference test environments; verify that the fixed desk composition and all MVP acceptance criteria remain represented without a fixed phone viewport or implied private-component dependency.
- [x] 2.2 Review and finalize the bounded experiment brief in this change's `research.md`, then link it from `docs/roadmap.md` and `docs/openspec.md`; verify coverage of two independent bindings, visual save/reopen in HA, isolated actions, update/lifecycle checks, container-width and accessibility cases, comparable measurements and explicit future environment/code scope.
- [x] 2.3 Reconcile `README.md` resumption guidance and the remaining gate statements in `docs/openspec.md`; verify that the next step is a separately scoped experimental proposal, that reference-device samples are not a start prerequisite, and that no product implementation or stage completion is claimed without evidence.

## 3. Verify cross-document consistency and record the outcome

- [x] 3.1 Review all affected current documents together and search for stale pre-experiment device/baseline gates; verify the design's entry/acceptance map has no contradictory current consumer and that archived research remains unchanged and clearly historical.
- [x] 3.2 Update this change's research outcome with delivered documentation, remaining measurement/compatibility limits and the actual check results; verify local Markdown links and newly added files, run `git diff --check`, `openspec validate align-roadmap-with-native-ha-layout --strict --no-interactive` and `openspec schema validate research-first --json`, and record any limitation.

## Workflow follow-up

- Review and archive the documentation change when its outcomes are demonstrated.
- Propose the bounded stage 1 experiment separately, selecting its reproducible environment and concrete checks before execution. Do not start it as part of applying this change.
