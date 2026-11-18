# Research

## Scope

Roadmap milestone: Open source setup. Which community files and reporting routes are useful and truthful for a documentation-only library? Apply the evidence discipline in [discovery](../../../../docs/discovery.md), especially the early licensing boundary in D6; product experiments and dashboard coverage are outside this delivery.

## Evidence

All observations below were made on 2026-11-15. Online documentation is a dated reference, not a pinned implementation or proof of repository settings.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The repository has README, AGENTS, product docs, OpenSpec configuration/schema and generated skills, but no tracked community policies, license or GitHub templates. | Local Git HEAD `6660292`; README, AGENTS, docs/roadmap.md and docs/openspec.md | Tracked-file inventory and targeted document reads | Does not establish inherited account defaults or remote settings | Add repository-owned guidance; retain documentation-only status |
| E2 | The maintainer selected Apache-2.0 and does not intend to monetize this project. | Maintainer instructions in the planning conversation, 2026-11-15 | Explicit decision | Does not prohibit commercial reuse by others or identify all copyright holders | Apply Apache-2.0; do not add noncommercial restrictions |
| E3 | Apache-2.0 provides redistribution conditions, contributor patent terms and warranty/liability provisions. Distribution must preserve applicable notices; an upstream NOTICE, if present, has specific preservation conditions. | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), sections 3–8 and application appendix | Official license review | A license text does not establish ownership or resolve third-party provenance | Use official text; confirm copyright and audit attribution before publication |
| E4 | All six tracked generated OpenSpec skills declare MIT and OpenSpec authorship; the local schema is documented as derived from spec-driven. | `.agents/skills/*/SKILL.md` metadata; docs/openspec.md at the inspected HEAD | Metadata and provenance-document review | Complete upstream notices and derivation attribution have not been audited | Preserve generated files and their terms; resolve any missing notices separately |
| E5 | GitHub recognizes common community files and may use account-wide defaults when repository-owned files are absent. | [GitHub community files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) | Official documentation review | Account defaults were not inspected | Make project guidance self-contained and check for conflicting inherited routes during execution |
| E6 | GitHub private vulnerability reporting requires enablement; its private reporting entry point is exposed when enabled. | [GitHub private reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository) | Official documentation review | Feature state and administrator access for this repository are unverified | Check availability before documenting a route; do not silently change settings |
| E7 | Contributor Covenant 2.1 supplies conduct rules and requires a reporting contact and enforcement responsibilities. | [Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) | Published policy review | Candidate version, not a claim that this is the latest or already adopted | Evaluate this established policy with attribution; confirm a private contact before publishing |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| A small set of linked files is enough for this stage. | Walkthrough from README to contribution, issue/PR and private reporting instructions | Confirm if every path is usable without private environment access or invented product commands; revise if a concrete gap remains |
| Public issues and PRs can cover ordinary collaboration. | Read-only repository feature inspection and maintainer confirmation where needed | Confirm before linking; do not assume Discussions or an external chat exists |

## Open Questions

The original planning questions below are resolved by the execution records for
tasks 1.2–1.5. They are retained to show the dependencies, not as current blockers.

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| What copyright identity/year and third-party notices belong in the distribution? | Blocking for license/attribution completion | A root license must not overwrite upstream rights | Inspect upstream licenses and actual tracked derivations; confirm the intended notice with the maintainer |
| Which private contact handles conduct reports? | Blocking for publishing CODE_OF_CONDUCT | A public issue is not an adequate substitute for sensitive reports | Obtain a maintainer-approved contact and enforcement owner; do not infer consent to publish personal details |
| Which private security route is available? | Blocking for publishing SECURITY and its links | Unverified feature URLs are not a reporting process | Inspect feature state read-only; confirm an existing contact if unavailable; request separate scope for any needed setting change |
| Are public issue/PR routes and inherited defaults consistent? | Blocking for final template routing | Published links must reach intended workflows | Inspect current repository/account behavior without changing it |
| Is separate SUPPORT, governance, CODEOWNERS, funding or release documentation needed? | Deferrable until a concrete process exists | No such operational commitment has been established | Record omission rationale and revisit when contributors, support or releases require it |

