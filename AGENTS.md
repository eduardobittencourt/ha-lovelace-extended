# Working in this repository

- Keep all project content in English: documentation, specifications, comments, identifiers, examples, commit messages, and future product text. Follow the user's language for conversation; conversation language does not change the repository language.
- Start with [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md), then read only the documents relevant to the task. CONTRIBUTING owns the public contribution and review workflow; small corrections do not require a new OpenSpec change.
- For OpenSpec changes, read `docs/openspec.md`, check the roadmap stage and relevant questions in `docs/discovery.md`. Use the local `research-first` schema and CLI-returned instructions; do not switch to the default schema for convenience.
- Review `research.md` as evidence, not as a formality satisfied by the file's existence. Resolve blockers before dependent decisions; research changes may contain pending plans without assuming their results.
- Customize project rules through config and schema; preserve generated skills. Do not consolidate future plans as delivered functionality in `openspec/specs/`.
- This project is at the conception stage. A documentation task does not authorize product implementation, dependency installation, or Home Assistant changes.
- Preserve the distinction between the desk MVP, the future vision, and readiness for active promotion. Open source development from the outset is compatible with postponing active promotion.
- Do not present proposals, stack choices, or unmeasured performance targets as settled decisions.
- Performance limits follow the maintainer-approved [benchmark policy](docs/performance-budgets.md): agents select relevant benchmark-derived values and treat them as authoritative until the maintainer changes them. Never ask the maintainer to invent numerical targets, supply subjective workload/network/responsiveness allowances, or separately approve those selected values. Missing evidence requires investigation, not arbitrary user numbers.
- When changing scope or decisions, update affected documents and keep links consistent.
- Never add credentials, complete private configurations, or personal installation inventories.
- Keep raw evidence, reference clones and investigation scripts outside the checkout. Local directory conventions are optional; sanitized findings and public sources must remain reviewable in the repository without private devbox or Home Assistant access.
- Preserve third-party terms and attribution; consult [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) before reusing or changing adopted material.
