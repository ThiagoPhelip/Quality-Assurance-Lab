# Demo API

API REST local e sem dependências para demonstrar autenticação Bearer, contratos de erro e CRUD real de produtos. Os dados ficam em memória e são reiniciados a cada execução.

```bash
npm ci
npm test
npm run test:coverage
npm start
```

Credenciais de laboratório: `qa@example.com` / `Quality123!`. O login gera um token Bearer aleatório válido apenas enquanto o processo estiver ativo. Não use estas credenciais fora deste serviço local.
