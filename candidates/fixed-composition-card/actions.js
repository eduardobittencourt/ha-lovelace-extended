import { coverControl, services } from './cover.js';

// Synthetic-only boundary, not card defaults or an installation inventory.
export const syntheticTargets = Object.freeze(['cover.fcc_primary', 'cover.fcc_alternate',
  'sensor.fcc_height', 'sensor.fcc_alternate', 'button.fcc_memory_1', 'button.fcc_memory_2', 'button.fcc_memory_3']);

export function additionalIntent(type, target, origin) {
  if (type === 'none') return null;
  if (type === 'more-info') return Object.freeze({ kind: 'more-info', target, data: Object.freeze({}), origin });
  if (type === 'press') return Object.freeze({ kind: 'service', domain: 'button', service: 'press', target, data: Object.freeze({}), origin });
  throw new Error('Unsupported additional action');
}

export function validateIntent(intent, states) {
  if (!intent || !syntheticTargets.includes(intent.target)) return 'Unapproved synthetic target';
  if (!intent.data || typeof intent.data !== 'object' || Array.isArray(intent.data)) return 'Invalid action data';
  if (Object.keys(intent).some(key => !['kind', 'domain', 'service', 'target', 'data', 'origin'].includes(key))) return 'Unsupported descriptor field';
  const state = states[intent.target];
  if (!state) return 'Missing target';
  if (state.state === 'unavailable') return 'Unavailable target';
  if (intent.kind === 'more-info') return Object.keys(intent.data).length ? 'Unexpected details data' : null;
  if (intent.kind !== 'service') return 'Unsupported action kind';
  if (intent.domain === 'button' && intent.service === 'press' && intent.target.startsWith('button.') && !Object.keys(intent.data).length) return null;
  if (intent.domain !== 'cover') return 'Unsupported action';
  const action = Object.keys(services).find(key => services[key] === intent.service);
  const control = coverControl(states, { entity: intent.target }, action);
  if (!control.enabled) return control.reason;
  if (action === 'position') {
    if (Object.keys(intent.data).length !== 1 || !Number.isFinite(intent.data.position) || intent.data.position < 0 || intent.data.position > 100) return 'Invalid position data';
  } else if (Object.keys(intent.data).length) return 'Unexpected action data';
  return null;
}

/** This sink records scalars only. It has no service transport dependency. */
export function createSink({ states, context, confirm = async () => false, details = () => {} }) {
  const events = [];
  let nextOutcome = 'record';
  return {
    events,
    inject(outcome) {
      if (!['record', 'error', 'reject', 'cancel'].includes(outcome)) throw new Error('Invalid injected outcome');
      nextOutcome = outcome;
    },
    reset() { events.length = 0; nextOutcome = 'record'; },
    async record(intent, { confirmation = false, valid = () => true } = {}) {
      if (!intent) return { status: 'none' };
      // Copy/freeze before the first asynchronous boundary.
      const frozen = Object.freeze({ ...intent, data: Object.freeze({ ...intent.data }) });
      const before = context();
      const outcome = nextOutcome; nextOutcome = 'record';
      const invalid = () => {
        const now = context();
        return !before.connected || !now.connected || before.generation !== now.generation || !valid()
          ? 'Stale or disconnected activation' : validateIntent(frozen, states());
      };
      let error = validateIntent(intent, states()) || invalid();
      if (error) return { status: 'rejected', error };
      if (outcome === 'cancel') return { status: 'cancelled' };
      try {
        if (confirmation && !await confirm(frozen)) return { status: 'cancelled' };
        error = invalid();
        if (error || outcome === 'reject') return { status: 'rejected', error: error || 'Injected rejection' };
        if (outcome === 'error') return { status: 'error', error: 'Injected action error' };
        if (frozen.kind === 'more-info') details(frozen.target);
        events.push(frozen);
        return { status: 'recorded' };
      } catch {
        return { status: 'error', error: 'Local action adapter failed' };
      }
    },
  };
}
