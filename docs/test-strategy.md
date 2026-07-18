# Test Strategy

## Purpose

This project builds a risk-based release confidence system for OWASP Juice Shop. It combines a reproducible Docker environment, API contract tests with Postman and Newman, and end-to-end tests with Playwright.

The objective is not exhaustive coverage. The suite must provide fast, understandable signals for the user journeys and service contracts that would block a release if they failed.

## Quality Objectives

- Confirm that the application can start from a documented, versioned Docker image.
- Protect authentication success and failure contracts at API level.
- Confirm that authentication produces the expected user state in the browser.
- Verify that an issued token can access an authenticated resource.
- Extend coverage toward the critical purchase journey: catalog, basket, checkout, and order confirmation.

## Scope

### Initial scope

- Docker Compose startup and local application availability
- Successful and rejected login API contracts
- Browser login, authenticated account state, and logout
- Rejected browser login with a valid account and invalid password
- Representative account navigation through Orders & Payment and Privacy & Security
- Authentication token usage against a protected endpoint
- Test classification with layer, risk, and execution-suite tags

### Later scope

- Product discovery and catalog availability
- Basket creation and item management
- Checkout and order confirmation
- CI execution and test artifacts

### Out of scope

- Penetration testing and OWASP challenge completion
- Database-level verification
- Load and performance testing
- Visual regression testing
- Real payment provider or email delivery validation

## Test Layers

### API contract tests

Postman collections describe requests, reusable variables, and assertions. Newman runs those collections from the command line and in CI.

API tests validate status codes, response content types, stable response properties, authentication behavior, and authorization of protected resources. Dynamic values such as tokens, timestamps, and generated identifiers are checked by presence or type rather than exact value.

### End-to-end tests

Playwright validates browser-visible business outcomes. Current coverage confirms that a valid user can log in, observe an authenticated account menu, return to an anonymous state after logout, and reach representative account destinations. A negative scenario verifies that an invalid password is rejected without leaving the login page.

E2E tests should assert meaningful UI signals and routes. They should not duplicate every API assertion or rely on arbitrary element counts.

Each E2E test receives a uniquely registered customer through a test-scoped Playwright fixture. Page objects contain browser interactions, while assertions remain in the specs so the expected product outcome stays explicit.

### Environment checks

Docker Compose provides the application under test from the pinned image `bkimminich/juice-shop:v20.1.1`. The local target is `http://localhost:3000`.

## Test Classification

Tags describe separate dimensions and may be combined:

| Dimension | Tag | Meaning |
| --- | --- | --- |
| Layer | `@api` | Direct HTTP contract coverage |
| Layer | `@e2e` | Browser-level user journey |
| Risk | `@critical` | Failure blocks a core user or security outcome |
| Suite | `@smoke` | Minimal, fast release confidence signal |
| Suite | `@regression` | Broader behavior and edge-case coverage |

Examples:

- Successful API login: `@api @critical @smoke`
- Rejected API login: `@api @critical @regression`
- Browser login and logout: `@e2e @critical @smoke`

## Test Data And Secrets

- `.env` contains local runtime values and is excluded from Git.
- `.env.example` documents required variable names without credentials.
- Only disposable test identities are used.
- Tokens and passwords must not appear in source code, committed Postman environments, or CI artifacts.
- The API collection creates a unique disposable user for each execution.
- Generated credentials exist only in Newman's in-memory environment and are not written back to the environment file.

## Execution Model

The intended execution model is:

1. Start the pinned Juice Shop service with Docker Compose.
2. Confirm application readiness.
3. Run the smoke API and E2E suites.
4. Run regression coverage on the main branch or on demand.
5. Publish concise reports and failure diagnostics in CI.

The API runner is available through `npm run test:api`, the browser runner through `npm run test:e2e`, and `npm test` runs both layers sequentially. CI quality gates and artifact publication remain to be added.

## Release Signal

A release candidate is not trusted when a `@critical` test fails. A passing suite is a strong confidence signal for the covered contracts and journeys, not proof that the entire application is defect-free.

## Known Limitations

- The application is intentionally vulnerable; this project evaluates automation architecture rather than security posture.
- API and browser suites currently run locally but are not yet enforced in CI.
- Anonymous access to order history returns `500` instead of an authorization response; the suite records this as a known issue.
- Browser logout currently proves a return to anonymous UI state; it does not by itself prove server-side token invalidation.
- Newman currently introduces transitive dependency audit findings; forced dependency upgrades are not applied without compatibility validation.
