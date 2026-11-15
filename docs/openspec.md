# OpenSpec in this project

## Setup

Initialized with OpenSpec **1.14.3**, **Codex** integration, and the **core** profile. All project artifacts are now configured to use English. The existing devbox CLI is used; no product runtime dependency or build tool was added.

- [Configuration](../openspec/config.yaml): concise context, per-artifact rules, and apply/archive guidance.
- [Local research-first schema](../openspec/schemas/research-first/schema.yaml): derived from `spec-driven`, with a research artifact and additional dependencies.
- [Research template](../openspec/schemas/research-first/templates/research.md): facts, hypotheses, questions, experiments, and outcomes.
- Generated skills in `.agents/skills/`, versioned in the project. Customize the process through config, schema, and documents rather than editing generated skills manually.

No product change is open and no runtime specification has been consolidated. The specs/changes directories are initially empty. Tool setup does not change the card's maturity stage.

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

## Suggested first change

A suggestion for when the user starts work; not yet created:

> Use openspec-propose for discover-desk-and-frontend-contracts, roadmap stage 0, with research and documentation deliverables only. Inspect the actual desk and HA frontend contracts through read-only access; define remaining validation and a performance protocol. Do not implement the card or execute physical commands. Record evidence and keep decisions requiring experiments open.

For research without product behavior changes, declare no new/modified capabilities and set `skip_specs: true` in the change's `.openspec.yaml`, preserving other generated fields. The CLI can then skip specs. Do not invent runtime requirements merely to satisfy validation.

If an answer requires a prototype, the research delivery may specify a later experimental change. Do not assume unexecuted test results to settle a production design.

## Supporting CLI commands

Run at the project root:

```sh
openspec list --json
openspec list --specs
openspec schema validate research-first
```

When opening a change, the following uses the project's default schema:

```sh
openspec new change discover-desk-and-frontend-contracts
openspec status --change discover-desk-and-frontend-contracts --json
openspec instructions proposal --change discover-desk-and-frontend-contracts --json
```

`new change` creates the directory and metadata; write documents following `instructions`. Recheck status and instructions for each ready artifact (`proposal`, `research`, `specs`, `design`, `tasks`) and for `apply` before proceeding. Do not replace status inspection with a blind command sequence.

For a change with completed artifacts:

```sh
openspec validate discover-desk-and-frontend-contracts --strict --no-interactive
```

## What the tool verifies

The schema defines file dependencies. The existence of `research.md` does not prove its questions have been answered; structural validation does not audit sources, performance, or physical behavior. Context rules and operation guidance are instructions to the agent, not executable safety checks.

The agent must check that evidence supports subsequent artifacts. A research change can contain a plan and pending research tasks; a production change must resolve blockers before assuming dependent contracts.

## Maintenance

`openspec update --help` describes integration regeneration. Update only within a maintenance task; use the core profile and review the diff. Recheck schema resolution, dependencies, rules, and skills after updates. Local schemas are an experimental OpenSpec feature; review the fork against upstream changes.

Official references: [customization](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md) and [OPSX workflow](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md). The installed CLI is the reference for commands actually available in this environment.
