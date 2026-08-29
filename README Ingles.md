# Quality Assurance Lab

Software Quality Assurance laboratory and portfolio based on the [QAZANDO Shop](https://automationpratice.com.br/), with automated tests, manual QA documentation, a demonstrational REST API, and CI/CD quality gates.

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

The GitHub Actions workflow runs the suites independently, produces JUnit reports and failure evidence, enforces coverage thresholds, and deploys a consolidated GitHub Pages dashboard. Performance smoke runs against the local demo API so CI does not load the public target. Dependabot monitors npm, pip, and GitHub Actions dependencies.

See the [Portuguese README](README.md) for complete setup, architecture, evidence, and execution details.
