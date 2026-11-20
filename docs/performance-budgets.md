# Benchmark-derived performance budgets

## Standing maintainer decision — 2026-11-19

The maintainer explicitly delegates selection of relevant benchmark-derived performance limits to the agent. Do not ask the maintainer to invent numerical targets, choose workload/device/network/responsiveness allowances, or separately approve the resulting numbers. Use the available comparable benchmark evidence to select the reference, scenario, metric and statistic, document the selection, and treat the selected values as authoritative project acceptance limits until the maintainer changes them. Do not reopen this decision in later conversations or require a new subjective objective before proceeding.

This instruction supersedes the earlier requirement to obtain separate numerical agreement or representative user objectives in the stage 1 benchmark packet and completed investigation artifacts. Historical observations and their original review dispositions remain intact. A selected limit is a project policy; passing it still requires measurements.

## Current reference and selection

Use the native three-Tile composition measured by the preceding local benchmark. Its scenario and subsequent verification outcomes are summarized in the [verification report](../experiments/minimum-card-contract/performance-verification/review.md#method). The full discovery/replay data remain local research evidence by maintainer instruction. Button Card and Mushroom failed the selected keyboard eligibility pilot and have no eligible quantitative comparison in this campaign. Native Tile is the measured reference; do not invent third-party measurements or ask the maintainer for substitute numbers.

For each matching cell, adopt the native observed maximum as the ceiling, with no added percentage or discretionary allowance. This is the maintainer-authorized comparator policy: the experimental dashboard must stay within the measured native envelope for the same workload. It replaces the former prohibition on adopting comparator maxima as limits. Keep one/ten groups, cold/warm loads, relevant/unrelated updates and sustained/stress rates separate. Empty controls remain measurement context, and the experimental subject does not set its own ceiling.

## Adopted load limits

All entries are upper bounds. Task and script are separate CDP counters, not additive CPU budgets. Transfer is actual whole-dashboard transferred bytes, including shared HA resources. The tables preserve the exact source JSON floating-point values used for evaluation, including representation tails. The source limit packet is retained locally (SHA-256: `7c60205ccce20861e429d1826af822cd1ff602565b6a27f8fa7c814660e27765`); it is not a repository capture artifact.

| Groups | Cache | Task maximum (ms) | Script maximum (ms) | Transfer maximum (bytes) |
| --- | --- | ---: | ---: | ---: |
| 1 | cold | 607.146 | 159.482 | 1374510 |
| 1 | warm | 372.15700000000004 | 47.328 | 3931 |
| 10 | cold | 634.193 | 150.79500000000002 | 1364934 |
| 10 | warm | 414.956 | 58.681 | 3931 |

## Adopted update-only limits

Counters cover the complete window, not each update. Sustained 1 Hz uses 60-second windows; exploratory 20 Hz stress uses 10-second windows. Stress is an additional test condition, not a claim about actual desk traffic. Interaction-added CPU must not be evaluated against update-only ceilings.

| Groups | Update class | Rate (Hz) | Window (s) | Task maximum (ms) | Script maximum (ms) |
| --- | --- | ---: | ---: | ---: | ---: |
| 1 | relevant | 1 | 60 | 182.836 | 9.537999999999991 |
| 1 | relevant | 20 | 10 | 381.621 | 21.319000000000006 |
| 1 | unrelated | 1 | 60 | 50.54000000000003 | 6.7170000000000005 |
| 1 | unrelated | 20 | 10 | 139.26400000000007 | 17.67100000000002 |
| 10 | relevant | 1 | 60 | 368.3519999999999 | 10.978999999999989 |
| 10 | relevant | 20 | 10 | 926.5989999999999 | 20.51 |
| 10 | unrelated | 1 | 60 | 97.80600000000005 | 6.516999999999995 |
| 10 | unrelated | 20 | 10 | 256.9870000000001 | 17.622 |

## Evaluation and next action

The current CPU, transfer and update limits are adopted under the standing delegation above; numerical approval is no longer pending. Freeze a fresh verification manifest and collect new observations under the published schedule and matching environment. Use at least ten cold/warm pairs per applicable variant/count and three update windows per applicable class/rate/count, preserving the matched controls and interaction observations. Any valid observation above its ceiling fails that metric/cell; missing or invalid required coverage remains pending. Retain every valid slow observation. Discovery samples remain discovery and cannot be relabeled as fresh verification.

The measured scope is the pinned Core 2026.11.1 / frontend 20261028.5 / Linux HeadlessChrome 159.0.8154.6 lab with one or ten composition groups. Whole-dashboard counters include shared HA/driver work, and native includes an extra body display. These are adopted comparative ceilings for this scenario, not isolated per-card costs or measured Safari/physical-device results. For a different scenario, the agent selects the relevant benchmark-backed limits under the same delegation and records their source and applicability without asking the maintainer for arbitrary targets. A missing measurement calls for investigation, not an invented measurement or a request for a subjective number.

Existing cold-readiness, runtime-size, warm-readiness, local-intent and editor limits retain their recorded scope. Historical cold failures remain failures; the completed follow-up below records the calibrated retained-byte outcome and unsupported presentation method. Full candidate/final-MVP, reference-device, integration, physical and everyday validation remain separate gates. This documentation decision neither executes a campaign nor changes the product or Home Assistant.

## Verification and method follow-up — 2026-11-20 (UTC)

The [fresh verification](../experiments/minimum-card-contract/performance-verification/review.md#fresh-ceiling-evaluation) failed load CPU, load transfer and update-only script cells against the exact adopted limits above. Complete valid coverage does not turn an exceedance into a pass; the original values remain authoritative. The [cold diagnosis](../experiments/minimum-card-contract/performance-verification/review.md#cold-readiness) retains both historical failures and nine additional fresh exceedances across R1/R2 against 1000 ms.

The corrected and controlled [ownership method](../experiments/minimum-card-contract/performance-verification/review.md#retention), including structural instance detection, admitted separate native/empty discovery. The exact [native-derived retained-byte limits](../experiments/minimum-card-contract/performance-verification/review.md#retention) below are selected under the standing delegation, without margin or another numerical approval. Scope is the same method, collector, pinned lab, group count and forced-GC checkpoint; no global heap subtraction or production-memory promise.

| Groups | Completed cycles | Maximum positive residual owned bytes |
| --- | ---: | ---: |
| 1 | 0 | 0 |
| 1 | 10 | 0 |
| 1 | 20 | 0 |
| 1 | 30 | 0 |
| 1 | 40 | 0 |
| 1 | 50 | 0 |
| 10 | 0 | 0 |
| 10 | 10 | 0 |
| 10 | 20 | 0 |
| 10 | 30 | 0 |
| 10 | 40 | 0 |
| 10 | 50 | 0 |

The [independent retention verification](../experiments/minimum-card-contract/performance-verification/review.md#retention) records fresh signed deltas, removed owners, retainer paths and listener evidence. Discovery is not acceptance.

Unsupported content-to-successful-presentation method in the pinned probe. One source-led target-local tracing correction restored screenshots and passed delayed/no-change/clock controls. Content carries source_id/frame_sequence, while the observed FramePresented and Display::FrameDisplayed records expose no matching identifier or ID/flow metadata. The pinned screenshot source describes expected_display_time as an estimate; it is not successful presentation feedback. No timestamp-proximity, screenshot, damage, local-intent or two-frame substitute is accepted. No unsupported presentation number is invented. All remaining stage and final-MVP/device/physical gates stay explicit in the [ten-row decision](../experiments/minimum-card-contract/performance-verification/review.md#stage-decision).
