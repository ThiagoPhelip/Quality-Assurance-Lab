# k6 Performance

- Smoke determinístico da demo API: `k6 run scripts/api-smoke.js`
- Smoke opcional do site público: `k6 run scripts/smoke.js`
- Carga controlada e manual: `k6 run scripts/load.js`

O pipeline inicia a demo API local e executa apenas `api-smoke.js`. Os testes
contra o site público são manuais para evitar tráfego indevido e falsos negativos
causados por indisponibilidade externa.
