import assert from 'node:assert/strict';
export const completeConfig = {
  type: 'custom:fixed-composition-card', primary_entity: 'cover.fcc_primary', height_entity: 'sensor.fcc_height',
  action_1_label: 'Memory one', action_1_type: 'press', action_1_target: 'button.fcc_memory_1',
  action_2_label: 'Memory two', action_2_type: 'press', action_2_target: 'button.fcc_memory_2',
  action_3_label: 'Memory three', action_3_type: 'press', action_3_target: 'button.fcc_memory_3',
  body_action: 'more-info',
};
export const card = page => page.locator('#candidate');
export const role = (page, name) => card(page).locator(`[data-role="${name}"]`);

export async function checkRendering(page) {
  await page.evaluate(config => globalThis.fccCandidate.setConfig(config), completeConfig);
  assert.equal(await role(page, 'name').textContent(), 'Synthetic desk');
  assert.equal(await role(page, 'height').textContent(), 'Height: 83.5 cm');
  assert.equal(await role(page, 'actual').textContent(), 'Actual cover: 42 %');
  assert.equal(await role(page, 'state').textContent(), 'State: open');
  assert.equal(await role(page, 'action_1').isEnabled(), true);
  await page.evaluate(config => {
    const c = globalThis.fccCandidate;
    c.setConfig({ ...config, name: 'Override', icon: 'mdi:table', state_entity: 'cover.fcc_alternate', state_attribute: 'current_position', height_entity: 'sensor.fcc_alternate' });
  }, completeConfig);
  assert.equal(await role(page, 'name').textContent(), 'Override');
  assert.equal(await role(page, 'state').textContent(), 'State: 61');
  assert.equal(await role(page, 'height').textContent(), 'Height: 31.2 in');
  assert.equal(await role(page, 'actual').textContent(), 'Actual cover: 42 %');
  await role(page, 'icon').locator('path').first().waitFor({ state: 'attached' });
  const icon = await role(page, 'icon').evaluate(node => ({ icon: node.icon, hidden: node.hidden }));
  assert.equal(icon.icon, 'mdi:table'); assert.equal(icon.hidden, false);
  await role(page, 'body').click();
  const dialog = page.locator('ha-more-info-dialog').getByRole('dialog');
  await dialog.waitFor({ state: 'visible' });
  assert.match(await page.locator('ha-more-info-dialog').ariaSnapshot(), /Synthetic desk/);
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  await page.evaluate(config => {
    const c = globalThis.fccCandidate;
    c.setConfig({ ...config, height_entity: 'sensor.missing' });
  }, completeConfig);
  assert.equal(await role(page, 'height').textContent(), 'Height: missing');
  assert.equal(await role(page, 'open').isEnabled(), true);
  await page.evaluate(() => globalThis.fccCandidate.setConfig({}));
  assert.match(await role(page, 'validation').textContent(), /Select a cover/);
  assert.equal(await role(page, 'open').isEnabled(), false);
  await page.evaluate(config => globalThis.fccCandidate.setConfig(config), completeConfig);
  return { defaultIdentity: true, independentOverrides: true, sourceAttribute: true, units: ['cm', 'in'], primaryPercentPreserved: true,
    registeredHAIconWithSVG: true, actualDetailsDialog: true, missingSourceIndependentControl: true, incompleteValidation: true, unknownButtonEnabled: true };
}

