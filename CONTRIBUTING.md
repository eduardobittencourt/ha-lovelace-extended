# Contributing to Lovelace Extended

Lovelace Extended is a public project in conception with a bounded experimental
prototype and a synthetic complete-composition candidate. There is no production
card, installable package or release. Useful
contributions include documentation corrections, source-backed research, clearer
acceptance scenarios and bounded proposals. Experimental setup and checks live
in [the experiment guide](experiments/minimum-card-contract/README.md); they do
not establish production tooling or supported Home Assistant versions.
The separate [candidate guide](candidates/fixed-composition-card/README.md)
documents its dependency-free unit checks and version-pinned isolated browser
reproduction, with remaining acceptance gates kept explicit.

Start with the [README](README.md), [roadmap](docs/roadmap.md) and the documents
relevant to your contribution. The desk is the first acceptance example of a
reusable library. Completing the personal MVP and readiness for active promotion
are separate milestones.

## Small corrections

For a typo, broken link or unambiguous documentation correction, open a focused
pull request describing the problem and correction. An issue or OpenSpec change
is optional when scope and decisions do not change. Check affected links,
formatting and consistency with related documents; no product setup is required.

Use [public issues](https://github.com/eduardobittencourt/ha-lovelace-extended/issues)
for ordinary documentation problems, questions and proposals. Include the
relevant document section and enough context to review the problem. There is no
separate support service or promised response time.

## Substantial changes

Discuss changes to scope, behavior, architecture or project process before
implementation. Describe the problem, intended outcome, relevant roadmap stage,
available evidence and unresolved questions. The maintainer reviews proposals
and pull requests; opening a proposal does not establish a product commitment.

Follow the [OpenSpec guide](docs/openspec.md) and relevant questions in the
[discovery map](docs/discovery.md). Use the local `research-first` schema, with
research before dependent specifications and design. The version used for the
current setup is OpenSpec 1.14.3; a compatible CLI is needed for these checks,
not for an ordinary text correction. No Home Assistant credentials, private
devbox environment or physical desk are required for documentation work.

Inspect existing work before creating a new change:

```sh
openspec list --json
openspec list --specs
```

For an agreed new scope, replace `your-change-name` with its chosen name:

```sh
openspec new change your-change-name
openspec status --change your-change-name --json
openspec instructions proposal --change your-change-name --json
```

Let the CLI scaffold metadata; follow its returned instructions and dependencies
for each artifact. Verify that the change resolves to `research-first`. Do not
switch to another schema to bypass research. For research/documentation without
product behavior changes, use `skip_specs: true` as described in the guide;
do not invent runtime specifications.

An existing research file is not proof that its blockers are resolved. Record
sources, dates/versions, observations, limitations and consequences. Distinguish
facts, proposals, experiments and measurements. Update affected documents when
a decision changes, and mark tasks complete only when their outcomes have
been demonstrated. Product implementation, dependencies, Home Assistant changes
and physical tests require their own corresponding scope.

## Evidence, language and privacy

- Keep repository content in English, including examples, comments and commit
  messages. Discussion with maintainers may use another language.
- Keep changes focused. Explain why a change is needed and what it affects.
- Publish sanitized, durable findings with public source references in the
  repository. Keep raw evidence and reference clones outside the checkout;
  a local path alone is not reviewable evidence for other contributors.
- Never include credentials, authenticated request headers, complete private
  configurations, personal installation inventories or unapproved contact data.
- Do not post sensitive security or conduct reports in public issues or PRs.
- Original project material is licensed under [Apache-2.0](LICENSE). Submit
  original contributions under those terms; preserve existing third-party terms
  and attribution in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), including
  the MIT-licensed generated OpenSpec material. Identify
  the source and license of reused material. No separate CLA or sign-off process
  is required by this contribution workflow.

## Checks and review

For every contribution, inspect the diff, check relative links and document
consistency, and run:

```sh
git diff --check
```

This checks tracked diffs; also inspect newly added files before submission.
For OpenSpec changes or schema-related edits, run the applicable checks:

```sh
openspec validate your-change-name --strict --no-interactive
openspec schema validate research-first --json
```

Use the real change name. Check template/configuration YAML when editing it.
There is no repository-wide production build or test command. For experimental
source changes, run the relevant checks documented with that experiment and
report conditions and limitations. Do not install runtime dependencies merely
to validate a documentation contribution.

In the PR, explain the problem and result, link an issue or OpenSpec change when
relevant, and summarize evidence, checks and scope/decision impacts. For example,
a broken-link correction needs the corrected destination and link/diff checks;
it does not need HA logs or a device benchmark. Maintainer review may request
revisions before merge. Preserve generated skills and archived history; customize
OpenSpec through the project's configuration and local schema.

Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Send conduct reports to its
private contact, and report vulnerabilities through [SECURITY.md](SECURITY.md).
Agent contributors should also follow [AGENTS.md](AGENTS.md).
