# Quality Assurance Lab

Laboratório e portfólio de Qualidade de Software baseado na [QAZANDO Shop](https://automationpratice.com.br/), com testes automatizados, documentação manual, API demonstrativa e quality gates em CI/CD.

[![Quality Gates](https://github.com/ThiagoPhelip/Quality-Assurance-Lab/actions/workflows/ci.yml/badge.svg)](https://github.com/ThiagoPhelip/Quality-Assurance-Lab/actions/workflows/ci.yml)
![QA](https://img.shields.io/badge/Quality%20Assurance-QA-blue)
![Node](https://img.shields.io/badge/Node.js-22-green)
![Python](https://img.shields.io/badge/Python-3.13-blue)

## Laboratórios executáveis

| Projeto                                                    | Cobertura                                            | Execução                          |
| ---------------------------------------------------------- | ---------------------------------------------------- | --------------------------------- |
| [`automation/cypress`](automation/cypress)                 | E2E web: autenticação, catálogo, carrinho e checkout | `npm ci && npm test`              |
| [`automation/robot-framework`](automation/robot-framework) | UI keyword-driven                                    | `robot --outputdir results tests` |
| [`automation/appium`](automation/appium)                   | Mobile web Android/Chrome                            | `npm ci && npm test`              |
| [`automation/k6`](automation/k6)                           | Smoke e carga HTTP                                   | `k6 run scripts/api-smoke.js`     |
| [`bdd`](bdd)                                               | BDD executável com Cucumber e Playwright             | `npm ci && npm test`              |
| [`api-tests/rest`](api-tests/rest)                         | Contratos HTTP da aplicação pública                  | `npm ci && npm test`              |
| [`api-tests/postman`](api-tests/postman)                   | Contratos da demo API pelo Postman CLI               | `postman collection run ...`      |
| [`services/demo-api`](services/demo-api)                   | API REST local: Bearer, CRUD e contratos de erro     | `npm ci && npm test`              |
| [`manual-testing`](manual-testing)                         | Plano, casos e relatórios de defeito                 | documentação                      |

## Qualidade e CI/CD

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa os projetos de forma isolada e paralela, gera relatórios JUnit, preserva evidências de falha e publica um dashboard no GitHub Pages. O pipeline inclui:

- quality check de JSON, placeholders e whitespace;
- Cypress em Chrome e BDD em Chromium;
- Robot Framework em Python 3.13;
- Appium 3 com emulador Android e UiAutomator2;
- Postman CLI, contratos HTTP e k6;
- API demonstrativa com limiares mínimos de cobertura;
- Dependabot para npm, pip e GitHub Actions.

Testes de carga e performance não são disparados automaticamente contra o site público. O CI executa um smoke determinístico contra a demo API local; o smoke externo permanece disponível apenas para execução manual.

## API demonstrativa

[`services/demo-api`](services/demo-api) existe para demonstrar testes de API reais, já que a QAZANDO Shop não expõe uma API REST pública documentada. O serviço local oferece:

- autenticação Bearer com sessão temporária;
- listagem e CRUD de produtos;
- respostas `400`, `401`, `404`, `405`, `413`, `415` e `422`;
- proteção de payload e cabeçalhos HTTP;
- especificação [`openapi.yaml`](services/demo-api/openapi.yaml);
- testes nativos do Node com cobertura mínima obrigatória.

## Evidências e documentação

- [Estratégia de testes](documentation/test-strategy.md)
- [Plano de testes](manual-testing/test-plans/test-plan.md)
- [Casos prioritários](manual-testing/test-cases/core-flows.md)
- [BUG-001 — produto não é adicionado ao carrinho](manual-testing/bug-reports/BUG-001-add-to-cart.md)
- [Template de defeito](manual-testing/bug-reports/template.md)
- [Conceitos de testes](Conceito_de_Teste_de_Software/conceito.md)
- [BDD e Gherkin](Sobre%20o%20BDD_GHERKIN/Gherkin.md)

## Configuração

Cada projeto possui seu próprio README e arquivo de dependências. A URL da aplicação pode ser substituída por `BASE_URL`. Nenhum segredo ou dado pessoal deve ser versionado.

Para reproduzir o conjunto principal localmente, use Node.js 22 e Python 3.13. Appium também requer Android SDK, JDK e dispositivo ou emulador disponível no `adb`.

## Resultado esperado

Pull requests e pushes para `main` devem passar por todos os quality gates. Relatórios e screenshots são armazenados como artifacts por tempo limitado; o resumo da execução da branch principal é publicado automaticamente no GitHub Pages.
