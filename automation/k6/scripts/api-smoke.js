import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
    checks: ["rate>0.99"],
  },
};

const baseUrl = __ENV.BASE_URL || "http://127.0.0.1:3000";

export default function () {
  const health = http.get(`${baseUrl}/health`, {
    tags: { endpoint: "health" },
  });
  check(health, {
    "health retorna 200": (response) => response.status === 200,
    "health retorna ok": (response) => response.json("status") === "ok",
  });

  const login = http.post(
    `${baseUrl}/api/auth/login`,
    JSON.stringify({ email: "qa@example.com", password: "Quality123!" }),
    {
      headers: { "Content-Type": "application/json" },
      tags: { endpoint: "login" },
    },
  );
  const token = login.json("token");
  check(login, {
    "login retorna 200": (response) => response.status === 200,
    "login retorna token": () => typeof token === "string" && token.length > 0,
  });

  const products = http.get(`${baseUrl}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
    tags: { endpoint: "products" },
  });
  check(products, {
    "produtos retornam 200": (response) => response.status === 200,
    "catálogo não está vazio": (response) => response.json("data").length > 0,
  });

  sleep(1);
}
