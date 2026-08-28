# Quality-Assurance-Lab

# 🧪 Repositórios de Teste QA

Bem-vindo(a)! 👋  
Este repositório foi criado com o objetivo de **centralizar estudos, práticas e exemplos reais da área de Qualidade de Software (QA)**, abrangendo testes manuais, automação, performance, APIs e boas práticas utilizadas no dia a dia de um QA.

Aqui você encontrará conteúdos voltados tanto para **aprendizado contínuo** quanto para **aplicação prática em projetos reais**.

## ✅ Laboratórios executáveis

As suítes usam como sistema sob teste a [QAZANDO Shop](https://automationpratice.com.br/) e são independentes:

| Projeto | Finalidade | Execução |
|---|---|---|
| [`automation/cypress`](automation/cypress) | E2E e smoke no navegador | `npm ci && npm test` |
| [`automation/robot-framework`](automation/robot-framework) | UI keyword-driven | `robot --outputdir results tests` |
| [`automation/k6`](automation/k6) | Smoke e carga HTTP | `k6 run scripts/smoke.js` |
| [`bdd`](bdd) | BDD executável com Cucumber | `npm ci && npm test` |
| [`api-tests/postman`](api-tests/postman) | Contratos das rotas via Postman CLI | `postman collection run ...` |
| [`manual-testing`](manual-testing) | Plano, casos e template de defeitos | documentação |

A estratégia consolidada está em [`documentation/test-strategy.md`](documentation/test-strategy.md). O CI executa as verificações independentes em paralelo por meio do GitHub Actions.

---

## 🚀 O que você vai encontrar neste repositório

### 🤖 Automação de Testes
- ⚙️ **Cypress** – Testes automatizados End-to-End (E2E)
- 🚀 **Robot Framework** – Automação baseada em palavras-chave
- 📈 **K6** – Testes de performance e carga

---

### 🧩 BDD / Gherkin
- 📝 Escrita de cenários em **BDD**
- 🥒 **Gherkin (Given / When / Then)**
- 🔗 Integração de cenários com automação

---

### 🌐 Testes de API
- 📬 **Postman**
- 🔍 Validação de contratos, status code e payloads
- 🔐 Testes de autenticação e fluxos de API

---

### 🧑‍💻 Testes Manuais & Documentação
- 📋 Casos de teste
- 🗂️ Planos de teste
- 🐞 Relatos e evidências de bugs
- 📑 Documentação de processos e boas práticas de QA

---

### 📚 Estudos, Roadmap e Aprendizado
- 🧠 Anotações de estudo sobre QA
- 🛣️ Roadmap de aprendizado na área de testes
- 📖 Conceitos fundamentais de Qualidade de Software
- 🧪 Estratégias, tipos e níveis de testes

---

## 🐞 Qualidade em primeiro lugar
Este repositório reflete a mentalidade de:
- 🔍 Atenção aos detalhes
- 🛠️ Prevenção de defeitos
- 📊 Melhoria contínua
- 🤝 Colaboração entre times

---

## 📌 Objetivo
Servir como:
- 💼 Portfólio de QA
- 📘 Base de conhecimento
- 🧪 Laboratório de testes
- 🚀 Apoio para evolução profissional na área de Qualidade de Software

---

📁 Estrutura de Pastas do Repositório (QA)
qa-testing-repository
│
├── 📂 automation
│   ├── 📂 cypress
│   │   ├── cypress.config.js
│   │   ├── 📂 e2e
│   │   ├── 📂 fixtures
│   │   ├── 📂 support
│   │   └── README.md
│   │
│   ├── 📂 robot-framework
│   │   ├── 📂 tests
│   │   ├── 📂 resources
│   │   ├── 📂 variables
│   │   └── README.md
│   │
│   └── 📂 k6
│       ├── 📂 scripts
│       ├── 📂 reports
│       └── README.md
│
├── 📂 bdd
│   ├── 📂 features
│   │   ├── login.feature
│   │   ├── cadastro.feature
│   │   └── checkout.feature
│   │
│   ├── 📂 step-definitions
│   └── README.md
│
├── 📂 api-tests
│   ├── 📂 postman
│   │   ├── collections
│   │   ├── environments
│   │   └── README.md
│
├── 📂 manual-testing
│   ├── 📂 test-cases
│   ├── 📂 test-plans
│   ├── 📂 bug-reports
│   └── README.md
│
├── 📂 documentation
│   ├── qa-process.md
│   ├── test-strategy.md
│   └── best-practices.md
│
├── 📂 studies
│   ├── fundamentals.md
│   ├── testing-types.md
│   ├── qa-mindset.md
│   └── tools-overview.md
│
├── 📂 roadmap
│   ├── qa-roadmap.md
│   ├── automation-roadmap.md
│   └── performance-roadmap.md
│
├── 📄 README.md
└── 📄 .gitignore

---

![QA](https://img.shields.io/badge/Quality%20Assurance-QA-blue)
![Tests](https://img.shields.io/badge/Software%20Testing-Automated%20%7C%20Manual-green)
![Cypress](https://img.shields.io/badge/Cypress-E2E-brightgreen)
![Robot](https://img.shields.io/badge/Robot%20Framework-Automation-yellow)
![K6](https://img.shields.io/badge/K6-Performance-orange)
![BDD](https://img.shields.io/badge/BDD-Gherkin-purple)
![Postman](https://img.shields.io/badge/Postman-API-orange)
![Bug](https://img.shields.io/badge/Bug%20Hunting-Enabled-red)
![Learning](https://img.shields.io/badge/Continuous-Learning-blueviolet)

---

🧠
![Status](https://img.shields.io/badge/Status-Active-success)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)
![GitHub Repo Size](https://img.shields.io/github/repo-size/ThiagoPhelip/Quality-Assurance-Lab)
![Last Commit](https://img.shields.io/github/last-commit/ThiagoPhelip/Quality-Assurance-Lab)

✨ Sinta-se à vontade para explorar, estudar e evoluir!
