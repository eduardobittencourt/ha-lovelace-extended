import { normalizeConfig } from './config.js';
import { source, numericSource, identity } from './bindings.js';
import { actualPosition, coverControl } from './cover.js';
import { additionalIntent, configuredIntent, createActionDispatcher } from './actions.js';
import { PositionController } from './position.js';
import { patchIcon, showDetails, formatValue, verifiedPilotFrontend } from './ha-adapter.js';
import { css } from './styles.js';
import { configForm, stubConfig } from './form.js';

const setText = (node, value) => { if (node.textContent !== value) node.textContent = value; };
const setDisabled = (node, value) => { if (node.disabled !== value) node.disabled = value; };
const bodyUsable = (states, target) => !!target && !!states[target] && states[target].state !== 'unavailable';
const commandStatus = {
  pending: 'Sending command…', completed: 'Home Assistant completed the command request',
  cancelled: 'Command cancelled', uncertain: 'Command outcome unknown after disconnect',
};

export class DeskPilotCard extends HTMLElement {
  #preview;
  #connection;
  #frontendVerified = false;

  static getConfigForm() { return configForm(); }
  static getStubConfig() { return stubConfig(); }
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.generation = 0; this.model = normalizeConfig({});
    this.context = { states: {}, language: 'en' };
    this.position = new PositionController(); this.listenerCount = 0; this.nodes = {};
    const style = document.createElement('style'); style.textContent = css; this.shadowRoot.append(style);
    const article = document.createElement('article'); this.shadowRoot.append(article);
    const make = (tag, parent, role, text) => {
      const node = document.createElement(tag);
      if (role) { node.dataset.role = role; this.nodes[role] = node; }
      if (text) node.textContent = text;
      parent.append(node); return node;
    };
    const body = make('button', article, 'body'); body.className = 'identity'; body.type = 'button';
    make('ha-icon', body, 'icon').setAttribute('aria-hidden', 'true');
    const info = make('span', body); info.className = 'information';
    for (const role of ['name', 'state', 'actual', 'height', 'icon-warning']) make('span', info, role);
    const primary = make('div', article); primary.className = 'primary';
    for (const [role, label] of [['open', 'Open'], ['close', 'Close'], ['stop', 'Stop']]) {
      const slot = make('div', primary); slot.className = 'slot';
      const button = make('button', slot, role, label); button.type = 'button';
      make('span', slot, `${role}-status`).className = 'status';
    }
    const position = make('div', article); position.className = 'position';
    const label = make('label', position, null, 'Requested position (%)'); label.htmlFor = 'requested';
    const range = make('input', position, 'range'); range.id = 'requested'; range.type = 'range'; range.min = '0'; range.max = '100'; range.step = '1';
    range.setAttribute('aria-describedby', 'position-help');
    make('output', position, 'requested');
    const helper = make('span', position, 'position-help', 'Drag and release once. Arrows adjust; Enter commits; Escape or leaving focus cancels.'); helper.id = 'position-help'; helper.className = 'helper';
    make('span', position, 'position-status').className = 'status';
    const additional = make('div', article); additional.className = 'additional';
    for (let n = 1; n <= 3; n++) {
      const slot = make('div', additional); slot.className = 'slot';
      const button = make('button', slot, `action_${n}`, `Action ${n}`); button.type = 'button';
      make('span', slot, `action_${n}-status`).className = 'status';
    }
    make('span', article, 'body-status').className = 'status';
    make('p', article, 'validation').className = 'validation';
    make('p', article, 'transport').className = 'helper';
    for (const [key, node] of Object.entries(this.nodes)) {
      if (key.endsWith('-status')) node.setAttribute('aria-live', 'polite');
    }
    this.actions = createActionDispatcher({
      context: () => ({
        model: this.model, states: this.context.states ?? {}, hass: this.context,
        mounted: this.isConnected, enabled: this.#commandsEnabled(),
        connected: this.#connection?.connected === true, connection: this.#connection,
        generation: this.generation,
      }),
      confirm: intent => globalThis.confirm(`Send the ${intent.origin === 'position' ? `position ${intent.data.position}%` : this.nodes[intent.origin].textContent} command to Home Assistant?`),
      details: entity => showDetails(this, entity),
      report: (role, status, reason) => setText(this.nodes[`${role}-status`], reason ?? commandStatus[status] ?? ''),
    });
    this.render();
  }
  setConfig(config) {
    this.model = normalizeConfig(config); this.config = this.model.config; this.generation++;
    this.actions.invalidate(); this.position.cancel(); this.clearStatuses(); this.render();
  }
  set hass(value) {
    const oldVersion = this.context.config?.version;
    this.context = value || { states: {} };
    if (this.isConnected) {
      if (this.#connection !== this.context.connection) this.#watchConnection(this.context.connection);
      else if (oldVersion !== this.context.config?.version) this.#checkFrontend();
    }
    this.render();
  }
  get preview() { return this.#preview; }
  set preview(value) {
    const preview = typeof value === 'boolean' ? value : undefined;
    if (preview === this.#preview) return;
    this.#preview = preview;
    this.generation++;
    this.actions.invalidate(); this.position.cancel(); this.clearStatuses();
    this.#checkFrontend(); this.render();
  }
  #commandsEnabled() {
    return this.#preview === false && this.#frontendVerified && this.#connection?.connected === true;
  }
  #checkFrontend() {
    this.#frontendVerified = false;
    const hass = this.context;
    const connection = this.#connection;
    if (this.#preview !== false || !this.isConnected || !connection?.connected) return;
    void verifiedPilotFrontend(hass).then(verified => {
      if (this.isConnected && this.#preview === false && connection === this.#connection &&
          hass.config?.version === this.context.config?.version && connection.connected) {
        this.#frontendVerified = verified;
        this.render();
      }
    });
  }
  #connectionChanged = () => {
    if (!this.#connection?.connected) {
      this.actions.invalidate({ uncertain: true });
      this.position.cancel();
    }
    this.#checkFrontend(); this.render();
  };
  #watchConnection(connection) {
    if (connection === this.#connection) return;
    for (const event of ['ready', 'disconnected']) {
      this.#connection?.removeEventListener?.(event, this.#connectionChanged);
      connection?.addEventListener?.(event, this.#connectionChanged);
    }
    this.actions.invalidate({ uncertain: this.isConnected });
    this.position.cancel();
    this.#connection = connection;
    this.#checkFrontend();
  }
  getCardSize() { return 7; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() {
    this.generation++; this.handlers = new AbortController();
    this.#watchConnection(this.context.connection);
    const on = (target, event, callback) => { target.addEventListener(event, callback, { signal: this.handlers.signal }); this.listenerCount++; };
    for (const role of ['body', 'open', 'close', 'stop', 'action_1', 'action_2', 'action_3']) {
      on(this.nodes[role], 'click', event => { event.stopPropagation(); if (event.detail <= 1) void this.activate(role); });
      on(this.nodes[role], 'keydown', event => { if (event.repeat && ['Enter', ' '].includes(event.key)) event.preventDefault(); });
    }
    const range = this.nodes.range;
    on(range, 'pointerdown', event => {
      event.stopPropagation();
      if (event.isPrimary && event.button === 0 && this.position.begin(event.pointerId)) { this.pointerId = event.pointerId; range.setPointerCapture(event.pointerId); }
    });
    on(range, 'input', event => {
      event.stopPropagation();
      if (this.position.active) this.position.preview(Number(range.value), this.position.active.pointerId);
      this.renderPosition();
    });
    on(range, 'pointerup', event => {
      event.stopPropagation(); const token = this.position.release(event.pointerId);
      if (range.hasPointerCapture(event.pointerId)) range.releasePointerCapture(event.pointerId);
      this.pointerId = null; this.renderPosition(); if (token) void this.commitPosition(token);
    });
    for (const reason of ['pointercancel', 'lostpointercapture']) on(range, reason, event => { event.stopPropagation(); this.position.interrupt(reason, event.pointerId); this.renderPosition(); });
    for (const eventName of ['change', 'click']) on(range, eventName, event => event.stopPropagation());
    on(range, 'keydown', event => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', 'Escape'].includes(event.key)) {
        event.preventDefault(); event.stopPropagation();
        const token = this.position.key(event.key, { repeat: event.repeat }); this.renderPosition(); if (token) void this.commitPosition(token);
      }
    });
    on(range, 'blur', () => { this.position.interrupt('blur'); this.renderPosition(); });
    on(window, 'blur', () => { this.position.interrupt('blur'); this.renderPosition(); });
    this.render();
  }
  disconnectedCallback() {
    this.generation++; this.handlers?.abort(); this.handlers = null; this.listenerCount = 0; this.position.interrupt('disconnect');
    this.#watchConnection(undefined);
    if (this.pointerId != null && this.nodes.range.hasPointerCapture(this.pointerId)) this.nodes.range.releasePointerCapture(this.pointerId);
    this.pointerId = null; this.clearStatuses();
  }
  clearStatuses() { for (const [key, node] of Object.entries(this.nodes)) if (key.endsWith('-status')) setText(node, ''); }
  render() {
    const states = this.context.states ?? {}, model = this.model, config = model.config;
    const invalid = Object.keys(model.errors).length > 0;
    const language = this.context.locale?.language || this.context.language || 'en';
    setText(this.nodes.transport, this.#commandsEnabled() ? '' : 'Device commands are unavailable in this view or connection.');
    const info = identity(states, config);
    setText(this.nodes.name, typeof info.name === 'string' ? info.name : 'Invalid name');
    const iconOK = patchIcon(this.nodes.icon, !model.errors.icon && typeof info.icon === 'string' ? info.icon : 'mdi:desk');
    setText(this.nodes['icon-warning'], iconOK ? '' : 'Icon unavailable');
    const display = (result, prefix) => result.status === 'available' ? `${prefix}: ${formatValue(result.value, language)}${result.unit ? ' ' + result.unit : ''}` : `${prefix}: ${result.status}`;
    setText(this.nodes.state, display(source(states, model.roles.state, config.state_attribute), 'State'));
    setText(this.nodes.height, display(numericSource(states, model.roles.height, config.height_attribute), 'Height'));
    const actual = actualPosition(states, config.primary_entity);
    setText(this.nodes.actual, actual === null ? 'Actual cover: unknown' : `Actual cover: ${formatValue(actual, language)} %`);
    setDisabled(this.nodes.body, invalid || model.bodyAction !== 'more-info' || !bodyUsable(states, model.roles.body.entity));
    for (const role of ['open', 'close', 'stop']) {
      const control = coverControl(states, model.roles[role], role);
      setDisabled(this.nodes[role], invalid || !control.enabled);
      if (this.nodes[role].title !== (control.reason || '')) this.nodes[role].title = control.reason || '';
    }
    const position = coverControl(states, model.roles.position, 'position');
    this.position.update({ connected: this.isConnected, generation: this.generation, target: model.roles.position.entity, enabled: !invalid && position.enabled, capabilities: states[model.roles.position.entity]?.attributes?.supported_features }, actualPosition(states, model.roles.position.entity));
    setDisabled(this.nodes.range, invalid || !position.enabled);
    for (let n = 1; n <= 3; n++) {
      const action = model.actions[n - 1];
      setText(this.nodes[`action_${n}`], typeof action.label === 'string' ? action.label : 'Invalid action label');
      const intent = ['press', 'more-info', 'none'].includes(action.type) ? additionalIntent(action.type, action.target.entity, `action_${n}`) : null;
      const usable = intent && bodyUsable(states, intent.target) && (action.type !== 'press' || intent.target.startsWith('button.'));
      setDisabled(this.nodes[`action_${n}`], invalid || !usable || !!action.target.error);
    }
    setText(this.nodes.validation, Object.entries(model.errors).map(([field, error]) => `${field}: ${error}`).join('; '));
    this.renderPosition();
  }
  renderPosition() {
    const { draft, feedback } = this.position;
    const value = draft ?? feedback ?? 50;
    if (Number(this.nodes.range.value) !== Math.round(value)) this.nodes.range.value = String(Math.round(value));
    setText(this.nodes.requested, draft === null ? 'Requested: not selected' : `Requested: ${draft} % (local preview)`);
    const aria = draft === null ? (feedback === null ? 'Unknown actual position; select a requested percent' : `Actual target ${feedback} percent; requested position not selected`) : `Requested ${draft} percent; actual target ${feedback ?? 'unknown'}`;
    if (this.nodes.range.getAttribute('aria-valuetext') !== aria) this.nodes.range.setAttribute('aria-valuetext', aria);
    if (this.position.error) setText(this.nodes['position-status'], this.position.error);
  }
  async activate(role) {
    try {
      const intent = configuredIntent(this.model, this.context.states ?? {}, role);
      await this.actions.dispatch(intent);
    } catch (error) { setText(this.nodes[`${role}-status`], error.message); }
  }
  async commitPosition(token) {
    try {
      const intent = configuredIntent(this.model, this.context.states ?? {}, 'position', token.value);
      await this.actions.dispatch(intent, { valid: () => this.position.valid(token) });
    } catch (error) { setText(this.nodes['position-status'], error.message); }
    finally { this.position.finish(token); }
  }
  diagnostics() { return { listeners: this.listenerCount, scheduled: 0, gesture: this.position.active !== null, pending: this.position.pending !== null }; }
}
if (!customElements.get('lovelace-extended-desk-pilot')) customElements.define('lovelace-extended-desk-pilot', DeskPilotCard);
globalThis.customCards ??= [];
if (!globalThis.customCards.some(card => card.type === 'lovelace-extended-desk-pilot')) globalThis.customCards.push({ type: 'lovelace-extended-desk-pilot', name: 'Lovelace Extended Desk Pilot', description: 'Fixed desk controls and three independent memory actions.', preview: true });
