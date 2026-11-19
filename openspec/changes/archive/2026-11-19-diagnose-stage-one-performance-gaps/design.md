# Design

## Context

See [proposal](proposal.md) and [research E1–E8](research.md). The fixed subject and historical controls already support some performance boundaries; the missing deliverable is attribution, stronger method calibration and justified requirements. This design defines the investigation protocol. Pending causal/method outcomes do not select a production architecture.

## Goals / Non-Goals

**Goals:** preserve reproducibility while separating observed readiness from constituent costs; make unsupported evidence visible; produce a useful optimization handoff seeking sub-1000 ms readiness with headroom where demonstrated.

**Non-Goals:** changing the benchmark endpoint to pass, treating shared-control subtraction as exact ownership, changing runtime/editor behavior, or inferring physical display/device response from headless diagnostics.

## Decisions

### 1. Keep historical evidence immutable and isolate the campaign

Add new diagnostic entry points under the experiment's `tools/` directory and publish new sanitized outputs under `performance-diagnostics/`. Do not repurpose frozen `performance-followup/` inputs or rewrite historical results. Use an explicit external campaign root before importing helpers that capture environment variables. Refuse existing run names and historical/checkout output roots before browser/auth actions. Record hashes for the subject, reused helpers, new tooling and lab identity.

Document new commands and their checks in the experiment guide when implemented. Prefer independent wrappers over shared-helper edits; if an existing helper must change, first scope the affected consumers and preserve reproducibility of historical source identities. No dependency installation is assumed by planning; during apply reuse the documented managed browser and isolated lab tooling.

Alternative: extend the previous frozen plan in place. Rejected because it would conflate discovery with verification and risk losing E1's negative result.

### 2. Diagnose the original boundary before choosing an optimization

E2/E3 justify investigating resource/style and card work alongside HA/driver costs, without deciding which dominates. R1 retains the original `ready` reference and cold-cache policy. Record browser milestones and driver timestamps with a validated clock relationship; distinguish serial, overlapping and unobserved intervals. Pair traced and untraced pilots to expose observer overhead. Diagnostic-only interception or marks must preserve fixture state/input semantics and cannot be used as acceptance captures.

Freeze the full R1 schedule after the pilot: ten cold/warm pairs for empty/native/experimental one/ten groups, rotating variants and running serially. Preserve viewport, theme/locale, native three-Tile composition and safety interception. Record host pressure and storage conditions without retrospectively excluding slow valid runs. Include first-load effects in reported maxima. If a run is incomplete, retain its reason and all observations rather than patching its missing trials into a purported complete campaign.

The report separates navigation/resource/HA readiness, card definition/mount, stylesheet/fonts, frame opportunities and driver observation only as far as evidence permits. It must state which intervals are shared and which can support a causal hypothesis. A targeted diagnostic perturbation may delay observation or controlled resources to validate attribution; it must be labeled and kept out of baseline/acceptance data. Do not alter `src/`, CSS, recorder or editor behavior.

Alternative: immediately inline styles, rewrite construction or subtract empty-dashboard time from the 1104.80 ms sample. Rejected: E3 identifies mechanisms, not measured bottlenecks, and shared subtraction does not establish a causal runtime cost.

### 3. Validate stronger methods with bounded pilots

For R2, investigate versioned HeapProfiler/snapshot capabilities, known retained/released object ownership and debugger roots before running lifecycle series. Report shallow/retained size conventions and shared-ownership limits. WeakRef collection, global heap deltas and zero owned listeners remain supporting evidence, not byte acceptance. A calibrated method can proceed to R2's repeated fifty-cycle schedule; otherwise deliver unsupported status with the exact missing capability.

For R3, investigate supported trace/frame events and clock mapping before selecting an endpoint. Associate a specific changed visible value with the candidate presented frame using deliberate content-delay and no-change controls. State whether evidence concerns rendering, compositor submission, frame presentation or physical display; do not silently replace the required endpoint with a weaker one. The pinned headless environment may be insufficient, which is an acceptable method finding and blocks that row.

