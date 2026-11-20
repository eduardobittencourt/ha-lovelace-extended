/** Home Assistant presentation and version checks for the pilot. */
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
const verifiedCore = '2026.11.2';
const verifiedFrontend = '20261028.6';
const frontendChecks = new WeakMap();

export function verifiedPilotFrontend(hass) {
  const connection = hass?.connection;
  if (hass?.config?.version !== verifiedCore || !connection?.connected || typeof hass.callWS !== 'function') {
    return Promise.resolve(false);
  }
  if (!frontendChecks.has(connection)) {
    const check = Promise.resolve().then(() => hass.callWS({ type: 'frontend/get_version' }))
      .then(result => result?.version === verifiedFrontend, () => {
        frontendChecks.delete(connection);
        return false;
      });
    frontendChecks.set(connection, check);
  }
  return frontendChecks.get(connection);
}

