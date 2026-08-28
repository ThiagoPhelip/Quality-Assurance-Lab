const http = require('node:http');
const { randomUUID } = require('node:crypto');

const seed = () => [
  { id: '1', name: 'Green Dress For Woman', price: 52, stock: 10 },
  { id: '2', name: 'T-Shirt For Men', price: 14, stock: 20 },
];

function json(response, status, body) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'x-content-type-options': 'nosniff',
    'cache-control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 32_768) throw Object.assign(new Error('payload muito grande'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString() || '{}'); }
  catch { throw Object.assign(new Error('JSON inválido'), { status: 400 }); }
}

function validProduct(product) {
  return typeof product.name === 'string' && product.name.trim().length >= 3
    && Number.isFinite(product.price) && product.price > 0
    && Number.isInteger(product.stock) && product.stock >= 0;
}

function createApp() {
  let products = seed();
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const match = url.pathname.match(/^\/api\/products\/([^/]+)$/);
    try {
      if (request.method === 'GET' && url.pathname === '/health') return json(response, 200, { status: 'ok' });
      if (request.method === 'POST' && url.pathname === '/api/auth/login') {
        const body = await readBody(request);
        if (body.email === 'qa@example.com' && body.password === 'Quality123!') return json(response, 200, { token: 'demo-token', expiresIn: 3600 });
        return json(response, 401, { error: 'invalid_credentials' });
      }
      if (url.pathname.startsWith('/api/') && request.headers.authorization !== 'Bearer demo-token') return json(response, 401, { error: 'unauthorized' });
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
        return json(response, 201, product);
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
      return json(response, 404, { error: 'route_not_found' });
    } catch (error) {
      return json(response, error.status || 500, { error: error.message });
    }
  });
}

module.exports = { createApp };
