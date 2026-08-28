const http = require('node:http');
const { randomUUID } = require('node:crypto');

const seed = () => [
  { id: '1', name: 'Green Dress For Woman', price: 52, stock: 10 },
  { id: '2', name: 'T-Shirt For Men', price: 14, stock: 20 },
];

function json(response, status, body, headers = {}) {
  if (status === 204) {
    response.writeHead(status, { 'cache-control': 'no-store', ...headers });
    return response.end();
  }
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'x-content-type-options': 'nosniff',
    'cache-control': 'no-store',
    ...headers,
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) {
    throw Object.assign(new Error('unsupported_media_type'), { status: 415 });
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 32_768) throw Object.assign(new Error('payload_too_large'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString() || '{}'); }
  catch { throw Object.assign(new Error('invalid_json'), { status: 400 }); }
}

function validProduct(product) {
  return product !== null && typeof product === 'object'
    && typeof product.name === 'string' && product.name.trim().length >= 3
    && Number.isFinite(product.price) && product.price > 0
    && Number.isInteger(product.stock) && product.stock >= 0;
}

function createApp() {
  let products = seed();
  const sessions = new Map();
  const sessionTtlMs = 3_600_000;
  return http.createServer(async (request, response) => {
    try {
      let url;
      try { url = new URL(request.url, 'http://localhost'); }
      catch { return json(response, 400, { error: 'invalid_request_target' }); }
      const match = url.pathname.match(/^\/api\/products\/([^/]+)$/);
      if (request.method === 'GET' && url.pathname === '/health') return json(response, 200, { status: 'ok' });
      if (request.method === 'POST' && url.pathname === '/api/auth/login') {
        const body = await readBody(request);
        if (body && body.email === 'qa@example.com' && body.password === 'Quality123!') {
          const now = Date.now();
          for (const [existingToken, expiresAt] of sessions) if (expiresAt <= now) sessions.delete(existingToken);
          if (sessions.size >= 100) sessions.delete(sessions.keys().next().value);
          const token = randomUUID();
          sessions.set(token, now + sessionTtlMs);
          return json(response, 200, { token, tokenType: 'Bearer', expiresIn: sessionTtlMs / 1000 });
        }
        return json(response, 401, { error: 'invalid_credentials' });
      }
      const bearer = request.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
      const expiresAt = sessions.get(bearer);
      if (expiresAt && expiresAt <= Date.now()) sessions.delete(bearer);
      if (url.pathname.startsWith('/api/') && (!expiresAt || expiresAt <= Date.now())) {
        return json(response, 401, { error: 'unauthorized' }, { 'www-authenticate': 'Bearer' });
      }
      if (request.method === 'GET' && url.pathname === '/api/products') return json(response, 200, { data: products, total: products.length });
      if (request.method === 'GET' && match) {
        const product = products.find((item) => item.id === match[1]);
        return product ? json(response, 200, product) : json(response, 404, { error: 'product_not_found' });
      }
      if (request.method === 'POST' && url.pathname === '/api/products') {
        const body = await readBody(request);
        if (!validProduct(body)) return json(response, 422, { error: 'validation_error' });
        const product = { id: randomUUID(), name: body.name.trim(), price: body.price, stock: body.stock };
        products.push(product);
        return json(response, 201, product, { location: `/api/products/${product.id}` });
      }
      if (request.method === 'PUT' && match) {
        const index = products.findIndex((item) => item.id === match[1]);
        if (index < 0) return json(response, 404, { error: 'product_not_found' });
        const body = await readBody(request);
        if (!validProduct(body)) return json(response, 422, { error: 'validation_error' });
        products[index] = { id: match[1], name: body.name.trim(), price: body.price, stock: body.stock };
        return json(response, 200, products[index]);
      }
      if (request.method === 'DELETE' && match) {
        const before = products.length;
        products = products.filter((item) => item.id !== match[1]);
        return before === products.length ? json(response, 404, { error: 'product_not_found' }) : json(response, 204, null);
      }
      if (url.pathname === '/api/products') return json(response, 405, { error: 'method_not_allowed' }, { allow: 'GET, POST' });
      if (match) return json(response, 405, { error: 'method_not_allowed' }, { allow: 'GET, PUT, DELETE' });
      return json(response, 404, { error: 'route_not_found' });
    } catch (error) {
      const status = error.status || 500;
      return json(response, status, { error: status === 500 ? 'internal_error' : error.message });
    }
  });
}

module.exports = { createApp };
