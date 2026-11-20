# Minimum card contract experiment

Unreleased, removable stage 1 experiment. The two-slot configuration is private,
unversioned and has no public compatibility promise. No physical device or
production HA access belongs to this experiment.

## Local prerequisites and setup

Use Linux x86_64, Python 3.14 with Zstandard support, Bubblewrap (tested 0.12.0),
Node 24 and npm. Do not install or upgrade host tools for this experiment.
Reserve space for the image cache/rootfs, private HA state and captures. The
pinned image has 674 MB of compressed layers and 2.55 GB of expanded tar streams;
actual filesystem allocation differs. Stop if storage or isolation is inadequate.

From the repository root:

```sh
python3 experiments/minimum-card-contract/tools/image.py
python3 experiments/minimum-card-contract/tools/sandbox.py identity
python3 experiments/minimum-card-contract/tools/setup.py
```

From `experiments/minimum-card-contract/`:

```sh
npm ci --ignore-scripts --no-audit --no-fund
PLAYWRIGHT_SKIP_BROWSER_GC=1 ./node_modules/.bin/playwright install chromium --only-shell
```

The lockfile pins Playwright 1.65.1 (Apache-2.0), its sole runtime dependency
`playwright-core` (Apache-2.0) and optional macOS `fsevents` (MIT; not installed on
Linux). Browser binaries have their upstream licenses; consult Playwright's
installed LICENSE/NOTICE and browser distribution notices. None is bundled in
project source. The HA image/Core/frontend report Apache-2.0; its many transitive
packages keep their own licenses. No third-party implementation is copied here.

## Run and isolation

From the repository root, run in a dedicated foreground terminal:

```sh
python3 experiments/minimum-card-contract/tools/sandbox.py serve
```

The read-only pinned image runs in Bubblewrap user/PID/mount/network/IPC/UTS
namespaces with all capabilities dropped, an isolated `/dev`, no host devices,
no production mounts and no external network. Only synthetic helper definitions
are supplied. A Unix socket relay crosses the network namespace and publishes
HTTP/WebSocket access exclusively at `http://127.0.0.1:18123`. Browser automation
also rejects requests to other hosts. Limits: two allowed CPU cores, 3 GiB
per-process virtual address space and 1024 file descriptors; these are not a
container-wide RAM quota. Capture host contention separately.

Image layers/rootfs and raw diagnostics live under
`~/research/ha-lovelace-extended/demonstrate-minimum-card-contract/` (override with
`MCC_RESEARCH`). Generated HA state, disposable credentials and tokens live under
`~/.local/state/ha-lovelace-extended/minimum-card-contract/`, mode 0700. Never
publish those files or authenticated traces. The setup tool seeds the pinned
onboarding storage format to skip optional cloud/weather setup, retaining actual
HA account creation/authentication. This internal setup detail is version-bound.

From the experiment directory, `node tools/ha-smoke.mjs` creates a random local
account on first run, retains its credentials privately, checks actual helper
states and records served frontend asset paths. Setup requires no production
secret. If HA prompts to confirm the HTTP binding, the driver confirms the
loopback configuration. Startup may report offline analytics/marketplace resolver
errors because this namespace deliberately has no external adapter. These errors
must be reported alongside measurements, not silently treated as compatibility
success.

## Stop and cleanup

From the repository root:

```sh
python3 experiments/minimum-card-contract/tools/sandbox.py stop
```

Verify port 18123 is closed and the PID/socket files disappeared. The namespace
and its processes disappear; no daemon, dashboard or resource is registered in
another HA installation. Stopping preserves private state and evidence for
reproduction. To reset, first stop, then remove only the exact experiment state
directory stated above; setup and the smoke driver recreate it. To reclaim image
space after stopping, remove only this experiment's `rootfs/` and `layers/` under
the research directory. Preserve research notes, scripts and captures. To rerun,
reacquire with `image.py`. Never delete unrelated caches or research as part of
experiment cleanup.

## Safe action boundary

