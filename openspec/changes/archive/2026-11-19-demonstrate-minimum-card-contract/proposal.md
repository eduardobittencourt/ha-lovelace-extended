# Proposal

## Why

The stage 0 research identifies usable HA extension boundaries, but no running card demonstrates independent bindings, actual editor persistence or measured cost. The next roadmap step needs a bounded stage 1 experiment before selecting production mechanisms or building the complete desk MVP.

## What Changes

- Introduce a disposable experimental Web Component with two fixed, independently configured information/action slots and a separate body action.
- Demonstrate visual configuration, save/reload/reopen and single-binding edits in an isolated real HA dashboard, using synthetic entities and intercepted actions.
- Verify update isolation, disconnect/reconnect cleanup, errors, theme/locale changes, Sections/Masonry allocation and basic accessibility.
- Capture comparable native/experimental costs, justify acceptance budgets from evidence and distinguish technical feasibility from performance acceptance.
- Deliver reproducible setup/run instructions and sanitized results; update current project guidance only from demonstrated outcomes.

This is an experimental implementation delivery when applied, not a research-only documentation change. This proposal creates planning artifacts only; execution, dependency installation and environment setup wait for a subsequent apply request.

Non-goals: complete desk controls or three memories, physical commands, production HA access or dashboard changes, pairing, free composition, recipes, production stack adoption, releases, broad compatibility promises, and closing the unfinished stage 0 scope synthesis.

## Capabilities

### New Capabilities

- `independent-element-bindings`: independently configured display/action bindings, visual persistence, action/update isolation and lifecycle/layout behavior on the bounded experimental surface. Requirements apply to the experiment; they do not promise a released library or a stable public configuration format.

### Modified Capabilities

None. The capability inventory is empty at proposal time.

## Impact

- Planned implementation home: `experiments/minimum-card-contract/`, containing original experimental source, safe fixtures, verification tools and reproduction instructions. No production package exists or is introduced.
- Planned environment: a disposable local HA instance targeting the historical Core 2026.11.1 / frontend 20261028.5 reference, with no production configuration, credentials, devices or integrations copied into it. Record and verify the actual bundled and served assets before testing.
- Start with native JavaScript Web Components, HA schema-based forms and ordinary `hass` delivery with selective rendering. No Lit adoption, private action helper import or general binding engine is proposed. Dev-only browser automation and an isolated HA runtime may be acquired during apply after recording exact versions and license implications; no global tool upgrades are included.
- Blocking execution preparation: runtime availability, active frontend identity, form field round trips, isolated fixture/action interception and capture-tool reproducibility. Sources are the current official card/editor documentation, historical pinned frontend findings, and the experiment's own checks; see [research](research.md).
- Pending results: actual fit, persistence, update/cleanup correctness and comparative costs. Production stack, minimum supported HA version and justified performance budgets remain unselected.
- Raw captures and investigation material stay outside the checkout in the project research area; sanitized observations and public references remain reviewable here. No implemented capability is claimed by this plan or added to main specs now.
