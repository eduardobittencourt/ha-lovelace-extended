# Proposal

## Why

Lovelace Extended is public but has no project license file or dedicated contribution and community guidance. Establishing that foundation now makes participation understandable while the library is still documentation-only, before product implementation and independently of readiness for active promotion.

## What Changes

- Adopt the maintainer-selected Apache License 2.0 for original project material, with accurate copyright attribution and explicit preservation of third-party licenses, including the generated OpenSpec material.
- Add `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`; assess whether a separate attribution file is required by actual provenance rather than adding one by convention.
- Revise `README.md` and `AGENTS.md` so human and agent contributors can understand the current stage, navigate public documentation, and follow the contribution workflow without private devbox context.
- Add focused GitHub issue templates, issue routing configuration, and a PR template for research, documentation, proposals, and eventual implementation contributions.
- Reconcile current license and contribution guidance in decisions, roadmap, the OpenSpec guide, and project context. Preserve archived research as historical evidence.
- Review other conventional repository files and record justified additions or deferrals. Avoid release, support, governance, funding, and automation claims without an actual process behind them.

This is a research/documentation delivery under the roadmap's **Open source setup** milestone. It does not complete product stage 0 or any later stage.

## Capabilities

### New Capabilities

None. This change establishes repository documentation and contribution process, not product behavior. Change metadata sets `skip_specs: true`.

### Modified Capabilities

None. The current OpenSpec capability inventory is empty; no runtime specifications will be introduced.

## Impact

Expected edits are community Markdown files, `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`, existing contributor entry points, relevant `docs/`, and `openspec/config.yaml`. No generated skill modifications, product code, dependencies, HA changes, physical actions or releases are included. The original scope excluded repository settings; on 2026-11-18 the maintainer separately authorized enabling GitHub private vulnerability reporting. That single feature change was performed and verified; no other setting changes are included. All repository content remains in English.

Research will verify Apache redistribution/attribution obligations and GitHub file conventions using official sources. Before publishing dependent policies, execution must confirm the copyright notice, provenance of reused tooling/schema material, private conduct reporting contact, and an available private security reporting channel. No contact details, enabled GitHub features, response deadlines, or supported releases will be invented.

Success means an outside contributor can understand the project and its license, propose a suitable contribution, follow available checks, and find verified reporting routes without access to a private installation. Planning artifacts alone do not satisfy that acceptance criterion.
