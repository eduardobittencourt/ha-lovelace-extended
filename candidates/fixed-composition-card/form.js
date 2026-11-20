import { fields, normalizeConfig } from './config.js';

const labels = {
  primary_entity: 'Primary cover', name: 'Display name', icon: 'Display icon',
  state_entity: 'State source', state_attribute: 'State attribute',
  height_entity: 'Height source', height_attribute: 'Height attribute',
  open_target: 'Open target', close_target: 'Close target', stop_target: 'Stop target', position_target: 'Position target',
  body_action: 'Body action', body_target: 'Body details target', confirm: 'Confirm synthetic intent',
};
for (let n = 1; n <= 3; n++) {
  labels[`action_${n}_label`] = `Action ${n} label`;
  labels[`action_${n}_type`] = `Action ${n} type`;
  labels[`action_${n}_target`] = `Action ${n} target`;
}
const choices = types => ({ select: { mode: 'dropdown', options: types.map(value => ({ value, label: { none: 'No action', press: 'Button press', 'more-info': 'Entity details' }[value] })) } });

export function configForm() {
  return {
    schema: fields.map(name => ({ name, required: name === 'primary_entity', selector:
      name === 'confirm' ? { boolean: {} } : name === 'icon' ? { icon: {} } :
      name === 'body_action' ? choices(['none', 'more-info']) :
      name.endsWith('_type') ? choices(['none', 'press', 'more-info']) :
      name === 'primary_entity' || ['open_target', 'close_target', 'stop_target', 'position_target'].includes(name) ? { entity: { domain: 'cover' } } :
      name.endsWith('_entity') || name.endsWith('_target') ? { entity: {} } : { text: {} } })),
    computeLabel: schema => labels[schema.name],
    assertConfig(input) {
      normalizeConfig(input);
      for (const [key, value] of Object.entries(input)) {
        if (key === 'confirm' && typeof value !== 'boolean') throw new Error('confirm must be a boolean');
        if (fields.includes(key) && key !== 'confirm' && value !== undefined && typeof value !== 'string') throw new Error(`${key} must be text`);
      }
    },
  };
}

export function stubConfig() {
  return { type: 'custom:fixed-composition-card', action_1_type: 'none', action_2_type: 'none', action_3_type: 'none', body_action: 'none', confirm: false };
}
