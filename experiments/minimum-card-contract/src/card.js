import './recorder.js';

const TARGETS = ['input_boolean.mcc_target_a', 'input_boolean.mcc_target_b', 'input_boolean.mcc_target_body'];
const FIELDS = ['a_source', 'a_target', 'a_label', 'b_source', 'b_target', 'b_label', 'body_target', 'body_label', 'confirm'];
const LABELS = {a_source:'Slot A display', a_target:'Slot A action target', a_label:'Slot A label', b_source:'Slot B display', b_target:'Slot B action target', b_label:'Slot B label', body_target:'Body action target', body_label:'Body action label', confirm:'Confirm synthetic intent'};
const STRINGS = {
  en:{missing:'Missing source',unknown:'Unknown',unavailable:'Unavailable',recorded:'Intent recorded',cancelled:'Cancelled',rejected:'Rejected',idle:'Record synthetic intent'},
  pt:{missing:'Fonte ausente',unknown:'Desconhecido',unavailable:'Indisponível',recorded:'Intenção registrada',cancelled:'Cancelado',rejected:'Rejeitado',idle:'Registrar intenção sintética'},
};
function normalize(config) {
  if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('Configuration must be an object');
  const allowed = ['type', ...FIELDS, 'grid_options', 'visibility', 'layout_options'];
  if (Object.keys(config).some(key => !allowed.includes(key))) throw new Error('Unsupported experimental configuration field');
  for (const slot of ['a','b']) {
    if (!/^input_number\.mcc_[a-z_]+$/.test(config[slot + '_source'] ?? '')) throw new Error(`Slot ${slot.toUpperCase()} requires a synthetic input_number display binding`);
    if (!TARGETS.includes(config[slot + '_target'])) throw new Error(`Slot ${slot.toUpperCase()} requires an allowlisted synthetic target`);
  }
  if (!TARGETS.includes(config.body_target)) throw new Error('Body action requires an allowlisted synthetic target');
  for (const name of ['a_label','b_label','body_label']) if (typeof config[name] !== 'string' || !config[name].trim()) throw new Error(`${name} requires a non-empty label`);
  if (config.confirm !== undefined && typeof config.confirm !== 'boolean') throw new Error('confirm must be boolean');
  return structuredClone(config);
}
function text(node, value) { if (node.textContent !== value) node.textContent = value; }
function attribute(node, name, value) { if (node.getAttribute(name) !== value) node.setAttribute(name,value); }

export class MinimumCardContract extends HTMLElement {
  static getStubConfig() {
    return {type:'custom:minimum-card-contract',a_source:'input_number.mcc_display_a',a_target:TARGETS[0],a_label:'First reading',b_source:'input_number.mcc_display_b',b_target:TARGETS[1],b_label:'Second reading',body_target:TARGETS[2],body_label:'Body intent',confirm:false};
  }
  static getConfigForm() {
    return {
      schema:FIELDS.map(name => ({name,required:name !== 'confirm',selector:name.endsWith('_source')
        ? {entity:{domain:'input_number'}} : name.endsWith('_target') ? {entity:{domain:'input_boolean'}} : name === 'confirm' ? {boolean:{}} : {text:{}}})),
      computeLabel:schema => LABELS[schema.name],
      assertConfig:normalize,
    };
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    const link=document.createElement('link');
    link.rel='stylesheet'; link.href=new URL('./card.css',import.meta.url).href;
    const card=document.createElement('article');
    card.setAttribute('aria-label','Minimum card contract experiment');
    this.shadowRoot.append(link,card);
    this._nodes={};
    for (const slot of ['a','b','body']) {
      const button=document.createElement('button');
      button.type='button'; button.dataset.slot=slot;
      const label=document.createElement('span'); label.className='label';
      const value=document.createElement('span'); value.className='value';
      const status=document.createElement('span'); status.className='status'; status.setAttribute('aria-live','polite');
      button.append(label,value,status); card.append(button);
      this._nodes[slot]={button,label,value,status};
    }
    this._activate=this._onClick.bind(this);
    this._ownedListeners=0;
    this._statuses={};
  }
  setConfig(config) {
    // Clear stale normal output if a previously valid instance is reconfigured invalidly.
    try { this._config=normalize(config); } catch (error) {
      this._config=undefined;
      for (const node of Object.values(this._nodes)) {
        node.button.disabled=true; text(node.value,'Configuration error'); text(node.status,error.message);
      }
      throw error;
    }
    this._statuses={};
    this._render();
  }
  set hass(value) { this._hass=value; if (this.isConnected) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return Math.max(3, Math.ceil(this.getBoundingClientRect().height / 50)); }
  getGridOptions() { return {columns:12,rows:'auto',min_columns:3}; }
  connectedCallback() {
    if (!this._ownedListeners) { this.shadowRoot.addEventListener('click',this._activate); this._ownedListeners=1; }
    this._render();
  }
  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click',this._activate); this._ownedListeners=0;
    this._statuses={};
  }
  // Diagnostic accessor is read only; no observers/counters run in the renderer.
  get ownedResources() { return {listeners:this._ownedListeners,subscriptions:0,scheduled:0}; }
  _strings() { return this._hass?.language?.startsWith('pt') ? STRINGS.pt : STRINGS.en; }
  _usable(target) {
    const state=this._hass?.states?.[target];
    return TARGETS.includes(target) && !!state && !['unknown','unavailable'].includes(state.state);
  }
  _render() {
    if (!this._config || !this._hass || !this.isConnected) return;
    const strings=this._strings();
    for (const slot of ['a','b','body']) {
      const nodes=this._nodes[slot];
      const label=this._config[slot + '_label'];
      const target=this._config[slot + '_target'];
      let value='';
      if (slot !== 'body') {
        const state=this._hass.states[this._config[slot + '_source']];
        value=!state ? strings.missing : ['unknown','unavailable'].includes(state.state) ? strings[state.state]
          : this._hass.formatEntityState ? this._hass.formatEntityState(state)
          : Number.isFinite(Number(state.state)) ? new Intl.NumberFormat(this._hass.language).format(Number(state.state)) : state.state;
      }
      text(nodes.label,label); text(nodes.value,value);
      text(nodes.status,this._usable(target) ? strings[this._statuses[slot] ?? 'idle'] : strings.unavailable);
      attribute(nodes.button,'aria-label',label);
      const disabled=!this._usable(target);
      if (nodes.button.disabled !== disabled) nodes.button.disabled=disabled;
    }
  }
  _onClick(event) {
    const button=event.composedPath().find(node => node instanceof HTMLButtonElement && node.dataset.slot);
    if (!button) return;
    event.stopPropagation();
    if (!this.isConnected || !this._config || button.disabled) return;
    const slot=button.dataset.slot;
    const target=this._config[slot + '_target'];
    const outcome=this._usable(target) ? globalThis.mccRecorder.record(target,{confirm:this._config.confirm}) : {status:'rejected'};
    this._statuses[slot]=outcome.status;
    this._render();
  }
}
if (!customElements.get('minimum-card-contract')) customElements.define('minimum-card-contract',MinimumCardContract);
window.customCards ??= [];
if (!window.customCards.some(card=>card.type==='minimum-card-contract')) window.customCards.push({type:'minimum-card-contract',name:'Minimum card contract experiment',description:'Two synthetic slots. Local recorded intents only; no device commands.'});
