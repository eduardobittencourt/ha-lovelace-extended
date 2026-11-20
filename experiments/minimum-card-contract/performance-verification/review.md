# Stage 1 verification summary

Research completed on 2026-11-20 UTC for the unchanged two-slot prototype. This delivered measurements and method findings, not a product feature, optimization, production card or release. The complete capture/tooling package is retained as local research evidence; it is excluded from this checkout.

## Stage decision

Stage 1 remains open. No required metric was waived. Candidate/final-MVP performance, reference-device/accessibility, real integration/transport, physical and everyday acceptance remain separate. No production renderer or supported-version policy was adopted.

| Required metric | Result | Basis |
| --- | --- | --- |
| runtime-decoded-bytes | pass | Dated unchanged-subject pass carried |
| cold-ready | fail | Historical failures unresolved; nine fresh experimental exceedances |
| warm-ready | pass | Dated unchanged-subject pass carried |
| local-intent | pass | Dated original-endpoint pass carried |
| load-cpu | fail | Fresh observations exceed adopted ceilings |
| load-transfer | fail | Fresh observations exceed adopted ceilings |
| editor | pass | Dated editor-performance pass; fresh functional persistence regression passed |
| updates | fail | Fresh update-only script observations exceed adopted ceilings |
| retention | pass | Calibrated graph boundary and independent verification passed |
| presentation | unsupported | Missing content-to-successful-feedback identity join |

The dated carried passes are recorded in the [earlier verification](../performance-diagnostics/verification-result.json) and [editor result](../performance-diagnostics/editor-result.json).

## Method

Pinned lab: Core 2026.11.1, frontend 20261028.5, HeadlessChrome 159.0.8154.6 / V8 15.9.128.1, Playwright 1.65.1, Node 24.22.0 and Python 3.14.9. HA ran in the disposable all-namespace sandbox with a read-only image, dropped capabilities and loopback-only relay. Services were intercepted; synthetic action targets stayed off.

R1 collected 120 load observations, 72 update-only windows and 90 matched interaction/control windows. All scheduled rows were valid; 900 local intents were recorded with no dispatch timeout. Update and interaction windows alone total 102 minutes. Costs include shared HA/driver work; native uses three Tiles including an extra body display. These are not isolated card costs or phone/display/transport measurements.

