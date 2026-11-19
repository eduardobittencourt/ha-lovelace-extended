# Design

## Context

See [proposal](proposal.md) for motivation and [research E1–E6](research.md#evidence) for the evidence boundary. The repository has no product runtime. This experiment introduces original source and its own development tooling, while leaving production architecture and public configuration undecided. A design is necessary because isolation, editor integration, selective updates and capture methodology cross multiple experimental components.

## Goals / Non-Goals

**Goals:** isolate decisions so a failing editor, renderer or measurement method can be identified; make correctness observable independently of timing; enable reproduction without personal HA access; keep experimental code removable.

**Non-Goals:** a generic action interpreter, per-fragment component framework, configuration migrations, a reusable package structure or a second rendering-stack implementation. Alternative-stack investigation is a possible follow-up supported by evidence, not an assumed outcome.

## Decisions

### 1. Use a disposable HA runtime and synthetic fixtures

Target Core 2026.11.1 / frontend 20261028.5 (research E4), verified against the actual installed package and served browser assets. Run a locally isolated, unprivileged container with loopback-only published access, no host-device mounts, host network or production credentials/configuration. Permit only synthetic helpers; disable discovery and omit physical integrations. Keep runtime state, generated credentials and captures outside the checkout. Setup instructions and sanitized fixture definitions live with the experiment.

Use two display helpers, two action-target helpers and a third body-action target, all from a deterministic fixture namespace. The action recorder accepts only these targets and never forwards card intents. Negative tests inject rejected/cancelled outcomes. For native Tile comparisons, intercept its action boundary as well and verify the interception before running; if a matched native workload cannot be safely intercepted, report it as unavailable. Reject any configured external destination.

Alternative: a standalone hass mock is simpler and useful for deterministic unit/browser checks, but cannot demonstrate real editor persistence (E3/E6). Production HA would add private configuration and physical side effects unrelated to the experiment. Neither substitutes for the isolated dashboard.

Preflight must resolve the runtime image digest, exact browser automation version and browser revision, confirm loopback binding/interception and record resource limits. An unavailable artifact/runtime is a stop condition for dependent execution, not authorization to upgrade global tools, reconfigure the host or substitute a live HA installation. Acquiring project-local development dependencies and an unprivileged disposable runtime belongs to apply; installing a daemon or changing host security settings does not.

### 2. Start with native JavaScript and a schema form

Use one original `HTMLElement` card with two ordinary semantic button/output regions and a separately focusable body-action control. Prepare fixed DOM structure once, use `textContent` for fixture/user text, and patch dependent values. Do not import frontend source, private action helpers or Tile's internal DOM. Use CSS custom properties to follow HA themes; any chosen HA-specific styling dependency must be documented as version-sensitive.

Implement a static `getConfigForm` with flat fields for slot A/B display entity, action-target entity and label, plus body target and an optional confirmation toggle. Flat stable field names reduce the unrelated nested-serialization question while still proving independent bindings. All fields must appear in the visual form. Configuration validation accepts only the supported fixture action semantics and reports unsupported shapes. This serialization is experimental and unversioned, with no public compatibility commitment.

Schema forms follow E3 without adding a custom editor bundle. Measure first-open/reopen incremental editor cost and verify no experiment-owned editor module is fetched on ordinary card loads. The form implementation may load HA's own shared controls; report that cost rather than claiming zero editor cost. If persistence fails, record the failure and revise the plan before switching to a custom editor.

Alternatives: Lit may simplify lifecycle/rendering but introduces an unmeasured dependency; custom editors or internal action selectors introduce more compatibility surface. Neither is needed to ask the first two-slot question. No performance superiority is assumed for plain JavaScript.

### 3. Use ordinary hass delivery with explicit dependencies

On configuration change, normalize two stable slot records and resolve their display/action dependencies. On hass updates, compare the displayed entity's relevant state/attributes, action-target availability and presentation inputs. Update only affected nodes. Reconfiguration must not mutate the original persisted object or sibling fields. Theme CSS should update naturally; locale changes invalidate formatted presentation even without entity-state changes.

Avoid live subscriptions for the first surface; HA already supplies hass (E2). Track and release all owned DOM listeners, observers, timers and scheduled callbacks on disconnect; reattach exactly once on reconnect, rendering the latest supplied state. Preserve no queued action across a disconnect. If later evidence warrants context subscriptions, revise the design before introducing them, preserving theme/locale correctness and explicit disposal.

Alternative: states-only context subscription could reduce delivery overhead but cannot be assumed to reduce per-slot work and could miss presentation inputs. This experiment measures the ordinary path first. Dependency bookkeeping work is measured even when no DOM mutation occurs.

### 4. Isolate semantic activation from action recording

Use native buttons so pointer and keyboard share one activation path; avoid dispatching independently on both pointer/touch and click. Inner controls stop propagation, and the body action control is a sibling rather than an interactive ancestor. The dispatcher validates the target allowlist, handles optional confirmation and reports only recorded intent, cancellation or rejection. No displayed status means the desk moved or an action reached a physical device.

Test each available input method separately, including touch emulation metadata. Cancelled confirmations dispatch zero intents; rejected actions record an error without success. A standalone deterministic harness tests edge states and resource ownership, while real HA verifies integration and persistence. Neither is evidence of Safari, VoiceOver or physical touch behavior unless actually tested there.

### 5. Adapt fixed regions to HA allocations

Expose `getGridOptions` for Sections and `getCardSize` for Masonry, using content-derived sizing (E2). Do not copy Tile's footprint as the minimum. Use wrapping CSS layout with no clipped controls, semantic labels and visible focus. The card's reported dimensions do not substitute for rendered checks.

Research R1 fixes the target widths and text scale. Preflight records actual achievable widths in both dashboard types, normal/long labels, theme/locale and keyboard/touch method. If an allocation fails, record the boundary and revise layout before calling that case passed; do not silently remove the narrow case. These widths are experimental coverage, not a permanent public minimum.

### 6. Keep observability separate from timing

Use development-only render/intent/resource counters and scoped DOM mutation observation for correctness. Keep those hooks and automation out of timed production-like resource captures wherever they affect results. A clean card load contains only its runtime module and stylesheet; automation remains a separate driver. Record requests and incremental HA editor resources, separating shared frontend overhead from experimental bytes.

Follow research R3 for fixed workloads and alternating reference/experimental trials. Native reference composition uses as many Tiles as needed for equivalent information/actions, documenting differences in card count, layout and shared costs. Non-equivalent cases are descriptive only. Record deterministic counters, median/range and individual timing samples; small samples do not justify robust tail percentiles. Memory figures are diagnostic unless the same comparable method is available for both surfaces. Resource ownership counts remain mandatory even if heap instrumentation is unavailable.

Before accepting performance, publish the metric-specific budget rationale, review decision and subsequent verification samples. Budgets are not selected to disguise correctness failures or retroactively pass discovery samples. If there is no defensible budget or comparable evidence, leave performance and the stage 1 exit open. Follow-up architecture changes require their own reviewed scope.

## Risks / Trade-offs

- [Historical runtime unavailable or served assets differ] → Verify before capture; record blocked checks and do not infer compatibility from rolling documentation.
- [Flat form succeeds but does not exercise arbitrary nested bindings] → Limit claims to two fixed slots; defer general configuration design.
- [Fixture actions underrepresent real HA transport] → Report local intent timing only; leave transport, desk movement and arrival validation to later scope.
- [Native comparison cannot exactly match experimental composition] → State workload differences and withhold misleading speed ratios or acceptance claims.
- [Automation or profiling changes measured cost] → Separate correctness instrumentation from timing runs and publish capture conditions.
- [Desktop emulation misses mobile behavior] → Record coverage limits and carry actual reference-device/assistive-technology checks to stage 2.
- [Experiment structure becomes accidental production API] → Label experimental source/docs and spec purpose; require a separate adoption decision.

## Migration Plan

There is no production migration. During apply, add source, safe fixture/setup tools and instructions under `experiments/minimum-card-contract/`; install only its local locked development tooling. Register its resource solely in the disposable instance. Verify setup and cleanup commands as part of the experiment.

Rollback removes that instance, its dashboard/resource registrations and generated state through explicit experiment cleanup, without touching any existing HA installation. Preserve sanitized results and approved source; retain raw evidence in the project research area according to local conventions. Do not delete evidence as an incidental cleanup action.

## Open Questions

- Production minimum version, public serialization and renderer/editor adoption are deferred to later proposals; they do not change this fixed experiment.
- Numerical performance budgets depend on the measured evidence and a recorded review decision; absent agreement, this experiment can report feasibility but cannot accept performance.
- Exact installed runtime/browser identifiers and achievable card allocations are resolved by the bounded preflight tasks before capture. A failure blocks execution; changing the target release or isolation model requires revising the plan.
