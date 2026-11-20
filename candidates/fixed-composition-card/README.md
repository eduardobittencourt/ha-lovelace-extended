# Fixed-composition candidate

Synthetic-only stage 2 candidate with published runtime, HA visual form,
integrated/layout checks and a descriptive profile. Final MVP/performance
acceptance remains open.
It is not an installable product or production resource. Its flat format,
renderer and version-pinned adapters establish no public compatibility promise.
No real HA service transport or enable switch belongs to this delivery.

Tracked delivery lives in the
[change](../../openspec/changes/archive/2026-11-19-implement-complete-desk-composition/tasks.md);
remaining acceptance gates are explicit in the [handoff](coverage.md).
The historical two-slot experiment and its dependency locks remain unchanged.

## Checks

Use the existing Node 24 installation; no dependency installation is needed:

```sh
cd candidates/fixed-composition-card
node --test test/*.test.js
```

Browser checks reuse Playwright 1.65.1 / Chromium 159.0.8154.6 already pinned in
the historical experiment. They do not establish Safari/device acceptance.

## Guarded lab reproduction

External acquisitions, scripts and raw observations belong in a dedicated
`~/research/ha-lovelace-extended/implement-complete-desk-composition/` directory.
Private generated state uses
`~/.local/state/ha-lovelace-extended/fixed-composition-card/` (mode 0700),
separately from the historical experiment. Never publish generated credentials.

Before acquisition, check current free space against compressed layers
(673,894,439 bytes), expanded tar streams (2,550,238,720 bytes), a 256 MiB capture
allowance and a 1 GiB reserve. Filesystem allocation can differ. The supervisor
samples every 100 ms and stops at 1.25 GiB free, leaving headroom above the reserve.
It guards acquisition and the complete foreground server lifetime, including
capture tasks. It never deletes evidence. If needed, reclaim only safe owned
caches; stop if adequate capacity cannot be recovered.

The external sandbox adapts the historical sandbox source to its own private
state and port 18124. It retains Bubblewrap user/PID/mount/network/IPC/UTS
isolation, dropped capabilities, read-only image and a loopback-only relay.
No production resources, dashboard or device configuration are accessed.
Stop on any isolation failure. [Preflight](evidence/preflight.json) records the
actual tool/image identities, baseline hashes, storage minimum and stop checks.
Offline DNS/zeroconf errors in the isolated HA log remain a lab limitation.

Reconstruct the exact external supervisor and sandbox from
[source reconstruction](evidence/lab-sources.json), checking SHA-256 before use.
Run this from the repository root with a new dedicated external directory:

```sh
python3 - <<'PY'
import hashlib, json
from pathlib import Path
area = Path.home() / 'research/ha-lovelace-extended/implement-complete-desk-composition'
files = json.loads(Path('candidates/fixed-composition-card/evidence/lab-sources.json').read_text())['files']
area.mkdir(parents=True, exist_ok=True)
for name, entry in files.items():
    data = entry['source'].encode()
    assert hashlib.sha256(data).hexdigest() == entry['sha256']
    target = area / name
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open('xb') as output:
        output.write(data)
PY
python3 ~/research/ha-lovelace-extended/implement-complete-desk-composition/guard.py selftest --run reproduce
python3 ~/research/ha-lovelace-extended/implement-complete-desk-composition/guard.py acquire --run reproduce
```

The self-test deliberately exits nonzero with `storage-stop`, using a synthetic
threshold above current free space and a sleeping child; it never fills disk.
Run names are unique: logs use exclusive creation and cannot overwrite evidence.
Prepare separate synthetic state before `guard.py serve --run <unique-name>`.
The server supervisor handles SIGTERM/interrupts; an explicit stop is also
available through `tools/sandbox.py stop` in that external directory. Verify
port 18124, worker, PID file and bridge socket are absent after every exit.

## Synthetic fixtures and interception

The maintained [fixture manifest](test/fixtures.json) supplies two covers with
different capabilities, independent cm/in sensors and three buttons, including
one available `unknown` button. These are generated lab states, with no physical
integration. The external `fixture-check.mjs` seeds them via the isolated REST
state API and checks actual HA WebSocket requests in Chromium.
[Assertions](evidence/fixtures.json) record seven allowed intents, six rejected
descriptors, REST/XHR blocking and zero service requests/frames sent. The guard
intercepts all `call_service` messages before the original send, replies locally,
and rejects unknown actions/targets, multi-targets and malformed data. Browser
routing additionally rejects service routes and non-loopback origins. The
network namespace has no external adapter. No candidate transport switch exists.

## Candidate configuration model

