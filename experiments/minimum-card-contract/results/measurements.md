# Descriptive experiment measurements

Environment: [execution manifest](../execution.json). Individual load samples: [CSV](load-samples.csv); all sanitized observations and metadata: [JSON](measurements.json). Raw resource lists stay outside the checkout. Values below are median [minimum–maximum], not tail percentiles. Acceptance remains separate.

## Load captures (ten trials per row)

| Variant | Groups | Cache | Usable ms | Script ms | Task ms | Total transfer bytes | Experiment transfer bytes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| native | 1 | cold | 655.10 [632.30–700.00] | 133.76 [130.25–139.19] | 569.40 [557.80–597.88] | 1364934.00 [1364934.00–1364934.00] | 0.00 [0.00–0.00] |
| native | 1 | warm | 451.55 [448.70–464.70] | 44.05 [43.00–45.42] | 339.69 [335.44–347.63] | 3931.00 [3931.00–3931.00] | 0.00 [0.00–0.00] |
| experimental | 1 | cold | 653.10 [640.70–696.20] | 134.30 [130.74–139.33] | 562.98 [553.11–575.83] | 1368049.00 [1368049.00–1368049.00] | 12510.00 [12510.00–12510.00] |
| experimental | 1 | warm | 457.10 [446.80–470.80] | 44.21 [42.33–45.62] | 335.58 [328.36–343.75] | 3931.00 [3931.00–3931.00] | 0.00 [0.00–0.00] |
| native | 10 | cold | 681.35 [677.30–709.30] | 146.27 [143.26–152.21] | 619.79 [610.89–648.06] | 1364934.00 [1364934.00–1364934.00] | 0.00 [0.00–0.00] |
| native | 10 | warm | 462.10 [459.60–465.30] | 55.96 [55.12–59.42] | 396.04 [386.37–405.07] | 3931.00 [3931.00–3931.00] | 0.00 [0.00–0.00] |
| experimental | 10 | cold | 663.00 [643.70–1108.60] | 139.56 [135.77–142.92] | 572.88 [561.61–594.60] | 1368049.00 [1368049.00–1377625.00] | 12510.00 [12510.00–12510.00] |
| experimental | 10 | warm | 447.80 [444.90–464.40] | 48.20 [46.11–50.80] | 350.27 [338.47–360.01] | 3931.00 [3931.00–3931.00] | 0.00 [0.00–0.00] |

## Local input observations (thirty per row)

These measure pointerdown to intercepted local intent and the next observed frame opportunity. They do not establish final paint or device response.

| Variant | Groups | Intent ms | Frame opportunity ms |
| --- | --- | --- | --- |
| native | 1 | 0.80 [0.70–2.20] | 11.70 [9.70–11.90] |
| experimental | 1 | 0.20 [0.10–0.70] | 12.70 [11.70–13.00] |
| native | 10 | 1.20 [1.00–2.50] | 9.90 [9.00–10.20] |
| experimental | 10 | 0.20 [0.10–0.50] | 12.50 [9.60–12.80] |

## Actual synthetic updates

| Variant | Groups | Entity | Hz | Updates | Elapsed ms | Late ticks | Script ms | Task ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| native | 1 | relevant | 1 | 60 | 60007.46 | 0 | 9.32 | 199.14 |
| native | 1 | relevant | 20 | 200 | 10026.47 | 0 | 20.73 | 374.72 |
| native | 1 | unrelated | 1 | 60 | 60008.52 | 0 | 6.37 | 43.84 |
| native | 1 | unrelated | 20 | 200 | 10008.72 | 0 | 17.67 | 123.09 |
| experimental | 1 | relevant | 1 | 60 | 60007.60 | 0 | 9.25 | 163.53 |
| experimental | 1 | relevant | 20 | 200 | 10027.00 | 0 | 19.42 | 311.32 |
| experimental | 1 | unrelated | 1 | 60 | 60005.30 | 0 | 6.16 | 39.57 |
| experimental | 1 | unrelated | 20 | 200 | 10009.21 | 0 | 17.69 | 119.25 |
| native | 10 | relevant | 1 | 60 | 60020.06 | 0 | 9.21 | 390.13 |
| native | 10 | relevant | 20 | 200 | 10022.18 | 0 | 20.04 | 917.66 |
| native | 10 | unrelated | 1 | 60 | 60019.15 | 0 | 6.37 | 99.18 |
| native | 10 | unrelated | 20 | 200 | 10019.30 | 0 | 17.45 | 248.13 |
| experimental | 10 | relevant | 1 | 60 | 60019.72 | 0 | 8.92 | 232.81 |
| experimental | 10 | relevant | 20 | 200 | 10022.47 | 0 | 20.48 | 545.67 |
| experimental | 10 | unrelated | 1 | 60 | 60019.98 | 0 | 6.90 | 61.99 |
| experimental | 10 | unrelated | 20 | 200 | 10003.14 | 0 | 17.46 | 140.23 |

## Fifty lifecycle cycles

Each removal/reinsertion settles for 100 ms. The same nodes remain intentionally referenced; GC/heap/renderer-global listener and DOM figures are diagnostic. Experimental owned counts returned to zero after every removal.

| Variant | Groups | Initial heap bytes | Final heap bytes | Initial/final renderer listeners | Final single dispatch |
| --- | --- | --- | --- | --- | --- |
| native | 1 | 13929748 | 13889184 | 497 / 497 | 1 |
| experimental | 1 | 13728148 | 13755596 | 402 / 402 | 1 |
| native | 10 | 14593964 | 14546320 | 1415 / 1415 | 1 |
| experimental | 10 | 13919572 | 13965616 | 447 / 447 | 1 |

## Incremental editor observations

First-open includes dashboard edit-mode setup; reopen stays in the same document. These single observations have no statistical acceptance meaning.

| Variant | Groups | Phase | Ready ms | Script ms | Transfer bytes |
| --- | --- | --- | --- | --- | --- |
| native | 1 | first_open | 413.70 | 61.03 | 304795 |
| native | 1 | same_document_reopen | 195.20 | 30.16 | 0 |
| experimental | 1 | first_open | 250.30 | 40.14 | 103353 |
| experimental | 1 | same_document_reopen | 150.60 | 19.76 | 0 |
| native | 10 | first_open | 693.10 | 109.77 | 304795 |
| native | 10 | same_document_reopen | 461.70 | 74.90 | 0 |
| experimental | 10 | first_open | 323.20 | 49.85 | 103353 |
| experimental | 10 | same_document_reopen | 241.20 | 34.36 | 0 |

## Limits

- Single Linux x86_64 headless Chromium environment; no physical/Safari/assistive-technology validation
- Three native Tiles/group have different layout/editor and an additional body-target state; descriptive comparison only
- Driver interception remains active; execution includes shared HA/driver cost
- Input-to-frame includes automation observation delay; not compositor paint, HA action transport or physical response
- Retained same-node/forced-GC memory readings are diagnostic; no robust tail estimates from ten trials
- Invalid initial counter-delta collection is excluded; raw captures retained separately
