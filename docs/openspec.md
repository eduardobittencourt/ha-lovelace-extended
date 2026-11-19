# OpenSpec in this project

## Setup

Initialized with OpenSpec **1.14.3**, **Codex** integration, and the **core** profile. All project artifacts are now configured to use English. The existing devbox CLI is used; no product runtime dependency or build tool was added.

- [Configuration](../openspec/config.yaml): concise context, per-artifact rules, and apply/archive guidance.
- [Local research-first schema](../openspec/schemas/research-first/schema.yaml): derived from `spec-driven`, with a research artifact and additional dependencies.
- [Research template](../openspec/schemas/research-first/templates/research.md): facts, hypotheses, questions, experiments, and outcomes.
- Generated skills in `.agents/skills/`, versioned in the project. Customize the process through config, schema, and documents rather than editing generated skills manually.

The research change [discover-desk-and-frontend-contracts](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/proposal.md) was archived on 2026-11-15 with all 16 research/documentation tasks complete. That research was separate from product implementation and consolidated no runtime specification. The later bounded experiment has its own consolidated contract, described below. Use `openspec list --json` for current work rather than inferring lifecycle state from this archive record. Tool setup and completed research tasks do not by themselves complete stage 0.

## Contributor workflow and licensing

[CONTRIBUTING.md](../CONTRIBUTING.md) distinguishes lightweight corrections from
substantial work using this process. [AGENTS.md](../AGENTS.md) supplies concise
agent guidance. No private devbox setup or HA access is needed for documentation
contributions. Reporting routes are in [SECURITY.md](../SECURITY.md) and
[CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).

The community foundation change, archived on 2026-11-18 with all 17 tasks complete, is
[establish-open-source-community-files](../openspec/changes/archive/2026-11-18-establish-open-source-community-files/proposal.md).
Its documentation/templates do not create runtime specs or complete stage 0.
For subsequent changes, review actual tasks and evidence before archiving;
`status` completion of planning artifacts does not mean implementation tasks
are complete.

