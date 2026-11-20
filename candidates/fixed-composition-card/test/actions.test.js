import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { additionalIntent, createSink } from '../actions.js';
import { coverIntent } from '../cover.js';
const fixtures = JSON.parse(await readFile(new URL('./fixtures.json', import.meta.url)));
function harness(confirm = async () => true) {
  let states = structuredClone(fixtures), generation = 1, connected = true;
  const details = [];
  const sink = createSink({ states: () => states, context: () => ({ generation, connected }), confirm, details: target => details.push(target) });
  return { sink, details, states, reconfigure() { generation++; }, disconnect() { connected = false; } };
}

test('all three memory targets, unknown available button, UI-only details and none', async () => {
  const h = harness();
  for (let n = 1; n <= 3; n++) assert.equal((await h.sink.record(additionalIntent('press', `button.fcc_memory_${n}`, `action_${n}`))).status, 'recorded');
  assert.deepEqual(h.sink.events.map(e => e.target), ['button.fcc_memory_1', 'button.fcc_memory_2', 'button.fcc_memory_3']);
  assert.equal((await h.sink.record(additionalIntent('more-info', 'cover.fcc_primary', 'body'))).status, 'recorded');
  assert.deepEqual(h.details, ['cover.fcc_primary']);
  assert.equal((await h.sink.record(additionalIntent('none'))).status, 'none');
  assert.equal(h.sink.events.length, 4);
});

test('real targets, unsupported actions, wrong domain and malformed data are rejected', async () => {
  const h = harness();
  const position = coverIntent(h.states, { entity: 'cover.fcc_primary' }, 'position', 42);
  for (const intent of [additionalIntent('press', 'button.real', 'action_1'), { ...position, service: 'unlock' }, { ...position, data: { position: NaN } }, { ...position, data: { position: 42, extra: true } }, { ...position, extra: true }, { ...position, target: 'sensor.fcc_height' }, { ...position, data: null }]) {
    assert.equal((await h.sink.record(intent)).status, 'rejected');
  }
  assert.equal(h.sink.events.length, 0);
});

test('confirmation cancellation, stale generations and target loss cannot record', async () => {
  for (const mutate of [h => h.reconfigure(), h => h.disconnect(), h => { h.states['button.fcc_memory_1'].state = 'unavailable'; }, h => { delete h.states['button.fcc_memory_1']; }]) {
    let release;
    const h = harness(() => new Promise(resolve => { release = resolve; }));
    const pending = h.sink.record(additionalIntent('press', 'button.fcc_memory_1', 'action_1'), { confirmation: true });
    mutate(h); release(true);
    assert.equal((await pending).status, 'rejected');
    assert.equal(h.sink.events.length, 0);
  }
  const h = harness(async () => false);
  assert.equal((await h.sink.record(additionalIntent('press', 'button.fcc_memory_1'), { confirmation: true })).status, 'cancelled');
  assert.equal(h.sink.events.length, 0);
});

test('injected errors/cancel/reject never record or invoke any service transport', async () => {
  const h = harness();
  const descriptor = additionalIntent('press', 'button.fcc_memory_1', 'action_1');
  for (const outcome of ['error', 'cancel', 'reject']) {
    h.sink.inject(outcome);
    assert.equal((await h.sink.record(descriptor)).status, { error: 'error', cancel: 'cancelled', reject: 'rejected' }[outcome]);
  }
  assert.equal(h.sink.events.length, 0);
  const data = { position: 23 };
  let release;
  const delayed = harness(() => new Promise(resolve => { release = resolve; }));
  const promise = delayed.sink.record({ ...coverIntent(delayed.states, { entity: 'cover.fcc_primary' }, 'position', 23), data }, { confirmation: true });
  data.position = 99; release(true); await promise;
  assert.equal(delayed.sink.events[0].data.position, 23);
});
