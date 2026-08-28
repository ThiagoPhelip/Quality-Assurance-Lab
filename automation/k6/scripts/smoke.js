import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1500'],
    checks: ['rate>0.99'],
  },
};

const baseUrl = __ENV.BASE_URL || 'https://automationpratice.com.br';

export default function () {
  for (const path of ['/', '/shop', '/login', '/register']) {
    const response = http.get(`${baseUrl}${path}`, { tags: { page: path } });
    check(response, {
      [`${path} retorna 200`]: (res) => res.status === 200,
      [`${path} retorna HTML`]: (res) => res.headers['Content-Type']?.includes('text/html'),
    });
  }
  sleep(1);
}
