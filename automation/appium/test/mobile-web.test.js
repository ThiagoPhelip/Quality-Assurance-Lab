const { before, after, describe, it } = require('node:test');
const assert = require('node:assert/strict');

const baseUrl = process.env.BASE_URL || 'https://automationpratice.com.br';
const appiumUrl = `http://${process.env.APPIUM_HOST || '127.0.0.1'}:${process.env.APPIUM_PORT || 4723}`;
let sessionId;

async function command(method, path, body) {
  const response = await fetch(`${appiumUrl}${path}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });
  const payload = await response.json();
  if (!response.ok || payload.value?.error) {
    const error = new Error(payload.value?.message || `WebDriver retornou HTTP ${response.status}`);
    error.webdriverError = payload.value?.error;
    throw error;
  }
  return payload.value;
}

const sessionCommand = (method, path, body) => command(method, `/session/${sessionId}${path}`, body);
const navigate = (url) => sessionCommand('POST', '/url', { url });

async function find(css) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const element = await sessionCommand('POST', '/element', { using: 'css selector', value: css });
      return element['element-6066-11e4-a52e-4f735466cecf'];
    } catch (error) {
      if (error.webdriverError !== 'no such element') throw error;
      if (Date.now() >= deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`elemento não encontrado: ${css}`);
}

const click = (element) => sessionCommand('POST', `/element/${element}/click`, {});

async function waitForUrl(pattern) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    const current = await sessionCommand('GET', '/url');
    if (pattern.test(current)) return current;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`URL não atingiu o padrão ${pattern}`);
}

describe('QAZANDO Shop no Android Chrome', () => {
  before(async () => {
    const session = await command('POST', '/session', {
      capabilities: { alwaysMatch: {
          platformName: 'Android',
          browserName: 'Chrome',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
          'appium:newCommandTimeout': 120,
          'appium:noReset': true,
        } },
    });
    sessionId = session.sessionId;
  });

  after(async () => { if (sessionId) await command('DELETE', `/session/${sessionId}`); });

  it('abre a home em viewport mobile', async () => {
    await navigate(baseUrl);
    assert.match(await sessionCommand('GET', '/title'), /QAZANDO Shop E-Commerce/);
    assert.equal(new URL(await sessionCommand('GET', '/url')).host, new URL(baseUrl).host);
  });

  it('exibe e preenche o formulário de login', async () => {
    await navigate(`${baseUrl}/login`);
    const user = await find('#user');
    const password = await find('#password');
    const submit = await find('#btnLogin');

    await sessionCommand('POST', `/element/${user}/value`, { text: 'qa.mobile@example.com' });
    await sessionCommand('POST', `/element/${password}/value`, { text: 'SenhaMobile123!' });
    assert.equal(await sessionCommand('GET', `/element/${user}/property/value`), 'qa.mobile@example.com');
    await click(submit);
    assert.match(await waitForUrl(/\/my-account/), /\/my-account/);
  });

  it('mantém o conteúdo dentro da largura visual', async () => {
    await navigate(`${baseUrl}/shop`);
    const metrics = await sessionCommand('POST', '/execute/sync', {
      script: 'return {viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth};',
      args: [],
    });

    assert.ok(metrics.content <= metrics.viewport + 2, `overflow horizontal: ${metrics.content}px > ${metrics.viewport}px`);
  });

  it('acessa carrinho e checkout no dispositivo', async () => {
    await navigate(`${baseUrl}/cart`);
    const hasProduct = await sessionCommand('POST', '/execute/sync', {
      script: "return document.body.innerText.includes('Fit-Flare Dress');",
      args: [],
    });
    assert.equal(hasProduct, true);
    assert.ok(await find('a[href="/checkout-one"]'));
    await navigate(`${baseUrl}/checkout-one`);
    assert.ok(await find('#faddress'));
  });
});
