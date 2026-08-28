const { before, after, describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');
const net = require('node:net');

let server; let baseUrl; let auth;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, { ...options, headers: { 'content-type': 'application/json', ...options.headers } });

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  const login = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'qa@example.com', password: 'Quality123!' }) });
  auth = { authorization: `Bearer ${(await login.json()).token}` };
});
after(() => new Promise((resolve) => server.close(resolve)));

describe('Demo API', () => {
  it('informa saúde', async () => assert.deepEqual(await (await request('/health')).json(), { status: 'ok' }));
  it('protege recursos com desafio Bearer', async () => {
    const response = await request('/api/products');
    assert.equal(response.status, 401); assert.equal(response.headers.get('www-authenticate'), 'Bearer');
  });
  it('autentica credenciais válidas', async () => {
    const response = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'qa@example.com', password: 'Quality123!' }) });
    assert.equal(response.status, 200); const body = await response.json(); assert.match(body.token, /^[0-9a-f-]{36}$/); assert.equal(body.expiresIn, 3600);
    assert.equal((await request('/api/products', { headers: { authorization: `Bearer ${body.token}` } })).status, 200);
  });
  it('rejeita credenciais inválidas', async () => assert.equal((await request('/api/auth/login', { method: 'POST', body: '{}' })).status, 401));
  it('rejeita corpo nulo no login sem erro interno', async () => assert.equal((await request('/api/auth/login', { method: 'POST', body: 'null' })).status, 401));
  it('executa CRUD e valida contrato', async () => {
    const created = await request('/api/products', { method: 'POST', headers: auth, body: JSON.stringify({ name: 'QA Product', price: 99.9, stock: 3 }) });
    assert.equal(created.status, 201); const product = await created.json(); assert.ok(product.id); assert.equal(created.headers.get('location'), `/api/products/${product.id}`);
    assert.equal((await request(`/api/products/${product.id}`, { headers: auth })).status, 200);
    const updated = await request(`/api/products/${product.id}`, { method: 'PUT', headers: auth, body: JSON.stringify({ name: 'QA Product Updated', price: 109.9, stock: 2 }) });
    assert.equal((await updated.json()).stock, 2);
    assert.equal((await request(`/api/products/${product.id}`, { method: 'DELETE', headers: auth })).status, 204);
    assert.equal((await request(`/api/products/${product.id}`, { headers: auth })).status, 404);
  });
  it('retorna 422 para produto inválido', async () => assert.equal((await request('/api/products', { method: 'POST', headers: auth, body: JSON.stringify({ name: 'x', price: -1, stock: -1 }) })).status, 422));
  it('retorna 422 para corpo nulo', async () => assert.equal((await request('/api/products', { method: 'POST', headers: auth, body: 'null' })).status, 422));
  it('retorna 400 para JSON inválido', async () => assert.equal((await request('/api/products', { method: 'POST', headers: auth, body: '{' })).status, 400));
  it('retorna 415 para mídia não suportada', async () => assert.equal((await request('/api/products', { method: 'POST', headers: { ...auth, 'content-type': 'text/plain' }, body: '{}' })).status, 415));
  it('retorna 405 e Allow para método não suportado', async () => {
    const response = await request('/api/products', { method: 'PATCH', headers: auth, body: '{}' });
    assert.equal(response.status, 405); assert.equal(response.headers.get('allow'), 'GET, POST');
  });
  it('retorna 404 ao atualizar ou excluir produto ausente', async () => {
    assert.equal((await request('/api/products/absent', { method: 'PUT', headers: auth, body: JSON.stringify({ name: 'Valid product', price: 1, stock: 0 }) })).status, 404);
    assert.equal((await request('/api/products/absent', { method: 'DELETE', headers: auth })).status, 404);
  });
  it('limita o tamanho do payload', async () => {
    const response = await request('/api/products', { method: 'POST', headers: auth, body: JSON.stringify({ name: 'x'.repeat(33_000), price: 1, stock: 1 }) });
    assert.equal(response.status, 413);
  });
  it('retorna 404 para rota desconhecida', async () => assert.equal((await request('/unknown')).status, 404));
  it('responde 400 para request-target inválido sem derrubar o processo', async () => {
    const response = await new Promise((resolve, reject) => {
      const socket = net.createConnection(server.address().port, '127.0.0.1');
      let data = '';
      socket.setEncoding('utf8');
      socket.on('connect', () => socket.write('GET http://[ HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n'));
      socket.on('data', (chunk) => { data += chunk; });
      socket.on('end', () => resolve(data));
      socket.on('error', reject);
    });
    assert.match(response, /HTTP\/1\.1 400/);
  });
});
