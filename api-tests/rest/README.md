# Testes de API/HTTP

Testes em código, sem dependências externas, para os contratos HTTP realmente publicados pela QAZANDO Shop. A aplicação é uma SPA e não expõe uma API REST documentada; por isso esta suíte cobre documento HTML, fallback do shell nas rotas, manifesto e bundles, sem criar endpoints fictícios. A existência funcional de cada tela após a hidratação é validada nas suítes de navegador.

```bash
npm ci
npm test
```

Para outro ambiente:

```bash
BASE_URL=https://ambiente.example npm test
```