The configuration/binding modules are implemented and unit-tested; the runtime
renders these roles. All 23 fields are exposed through the actual HA form.
The following fields define the bounded candidate model. Empty optional strings
mean no override. Whitespace-only names/action labels also retain their readable
defaults while the original persisted input remains intact. Explicit invalid/missing entities never fall back to another
source. Unsupported fields and invalid shapes produce field errors; incomplete
objects remain fillable. This is not a stable public serialization format.

| Field | Default / meaning |
| --- | --- |
| `type` | HA card discriminator; `custom:fixed-composition-card` |
| `primary_entity` | Required cover; no installation or fixture default |
| `name`, `icon` | Inherit primary friendly name/icon; readable fallback `Select a cover` / `mdi:desk` |
| `state_entity` | Inherit primary; independent textual state source |
| `state_attribute` | Read the selected attribute; otherwise read the source state |
| `height_entity` | No default; independent direct numeric source |
| `height_attribute` | Selected numeric attribute; otherwise source state |
| `open_target`, `close_target`, `stop_target`, `position_target` | Each independently inherits primary |
| `action_N_label` | `Action N`, for N = 1, 2, 3 |
| `action_N_type` | `none`; bounded catalog `press`, `more-info`, `none` |
| `action_N_target` | No inherited target; required for enabled action |
| `body_action` | `none`; catalog `none`, `more-info` |
| `body_target` | Inherit primary |
| `confirm` | `false`; must be a boolean |

Numeric sources retain their actual HA `unit_of_measurement`. Missing attributes,
nonnumeric/unknown/unavailable values and missing entities remain explicit, with
no fabricated zero, alternate source or percent-to-cm conversion. State text is
kept separate from numeric feedback. Independent unit/source and sibling-edit
assertions are maintained in `test/config.test.js`.

Cover descriptors use the pinned OPEN=1, CLOSE=2, SET_POSITION=4, STOP=8 flags
from Core 2026.11.1 / frontend 20261028.5. Each effective target is checked
independently. Supported actions are `cover.open_cover`, `close_cover`,
`stop_cover` and `set_cover_position`; the last retains an exact finite 0–100
percent number. Endpoint activation has ordinary click semantics. Missing or
unavailable targets and absent capabilities cannot produce an intent. Unknown
numeric feedback is null, while an available capable target can still accept an
explicit request; available unknown buttons are likewise distinct from
unavailable buttons. No intent establishes movement or arrival.

The local sink accepts only the seven maintained synthetic fixture targets and
the bounded cover/button/details descriptors. It receives no HA service client;
there is no real-transport switch. `none` records nothing. Confirmation defaults
to denial unless a caller supplies an explicit local confirmation adapter. It
revalidates connection/generation, target availability/capability, exact data and
the caller's activation token after confirmation. Error/cancel/reject injections
are test-only local outcomes; status `recorded` means a local descriptor only.
Details passes only a validated synthetic target to the pinned UI adapter.
Unit tests cover all slots, invalid real targets/data, cancelled and stale
confirmation, target loss and immutable pending descriptors.

## Requested position controller

The pure controller keeps actual feedback, nullable local draft, pointer identity,
dirty state, configuration generation and one claimed commit token separate.
Preview never creates an intent. A changed valid release creates one token;
unchanged/duplicate/foreign completion creates none. Concurrent feedback updates
the actual value without overwriting the draft. Unknown actual position remains
null and requires explicit selection. Commit does not change actual feedback.
The UI's candidate granularity is integer percent (0–100); typed domain
descriptors preserve supplied finite percent exactly. Browser integration remains
tracked separately from these pure transitions.

Candidate keyboard defaults: arrows adjust by one integer percent, Home/End
select 0/100, Enter commits and Escape/focus loss cancels. With unknown feedback,
an arrow starts from an internal 50% reference and explicitly selects 49/51;
that internal reference is never actual feedback. Enter repeat is suppressed.
Unexpected pointer capture loss/pointer cancellation, detach, config/target or
capability/availability changes discard drafts and pending tokens. Expected
capture loss after handled release preserves only that release's claimed token.
Confirmation rechecks the token immediately before recording; recovery does
not replay. These defaults and cancellation paths have maintained unit coverage;
actual browser gesture coverage is reported separately below.

## Runtime and pinned UI adapters

Stable identity/information, primary controls, requested-position and three
additional-action regions use native controls and independent body activation.
Text is assigned through text nodes. `Actual cover` is primary cover feedback;
textual state and height use their explicit independent sources. Requested
position uses feedback/capabilities from its effective target, with that target's
actual percent identified in the range's accessible value. Requests do not
overwrite any actual feedback.