## Research and Experiments

1. **Attribution:** compare tracked generated skills and derived schema/templates with their upstream license notices. Record source revisions and the exact affected material; select a notice file only when supported by that audit. This is document/source inspection, with no tooling regeneration or dependency installation.
2. **Reporting:** inspect existing GitHub capabilities, then confirm the maintainer's private reporting and enforcement choices. Complete when policies can name real, consented routes. Stop dependent publication if this remains unresolved; no test reports, messages, or settings changes are part of this change.
3. **Contribution workflow:** verify the installed OpenSpec commands and local research-first process against docs/openspec.md. Define a lightweight path for small corrections and the proposal/research path for material changes; no fake package/build/test commands or unnecessary product research.
4. **File inventory:** evaluate requested files plus SUPPORT, NOTICE/third-party notices, CODEOWNERS, governance, funding, changelog, editor/ignore configuration and CI. Record each addition or deferral against a present need. Any necessary automation is separately scoped; this delivery supplies documentation and templates.
5. **Walkthrough:** review documents and template paths as an outside contributor with no homelab or private devbox access. Use available tools for Markdown/YAML and OpenSpec validation; avoid new dependencies merely for this review. Performance measurement is inapplicable because runtime and HA behavior do not change.

Any new raw external evidence belongs under the project's research area; sanitized sources and conclusions must remain here or in public project docs. No raw downloads were created during proposal preparation.

## Outcome

**Execution outcomes are recorded below.** The initial copyright/provenance and reporting-route gates have been resolved through the attribution audit, explicit maintainer confirmations and verified GitHub feature state. The final verification and delivery record states the completed checks and remaining publication/operational limits. No product implementation or stage 0 baseline is delivered by this change.

## Execution evidence — upstream attribution audit (task 1.1)

