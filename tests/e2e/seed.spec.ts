import { expect, test } from "../fixtures/test.fixture";

// Seed for the Playwright test agents (.claude/agents/playwright-test-*).
// The planner and the generator start every scenario from the state this
// test leaves behind: a fresh customer, signed in, on the product catalog,
// with the startup dialogs closed. It also runs in CI as a plain smoke check.
test.describe("Seed", () => {
  test("A fresh customer is signed in on the catalog - @e2e @seed", async ({
    loginPage,
    page,
    registeredUser,
    startupDialogs,
  }) => {
    await loginPage.goto();
    await startupDialogs.dismissAll();
    await loginPage.signIn(registeredUser);

    await expect(page).toHaveURL(/\/#\/search$/);
  });
});