export async function checkActionInputs(page) {
  const rows = [];
  for (const method of ['pointer', 'Enter', 'emulated-touch']) {
    for (const name of ['open', 'close', 'stop', 'action_1', 'action_2', 'action_3', 'body']) {
      await page.evaluate(config => { fccCandidate.setConfig(config); fccCandidate.sink.reset(); }, completeConfig);
      const node = role(page, name);
      if (method === 'pointer') await node.click();
      else if (method === 'Enter') { await node.focus(); await page.keyboard.press('Enter'); }
      else await node.tap();
      await page.waitForFunction(() => fccCandidate.sink.events.length === 1);
      const events = await page.evaluate(() => fccCandidate.sink.events);
      assert.equal(events.length, 1);
      assert.equal(events[0].origin, name);
      assert.deepEqual(events[0].data, {});
      assert.equal(events[0].target, name.startsWith('action_') ? `button.fcc_memory_${name.slice(-1)}` : 'cover.fcc_primary');
      assert.equal(events[0].kind, name === 'body' ? 'more-info' : 'service');
      if (name !== 'body') assert.equal(events[0].service, { open: 'open_cover', close: 'close_cover', stop: 'stop_cover' }[name] || 'press');
      if (name === 'body') {
        const dialog = page.locator('ha-more-info-dialog').getByRole('dialog');
        await dialog.waitFor({ state: 'visible' }); await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'hidden' });
      }
      rows.push({ method, role: name, events });
    }
  }
  await page.evaluate(config => { fccCandidate.setConfig({ ...config, body_action: 'none' }); fccCandidate.sink.reset(); }, completeConfig);
  assert.equal(await role(page, 'body').isEnabled(), false);
  assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 0);
  await page.evaluate(() => fccCandidate.sink.inject('error'));
  await role(page, 'action_1').click();
  await page.waitForFunction(() => fccCandidate.nodes['action_1-status'].textContent.includes('Injected'));
  assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 0);
  await page.evaluate(config => { fccCandidate.setConfig({ ...config, confirm: true }); }, completeConfig);
  page.once('dialog', dialog => dialog.dismiss()); await role(page, 'action_1').click();
  await page.waitForFunction(() => fccCandidate.nodes['action_1-status'].textContent === 'cancelled');
  assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 0);
  await page.evaluate(config => {
    fccCandidate.setConfig(config);
    const states = { ...fccCandidate.context.states };
    delete states['button.fcc_memory_2'];
    states['button.fcc_memory_3'] = { ...states['button.fcc_memory_3'], state: 'unavailable' };
    fccCandidate.hass = { ...fccCandidate.context, states };
  }, completeConfig);
  assert.equal(await role(page, 'action_1').isEnabled(), true);
  assert.equal(await role(page, 'action_2').isEnabled(), false);
  assert.equal(await role(page, 'action_3').isEnabled(), false);
  await role(page, 'action_1').click();
  await page.waitForFunction(() => fccCandidate.sink.events.length === 1);
  await page.evaluate(config => { fccCandidate.hass = document.querySelector('home-assistant').hass; fccCandidate.setConfig({ ...config, action_2_type: 'more-info', action_2_target: 'sensor.fcc_height', action_3_type: 'none' }); fccCandidate.sink.reset(); }, completeConfig);
  assert.equal(await role(page, 'action_3').isEnabled(), false);
  await role(page, 'action_2').click();
  const details = page.locator('ha-more-info-dialog').getByRole('dialog');
  await details.waitFor({ state: 'visible' });
  assert.match(await page.locator('ha-more-info-dialog').ariaSnapshot(), /Synthetic height/);
  await page.keyboard.press('Escape'); await details.waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => fccCandidate.sink.events[0].target), 'sensor.fcc_height');
  await page.evaluate(config => { fccCandidate.setConfig(config); fccCandidate.sink.reset(); }, completeConfig);
  return { rows, bodyNoneDisabled: true, unknownAvailableButton: true, unavailableAndMissingDisabled: true, errorNoRecord: true, cancelledConfirmationNoRecord: true, additionalDetailsAndNone: true };
}

