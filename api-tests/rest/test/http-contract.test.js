const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const baseUrl = (process.env.BASE_URL || 'https://automationpratice.com.br').replace(/\/$/, '');

async function get(path, accept = '*/*') {
  return fetch(`${baseUrl}${path}`, {
    headers: { accept, 'user-agent': 'Quality-Assurance-Lab/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  });
}

describe('Contrato HTTP da QAZANDO Shop', () => {
  it('entrega o documento principal da SPA', async () => {
    const response = await get('/', 'text/html');
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') || '', /text\/html/i);
    assert.match(body, /<title>QAZANDO Shop E-Commerce<\/title>/);
    assert.match(body, /<div id="root"><\/div>/);
  });

  for (const path of ['/shop', '/login', '/register', '/cart', '/checkout-one']) {
    it(`mantém a rota SPA ${path} disponível`, async () => {
      const response = await get(path, 'text/html');
      const body = await response.text();

      assert.equal(response.status, 200);
      assert.match(response.url, new RegExp(`${path.replace('/', '\\/')}/?$`));
      assert.match(body, /QAZANDO Shop E-Commerce/);
    });
  }

  it('publica um manifesto web válido', async () => {
    const response = await get('/manifest.json', 'application/json');
    const manifest = await response.json();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') || '', /json/i);
    assert.equal(typeof manifest.name, 'string');
    assert.ok(manifest.name.length > 0);
    assert.ok(Array.isArray(manifest.icons));
  });

  it('referencia bundles JavaScript acessíveis', async () => {
    const documentResponse = await get('/', 'text/html');
    const html = await documentResponse.text();
    const scripts = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((match) => match[1]);

    assert.ok(scripts.length > 0, 'nenhum bundle JavaScript foi encontrado');
    const responses = await Promise.all(scripts.map((src) => get(src)));
    responses.forEach((response) => {
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type') || '', /javascript|text\/plain/i);
    });
  });
});