`src/recorder.js` records only three synthetic input_boolean targets. It has no
service call path. Status means **intent recorded**, cancelled or rejected; it
never means movement or physical arrival. `node tools/recorder-check.mjs` checks
allowlisting, cancellation/rejection and a real native Tile pointer activation.
The test driver intercepts every WebSocket `call_service` before send, accepts
only fixture toggle/turn_on/turn_off intents and returns a synthetic response;
it rejects all other service messages without forwarding. It also blocks REST
service requests and browser requests to other hosts. Native interception is
installed before the HA connection and before any reference control activation.
No test proves HA action transport, physical touch or desk operation.

## Experimental format and runtime checks

The stub config has `a_source`, `a_target`, `a_label`, equivalent `b_*` fields,
`body_target`, `body_label` and optional boolean `confirm`. Display sources must
be synthetic `input_number.mcc_*` entities; targets are exactly the three fixture
input_booleans. Labels must be nonempty strings. Unsupported fields/actions are
rejected. Display and action entities are independent; no automatic defaults
select a different entity on error. No migration or compatibility is promised.

`node tools/runtime-check.mjs` checks binding independence, invalid/missing/
unknown/unavailable states, recovery, pointer/keyboard/emulated-touch dispatch,
confirmation/rejection, scoped DOM mutations and fifty lifecycle cycles with
100 ms settling. Unusable action targets disable the corresponding control;
a missing display alone does not invalidate an independent usable action target.
Resource diagnostics count owned paths only, not all HA/browser memory. Inputs
and theme/locale here use deterministic hass snapshots; integration coverage
requires the real-editor and dashboard matrix checks.

## Actual editor and persistence checks

`node tools/register.mjs` registers the runtime only in this disposable HA.
`node tools/persistence-check.mjs` resets only the test dashboard, creates the card
through the real picker and performs ten visual save/reload/reopen round trips
covering all nine fields. Stored full configurations and reopened values must
match with untouched fields preserved. The native edit button and confirmation
switch use keyboard activation to reach the actual controls behind HA overlays.
`node tools/editor-load-check.mjs` measures actual request boundaries for a normal
load, first editor open and same-document reopen without counting navigation as
incremental editor work. Shared HA resources count as cost. Sanitized results
are maintained in `results/`; raw diagnostics remain in the research area.

## Layout coverage

`node tools/layout-check.mjs` runs the 96-case matrix in `execution.json` against
actual Sections/Masonry dashboards. It sets HA's disposable user-language
preference and emulates the system color scheme, verifies actual propagated
state and computed text sizes, checks geometry/overflow/focus/names and activates
all controls by keyboard and emulated touch. Long labels at 200% may require
vertical scrolling. Screenshots stay in the external research area; sanitized
case dimensions and results are in `results/layout.json`. This establishes only
the recorded Chromium/emulated coverage, not Safari, physical touch, assistive
technology or the complete desk MVP.

## Measurement commands

`node tools/measurement-preflight.mjs` verifies one/ten-card native/experimental
workloads, actual action interception and cold/warm cache behavior. Native uses
three Tiles per group: independent display/action bindings on two Tiles, plus a
body-target Tile that also displays its state. It is a closer comparison, with
remaining layout/editor differences documented in the manifest. The driver
removes the experimental resource for native captures and restores it for
experimental captures, solely in this test instance.

`node tools/measure.mjs` collects ten cold and ten warm trials per variant/count,
alternating order, thirty local input observations per workload and the frozen
60-second steady / 10-second burst relevant/unrelated updates. It writes
incremental sanitized diagnostics externally. `node tools/measure.mjs --diagnostics`
separately captures fifty lifecycle cycles, renderer heap/DOM diagnostics and
real editor first-open/reopen costs. Forced GC and intentionally retained reused
nodes limit memory interpretation. No capture establishes physical/device timing.
Do not run other browser tests concurrently with timing captures. Budgets require
an explicit justified review decision and fresh verification; collection alone
does not accept performance or select a production stack.

The recorder's diagnostic journal intentionally retains scalar intent records
until reset; it contains no card references. Drivers reset it between observations.
Owned-card resource counts exclude this shared journal, HA-owned resources and
browser internals. Safe action interception remains active during captures and
adds shared driver work; timing is not an uninstrumented production measurement.

