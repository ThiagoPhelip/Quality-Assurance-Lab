# Quality Assurance Lab

Software Quality Assurance laboratory and portfolio based on the [QAZANDO Shop](https://automationpratice.com.br/), with automated tests, manual QA documentation, a demonstrational REST API, and CI/CD quality gates.

[![Quality Gates](https://github.com/ThiagoPhelip/Quality-Assurance-Lab/actions/workflows/ci.yml/badge.svg)](https://github.com/ThiagoPhelip/Quality-Assurance-Lab/actions/workflows/ci.yml)
[![Dashboard](https://img.shields.io/badge/GitHub%20Pages-dashboard-2563eb)](https://thiagophelip.github.io/Quality-Assurance-Lab/)

## Executable projects

| Project                                                    | Purpose                                        |
| ---------------------------------------------------------- | ---------------------------------------------- |
| [`automation/cypress`](automation/cypress)                 | Browser E2E tests                              |
| [`automation/robot-framework`](automation/robot-framework) | Keyword-driven browser tests                   |
| [`automation/appium`](automation/appium)                   | Android Chrome mobile web tests                |
| [`automation/k6`](automation/k6)                           | Local API smoke and opt-in external load tests |
| [`bdd`](bdd)                                               | Executable Cucumber/Playwright specifications  |
| [`api-tests/rest`](api-tests/rest)                         | Public HTTP contract tests                     |
| [`api-tests/postman`](api-tests/postman)                   | Demo API contracts through Postman CLI         |
| [`services/demo-api`](services/demo-api)                   | Local authenticated products REST API          |
| [`manual-testing`](manual-testing)                         | Test plan, cases, and defect reports           |

The GitHub Actions workflow runs every suite independently, produces JUnit reports and failure evidence, enforces coverage thresholds, and deploys a consolidated [GitHub Pages dashboard](https://thiagophelip.github.io/Quality-Assurance-Lab/). Deterministic gates run in parallel, while suites that use the public site are serialized to limit load. Performance smoke runs against the local demo API, and Dependabot monitors npm, pip, and GitHub Actions dependencies.

Every runner that depends on QAZANDO Shop performs its own page-and-bundle preflight. A transport connectivity failure is reported as `skipped` and does not mean that the suite passed. An invalid response from a reachable target, or any test failure after a successful preflight, remains blocking.

See the [Portuguese README](README.md) for complete setup, architecture, evidence, and execution details.
