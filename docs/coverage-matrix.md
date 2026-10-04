# Coverage Matrix

This matrix connects product promises to risks, automated checks, and evidence. Status is explicit so planned coverage is not confused with implemented coverage.

| Area | Product promise | Main risk | Layer | Planned check | Tags | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Environment | The application can be started consistently | Tests target an unavailable or drifting application version | Docker | Start `bkimminich/juice-shop:v20.1.1`, expose port `3000`, and wait for the version endpoint | Infrastructure | Automated |
| Test user setup | Authentication tests have isolated data | Fresh containers or repeated runs break because an account is missing or duplicated | API | Discover a security question and register a unique disposable customer | `@api @setup @critical` | Automated |
| Login success | A registered customer can authenticate | Valid customers cannot access their account or purchase journey | API | Assert `200`, JSON response, non-empty token, expected email, and numeric basket ID | `@api @critical @smoke` | Automated |
| Login rejection | Invalid credentials are refused | Unauthorized users gain access or receive a misleading response | API | Assert `401` and exact error response for invalid credentials | `@api @critical @regression` | Automated |
| Token authorization | Authentication grants usable authorization | Login returns a token that cannot access protected resources | API | Use the issued token to retrieve order history and assert the response contract | `@api @critical @smoke` | Automated |
| Anonymous authorization | Protected resources reject anonymous requests | Sensitive account resources are exposed without authentication | API | Verify cards return `401`; record order-history `500` as a known issue | `@api @critical @regression` | Automated |
| Authenticated UI | A valid customer sees an authenticated account state | API login succeeds but the browser state is unusable | E2E | Verify `/#/search` and the registered email in the account menu | `@e2e @critical @smoke` | Automated |
| Logout UI | A customer can return to an anonymous browser state | Authentication state remains visible after logout | E2E | Verify the account menu exposes `Login` after logout | `@e2e @critical @smoke` | Automated |
| Account navigation | A customer can reach account capabilities | Account destinations are missing or unreachable | E2E | Verify order history and change-password routes with their visible page titles | `@e2e @regression` | Automated |
| Catalog | A customer can discover purchasable products | No product can be found or selected | API + E2E | Define representative catalog contract and browser outcome | To classify | Risk analysis pending |
| Basket | A customer can build an order | Products cannot be added, updated, or removed | E2E | Add a product (badge, row, price, total, checkout enabled), change its quantity (totals, persisted after reload), remove it (empty basket, checkout disabled, persisted). Plan: `specs/basket.md`, written with the Playwright test agents | `@e2e @critical` (add, remove) `@e2e @regression` (quantity) | Automated |
| Basket API | The basket contract holds without the UI | API changes break the basket silently | API | Define basket contract | To classify | Risk analysis pending |
| Checkout | A customer can submit an order | The purchase journey cannot be completed | API + E2E | Define checkout and order-confirmation evidence | To classify | Risk analysis pending |

## Status Definitions

| Status | Meaning |
| --- | --- |
| Verified manually | The behavior has been observed but is not yet automated |
| Contract discovered | Request, response, and expected assertions are known |
| Acceptance criteria defined | Browser-visible expected outcomes are known |
| Discovery pending | The behavior still needs product or API reconnaissance |
| Risk analysis pending | The scenario and its execution tags have not yet been selected |
| Automated | The check runs locally and produces a repeatable result |
| Automated in CI | The check is enforced by the continuous integration pipeline |
