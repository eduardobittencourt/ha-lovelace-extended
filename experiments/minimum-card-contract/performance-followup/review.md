# Stage 1 performance verification review

Date: 2026-11-19. **Performance acceptance is withheld.** The explicitly approved cold-readiness maximum failed; three other approved metric rows passed and six required rows remain pending. Completing this investigation does not close roadmap stage 1.

## Approval and reproducibility

The maintainer explicitly approved the four limits and maximum/no-replacement rule on 2026-11-19: [approval provenance](approval.json). [Frozen plan](verification-plan.json), [reconstructed environment](verification-environment.json), [fresh samples](verification-samples.json) and [evaluator output](verification-review.json) identify the exact approval, source hashes and schedule. The full 120-load/180-input series is complete and provenance checks passed. All empty/native/experimental one/ten-group controls are retained. No slow valid observation was replaced and no capture was excluded.

## Per-metric decisions

| Required metric | Decision | Maximum / limit, or pending reason |
| --- | --- | --- |
| runtime-decoded-bytes | **pass** | 11610.00 / 16384 bytes; maximum over eligible workloads |
| cold-ready | **fail** | 1104.80 / 1000 ms; maximum over eligible workloads |
| warm-ready | **pass** | 474.70 / 750 ms; maximum over eligible workloads |
| local-intent | **pass** | 2.30 / 16.7 ms; maximum over eligible workloads |
| load-cpu | **pending** | Explicit dated approval absent |
| load-transfer | **pending** | Explicit dated approval absent |
| editor | **pending** | Explicit dated approval absent |
| updates | **pending** | Explicit dated approval absent |
| retention | **pending** | Required method unsupported; no pass inferred |
| presentation | **pending** | Required method unsupported; no pass inferred |

Asset size applies only to experimental runtime cold responses, excluding the editor. Readiness/intent decisions cover native and experimental one/ten-group workloads; empty controls are descriptive and do not receive numerical acceptance. Per-workload values and all individual observations remain in the linked JSON files.

## Cold failure and historical evidence

Experimental ten-group cold trial 1 measured **1104.80 ms**, above the approved **1000 ms** ceiling. The sample remains valid and is retained. The earlier **1108.60 ms** observation remains in [historical discovery](../results/measurements.md) and [follow-up discovery](discovery.md); neither the new samples nor partial approval erases it. No threshold was changed and no second attempt was selected to replace the failing sample.

The frozen UI boundary remains driver-observed cards/CSS/fonts plus two frame opportunities after navigation, with shared HA/driver work. This is broadly the same readiness method as discovery, but the reconstructed HA/authentication state, run order and new verification entry point differ and have their own frozen identities. One repeated exceedance in this bounded series supports withholding acceptance under the approved maximum rule; it does not establish a tail distribution or identify the cause. Resource/counter observations are published, but no isolated card/HA/driver cause is inferred from totals.

## Required pending evidence

Whole-dashboard CPU/transfer, editor and update metrics have discovery observations but no agreed numerical budgets. Retained-object diagnostics do not establish isolated retained-byte acceptance; DOM-content/rAF observations do not establish final presentation. These required rows remain pending, with no waiver. Local intent is browser pointerdown to intercepted synthetic intent; readiness is local UI observation. HA action transport, physical movement/arrival, Safari/reference-device behavior and full-desk everyday use were not measured.

Stage 0 definition stays complete. **Stage 1 remains open with a failed approved budget and six pending required rows.** Stage 2 full-desk/device/accessibility/integration/physical/everyday checks remain pending. This bounded investigation changes no subject source, public API, production stack or compatibility promise. A separately scoped follow-up should investigate the retained cold exceedances and remaining method/budget gaps before proposing an optimization; the subject must not be changed merely to force this campaign to pass.

## Reproduce evaluation

From the experiment directory, the offline evaluator can replay the published fresh samples without private HA access:

```sh
node tools/followup-evaluate.mjs performance-followup/verification-plan.json performance-followup/verification-samples.json /path/to/a/new-review.json
node --test tools/followup-evaluate.test.mjs
```

Fresh collection requires the isolated reconstruction/preflight and the frozen identities in the plan. `followup-verify.mjs` refuses changed frozen sources and writes a unique external run, preserving all observations and any rejection reason. No discovery observation is relabeled verification.
