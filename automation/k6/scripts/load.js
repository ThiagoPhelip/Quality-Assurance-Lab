import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "1m", target: 5 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.02"],
    http_req_duration: ["p(95)<2000"],
  },
};

const baseUrl = __ENV.BASE_URL || "https://automationpratice.com.br";

export default function () {
  const response = http.get(`${baseUrl}/shop`);
  check(response, { "catálogo disponível": (res) => res.status === 200 });
  sleep(Math.random() * 2 + 1);
}