The HA adapter uses registered `ha-icon` and a composed `hass-more-info` event
with `entityId`, verified against the pinned frontend. It imports no private
helper and does not traverse HA private DOM. The external test harness does
inspect the rendered UI to verify actual SVG and entity-details behavior.
Names remain readable if decorative icon support is absent; the standalone
browser bootstrap verifies the `Icon unavailable` fallback. No broader HA
compatibility promise follows. See [rendering assertions](evidence/rendering.json).

The [action/input matrix](evidence/actions.json) covers pointer, ordinary Enter
and Playwright emulated touch for all endpoint controls, three additional slots
and body details: one exact descriptor per activation and zero body propagation
from inner controls. It also records unknown-button usability, missing/unavailable
targets, details/none options, injected errors and cancelled confirmation.
CDP observed zero outbound service frames throughout this matrix. Details uses
the actual HA dialog; none is disabled and has no implied keyboard activation.

The [gesture matrix](evidence/gestures.json) executes real multi-value mouse
drags, ordinary keyboard adjustment/commit/cancel, duplicate native events,
injected pointer interruption, concurrent feedback and target changes during
asynchronous confirmation. It records zero intermediate/cancelled/stale intents,
one changed release and unchanged actual feedback. The external driver waits
for HA's launch overlay to disappear before coordinate input; the initial
invalid pilot hit that overlay and is not counted as a gesture failure/pass.
These local observations do not establish physical movement or compositor
presentation.

The [update/lifecycle assertions](evidence/lifecycle.json) record no role-content
mutation for an unrelated entity update and only a height patch for a height
change. pt-BR number formatting and inherited theme variables update visibly;
a missing display source leaves independent valid actions usable. Fifty
mount/remove/reinsert cycles return owned handlers/work to baseline and allow
one subsequent activation without replay. AbortController releases handlers;
there is no per-card timer or subscription. These owned-work counts do not
attribute retained bytes or prove browser-global memory recovery.

The [96-cell layout matrix](evidence/layout.json) records actual Sections and
Masonry allocations at 240/360/500 px (Masonry wide 492 px), ordinary/long labels,
16/32 px card text, light/dark and en/pt-BR. Every recorded cell passed measured
overflow/overlap, 44 px activation-area, visible-focus, keyboard-order and
emulated-touch reachability checks. The evidence-backed tested minimum is
240 px; narrower widths are unclaimed. Long enlarged text can require vertical
scrolling. Raw screenshots remain in the external campaign with listed names;
public dimensions/input results are reproducible without private installation
access. This is Chromium evidence, with Safari/reference-device and actual
assistive/physical-touch acceptance still pending.

## Visual configuration

`getConfigForm` exposes all 23 candidate fields with explicit labels, entity/icon/
text/boolean selectors and bounded dropdowns. The stub has no primary/fixture ID;
missing required fields render validation without disabling the form. Structurally
invalid types are rejected; fillable missing data remains editable. Candidate
controls cannot act while configuration errors are present. HA allocation and
visibility metadata passes through without becoming a candidate binding field.

The [real creation pilot](evidence/editor-create.json) fills every field, exercises
all three action catalogs/body options/confirmation, verifies zero preview
intents, saves/reloads/reopens and compares exact form/runtime configuration.
No YAML or custom-editor fallback was used. Shared HA form/selector modules are
HA editor cost; `form.js` is the candidate's small static schema module, imported
with the runtime. There is no candidate-only dynamically loaded custom editor.
The external driver waits for a field's actual HA form update before editing the
next field, and scopes menu items to their own selector to avoid closing-menu
animation ambiguity. Failed automation pilots are not counted as editor success.

The [independent edit matrix](evidence/editor-roundtrip.json) records 31 actual
save/reload/reopen edits covering all 23 fields, including each slot's complete
catalog, body none/details, both confirmation values, attributes and source-unit
changes. Every edit compares the entire stored configuration, reopened HA form
and active runtime; untouched fields remain exact. No action is generated by
these configuration changes. First/open/reopen cost is profiled separately.

## Profile, coverage and acceptance

The [frozen protocol](evidence/profile-protocol.json) specifies the complete
native/empty/candidate composition, actual allocations, three cold/warm and
first/reopen editor pairs per one/ten-group workload, 24 ten-second update-only
windows, 120 idle/under-update local inputs and fifty lifecycle cycles. The
[preflight](evidence/profile-preflight.json) verifies resource exclusion/inclusion,
cache behavior and native cover/button interception. Native uses five Tiles per
group; its editor row covers the cover Tile, and empty input is driver-only.
Shared driver/HA work is included. The extra state-change observer counts actual
delivery without establishing visual/compositor presentation.

