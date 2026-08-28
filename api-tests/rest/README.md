# Testes de API/HTTP

Testes em código, sem dependências externas, para os contratos HTTP realmente publicados pela QAZANDO Shop. A aplicação é uma SPA e não expõe uma API REST documentada; por isso esta suíte cobre documento HTML, rotas, manifesto e bundles, sem criar endpoints fictícios.

```bash
npm ci
npm test
```

Para outro ambiente:

```bash
BASE_URL=https://ambiente.example npm test
```

