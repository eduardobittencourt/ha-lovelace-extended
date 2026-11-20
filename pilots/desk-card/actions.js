import { entityPattern } from './config.js';
import { coverIntent, services } from './cover.js';

const additionalRoles = ['action_1', 'action_2', 'action_3'];

export function additionalIntent(type, target, origin) {
  if (type === 'none') return null;
  if (type === 'more-info') return Object.freeze({ kind: 'more-info', target, data: Object.freeze({}), origin });
  if (type === 'press') return Object.freeze({ kind: 'service', domain: 'button', service: 'press', target, data: Object.freeze({}), origin });
  throw new Error('Unsupported additional action');
}

export function configuredIntent(model, states, role, position) {
  if (Object.keys(model.errors).length) throw new Error('Configuration error; complete the visual fields');
  if (role === 'body') return additionalIntent(model.bodyAction, model.roles.body.entity, role);
  const index = additionalRoles.indexOf(role);
  if (index !== -1) {
    const { type, target } = model.actions[index];
    return additionalIntent(type, target.entity, role);
  }
  if (!Object.hasOwn(services, role)) throw new Error('Unsupported control');
  return coverIntent(states, model.roles[role], role, position);
}

function validateIntent(intent, { model, states }) {
  if (typeof intent.target !== 'string' || !entityPattern.test(intent.target)) return 'Invalid action target';
  if (!Object.hasOwn(states, intent.target)) return 'Missing target';
  if (!states[intent.target] || states[intent.target].state === 'unavailable') return 'Unavailable target';
  if (intent.domain === 'button' && !intent.target.startsWith('button.')) return 'Invalid button target';

  let expected;
  try {
    expected = configuredIntent(model, states, intent.origin, intent.data.position);
  } catch (error) {
    return error.message;
  }
  if (!expected || Object.keys(expected).length !== Object.keys(intent).length ||
      ['kind', 'domain', 'service', 'target', 'origin'].some(key => expected[key] !== intent[key])) {
    return 'Action does not match the configured control';
  }
  const keys = Object.keys(intent.data);
  if (keys.length !== Object.keys(expected.data).length ||
      keys.some(key => !Object.hasOwn(expected.data, key) || expected.data[key] !== intent.data[key])) {
    return 'Invalid action data';
  }
  return null;
}

export function invokeHassService(hass, { domain, service, data, target }) {
  return hass.callService(domain, service, data, { entity_id: target });
}

export function createActionDispatcher({
  context, confirm = () => false, details = () => {}, callService = invokeHassService, report = () => {},
}) {
  const pending = new Map();

  function invalidate({ uncertain = false } = {}) {
    const previous = [...pending.entries()];
    pending.clear();
    if (uncertain) {
      for (const [role, activation] of previous) {
        if (activation.submitted) report(role, 'uncertain');
        else report(role, 'cancelled');
      }
    }
  }

  async function dispatch(intent, { valid = () => true } = {}) {
    if (!intent) return 'none';
    if (!intent.data || Object.getPrototypeOf(intent.data) !== Object.prototype) return 'rejected';
    const frozen = Object.freeze({ ...intent, data: Object.freeze({ ...intent.data }) });
    const role = frozen.origin;
    if (pending.has(role)) return 'duplicate';

    const original = { ...context() };
    const initialCapabilities = original.states[frozen.target]?.attributes?.supported_features;
    const activation = { submitted: false };
    const current = () => pending.get(role) === activation;
    const complete = (status, reason) => {
      if (current()) {
        pending.delete(role);
        if (context().generation === original.generation) report(role, status, reason);
      }
      return status;
    };
    const validate = () => {
      const now = context();
      if (!current() || original.generation !== now.generation || !now.mounted || !valid()) {
        return 'Activation is no longer current';
      }
      if (frozen.kind === 'service' && (!now.enabled || !now.connected || original.connection !== now.connection)) {
        return 'Commands are unavailable in this view or connection';
      }
      if (frozen.domain === 'cover' && initialCapabilities !== now.states[frozen.target]?.attributes?.supported_features) {
        return 'Target capabilities changed before dispatch';
      }
      return validateIntent(frozen, now);
    };

    pending.set(role, activation);
    try {
      let error = validate();
      if (error) return complete('rejected', error);
      if (frozen.kind === 'more-info') {
        details(frozen.target);
        return complete('none');
      }
      if (original.model.confirm && !await confirm(frozen)) return complete('cancelled');
      error = validate();
      if (error) return complete('rejected', error);

      // Keep the final context check and invocation in the same synchronous turn.
      const { hass } = context();
      activation.submitted = true;
      report(role, 'pending');
      await callService(hass, frozen);
      const now = context();
      return complete(now.connected && now.connection === original.connection ? 'completed' : 'uncertain');
    } catch (error) {
      if (activation.submitted && !context().connected) return complete('uncertain');
      const denied = ['unauthorized', 'forbidden', 'permission_denied'].includes(error?.code);
      return complete('error', denied ? 'Home Assistant denied this command' : 'Home Assistant command failed');
    }
  }

  return { dispatch, invalidate };
}
