# Lovelace Extended

A library in conception for building Home Assistant interfaces with independent bindings per element, visual configuration, and performance as the top priority.

**Status:** product documentation only. No implementation, installable package, or published release.

Development is public from the outset, with English as the project's working language. The repository is [eduardobittencourt/ha-lovelace-extended](https://github.com/eduardobittencourt/ha-lovelace-extended). Selecting an open source license is still pending; active promotion is a separate, later milestone.

## The idea

A card brings together visually consistent elements — icons, text, indicators, and controls — that can display data and execute actions from different entities. A primary entity supplies defaults; each element can override its bindings.

The MVP uses a fixed layout inspired by a native HA card. Its first application is a height-adjustable desk: state and controls from a `cover` entity, together with three memory buttons bound to other entities. Everything is configured through the visual editor.

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

## Resuming work

Read the MVP and the first pending roadmap stage. Use the discovery map and OpenSpec workflow to answer the questions relevant to that stage, record evidence, and update affected documents. Unchecked items represent future work, not existing functionality.

The next step is a research change to verify the desk's actual contract, HA frontend contracts, and the validation environment. OpenSpec is configured; no product change has been opened. Implementation should begin only in a later task that requests it.

## Current boundaries

The implementation stack, minimum HA version, public configuration format, license, and distribution strategy have not been selected. Compatibility with specific integrations or devices is not promised.

A usable MVP in the personal dashboard and readiness for active promotion are different milestones. Active promotion should wait until coverage and quality are sufficient to replace complete dashboards. This does not postpone the project's open source intent.