## Full reproduction order

With the disposable server running, execute from this experiment directory:

```sh
node tools/ha-smoke.mjs
node tools/recorder-check.mjs
node tools/allocate.mjs
node tools/register.mjs
node tools/runtime-check.mjs
node tools/persistence-check.mjs
node tools/editor-load-check.mjs
node tools/layout-check.mjs
node tools/measurement-preflight.mjs
node tools/measure.mjs
node tools/measure.mjs --diagnostics
python3 tools/summarize.py
```

`allocate.mjs` creates/resets only `mcc-experiment`; run it before registration
and visual creation on a fresh instance. Later tools deliberately replace only
this test dashboard's contents. The full timing protocol takes several minutes.
Use focused checks for focused changes; the full sequence is for reproducing the
complete experimental evidence. Budget review and any verification captures
must be recorded after discovery samples, without promoting candidate limits
to accepted requirements automatically.

## Performance review outcome

The [technical budget review](results/budget-review.json) withholds overall
performance acceptance. Candidate limits remain unapproved. After recording that
decision, `node tools/verification.mjs` collected fresh loads/input observations;
[their candidate observations](results/fresh-verification.json) do not erase the
discovery outlier or constitute approval. [Descriptive samples](results/measurements.md)
show the actual costs and limitations. Stage 1 remains open; the prototype is not
adopted as a production stack or API. Maintainer agreement and suitable further
evidence are needed before changing that acceptance decision.

The change was archived on 2026-11-19 with sync to the
[experimental main spec](../../openspec/specs/independent-element-bindings/spec.md).
Archiving preserves the technical review's withheld performance acceptance and
does not close stage 1 or adopt the prototype as production code.

## Stage 1 performance follow-up campaign

The archived [`evaluate-stage-one-performance` change](../../openspec/changes/archive/2026-11-19-evaluate-stage-one-performance/tasks.md) keeps `src/`, the original
manifest/results and archived evidence unchanged. Its separate
[manifest](performance-followup/execution.json) records reconstruction and its
[partially approved matrix](performance-followup/budget-review.json) records the
four explicit numerical agreements and six other required pending rows. The
[verification review](performance-followup/review.md) records one approved budget
failing and three passing; the historical 1108.60 ms observation is retained.
Overall performance acceptance remains withheld.

Reconstruct with the setup commands above, setting `MCC_RESEARCH` to
`$HOME/research/ha-lovelace-extended/evaluate-stage-one-performance` for image,
sandbox and preflight commands. The generated private-state directory is the
same disposable directory as before: verify it is absent/not running before
setup. Reuse the locked dependencies and revision 1255 browser; do not replace
host tools. Stop if capacity or isolation is inadequate. This campaign used an
external guard that stops the sandbox below a 1 GiB free-space reserve; monitor
free space during capture and retain evidence of any storage stop.

From the experiment directory, with the isolated server running:

```sh
export MCC_RESEARCH="$HOME/research/ha-lovelace-extended/evaluate-stage-one-performance"
node tools/ha-smoke.mjs
node tools/allocate.mjs
node tools/register.mjs
node tools/recorder-check.mjs
node tools/measurement-preflight.mjs
node tools/followup-preflight.mjs control-preflight-v2
```

New drivers require an explicit external campaign root and a unique run name.
The path above is the local convention; another external root may be supplied
through `MCC_RESEARCH`. Historical evidence and the checkout are protected.
They create
a fresh subdirectory exclusively before importing historical helpers and refuse
to overwrite it; choose another name on a subsequent run. `followup-preflight`
checks empty/native/experimental one/ten-group dashboards, experimental-resource
absence/presence and intercepted synthetic activation with unchanged helper
state. The empty dashboard has no card resource; its driver-only button is
added after readiness, positioned above the HA host for real pointer activation.
This local recorder control is not equivalent to native HA action semantics.
It bounds shared driver work only. There is no empty card-editor equivalent.

Published [discovery findings and limitations](performance-followup/discovery.md)
link the sanitized samples and required pending metric rows.