The [standing budget policy](../../../docs/performance-budgets.md) and [exact CPU/transfer/update limits](../../../docs/performance-budgets.md#adopted-load-limits) remain authoritative. No margin, averaging or favorable rerun replaced a valid exceedance. Missing coverage would remain pending.

## Fresh ceiling evaluation

Displayed numbers are rounded to six decimal places; exact CPU/transfer/update values remain authoritative in the linked budget policy. Values below summarize the frozen ceilings and observed experimental maxima. Load cells have ten valid samples; update cells have three. Bytes are actual transfer bytes; CPU values are milliseconds.

| Mode / cell | Metric | Ceiling | Observed maximum | Result |
| --- | --- | ---: | ---: | --- |
| loads / 1 / cold | taskMs | 607.146 | 604.565 | pass |
| loads / 1 / cold | scriptMs | 159.482 | 150.442 | pass |
| loads / 1 / cold | transferBytes | 1374510 | 1368049 | pass |
| loads / 1 / warm | taskMs | 372.157 | 373.001 | fail |
| loads / 1 / warm | scriptMs | 47.328 | 52.327 | fail |
| loads / 1 / warm | transferBytes | 3931 | 3931 | pass |
| loads / 10 / cold | taskMs | 634.193 | 646.867 | fail |
| loads / 10 / cold | scriptMs | 150.795 | 153.775 | fail |
| loads / 10 / cold | transferBytes | 1364934 | 1368049 | fail |
| loads / 10 / warm | taskMs | 414.956 | 359.218 | pass |
| loads / 10 / warm | scriptMs | 58.681 | 50.597 | pass |
| loads / 10 / warm | transferBytes | 3931 | 3931 | pass |
| updates / 1 / relevant / 1 | taskMs | 182.836 | 163.417 | pass |
| updates / 1 / relevant / 1 | scriptMs | 9.538 | 9.525 | pass |
| updates / 1 / relevant / 20 | taskMs | 381.621 | 342.636 | pass |
| updates / 1 / relevant / 20 | scriptMs | 21.319 | 21.373 | fail |
| updates / 1 / unrelated / 1 | taskMs | 50.54 | 44.245 | pass |
| updates / 1 / unrelated / 1 | scriptMs | 6.717 | 6.43 | pass |
| updates / 1 / unrelated / 20 | taskMs | 139.264 | 126.146 | pass |
| updates / 1 / unrelated / 20 | scriptMs | 17.671 | 17.464 | pass |
| updates / 10 / relevant / 1 | taskMs | 368.352 | 232.886 | pass |
| updates / 10 / relevant / 1 | scriptMs | 10.979 | 10.222 | pass |
| updates / 10 / relevant / 20 | taskMs | 926.599 | 538.193 | pass |
| updates / 10 / relevant / 20 | scriptMs | 20.51 | 20.099 | pass |
| updates / 10 / unrelated / 1 | taskMs | 97.806 | 61.103 | pass |
| updates / 10 / unrelated / 1 | scriptMs | 6.517 | 6.816 | fail |
| updates / 10 / unrelated / 20 | taskMs | 256.987 | 142.622 | pass |
| updates / 10 / unrelated / 20 | scriptMs | 17.622 | 17.174 | pass |

## Cold readiness

The 1000 ms ceiling is unchanged. Historical failures remain 1108.60 and 1104.80 ms. Four R1 cold observations and five observations across two separately frozen 120-observation diagnostic series exceeded that ceiling. All nine fresh experimental exceedances were in the ten-group cell; the maximum was 1183.30 ms.

One transparent driver-observer revision located prolonged awaits in locator.first().waitFor. Phase mount/frame completion alone does not prove that its visibility predicate had passed. Visibility versus polling causality and a validated remedy remain unresolved. A later pass cannot erase these failures. The next scope is a controlled study distinguishing visibility/layout readiness from locator retry behavior, preserving the endpoint.

## Retention

The original analyzer and initial candidate failed conditional WeakMap ownership. One evidence-led correction recognized V8's auto-indexed edge labels and required both key and table reachability. All 13 retained/released/shared/debugger/WeakMap/native-DOM/listener/closure controls then passed.

A separate positive control identified five actual marked native/prototype/pure-JS instances while mounted and retained after removal, then zero after release. Marker values were concatenated strings; structural property identification was required. Fifteen earlier unadmitted checkpoints remain preserved locally as invalid and supplied no limits.

Native/empty discovery completed 72 forced-GC checkpoints across three fifty-cycle series per count and variant. The native maximum positive residual above baseline was **0 bytes** for both one and ten groups at cycles **0, 10, 20, 30, 40 and 50**. Those twelve exact zero-byte ceilings were frozen under the standing delegation before independent verification; no slack was invented.

Fresh native/experimental/empty verification completed 108 checkpoints and 900 mount/remove cycles. All variants met the frozen ceilings; no marked removed owner survived. The 300 prototype cycle checks reported zero owned listeners/subscriptions/scheduled work after removal. Retainer paths and listener evidence were retained locally. This is the calibrated exclusive production-root graph boundary, not a global-heap subtraction or universal memory/leak claim.

Frozen retention-budget SHA-256: `42b68b9233e4e416344608676f40f4a41eaaf26d27937ee1ed7939a75d64eeb0`.

## Presentation

One source-led correction moved tracing from the browser session to the page target, enabling content screenshots. Delayed/no-change, clock and five observer-on/off controls passed. Screenshots carried source_id/frame_sequence; the observed FramePresented and Display::FrameDisplayed records exposed no matching identifier or flow metadata.

The identity join to successful feedback remains unsupported. expected_display_time is an estimate, not successful presentation. Screenshot capture, timestamp proximity, damage, local intent and two animation frames were not substituted. Native latency discovery, limit selection and fresh verification were not executed because this prerequisite failed.

## Regression and cleanup

Seven post-measurement checks passed, including ten independent visual save/reload/reopen edits, six fixture cells, selective updates and lifecycle behavior. All 50 protected files and served assets retained their initial hashes. Layout coverage remains dated evidence for the unchanged subject; no new device or physical campaign was run.

The owned lab, listener, PID and socket were released. Only the acquired image rootfs/cache and dispensable replay copy were removed; historical research and all raw attempts were preserved. Available disk space stayed above the 1 GiB reserve, reaching a minimum of 1.51 GiB and approximately 4.2 GiB after image cleanup.

## Evidence and reproduction

By maintainer request, detailed JSON, snapshots/traces, capture scripts, calculators and the full replay package are **local evidence, not repository content**. The project research directory is `~/research/ha-lovelace-extended/verify-stage-one-performance/`; the preserved delivery is `delivery-evidence/performance-verification/`. This location is optional local organization, not a contributor prerequisite.

Before relocation, the full sanitized package reproduced verification, retention evaluation, stage reconciliation and this delivery's detailed review byte for byte without private HA or raw-heap access. Ten evaluator tests, source/limit/coverage checks, links, whitespace, strict OpenSpec validation and schema validation passed. The retained local package includes the calculators and exact inputs. This compact checkout summary is intentionally not a complete replay dataset; independent numerical replay needs that bundle or a newly scoped rerun of the pinned protocol.

Protected source identities:

| File | SHA-256 |
| --- | --- |
| src/card.js | `9cd77264c7724379aaae54a701c250fd72be426be4e644e4ea8982cc9041c13e` |
| src/card.css | `943575ca0c764135007778833e8afc7039f8564ea6eb60be44b571da2129567f` |
| src/recorder.js | `8d1ef5b10d4e75a7077f089625c8f57576db691385497816a854219e37d14e49` |
| package-lock.json | `0f4d19f9be04593affdc1e3654fde7bf7566d6139f57c9af9822193e28b6b022` |

Primary method references: [pinned V8 snapshot generator](https://github.com/v8/v8/blob/15.9.128.1/src/profiler/heap-snapshot-generator.cc), [pinned Chromium screenshot handler](https://github.com/chromium/chromium/blob/98a2592026af8d673b9fa83b626ac68bdf4ae78a/content/browser/devtools/protocol/tracing_handler.cc), and [pinned presentation path](https://github.com/chromium/chromium/blob/98a2592026af8d673b9fa83b626ac68bdf4ae78a/components/viz/service/display/display.cc). No upstream implementation is bundled here.
