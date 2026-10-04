// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

test.describe("Basket", () => {
  test("Add a product to the basket - @e2e @critical", async ({
    loginPage,
    page,
    registeredUser,
    startupDialogs,
  }) => {
    await loginPage.goto();
    await startupDialogs.dismissAll();
    await loginPage.signIn(registeredUser);

    const cartButton = page.getByRole("button", {
      name: "Show the shopping cart",
    });

    // 1. Starting from the seed state, confirm the basket badge next to 'Your Basket' shows 0.
    await expect(cartButton).toContainText("0");

    // 2. On the catalog, click 'Add to Basket' on the 'Apple Juice (1000ml)' card (1.99¤).
    await page
      .getByRole("article")
      .filter({ hasText: "Apple Juice (1000ml)" })
      .getByRole("button", { name: "Add to Basket" })
      .click();
    await expect(
      page.getByText("Placed Apple Juice (1000ml) into basket."),
    ).toBeVisible();
    await expect(cartButton).toContainText("1");

    // 3. Click 'Show the shopping cart'.
    await cartButton.click();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(
      page.getByRole("heading", {
        name: `Your Basket (${registeredUser.email})`,
      }),
    ).toBeVisible();
    const rows = page.getByRole("row").filter({ hasText: "Apple Juice" });
    await expect(rows).toHaveCount(1);
    const cells = rows.getByRole("cell");
    await expect(cells.nth(1)).toHaveText("Apple Juice (1000ml)");
    await expect(cells.nth(2)).toHaveText("1");
    await expect(cells.nth(3)).toHaveText("1.99¤");
    await expect(page.getByText("Total Price: 1.99¤")).toBeVisible();
    await expect(page.getByRole("button", { name: "Checkout" })).toBeEnabled();
  });
});
