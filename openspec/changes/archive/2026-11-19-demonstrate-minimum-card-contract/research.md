# Research

## Scope

Stage 1, answering D1/D2 from the [discovery map](../../../../docs/discovery.md): can two independently bound elements survive visual editing and HA persistence, isolate actions and updates, fit allocated space and support a defensible cost assessment? This record plans an explicitly bounded code experiment. No runtime investigation, installation or HA operation has occurred during proposal creation.

## Evidence

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | The current roadmap permits an experiment before phone baseline capture, while retaining separate correctness and performance gates. | [Roadmap](../../../../docs/roadmap.md), [sequence decision](../../../../docs/decisions.md#layout-and-validation-sequence--2026-11-18), read 2026-11-18 | Compare entry/exit criteria and bounded brief | Project policy, no runtime evidence | Collect measurements during this change; do not invent budgets |
| E2 | Official documentation describes configuration/state delivery and distinct Sections/Masonry sizing hooks. | [Custom card guide](https://contributors.home-assistant.io/frontend/custom-ui/card/), accessed 2026-11-18, rolling documentation | Reopened current guide | Does not prove selected-release behavior or content fit | Use documented extension boundaries; verify actual runtime |
| E3 | Official documentation offers schema forms and a custom editor emitting full configurations. | [Editor guide](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/), accessed 2026-11-18, rolling documentation | Reopened current guide | Independent-field persistence remains untested | Begin with a schema form and test real HA round trips |
| E4 | Earlier source research pins Core 2026.11.1 / frontend 20261028.5, Tile and frontend commit e32bc0696ebefde323f5b791269ad0c57f3f99d9; it explicitly lacks rendered-fit and baseline samples. | [Historical frontend assessment](../2026-11-15-discover-desk-and-frontend-contracts/research.md#frontend-contract-assessment-task-22), read 2026-11-18 | Review source links, recorded methods and limitations; cross-check extension boundaries with E2/E3 | Historical source observation, not new verification of a running bundle | Target that reference for comparability, verifying served identity before execution |
| E5 | The repository has no product source, runtime package, tests or consolidated specs; no active change preceded this proposal. | README, CONTRIBUTING, file inventory, `openspec list --json` and `openspec list --specs --json`, 2026-11-18 | Read-only inspection | No evidence about installed runtime availability | Isolate experimental tooling and document reproduction instead of assuming a project build |
| E6 | The latest bounded brief requires safe actions, actual HA persistence, layout coverage, measurements and explicit limits. | [Experiment brief](../2026-11-18-align-roadmap-with-native-ha-layout/research.md#brief-for-a-subsequent-bounded-experiment), read 2026-11-18 | Compare brief with current D2 and stage 1 | A plan, not executed evidence | Preserve the complete check matrix and separate feasibility from acceptance |

Existing external research material was located under the project research area; this plan relies on the sanitized archival record, not private inventories or local-only evidence. E4 is reused as a historical target only. Current official guidance supports the proposed experiment boundary; exact source/runtime matching must be rechecked before execution. No third-party implementation is copied.

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| Two stable slots preserve independent display and action bindings through visual edits. | Real HA save/reload/reopen and single-field edit, configuration snapshots | Both slots retain their values; changing A never overwrites B |
| Ordinary hass delivery with per-slot comparisons is sufficient for this minimal surface. | Relevant/unrelated update injections, DOM mutation/render counters and context-change checks | Unrelated updates cause no DOM work; relevant state/config/theme/locale changes remain correct |
| Isolated native controls avoid duplicate or body-action dispatch. | Mouse, keyboard and emulated touch activation with intercepted requests | One inner intent, zero body intents; cancellation/error yields no false success |
| Responsive fixed regions fit useful allocations without a free grid. | Real Sections/Masonry captures at recorded widths and enlarged text | No overlap or unintended overflow, reachable controls and coherent focus/names in tested cases |
| Experimental cost can support an evidence-based acceptance decision. | Comparable native/experimental capture series and justified budgets | Accept only if documented budgets pass; missing/noisy evidence remains inconclusive |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Is an isolated runtime for the historical release obtainable and reproducible? | Blocking runtime execution, not experiment planning | No live environment has been inspected; production HA is outside scope | Preparation task verifies runtime/tool availability, pins artifacts and served frontend; stop if unavailable rather than substitute production access |
| Does the selected HA form preserve these independent fields? | Experimental outcome; blocks claiming editor correctness | The check is the experiment's purpose | Use flat fields for two fixed slots; test round trips before broader tests; a failure is evidence, not permission to silently adopt a custom editor |
| Which actual browser/tool revisions and card widths will be captured? | Blocking capture execution; bounded preparation task | Exact versions must reflect installed artifacts, not fictional metadata | Record locked automation dependencies, browser revision, viewport and actual allocated widths before running captures |
| Are costs acceptable and is another rendering/update mechanism needed? | Experimental outcome; blocks performance acceptance and production choice | No measurements support a preference based on speed | Compare with native reference, justify budgets, then decide whether a follow-up comparison is needed |
| Can the complete desk and selected Safari device pass? | Deferred to stage 2 | Two synthetic slots cannot establish physical operation or full composition fit | Carry remaining device, accessibility, integration and physical checks forward explicitly |
| What public configuration, stack and minimum supported HA version should ship? | Deferred to a later production proposal | This experiment supplies evidence only | Keep experimental format private; do not adopt or promote by default |

No unresolved question is assumed answered by the specs. Those requirements define desired experimental behavior and evidence, not a production design. Environment preparation precedes runtime work; feasibility failures are reported and cannot satisfy missing stage 1 gates.

## Research and Experiments

### R1. Reproducibility and isolation preflight

During apply, select a disposable local HA Core 2026.11.1 instance with no host devices, privileged mode, production network targets or copied private configuration. Bind published access to loopback. Resolve the runtime artifact digest, frontend identity, automation package lock/browser revision and reproduction commands. Use synthetic helpers with two distinct values and synthetic action targets. Prove all experiment action dispatches are intercepted and rejected outside an explicit fixture allowlist before activating any control. Resource/dashboard setup is limited to this test instance. An unavailable runtime leaves the corresponding checks blocked; standalone fixtures can diagnose but cannot prove actual HA persistence.

Pin light/dark default themes, English/pt-BR, CSS viewport, zoom, pixel ratio, input methods and capture tools. Target allocated card widths of 240/360/600 CSS pixels in both layouts; record actual widths and nearest feasible dashboard allocations, fixing the final matrix before captures. These are test cases, not product minimums. Start with 100% text and repeat at 200%, distinguishing text scaling from viewport zoom.

Completion: a sanitized environment manifest, explicit pass/fail matrix and successful isolation/interception smoke checks before experimental runs. Side effects: project-local tooling and a removable test instance only; no physical hardware or existing HA modifications.

### R2. Functional and layout experiment

Implement the smallest original native-JavaScript card, static schema form and fixture recorder. Verify every scenario in the [delta spec](specs/independent-element-bindings/spec.md). Save/reload/reopen through the real HA editor; compare full configurations before and after changing one binding. Count slot DOM mutations, action intents and owned resources. Exercise invalid/missing/unavailable states, reconfiguration and disconnect/reconnect. Test keyboard activation/order, accessible names, pointer/emulated touch, long labels, text scaling, theme and locale changes in both dashboards. Report emulation separately from physical touch or assistive-technology testing.

Completion: reproducible tests and per-scenario observed results, with failures recorded. A failed mechanism requires reporting or a revised plan before changing the approach. No fixture dispatch proves desk movement or HA transport behavior.

### R3. Comparable costs and acceptance

Before collection, fix workloads: one and ten identical two-slot cards; relevant versus unrelated updates; one update per second versus a burst of twenty per second; fifty remove/reinsert cycles. Use native Tile instances presenting equivalent fixture information and intercepted actions, recording any unavoidable differences. Do not compare unlike workloads as a performance ranking. The current desk solution is optional and outside production access here.

Capture ten cold-cache and ten warm-load trials per matched workload, alternating native and experimental order. Record transfer/execution, time to usable controls, thirty non-actuating activation-to-render observations, relevant/unrelated DOM work, editor first-open/reopen loading, retained listeners/subscriptions and memory after lifecycle cycles where supported. Run steady updates for sixty seconds and record the burst duration before collection. Keep profiling instrumentation separate from timing runs; retain samples, medians, ranges, noise and unavailable metrics without inferring robust tail percentiles from small samples. Separate shared HA cost from experiment resources. UI dispatch timing excludes transport and physical response. The fifty lifecycle cycles extend the historical twenty-cycle diagnostic; neither cycle count is an acceptance budget.

Propose metric-specific budgets only after reviewing samples and usability requirements; record the rationale and an explicit budget review decision, then evaluate fresh captures against the recorded budgets. A missing budget, unsupported metric or incomparable reference remains a limitation, not a pass. Correctness gates (single dispatch, zero unrelated DOM mutations, no accumulating owned resources) hold independently of timing budgets. If evidence cannot justify budgets, report feasibility and leave performance and stage 1 acceptance open.

Completion: sanitized summary tables, workload definitions, raw-capture references, acceptance decisions and limitations in this record. Raw traces/configurations stay under `~/research/ha-lovelace-extended/demonstrate-minimum-card-contract/`; only reproducible safe fixture definitions, test tools and sanitized summaries enter the checkout.

## Outcome

**Status: bounded prototype implemented; functional/layout evidence and descriptive costs recorded; overall performance acceptance withheld.** E1–E6 were planning evidence. The apply sections below record actual observations, review and limitations. No production mechanism, stable public API or supported-version policy is adopted. Stage 0 synthesis, stage 1 performance acceptance and stage 2 desk/device/physical gates remain open.

The apply record below contains preflight results, functional/layout observations, sample summaries and gate decisions. Update README, roadmap, discovery, architecture and decisions only where those observations change their statements. Stage 0 synthesis remains open; stage 1 can close only on all its exit evidence; full desk and physical/everyday acceptance remain stage 2 work. Negative or limited results are useful evidence without completing unexecuted acceptance tasks.

### Apply preflight — 2026-11-19 UTC

**Result: execution paused at task 1.1's documented-blocker branch.** The selected image exists, but a conventional local image acquisition retaining compressed layers alongside extraction exceeds current free disk space. No HA runtime, project dependency, fixture or card was installed or started. Tasks 1.2–6.3 remain pending; this is not a functional or performance result.

| Check | Observed result | Method / limitation |
| --- | --- | --- |
| Official runtime artifact | `ghcr.io/home-assistant/home-assistant:2026.11.1`; index `sha256:6785d1eca68747a524c156faae1b139ed415c07357386ae6fe17291986e59e82`; Linux amd64 manifest `sha256:1e25a28cb9ee48dbcd33b65cbdcf2919d01991fe11f71cdae0a09c9fc3017ebb` | Read the [official registry manifest](https://ghcr.io/v2/home-assistant/home-assistant/manifests/2026.11.1) using an anonymous pull token; selected architecture matches local `x86_64`. No token was retained. |
| Artifact identity and license | Image labels report Core `2026.11.1`, base `2026.10.3`, Apache-2.0; created `2026-11-09T18:59:01.114396418Z` | Registry image configuration inspection. The top-level license label is not a transitive dependency/license audit. Bundled frontend package and served assets remain unverified. |
| Container tooling | No `docker`, `podman`, `nerdctl`, `containerd`, `runc`, `crun`, `skopeo`, `slirp4netns` or `rootlesskit` executable found; Bubblewrap `0.12.0-1~deb13u1` is installed | Executable/package checks and relevant local socket checks. This does not prove that locally acquired tooling could not work. |
| Basic isolation probes | `unshare --user --map-root-user --net true` and `bwrap --unshare-all --die-with-parent --ro-bind / / --proc /proc --dev /dev /bin/true` succeeded | Namespace smoke probes only, not verification of an HA sandbox, resource limits, loopback serving or fixture interception. No host security settings changed. |
| Storage | `2,841,718,784` bytes available on the filesystem shared by checkout and research; compressed image layers total `673,894,439` bytes; decompressed layer tar streams total `2,550,238,720` bytes | `df -B1 --output=avail,target` and streamed Zstandard decompression of every manifest layer. Compressed plus expanded streams total `3,224,133,159` bytes, exceeding available space before runtime state/tooling/captures. Tar stream size includes metadata and superseded files; it is not a measured merged-rootfs size. No image layers were saved to disk. |
| Existing development tools | Node `v24.22.0`, npm `11.19.1`, Python `3.14.9`; cached Chromium revision directory `1243`, binary reports Chrome for Testing `153.0.8010.12` | Version commands only. No project-local automation lockfile, browser launch, compatibility check or complete dependency/license review exists yet. Cached artifacts are not an execution manifest. |

The blocker is the currently unprovisioned local runtime with insufficient storage for the conventional cached acquisition path, not an unavailable release or failed namespace support. A streamed image extraction or another runtime strategy has not been implemented or validated and must not be assumed equivalent to the planned reproducible setup. Installing a daemon, changing host security settings, deleting unrelated data or using production HA is outside this apply scope.

Resume after sufficient storage is provisioned for the selected runtime, tooling, generated state and captures, or after an explicitly reviewed plan revision establishes another reproducible acquisition/isolation strategy. Re-run task 1.1's environment checks before task 1.2; the completed checkbox records the permitted negative-preflight outcome only. Frontend identity, automation locking/licenses, startup/cleanup, action interception and all later acceptance gates remain open.

External diagnostic artifacts are retained under `~/research/ha-lovelace-extended/demonstrate-minimum-card-contract/`: `measure-image.py` streams public image layers without storing authentication tokens, and `image-sizes.json` records per-layer sizes. This section contains the durable sanitized findings needed without that local directory.

### Preflight resumed after authorized cache cleanup — 2026-11-19 UTC

The maintainer authorized regenerable cache cleanup and continued implementation.
Manager-native cleanup (`uv cache clean`, `python3 -m pip cache purge`,
`npm cache clean --force`, `pnpm store prune`, `mise cache clear`, `apt-get clean`)
raised available space from about 2.7 to 5.2 GiB. Installed runtimes, project
virtual environments, research and private state were preserved. TRIM ran only
for the devbox (`services / CT 102`), with thin-pool status checked afterward.
The initial storage blocker is resolved for this run; it remains historical
preflight evidence, not a claim that every later environment has sufficient space.

The acquired amd64 manifest and every cached image layer matched SHA-256 digests.
`tools/image.py` extracts the pinned public image into the research area using
Python 3.14's Zstandard support and safe tar filtering. The installed Bubblewrap
provides the scoped disposable container without installing a daemon or altering
host security. Its read-only image has isolated user/PID/mount/network/IPC/UTS
namespaces and all capabilities dropped. A Unix socket relay publishes only
`127.0.0.1:18123`; there is no host network, host device mount or external adapter.
Private generated HA state and tokens use the separate mode-0700 local state
location documented in the experiment README, never research captures or Git.

Runtime identity reports Core `2026.11.1` and `home-assistant-frontend`
`20261028.5`. The served onboarding entry is
`/frontend_latest/onboarding.0a37e3604f87c853.js`, whose installed SHA-256 is
`3bbcac139710662551ec1f921acdbe8e4e5b65211fd7ec930ccf724b65d5ab85`.
The real browser loaded the onboarding UI and authenticated HA, whose live config
reports `2026.11.1`. `ha-smoke.json` externally records served main frontend asset
paths and the five fixture states: displays `21.0` / `72.0`, three action targets
`off`. No production configuration or secrets were read.

Project-local automation is locked to Playwright / playwright-core `1.65.1`
(Apache-2.0); optional fsevents is MIT and not installed on Linux. Browser revision
`1255` launches as Chrome Headless Shell `159.0.8154.6`. Package LICENSE/NOTICE and
the image's top-level Apache-2.0 labels were reviewed; browser/image transitive
components retain their upstream terms and no implementation is copied into the
repository. This is development-tool suitability review, not a distribution
license audit. The Playwright installer unexpectedly garbage-collected cached
revision 1243; Chrome and Headless Shell `153.0.8010.12` were restored from official
Playwright/CfT artifacts. Reproduction sets `PLAYWRIGHT_SKIP_BROWSER_GC=1` to
preserve other browser consumers.

Startup and HTTP access succeeded. Stop removed the relay listener, PID file and
socket; setup/restart reproduced the same fixture states. Setup seeds only the
pinned onboarding storage format to skip optional external/cloud setup, while
retaining actual HA user creation and authentication. Offline analytics and
marketplace initialization report resolver errors because the namespace has no
external adapter; this is a shared test-environment limitation to retain in cost
and compatibility reporting. No fixture interception or card correctness is
inferred from startup alone. Resource limits are two selected CPU cores, 3 GiB
per-process address space and 1024 descriptors, not a container-wide RAM quota.

### Safe recorder checks — task 1.3

`node tools/recorder-check.mjs` passed against the disposable HA. An allowlisted
intent recorded once; an external target, injected rejection and injected
cancellation recorded no intent. The driver blocks REST service requests and
intercepts **all** browser WebSocket `call_service` messages before transport,
accepting only the three fixture input_booleans and `toggle`/`turn_on`/`turn_off`.
The native toggle action resolves its service from the current state, so the
allowlist covers those native variants; this is not arbitrary service support.
A direct WS fixture call and a real pointer activation of an instantiated native
Tile each produced one intercepted native intent. The helper remained `off`.
No service message was forwarded, including disallowed messages. Card runtime
loads do not patch WebSocket; native interception is an explicit test-driver
opt-in installed before HA connects. The recorder has no external dispatch path.
`recorder-check.json` retains the sanitized statuses and counts externally; source
and rejection/cancellation checks are maintained with the experiment.

### Frozen execution conditions — task 1.4

[execution.json](../../../../experiments/minimum-card-contract/execution.json) fixes
versions, fixture workloads, resource limits, timing/correctness separation,
labels, themes/locales, text scaling, input methods, durations, cache protocol and
capture command names before their corresponding experimental runs. Native Tile
preflight (`node tools/allocate.mjs`) verified Sections/Masonry allocations with
CSS viewports 256/376/632 × 900, DPR 1 and zoom 1: narrow/intermediate widths are
240/360 px in both layouts; wide widths are 500 px (Sections) and 492 px (Masonry).
The target 600 px exceeds the default one-column maxima; these nearest native
allocations are explicitly retained rather than removing wide coverage. No
custom CSS changes HA's allocation algorithm. `allocation-preflight.json` retains
actual dimensions. Both layouts render, locale selection/theme emulation are
browser/HA inputs, and 200% text will be checked as a computed host size of 32 px
versus 16 px, independently of viewport zoom. Correctness requires the full
matrix; the manifest itself is not evidence of passing it. Commands for later
drivers are frozen now; those drivers are implemented with their tasks.

Cache-sensitive runs must not install Playwright HTTP routes: routing disables
HTTP cache. The driver instead uses a dead loopback proxy for non-HA hosts,
service-worker blocking and in-page service-boundary interception, preserving
cache semantics. The recorder blocks REST services before fetch/XHR and WS
services before send. Native comparison uses five Tiles per experimental card
(two display plus three action targets); its different visual structure is
reported, not hidden in a speed ranking. Timing acceptance remains unreviewed.

### Two-slot runtime checks — tasks 2.1–2.4

`node tools/runtime-check.mjs` passed in Chromium 159 against the served original
module. Deterministic hass snapshots isolate renderer behavior; these are browser
checks, not yet proof of real HA visual persistence. `runtime-check.json` retains
per-check observations, with the following durable results:

| Check | Observed result |
| --- | --- |
| Independent bindings | Initial values `21.1` / `72.2`; changing A's source to B's source and A's target to the body fixture preserved B, produced zero B mutations during reconfiguration and left the original config unchanged. Activating the reconfigured A and B recorded the body fixture and B fixture respectively. |
| Invalid config | Missing display binding, external target, unsupported action field and non-boolean confirmation each threw a specific configuration error; stale normal output was cleared. |
| Unusable source/target | A showed Missing source / Unknown / Unavailable while B stayed `72.2`. A missing target disabled only A. Recovery showed `31.5` and recorded no action. |
| Inputs/isolation | Pointer, Enter and Space each recorded exactly one A intent; emulated touch recorded exactly one B intent; the separate body button recorded only its own target. Cancellation and injected rejection recorded zero intents and displayed Cancelled / Rejected, never success or physical arrival. |
| Selective updates | Unrelated update: A/B/body DOM mutations `0/0/0`. Relevant A update: `1/0/0`. Observers cover subtree text, children and attributes, not hidden JavaScript work. |
| Presentation | Synthetic locale change formatted `21.1` as `21,1`; CSS theme input changed computed background to `rgb(17, 17, 17)` without rebinding. Actual HA theme/locale matrix is still separate. |
| Lifecycle | Fifty remove/reinsert cycles with 100 ms settling: owned listeners/subscriptions/scheduled work returned to `0/0/0` after each removal, connected counts `1/0/0`; disconnected state changes appeared as current value `49`; final activation dispatched once. |

The runtime uses native buttons, one owned shadow-root click listener, no live
subscription/observer/timer and no queued action. Diagnostic resource accessors
report those explicit owned paths; they do not prove absence of browser/HA leaks.
Correctness observers are test-driver-only and disconnected afterward. No
performance acceptance follows from these checks. The experimental flat fields,
limits and reproduction commands are documented with the source; no stable
public format or production stack is selected.

### Real HA schema form — task 3.1

The module was registered only in the disposable instance via the HA resource
collection. The actual dashboard picker listed “Minimum card contract experiment”
under Community cards. Choosing it opened the real HA schema editor with all nine
fields: two display selectors, three target selectors, three label textboxes and
confirmation switch. The picker supplied a valid stub; Save created a storage
card with the complete expected configuration without opening the code editor or
requiring user YAML. This verifies `getConfigForm` on the pinned served frontend,
not merely the rolling guide. `tools/register.mjs`, `tools/editor.mjs` and the
persistence driver reproduce resource registration and visual actions. Schema
selectors are HA-owned controls; no experiment-owned editor module exists.

### Real HA persistence — task 3.2

`node tools/persistence-check.mjs` completed ten visual round trips covering all
nine fields (confirmation was turned on and back off). Each iteration reopened
through the real HA editor, changed exactly one field, saved, reloaded, reopened,
checked every form value, compared the **entire** stored configuration and checked
the live runtime configuration. Every untouched field remained identical. Both
slots' display sources, action targets and labels and the body target/label were
changed; confirmation also persisted. No code/YAML editor was opened and no page
script injected config changes during the visual round trips. Only test-dashboard
reset was seeded through the isolated storage API before creation.

The complete sanitized before/after objects are reviewable in
[results/persistence.json](../../../../experiments/minimum-card-contract/results/persistence.json).
There were zero page errors. Native edit buttons and the native confirmation
switch are activated through their keyboard UI because their visible overlays
cover internal pointer targets in this frontend; this is recorded input coverage,
not a forced DOM click or an assertion of flawless pointer editing. Entity
selection and text changes use actual picker options and textboxes. These results
establish the bounded flat schema on this release, not arbitrary nested bindings
or a stable public configuration format.

### Actual editor loading — task 3.3

`node tools/editor-load-check.mjs` separates normal dashboard load from opening
an existing card's editor, with no navigation between the baseline, first-open
and same-document reopen intervals. Normal experiment resources were `card.js`,
`recorder.js` and `card.css`, totaling 12,510 Resource Timing transfer bytes in
this observation. There is no experiment-owned editor module. First-open fetched
14 HA-owned resources, reporting 68,426 transfer bytes; same-document reopen
fetched zero new resources. Both intervals had zero page errors. These single
observations establish loading boundaries only, not accepted timing cost or zero
editor execution/memory cost. Shared HA forms/selectors/editor chunks remain
real costs. The separate picker/visual-persistence run also loads card previews;
its request list must not be mistaken for incremental editor cost. Sanitized
paths/bytes are in
[results/editor-loading.json](../../../../experiments/minimum-card-contract/results/editor-loading.json).

### Real layout and accessibility matrix — tasks 4.1–4.2

`node tools/layout-check.mjs` passed all **96** frozen combinations: Sections /
Masonry × three allocations × ordinary/long labels × 100%/200% text × light/dark
× English/pt-BR. Computed card widths were 240/360/500 px in Sections and
240/360/492 px in Masonry. Auto-sized height ranged from 216.34 to 2167.55 px;
long enlarged content requires vertical scrolling rather than clipping. The
rendered HA card wrappers contained the full card height. No tested node had
unintended horizontal overflow; button rectangles did not overlap and each
activation area was at least 48 × 48 CSS px.

All cases verified actual HA language and dark-mode state, computed 16/32 px
host text, accessible names equal to configured labels, coherent A→B→body Tab
order, a visible solid 3 px keyboard outline, Enter/Space activation and emulated
touch of all three controls. Each activation recorded exactly the intended
fixture target. HA's actual user-language preference is set through its local
frontend user-data API; an obsolete localStorage-only attempt did not change
language and was corrected before claiming Portuguese coverage. Tests wait for
HA theme/locale propagation and the stylesheet before observation.

Sanitized individual case results are in
[results/layout.json](../../../../experiments/minimum-card-contract/results/layout.json).
Raw per-case geometry and 96 full-page PNGs remain externally in `layout-check.json`
and `screenshots/`; representative narrow/200%/long-label dark Portuguese output
was also visually inspected. Fixed HA navigation can appear within full-page
captures at the current scroll position. Keyboard/touch checks scroll each
control into reach; no physical touch, Safari, screen reader, contrast audit or
full desk fit is established. These remain later device/accessibility/MVP gates.

### Measurement workload refinement before captures

Preparation found a closer native comparison than the initial five-Tile plan:
Tile's existing `perform-action` configuration can display each input_number and
independently target its input_boolean. Use two such Tiles plus a separate body
Tile, for **three native Tiles per experimental card**. The third Tile also
shows its target state, and native arrangement/controls/editors differ; these
remain explicit comparison limits. The execution manifest was updated before
any comparative capture. No experimental runtime, acceptance requirement or
production mechanism changed. Native interception must pass for this exact
configuration before collection. The existing desk solution is not accessed.

### Comparable-workload preparation — task 5.1

`node tools/measurement-preflight.mjs` passed for native/experimental one/ten-card
cases. Three native Tiles per group retain the same two data bindings and three
independent intercepted targets. A real activation recorded exactly the A target
in each case; no transport was forwarded. Exact commands and workload definitions
are in the execution manifest and `tools/workloads.mjs`. Native measured pages
exclude the experiment resource registration; experimental measured pages include
it. Resource toggling affects only the disposable instance and is restored after
capture. Cold preflight resource transfers were 1,361,003 bytes (native) and
1,364,118 bytes (experimental), with warm reload resource transfer zero in all
four cases; these smoke observations are **not** acceptance samples. Document
transfer is added separately in the collection driver. Cache is enabled, service
workers are blocked and HTTP routing is absent.

Correctness observers are absent from timing runs. CDP ScriptDuration/TaskDuration,
Resource Timing, explicit readiness and local intent timestamps have declared
instrumentation costs. Readiness waits for actual card instances, stylesheet,
fonts and two animation frames. Input-to-frame observations include automation
observation delay and a paint opportunity, not a guaranteed compositor paint.
Steady/burst tests use actual synthetic state updates in the isolated HA and
record requested duration, cadence, late iterations and actual elapsed time.
No unlike-layout ratio, robust tail percentile, transport timing or physical
response is claimed. A foreground runtime session ended normally while idle
before measurement preparation; it was restarted and this full preflight passed
before any comparative capture. No interrupted sample is retained as valid.

### Capture-driver correction before accepting samples

The first collection attempt exposed negative load CPU deltas: CDP execution
counters reset on navigation, so subtracting the previous document's totals was
invalid. That run was stopped; its 40 load records and partial update diagnostics
are retained externally with the `-invalid-counter-delta` suffix and excluded
from accepted sample summaries. Load capture now reads post-navigation CDP totals
and asserts nonnegative values. Same-document update/editor windows still use
counter deltas. All required load and update series are restarted with the
corrected driver; no invalid record is silently repaired or counted as a pass.

### Discovery measurements — task 5.2

The corrected `node tools/measure.mjs` completed **80 load samples** (ten cold and
ten warm per native/experimental × one/ten-group workload), **120 local input
observations** and **16 actual synthetic update windows**. Native/experimental
order alternated by trial. All steady windows delivered 60 updates at 1 Hz for
60 seconds; all burst windows delivered 200 updates at 20 Hz for 10 seconds, with
zero late ticks. Actual elapsed times, CDP execution/task totals, transfer,
readiness and individual local observations are published in
[measurements.md](../../../../experiments/minimum-card-contract/results/measurements.md),
[measurements.json](../../../../experiments/minimum-card-contract/results/measurements.json)
and [all 80 load samples](../../../../experiments/minimum-card-contract/results/load-samples.csv).
These files include shared environment metadata and SHA-256 hashes of the served
runtime sources, verified byte-identical to maintained source.

| Experimental workload | Cold usable ms, median [range] | Warm usable ms, median [range] |
| --- | --- | --- |
| One card | 653.10 [640.70–696.20] | 457.10 [446.80–470.80] |
| Ten cards | 663.00 [643.70–1108.60] | 447.80 [444.90–464.40] |

The ten-card cold outlier is retained, including its additional shared frontend
requests; no observation is discarded as convenient noise. Native one/ten-group
cold medians were 655.10/681.35 ms, but the distinct native layout/additional state
and shared HA/driver overhead preclude a universal speed ranking. Native and
experimental script/task, editor and update costs are descriptive under the
recorded conditions. The current desk solution is intentionally not accessed.

Own cold resource transfer was 12,510 bytes (11,610 decoded resource-body bytes)
for the three experimental assets; warm resource transfer was zero, while the
navigation document still transferred 3,931 bytes and execution still occurred.
Across all workloads, local pointerdown-to-intent observations ranged 0.10–2.50 ms;
the observed next-frame opportunity was at most 13 ms. These exclude HA action
transport and physical behavior and are not compositor-paint guarantees. Ten
trials do not support robust tail percentiles. Shared background work and the
single headless host remain limitations. No budget is inferred accepted here.

### Retained resources and editor diagnostics — task 5.3

The separate `node tools/measure.mjs --diagnostics` completed fifty cycles per
native/experimental × one/ten-group case, with 100 ms after removal and after
reinsertion. All experimental owned counts returned to zero after **every**
removal, and all four workloads dispatched exactly once afterward. Renderer-global
listener counts returned to their initial connected values: native 497/1415 and
experimental 402/447 for one/ten groups. Experimental forced-GC heap changed from
13,728,148 to 13,755,596 bytes (one card) and 13,919,572 to 13,965,616 bytes (ten).
These noisy same-node/retained-reference diagnostic figures do not prove absence
of all leaks or establish a heap budget. Shared journal/HA/browser resources are
outside the owned-card counter; the journal retains only scalar intents until
reset, never card references.

Actual incremental first-open editor capture transferred 103,353 bytes for the
experiment versus 304,795 for the different native editor; all same-document
reopens transferred zero bytes, with nonzero execution/ready time. First-open
includes dashboard edit mode, unlike the earlier narrower request observation;
the scopes are recorded, not equated. Full per-count timings/resources and six
heap/DOM/listener checkpoints per lifecycle series are in the sanitized results.
An initial diagnostic attempt used the Sections “Edit card” locator on Masonry;
it was corrected to Masonry's actual “Edit” keyboard control and the complete
series rerun. Partial diagnostics are retained externally and excluded from the
published complete series. No production transport, Safari or physical test was
performed.

### Budget review and fresh verification — task 5.4

The technical evidence review is recorded in
[budget-review.json](../../../../experiments/minimum-card-contract/results/budget-review.json),
**before** running `node tools/verification.mjs`. Proposed local candidates are
16 KiB decoded experimental assets, 1000 ms cold / 750 ms warm readiness and
16.7 ms pointerdown-to-local-intent work. Their scope and rationale are explicit;
these are proposals, not approved product requirements. No independent or
maintainer agreement is implied by the implementation agent's technical review.
Shared CPU/editor/update totals, next-frame/compositor behavior and retained heap
lack justified agreed numerical budgets under these methods.

**Review decision: withhold overall performance acceptance.** The discovery
cold outlier exceeds the proposed one-second goal, the different native
composition and shared HA/driver overhead limit attribution, and numerical user
requirements have not been agreed. Do not manufacture a passing limit or select
a production mechanism from these observations.

Fresh verification collected **24 new loads** (three cold/three warm per variant
and group count) and **20 new local input observations** after that decision.
All newly observed candidate readiness, asset and local-intent values were within
the proposed limits. The complete fresh observations and their explicitly
pending acceptance statuses are in
[fresh-verification.json](../../../../experiments/minimum-card-contract/results/fresh-verification.json).
Fresh observations do not erase the discovery outlier or supply missing approval.

| Gate | Review result |
| --- | --- |
| Single intended dispatch, zero unrelated slot mutations, owned-resource baseline | Pass as deterministic correctness gates; not timing budgets |
| Decoded asset ceiling | Pending acceptance: candidate observed within limit, unapproved |
| Cold/warm local readiness | Pending acceptance: fresh candidates observed within limit, retained discovery cold outlier and unagreed requirement |
| Local-intent processing | Pending acceptance: fresh candidate observed within limit; excludes transport and final paint |
| Shared CPU/editor/update cost | Pending: descriptive samples, no approved attributable budget |
| Retained heap and final compositor/device behavior | Pending: diagnostic/unsupported coverage and no approved budget |

Task 5.4 is completed as its explicitly permitted pending-acceptance report,
including proposals, an explicit negative review decision and fresh evaluation.
No performance gate or stage 1 exit is closed. The report does not defer any
claimed passing requirement or consolidate unimplemented production behavior.

### Integrated final verification — task 6.1

The final source re-ran `runtime-check.mjs`, all ten actual visual persistence
round trips and `recorder-check.mjs` successfully. `integrated-check.mjs` then
activated the **actually persisted** reconfigured card through pointer, Enter
and emulated touch: A recorded its changed body-fixture target, B its changed A
fixture and the body its changed B fixture, each exactly once. All target states
remained `off`; reload replayed zero intents. Real HA unrelated state injection
caused A/B/body mutations `0/0/0`; changing the entity now displayed by B caused
`0/1/0`, preserving A and the body. Sources were restored afterward.

[scenario-map.md](../../../../experiments/minimum-card-contract/results/scenario-map.md)
maps **all 19** delta-spec scenarios to the actual results, with pending numerical
performance/physical/device gates explicit. The final integrated and deterministic
sanitized results are also published in `results/`. Existing 96-case layout and
full measurement evidence applies to the same byte-identical served runtime
assets; no later runtime code change invalidated those captures. Reporting
incomplete acceptance is a demonstrated requirement, not approval of performance.

### Documentation reconciliation — task 6.2

README, contributor/PR guidance, roadmap, discovery, architecture, decisions and
OpenSpec documentation/config context now distinguish the implemented experiment
from a production card. They link reproducible source and observed evidence,
record the negative performance-review outcome and leave stage 1's budget/exit
gate open. Stage 0 synthesis and stage 2 desk/device/physical/everyday gates remain
unchecked. No minimum supported release, public configuration, stack, promotion,
release or production deployment has been adopted. Main specs and archived
history are unchanged; apply performs no synchronization or archive.

### Final delivery checks and cleanup — task 6.3

Original source, fixture definitions and sanitized result files were inspected for
scope, attribution and private data. No third-party implementation is vendored;
project-local tooling retains its package licenses/NOTICE, and generated skills,
main specs and archived history remain unchanged. A targeted credential-pattern
scan found no embedded private keys/JWTs/static bearer credentials. Generated
account credentials/tokens never entered the checkout or published traces.

Final checks passed:

- Local relative links and heading fragments, including all 19 scenario mappings.
- All 54 delivery files: whitespace, JSON parsing, Python AST and JavaScript syntax.
- `git diff --check`, plus explicit checks of newly added/untracked files.
- `openspec validate demonstrate-minimum-card-contract --strict --no-interactive`.
- `openspec schema validate research-first --json` (no issues).
- Final real-HA visual round trips, live selective updates, safe native/experimental
  dispatch and reload/no-replay checks described above.

The disposable instance was stopped using the PID/command-identity checked cleanup
path. Port 18123, its PID file and bridge socket disappeared. Only this task's
generated private HA state/credentials and regenerable image `rootfs/` / `layers/`
cache were then removed; no daemon or host security/network setting was installed
or changed. Public fixtures, locked tooling, source and sanitized results remain
reproducible through the documented full command order. Existing browser revisions
were restored, including FFmpeg 1011, and future installs disable browser-cache GC.
The filesystem ended with about **4.8 GiB available**. TRIM ran again only for the
devbox (`services / CT 102`) after cleanup, with thin-pool state inspected.

Raw measurements, per-case screenshots, invalid/partial diagnostic attempts,
source hashes and investigation scripts remain under
`~/research/ha-lovelace-extended/demonstrate-minimum-card-contract/`; its README
indexes the evidence. They contain no published authenticated traces. This is a
bounded feasibility/correctness delivery with an explicit negative performance
acceptance decision. Review that distinction before any separate archive/sync;
no production capability or stage 1 performance exit is declared complete.

### Archive and spec synchronization — 2026-11-19

Archived with all 20 tracked tasks and planning artifacts complete. The nine
requirements and 19 scenarios were synchronized to the new
[experimental binding specification](../../../../openspec/specs/independent-element-bindings/spec.md),
with the Purpose preserved verbatim and main-spec structure verified before
archiving. This consolidates the bounded experimental behavior and its explicit
acceptance limits. It does not approve performance, close stage 1, adopt a
production API/stack or claim the full desk/device/physical MVP. Relative links
were rebased for this archive location; prior archives remain unchanged.
