import test from 'node:test';
import assert from 'node:assert/strict';
import { coverControl, coverIntent, actualPosition, features } from '../cover.js';
const binding = { entity: 'cover.fcc_primary' };
const snapshot = (mask, state = 'open', position = 42) => ({ [binding.entity]: { state, attributes: { supported_features: mask, current_position: position } } });

test('all sixteen pinned feature combinations enable only the matching actions', () => {
  for (let mask = 0; mask < 16; mask++) {
    for (const [action, bit] of Object.entries(features)) {
      assert.equal(coverControl(snapshot(mask), binding, action).enabled, !!(mask & bit));
    }
  }
});

test('targets are independent and missing/unavailable/invalid targets cannot construct intents', () => {
  for (const states of [{}, snapshot(15, 'unavailable'), snapshot(0)]) {
    assert.equal(coverControl(states, binding, 'open').enabled, false);
    assert.throws(() => coverIntent(states, binding, 'open'));
  }
  const states = { ...snapshot(15), 'cover.fcc_alternate': { state: 'open', attributes: { supported_features: 1 } } };
  const override = { entity: 'cover.fcc_alternate' };
  assert.equal(coverIntent(states, override, 'open').target, override.entity);
  assert.equal(coverControl(states, override, 'close').enabled, false);
  assert.equal(coverControl(states, binding, 'close').enabled, true);
  assert.equal(coverControl(states, { entity: 'sensor.fcc_height' }, 'open').enabled, false);
});

test('each exact typed cover descriptor preserves finite percent without coercion', () => {
  for (const [action, service] of [['open', 'open_cover'], ['close', 'close_cover'], ['stop', 'stop_cover'], ['position', 'set_cover_position']]) {
    const intent = coverIntent(snapshot(15), binding, action, 37.5);
    assert.equal(intent.service, service);
    assert.deepEqual(intent.data, action === 'position' ? { position: 37.5 } : {});
    assert.ok(Object.isFrozen(intent) && Object.isFrozen(intent.data));
  }
  for (const value of [undefined, null, NaN, Infinity, -1, 101, '42']) assert.throws(() => coverIntent(snapshot(15), binding, 'position', value));
});

test('unknown feedback stays null while capable available targets remain usable', () => {
  for (const value of [undefined, null, 'unknown', 'bad', '', -1, 101]) assert.equal(actualPosition({ [binding.entity]: { state: 'unknown', attributes: { supported_features: 15, current_position: value } } }, binding.entity), null);
  assert.equal(coverControl(snapshot(15, 'unknown', null), binding, 'position').enabled, true);
  assert.equal(actualPosition(snapshot(15, 'open', 0), binding.entity), 0);
});
