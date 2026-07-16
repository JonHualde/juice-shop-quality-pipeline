# QA Automation Blueprint

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
- The Postman collection creates isolated test data before validating authentication contracts.
- Current result: 4 requests, 16 assertions, 0 failures.
- Playwright E2E coverage and GitHub Actions CI are planned next.

## Run Locally

```bash
npm install
docker compose up -d --wait
npm test
docker compose down
```

The committed Postman environment contains only the local base URL. The collection discovers the registration question and generates a unique disposable user in memory for every Newman run.
