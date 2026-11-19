# Research

## Scope

Roadmap stages 0–1, focused on D1 sizing contracts and D2 experiment entry versus result acceptance. Determine whether a device-specific baseline is necessary to start a bounded experiment. This delivery researches and revises guidance; it does not run the experiment or establish supported devices.

## Evidence

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | At apply entry, current guidance requires rendered dimensions and numerical limits before the stage 1 experiment. | [Roadmap](../../../../docs/roadmap.md), [OpenSpec guide](../../../../docs/openspec.md), [decisions](../../../../docs/decisions.md), read 2026-11-18 | Compare stage exits and resumption guidance | These are planning rules, not measured product constraints | Revise all consumers of the entry gate together |
| E2 | HA documents separate Sections and Masonry sizing hooks; the former describes grid allocation and resize limits, the latter a layout height estimate. | [Official custom-card documentation](https://contributors.home-assistant.io/frontend/custom-ui/card/), sizing sections, accessed 2026-11-18; living documentation | Read public API descriptions | No runtime test; current docs do not establish a minimum supported HA release | Use native allocation conventions; investigate the card's internal adaptation separately |
| E3 | HA documents schema-based visual forms and a custom-editor path with complete configuration events. | [Official editor documentation](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/), accessed 2026-11-18; living documentation | Read editor extension contracts | Does not demonstrate this library's independent bindings or persistence | Keep visual configuration and save/reopen as experiment questions |
| E4 | Earlier research selected a versioned Tile reference and reported no device baseline or rendered-fit results. | [Archived research](../2026-11-15-discover-desk-and-frontend-contracts/research.md), especially frontend assessment and outcome; read 2026-11-18; Core 2026.11.1 / frontend 20261028.5 | Inspect recorded sources and limitations against current project guidance | Historical evidence only; no new source-build, desk or browser verification | Reuse the question map and protocol, not an assumption of proven compatibility |
| E5 | The user wants native HA layout conventions and a library independent of one device or screen size; they requested this proposal after discussing revised sequencing. | Maintainer conversation, 2026-11-18 | Review explicit direction | Does not promise every browser or approve a production stack | Reference devices are test environments; responsive behavior is a product goal |
| E6 | No active changes or consolidated capabilities existed at proposal start; apply now selects this single active change; the checkout contains documentation and process material, without a product runtime. | `openspec list --json`, `openspec list --specs --json`, README and CONTRIBUTING, 2026-11-18 | CLI inventory and repository inspection | No runtime feasibility evidence | Use `skip_specs: true`; leave product implementation to a later change |

Existing material under the project's external research area was located before this investigation. It consists of earlier reference sources and community-file work; the archived, sanitized findings remain the reviewable historical record. No private HA access, new reference clone or raw capture was needed for this documentation decision.

### Apply reference recheck — 2026-11-18 (task 1.1)

Reopened the official E2/E3 pages: Sections uses `getGridOptions` for allocation/resize limits, while Masonry uses `getCardSize` as a height estimate. The editor page still describes form schemas and full-configuration events. These contracts support the proposed questions, without demonstrating this card's behavior or selecting a production dependency.

Rechecked E1 against the current roadmap, decisions and OpenSpec guide, and E4 against the archived frontend, baseline and experiment assessments. The old entry gates are present; the archive explicitly reports unmeasured fit and performance. E5 remains the direction recorded by this proposal, not runtime evidence. For E6, `openspec list --json` now reports this one active change, and `openspec list --specs --json` still reports no consolidated capabilities. README and CONTRIBUTING still describe a documentation-only project. No conclusion requires an unperformed runtime check. The revised sequence supersedes historical planning gates while preserving the archive's factual limitations.

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| Native sizing contracts can accommodate two independently bound elements without fixed-device assumptions. | Later experiment in Sections and Masonry across recorded container widths | Confirm only for tested allocations with usable controls and no unintended overflow; failure requires layout revision |
| Visual editing can preserve sibling bindings while changing one element. | Later save/reload/reopen and single-binding edit | Confirm when both bindings and their actions survive; lost sibling fields refute the approach |
| Selective updates and lifecycle cleanup can keep composition cost controlled. | Relevant/unrelated update counts, retained-resource observations and comparable timing captures | Correctness requires isolated actions, no unrelated DOM work and no accumulating retained resources; numerical performance remains unaccepted until budgets are justified |

These are questions for the future experiment, not conclusions of this proposal.

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Can native dashboard allocation replace a fixed product viewport as the layout starting point? | Resolved for documentation | E2 supports the allocation contract; E5 supplies product direction, without proving content fit | Apply the revised guidance while retaining internal-layout checks |
| Must a particular phone baseline precede the first experiment? | Resolved for documentation | It is a project sequencing choice, not a prerequisite stated by the reviewed extension contracts; the experiment can collect evidence | Separate experiment entry from performance acceptance |
| Which HA revision, browser/toolchain and widths will the experiment use? | Deferrable to the subsequent experimental proposal; blocking its execution | Reproducibility needs a selected environment, not an exclusive product device | Pin available versions and capture methods, record narrow/intermediate/wide container cases before running |
| Which stack and editor/update mechanisms are suitable? | Deferrable to the subsequent experimental change | This change defines no implementation; alternatives remain hypotheses | Select only what a bounded comparison needs, without adopting a production stack |
| What numerical budgets are acceptable? | Deferrable until comparable samples; blocking performance acceptance and MVP completion | No measurements exist; inventing limits would not improve evidence | Gather reference and experimental samples, then justify limits and repeat validation as needed |
| What broader version/device support can be promised? | Deferrable to demonstrated compatibility | A few environments cannot prove universal support | Record tested coverage and unknowns; expand validation before support claims |

## Research and Experiments

### Documentation delivery in this change

Use E1–E6 to revise the current guidance and produce a self-contained next-experiment brief. Completion requires consistent entry/acceptance criteria, an explicit mapping of remaining checks to their dependent decisions, working links and strict OpenSpec validation. Only repository documentation changes are planned for apply; no runtime dependencies, environment modifications or physical actions are part of this delivery.

### Brief for a subsequent bounded experiment

- **Hypothesis and surface:** two elements with distinct display/action bindings can be configured visually and adapt to HA-provided card space at acceptable measured cost. Avoid desk-only IDs or required hardware.
- **Environment:** isolated fixtures and intercepted action dispatch; pin HA/frontend, browser, theme/locale and measurement tools before execution. Use synthetic states where needed. Integration with a real HA editor must be demonstrated in an explicitly scoped test environment before claiming actual HA persistence; a standalone mock alone is insufficient.
- **Functional checks:** select each source/target visually; save, reload and reopen; edit one binding without losing the other; dispatch an inner action once without dispatching the body action. Include invalid configuration, missing/unavailable entities, theme/locale changes and cleanup. Correctness requires no unrelated DOM work and no accumulating retained subscriptions/listeners across mount/unmount cycles, independently of timing budgets.
- **Layout checks:** exercise Sections and Masonry contracts and narrow/intermediate/wide allocated card widths, long labels and enlarged text. Choose and record concrete allocations before testing. Record overlap, unintended overflow, touch reachability, keyboard focus/order and accessible names. Record the input methods available in each environment; remaining reference-device checks belong before MVP acceptance. A source-compatible hook is not proof of visual fit.
- **Measurements:** adapt the archived reproducible protocol to available tools. Capture comparable native/experimental load and execution, local response, relevant/unrelated update work, mount/unmount retained resources, editor loading and growth with element/card count. Record samples and limitations. Compare the existing desk solution only where workloads match; its availability is not an entry requirement. Separate UI, transport and physical latency; stubbed dispatch provides no physical evidence.
- **Entry:** a separate experimental proposal must authorize its code, dependencies and test-environment setup before they begin. Execution then requires documented questions, versioned contracts, selected reproducible environment, safe fixtures, functional/layout pass/fail checks and a measurement plan. A particular phone and preset numerical budgets are not prerequisites.
- **Exit:** report demonstrated correctness and layout coverage, measurements, failures and unresolved costs. A technical feasibility result can be limited or negative. Do not label performance acceptable until reviewed budgets exist and the result passes them; do not promote the prototype to production by default.
- **Side effects and evidence:** experimental code/dependencies require a later change; live dashboard edits, pairing and desk commands are excluded here. Publish sanitized results in that change's research record, with raw evidence outside the checkout under the project research area.

### Cross-document review — task 3.1

Reviewed README, roadmap, discovery, decisions, architecture, MVP and the OpenSpec guide together, including current config/schema guidance. Searched current documents for baseline/device gates, dimensions and pre-implementation prerequisites. Entry now requires reproducible conditions and methods; runtime feasibility/layout need demonstrated results; performance acceptance needs comparable samples and justified budgets; full desk and remaining device/accessibility/physical validation stay at stage 2; wider coverage remains at later milestones. All 11 MVP acceptance criteria remain pending and represented. Stage 0 retains its unfinished scope/acceptance synthesis; no product stage was closed by this delivery.

The archive remains unchanged. Its baseline/rendered-fit limitations remain evidence; current consumers explicitly supersede only its earlier entry policy. Minimum HA version, production stack and support scope remain unselected. No current consumer was found requiring phone samples or preset numerical budgets to start the separately scoped experiment.

## Outcome

Documentation delivery completed on 2026-11-18. Updated README and the roadmap, discovery, decisions, architecture, MVP and OpenSpec guides. The revised entry/acceptance map and bounded experiment brief are linked from current guidance. E1 records the superseded policy; E2/E3 were rechecked against official documentation, and the archived E4 evidence remains unchanged. No runtime specifications were created (`skip_specs: true`).

Actual checks:

- Reviewed the affected current documents and all new change files, including `.openspec.yaml`; the schema remains `research-first`, with no delta specs or product files.
- Local Markdown check passed for 11 changed/new documents: 67 local links and 17 heading anchors resolved. Changed/new whitespace and final-newline checks passed; the archived tree has no diff.
- `git diff --check` passed for tracked edits; the separate document check includes untracked Markdown files.
- `openspec validate align-roadmap-with-native-ha-layout --strict --no-interactive` passed, accepting zero deltas under `skip_specs: true`.
- `openspec schema validate research-first --json` passed with no issues. The CLI notes that schema commands are experimental.

The next work is a separately scoped experimental proposal using the brief above. Stage 0 scope/acceptance synthesis remains open. No baseline samples, numerical budgets, responsive-fit result, binding/editor feasibility or wider compatibility have been demonstrated. Performance approval still needs justified budgets and passing measurements; MVP acceptance still needs the full desk, remaining reference-device/accessibility, integration and separately scoped physical/everyday checks. No product code, dependency installation, HA changes or physical commands were performed. These document and structural checks do not validate runtime behavior. Review the delivery before archiving through the separate archive workflow.

## Archive record

Archived on **2026-11-18** after rechecking artifact status, all **8/8** tracked tasks and strict change validation. Specs were deliberately skipped; the CLI reported no delta paths, so no main specs were synchronized or created. Current documentation links and this record's relative links were adjusted for the archive location. Archiving does not complete stage 0, approve performance or execute the future experiment.
