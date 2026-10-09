# Juice Shop Quality Pipeline

[![QA](https://github.com/JonHualde/juice-shop-quality-pipeline/actions/workflows/qa.yml/badge.svg)](https://github.com/JonHualde/juice-shop-quality-pipeline/actions/workflows/qa.yml)

Portfolio project demonstrating a pragmatic QA automation architecture for [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/).

## Objective

Build a release confidence system that combines:

- Docker Compose for a reproducible test environment
- Playwright with TypeScript for end-to-end coverage
- Postman and Newman for API contract testing
- GitHub Actions for continuous integration
- A test strategy and coverage matrix to document risk-based decisions

## Status

- OWASP Juice Shop runs locally from a pinned Docker image.
- The Postman collection creates isolated test data before validating authentication and authorization contracts.
- API result: 7 requests, 27 assertions, 0 failures.
- E2E result: 8 Playwright tests covering authentication, logout, invalid credentials, account navigation and the basket (add, change quantity, remove), plus the agents' seed.
- Playwright fixtures create a registered user per test and provide reusable page objects and UI components.
- GitHub Actions runs API and E2E quality gates in parallel with manual suite selection and retained artifacts.

## Run Locally

```bash
npm install
docker compose up -d --wait
npm test
docker compose down
```

The committed Postman environment contains only the local base URL. The collection discovers the registration question and generates a unique disposable user in memory for every Newman run.

Local Playwright setup reads `BASE_URL`, `SECURITY_QUESTION`, and `SECURITY_QUESTION_ANSWER` from the ignored `.env` file. See `.env.example` for the required keys.

## Test Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run API tests, then E2E tests |
| `npm run test:api` | Run the Postman collection with Newman |
| `npm run test:e2e` | Run the Playwright suite |
| `npm run test:e2e:ui` | Open Playwright UI mode |
| `npm run test:e2e:headed` | Run E2E tests with a visible browser |
| `npm run report:e2e` | Open the latest Playwright HTML report |

## AI-Assisted Test Writing

The Playwright test agents (planner, generator, healer) run in Claude Code against the local app: they plan scenarios, write specs and repair failing tests. Every agent output is committed as is, then reviewed in its own commit. CI runs the committed specs without any AI. See [AI workflow](docs/ai-workflow.md) for the loop and two worked examples.

## Documentation

- [AI workflow](docs/ai-workflow.md)

- [Test strategy](docs/test-strategy.md)
- [Coverage matrix](docs/coverage-matrix.md)
- [Definition of Done](docs/definition-of-done.md)
- [How to run](docs/how-to-run.md)
- [Risks and limits](docs/risks-and-limits.md)