Inspected on 2026-11-15 against OpenSpec **1.14.3**, upstream tag
[`v1.14.3`](https://github.com/Fission-AI/OpenSpec/tree/v1.14.3), resolving to
commit `c794978f4f8845ce59693373c9dd882ee776588c` through `git ls-remote`.
The installed package identifies `@fission-ai/openspec`, version `1.14.3`,
MIT, authored by OpenSpec Contributors. Its full LICENSE is byte-identical
to the [upstream LICENSE](https://github.com/Fission-AI/OpenSpec/blob/c794978f4f8845ce59693373c9dd882ee776588c/LICENSE)
(SHA-256 `c3c7235bea1214ab62df643473975c2e8b8848f528901a976693f7d069713e64`).
The upstream revision's root tree contains LICENSE and no NOTICE or COPYING.

Covered material:

- `.agents/skills/openspec-{apply-change,archive-change,explore,propose,sync-specs,update-change}/SKILL.md`:
  all six declare MIT, author `openspec`, and generator version `1.14.3`.
  Compared the installed workflow instruction templates with generated files;
  generation expands workflow conditions and rewrites command references for
  the selected integration/profile (observed directly in the apply diff).
  This is generated upstream material, not original project prose.
- `openspec/schemas/research-first/schema.yaml`: derived from upstream
  `schemas/spec-driven/schema.yaml`; a textual diff has 73 lines including
  diff metadata. Local changes introduce research, its dependencies, and
  project instructions; the inherited instructions remain upstream material.
- `openspec/schemas/research-first/templates/{proposal,design,spec,tasks}.md`:
  each is byte-identical to its upstream `schemas/spec-driven/templates/`
  counterpart at the pinned revision.
- `openspec/schemas/research-first/templates/research.md`: project-specific
  research template, not present in the upstream spec-driven template set.

The MIT notice names **Copyright (c) 2024 OpenSpec Contributors** and requires
preserving the copyright and permission notice with copies or substantial
portions. A separate `THIRD_PARTY_NOTICES.md` containing the full upstream MIT
text and these covered paths is therefore warranted; skill metadata alone is
not the complete permission notice. Keep upstream material under its MIT
terms and clearly scope the project Apache-2.0 statement to original material.
No separate Apache NOTICE is justified by this audited upstream distribution.
Final license-related files remain gated by task 1.2's maintainer confirmation.

Limitations: this audit establishes provenance of the distributed tooling
material, not ownership of every project contribution. Workflow templates were
inspected without regenerating skills; a byte-identical regeneration of all
skills was not performed. Raw downloaded references and comparison inputs are
kept outside the repository in the project research area. Generated skills,
local schema, templates, and archived research were left unchanged.


## Execution evidence — GitHub routes (task 1.3)

Read-only inspection on 2026-11-18 used the connected GitHub repository metadata
and authenticated GitHub REST GET requests through the existing `gh` CLI for
fields/endpoints absent from the connector. Repository:
[eduardobittencourt/ha-lovelace-extended](https://github.com/eduardobittencourt/ha-lovelace-extended).

- The repository is public, not archived, and its default branch is `main`.
- Issues are enabled; Discussions are disabled. The issue and pull request
  collection endpoints both returned successfully (zero entries at inspection).
  Use `/issues` and `/pulls`; do not introduce a Discussions route.
- `GET /repos/eduardobittencourt/ha-lovelace-extended/private-vulnerability-reporting`
  returned `enabled: false`. A private advisory submission link cannot yet be
  advertised as an operational reporting route. Enabling it requires explicit
  authorization outside this change's original settings scope, or an approved
  alternative contact.
- The account `.github` repository lookup returned HTTP 404. The community
  profile returned no conduct, contribution, issue-template, license or PR-template
  files. Together these establish no observable inherited public community
  guidance at inspection; a 404 alone is not proof that a private repository
  does not exist. GitHub only inherits defaults from a public `.github` repository.
- No settings were changed, reports submitted, issues opened or messages sent.
  This is route/configuration inspection, not an end-to-end reporting test.

Source contracts rechecked against GitHub's official
[community-default rules](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
and [template configuration](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository).
Repository-owned templates will override account issue-template defaults.
Policies remain dependent on maintainer confirmation in task 1.4.


## Execution evidence — file inventory (task 1.5)

Assessment on 2026-11-18 against tracked files and the documentation-only scope:

| File or group | Decision and present need | Revisit trigger |
| --- | --- | --- |
| LICENSE and copyright statement | Include Apache-2.0 for original material after task 1.2 confirmation | New rights holders or adopted material |
| THIRD_PARTY_NOTICES.md | Include full OpenSpec MIT notice and audited paths per task 1.1 | New third-party distribution |
| Separate NOTICE | Omit: the audited upstream distribution has no NOTICE and no additional notice need was found | Attribution requiring such a file |
| CONTRIBUTING.md | Include one public human workflow for corrections, research and substantial proposals | Product implementation/release workflow |
| AGENTS.md | Update to reference the public workflow and remove private-devbox dependency | Agent process changes |
| CODE_OF_CONDUCT.md and SECURITY.md | Include only after confirmed policy ownership and operational private routes | Reporting or supported-version changes |
| Issue and PR templates | Include two documentation/proposal issue templates, chooser configuration and one focused PR template | Installable product and runtime issue needs |
| SUPPORT.md | Omit: contribution guidance can explain current public help routes; no separate support service exists | Distinct user-support process |
| CODEOWNERS | Defer: no path-specific review ownership or team was selected; avoid inventing automatic review obligations | Multiple maintainers and agreed ownership |
| GOVERNANCE.md | Defer: contribution guidance can describe maintainer review without inventing voting or roles | Established multi-maintainer decision process |
| FUNDING.yml | Omit: no funding route or request exists | Maintainer selects a funding program |
| CHANGELOG/release documents | Defer: no package or release exists; Git history and change records cover current documentation work | First release planning |
| .editorconfig | Defer: no demonstrated formatting conflict; retain existing UTF-8 Markdown/YAML conventions | Agreed cross-editor need |
| .gitignore | Defer: no product build output or local artifact needs ignoring; external research stays outside the checkout | Bounded tooling/runtime change |
| CI/workflows | Defer: automation is outside this documentation/template scope; existing CLI and local checks suffice | Separately scoped repeatable automation |

No dependencies, build tools or workflows are needed to deliver these files.
This assessment records intentional deferrals, not completed future processes.


## Execution evidence — contribution workflow (task 2.2)

Added CONTRIBUTING.md on 2026-11-18 with separate lightweight corrections and
substantial-change paths. Checked the documented `new change`, `instructions`,
`validate` and `schema validate` syntax against installed OpenSpec 1.14.3 help;
`list`, `status` and `instructions apply` were exercised read-only on the current
change. Existing config selects `research-first`; no disposable changes,
dependencies or tooling regeneration were used. The guide preserves third-party
terms, requires sanitized reviewable evidence and does not require private HA
access, runtime commands, a CLA or sign-off automation. Final cross-document
policy links remain task 3.5 after reporting choices are confirmed.

## Execution evidence — confirmed maintainer inputs (tasks 1.2 and 1.4)

On 2026-11-18 the maintainer explicitly approved the exact original-material
notice **Copyright 2026 Eduardo Bittencourt**, Apache-2.0, and preservation of
OpenSpec's MIT terms in THIRD_PARTY_NOTICES.md. The task 1.1 audit supplies the
upstream provenance; this approval identifies the intended project notice and
does not claim ownership of third-party material.

The maintainer approved Contributor Covenant 2.1, named Eduardo Bittencourt as
the person responsible for conduct reporting/enforcement, and explicitly
authorized publishing **eduardo@bittencourt.dev** as its private reporting
contact. The address is public policy contact information by consent; reports
are private email, not public issues. No test email was sent or mailbox
configuration changed; deliverability is not independently tested.

For security the maintainer separately authorized enabling GitHub private
vulnerability reporting after the initial disabled-state inspection. The
existing authenticated CLI performed only the authorized PUT to that feature,
then a GET confirmed `enabled: true`. This is an explicitly authorized extension
to the original no-settings-change scope, not permission for other settings.
Use the repository's `/security/advisories/new` route and GitHub's Security tab;
no test advisory/report was submitted. Public issues and conduct email are not
the security reporting workflow. See GitHub's official
[private reporting instructions](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately).

The confirmed routes and enforcement owner close the input gates. Availability
is supported by feature state and maintainer consent, not by an end-to-end
reporting exercise. There is no promised response deadline or support window.


## Execution evidence — licenses (task 2.1)

LICENSE is an unmodified byte-for-byte copy of the official
[Apache-2.0 text](https://www.apache.org/licenses/LICENSE-2.0.txt), fetched on
2026-11-18. The confirmed project copyright is attached in README's licensing
section; the Apache appendix remains an unmodified application example.
THIRD_PARTY_NOTICES.md preserves the full upstream OpenSpec MIT notice and
explicitly identifies the audited paths and local schema modifications.

The conduct policy introduces another attributed text. Its version 2.1 source
and CC BY 4.0 license were checked together at upstream revision
`91532d80ea5f39b6685aff4892bc6854bf2f6d6f` (2022-01-10). Use that pinned source,
not the current website implementation's different license or search snippets.
The policy's own CC BY 4.0 attribution, source, change indication and license/
warranty links are retained separately; no blanket Apache relicensing is made.
Raw policy and license references are in the external research area. This is
within the change's existing requirement to preserve adopted third-party terms.


## Execution evidence — agent entry point (task 2.3)

AGENTS now links the public README/CONTRIBUTING workflow, permits lightweight
corrections without unnecessary changes, and specifies portable evidence/privacy
expectations. It no longer depends on a private local context entry point.
Compared guidance with CONTRIBUTING and docs/openspec.md: substantial work
retains research-first, evidence gates, scoped implementation and generated-skill
preservation. `git diff --exit-code -- .agents/skills` passed; generated skills
were not edited or regenerated.


## Execution evidence — conduct policy (task 3.1)

CODE_OF_CONDUCT.md adopts the approved Contributor Covenant 2.1 pinned source,
with the confirmed owner Eduardo Bittencourt and consented mailto contact.
The original pledge, standards, enforcement ladder and acknowledgments remain;
site frontmatter is removed and project/license/navigation details are added.
Checked that no contact placeholder remains, the only conduct email is the
approved address, and the security route is clearly separate. No fixed response
deadline or additional enforcement role was invented.

## Execution evidence — security policy (task 3.2)

SECURITY.md states documentation-only status, no published/supported releases,
and the now-enabled GitHub private advisory route. Its instructions match the
verified feature state and official GitHub reporting flow, including the
administrator/draft distinction. It separates ordinary contributions and conduct
reports and avoids public sensitive disclosure, invented versions and response
or support deadlines. No report was submitted to test the policy.

## Execution evidence — issue templates (task 3.3)

Added Markdown documentation-problem/proposal templates and chooser config in
`.github/ISSUE_TEMPLATE/`. Rechecked current official GitHub template guidance:
Markdown frontmatter uses `name`/`about`, configuration uses
`blank_issues_enabled` and `contact_links` with `name`/`url`/`about`.
Parsed both frontmatters and config with the YAML parser already installed with
OpenSpec; checked required metadata, blank issues enabled and no unverified
labels/assignees/projects. Security points to the enabled private advisory route;
conduct uses the confirmed mailto contact. Neither needs Discussions, HA logs or
private installation access. GitHub chooser rendering awaits publication to the
default branch; no issue was created as a test.

## Execution evidence — PR template (task 3.4)

Added the single `.github/pull_request_template.md` at GitHub's documented path.
Reviewed a hypothetical broken-document-link correction: the author can describe
the destination fix and link/diff checks, omit related-work and scope-impact
sections, and provide no product logs, runtime tests or benchmarks. Evidence
fields are relevant to substantial research as well. English/privacy guidance
points to the public policies without creating review teams or process promises.
No real PR was opened; template activation awaits default-branch publication.

## Execution evidence — reconciled current documents (task 2.4)

Updated README, decisions, roadmap, OpenSpec guide and config together: current
license-pending claims are replaced with scoped Apache/third-party terms, public
contribution/reporting links are discoverable, and the old no-active-change claim
is replaced by a CLI lifecycle lookup. Recorded the separately authorized GitHub
feature change. Archive history and product stage 0 checkboxes remain unchanged.
`openspec schema validate research-first --json` passed after context edits;
local navigation is checked again as a whole in task 3.5. Open source setup stays
in progress until the final walkthrough and checks; file publication is distinct.

## Execution evidence — navigation (task 3.5)

README and CONTRIBUTING link contribution, conduct, security and attribution
files; policies link back to contribution guidance and to the separate private
reporting route. Templates include canonical GitHub links to those three root
documents. Chooser links directly to the verified private advisory route and
consented conduct email. Checked local Markdown targets across root docs,
product docs, change records and templates, including new files. All resolved.
Canonical `/blob/main/` links to newly added documents become operational on
publication of these exact paths; that future publication is not claimed here.
Reporting links themselves use the enabled feature and confirmed contact,
not an unverified remote policy file. No external report/email was sent.


## Execution evidence — outside-contributor walkthrough (task 4.1)

Performed a document/route walkthrough on 2026-11-18 without using private
installation details:

| Path | Result |
| --- | --- |
| Discovery | README states conception status, explains the idea and links roadmap, contribution, licensing and reporting guidance |
| Small correction | CONTRIBUTING allows a focused PR without an issue or new OpenSpec change; diff/link consistency checks suffice |
| Substantial proposal | Public issues and the proposal template request outcome, stage, evidence and questions; CONTRIBUTING links research-first CLI guidance before implementation |
| PR review | PR template requests problem/result and relevant checks; related work and scope impact are optional where irrelevant, with no invented product checks |
| Conduct reporting | README/CONTRIBUTING lead to the adopted policy and the approved email/owner; chooser also offers the private mailto route |
| Vulnerability reporting | README/CONTRIBUTING lead to SECURITY; chooser and policy use the enabled GitHub private advisory route, separate from conduct |

All paths are understandable without HA credentials, a desk or private devbox
documents. Local target files resolve. New canonical GitHub document links and
templates activate only after publication to `main`; no publication or PR is
claimed. The walkthrough checks instructions and feature state, not email
receipt, actual enforcement or advisory submission. No external messages or test
reports were sent. These limits do not require inventing an operational test or
expanding scope to publication.

## Execution evidence — validation (task 4.2)

Checks completed on 2026-11-18:

- `openspec validate establish-open-source-community-files --strict --no-interactive`:
  passed. The informational zero-delta message is expected for `skip_specs: true`.
- `openspec schema validate research-first --json`: valid, no issues.
- Parsed project config, change metadata and issue chooser YAML plus both issue
  template frontmatters with the existing OpenSpec YAML dependency: passed.
  No parser dependency was installed or added to this repository.
- Local Markdown target and changed/new whitespace check: 84 targets across 24
  documents, passed. `git diff --check` also passed. Canonical GitHub template
  document URLs map to the local files intended for `main`; activation awaits
  publication, as noted above.
- LICENSE byte comparison with the downloaded official Apache text and complete
  audited upstream MIT notice comparison: passed. OpenSpec MIT source hash
  matches the task 1.1 audit. Contributor Covenant attribution/license links and
  project adaptation notice were reviewed against its pinned source.
- Full changed-document diff and new-file review, including policy wording,
  templates, current docs and change artifacts: no invented runtime capabilities,
  supported releases, contact placeholders, response deadlines or private
  installation details. Targeted sensitive-token pattern checks passed; the
  public conduct contact is the explicitly consented address.
- Scope check covered 20 changed/new files. Generated skills, schema/templates,
  historical archive and product MVP/discovery/architecture files are unchanged.
  Product roadmap stages 0–6 compare exactly to their prior text. No product
  code, dependencies, CI or HA configuration was introduced.

The only external mutation was the separately authorized GitHub reporting
feature. Email receipt, real advisory submission, rendered GitHub template UI
and product performance were not tested or claimed.


## Final delivery record (task 4.3)

**Community foundation delivery: complete in the working tree, ready for review.**
Sixteen tasks were completed in this apply session in addition to the prior
attribution audit. LICENSE, third-party notices, contribution guidance, agent
entry point, conduct/security policies, issue chooser/templates and PR template
are present. Current documents and OpenSpec context are reconciled. All input
gates are resolved; optional-file decisions and applicable checks are recorded
above. The roadmap marks the local foundation complete and states the remaining
publication boundary explicitly.

The GitHub private reporting feature was enabled only after explicit maintainer
authorization; the proposal/design record that approved scope extension. No other
repository settings, messages, reports, releases, commits, pushes or PRs were
created by this session. Templates and canonical links to the new policy files
need default-branch publication. Actual reporting delivery/enforcement was not
exercised.

Product stage 0 is still open: target-device rendered fit, baselines and justified
numerical limits remain pending. No product code, dependencies or HA changes
were made; no main specs were created, generated skills changed or archive
history rewritten. Review the delivery before requesting archive. Archiving,
publication and product implementation remain distinct follow-up actions.


## Archive record

Archived on 2026-11-18 at the maintainer's explicit request, using the
`research-first` schema. CLI checks confirmed all planning artifacts done or
intentionally skipped and all 17/17 tasks complete. The CLI-reported delta-spec
inventory was empty, consistent with `skip_specs: true`; no main specs were
synced or created. The change metadata moved with the complete artifact set.
Documentation links and the research record's relative discovery link were
adjusted for the archive location.

The community files remain local pending publication; this archive does not
perform a commit, push, PR, release or further settings change. Product stage 0
and its device/baseline gates remain pending. Actual reporting operations and
GitHub template activation retain the limitations recorded in the delivery.
