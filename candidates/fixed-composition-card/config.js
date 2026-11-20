/** Candidate-only flat format. Invalid explicit bindings never inherit. */
const textFields = ['primary_entity', 'name', 'icon', 'state_entity', 'state_attribute',
  'height_entity', 'height_attribute', 'open_target', 'close_target', 'stop_target',
  'position_target', 'body_action', 'body_target'];
for (let n = 1; n <= 3; n++) textFields.push(`action_${n}_label`, `action_${n}_type`, `action_${n}_target`);
export const fields = Object.freeze([...textFields, 'confirm']);
export const entityPattern = /^[a-z][a-z0-9_]*\.[a-z0-9_]+$/;
const absent = value => value === undefined || value === '';

export function normalizeConfig(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Configuration must be an object');
  const errors = {};
  const config = { ...input };
  for (const key of Object.keys(config)) {
    // HA-owned allocation/visibility metadata is preserved, not interpreted.
    if (!['type', 'grid_options', 'visibility', 'layout_options'].includes(key) && !fields.includes(key)) errors[key] = 'Unsupported field';
  }
  for (const key of textFields) {
    if (!absent(config[key]) && typeof config[key] !== 'string') errors[key] = 'Expected text';
  }
  if (config.confirm !== undefined && typeof config.confirm !== 'boolean') errors.confirm = 'Expected a boolean';
  const primary = config.primary_entity;
  if (typeof primary !== 'string' || !entityPattern.test(primary) || !primary.startsWith('cover.')) {
    errors.primary_entity = 'Select a cover entity';
  }
  if (!absent(config.icon) && (typeof config.icon !== 'string' || !/^[a-z0-9_-]+:[a-z0-9_-]+$/i.test(config.icon))) errors.icon = 'Expected an icon identifier';
  for (const key of ['state_attribute', 'height_attribute']) {
    if (!absent(config[key]) && (typeof config[key] !== 'string' || !/^[a-zA-Z0-9_]+$/.test(config[key]))) errors[key] = 'Expected an attribute name';
  }
  const binding = (key, inherit = false) => {
    const inherited = absent(config[key]) && inherit;
    const entity = inherited ? primary : config[key];
    if (!absent(entity) && (typeof entity !== 'string' || !entityPattern.test(entity))) errors[key] = 'Invalid entity identifier';
    return Object.freeze({ entity: absent(entity) ? null : entity, inherited, error: errors[key] ?? null });
  };
  const roles = {
    state: binding('state_entity', true), height: binding('height_entity'),
    open: binding('open_target', true), close: binding('close_target', true),
    stop: binding('stop_target', true), position: binding('position_target', true),
    body: binding('body_target', true),
  };
  const bodyAction = absent(config.body_action) ? 'none' : config.body_action;
  if (!['none', 'more-info'].includes(bodyAction)) errors.body_action = 'Choose none or more-info';
  const actions = [];
  for (let n = 1; n <= 3; n++) {
    const typeKey = `action_${n}_type`;
    const type = absent(config[typeKey]) ? 'none' : config[typeKey];
    if (!['press', 'more-info', 'none'].includes(type)) errors[typeKey] = 'Choose press, more-info or none';
    const target = binding(`action_${n}_target`);
    if (type !== 'none' && !target.entity) errors[`action_${n}_target`] = 'Select an action target';
    const label = config[`action_${n}_label`];
    actions.push(Object.freeze({ type, target, label: absent(label) || (typeof label === 'string' && !label.trim()) ? `Action ${n}` : label }));
  }
  return { config: Object.freeze(config), errors: Object.freeze(errors), roles: Object.freeze(roles), actions: Object.freeze(actions), bodyAction, confirm: config.confirm === true };
}
