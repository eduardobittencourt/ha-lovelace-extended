# Proposal

## Why

Stage 1 has demonstrated the bounded card contract, but CPU, transfer and update acceptance lack justified limits. The maintainer has requested evidence rather than guessed thresholds; equivalent comparative measurements tied to dashboard interaction can support concrete budget proposals.

## What Changes

- Deliver a bounded D2/stage 1 investigation of load CPU, cold/warm transfer and relevant/unrelated update work, using the unchanged two-slot prototype, native HA and empty-shell controls, plus at most two independently sourced HA card/library comparators selected through an explicit equivalence and license review.
- Publish comparator selection/rejection evidence, pinned versions, workload differences and a reproducible protocol before collection. Resolve comparator feasibility in a small pilot before scheduling the full campaign.
- Run serial discovery measurements in the disposable synthetic HA lab, including dashboard interaction during update activity and separate visual-editor context where comparable. Keep local intent, DOM feedback, HA transport and physical response distinct.
- Propose CPU, transfer and update budgets or a regression policy from absolute costs, comparator variation and observed interaction quality. Present explicit decision gaps if evidence cannot support numbers. Matching a slow comparator is insufficient.
- Record dated maintainer agreement only when received; collect fresh approval-backed verification only for approved cells. Publish negative/partial outcomes and preserve every outstanding stage 1 gate.
- Update the experiment guide and stage 1 documentation with sanitized results and reproduction instructions during apply.

This is research and experimental tooling, with no production behavior change. Non-goals: optimizing or replacing the prototype, selecting the production renderer/stack, implementing the desk MVP, resolving historical cold failures, calibrating retained bytes/final presentation, production HA changes, physical tests or Safari support claims. Comparator and harness code is limited to disposable test adapters outside the checkout; external artifacts retain their upstream terms.

## Capabilities

### New Capabilities

None. This change uses `skip_specs: true` for research and experimental tooling.

### Modified Capabilities

None. The existing `independent-element-bindings` contract and its requirement for justified, passing performance budgets remain unchanged.

## Impact

- Planning and findings: this change's `research.md`, `design.md` and `tasks.md`.
- Intended apply outputs: sanitized evidence under `experiments/minimum-card-contract/performance-benchmark/`, an updated experiment guide, and coherent stage 1 status in `README.md`, `docs/roadmap.md`, `docs/decisions.md` and `docs/discovery.md`.
- External raw captures, comparator downloads/reference clones and investigation scripts: `~/research/ha-lovelace-extended/benchmark-stage-one-performance/`. Public provenance and reconstruction instructions must accompany the sanitized findings.
- Reuse existing pinned lab tools where available. Any comparator acquisition is limited to selected, pinned artifacts after storage/isolation preflight during apply; no host upgrades or production dependencies. Preserve existing runtime/editor source, dependency manifests, archived evidence and main specs.
- Material unknowns: which comparators can reproduce the bindings/actions/editor behavior, whether the lab supports fair interaction observations, and whether the results justify usable limits. Resolve these through upstream source/license review, calibrated pilots and matched discovery rather than assumed support. The current desktop lab cannot establish reference-phone performance.

Completion means a reviewable comparative investigation and budget disposition, including documented unsupported cells. It does not require an invented approval or close stage 1: cold variance, retained-byte attribution and final presentation remain separate work.