Original material uses Apache-2.0. Generated OpenSpec skills and inherited
schema/template material retain MIT terms and attribution in
[THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Customize project config and
schema without editing generated skills or rewriting archived history.

## Initial setup verification

The schema was validated with `openspec schema validate research-first --json`, without issues. Two disposable changes checked default schema selection, research dependencies, context/rule injection, and apply blocking without tasks: one with specs and one research-only change using `skip_specs: true`. Both were removed afterward. This verification did not perform product research or physical tests.

The English-language revision rechecked schema validation, template resolution, and English instructions/context through a disposable change. Language changes do not constitute new product evidence.

## Context sources

`docs/` holds product intent, boundaries, and the roadmap. `openspec/changes/<name>/` holds the proposal, research, deltas, design, and tasks for a bounded delivery. `openspec/specs/` receives consolidated contracts as completed changes are synchronized/archived; do not copy the entire future vision there as if it were delivered.

Skills consult CLI-returned instructions containing the configured context and rules. Links in context do not automatically insert document contents: the agent must read relevant files. Consult the [discovery map](discovery.md) for the current stage.

## Workflow

1. **Explore:** understand the question and consult relevant sources without implementing. In Codex, use `$openspec-explore` with the topic.
2. **Propose:** use `$openspec-propose` for a small delivery. The schema resolves from local configuration.
3. **Research:** fill `research.md` with available evidence and unknowns. Specs and design depend on this file.
4. **Specify and plan:** create deltas when behavior changes, proportionate design, and verifiable tasks.
5. **Apply:** use `$openspec-apply-change` when execution is requested. A research change executes research/documentation tasks, not product implementation.
6. **Validate and archive:** check outcomes, spec consistency, and documentation updates; then use `$openspec-archive-change` when appropriate.

The core profile also includes `$openspec-update-change` and `$openspec-sync-specs`. If the client does not yet recognize generated skills, open a session in the project directory or use the CLI directly as described below.

## Archived initial research

The initial research change used the local schema, with `skip_specs: true`, and is now archived. Sync assessment found no delta specs, so no main specifications were written. Its [research record](../openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md) distinguishes observed desk data, public comparative cases, source-derived frontend contracts, and unmeasured runtime behavior.

The desk remains the first acceptance example within a reusable open source library. The selected research reference is Core 2026.11.1 / frontend 20261028.5 / Tile, with iPhone 14 Pro / Safari / reported iOS 27 as a reference test environment. No product code or physical commands are included. Numerical limits, baseline captures and rendered fit remain pending. The [current sequencing decision](decisions.md#layout-and-validation-sequence--2026-11-18) supersedes the archived pre-experiment phone/baseline gate: propose a bounded experiment separately, define reproducible conditions and methods before execution, collect comparable samples alongside it, and justify budgets before accepting performance or a cost-dependent production choice. Reference-device samples are not a start prerequisite; complete remaining desk/device/accessibility and physical/everyday validation before MVP acceptance.

For research without product behavior changes, declare no new/modified capabilities and set `skip_specs: true` in the change's `.openspec.yaml`, preserving other generated fields. The CLI can then skip specs. Do not invent runtime requirements merely to satisfy validation.

If an answer requires a prototype, the research delivery may specify a later experimental change. Do not assume unexecuted test results to settle a production design.

## Archived bounded experiment

The documentation change [align-roadmap-with-native-ha-layout](../openspec/changes/archive/2026-11-18-align-roadmap-with-native-ha-layout/proposal.md) was archived on 2026-11-18 with all 8/8 documentation tasks complete. It revises preparation and acceptance timing; it delivers no runtime implementation and does not declare stage 0 complete. The subsequent [desk acceptance synthesis](../openspec/changes/archive/2026-11-19-synthesize-desk-mvp-acceptance/research.md#r2-acceptance-coverage-review) closes the stage 0 definition exit, as tracked in the roadmap; full-desk execution remains pending. Historical findings remain unchanged.

The [experiment brief](../openspec/changes/archive/2026-11-18-align-roadmap-with-native-ha-layout/research.md#brief-for-a-subsequent-bounded-experiment) guided the separately scoped experimental delivery: two independent bindings, visual save/reload/reopen in HA, isolated actions, selective updates/cleanup, allocated-width and accessibility checks, and comparable measurements. Its code, dependencies and test-environment setup belong to the separately authorized [demonstrate-minimum-card-contract change](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/tasks.md). That experiment now records actual isolated HA persistence and bounded correctness/layout evidence; performance acceptance remains open. Follow its [reproduction guide](../experiments/minimum-card-contract/README.md) for experimental source checks. A standalone mock cannot establish actual HA editor persistence, and experimental results do not automatically become production contracts.

## Supporting CLI commands

Run at the project root:

```sh
openspec list --json
openspec list --specs
openspec schema validate research-first
```

For a future change, replace `your-change-name` below; these commands use the project's default schema:

```sh
openspec new change your-change-name
openspec status --change your-change-name --json
openspec instructions proposal --change your-change-name --json
```

`new change` creates the directory and metadata; write documents following `instructions`. Recheck status and instructions for each ready artifact (`proposal`, `research`, `specs`, `design`, `tasks`) and for `apply` before proceeding. Do not replace status inspection with a blind command sequence.

For a change with completed artifacts:

```sh
openspec validate your-change-name --strict --no-interactive
```

## What the tool verifies

The schema defines file dependencies. The existence of `research.md` does not prove its questions have been answered; structural validation does not audit sources, performance, or physical behavior. Context rules and operation guidance are instructions to the agent, not executable safety checks.

The agent must check that evidence supports subsequent artifacts. A research change can contain a plan and pending research tasks; a production change must resolve blockers before assuming dependent contracts.

## Maintenance

`openspec update --help` describes integration regeneration. Update only within a maintenance task; use the core profile and review the diff. Recheck schema resolution, dependencies, rules, and skills after updates. Local schemas are an experimental OpenSpec feature; review the fork against upstream changes.

Official references: [customization](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md) and [OPSX workflow](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md). The installed CLI is the reference for commands actually available in this environment.

## Minimum-card archive and consolidated contract

The [minimum-card experiment](../openspec/changes/archive/2026-11-19-demonstrate-minimum-card-contract/research.md)
was archived on 2026-11-19 using `research-first`, with 20/20 tasks complete.
Its nine requirements and 19 scenarios are consolidated in
[independent-element-bindings](../openspec/specs/independent-element-bindings/spec.md).
This specification applies to the bounded experiment and explicitly preserves
pending acceptance gates. Performance remains unapproved and stage 1 remains
open; archiving does not adopt a production contract or complete the desk MVP.