Repeated discovery uses separate entry points, serially, from that same directory:

```sh
node tools/followup-measure.mjs discovery-loads loads
node tools/followup-measure.mjs discovery-editors editors
node tools/followup-measure.mjs discovery-updates-v3 updates
node tools/followup-methods.mjs method-validation-v2
node tools/followup-lifecycle.mjs discovery-lifecycle
node tools/followup-rendering.mjs discovery-rendering
python3 tools/followup-summarize.py
```

These names identify this campaign's retained executions; use fresh unique names
for another capture. The summarizer is a publisher for those specific completed
runs, not a generic acceptance evaluator, and refuses to overwrite published
artifacts. It expects all named runs and records source/provenance identities.
For an independent report reproduction, supply
`--output /path/to/a/new/report-directory` to the summarizer; that directory must
not exist. Missing failed pilots are not required on a successful reproduction.

The [driver history](performance-followup/method-history.json) provides exact
patches to reconstruct earlier discovery source hashes from the current driver.
The measurement entry-point revisions differ only in update-mode token renewal/
final-state checks; load/editor/input branches are identical. Separately recorded
post-capture portability changes permit another explicit external output root
without changing measurement logic.

The frozen discovery defaults are ten cold/warm pairs, thirty local inputs and
ten independent first-open/reopen editor pairs for each empty/native/experimental
one/ten-group workload. Empty editor observations cover edit-mode setup only.
Updates use three independent repetitions per workload/class/rate, 60 seconds
at 1 Hz and 10 seconds at 20 Hz. Token renewal occurs outside each timed workload;
each window checks that the measured page received its final fixture state.
The `settleMs: 200` schedule field applies only before update windows; loads and
editors use their documented readiness boundaries. Whole-dashboard totals and
rotated block/control contrasts remain descriptive, with shared cost and unequal
native composition explicitly retained. Never subtract CDP counters across
navigation; the separate method probe demonstrates the reset with an intentional
500 ms script before reload, outside timing collection.

Lifecycle diagnostics create fresh nodes, remove them, release all strong
harness references and inspect forced-GC checkpoints with weak references and a
positive retained/released control. Scalar ownership diagnostics are separate
from renderer-global heap/DOM observations. Rendering diagnostics change the
first visible fixture value in browser-side hass snapshots and compare setter
costs with/without a content observer. They record the content-matching observer
callback and following frame opportunity on the browser clock. Neither milestone
establishes final compositor presentation, HA transport or physical response.
Consult the campaign evidence for actual method validation outcomes and limits;
commands alone are not proof of support or acceptance.


## Approved follow-up verification

The [approval](performance-followup/approval.json) covers only the four presented
limits and maximum/no-replacement rule. The [frozen plan](performance-followup/verification-plan.json)
contains method/environment/source identities and the separate 120-load/180-input
schedule. All required unapproved/unsupported rows remain pending. Fresh capture
uses a newly reconstructed disposable lab and an external campaign root:

```sh
export MCC_RESEARCH="$HOME/research/ha-lovelace-extended/evaluate-stage-one-performance/verification-20261119"
node tools/followup-preflight.mjs preflight
node --test tools/followup-evaluate.test.mjs
node tools/followup-verify.mjs acceptance
node tools/followup-evaluate.mjs performance-followup/verification-plan.json performance-followup/verification-samples.json /path/to/a/new-review.json
```

Names above identify retained runs and cannot be overwritten. `followup-verify`
checks all frozen source hashes before browser activity and stops on invalid
captures, preserving observations/reasons. It never replaces a slow valid sample.
The evaluator reads explicit approved maxima, has no historical-candidate defaults,
checks frozen provenance and all trial/control coverage, and leaves required
unsupported/unapproved rows pending. A failed budget does not authorize changing
the subject or threshold. Offline evaluation uses the published sanitized samples
and needs no private HA access. The [review](performance-followup/review.md)
records the actual cold-readiness failure and remaining stage 1 gates.

## Stage 1 performance diagnostics

