# Estratégia de qualidade

A pirâmide deste laboratório separa responsabilidades: Node Test Runner e Postman CLI validam contratos, enquanto o k6 mede a demo API local no CI; Cypress e Robot cobrem interface desktop; Appium cobre mobile web Android; Cucumber mantém exemplos de negócio executáveis; testes manuais cobrem exploração, UX e acessibilidade.

## Regras de engenharia

- Cada projeto instala e executa de forma independente.
- URL e segredos entram por variáveis; nenhum segredo é versionado.
- Testes são determinísticos, independentes e não dependem de ordem.
- Seletores semânticos têm preferência; CSS alternativo é usado somente porque a aplicação não oferece `data-testid`.
- Evidências são publicadas apenas em falhas e têm retenção limitada.
- Carga sustentada nunca roda automaticamente contra o ambiente público.

## Matriz de execução

| Camada            | Ferramenta       | Pull request | Manual |
| ----------------- | ---------------- | -----------: | -----: |
| Rotas HTTP        | Postman CLI      |          Sim |    Sim |
| Contratos HTTP    | Node Test Runner |          Sim |    Sim |
| UI smoke          | Cypress          |          Sim |    Sim |
| UI keyword-driven | Robot            |          Sim |    Sim |
| Mobile web        | Appium           |          Sim |    Sim |
| Comportamento     | Cucumber         |          Sim |    Sim |
| Performance smoke | k6               |          Sim |    Sim |
| Carga             | k6               |          Não |    Sim |
