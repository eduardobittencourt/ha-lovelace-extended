const percent = value => Number.isFinite(value) && value >= 0 && value <= 100;

/** Pure requested-value state; HA feedback is never replaced by a request. */
export class PositionController {
  constructor() {
    this.feedback = null;
    this.draft = null;
    this.active = null;
    this.dirty = false;
    this.epoch = 0;
    this.sequence = 0;
    this.context = { connected: false, generation: 0, target: null, enabled: false };
    this.pending = null;
    this.error = null;
  }

  update(context, feedback) {
    if (['connected', 'generation', 'target', 'enabled', 'capabilities'].some(key => this.context[key] !== context[key])) this.cancel();
    this.context = { ...context };
    this.feedback = percent(feedback) ? feedback : null;
  }

  begin(pointerId) {
    if (!this.context.connected || !this.context.enabled || this.active !== null) return false;
    this.epoch++;
    this.pending = null;
    this.active = { pointerId, baseline: this.feedback };
    this.draft = this.feedback;
    this.dirty = false;
    this.error = null;
    return true;
  }

  preview(value, pointerId) {
    if (!this.active || this.active.pointerId !== pointerId) return false;
    if (!percent(value)) {
      this.error = 'Position must be finite percent from 0 to 100';
      this.cancel();
      return false;
    }
    this.draft = value;
    this.dirty = value !== this.active.baseline;
    return true;
  }

  release(pointerId) {
    if (!this.active || this.active.pointerId !== pointerId) return null;
    const changed = this.dirty;
    const value = this.draft;
    this.active = null;
    this.draft = null;
    this.dirty = false;
    if (!changed || !percent(value) || !this.context.connected || !this.context.enabled) return null;
    const token = Object.freeze({ id: ++this.sequence, epoch: this.epoch, value, generation: this.context.generation, target: this.context.target });
    this.pending = token;
    return token;
  }

  valid(token) {
    return token !== null && token === this.pending && token.epoch === this.epoch &&
      this.context.connected && this.context.enabled && token.generation === this.context.generation &&
      token.target === this.context.target && percent(token.value);
  }

  finish(token) {
    if (token === this.pending) this.pending = null;
  }

  interrupt(reason, pointerId) {
    // Normal capture loss after release must not invalidate its claimed token.
    if (['pointercancel', 'lostpointercapture'].includes(reason)) {
      if (!this.active || this.active.pointerId !== pointerId) return;
    }
    this.cancel();
  }

  key(key, { repeat = false } = {}) {
    if (key === 'Escape') { this.cancel(); return null; }
    if (key === 'Enter') return repeat ? null : this.release('keyboard');
    const steps = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 };
    if (!(key in steps) && !['Home', 'End'].includes(key)) return null;
    if (!this.active && !this.begin('keyboard')) return null;
    if (this.active.pointerId !== 'keyboard') return null;
    const base = this.draft ?? this.feedback ?? 50;
    const value = key === 'Home' ? 0 : key === 'End' ? 100 : Math.max(0, Math.min(100, Math.round(base) + steps[key]));
    this.preview(value, 'keyboard');
    return null;
  }

  cancel() {
    this.epoch++;
    this.active = null;
    this.draft = null;
    this.dirty = false;
    this.pending = null;
  }
}
