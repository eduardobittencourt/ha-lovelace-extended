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