The archived [`diagnose-stage-one-performance-gaps` investigation](../../openspec/changes/archive/2026-11-19-diagnose-stage-one-performance-gaps/research.md) preserves the
subject and all historical evidence. Its [offline preflight](performance-diagnostics/preflight.json)
reconciles the four approved limits, ten required rows, 36 current identities,
five reconstructed historical methods and an exact replay of the published
verification decision. Both 1108.60 and 1104.80 ms cold observations remain valid.
This preflight collects no fresh acceptance data.

From the repository root, use a new external destination:

```sh
python3 experiments/minimum-card-contract/tools/diagnostic-preflight.py "$HOME/research/ha-lovelace-extended/diagnose-stage-one-performance-gaps/preflight"
```

That directory must not exist. From the experiment directory, run the output
boundary controls before lab work:

```sh
node --test tools/diagnostic-paths.test.mjs
export MCC_DIAGNOSTICS="$HOME/research/ha-lovelace-extended/diagnose-stage-one-performance-gaps"
```

New diagnostic drivers use `diagnostic-common.mjs` and `startRun()` before any
browser/authentication helper import. `MCC_DIAGNOSTICS` must name an existing
external directory; each driver requires a unique run name. The checkout, both
historical campaigns, aliases into those locations and existing run names are
rejected before browser/authentication activity. A 1 GiB reserve applies before
run allocation and each observation/report write. Lab acquisition and runtime
also require continuous external storage guarding; this output check alone does
not guard image extraction or trace/snapshot streaming. Keep raw traces and
private state out of the checkout. The published manifest contains only sanitized
identities, approval provenance and historical outcomes.

The [initial readiness pilot](performance-diagnostics/readiness-pilot-incomplete.json)
retains the ten completed observations preceding the empty-dashboard timeout.
The [corrected protocol](performance-diagnostics/protocol.md) describes the
property-based label fix, the 24-load calibration and the separate
[120-load campaign](performance-diagnostics/readiness.json). The [diagnosis](performance-diagnostics/diagnosis.md)
links both method calibrations and the optimization handoff.

After disposable lab preflight and with the storage guard active, use unique
external run names from this directory:

```sh
node tools/diagnostic-loads.mjs readiness-new-pilot pilot
node tools/diagnostic-loads.mjs readiness-new-series campaign
python3 tools/diagnostic-readiness-report.py "$MCC_DIAGNOSTICS/readiness-new-series" "$MCC_DIAGNOSTICS/readiness-new-report.json"
node tools/diagnostic-retention.mjs retention-new-pilot
node tools/diagnostic-presentation.mjs presentation-new-pilot
```

Review the readiness pilot before the series. Presentation and retention pilots
are separate headless synthetic controls. Their published outcome withholds both
metrics because calibration failed. Run the eligible subset separately after
verifying the served hashes and six fixture controls:

```sh
export MCC_RESEARCH="$MCC_DIAGNOSTICS"
node tools/followup-preflight.mjs verification-new-controls
node tools/diagnostic-verification.mjs capture verification-new "$MCC_RESEARCH/verification-new-controls/preflight.json"
node tools/diagnostic-verification.mjs evaluate "$MCC_DIAGNOSTICS/verification-new/samples.json" "$MCC_DIAGNOSTICS/verification-new-freeze/freeze.json" "$MCC_DIAGNOSTICS/verification-new-result.json"
```

The [verification policy](performance-diagnostics/verification-policy.json) pins
the historical plan and diagnostic lab record. For offline replay, pass the
published [samples](performance-diagnostics/verification-samples.json) and
[freeze](performance-diagnostics/verification-freeze.json) to the evaluator
with a new output path. Compare output to the [decision](performance-diagnostics/verification-result.json).
The [ten-row matrix](performance-diagnostics/budget-matrix.json) identifies
dated agreement and the remaining metric prerequisites. The
[editor approval](performance-diagnostics/editor-approval.json) covers the
experimental card's first open and same-document reopen separately. Run the
approval-backed editor driver in a dedicated serial session after lab preflight.

