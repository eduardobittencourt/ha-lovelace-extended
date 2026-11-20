/** Pinned frontend 20261028.5 integration. No private DOM/action helpers. */
export function patchIcon(element, icon) {
  const supported = !!customElements.get('ha-icon');
  if (element.hidden === supported) element.hidden = !supported;
  if (supported && element.icon !== icon) element.icon = icon;
  return supported;
}
export function showDetails(host, entity) {
  if (!host.isConnected) throw new Error('Disconnected details adapter');
  host.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: entity } }));
}
export function formatValue(value, language) {
  return typeof value === 'number' ? new Intl.NumberFormat(language || 'en', { maximumFractionDigits: 3 }).format(value) : String(value);
}
