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
- Two authentication API contracts run with Postman and Newman.
- Current result: 2 requests, 8 assertions, 0 failures.
- Playwright E2E coverage and GitHub Actions CI are planned next.
