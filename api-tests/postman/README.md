# Postman CLI

Esta coleção valida a [demo API](../../services/demo-api) local, criada para o
laboratório porque a aplicação pública não oferece uma API documentada.

Primeiro inicie a API:

```bash
npm start --prefix ../../services/demo-api
```

Depois, em outro terminal, instale o
[Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-installation/)
e execute:

```bash
postman collection run QAZANDO-Shop.postman_collection.json --environment local.postman_environment.json
```

A suíte cobre health check, autenticação Bearer e CRUD de produtos. O pipeline
inicia e encerra a demo API automaticamente.