export async function checkGestures(page) {
  const rows = [];
  const reset = async (extra = {}) => page.evaluate(({ config, extra }) => {
    fccCandidate.hass = document.querySelector('home-assistant').hass;
    fccCandidate.setConfig({ ...config, ...extra }); fccCandidate.sink.reset();
  }, { config: completeConfig, extra });
  const count = () => page.evaluate(() => fccCandidate.sink.events.length);
  const begin = async () => {
    const box = await role(page, 'range').boundingBox();
    const point = value => ({ x: box.x + 8 + (box.width - 16) * value / 100, y: box.y + box.height / 2 });
    const start = point(42); await page.mouse.move(start.x, start.y); await page.mouse.down();
    return async value => { const p = point(value); await page.mouse.move(p.x, p.y, { steps: 5 }); };
  };
  await reset(); let move = await begin();
  for (const value of [50, 65, 78]) { await move(value); assert.equal(await count(), 0); }
  const final = await page.evaluate(() => Number(fccCandidate.nodes.range.value));
  await page.mouse.up(); await page.waitForFunction(() => fccCandidate.sink.events.length === 1);
  assert.equal(await page.evaluate(() => fccCandidate.sink.events[0].data.position), final);
  await role(page, 'range').dispatchEvent('change'); await role(page, 'range').dispatchEvent('click'); await role(page, 'range').dispatchEvent('pointerup', { pointerId: 1 });
  assert.equal(await count(), 1);
  rows.push({ case: 'real multi-value drag/release and duplicate events', previewIntents: 0, finalIntents: 1, percent: final });

  await reset(); move = await begin(); await page.mouse.up(); assert.equal(await count(), 0);
  rows.push({ case: 'unchanged release', intents: 0 });
  for (const reason of ['pointercancel', 'lostpointercapture', 'Escape', 'focus-loss', 'target-change', 'capability-loss', 'disconnect']) {
    await reset(); move = await begin(); await move(79);
    if (['pointercancel', 'lostpointercapture'].includes(reason)) await role(page, 'range').dispatchEvent(reason, { pointerId: 1 });
    else if (reason === 'Escape') await page.keyboard.press('Escape');
    else if (reason === 'focus-loss') await role(page, 'open').focus();
    else if (reason === 'target-change') await page.evaluate(config => fccCandidate.setConfig({ ...config, position_target: 'cover.fcc_alternate' }), completeConfig);
    else if (reason === 'capability-loss') await page.evaluate(() => { const states = { ...fccCandidate.context.states, 'cover.fcc_primary': { state: 'open', attributes: { supported_features: 11, current_position: 42 } } }; fccCandidate.hass = { ...fccCandidate.context, states }; });
    else await page.evaluate(() => { const parent = fccCandidate.parentNode; fccCandidate.remove(); parent.append(fccCandidate); });
    await page.mouse.up(); assert.equal(await count(), 0);
    rows.push({ case: reason, intents: 0 });
  }
  await reset(); move = await begin(); await move(73);
  await page.evaluate(() => {
    const states = { ...fccCandidate.context.states, 'cover.fcc_primary': { ...fccCandidate.context.states['cover.fcc_primary'], attributes: { supported_features: 15, current_position: 51 } } };
    fccCandidate.hass = { ...fccCandidate.context, states };
  });
  assert.match(await role(page, 'actual').textContent(), /51/); assert.match(await role(page, 'requested').textContent(), /73/);
  await page.mouse.up(); assert.equal(await count(), 1);
  rows.push({ case: 'concurrent HA snapshot feedback', actual: 51, requested: 73, intents: 1 });

  await reset(); await role(page, 'range').focus();
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); assert.equal(await count(), 0);
  await page.keyboard.press('Enter'); assert.equal(await count(), 1);
  await page.keyboard.press('Enter'); assert.equal(await count(), 1);
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape'); await page.keyboard.press('Enter'); assert.equal(await count(), 1);
  await page.keyboard.press('ArrowRight'); await role(page, 'open').focus(); await role(page, 'range').focus(); await page.keyboard.press('Enter'); assert.equal(await count(), 1);
  rows.push({ case: 'ordinary keyboard commit/duplicate/Escape/blur', committedPercent: 44, intents: 1 });

  await reset(); await page.evaluate(() => {
    fccCandidate.hass = { ...fccCandidate.context, states: { ...fccCandidate.context.states, 'cover.fcc_primary': { state: 'unknown', attributes: { supported_features: 15 } } } };
  });
  assert.equal(await role(page, 'actual').textContent(), 'Actual cover: unknown');
  await role(page, 'range').focus(); await page.keyboard.press('Enter'); assert.equal(await count(), 0);
  await page.keyboard.press('End'); await page.keyboard.press('Enter'); assert.equal(await count(), 1);
  assert.equal(await page.evaluate(() => fccCandidate.sink.events[0].data.position), 100);
  rows.push({ case: 'unknown feedback explicit keyboard selection', actual: null, requested: 100, intents: 1 });

  await reset({ confirm: true });
  await page.evaluate(() => { globalThis.confirm = () => new Promise(resolve => { globalThis.resolveCandidateConfirm = resolve; }); });
  await role(page, 'range').focus(); await page.keyboard.press('End'); await page.keyboard.press('Enter');
  await page.waitForFunction(() => !!globalThis.resolveCandidateConfirm);
  await page.evaluate(config => { fccCandidate.setConfig({ ...config, position_target: 'cover.fcc_alternate' }); resolveCandidateConfirm(true); }, completeConfig);
  assert.equal(await count(), 0);
  rows.push({ case: 'target changed during asynchronous confirmation', intents: 0 });
  await reset();
  return { rows, noPhysicalMovementOrPresentationClaim: true };
}

