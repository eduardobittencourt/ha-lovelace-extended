import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizeConfig } from '../config.js';
import { source, numericSource, identity } from '../bindings.js';
const states = JSON.parse(await readFile(new URL('./fixtures.json', import.meta.url)));
const base = { primary_entity: 'cover.fcc_primary', height_entity: 'sensor.fcc_height' };

test('empty fillable config and structural errors have no guessed target', () => {
  const empty = normalizeConfig({});
  assert.ok(empty.errors.primary_entity);
  assert.equal(empty.roles.open.entity, null);
  for (const invalid of [null, [], 'bad']) assert.throws(() => normalizeConfig(invalid));
  const invalid = normalizeConfig({ ...base, confirm: 'yes', icon: '<img>', extra: 'unsupported' });
  for (const key of ['confirm', 'icon', 'extra']) assert.ok(invalid.errors[key]);
});

test('independent single-role edits preserve primary defaults and sibling roles', () => {
  const original = normalizeConfig(base);
  const changed = normalizeConfig({ ...base, state_entity: 'sensor.fcc_alternate', open_target: 'cover.fcc_alternate' });
  assert.equal(changed.roles.open.entity, 'cover.fcc_alternate');
  assert.equal(changed.roles.close.entity, original.roles.close.entity);
  assert.deepEqual(changed.roles.height, original.roles.height);
  assert.equal(changed.roles.state.inherited, false);
  assert.equal(original.roles.state.inherited, true);
  assert.equal(identity(states, base).name, 'Synthetic desk');
  assert.deepEqual(identity(states, { ...base, name: 'Override', icon: 'mdi:table' }), { name: 'Override', icon: 'mdi:table' });
});

test('broken explicit binding never falls back; attribute and unit meaning survives', () => {
  const model = normalizeConfig({ ...base, state_entity: 'sensor.absent' });
  assert.equal(source(states, model.roles.state).status, 'missing');
  const bad = normalizeConfig({ ...base, height_entity: 3 });
  assert.equal(numericSource(states, bad.roles.height).status, 'invalid');
  assert.deepEqual(numericSource(states, model.roles.height), { status: 'available', value: 83.5, unit: 'cm' });
  assert.equal(source(states, normalizeConfig(base).roles.state, 'current_position').value, 42);
  assert.equal(source(states, normalizeConfig(base).roles.state, 'absent').status, 'unknown');
  assert.equal(numericSource(states, normalizeConfig({ ...base, height_entity: 'sensor.fcc_alternate' }).roles.height).unit, 'in');
  assert.equal(numericSource(states, normalizeConfig({ primary_entity: base.primary_entity }).roles.height).value, null);
});

test('numeric failures stay absent, including blanks and null, without percent conversion', () => {
  for (const value of ['unknown', 'unavailable', '', 'text', null, Infinity, NaN, {}, false]) {
    const snapshot = { ...states, 'sensor.fcc_height': { state: value, attributes: { unit_of_measurement: 'cm' } } };
    assert.equal(numericSource(snapshot, normalizeConfig(base).roles.height).value, null);
  }
});

test('whitespace labels retain accessible defaults without changing saved input or targets', () => {
  const input = { ...base, name: '   ', action_1_label: ' \t ' };
  const model = normalizeConfig(input);
  assert.equal(model.actions[0].label, 'Action 1');
  assert.equal(identity(states, input).name, 'Synthetic desk');
  assert.equal(model.config.action_1_label, ' \t ');
  assert.equal(model.roles.open.entity, base.primary_entity);
});
