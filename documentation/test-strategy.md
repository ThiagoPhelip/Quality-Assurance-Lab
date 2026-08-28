# Estratégia de qualidade

A pirâmide deste laboratório separa responsabilidades: Postman CLI e k6 validam disponibilidade HTTP; Cypress e Robot cobrem smoke de interface; Cucumber mantém exemplos de negócio executáveis; testes manuais cobrem exploração, UX e acessibilidade.

## Regras de engenharia

- Cada projeto instala e executa de forma independente.
- URL e segredos entram por variáveis; nenhum segredo é versionado.
- Testes são determinísticos, independentes e não dependem de ordem.
- Seletores semânticos têm preferência; CSS alternativo é usado somente porque a aplicação não oferece `data-testid`.
- Evidências são publicadas apenas em falhas e têm retenção limitada.
- Carga sustentada nunca roda automaticamente contra o ambiente público.

## Matriz de execução

| Camada | Ferramenta | Pull request | Manual |
|---|---|---:|---:|
| Rotas HTTP | Postman CLI | Sim | Sim |
| UI smoke | Cypress | Sim | Sim |
| UI keyword-driven | Robot | Sim | Sim |
| Comportamento | Cucumber | Sim | Sim |
| Performance smoke | k6 | Sim | Sim |
| Carga | k6 | Não | Sim |
