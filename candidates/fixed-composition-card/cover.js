import { finiteNumber } from './bindings.js';

// Core 2026.11.1 / frontend 20261028.5; version-bound domain contract.
export const features = Object.freeze({ open: 1, close: 2, position: 4, stop: 8 });
export const services = Object.freeze({ open: 'open_cover', close: 'close_cover', stop: 'stop_cover', position: 'set_cover_position' });
export function coverControl(states, binding, action) {
  const entity = binding?.entity;
  if (binding?.error || typeof entity !== 'string' || !entity.startsWith('cover.')) return { enabled: false, reason: 'Invalid cover target', entity };
  const state = states[entity];
  if (!state) return { enabled: false, reason: 'Missing target', entity };
  if (state.state === 'unavailable') return { enabled: false, reason: 'Unavailable target', entity };
  const mask = state.attributes?.supported_features;
  if (!features[action] || !Number.isInteger(mask) || mask < 0 || !(mask & features[action])) return { enabled: false, reason: 'Unsupported capability', entity };
  return { enabled: true, reason: null, entity };
}

export function actualPosition(states, entity) {
  const state = states[entity];
  if (!state || state.state === 'unavailable') return null;
  const value = finiteNumber(state.attributes?.current_position);
  return value !== null && value >= 0 && value <= 100 ? value : null;
}

export function coverIntent(states, binding, action, position, origin = action) {
  const control = coverControl(states, binding, action);
  if (!control.enabled) throw new Error(control.reason);
  if (action === 'position' && (!Number.isFinite(position) || position < 0 || position > 100)) throw new Error('Position must be finite percent from 0 to 100');
  return Object.freeze({ kind: 'service', domain: 'cover', service: services[action], target: control.entity,
    data: Object.freeze(action === 'position' ? { position } : {}), origin });
}
