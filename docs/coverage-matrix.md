# Coverage Matrix

This matrix connects product promises to risks, automated checks, and evidence. Status is explicit so planned coverage is not confused with implemented coverage.

| Area | Product promise | Main risk | Layer | Planned check | Tags | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Environment | The application can be started consistently | Tests target an unavailable or drifting application version | Docker | Start `bkimminich/juice-shop:v20.1.1` and expose port `3000` | Infrastructure | Verified manually |
| Login success | A registered customer can authenticate | Valid customers cannot access their account or purchase journey | API | Assert `200`, JSON response, non-empty token, expected email, and numeric basket ID | `@api @critical @smoke` | Contract discovered |
| Login rejection | Invalid credentials are refused | Unauthorized users gain access or receive a misleading response | API | Assert `401` and exact error response for invalid credentials | `@api @critical @regression` | Contract discovered |
| Token authorization | Authentication grants usable authorization | Login returns a token that cannot access protected resources | API | Call one protected endpoint with the issued token | `@api @critical @smoke` | Discovery pending |
| Authenticated UI | A valid customer sees an authenticated account state | API login succeeds but the browser state is unusable | E2E | Verify `/#/`, `All Products`, account email, and authenticated menu commands | `@e2e @critical @smoke` | Acceptance criteria defined |
| Logout UI | A customer can return to an anonymous browser state | Authentication state remains visible after logout | E2E | Verify email and authenticated commands disappear and `Login` is available | `@e2e @critical @smoke` | Acceptance criteria defined |
| Account navigation | A customer can reach account capabilities | Account destinations are missing or unreachable | E2E | Cover representative `Orders & Payment` and `Privacy & Security` destinations | `@e2e @regression` | Discovery pending |
| Catalog | A customer can discover purchasable products | No product can be found or selected | API + E2E | Define representative catalog contract and browser outcome | To classify | Risk analysis pending |
| Basket | A customer can build an order | Products cannot be added, updated, or removed | API + E2E | Define basket contract and critical browser journey | To classify | Risk analysis pending |
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
