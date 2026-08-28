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
    throw new Error(payload.value?.message || `WebDriver retornou HTTP ${response.status}`);
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
      if (Date.now() >= deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`elemento não encontrado: ${css}`);
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
    assert.match(await sessionCommand('GET', '/url'), /automationpratice\.com\.br/);
  });

  it('exibe e preenche o formulário de login', async () => {
    await navigate(`${baseUrl}/login`);
    const user = await find('#user');
    const password = await find('#password');
    const submit = await find('#btnLogin');

    await sessionCommand('POST', `/element/${user}/value`, { text: 'qa.mobile@example.com' });
    await sessionCommand('POST', `/element/${password}/value`, { text: 'SenhaMobile123!' });
    assert.equal(await sessionCommand('GET', `/element/${submit}/displayed`), true);
  });

  it('mantém o conteúdo dentro da largura visual', async () => {
    await navigate(`${baseUrl}/shop`);
    const metrics = await sessionCommand('POST', '/execute/sync', {
      script: 'return {viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth};',
      args: [],
    });

    assert.ok(metrics.content <= metrics.viewport + 2, `overflow horizontal: ${metrics.content}px > ${metrics.viewport}px`);
  });
});
