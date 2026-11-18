# Tasks

## 1. Resolve attribution and community inputs

- [x] 1.1 Audit generated OpenSpec skills and derived schema/templates against upstream licenses and revisions; record covered paths, required notices and limitations in research.md, preserving generated content.
- [x] 1.2 Confirm the intended copyright notice and attribution approach with the maintainer; record the exact approved wording and supporting provenance in research.md before finalizing license-related files.
- [x] 1.3 Inspect existing GitHub issue/PR availability, inherited community defaults and private vulnerability reporting read-only; record verified routes and feature limitations in research.md without changing settings or submitting reports.
- [x] 1.4 Confirm the private conduct reporting contact, enforcement owner and private security route with the maintainer; record publication consent and policy choice in research.md, leaving dependent policies unfinished if a real route is unavailable.
- [x] 1.5 Complete the file inventory assessment, including SUPPORT, NOTICE/third-party notices, CODEOWNERS, governance, funding, changelog, editor/ignore files and CI; record each inclusion or deferral and verify it corresponds to an existing need within the documentation/template scope.

## 2. Establish licensing and contributor entry points

- [x] 2.1 After 1.1–1.2, add the official Apache-2.0 LICENSE and the confirmed copyright notice plus any necessary attribution file; compare the license with its official source and verify that upstream license declarations and covered paths are preserved.
- [x] 2.2 Add CONTRIBUTING.md with stage-appropriate contributions, lightweight correction and substantial OpenSpec-change paths, English content, applicable contribution licensing and privacy guidance; verify documented CLI commands against available help and existing research-first configuration without creating disposable changes.
- [x] 2.3 Revise AGENTS.md to link public contribution/process guidance and remain usable outside the devbox; verify consistency with CONTRIBUTING and docs/openspec.md and confirm generated skills remain unchanged.
- [x] 2.4 Revise README.md and current license/contribution statements in docs/decisions.md, docs/roadmap.md, docs/openspec.md and openspec/config.yaml; verify links and schema validity, remove stale license-pending/no-active-change claims, preserve archived history and leave product stage 0 pending.

## 3. Add verified policies and collaboration templates

- [x] 3.1 After 1.4, add CODE_OF_CONDUCT.md using the confirmed policy, attribution and private reporting contact; verify the enforcement owner is accurate and no contact placeholders or unapproved personal details remain.
- [x] 3.2 After 1.3–1.4, add SECURITY.md describing actual release/support status and the verified private reporting route; verify it avoids public disclosure instructions, fictional supported versions and unsupported response deadlines.
- [x] 3.3 Add `.github/ISSUE_TEMPLATE/documentation-problem.md`, `proposal.md` and `config.yml` using official GitHub syntax; verify template metadata/configuration, allow blank issues and ensure routes need no nonexistent labels, Discussions, runtime logs or private access.
- [x] 3.4 Add `.github/pull_request_template.md` with purpose, relevant issue/OpenSpec linkage, evidence/checks and scope impact; review an example documentation-only contribution to verify irrelevant product checks are optional.
- [x] 3.5 Complete navigation among README, CONTRIBUTING, conduct/security policies and templates; verify every local link resolves and every remote reporting link matches evidence from group 1.

## 4. Verify the community foundation as a whole

- [x] 4.1 Walk through discovery, a small correction, a substantial proposal, PR review and both private reporting paths as an outside contributor; record results and any limitations in research.md and verify no path depends on a private installation or unapproved repository setting.
- [x] 4.2 Run `openspec validate establish-open-source-community-files --strict --no-interactive`, `openspec schema validate research-first --json` and whitespace/link/YAML checks; review the full diff for private data, false product claims and upstream attribution regressions, recording the results in research.md.
- [x] 4.3 Reconcile delivered outcomes, optional-file deferrals and the Open source setup milestone; verify all completion claims have evidence, product-stage gates remain open, and no product code, dependencies, generated skills or HA configuration changed.

## Workflow follow-up

- Present the completed delivery for review; publication, PR creation and repository setting changes are not implied by this planning request.
- Archive only after the actual tasks and review are complete. This documentation-only change has no spec deltas to synchronize into runtime capabilities.
