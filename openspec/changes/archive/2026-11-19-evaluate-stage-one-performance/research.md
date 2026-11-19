# Research

## Scope

Stage 1 / [D2](../../../../docs/discovery.md#d2-baselines-alternatives-and-technical-experiments): can the existing two-slot experiment meet justified, explicitly agreed performance budgets once measurement limitations are addressed? This is an investigation with bounded measurement tooling, not product implementation. The [proposal](proposal.md) fixes the scope. Planning inspection on 2026-11-19 ran no browser, HA instance, installation or new measurement.

## Evidence

All repository sources below were reread on 2026-11-19. Reuse is appropriate for defining gaps and preserving historical results; applicability to a new capture must be reverified.

| ID | Observed fact | Source, date, and version | Method | Limitations | Supported decision |
| --- | --- | --- | --- | --- | --- |
| E1 | Stage 0 definition is complete; stage 1 performance is open, with an explicit handoff | [Roadmap](../../../../docs/roadmap.md), [handoff](../2026-11-19-synthesize-desk-mvp-acceptance/research.md#stage-1-performance-handoff), 2026-11-19 | Read current gates and synthesis | No new acceptance evidence | Investigate performance separately from full desk delivery |
| E2 | Technical review withholds acceptance; four candidate limits are unapproved | [Budget review](../../../../experiments/minimum-card-contract/results/budget-review.json), 2026-11-19 | Read decision, candidates and unbudgeted metrics | Implementation-agent review is not maintainer agreement | Obtain explicit metric/workload/limit agreement before acceptance |
| E3 | Published discovery retains the 1108.60 ms ten-group experimental cold sample; editor and heap series are limited | [Measurement report](../../../../experiments/minimum-card-contract/results/measurements.md), [manifest](../../../../experiments/minimum-card-contract/execution.json), Core 2026.11.1 / frontend 20261028.5 / Chromium 159.0.8154.6 | Inspect individual-range report, conditions and stated limitations | Ten loads per row do not establish robust tails; shared HA/driver cost and three native Tiles per group prevent isolated per-card rankings | Preserve outlier; distinguish application totals from attribution; repeat editor/lifecycle observations |
| E4 | Fresh verification reports candidate checks but explicitly leaves acceptance pending | [Verification driver](../../../../experiments/minimum-card-contract/tools/verification.mjs), [results](../../../../experiments/minimum-card-contract/results/fresh-verification.json), 2026-11-19 | Read driver and historical acceptance decision | Driver asserts the old negative decision and embeds candidate constants; it is not an approved-budget evaluator | Add a campaign-specific evaluator rather than relabeling old verification as approval |
| E5 | Loading uses post-navigation CDP totals; local input ends at intercepted intent; next-frame observation starts after driver polling; lifecycle retains the same nodes; editor has one observation per phase/workload | [Measurement driver](../../../../experiments/minimum-card-contract/tools/measure.mjs), [workloads](../../../../experiments/minimum-card-contract/tools/workloads.mjs), [common helpers](../../../../experiments/minimum-card-contract/tools/common.mjs), inspected 2026-11-19 | Read capture, diagnostics, readiness and result paths | Source inspection establishes method, not validity of an unexecuted replacement | Validate timing boundaries; release references for retention tests; repeat editor trials |
| E6 | Existing contract already requires justified budgets and leaves incomplete evidence open | [Full experimental spec](../../../specs/independent-element-bindings/spec.md), consolidated 2026-11-19 | Read all requirements and scenarios | Experimental behavior only | No delta spec is needed for new measurement evidence/tooling |
| E7 | Reproduction is documented, but prior lab/image/private state were removed | [Experiment guide](../../../../experiments/minimum-card-contract/README.md); external evidence index at `~/research/ha-lovelace-extended/demonstrate-minimum-card-contract/README.md`, inspected 2026-11-19 | Cross-check maintained setup with local cleanup record | Local index is supporting operational context only; current capacity/isolation are unverified | Require a new preflight and reconstruction; do not assume a running lab |

## Hypotheses

| Hypothesis | Required evidence | Confirmation or refutation criterion |
| --- | --- | --- |
| H1: Matched control workloads and repeated captures can bound incremental costs without claiming exact isolation | Empty-dashboard/driver controls, one/ten-group native/experimental captures and variability | Supported only where matched contrasts exceed measurement uncertainty and have a defensible attribution scope; otherwise retain shared totals and pending attribution |
| H2: Released-instance lifecycle series can expose retention hidden by same-node reuse | Repeated fresh-instance creation/removal, released harness references, checkpoints and control series | Reproducible retained-growth/retainer evidence supports or refutes a bounded retention claim; one forced-GC endpoint cannot confirm absence of leaks |
| H3: Browser-side milestones can improve local rendering evidence | A validated start/end definition, trace or browser observation correlated with the actual changed content, and instrumentation-overhead checks | Accept only the milestone actually observed; if final presentation cannot be established, that metric remains pending |
| H4: Agreed requirements and validated measurements may support stage 1 acceptance without changing the card | Recorded approval plus a frozen verification protocol and complete passing evidence | Refuted for the campaign by any failed required budget; unsupported/missing evidence leaves acceptance pending, not passed |

## Open Questions

| Question | Blocking or deferrable | Rationale / dependent decision | Next action |
| --- | --- | --- | --- |
| Which usability outcomes, numerical limits and aggregation/exceedance rules does the maintainer agree to? | Blocking acceptance and freezing verification thresholds; not method discovery | Existing candidates do not constitute agreement | Present a source-backed matrix during apply, record the response and unresolved rows; do not infer approval from applying this change |
| Can shared CPU/editor/update costs be attributed sufficiently? | Blocking acceptance of those metrics and a cost-dependent stack decision | Three native Tiles and shared driver work make naive subtraction misleading | R2: validate matched controls and report residual uncertainty |
| What retention and rendering methods are supportable in the pinned browser? | Blocking claims for those metrics | E5's observations are narrower than heap-leak/final-paint claims | R2: check versioned primary documentation and bounded pilots before selecting methods |
| Can the pinned lab be reconstructed safely within current resources? | Blocking runtime captures | E7 records cleanup, not available runtime capacity | R1: preflight storage, tools, isolation and artifact availability; stop affected execution if unavailable |
| Are card changes, another renderer, Safari or physical validation necessary? | Deferrable to a separately scoped change or stage 2 | They exceed this unchanged-subject measurement investigation | Record consequences without adopting a stack or expanding compatibility claims |

## Research and Experiments

### R1. Recover conditions and draft requirements

Reverify E1–E7, including the historical outlier and full unchanged experimental spec. Check current capacity and isolation before reconstructing only the documented disposable environment. Pin identities and source hashes, capture contention and verify fixture-only action interception. Do not install host tools or silently substitute another version. Completion is a reproducible preflight or an explicit blocker. Draft every metric row with user-visible outcome, scope, candidate rationale, units, proposed statistic, repeat plan and required agreement; unresolved rows stay proposed.

### R2. Validate methods and collect discovery evidence

Use the existing one/ten-group fixtures and pinned viewport/theme/locale. Add focused tooling for matched empty/driver controls, repeated load/editor/update observations, released-instance lifecycle series and candidate rendering milestones. Consult versioned primary browser/tool documentation before adopting a new API or trace interpretation; record links/revisions and unsupported cases here. Keep pilots separate from acceptance evidence, quantify instrumentation/control variation and retain failed attempts with reasons. No method changes the card, recorder or editor under `src/`.

Completion means each metric has a validated observable boundary, appropriate controls and reproducible collection method, or a specific unsupported/blocking result. A plausible method without supporting evidence is not enough. The [design](design.md) defines the campaign boundaries and proposed repetition counts; they are collection defaults, not performance budgets.

### R3. Review budgets and run fresh verification

After R2 discovery, present the matrix with proposed bounds and evidence. Record explicit maintainer agreement, including required coverage and aggregation/exceedance handling, before freezing thresholds and collecting acceptance observations. Approval can cover supported rows while leaving others pending; it cannot silently waive the roadmap's required evidence. Keep the original 1108.60 ms result visible and explain comparability; do not discard it or relax a threshold to obtain a pass.

Freeze source/method/environment identities and the verification schedule. Collect new observations distinct from discovery using only supported agreed rows; report unagreed rows as pending without evaluating them as passes. Any method, subject or threshold change invalidates affected acceptance comparisons until the revised protocol is reviewed and fresh evidence is collected. Completion is a reproducible per-row decision, including negative/pending results, or a documented agreement/access blocker with dependent tasks still open.

### R4. Publish conclusions and gate ownership

Publish sanitized manifest, approval provenance, samples and review under `experiments/minimum-card-contract/performance-followup/`; preserve previous results and archives. Raw traces/logs and auxiliary scripts go to `~/research/ha-lovelace-extended/evaluate-stage-one-performance/`, with secrets excluded. Update current docs only from observed outcomes. Stage 1 closes only when all required metrics are justified, explicitly agreed and met with adequate evidence; unsupported attribution/heap/presentation leaves it open. Stage 2 must still repeat relevant performance checks on the full desk and validate device/integration/physical/everyday behavior.

### Side effects and stopping conditions

Only a later apply request starts R1–R4. It may restore the locked experiment dependencies and isolated image/runtime, add measurement tooling, operate the disposable fixture dashboard and write research/results/docs. Stop on inadequate isolation/storage, missing artifacts, unverified action interception or incompatible methods. Keep unrelated services/data untouched. At completion stop the disposable runtime, verify relay/process cleanup, remove only campaign-owned generated credentials/state and disposable image files created by this run, and preserve evidence and pre-existing managed caches. The campaign does not access production HA or send physical commands.

## Outcome

**Status: investigation and verification complete; overall performance acceptance withheld.** The maintainer explicitly approved four numerical rows and the maximum/no-replacement rule. Fresh verification passed runtime size, warm readiness and local intent, but failed experimental ten-group cold readiness at 1104.80 ms against 1000 ms. Six other required rows remain pending. All observations and the historical 1108.60 ms result are retained. Stage 0 definition stays complete; stage 1 stays open and stage 2 desk/device/physical/everyday acceptance remains pending. Final cleanup and repository checks are recorded below.

## R1 execution — source reconciliation (2026-11-19)

E1–E7 were rechecked against the current roadmap, stage 0 handoff, complete
experimental main spec, original execution manifest, measurement report,
budget review, fresh verification, measurement/workload/common helper source
and external cleanup index. Their limitations still apply. The nine requirements
and nineteen scenarios remain unchanged; no runtime, public API or new supported
platform is adopted. Runtime identity and interception must be reverified after
reconstruction, rather than inherited from historical passes.

### Metric/workload gap matrix

Every row remains **pending acceptance**. Proposed historical limits are neither
approved requirements nor defaults for a new evaluator. Reference workloads are
one/ten experimental cards versus three/thirty native Tiles at 1280 × 900,
light/en, with synthetic fixtures and interception active (E3/E5).

| Required metric | Source | Existing boundary/evidence | Candidate / current gap |
| --- | --- | --- | --- |
| Runtime asset size (decoded bytes) | E2/E3/E5 | 11610 decoded bytes, cold runtime only; editor separate | Proposed 16384-byte ceiling; approval pending, reverify served hashes and bodies |
| Cold dashboard readiness (ms) | E2/E3/E5 | Navigation to driver-observed readiness including CSS/fonts/two frame opportunities | Proposed 1000 ms; retain **1108.60 ms** ten-group experimental cold observation; repeat with HA-only control; no tail claim |
| Warm dashboard readiness (ms) | E2/E3/E5 | Same-context reload with cached resources | Proposed 750 ms; agreement and repeated cache/counter validation pending |
| Local input intent (ms) | E2/E3/E5 | Browser pointerdown to intercepted synthetic intent; thirty observations/workload | Proposed 16.7 ms nominal-frame processing allocation; no transport/display/physical meaning; approval pending |
| Shared/incremental load CPU (script/task ms) | E3/E5 | Post-navigation CDP totals; cross-document subtraction invalid | No justified numerical candidate; empty-dashboard contrasts and variation pending; never universal per-card isolation |
| Shared/incremental load transfer (bytes) | E3/E5 | Navigation plus resource timing totals; cold/warm separate | No justified numerical candidate; matched shell/cache controls pending; unequal native composition retained |
| Editor first-open/reopen readiness, CPU, transfer (ms/bytes) | E3/E5 | One observation per phase/workload, includes dashboard edit setup | No justified numerical candidate; ten independent pairs proposed, explicit editor boundary/control pending |
| Relevant/unrelated update CPU (script/task ms/window) | E3/E5 | One window/class/rate/workload: 60 s at 1 Hz, 10 s at 20 Hz | No justified numerical candidate; at least three windows and matched driver/shell variation pending; zero unrelated slot mutation remains correctness |
| Released-instance retention (bytes/nodes/checkpoint) | E2/E3/E5/E6 | Same nodes retained by harness; forced-GC global endpoints only | No justified numerical candidate; three fresh-instance series, fifty cycles with ten-cycle checkpoints and retainer/control evidence pending |
| Rendering/content milestone (ms) | E2/E3/E5/E6 | Frame opportunity after automation polling, not final paint | No justified numerical candidate; versioned method/clock/content and overhead validation pending; final presentation unsupported by existing observations |

Historical fresh candidate checks (E4) do not remove the outlier or approve any
row. E6 requires reproducibility, justified budgets and passing measurements;
missing attribution/retention/presentation evidence therefore keeps stage 1
open. Stage 0 definition remains complete; full desk, reference device,
accessibility, integration and physical/everyday validation remain stage 2 work.

### Draft usability and budget matrix — task 1.3

The [campaign matrix](../../../../experiments/minimum-card-contract/performance-followup/budget-review.json)
records all ten required metric families with units, user-visible outcome,
boundary, rationale, proposed statistic/limits, coverage, uncertainty and
repeat/exceedance policy. Only the four historical candidate limits have numbers;
other limits explicitly await method/control evidence and maintainer requirements.
Every approval is proposed with a null maintainer response. The intended statistic
for historical candidates is the maximum of the scheduled observations, with no
replacement of slow valid trials; this policy itself is also proposed. Discovery
counts follow the design and cannot establish robust tails. No acceptance
collection or numerical approval has occurred. Applying the change and permitting
HA restarts do not agree any numerical row.

### Reconstructed preflight — task 1.2

The [new manifest](../../../../experiments/minimum-card-contract/performance-followup/execution.json)
records observed identities, source hashes, served-byte equality, synthetic
fixture states and native/experimental one/ten-group interception/cache checks.
Python 3.14.9, Node 24.22.0, Bubblewrap 0.12.0, Playwright 1.65.1 and existing
headless revision 1255 were reused without installing/upgrading host tools.
The pinned digest was verified by the acquisition tool and namespace identity
returned Core 2026.11.1 / frontend 20261028.5. No old lab/state existed.

Initial free space was 4982603776 bytes; after image restoration it was
1425674240 bytes. Acquisition retained a 1 GiB reserve; an external runtime
monitor stops the sandbox if that reserve is crossed. No unrelated files or
managed browser caches were removed. Raw captures belong to this campaign's
external research area. Isolation uses all namespaces, dropped capabilities,
read-only rootfs, no external network/devices/production mounts and a loopback
relay. Missing multicast interface and offline resolver/analytics/marketplace
warnings remain explicit environment limitations. Actual recorder and workload
preflight checks passed; activating a native control recorded intent while its
helper stayed off. This establishes the bounded capture environment only.

## R2 execution — campaign controls (task 2.1)

`followup-common.mjs` requires the campaign root, exclusively creates a unique
run directory and only then imports the unchanged historical helpers. Reusing
`control-preflight-v2` was checked and rejected with EEXIST before browser/auth
imports. The [control preflight](../../../../experiments/minimum-card-contract/performance-followup/control-preflight.json)
passed all six empty/native/experimental one/ten-group combinations. Empty/native
loads have no custom resource, experimental loads do. Every activation recorded
one allowlisted intent with helper state still off and native interception enabled.
The empty driver's visible button is added after readiness, so it does not alter
the empty load baseline. It bounds local recorder/driver work and is not a native
HA action-equivalent control or an empty editor. Historical helpers/subjects
remain untouched; no historical output path is used by these new entry points.
Reproduction commands and control limitations are in the experiment guide.

Rejected preflight `control-preflight` produced no timing samples: the injected
button was behind HA's full-screen host. Its reason is preserved externally;
`control-preflight-v2` positions the button explicitly for normal pointer input,
without forced activation. This was a driver correction, not a subject change.

### Repeated timing discovery — task 2.2

[Sanitized timing samples and method validation](../../../../experiments/minimum-card-contract/performance-followup/timing-discovery.json)
contain 120 loads, 180 local inputs, 120 editor/setup observations and 72 update
windows. Every workload has ten cold/warm pairs, thirty inputs, ten independent
editor pairs and three windows per update class/rate. All 72 measured pages
observed the expected final synthetic state; there were zero late driver ticks.
Warm resource transfer was zero, apart from the separately counted document.
No slow valid capture was replaced. No shared helper or subject source changed.

The separate page-event calibration observed ScriptDuration 129.427 → 630.900 ms
for an intentional 500 ms click handler, then 43.004 ms after a reload with a new
performance time origin. This validates same-document differences and the need
for post-navigation totals. An earlier inspector Runtime.evaluate loop failed
the assumed calibration threshold: inspector work is not interchangeable with
page-script work in this metric. That failed diagnostic is preserved; it does
not invalidate or remove the completed load/editor/update observations. CDP
script/task durations are not OS CPU accounting or exact isolated card cost.

Empty-dashboard and driver controls retain the same shell/authentication and
interception. Full ranges and rotated block contrasts expose variation without
universal per-card ranking; native additionally renders a body-target state.
Editor setup has a control, but no empty card-editor equivalent exists. The
readiness boundary remains CSS/fonts/card completion plus two frame opportunities
observed through automation, not presentation. Input ends at local intercepted
intent. No transport/physical latency is measured. Numerical acceptance remains
pending, including the historical 1108.60 ms cold observation.

Two update pilots were stopped and retained before the complete run: the first
needed token renewal outside long timed workloads; the second needed explicit
browser-observed final-state validation for each window. Exact source identities
and reconstruction patches are in [driver history](../../../../experiments/minimum-card-contract/performance-followup/method-history.json).
Only update-mode code changed; load/editor/input branches are identical.

### Released-instance diagnostics — task 2.3

[Lifecycle observations](../../../../experiments/minimum-card-contract/performance-followup/lifecycle-discovery.json)
record eighteen independent fifty-cycle series (three per variant/count),
fresh objects, released strong harness references and six checkpoints per series.
Every positive control detected a deliberately retained object and observed its
collection after release. All 108 checkpoints observed zero surviving fresh
weak targets; experimental owned resources were zero after every removal.
No surviving target was available for a retainer-path inspection. This is
bounded reachability evidence using calibrated weak-reference diagnostics,
not a universal leak guarantee or a retained-byte acceptance result.

The harness retains WeakRef bookkeeping arrays, which grow within each series;
renderer-global heap/DOM readings include them, HA and browser internals. Empty
div controls match harness work, not native component internals. Isolated retained
bytes therefore remain unsupported and unbudgeted. Same-node reconnect and
single-dispatch correctness are rechecked separately in task 4.2. Primary method
sources are the versioned V8 protocol and V8 weak-reference guidance linked in
the observations, with actual runtime protocol/browser/V8 identity recorded.
Forced GC and weak references are diagnostic interventions; they do not prescribe
production cleanup timing or predict collection on other devices/versions.

Task 2.3 also reran the unchanged `runtime-check.mjs`: all binding/state/action/
selective-update checks passed, including fifty same-node reconnect cycles with
one dispatch after reconnection and no accumulated owned resources. This is
separate from the fresh-instance GC diagnostics above; neither substitutes for
the other. No source under `src/` was changed.

### Content milestones — task 2.4

[Rendering diagnostics](../../../../experiments/minimum-card-contract/performance-followup/rendering-discovery.json)
contain 240 controlled changes: thirty with/without-observer pairs per native/
experimental one/ten-group workload, alternating instrumentation order. Each
change used a new synthetic numeric state in a browser-side hass snapshot. All
240 matched the actual first display value, scoped to the experimental value
span or native state-display, excluding style/script text. No backend service,
transport or physical event supplied the start time.

The instrumented boundary starts on the browser performance clock before
observer setup/setter execution and ends at the matching MutationObserver
callback; a following rAF records a frame opportunity before driver polling.
The reference without an observer checks the same setter-duration boundary.
Sub-ms/zero measurements expose clock quantization; these comparisons do not
attribute all observer setup/callback overhead or prove zero instrumentation cost.
The versioned HTML source and actual browser identity are linked in the data.

**Final presentation remains unsupported:** no validated content-to-compositor/
display presentation mapping was established. DOM content and rAF opportunities
are not relabeled final paint. Retention-byte isolation and final presentation
therefore remain required pending evidence, regardless of other rows' results.

### Discovery publication and actual schedule — task 2.5

The [discovery report](../../../../experiments/minimum-card-contract/performance-followup/discovery.md)
and its linked sanitized samples publish the completed schedule, controls,
source identities, full ranges, signed block contrasts and all rejected pilots.
All collection defaults were executed: 120 loads, 180 inputs, 120 editor/setup
observations, 72 update windows, eighteen fifty-cycle lifecycle series and 240
rendering observations. The separate counter probe validates page-event timing
and navigation resets. No completed slow valid observation was discarded.

All ten required metric rows now have an observed boundary or an explicit
unsupported result in the draft matrix. Whole-dashboard durations/transfer,
readiness, local intent and real editor/update observations are supported in
this environment; exact per-card/retained-byte attribution and final presentation
are not established. No required row was waived. Reproduction commands, unique
output handling, actual repetitions and limitations are in the experiment guide.
Agreement and fresh acceptance remain pending; unsupported rows cannot pass.

## Current gate reconciliation and focused checks

Task 4.1 updated README, roadmap, discovery, decisions and the experiment guide
from the published observations: stage 0 remains complete, stage 1 remains open,
and stage 2 full-desk/device/accessibility/integration/physical/everyday work stays
pending. No subject optimization or production stack was adopted. New method/
requirement work must preserve the required rows rather than silently waive them.

Task 4.2 [focused correctness evidence](../../../../experiments/minimum-card-contract/performance-followup/correctness.json)
reran the unchanged recorder/runtime, ten real visual editor round trips over
nine fields, and integrated persisted-card/live-hass checks. Pointer, keyboard
and emulated touch dispatched exactly once to the configured targets; reload
replayed zero intents; actual unrelated updates caused zero slot mutations and
a relevant change affected only its dependent slot; target helper states stayed
off. Same-node reconnect/resource checks and the new fresh-instance diagnostics
passed separately. All subject and historical helper hashes match preflight;
original results, manifest, archived research and main specs are unchanged.
The historical 96-case layout matrix was preserved, not rerun or generalized.
New drivers passed fixture/control/output-protection checks and complete runtime
collection. No unsupported platform compatibility was introduced.

### Disposable lifecycle cleanup — task 4.3

[Cleanup evidence](../../../../experiments/minimum-card-contract/performance-followup/cleanup.json)
records successful foreground sandbox/guard completion, closed port 18123,
absent PID/bridge socket and removal only of the campaign-owned rootfs, compressed
layers and generated private HA state/credentials. Raw evidence and scripts were
retained; existing managed browser caches and unrelated data were untouched.
No storage stop was triggered. The monitor's minimum free space was 1408258048
bytes, above the 1 GiB reserve. Cleanup reclaimed 3555323904 bytes, leaving
4963454976 bytes free at the observed checkpoint. No production HA was accessed.

### Agreement gate — task 3.1 remains open

The maintainer was presented 16384 decoded bytes, 1000/750 ms cold/warm readiness
and 16.7 ms local intent, maximum per one/ten-group workload over ten loads/cache
and thirty activations, without replacing slow valid observations. The request
explicitly retains 1108.60 ms and leaves other budgets/unsupported evidence open.
No explicit dated numerical agreement is recorded, so no matrix was frozen, no
approval-aware evaluator implemented and no fresh acceptance observations
collected. Task 3.1 and dependent tasks 3.2–3.4 are not completed by this pending
report. Stage 1 remains open. Continue from the actual approval response; do not
infer agreement from implementation/restart authorization or elapsed time.

The final output-root review removed an unnecessary local-directory restriction:
new drivers accept an explicit external root while rejecting the historical
research area and checkout before browser/auth actions. An alternate campaign
root was accepted in a no-browser helper check; the historical root was rejected
before any directory write. Exclusive run-name refusal remains intact. The
publisher now honors MCC_RESEARCH with the same default/aggregation logic.
These validation-only portability changes do not alter captured methods; exact
capture helper/publisher versions are preserved by hashes and reconstruction
patches in the published method history. No runtime or historical file changed.

### Repository verification — task 4.4

[Validation evidence](../../../../experiments/minimum-card-contract/performance-followup/validation.json)
records the complete tracked diff/new-file review, local link/anchor and
new-file newline/whitespace checks, JSON parsing and secret-pattern inspection.
All five published source-history entries reconstructed to their recorded hashes.
A separate external report reproduction produced byte-identical discovery.json
without overwriting repository evidence. Alternate/protected output-root checks
passed without browser/auth side effects. Source syntax and `git diff --check`
passed; strict change validation accepted zero deltas under skip_specs, and
research-first schema validation returned valid true with no issues.

These repository/correctness checks do not approve performance. Tasks 3.1–3.4
remain open for explicit agreement, frozen approval-aware evaluation and fresh
verification/review. All required unsupported/unapproved metrics remain pending;
there is no stage 1 exit or production/physical acceptance. Raw evidence remains
in the campaign research area, and the disposable runtime/image/private state
have been cleaned. No publication, archive or release was performed.

## R3 execution — explicit partial approval (2026-11-19)

The maintainer explicitly approved the four presented limits and proposed rule
in the project conversation. [Approval provenance](../../../../experiments/minimum-card-contract/performance-followup/approval.json)
records 16384 decoded runtime bytes, 1000/750 ms cold/warm readiness and 16.7 ms
local intent, maximum per one/ten-group workload over ten loads/cache and thirty
activations, with no replacement of slow valid observations. The historical
1108.60 ms observation is retained. Six other required rows remain unapproved;
unsupported retained-byte/presentation evidence is not waived and stage 1 is not
approved. This response supersedes the earlier absent-agreement pause for these
four rows only. Task 3.1's requested partial agreement is now recorded; later
rows may be evaluated only where both approved and method-supported.

The lab is reconstructed for a separate fresh verification campaign. Final
current-document reconciliation, cleanup and repository checks are reopened and
will be repeated after verification; the earlier cleanup/check records remain
historical discovery evidence.

### Frozen approval-aware verification — task 3.2

The [frozen verification plan](../../../../experiments/minimum-card-contract/performance-followup/verification-plan.json)
contains the explicit four-row agreement, all ten required rows, approved
maximums/selectors, source hashes, observed environment identity, controlled
order/cache/readiness and a separate 120-load/180-input schedule. The fresh
[preflight](../../../../experiments/minimum-card-contract/performance-followup/verification-environment.json)
reverified the pinned image/Core/frontend, identical served subject bytes and
six fixture/interception controls. No required pending row was waived.

`followup-evaluate.mjs` reads approved maxima only, never historical candidate
defaults. Eight focused evaluator checks passed: complete pass, one slow
sample failing a maximum, missing approval, unsupported required metric,
missing maximum with an old proposal present, changed approved threshold,
missing/duplicate trials, and changed sources/plan/nonfinite data. A failing
initial test exposed that invalid empty-control values must also block a pass;
the completeness validation now covers the entire frozen control/sample set.
These are evaluator tests, not acceptance captures or altered performance limits.

### Fresh verification collection — task 3.3

[Fresh sanitized observations](../../../../experiments/minimum-card-contract/performance-followup/verification-samples.json)
contain all 120 loads and 180 local inputs in the frozen schedule, collected
serially after explicit approval and plan/environment/source freeze. These are
separate from discovery. Completeness, unique trial coverage and source/plan
provenance passed. There were no exclusions or replacements. The evaluator
recorded a failed cold-readiness maximum; slow valid observations remain intact.
Unapproved/unsupported required rows are pending, never implicitly passed.

### Approval-linked per-metric review — task 3.4

The [verification review](../../../../experiments/minimum-card-contract/performance-followup/review.md)
links explicit approval, the frozen plan/environment/source identities, all fresh
samples and evaluator decisions. Runtime decoded size, warm readiness and local
intent passed their approved maximums. Experimental ten-group cold trial 1
measured 1104.80 ms and failed the 1000 ms ceiling. The sample is valid and was
not replaced; historical 1108.60 ms remains visible. The comparable UI boundary
and changed reconstruction/driver identities are stated without attributing a
cause from shared totals or claiming robust tails.

CPU/transfer/editor/update numerical budgets and retained-byte/final-presentation
acceptance remain pending. UI intent/readiness are distinct from unmeasured HA
transport and physical arrival. Stage 1 is not accepted: one approved required
budget failed and six required rows are pending. All investigation tasks can be
completed with this actual negative review; no subject optimization or threshold
change is authorized by the failure. Investigating the cold exceedances and
remaining evidence/budget gaps requires a separately bounded follow-up.

Current README/roadmap/discovery/decisions/experiment guidance now links the
approval-backed negative verification review. Earlier absent-agreement/discovery
sections above are historical checkpoints superseded by R3. Four agreements do
not waive the six remaining rows or close stage 1. A separately scoped follow-up
must investigate the cold exceedances and remaining budgets/methods before any
subject optimization or production decision.

### Verification correctness and final lifecycle

[Fresh focused correctness](../../../../experiments/minimum-card-contract/performance-followup/verification-correctness.json)
rechecked recorder allowlisting/interception, six workload controls and the
unchanged runtime's binding/state/input/selective-update/reconnect guarantees
after verification. All passed separately from timing. Subject/historical source
hashes remain unchanged; the new verification driver checked frozen identities
before capture and every local activation retained unchanged off target states.

[Verification cleanup](../../../../experiments/minimum-card-contract/performance-followup/verification-cleanup.json)
confirms the foreground sandbox and storage guard completed, port 18123 closed,
PID/socket disappeared and only this reconstruction's image/private state was
removed. Raw evidence remains; pre-existing managed caches/unrelated data were
not removed. No storage stop occurred. Earlier discovery cleanup evidence is
preserved separately. Final free space and monitored reserve are in the record.

### Final verification delivery checks — task 4.4

[Final validation](../../../../experiments/minimum-card-contract/performance-followup/verification-validation.json)
records strict OpenSpec/schema success, all eight evaluator tests passing,
JS/Python syntax, diff/new-file whitespace, local links/anchors, JSON parsing and
sanitization checks. Frozen source and plan hashes match the published captures;
all five discovery source-history reconstructions still match their hashes.
Replaying evaluation from public plan/samples without HA produced byte-identical
verification-review.json. Original subject/helpers/results/manifest, archives and
main specs remain unchanged. Final runtime/private-state/port cleanup passed.

All sixteen investigation tasks are complete. This means the scoped research,
approval-backed verification and negative/pending review are delivered; it does
not accept performance or waive any required row. Cold readiness failed, six
required rows remain pending and stage 1 stays open. Review this delivery before
any separately requested archive or follow-up optimization/method work.

### Archive and sync assessment — 2026-11-19

Archived using research-first with all 16 tracked tasks and all required planning
artifacts complete. Sync was explicitly requested and assessed from the CLI's
spec artifact paths: there are no delta specs and metadata retains skip_specs.
No main specification was created or changed. This research/measurement delivery
preserves the cold-readiness failure, three passing approved rows and six required
pending rows; stage 1 remains open. Relative links were rebased and the current
matrix/experiment guide now point to this archive. Frozen verification inputs,
source identities, samples, approval and prior archives remain unchanged.

Post-move checks passed: all six archives have complete tasks; the unchanged main
experimental spec and research-first schema validate; 157 local links/anchors,
new-file whitespace/JSON/sanitization and five source-history reconstructions
passed. Frozen verification source hashes and main-spec hashes are unchanged.
The active change list is empty. Sync had no deltas to apply.