```sh
node tools/diagnostic-editor.mjs editor-new
node tools/diagnostic-editor-evaluate.mjs performance-diagnostics/editor-approval.json "$MCC_DIAGNOSTICS/editor-new/plan.json" "$MCC_DIAGNOSTICS/editor-new/samples.json" "$MCC_DIAGNOSTICS/editor-new-result.json"
```

## Stage 1 negative-comparator benchmark

The [benchmark review](performance-benchmark/review.md) publishes the completed investigation under [benchmark-stage-one-performance](../../openspec/changes/benchmark-stage-one-performance/research.md). The two selected third-party compositions failed ordinary keyboard eligibility; the maintainer authorized the planned native/experimental/empty branch. [Selection and exclusions](performance-benchmark/selection.md) distinguish these failures from unsupported editors and preserve the native three-Tile/extra-body-display mismatch. No third-party ranking or keyboard exception is claimed.

The [frozen protocol](performance-benchmark/protocol.json), [calibration](performance-benchmark/calibration.json), [public scalar samples](performance-benchmark/discovery.json), [summary](performance-benchmark/summary.json) and [environment](performance-benchmark/environment.json) cover 120 cold/warm loads, 72 update-only windows, 90 matched interaction/no-update windows and 36 editor/setup observations. All scheduled rows were valid; all 900 local activations targeted the intended synthetic entity without duplicate dispatch or timeout. Editor context contains 24 real-editor observations and 12 empty edit-mode setup controls, separate from the [persistence pilot](performance-benchmark/editor-pilot.json) and historical acceptance. Local queueing/intent and DOM readiness do not establish displayed feedback, HA transport or physical response.

The [budget packet](performance-benchmark/budget-review.json) leaves CPU, transfer and update limits awaiting representative objectives and explicit numerical agreement. Discovery remains non-acceptance data; no new verification.json is published. Its conditional branch records the exact agreement, frozen-manifest and fresh-data requirements for future verification. Historical cold failures, unsupported retained-byte attribution/final presentation and final-MVP repeats remain independent gates; stage 1 stays open and the production stack remains undecided.

Reconstruct external scripts from [reproduction.md](performance-benchmark/reproduction.md); use its unique-directory, hash, isolation and 1 GiB reserve guards rather than mixing campaigns. The report and summary reproduce from public inputs without private HA access. The [final cleanup](performance-benchmark/cleanup.json) records the stopped sandbox, closed listener, absent PID/socket, unchanged source/tool hashes and removal of owned image layers/rootfs. Initial failure/pause evidence, raw observations and historical research remain preserved; a future run needs guarded reacquisition and a fresh preflight.

## Fresh stage 1 verification — 2026-11-20 (UTC)

The [fresh stage 1 verification](./performance-verification/review.md) summarizes 120 valid load observations, 72 valid update-only windows and 90 valid interaction windows, with 900 recorded local intents and 0 dispatch timeouts. CPU, transfer and update-script observations exceed the unchanged adopted ceilings. Two separately frozen cold series retain 240 observations and five new ten-group experimental failures, while same-helper R1 cold observations add four more; the transparent driver observer locates prolonged locator waits without resolving visibility-versus-polling causality or either historical failure. Retention is **pass** under its documented calibrated boundary; presentation is **unsupported**. The [ten-row reconciliation](./performance-verification/review.md#stage-decision) keeps stage 1 open. Candidate/final-MVP performance, reference-device/accessibility, real integration/transport, physical and everyday gates remain separate; no production stack is adopted.

The [evidence summary](performance-verification/review.md#evidence-and-reproduction) records versions, protected hashes, method boundaries and outcomes. Detailed captures, scripts and replay inputs are retained only in local research evidence. The first unadmitted retention capture remains explicit; structural marker detection was positively calibrated before the adopted discovery. Raw heaps/traces remain external and private.

Operational duration: R1 alone has 42 minutes of update-only windows and 60 minutes of matched interaction/control windows, executed serially. Acquisition, calibration, loads, cold diagnosis, conditional GC series and final regression add time. This is an observation schedule, not a product latency target. Keep the one-second 1 GiB storage guard and projected heap-write checks; only campaign-owned image allocation or explicitly authorized regenerable caches may be removed.
