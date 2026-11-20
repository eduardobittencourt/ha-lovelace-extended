import test from 'node:test';
import assert from 'node:assert/strict';
import { PositionController } from '../position.js';
import { createSink } from '../actions.js';
import { coverIntent } from '../cover.js';
const context = { connected: true, generation: 1, target: 'cover.fcc_primary', enabled: true, capabilities: 15 };
function controller(feedback = 42) {
  const p = new PositionController(); p.update(context, feedback); return p;
}

test('many previews produce one final token, duplicate/foreign completion produces none', () => {
  const p = controller();
  assert.equal(p.begin(7), true);
  for (const value of [43, 50, 61, 79]) { assert.equal(p.preview(value, 7), true); assert.equal(p.pending, null); }
  assert.equal(p.preview(91, 8), false);
  assert.equal(p.release(8), null);
  const token = p.release(7);
  assert.equal(token.value, 79);
  assert.ok(p.valid(token));
  assert.equal(p.release(7), null);
  assert.equal(p.feedback, 42);
  p.finish(token); assert.equal(p.valid(token), false);
});

test('unchanged gesture and preview returning to baseline never commit', () => {
  const p = controller(); p.begin(1); assert.equal(p.release(1), null);
  p.begin(1); p.preview(50, 1); p.preview(42, 1); assert.equal(p.release(1), null);
});

test('concurrent real feedback stays separate from the draft and cancellation restores current feedback', () => {
  const p = controller(); p.begin(1); p.preview(60, 1); p.update(context, 51);
  assert.equal(p.draft, 60); assert.equal(p.feedback, 51);
  p.cancel(); assert.equal(p.draft, null); assert.equal(p.feedback, 51);
  assert.equal(p.release(1), null);
});

test('unknown feedback requires explicit selection and never fabricates zero', () => {
  const p = controller(null); assert.equal(p.feedback, null); p.begin(1);
  assert.equal(p.draft, null); assert.equal(p.release(1), null);
  p.begin(1); p.preview(0, 1); const token = p.release(1);
  assert.equal(token.value, 0); assert.equal(p.feedback, null);
});

test('pointer cancellation, unexpected capture loss, Escape and focus loss never replay', () => {
  for (const reason of ['pointercancel', 'lostpointercapture', 'Escape', 'blur', 'disconnect']) {
    const p = controller(); p.begin(8); p.preview(79, 8);
    p.interrupt(reason, 8);
    assert.equal(p.release(8), null);
    assert.equal(p.draft, null);
    p.update(context, 51); assert.equal(p.release(8), null);
  }
  const p = controller(); p.begin(8); p.preview(79, 8); const token = p.release(8);
  p.interrupt('lostpointercapture', 8); assert.ok(p.valid(token));
});

test('configuration, target, capability, availability and disconnect invalidate pending confirmation', () => {
  for (const change of [{ generation: 2 }, { target: 'cover.fcc_alternate' }, { capabilities: 7 }, { enabled: false }, { connected: false }]) {
    const p = controller(); p.begin(1); p.preview(60, 1); const token = p.release(1);
    p.update({ ...context, ...change }, 52); assert.equal(p.valid(token), false);
    p.update(context, 55); assert.equal(p.valid(token), false); assert.equal(p.release(1), null);
  }
});

test('keyboard arrows remain local, Enter commits once, repeat and later change cannot commit', () => {
  const p = controller();
  p.key('ArrowRight'); p.key('ArrowRight'); assert.equal(p.draft, 44); assert.equal(p.pending, null);
  assert.equal(p.key('Enter', { repeat: true }), null);
  const token = p.key('Enter'); assert.equal(token.value, 44);
  assert.equal(p.key('Enter'), null); assert.equal(p.release('keyboard'), null);
  p.key('Home'); p.key('Escape'); assert.equal(p.key('Enter'), null);
  const unknown = controller(null); unknown.key('End'); assert.equal(unknown.key('Enter').value, 100); assert.equal(unknown.feedback, null);
});

test('nonfinite and out-of-range requests reject without substitution', () => {
  for (const value of [NaN, Infinity, -1, 101, '42', null]) {
    const p = controller(); p.begin(1); assert.equal(p.preview(value, 1), false);
    assert.ok(p.error); assert.equal(p.release(1), null); assert.equal(p.feedback, 42);
  }
});

test('a claimed position token cancelled during confirmation records nothing', async () => {
  const p = controller(); p.begin(1); p.preview(71, 1); const token = p.release(1);
  const states = { 'cover.fcc_primary': { state: 'open', attributes: { supported_features: 15 } } };
  let resolve;
  const sink = createSink({ states: () => states, context: () => context, confirm: () => new Promise(r => { resolve = r; }) });
  const pending = sink.record(coverIntent(states, { entity: context.target }, 'position', token.value), { confirmation: true, valid: () => p.valid(token) });
  p.interrupt('blur'); resolve(true);
  assert.equal((await pending).status, 'rejected'); assert.equal(sink.events.length, 0);
});
