# Lovelace Extended

A library in conception for building Home Assistant interfaces with independent bindings per element, visual configuration, and performance as the top priority.

**Status:** product documentation only. No implementation, installable package, or published release.

Development is public from the outset, with English as the project's working language. The repository is [eduardobittencourt/ha-lovelace-extended](https://github.com/eduardobittencourt/ha-lovelace-extended). Original project material uses Apache-2.0, with third-party terms preserved; active promotion is a separate, later milestone.

## The idea

A card brings together visually consistent elements — icons, text, indicators, and controls — that can display data and execute actions from different entities. A primary entity supplies defaults; each element can override its bindings.

The MVP uses a fixed layout inspired by a native HA card. Its first application is a height-adjustable desk: state and controls from a `cover` entity, together with three memory buttons bound to other entities. Everything is configured through the visual editor.

The desk is a first acceptance example, not the final product objective. Initial research also examines public non-desk and non-cover cases to distinguish reusable bindings from domain and installation details; these comparisons do not establish implemented support.

The future vision allows elements to be placed on an internal grid and provides ready-made recipes built from those same pieces. This should enable experiences for lights, 3D printers, vacuums, washing machines, and other devices represented by multiple entities.

## Documentation

| Document | Purpose |
| --- | --- |
| [Manifesto](docs/manifesto.md) | Product principles and identity |
| [MVP](docs/mvp.md) | Scope, desk use case, and acceptance criteria |
| [Conceptual architecture](docs/architecture.md) | Proposed elements, bindings, and technical boundaries |
| [Roadmap](docs/roadmap.md) | Small steps, evidence, and exit criteria |
| [Decisions and open questions](docs/decisions.md) | Agreed directions and decisions still needed |
| [Research and discovery](docs/discovery.md) | Questions, methods, and evidence before assuming contracts |
| [OpenSpec](docs/openspec.md) | SDD workflow, local setup, and starting changes |

## Contributing and reporting

See [CONTRIBUTING.md](CONTRIBUTING.md) for small corrections, research and
substantial proposals, and [AGENTS.md](AGENTS.md) for agent instructions.
Ordinary questions and proposals belong in
[GitHub issues](https://github.com/eduardobittencourt/ha-lovelace-extended/issues).
Use [SECURITY.md](SECURITY.md) for private vulnerability reports and the
[Code of Conduct](CODE_OF_CONDUCT.md) for conduct expectations and private
reporting. There is no installable product or separate support service yet.

## Resuming work

Read the MVP and the first pending roadmap stage. Use the discovery map and OpenSpec workflow to answer the questions relevant to that stage, record evidence, and update affected documents. Unchecked items represent future work, not existing functionality.

The research change archived on 2026-11-15 is [discover-desk-and-frontend-contracts](openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/proposal.md). Its [evidence record](openspec/changes/archive/2026-11-15-discover-desk-and-frontend-contracts/research.md) covers the desk's read-only contract, public comparison cases, versioned frontend contracts, and the validation protocol. The selected target is iPhone 14 Pro / Safari / reported iOS 27. Target-device baselines, numerical acceptance limits and rendered fit remain open; stage 0 is not complete. No product implementation has started.

## Current boundaries

The implementation stack, minimum HA version, public configuration format, and distribution strategy have not been selected. Compatibility with specific integrations or devices is not promised.

A usable MVP in the personal dashboard and readiness for active promotion are different milestones. Active promotion should wait until coverage and quality are sufficient to replace complete dashboards. This does not postpone the project's open source intent.

## License

Copyright 2026 Eduardo Bittencourt.

Original project material is licensed under the [Apache License 2.0](LICENSE).
Third-party material retains its own terms: generated/derived OpenSpec material
is MIT-licensed and the conduct policy is CC BY 4.0. See
[third-party notices](THIRD_PARTY_NOTICES.md) for covered paths and attribution.
