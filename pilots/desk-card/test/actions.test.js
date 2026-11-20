import test from 'node:test';
import assert from 'node:assert/strict';
import { additionalIntent, configuredIntent, createActionDispatcher } from '../actions.js';
import { normalizeConfig } from '../config.js';

const cover = 'cover.test_desk';
const memories = ['button.test_memory_one', 'button.test_memory_two', 'button.test_memory_three'];
const configuration = {
  primary_entity: cover, body_action: 'more-info',
  ...Object.fromEntries(memories.flatMap((target, index) => [
    [`action_${index + 1}_type`, 'press'],
    [`action_${index + 1}_target`, target],
  ])),
};

function harness({ confirm, config, callService } = {}) {
  const calls = [];
  const details = [];
  const reports = [];
  const context = {
    model: normalizeConfig({ ...configuration, ...config }),
    states: {
      [cover]: { state: 'open', attributes: { supported_features: 15 } },
      ...Object.fromEntries(memories.map(memory => [memory, { state: 'unknown' }])),
    },
    hass: { callService: (...args) => calls.push(args) },
    mounted: true, enabled: true, connected: true, connection: {}, generation: 1,
  };
  const actions = createActionDispatcher({
    context: () => context, confirm, callService,
    details: target => details.push(target), report: (...status) => reports.push(status),
  });
  const intent = (role, value) => configuredIntent(context.model, context.states, role, value);
  return { context, calls, details, reports, actions, intent };
}

test('one exact HA invocation for each configured cover control and memory role', async () => {
  const h = harness();
  for (const role of ['open', 'close', 'stop', 'position', 'action_1', 'action_2', 'action_3']) {
    assert.equal(await h.actions.dispatch(h.intent(role, 42)), 'completed');
  }
  assert.deepEqual(h.calls, [
    ['cover', 'open_cover', {}, { entity_id: cover }],
    ['cover', 'close_cover', {}, { entity_id: cover }],
    ['cover', 'stop_cover', {}, { entity_id: cover }],
    ['cover', 'set_cover_position', { position: 42 }, { entity_id: cover }],
    ...memories.map(target => ['button', 'press', {}, { entity_id: target }]),
  ]);
  assert.equal(await h.actions.dispatch(h.intent('body')), 'none');
  assert.deepEqual(h.details, [cover]);
  assert.equal(await h.actions.dispatch(additionalIntent('none')), 'none');
  assert.equal(h.calls.length, 7);
});

test('rejects invalid role, target, service, capability, availability and extra data', async () => {
  const h = harness();
  const position = h.intent('position', 42);
  const memory = h.intent('action_1');
  for (const invalid of [
    { ...memory, origin: 'action_2' },
    { ...memory, origin: 'body' },
    { ...memory, target: 'button.unknown' },
    { ...memory, target: cover },
    { ...memory, service: 'toggle' },
    { ...memory, area_id: 'room' },
    { ...position, data: { position: Infinity } },
    { ...position, data: { position: -1 } },
    { ...position, data: { position: 42, other: true } },
  ]) assert.equal(await h.actions.dispatch(invalid), 'rejected');
  h.context.states[cover].attributes.supported_features = 11;
  assert.equal(await h.actions.dispatch(position), 'rejected');
  h.context.states[memories[0]].state = 'unavailable';
  assert.equal(await h.actions.dispatch(memory), 'rejected');
  assert.deepEqual(h.calls, []);
});

test('revalidates after confirmation and before invoking the service', async () => {
  for (const change of [
    h => { h.context.generation++; },
    h => { h.context.connection = {}; },
    h => { h.context.connected = false; },
    h => { h.context.enabled = false; },
    h => { h.context.mounted = false; },
    h => { delete h.context.states[memories[0]]; },
    h => { h.context.model = normalizeConfig({ ...configuration, action_1_target: memories[1] }); },
  ]) {
    let resolve;
    const h = harness({ config: { confirm: true }, confirm: () => new Promise(done => { resolve = done; }) });
    const pending = h.actions.dispatch(h.intent('action_1'));
    change(h);
    resolve(true);
    assert.equal(await pending, 'rejected');
    assert.deepEqual(h.calls, []);
  }
  const h = harness({ config: { confirm: true }, confirm: () => false });
  assert.equal(await h.actions.dispatch(h.intent('action_1')), 'cancelled');
  assert.deepEqual(h.calls, []);

  let resolve;
  const changed = harness({ config: { confirm: true }, confirm: () => new Promise(done => { resolve = done; }) });
  const open = changed.actions.dispatch(changed.intent('open'));
  changed.context.states[cover].attributes.supported_features = 3;
  resolve(true);
  assert.equal(await open, 'rejected');
  assert.deepEqual(changed.calls, []);
});

test('pending commands deduplicate the same control and leave explicit stop usable', async () => {
  let resolve;
  const received = [];
  const h = harness({ callService: (_, intent) => {
    received.push(intent.service);
    if (intent.service === 'open_cover') return new Promise(done => { resolve = done; });
  } });
  const opening = h.actions.dispatch(h.intent('open'));
  assert.equal(await h.actions.dispatch(h.intent('open')), 'duplicate');
  assert.equal(await h.actions.dispatch(h.intent('stop')), 'completed');
  assert.deepEqual(received, ['open_cover', 'stop_cover']);
  resolve();
  assert.equal(await opening, 'completed');
  assert.deepEqual(h.reports.map(([role, status]) => [role, status]), [
    ['open', 'pending'], ['stop', 'pending'], ['stop', 'completed'], ['open', 'completed'],
  ]);
});

test('rejection, disconnect and late results are reported without replay or stale status', async () => {
  const denied = harness({ callService: () => Promise.reject({ code: 'unauthorized' }) });
  assert.equal(await denied.actions.dispatch(denied.intent('open')), 'error');
  assert.deepEqual(denied.reports.at(-1), ['open', 'error', 'Home Assistant denied this command']);

  let resolve;
  const disconnected = harness({ callService: () => new Promise(done => { resolve = done; }) });
  const old = disconnected.actions.dispatch(disconnected.intent('open'));
  disconnected.context.connected = false;
  disconnected.actions.invalidate({ uncertain: true });
  disconnected.context.connected = true;
  resolve();
  await old;
  assert.deepEqual(disconnected.reports, [['open', 'pending'], ['open', 'uncertain']]);
});
