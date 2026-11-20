# Design

## Context

See [proposal](proposal.md#why) for motivation and [research](research.md#evidence) for E1–E6. Existing load/update instrumentation supplies useful boundaries, but its variant list is fixed and it lacks interaction-under-load observations. This design governs an investigation; comparator selection and calibration are explicit research gates before dependent collection.

## Goals / Non-Goals

**Goals:** preserve the prototype as a fixed subject; compare equivalent cells with shared controls; connect CPU/transfer/update findings to bounded usability observations; produce auditable budget proposals and a truthful acceptance disposition.

**Non-Goals:** infer exact per-card CPU by subtraction, rank general frameworks, extrapolate desktop timings to Safari, or turn DOM/rAF timing into final presentation. No product migration or optimization belongs to the benchmark.

## Decisions

### 1. Select comparators through an eligibility gate

Use native HA, empty HA shell and the unchanged experiment in every matched block. R1 may add at most two third-party HA cards/library compositions. Record primary URLs, license/notice, immutable version, complete resource closure, two independent displays/actions plus body action, editor capabilities and all mismatches. Publish rejected candidates as well as selected ones. Prefer ready distributable resources; an artifact requiring a new build toolchain is excluded from this bounded campaign.

Eligibility is per metric, not a blanket equivalence claim. Native's extra body display remains a mismatch; empty is shell/driver context, never a card/editor equivalent. Editor evidence is contextual and must identify unsupported operations. Pilot a save/reload/reopen and independent binding edit where a real visual editor exists. Comparator features unsupported by the pinned HA version are excluded rather than upgrading HA to accommodate them. No eligible third party yields a limited/negative selection report, not an invented comparison.

Selection outcome (2026-11-19): both selected third-party compositions failed ordinary keyboard eligibility in the pinned pilot. The maintainer explicitly authorized the existing negative-comparator branch with native/experimental/empty only. Retain their failed attempts; exclude third-party runtime/editor collection and do not claim successful third-party performance comparison. This resolves the selection branch without changing the remaining calibration, matched schedule or acceptance requirements.

Alternative: use published framework benchmarks directly. Rejected as the primary method because different hardware, workloads and endpoints cannot establish these HA budgets (E1, E3).

### 2. Keep new adapters and acquisition outside the checkout

Use `~/research/ha-lovelace-extended/benchmark-stage-one-performance/` for raw evidence, exact downloaded artifacts, reference clones and investigation scripts. Serve approved artifacts locally in the disposable namespace with no external runtime network. Keep the prototype runtime/editor, existing tooling and dependency lock unchanged. External adapters may arrange configuration and intercept synthetic actions; they must not optimize comparator internals or bypass ordinary HA state delivery.

Publish sanitized manifests, original adapter source as reviewable fenced listings or reconstructable patches in a reproduction document, source hashes, upstream URLs and commands under `experiments/minimum-card-contract/performance-benchmark/`. Include all information required to recreate external scripts without private paths or credentials. If publication reuses upstream material, preserve its terms and update notices where applicable. A local raw path alone is insufficient provenance (E4, E5).

Alternative: add comparators to production dependency manifests. Rejected because there is no production stack and benchmark resources are disposable.

### 3. Freeze a serial schedule after pilot calibration

Proposed discovery schedule, to be recorded before collection:

- One and ten composition groups per eligible variant; fixed dashboard allocation, theme, locale, text scale and visible content. Use the existing pinned Linux/Chromium lab and record exact builds, CPU constraints, viewport, versions and host contention. Phone campaigns require separate scope.
- Ten independent cold/warm navigation pairs per variant/count. Clear browser cache for cold, use same-context reload for warm, and record observed cache/resource behavior. Measure whole-dashboard post-navigation task/script totals and actual transferred bytes; separately identify shared shell and custom assets.
- Three update-only windows per variant/count/relevant-or-unrelated/rate: 60 seconds at 1 Hz and 10 seconds at 20 Hz. Keep 20 Hz explicitly labeled exploratory stress, not agreed desk traffic. Confirm delivered counts, final states and lateness; retain failed/incomplete windows with reasons.
- Three matched interaction windows for every such update cell, plus three 60-second no-update interaction controls per variant/count. Schedule ten spaced pointer activations per window, with common intended offsets frozen in the manifest. Keep interaction-added work separate from update-only counters. Record input delivery, local intent, exact target, duplicate/body-action counts and any timeouts; empty uses a separately labeled driver-only control.
- Where real visual editing is available, run three first-open/reopen contextual pairs per variant/count, with a persistence check in the pilot. These small contextual samples do not replace or reapprove the existing editor acceptance row.
- Rotate variants by trial/repetition; run no browser campaigns concurrently. Never replace slow valid observations. Summarize count, median, range, maximum and missing/invalid reasons per cell. Signed control differences are descriptive, never exact isolated card costs.

Sample counts are an investigation bound, not performance targets or robust-tail guarantees. Publish pilot adjustments before collection. A change of subject, metric boundary or environment requires revising the protocol and invalidating incompatible comparisons, not silently merging runs.

Alternative: repeatedly run the existing fixed-variant driver. Rejected because it cannot answer comparator equivalence or interaction questions (E4).

### 4. Calibrate interaction separately from update accounting

Use browser-clock event timestamps, handler entry and intercepted dispatch where available; record the original local-intent boundary separately. Validate timestamp domains and a deliberate main-thread blocking positive control to expose pre-handler delay. Use matched observer/no-observer pilots to assess synchronous and asynchronous instrumentation costs. Report unsupported/quantized timing as such. Event dispatch and DOM-content observations do not prove displayed feedback; preserve the separate presentation gate.

Use the same HA state-update stream for all variants. Confirm active fixtures in the measured page, final data state, independent actions and unchanged synthetic target state after interception. Missing/late scheduled events cannot disappear from the report. Keyboard reachability, accessible names and ordinary activation are fixture eligibility checks; this is not a new accessibility or physical-touch acceptance campaign.

Alternative: use only pointerdown-handler-to-intent time or average CPU occupancy. Rejected because both can miss input queueing and visible stalls (E3, E4).

### 5. Separate discovery, agreement and verification

For CPU, retain whole-dashboard task/script duration by cold/warm and count. For transfer, retain cold/warm transferred bytes including the shell; any bandwidth-to-wait conversion must expose assumptions. For updates, keep relevant/unrelated and sustained/stress windows separate and pair occupancy findings with interaction observations.

Create one budget-review entry per target row with units, boundary, workload/device scope, statistic, rationale, proposed allowance or unresolved gap, missing/exceedance policy and approval provenance. A relative regression policy is supporting evidence; it cannot waive existing required numerical budgets or usability objectives. Do not choose an arbitrary percentage or adopt the slowest comparator as the ceiling.

Only explicit dated agreement unlocks fresh verification for the agreed cells. Freeze new manifest/source hashes and use at least the discovery schedule for the applicable quantitative cells, including the same controls and interaction workload if covered by the agreement. Any valid exceedance fails its cell; incomplete required coverage remains pending. Deferred agreement is a documented research outcome with verification left unexecuted. Historical approvals apply only within their recorded scope; cold, retention and presentation remain open (E1, E2, E6).

### 6. Publish evidence with bounded storage and cleanup

Before acquisition, estimate artifact/rootfs/capture capacity from current filesystem observations. Require enough space for the bounded plan plus a 1 GiB free-space reserve during execution; stop acquisition/capture before crossing the reserve. Use unique run directories and compact scalar logs by default, with traces only for planned calibration. Never delete unrelated caches or older evidence to make a run fit.

Publish `selection.md`, `protocol.json`, `calibration.json`, `discovery.json`, `review.md`, `budget-review.json`, `reproduction.md` and `cleanup.json` in the new evidence directory. Add `verification.json` only when collected under dated approval. Schemas can be simple documented JSON structures with source hashes, per-cell coverage and dispositions. No credentials, private HA storage or authenticated traces belong in these outputs. Update research and stage-status documents from actual results; preserve prior archives/results.

## Risks / Trade-offs

- Comparator mismatch -> publish feature/cell exclusions; do not compare unsupported editor or binding behavior as equivalent.
- Shared HA cost and host variance dominate -> retain paired shell/native controls, full ranges and contention metadata; avoid universal rankings.
- Instrumentation hides or creates delay -> calibrate positive/negative controls and paired overhead before collection; narrow unsupported conclusions.
- Low disk capacity interrupts collection -> preflight projected use, enforce the reserve, preserve partial evidence and stop safely.
- No justified limit or delayed maintainer agreement -> deliver explicit pending decisions and future verification requirements; never fabricate approval.
- External script storage harms reproducibility -> publish reconstructable sanitized source/patches and immutable upstream provenance alongside findings.

## Migration Plan

There is no product deployment. During apply, reconstruct only the isolated synthetic lab and add local comparator resources for the campaign. On success, failure or storage stop, stop the sandbox, verify the listener/process/socket cleanup, and preserve evidence. Remove only campaign-created temporary state/resources when their ownership is verified; retain reusable evidence and historical lab state. Record cleanup checks in `cleanup.json`. No production HA resource, integration, dashboard or device is changed.
