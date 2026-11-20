# Benchmark selection and starting disposition

## Starting record — 2026-11-19

Reconciled research E1–E6 with the [combined ten-row review](../performance-diagnostics/stage-review.json), [budget matrix](../performance-diagnostics/budget-matrix.json), [four-row approval](../performance-followup/approval.json), [editor approval](../performance-diagnostics/editor-approval.json) and [main contract](../../../openspec/specs/independent-element-bindings/spec.md). Earlier samples establish methods and history; they are not observations from this campaign.

| Metric | Existing agreement | Starting evidence | Campaign scope |
| --- | --- | --- | --- |
| runtime-decoded-bytes | approved | pass | Preserved; outside this investigation |
| cold-ready | approved | Latest pass; historical failures unresolved | Preserved; outside this investigation |
| warm-ready | approved | pass | Preserved; outside this investigation |
| local-intent | approved | pass | Preserved; outside this investigation |
| load-cpu | pending | pending | Target |
| load-transfer | pending | pending | Target |
| editor | approved | pass | Preserved; outside this investigation |
| updates | pending | pending | Target |
| retention | pending | pending | Preserved; outside this investigation |
| presentation | pending | pending | Preserved; outside this investigation |

Cold's valid 1108.60 and 1104.80 ms observations remain failures against the approved 1000 ms maximum. A later fresh pass did not erase them. Retained-byte attribution and final presentation remain unsupported in the pinned lab; no budget or waiver is introduced here. Runtime, warm readiness, local intent and editor retain their four bounded passes. Stage 1 remains open. CPU, transfer and updates have no numerical agreement. This investigation cannot establish reference-phone or final-MVP performance.

## Fixed subject

Current SHA-256 values match the previous [editor verification manifest](../performance-diagnostics/editor-plan.json). The external driver must preserve them throughout collection:

| Experiment-relative path | SHA-256 |
| --- | --- |
| `src/card.js` | `9cd77264c7724379aaae54a701c250fd72be426be4e644e4ea8982cc9041c13e` |
| `src/card.css` | `943575ca0c764135007778833e8afc7039f8564ea6eb60be44b571da2129567f` |
| `src/recorder.js` | `8d1ef5b10d4e75a7077f089625c8f57576db691385497816a854219e37d14e49` |
| `tools/editor.mjs` | `7d0174d6ade8060ab0f29f42ba35d801db405ac4558954f328a82977f1035ccc` |
| `package-lock.json` | `0f4d19f9be04593affdc1e3654fde7bf7566d6139f57c9af9822193e28b6b022` |

The source, stylesheet, recorder, editor and dependency lock are fixed experimental subjects, not adopted production APIs. Empty shell is driver/shared-work context. Native uses three Tiles (including an additional body display); it is not an exact pixel/feature equivalent. No cross-campaign ranking or subtraction as isolated per-card work is permitted.

## Upstream selection — 2026-11-19

Select the following two released bundles for isolated pilots, with no build toolchain or host upgrade. Selection is not runtime eligibility; all cells remain provisional until fixture and resource pilots pass.

### button-card v7.0.1

