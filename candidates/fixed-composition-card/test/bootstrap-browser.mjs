import assert from 'node:assert/strict';

/** Executed against the real pinned Chromium DOM by the external driver. */
export async function checkBootstrap(page) {
  return page.evaluate(() => {
    const Card = customElements.get('fixed-composition-card');
    if (!Card) throw new Error('Candidate module did not register');
    const card = new Card();
    document.body.append(card);
    const config = { type: 'custom:fixed-composition-card' };
    card.setConfig(config);
    config.type = 'mutated';
    if (card.config.type !== 'custom:fixed-composition-card') throw new Error('Configuration alias');
    for (const invalid of [null, [], 'invalid']) {
      let rejected = false;
      try { card.setConfig(invalid); } catch { rejected = true; }
      if (!rejected) throw new Error('Invalid structural configuration accepted');
    }
    card.hass = { states: {}, callService() { throw new Error('Unexpected service transport'); } };
    if (card.nodes['icon-warning'].textContent !== 'Icon unavailable') throw new Error('Missing decorative fallback');
    const text = card.shadowRoot.textContent;
    if (!text.includes('No device commands')) throw new Error('Boundary not visible');
    card.remove();
    return { registered: true, realDOM: true, structuralRejections: 3, configurationCopied: true, noServiceTransport: true };
  }).then(result => { assert.equal(result.registered, true); return result; });
}
