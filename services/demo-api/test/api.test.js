const { before, after, describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

let server; let baseUrl; const auth = { authorization: 'Bearer demo-token' };
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, { ...options, headers: { 'content-type': 'application/json', ...options.headers } });

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));

describe('Demo API', () => {
  it('informa saúde', async () => assert.deepEqual(await (await request('/health')).json(), { status: 'ok' }));
  it('protege recursos', async () => assert.equal((await request('/api/products')).status, 401));
  it('autentica credenciais válidas', async () => {
    const response = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'qa@example.com', password: 'Quality123!' }) });
    assert.equal(response.status, 200); assert.equal((await response.json()).token, 'demo-token');
  });
  it('rejeita credenciais inválidas', async () => assert.equal((await request('/api/auth/login', { method: 'POST', body: '{}' })).status, 401));
  it('executa CRUD e valida contrato', async () => {
    const created = await request('/api/products', { method: 'POST', headers: auth, body: JSON.stringify({ name: 'QA Product', price: 99.9, stock: 3 }) });
    assert.equal(created.status, 201); const product = await created.json(); assert.ok(product.id);
    assert.equal((await request(`/api/products/${product.id}`, { headers: auth })).status, 200);
    const updated = await request(`/api/products/${product.id}`, { method: 'PUT', headers: auth, body: JSON.stringify({ name: 'QA Product Updated', price: 109.9, stock: 2 }) });
    assert.equal((await updated.json()).stock, 2);
    assert.equal((await request(`/api/products/${product.id}`, { method: 'DELETE', headers: auth })).status, 204);
    assert.equal((await request(`/api/products/${product.id}`, { headers: auth })).status, 404);
  });
  it('retorna 422 para produto inválido', async () => assert.equal((await request('/api/products', { method: 'POST', headers: auth, body: JSON.stringify({ name: 'x', price: -1, stock: -1 }) })).status, 422));
  it('retorna 400 para JSON inválido', async () => assert.equal((await request('/api/products', { method: 'POST', headers: auth, body: '{' })).status, 400));
  it('retorna 404 para rota desconhecida', async () => assert.equal((await request('/unknown')).status, 404));
});
