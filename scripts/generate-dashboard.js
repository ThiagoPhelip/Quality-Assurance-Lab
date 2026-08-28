const fs = require('node:fs');
const path = require('node:path');
const jobs = ['quality', 'demo-api', 'api-contract', 'postman', 'cypress', 'bdd', 'robot', 'performance-smoke', 'appium'];
const rows = jobs.map((job) => {
  const status = process.env[`STATUS_${job.toUpperCase().replaceAll('-', '_')}`] || 'unknown';
  return `<tr><td>${job}</td><td class="${status}">${status}</td></tr>`;
}).join('');
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>QA Lab Report</title><style>body{font:16px system-ui;max-width:900px;margin:40px auto;padding:0 20px;background:#0f172a;color:#e2e8f0}table{width:100%;border-collapse:collapse;background:#1e293b}th,td{padding:12px;border:1px solid #334155;text-align:left}.success{color:#4ade80}.failure{color:#f87171}.cancelled,.skipped{color:#facc15}a{color:#60a5fa}</style></head><body><h1>Quality Assurance Lab</h1><p>Execução <a href="${process.env.RUN_URL || '#'}">#${process.env.RUN_NUMBER || '-'}</a> — ${new Date().toISOString()}</p><table><thead><tr><th>Quality gate</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table><p>Relatório gerado automaticamente pelo GitHub Actions.</p></body></html>`;
const output = path.resolve(process.argv[2] || 'public');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html);
