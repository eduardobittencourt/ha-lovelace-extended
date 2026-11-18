# Design

## Context

See [proposal](proposal.md) for motivation and [research](research.md) for E1–E7. Design is included because licensing, reporting and contributor entry points cross multiple documents and need consistent boundaries. This is a documentation/process design; unresolved reporting and attribution inputs are research gates before dependent files are finalized, not a presumed production architecture.

## Goals / Non-Goals

**Goals:** provide a short path from project discovery to contribution, separate human and agent guidance, preserve upstream terms, and publish only operational reporting routes.

**Non-Goals:** establish product architecture, add runtime dependencies or CI, change repository settings beyond the separately authorized private vulnerability reporting feature, publish releases, promise response deadlines, or introduce CLA/sign-off automation and governance roles that the maintainer has not selected.

## Decisions

### 1. Use root community documents and focused GitHub templates

Keep `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` and `SECURITY.md` at the root beside the existing README and AGENTS. Put discovery-specific content in existing docs and link it rather than duplicating it. Use `.github/ISSUE_TEMPLATE/documentation-problem.md`, `proposal.md`, and `config.yml`, plus `.github/pull_request_template.md`. Markdown templates avoid introducing form complexity at this stage; recheck official GitHub template syntax during execution.

The documentation-problem template covers contradictions, broken links and research corrections without demanding nonexistent runtime versions or logs. The proposal template asks for the problem, intended outcome, evidence and relation to the roadmap. Allow ordinary blank issues; provide links to verified contribution and private reporting guidance. Do not assign nonexistent labels, projects or teams. The PR template asks for purpose, related issue/change when applicable, evidence/checks and scope impact, with irrelevant fields explicitly optional.

Alternative: a full support/bug/release template catalog. E1 supports the narrower set because there is no installable product; extend it when code and releases create those needs.

### 2. Apply Apache-2.0 while preserving provenance

Use the official unmodified Apache-2.0 license text for original project content, with a confirmed copyright notice and a clear exception statement for upstream material. Preserve generated OpenSpec skill metadata and content. Resolve the E4 audit before selecting `THIRD_PARTY_NOTICES.md`, `NOTICE`, or another necessary attribution location; document each included license and the covered paths. No blanket relicensing of derived assets is implied.

Alternative: change generated skills or paste a speculative NOTICE. Both lose provenance or create misleading notices. Apache-2.0 is already selected by the maintainer (E2); this change does not reopen it or add noncommercial restrictions.

### 3. Separate contributor and agent entry points

README explains purpose, documentation-only status, navigation and contribution/reporting links. CONTRIBUTING owns the human workflow: appropriate contributions now, discuss material changes first, OpenSpec research-first for substantial work, lightweight corrections, English repository content, privacy and relevant checks. Contributions should retain the applicable license terms without introducing an unapproved CLA.

AGENTS owns concise execution instructions and links to CONTRIBUTING and existing OpenSpec docs. Do not duplicate generated skills. Replace any dependency on private devbox instructions with public, portable guidance; local evidence-directory conventions are optional and sanitized findings remain reviewable in the repository. A contributor should not need credentials or a physical desk for documentation work.

Alternative: copy the entire local operating manual into AGENTS. E1 and the existing public-access intent favor a compact map and task-specific instructions.

### 4. Finalize sensitive policies only after reporting gates close

Evaluate Contributor Covenant 2.1 as an established candidate and preserve its attribution if adopted. Confirm the enforcement owner and private conduct contact before completing that policy (E7). For SECURITY, state there are no released/supported product versions yet and describe the verified private route (E6). Never publish contact placeholders, inferred personal email, fake support windows or public issue instructions for sensitive details.

Execution may inspect GitHub reporting features read-only. On 2026-11-18, after the feature was found disabled, the maintainer separately authorized enabling private vulnerability reporting; execution enabled it and verified the state. The maintainer also approved Contributor Covenant 2.1, Eduardo Bittencourt as enforcement owner and the conduct email recorded in research.md. These confirmed inputs close the publication gates for the local policies. If a required feature is unavailable, confirm an existing private channel; if none exists, stop the dependent policy work and ask for the specific missing choice or separately authorized setting change. Do not silently replace a conduct contact with the security advisory channel. These gates do not block independent attribution or contribution-document work.

### 5. Reconcile current guidance and record optional-file decisions

Update current README, docs/decisions.md, docs/roadmap.md, docs/openspec.md and the relevant context in openspec/config.yaml together. Preserve the research-first schema and historical archive; replace claims that no active change exists with accurate lifecycle guidance. Mark only actually delivered community work complete. Product stage 0 measurements and later milestones remain pending.

Record why SUPPORT, CODEOWNERS, separate governance, funding, changelog/release files, editor/ignore configuration and CI are needed or deferred. Prefer existing documentation sections where sufficient. This review does not authorize adding build tooling or workflows.

## Risks / Trade-offs

- [A root Apache license obscures upstream terms] → Audit E4 provenance first and explicitly scope preserved third-party notices.
- [Reporting instructions lead nowhere or expose personal data] → Confirm routes and publication consent before finalizing dependent policies and links.
- [Community documentation implies a released product or staffed service] → Retain conception status, no supported versions and no promised response times.
- [Documentation drifts or becomes burdensome] → Keep one owner document per topic, cross-link it and use short, stage-appropriate templates.
- [Public contributors depend on private installation evidence] → Preserve sanitized conclusions and provide a documentation-only path requiring no HA access.

## Migration Plan

Resolve attribution and reporting research, add the relevant files/templates, then reconcile current entry points and OpenSpec context. Review links, YAML, privacy, upstream notices and an outside-contributor walkthrough before the delivery is considered complete. The single authorized GitHub reporting setting change is recorded in research.md; other settings and publication are separate from local file changes. If later reverted, restore consistent links and status claims; a Git revert does not revoke permissions already granted for distributed copies.

Runtime loading, updates, lifecycle and performance have no new execution cost in this delivery. Review headings, link names and plain instructions for readable navigation; product accessibility and benchmark work remain in their roadmap stages.
