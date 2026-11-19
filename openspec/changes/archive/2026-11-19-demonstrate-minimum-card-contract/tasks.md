# Tasks

Task 1.1 initially recorded a storage blocker; authorized cache cleanup resolved it and execution resumed. See [the resumed preflight](research.md#preflight-resumed-after-authorized-cache-cleanup--2026-11-19-utc). Checkboxes below track actual demonstrated outcomes. Apply executes this bounded experiment only. Read [research](research.md), [design](design.md) and the [experimental contract](specs/independent-element-bindings/spec.md) before starting. A blocked environment or failed check leaves dependent tasks open; do not mark intended outcomes as achieved. Record negative evidence and revise the plan if a mechanism must change.

## 1. Resolve execution prerequisites and safe fixtures

- [x] 1.1 Verify availability of an unprivileged disposable local Core 2026.11.1 runtime and project-local automation tooling; record exact artifact digest, frontend package/served assets, browser revision and dependency/license review in research.md, or record the blocking limitation without using production HA or changing host security settings.
- [x] 1.2 Add isolated setup/cleanup instructions and deterministic synthetic display/action fixtures under experiments/minimum-card-contract/; verify startup, loopback-only access, absence of device/production bindings and cleanup on the disposable instance, keeping generated state and credentials outside version control.
- [x] 1.3 Implement the allowlisted intercepted action recorder and its rejection/cancellation tests; verify no fixture action is forwarded externally and native-reference interception works before any control is activated, documenting the boundary with the fixtures.
- [x] 1.4 Freeze the execution manifest and pass/fail matrix from research R1/R3, including concrete Sections/Masonry widths, viewport/text scale, themes/locales, input methods, workload durations, resource limits and capture commands; verify each setting can be reproduced before running dependent experiments.

## 2. Implement and verify the two-slot runtime

- [x] 2.1 Add the original two-slot Web Component with independent display sources, targets and labels; verify distinct values, target/display independence and sibling preservation under reconfiguration using deterministic browser checks, and document the experimental format and its lack of public stability.
- [x] 2.2 Add validation, missing/unknown/unavailable states and recovery handling; verify unsupported configurations are rejected, one invalid source does not break a valid sibling, unusable targets cannot dispatch and recovery replays no action, documenting displayed limitations.
- [x] 2.3 Wire native inner and separate body controls to the recorder; verify pointer, keyboard and recorded touch-method activation dispatch exactly once, body/inner isolation and cancellation/rejection produce no false success, with repeatable tests beside the runtime.
- [x] 2.4 Add selective updates and disconnect/reconnect disposal; verify zero slot DOM mutations for unrelated updates, only dependent content changes for relevant updates, theme/locale correctness and baseline owned-resource counts after fifty lifecycle cycles; document counters and instrumentation limits.

## 3. Demonstrate actual HA visual persistence

- [x] 3.1 Add the schema-based visual form for every experimental field and register the card only in the isolated instance; verify the real HA picker/editor opens without user YAML configuration and record the relevant frontend/form contract checks in research.md.
- [x] 3.2 Automate visual creation, save, dashboard reload, editor reopen and single-field change for both slots and body action; verify complete before/after configurations preserve every untouched field, and publish sanitized persistence results and reproduction steps.
- [x] 3.3 Verify normal card loading does not fetch an experiment-owned custom editor module, then capture actual first-open/reopen editor requests and errors; document shared HA resources and observed loading boundaries without assuming zero editor cost.

## 4. Validate allocated layout and accessibility

- [x] 4.1 Add Sections/Masonry sizing hooks and responsive fixed regions with accessible names and visible focus; verify ordinary and long labels at the frozen narrow/intermediate/wide allocations in both real dashboard layouts, documenting actual dimensions and any failed boundary.
- [x] 4.2 Run the enlarged-text, light/dark and English/pt-BR matrix with keyboard traversal/activation and the recorded touch method; verify no overlap, unintended overflow or unreachable controls, and record screenshots/observations, input coverage and remaining device/assistive-technology limitations in research.md.

## 5. Measure comparable costs and decide acceptance

- [x] 5.1 Prepare matched native Tile/experimental workloads and separate correctness instrumentation from timing; verify identical fixtures, declared workload differences, one/ten-card cases, update schedules, cache control and action interception before capture, documenting the comparison limits and exact commands.
- [x] 5.2 Collect ten cold and ten warm trials, thirty local interaction observations and relevant/unrelated steady/burst updates per applicable matched workload; verify sample metadata and comparable conditions, retaining raw captures externally and publishing individual samples, medians/ranges, transfer/execution and local responsiveness summaries in research.md.
- [x] 5.3 Measure incremental editor loading and retained resources/memory through fifty mount/unmount cycles with fixed settling intervals; verify owned-resource counts return to baseline and record unsupported/noisy metrics and element/card-count growth costs without claiming transport or physical timing.
- [x] 5.4 Propose and record justified metric-specific budgets plus an explicit review decision, then evaluate fresh verification captures; publish pass/fail/pending for each performance gate, leaving acceptance open if budgets lack agreement or evidence is missing rather than inventing a passing limit.

## 6. Integrate evidence and verify delivery consistency

- [x] 6.1 Re-run the integrated real-HA save/reload/reopen and safe-action checks against the final experiment; verify a scenario-to-result map covers every spec requirement and all earlier changes together, with failures and remaining gates explicit in research.md.
- [x] 6.2 Reconcile README, roadmap, discovery, architecture, decisions and OpenSpec guidance with actual outcomes; verify consistent experimental status and working links, retaining unfinished stage 0 synthesis and stage 2 desk/device/physical checks and closing stage 1 only if all its exit evidence passes.
- [x] 6.3 Inspect all source, fixture definitions and sanitized results for scope, attribution and accidental private data; verify documented reproduction/cleanup, local links, git diff --check, strict change validation and research-first schema validation, recording commands and limitations without publishing raw authenticated traces.

## Workflow follow-up

- Review evidence and any unresolved gates before requesting archive; a complete planning status does not prove task completion.
- Archive through the separate OpenSpec archive workflow only when appropriate; do not consolidate unimplemented or failed behavior as delivered capability.
- A production adoption, changed experiment mechanism, different target release or physical desk validation needs its corresponding reviewed scope.
