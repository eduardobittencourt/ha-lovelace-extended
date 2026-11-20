/** Source resolution never substitutes another entity or converts physical units. */
export function source(states, binding, attribute) {
  if (binding?.error) return { status: 'invalid', value: null, unit: null };
  if (!binding?.entity) return { status: 'missing', value: null, unit: null };
  const entity = states[binding.entity];
  if (!entity) return { status: 'missing', value: null, unit: null };
  if (entity.state === 'unavailable') return { status: 'unavailable', value: null, unit: null };
  const value = attribute ? entity.attributes?.[attribute] : entity.state;
  if (value === undefined || value === null || value === 'unknown' || value === 'unavailable') return { status: 'unknown', value: null, unit: entity.attributes?.unit_of_measurement ?? null };
  if (!['number', 'string', 'boolean'].includes(typeof value)) return { status: 'unsupported', value: null, unit: null };
  return { status: 'available', value, unit: entity.attributes?.unit_of_measurement ?? null };
}

export function finiteNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string' || !value.trim() || !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim())) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function numericSource(states, binding, attribute) {
  const result = source(states, binding, attribute);
  if (result.status !== 'available') return result;
  const value = finiteNumber(result.value);
  return value === null ? { ...result, status: 'nonnumeric', value: null } : { ...result, value };
}

export function identity(states, config) {
  const entity = states[config.primary_entity];
  const name = typeof config.name === 'string' && !config.name.trim() ? null : config.name;
  return { name: name || entity?.attributes?.friendly_name || 'Select a cover', icon: config.icon || entity?.attributes?.icon || 'mdi:desk' };
}
