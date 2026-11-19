# Design

## Context

See [proposal.md](proposal.md) for motivation and [research.md](research.md) for evidence E1–E6. The change affects the meaning of readiness across several documents, so a design is included to keep performance gates and historical evidence coherent. There is no runtime to migrate.

## Goals / Non-Goals

**Goals:** define consistent experiment-entry and acceptance gates; map each outstanding validation question to the decision it blocks; give the next experimental proposal a bounded brief.

**Non-Goals:** implement the brief, choose a production stack or public configuration, certify responsive behavior, establish universal compatibility, or declare the desk MVP ready.

## Decisions

### 1. Use HA allocation contracts and validate content separately

Follow documented Sections/Masonry conventions and adapt internal content to allocated card space (E2). Preserve Tile as a visual reference rather than an exact footprint for additional controls. Reference devices identify test conditions; they do not determine product dimensions. Minimum card allocations must be justified by content usability checks in the later experiment.

Alternative: copy native internal DOM/components to obtain exact behavior. Rejected as a default because the public sizing contract does not make private implementation reusable or stable. Also reject fixing the library to the selected phone viewport: that does not describe space allocated by a dashboard.

### 2. Separate experiment entry, evidence collection and acceptance

Replace the blanket baseline prerequisite with the following dependency map:

| Decision | Required evidence | When |
| --- | --- | --- |
| Start the bounded experiment | Questions, versioned contracts, chosen reproducible environment, safe fixtures, functional/layout checks and measurement protocol | Before experimental execution |
| Report functional feasibility | Demonstrated binding independence, editor persistence, event isolation, relevant updates and lifecycle cleanup | During the experiment, before its feasibility conclusion |
| Report layout coverage | Recorded container allocations, text/theme variants, keyboard/touch observations and explicit failures | During the experiment; only tested coverage is claimed |
| Claim acceptable performance and select a production approach | Comparable native/experimental samples, justified budgets and results against them | Before performance approval or a cost-dependent production decision |
| Complete the desk MVP | Full desk layout, remaining accessibility/device checks, integration and separately scoped physical/everyday validation, accepted performance | Before stage 2 exit |
| Promise wider compatibility or promote actively | Evidence for the claimed support scope and later roadmap coverage | At the relevant later milestone |

Missing metrics remain pending, not passing. An unavailable iPhone does not prevent an experiment in another recorded environment; measurements from that environment do not prove Safari behavior. Keep UI response distinct from HA transport and physical latency (E4).

Alternative: retain all pre-experiment phone measurements. This unnecessarily couples entry to one capture setup. Removing measurement requirements altogether would conflict with the project's performance priority, so evidence remains required for acceptance.

### 3. Revise current guidance without rewriting historical findings

During apply, update these consumers together:

| File | Intended reconciliation |
| --- | --- |
| `docs/roadmap.md` | Split stage 0 preparation from experimental measurements; revise stage 1 entry/exit and performance protocol timing. Move unresolved checks explicitly; mark only evidenced work complete. |
| `docs/discovery.md` | Adjust D1/D2 timing and proceeding criteria to allow experiments that investigate their own unknowns. |
| `docs/decisions.md` | Record the revised device/layout direction and superseding gate decision; retain undecided stack/support policy. |
| `docs/architecture.md` | Clarify allocation versus content adaptation, supported hooks versus private components, and unproven costs. |
| `docs/mvp.md` | Keep fixed semantic regions while allowing responsive placement; retain the full desk acceptance criteria. |
| `docs/openspec.md` | Replace the old next-step gate with the revised sequence and link the current change as the superseding plan. |
| `README.md` | Align resumption guidance and honest product status with the revised roadmap. |

Do not edit archived research. Link its limitations as historical facts and identify where current policy supersedes its proposed sequence. Stage 0 completion must be assessed against delivered revised criteria, not inferred from artifact creation or achieved by deleting unfinished work.

### 4. Keep this delivery documentary

Use `skip_specs: true` because no product behavior changes here (E6). Keep the self-contained experimental brief in this change's research record and link it from the current roadmap/OpenSpec guidance during apply. It covers loading, relevant/unrelated updates, cleanup, editor round trips, event isolation, layout and accessibility without selecting their implementation mechanisms. Experimental code and its environment belong to a subsequent proposal.

## Risks / Trade-offs

- [Weaker gates could hide regressions] -> Preserve evidence-based acceptance and explicitly report absent samples or budgets.
- [Native conventions could be mistaken for inherited correctness] -> Keep independent layout, accessibility, update and editor checks in the brief.
- [Living HA documentation may differ from an experimental release] -> Pin and recheck contracts in the future experiment; this revision makes no minimum-version claim.
- [Old and new guidance could conflict] -> Review every current consumer above and identify archived statements as historical.
- [An extra documentation delivery delays code briefly] -> Keep its tasks bounded and make the next experiment's questions reusable without inventing an implementation choice.

## Migration Plan

Apply only the documentation tasks, review current guidance as a whole, run link/diff/OpenSpec checks and update the research outcome. Rollback is a focused revert of this documentation revision; no dashboard, saved configuration or runtime migration is involved. Archival follows review as a separate workflow.