export async function checkUpdatesAndLifecycle(page) {
  await page.evaluate(config => {
    fccCandidate.hass = document.querySelector('home-assistant').hass;
    fccCandidate.setConfig(config); fccCandidate.sink.reset();
  }, completeConfig);
  const mutations = await page.evaluate(async () => {
    const records = [];
    const observer = new MutationObserver(entries => {
      for (const entry of entries) {
        let node = entry.target.nodeType === Node.ELEMENT_NODE ? entry.target : entry.target.parentElement;
        records.push(node?.closest('[data-role]')?.dataset.role ?? 'structure');
      }
    });
    observer.observe(fccCandidate.shadowRoot, { childList: true, subtree: true, attributes: true, characterData: true });
    fccCandidate.hass = { ...fccCandidate.context, states: { ...fccCandidate.context.states, 'sensor.unrelated': { state: 'changed', attributes: {} } } };
    await Promise.resolve(); const unrelated = records.splice(0);
    const states = { ...fccCandidate.context.states, 'sensor.fcc_height': { state: '91.5', attributes: { unit_of_measurement: 'cm' } } };
    fccCandidate.hass = { ...fccCandidate.context, states };
    await Promise.resolve(); const relevant = records.splice(0); observer.disconnect();
    return { unrelated, relevant };
  });
  assert.deepEqual(mutations.unrelated, []); assert.deepEqual(mutations.relevant, ['height']);
  await page.evaluate(() => {
    fccCandidate.hass = { ...fccCandidate.context, language: 'pt-BR', locale: { ...fccCandidate.context.locale, language: 'pt-BR' } };
    fccCandidate.style.setProperty('--primary-text-color', 'rgb(11, 22, 33)');
  });
  assert.equal(await role(page, 'height').textContent(), 'Height: 91,5 cm');
  assert.equal(await role(page, 'height').evaluate(node => getComputedStyle(node).color), 'rgb(11, 22, 33)');
  await page.evaluate(config => {
    fccCandidate.setConfig({ ...config, state_entity: 'sensor.missing' });
  }, completeConfig);
  assert.equal(await role(page, 'state').textContent(), 'State: missing');
  assert.equal(await role(page, 'action_1').isEnabled(), true);
  await role(page, 'action_1').click();
  assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 1);
  const lifecycle = await page.evaluate(() => {
    fccCandidate.sink.reset(); const parent = fccCandidate.parentNode;
    const baseline = fccCandidate.diagnostics(); const cycles = [];
    for (let n = 0; n < 50; n++) {
      fccCandidate.remove(); const removed = fccCandidate.diagnostics();
      parent.append(fccCandidate); const reinserted = fccCandidate.diagnostics();
      cycles.push({ removed, reinserted });
    }
    return { baseline, cycles, noReplay: fccCandidate.sink.events.length === 0 };
  });
  assert.equal(lifecycle.noReplay, true);
  for (const cycle of lifecycle.cycles) {
    assert.deepEqual(cycle.removed, { listeners: 0, scheduled: 0, gesture: false, pending: false });
    assert.deepEqual(cycle.reinserted, lifecycle.baseline);
  }
  await role(page, 'action_1').click();
  assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 1);
  await page.evaluate(config => {
    fccCandidate.style.removeProperty('--primary-text-color');
    fccCandidate.hass = document.querySelector('home-assistant').hass;
    fccCandidate.setConfig(config); fccCandidate.sink.reset();
  }, completeConfig);
  return { mutations, localeFormatting: '91,5 cm', themeReflected: true, missingSourceIndependentAction: true, lifecycle, subsequentActivation: 1, retainedByteAttribution: 'unsupported' };
}

export async function checkLayout(page) {
  const data = await card(page).evaluate(element => {
    const rect = node => { const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
    const controls = [...element.shadowRoot.querySelectorAll('button,input')];
    const nodes = [element, ...element.shadowRoot.querySelectorAll('article,button,input,span,output,label')];
    const overflow = nodes.filter(node => node.clientWidth > 0 && node.scrollWidth > node.clientWidth + 1).map(node => ({ role: node.dataset.role || node.localName, scroll: node.scrollWidth, client: node.clientWidth }));
    const boxes = controls.map(rect), overlap = [];
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (Math.min(a.right, b.right) - Math.max(a.x, b.x) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y) > 1) overlap.push([i, j]);
    }
    const failures = [];
    if (overflow.length) failures.push('overflow');
    if (overlap.length) failures.push('overlap');
    if (boxes.some(b => b.width < 44 || b.height < 44)) failures.push('small activation area');
    return { width: rect(element).width, height: rect(element).height, font: getComputedStyle(element).fontSize, controls: boxes, overflow, overlap, failures,
      language: element.context.language, dark: element.context.themes.darkMode };
  });
  const order = ['body', 'open', 'close', 'stop', 'range', 'action_1', 'action_2', 'action_3'];
  await role(page, 'body').focus();
  for (let n = 0; n < order.length; n++) {
    const node = role(page, order[n]);
    assert.equal(await node.evaluate(e => e === e.getRootNode().activeElement), true);
    assert.equal(await node.evaluate(e => e.matches(':focus-visible')), true);
    assert.equal(await node.evaluate(e => getComputedStyle(e).outlineWidth), '3px');
    const snapshot = await node.ariaSnapshot();
    assert.ok(snapshot.trim().length > 3);
    if (n < order.length - 1) await page.keyboard.press('Tab');
  }
  // Exercise reachable touch targets in each allocation without opening details.
  for (const name of ['open', 'close', 'stop', 'action_1', 'action_2', 'action_3']) {
    await page.evaluate(() => fccCandidate.sink.reset());
    await role(page, name).tap();
    assert.equal(await page.evaluate(() => fccCandidate.sink.events.length), 1);
    assert.equal(await page.evaluate(() => fccCandidate.sink.events[0].origin), name);
  }
  return { ...data, keyboardOrder: order, focusOutline: '3px', accessibleNames: true, touch: 'Playwright emulated tap; six controls reached' };
}