The [public samples](evidence/profile-samples.json),
[min/median/range/max report](evidence/report/report.md) and
[approval/applicability ledger](evidence/acceptance-ledger.json) keep descriptive
costs separate from acceptance. All candidate performance rows remain pending.
The unchanged two-slot subject's runtime/warm/local/editor passes cannot pass
this expanded subject. Both historical cold failures remain unresolved;
CPU/transfer/updates require justified agreement, and retained-byte/final
presentation methods remain unsupported. Final-MVP/device repeats are required.
The [profile review](profile-review.md) retains observed size/startup concerns
against the historical scope without treating those comparisons as approval.

Review the [33 delta / 21 MVP scenario handoff](coverage.md) and the next delivery
prerequisites before scoping real transport, production registration/rollback,
reference-device input, supervised physical operation or everyday replacement.
There is no automatic unlock, inferred memory arrival or active-promotion claim.

Final review corrected whitespace-only accessible labels after the first
profile. The [initial samples](evidence/profile-initial-samples.json),
[protocol](evidence/profile-initial-protocol.json),
[exact sources](evidence/profile-initial-sources.json) and
[report](evidence/report-initial/report.md) remain separate; the final profile
repeats the complete schedule and does not pool or replace those valid samples.

For an offline reproduction, no HA, credentials or browser are needed. From the
repository root, choose an output directory that does not exist:

```sh
python3 candidates/fixed-composition-card/tools/summarize.py \
  candidates/fixed-composition-card/evidence/profile-samples.json \
  "$HOME/research/ha-lovelace-extended/implement-complete-desk-composition/offline-reproduction"
```

Compare generated `report.json`/`report.md` with `evidence/report/`. The samples
digest and protocol digest are recorded in the report. This evaluator describes
observations and never invents or approves an acceptance threshold.

## Full lab replay

Use the pinned existing tools from the historical experiment guide. Reconstruct
the external files above in a fresh campaign directory; the recorded absolute
root constants are local conventions. For another checkout/output root, adjust
those constants and freeze new source hashes, retaining the new conditions as
an independent reproduction. The public report needs none of those local paths.
Do not overwrite an original capture, install host upgrades or attach production
HA state. Stop any previous candidate sandbox before preparing its private state.

After guarded acquisition, run external `setup.py`. In a dedicated foreground
terminal start `guard.py serve --run <unique-name>` and keep it running through
all browser activity. In another terminal, execute from the repository root:

```sh
export MCC_RESEARCH="$HOME/research/ha-lovelace-extended/implement-complete-desk-composition"
node "$MCC_RESEARCH/seed.mjs"
node "$MCC_RESEARCH/runtime-check.mjs"
node "$MCC_RESEARCH/fixture-check.mjs"
node "$MCC_RESEARCH/action-check.mjs"
node "$MCC_RESEARCH/gesture-check.mjs"
node "$MCC_RESEARCH/lifecycle-check.mjs"
node "$MCC_RESEARCH/layout-check.mjs"
node "$MCC_RESEARCH/editor-create.mjs"
node "$MCC_RESEARCH/editor-roundtrip.mjs"
node "$MCC_RESEARCH/profile-preflight.mjs"
python3 "$MCC_RESEARCH/freeze-profile.py"
for phase in loads editors updates inputs; do
  node "$MCC_RESEARCH/profile-run-v2.mjs" "$phase" || break
done
node "$MCC_RESEARCH/integrated-check.mjs"
```

`seed` creates synthetic states through the isolated state API; the first runtime
open confirms HA's provisional loopback HTTP configuration before its five-minute
expiry. All visual creation/editing uses the actual form. The round-trip driver
resumes its own preserved partial result if present and starts from an empty
change list otherwise. The profile driver uses exclusive output creation, checks
every frozen source before each phase and retains invalid attempts before failing.
Do not run another browser workload concurrently with timing captures. Copy the
four phase `samples` arrays and protocol SHA-256 into the public sample structure;
the lifecycle entry references the integrated check. Then run the offline report.
Method pilots are separate, unpooled files; all failed pilot reasons are retained
in [pilot history](evidence/pilot-history.json).

Finally stop the external sandbox, verify process/PID/socket/listener cleanup and
reclaim only the campaign's `rootfs/`/`layers/` if useful. Keep source snapshots,
raw observations and license records. Storage/failure exits use the same cleanup
requirements. The [cleanup record](evidence/cleanup.json) verifies process/PID/
socket/listener removal, unchanged historical sources/locks, preserved licenses
and removal of only the owned rootfs/layers. It records the continuous storage
minimum and final free space. No unrelated evidence/cache was deleted.

The [final source check](evidence/final-check.json) repeats six long-label/200%
Sections/Masonry cells, verifies actual whitespace fallback names and persisted
input, and confirms every frozen source hash. The integrated final runtime also
passes real CDP touch drag and keeps command/feedback/arrival distinctions.
