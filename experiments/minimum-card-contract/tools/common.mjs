import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
export const base = 'http://127.0.0.1:18123';
export const area = process.env.MCC_RESEARCH || resolve(homedir(), 'research/ha-lovelace-extended/demonstrate-minimum-card-contract');
export const state = resolve(homedir(), '.local/state/ha-lovelace-extended/minimum-card-contract');
const tokenPath = resolve(state, 'tokens.json');
export async function tokens() {
  let saved;
  try { saved = JSON.parse(await readFile(tokenPath, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  let data;
  if (!saved) {
    const credentials = { name: 'Experiment', username: 'mcc', password: randomBytes(24).toString('base64url'), client_id: base + '/', language: 'en' };
    const response = await fetch(base + '/api/onboarding/users', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(credentials)});
    if (!response.ok) throw new Error('Disposable user creation failed: ' + response.status);
    const { auth_code } = await response.json();
    data = {grant_type:'authorization_code',code:auth_code,client_id:base + '/'};
    await writeFile(resolve(state, 'credentials.json'), JSON.stringify(credentials), {mode:0o600});
  } else {
    data = {grant_type:'refresh_token', refresh_token:saved.refresh_token,client_id:base + '/'};
  }
  const response = await fetch(base + '/auth/token', {method:'POST', body:new URLSearchParams(data)});
  if (!response.ok) throw new Error('Disposable authentication failed: ' + response.status);
  const value = {...saved, ...await response.json(), hassUrl:base,clientId:base + '/'};
  value.expires = Date.now() + value.expires_in * 1000;
  await writeFile(tokenPath, JSON.stringify(value), {mode:0o600});
  return value;
}
export async function createPage(browser, auth, {touch=false, intercept=true, language='en', colorScheme='light'}={}) {
  const context = await browser.newContext({viewport:{width:1280,height:900},deviceScaleFactor:1,locale:language==='pt-BR'?'pt-BR':'en-US',hasTouch:touch,colorScheme,serviceWorkers:'block',proxy:{server:'http://127.0.0.1:9',bypass:'127.0.0.1'}});
  await context.addInitScript(({auth,language}) => {
    localStorage.setItem('hassTokens', JSON.stringify(auth));
  }, {auth,language});
  const page = await context.newPage();
  if (intercept) {
    await page.addInitScript({content:'globalThis.__MCC_INTERCEPT_NATIVE__ = true;\n' + await readFile(resolve('src/recorder.js'), 'utf8')});
  }
  return {context,page};
}
export async function openHA(options={}) {
  const auth = await tokens();
  const browser = await chromium.launch();
  const {context,page} = await createPage(browser,auth,options);
  await page.goto(base + '/lovelace/0');
  await page.waitForFunction(() => !!document.querySelector('home-assistant')?.hass?.states?.['input_number.mcc_display_a']);
  const confirm = page.getByRole('dialog', {name:'Confirm new HTTP server configuration'});
  await confirm.waitFor({state:'visible',timeout:1500}).catch(() => {});
  if (await confirm.isVisible()) await page.getByRole('button', {name:'Confirm',exact:true}).click({timeout:3000});
  const language=options.language ?? 'en';
  if(await page.evaluate(()=>document.querySelector('home-assistant').hass.language)!==language){
    await ws(page,{type:'frontend/set_user_data',key:'language',value:{language,number_format:'language',time_format:'language',date_format:'language',time_zone:'local',first_weekday:'language'}});
    await page.waitForFunction(language=>document.querySelector('home-assistant').hass.language===language,language);
  }
  return {browser,context,page,auth};
}
export async function ws(page, message) {
  return page.evaluate(message => document.querySelector('home-assistant').hass.callWS(message), message);
}
export async function result(name, data) {
  await mkdir(area, {recursive:true});
  await writeFile(resolve(area, name + '.json'), JSON.stringify(data, null, 2) + '\n');
}