- Source revision: `dfa304f93ab73b41011b624960657c568672e9c9`; [source](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/src/), [license](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/LICENSE), [release artifact](https://github.com/custom-cards/button-card/releases/download/v7.0.1/button-card.js).
- Artifact: `button-card.js`, 162135 bytes, SHA-256 `5d6e9c6afca01e8014653fa56bb5d6aa9248d832c34fb944a7f2c36329bc22d1`. Tags/release downloads can be changed upstream; the hash is the identity check. Preserve downloaded licenses next to artifacts externally.
- MIT, copyright Alexandre Garcia. Source review: [`src/button-card.ts`](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/src/button-card.ts), [`src/handle-action.ts`](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/src/handle-action.ts), [`config/actions.md`](https://github.com/custom-cards/button-card/blob/dfa304f93ab73b41011b624960657c568672e9c9/docs/source/config/actions.md). State rendering uses ordinary hass delivery; action forwarding emits `hass-action` for HA dispatch. No real visual editor entry point was found in the inspected card class; editor comparison is excluded unless the pilot demonstrates one.
- Proposed composition: three cards per group, displaying A, B and the synthetic body target, with independently configured actions to A, B and body targets. Like native, it has an additional body display and three surfaces; it does not reproduce the prototype's inner/body nesting or footprint. Report composition costs per group, never per-element or exact visual equivalence. Independent binding edits belong to the individual card editors, not a composite editor.
- Resource closure: the released single JS bundle has no external ES module imports/dynamic chunk fetches in the static scan. Embedded libraries retain upstream terms. HA shared components, fonts, icons, translations and editor resources are part of the shared shell, not removed by subtraction. No CDN, extra resource, custom CSS or JavaScript templates are configured. Confirm actual membership and reject unexpected network requests in the pilot.
- Provisional cells: one/ten-group cold/warm load, relevant/unrelated updates and ordinary activation. Intercept synthetic service calls before send. Exclude cells on failed keyboard, single-dispatch, state-delivery or resource checks; never add synthetic keyboard handlers to repair a comparator.

### lovelace-mushroom v5.3.0

- Source revision: `68bc1ba6d3e480caedae28635bec24701c3a26e2`; [source](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/), [license](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/LICENSE), [release artifact](https://github.com/piitaya/lovelace-mushroom/releases/download/v5.3.0/mushroom.js).
- Artifact: `mushroom.js`, 679491 bytes, SHA-256 `d2faf441f449489e4997533db248c2061b845eb633011f46d9aa6e78111fa237`. Tags/release downloads can be changed upstream; the hash is the identity check. Preserve downloaded licenses next to artifacts externally.
- Apache-2.0. Source review: [`entity-card.ts`](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/cards/entity-card/entity-card.ts), [`entity-card-editor.ts`](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/cards/entity-card/entity-card-editor.ts), [`handle-actions.ts`](https://github.com/piitaya/lovelace-mushroom/blob/68bc1ba6d3e480caedae28635bec24701c3a26e2/src/ha/panels/lovelace/common/handle-actions.ts). The entity card uses ordinary hass delivery and exposes a real editor. Template cards were rejected for this composition because server template subscriptions add a different update path; use entity cards with independently specified service targets instead.
- Proposed composition: three cards per group, displaying A, B and the synthetic body target, with independently configured actions to A, B and body targets. Like native, it has an additional body display and three surfaces; it does not reproduce the prototype's inner/body nesting or footprint. Report composition costs per group, never per-element or exact visual equivalence. Independent binding edits belong to the individual card editors, not a composite editor.
- Resource closure: the released single JS bundle has no external ES module imports/dynamic chunk fetches in the static scan. Embedded libraries retain upstream terms. HA shared components, fonts, icons, translations and editor resources are part of the shared shell, not removed by subtraction. No CDN, extra resource, custom CSS or JavaScript templates are configured. Confirm actual membership and reject unexpected network requests in the pilot.
- Provisional cells: one/ten-group cold/warm load, relevant/unrelated updates and ordinary activation. Intercept synthetic service calls before send. Exclude cells on failed keyboard, single-dispatch, state-delivery or resource checks; never add synthetic keyboard handlers to repair a comparator.

### Rejected alternatives and boundaries

A bespoke nested-card/JavaScript-template Button Card arrangement is not selected: it would add custom template behavior and make the two-slot comparison harder to interpret. Mushroom templates are not used for the server-subscription reason above. Generic framework benchmarks are background only and cannot rank this HA workload. No third comparator is planned. Ready release artifacts contain their bundled runtime dependencies; no npm installation is needed for either comparator. Static compatibility remains provisional until the pinned Core/frontend pilot.

## Pilot outcome and pause — 2026-11-19

See [pilot.json](pilot.json). Browser: HeadlessChrome 159.0.8154.6; pinned HA identity and isolation are recorded in [reproduction.md](reproduction.md).

| Composition, one group | Pointer A | Ordinary focused Enter A | Other action checks | Eligibility |
| --- | --- | --- | --- | --- |
| Native | One intercepted A intent | One intercepted A intent | B/body pointer and keyboard also each dispatch once, targets stay off | Actions passed; update/resource pilot still incomplete |
| Experimental | One recorded A intent | One recorded A intent | B/body pointer and keyboard also each dispatch once, targets stay off | Actions passed; update/resource pilot still incomplete |
| Button Card v7.0.1 | One intercepted A intent | Zero intents | Later slots not attempted after failure | Not admitted |
| Mushroom v5.3.0 entity card | One intercepted A intent | Zero intents | Later slots not attempted after failure | Not admitted |

Both tested comparator activation surfaces had tabIndex -1, no role and did not receive focus. No synthetic key handler, tabindex, direct action-event dispatch or upstream modification was added. Additional Mushroom shadow-tree inspection found no tabIndex >= 0 control; twenty ordinary Tab presses did not enter a Mushroom card. This is an observation about the selected composition in this pinned lab, not a universal accessibility or compatibility verdict. Button Card's inspected class exposed no visual editor; Mushroom exposed getConfigElement, but editor persistence was not tested. Neither can be described as editor-equivalent from this pilot.

No third-party composition qualifies for collection on current evidence; third-party collection is excluded. Native/empty-only contextual investigation is the design's permitted negative branch, but it has not been collected. The apply run paused on the failed eligibility assertions before update pilots, editor trials, calibration and protocol freeze. Do not treat selection task completion as successful comparator feasibility or reduce the keyboard requirement to admit pointer-only samples. No discovery or acceptance values exist for this campaign.

To resume, explicitly carry the negative comparator outcome into the remaining native/experimental/empty pilot and protocol, or revise planning if a different composition/candidate is to be investigated. Keep at most two selected comparators and preserve failed attempts. Any replacement must pass a new upstream/license/resource and fixture review; do not silently pool incompatible subjects.

## Authorized negative branch — 2026-11-19

The maintainer explicitly agreed to continue without third-party comparators, retaining native/experimental/empty controls. Both selected third-party compositions remain excluded from runtime and editor collection; no keyboard exception or repair is authorized. Button Card lacks a demonstrated visual editor; Mushroom has an editor entry point but its save/reload/reopen behavior remains untested and excluded. This is a negative feasibility outcome, not a successful third-party comparison. The remaining pilots/calibration and frozen schedule apply only to the three retained variants.

## Retained-variant pilot — 2026-11-19

[retained-pilot.json](retained-pilot.json) records passing one/ten-group checks for all three retained variants. Native and experimental each produced exactly one A, B and body intent per pointer/Enter activation, with all targets remaining off. Empty's added button passed only as a driver control. Each variant received all five relevant and all five unrelated changes on its existing compressed entity stream; no new HA subscription was added. Native/experimental visible readings changed for relevant updates; unrelated changes left experimental content unchanged. Served resources stayed on loopback, rejected comparator assets were absent, and only experimental loaded the fixed prototype resources. Native retains its three-Tile/extra-body-display mismatch. This completes runtime fixture eligibility for retained variants, without broader device/accessibility acceptance.

## Retained visual-editor pilot — 2026-11-19

[editor-pilot.json](editor-pilot.json) records a native first-Tile source edit through the real visual editor, save/reload/reopen and exact preservation of its independent action target and sibling/body cards. HA adds the defaults `vertical: false` and `features_position: bottom`; these additions are recorded separately from supplied field preservation. There is no native composite editor.

The unchanged prototype's versioned persistence driver completed ten visual round trips covering all nine fields, including independent source/target edits and preserved siblings, with zero page errors. Two earlier harness assertions are retained: an unrelated fixture inherited a duplicate friendly name, and the first native comparison omitted HA's added layout defaults. The unrelated synthetic fixture now has a distinct name; no product or upstream source was changed. Empty has no card editor. Rejected third-party editors remain excluded, with their unsupported/untested status preserved above. These are fixture/persistence checks, not new editor performance acceptance.

The initial pilot.json field named `editor` checks only the presence of `getConfigElement`; it is not an editor-support verdict. In particular, the prototype uses HA's `getConfigForm` schema-form path, whose actual save/reload/reopen support is demonstrated in editor-pilot.json. Keep that distinction when reading the preserved early pilot.
