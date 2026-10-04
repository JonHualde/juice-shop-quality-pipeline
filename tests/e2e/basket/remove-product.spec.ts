// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

test.describe("Basket", () => {
  test("Remove a product from the basket - @e2e @critical", async ({
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

    // 1. From the seed state, add 'Apple Juice (1000ml)', open the basket, and increase quantity to 2 (total 3.98¤).
    await page
      .getByRole("article")
      .filter({ hasText: "Apple Juice (1000ml)" })
      .getByRole("button", { name: "Add to Basket" })
      .click();
    await expect(
      page.getByText("Placed Apple Juice (1000ml) into basket."),
    ).toBeVisible();
    await cartButton.click();
    await expect(page).toHaveURL(/\/#\/basket$/);

    const row = page.getByRole("row").filter({ hasText: "Apple Juice" });
    const quantityCell = row.getByRole("cell").nth(2);
    await quantityCell.getByRole("button").last().click();
    await expect(quantityCell).toHaveText("2");
    await expect(page.getByText("Total Price: 3.98¤")).toBeVisible();

    // 2. Click the trash-alt (delete) button on the row, regardless of quantity.
    await row.getByRole("cell").last().getByRole("button").click();
    await expect(row).toHaveCount(0);
    await expect(page.getByText("Total Price: 0¤")).toBeVisible();
    await expect(page.getByRole("button", { name: "Checkout" })).toBeDisabled();
    await expect(cartButton).toContainText("0");

    // 3. Reload the page on /#/basket.
    await page.reload();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(row).toHaveCount(0);
    await expect(page.getByText("Total Price: 0¤")).toBeVisible();
    await expect(page.getByRole("button", { name: "Checkout" })).toBeDisabled();
  });
});