Each method gets one bounded pilot and at most one targeted calibration revision. If still invalid, stop that branch, publish controls/rejections and recommend a separately scoped prerequisite. If valid, freeze the exact calibrated protocol before the R2/R3 full schedule. New method implementations must test false positives and control failure handling before full collection.

Alternative: repeat prior lifecycle/rendering captures in larger numbers. Rejected because more samples of E4/E5's weaker boundaries do not establish retained bytes or presentation.

### 4. Keep requirement agreement separate from diagnostic progress

Maintain all ten required metric rows. Carry forward the approved 16384 decoded runtime bytes, 1000/750 ms cold/warm readiness and 16.7 ms local intent, with maximum/no-replacement policy and original boundaries. E8 adds a direction to investigate better cold performance; it neither approves a specific lower limit nor changes the measurement method.

For CPU, transfer, editor and updates, reuse relevant published discovery observations and collect only specifically missing data. Each candidate needs its user-visible purpose, units, boundary, workload, statistic, count, rationale and uncertainty. Retention/presentation budgets additionally require R2/R3 calibration. Present numerical proposals for explicit dated agreement; do not set limits merely just above observed maxima. If proposing a tighter cold ceiling, show relevant workload ranges and measurement uncertainty and keep it proposed until agreed.

Fresh verification requires frozen approved rows, calibrated methods, source/environment hashes and a complete schedule; discovery samples cannot be relabeled verification. If only the existing four rows are eligible, use their original ten cold/warm pairs per variant/count and thirty local activations per workload; any new row's schedule must be specified and agreed before capture. Missing approval leaves dependent verification tasks open while independent research proceeds. Offline evaluation rejects missing approvals, incomplete/duplicate data, changed identities, unsupported rows and a single valid exceedance; no historical candidate fallback. Report each row and overall required-gate status separately.

Alternative: lower or raise a threshold during collection, use a median to hide a failed maximum, or infer numerical agreement from an apply request. Rejected because it changes E1's acceptance rules without agreement.

### 5. End with a decision-ready handoff

Rank potential interventions by measured phase, supporting evidence, uncertainty, likely scope and correctness risks. If no actionable card contribution is isolated, say so and identify whether the next prerequisite concerns HA, automation, measurement or another environment. Describe how a subsequent optimization would compare unchanged and changed subjects in a separately frozen campaign. Do not implement it in this change.

Preserve binding isolation, save/reload/reopen, single dispatch, selective updates, reconnect, layout and accessible-input guarantees as requirements for that handoff. New instrumentation gets focused checks and the unchanged subject gets relevant runtime/recorder/editor checks; old layout coverage is historical unless rerun. No broader Safari, device or assistive-technology coverage is inferred. Separate local UI timings from unmeasured HA transport and physical arrival.

## Risks / Trade-offs

- Tracing/snapshots change scheduling or retention → use separate calibrated pilots and uninstrumented controls; never mix diagnostic traces with acceptance samples.
- Shared HA and host variance prevents causal attribution → publish uncertainty and competing hypotheses; do not force a runtime recommendation.
- Presentation or retained-byte attribution remains unsupported → stop the invalid branch after its bounded revision and preserve the required pending row.
- Numerical agreement is unavailable → complete independent diagnostics, publish proposed budgets, and leave dependent verification tasks open.
- Extra collection consumes local storage → reuse the existing reserve/guard protocol, estimate trace/snapshot size at preflight, run serially and clean only campaign-owned disposable state.
- A new unchanged campaign passes 1000 ms → retain both historical failures; a later pass alone establishes neither an optimization nor reliable headroom.

## Migration Plan

No production migration. During apply, reconstruct the documented disposable lab, verify served hashes and fixtures, run pilots before full schedules, then stop the lab and remove only its generated private state/image artifacts. Keep raw evidence and managed caches in their designated areas. Verify closed port/process/socket and storage reserve. Publish sanitized findings and update affected stage documents; rollback of instrumentation removes only this campaign's additions and preserves all previous evidence. Publication, archive and any optimization remain separate workflow actions.
