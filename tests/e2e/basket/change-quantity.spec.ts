// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

test.describe("Basket", () => {
  test("Change the quantity of a basket item - @e2e @regression", async ({
    loginPage,
    page,
    registeredUser,
    startupDialogs,
  }) => {
    await loginPage.goto();
    await startupDialogs.dismissAll();
    await loginPage.signIn(registeredUser);

    // 1. From the seed state, add 'Apple Juice (1000ml)' via 'Add to Basket' and open the basket.
    await page
      .getByRole("article")
      .filter({ hasText: "Apple Juice (1000ml)" })
      .getByRole("button", { name: "Add to Basket" })
      .click();
    await expect(
      page.getByText("Placed Apple Juice (1000ml) into basket."),
    ).toBeVisible();
    await page.getByRole("button", { name: "Show the shopping cart" }).click();
    await expect(page).toHaveURL(/\/#\/basket$/);

    const row = page.getByRole("row").filter({ hasText: "Apple Juice" });
    const quantityCell = row.getByRole("cell").nth(2);
    const decreaseButton = quantityCell.getByRole("button").first();
    const increaseButton = quantityCell.getByRole("button").last();
    await expect(quantityCell).toHaveText("1");
    await expect(page.getByText("Total Price: 1.99¤")).toBeVisible();

    // 2. Click the plus-square (increase) button on the row.
    await increaseButton.click();
    await expect(quantityCell).toHaveText("2");
    await expect(row.getByRole("cell").nth(3)).toHaveText("1.99¤");
    await expect(page.getByText("Total Price: 3.98¤")).toBeVisible();

    // 3. Click the minus-square (decrease) button on the row.
    await decreaseButton.click();
    await expect(quantityCell).toHaveText("1");
    await expect(page.getByText("Total Price: 1.99¤")).toBeVisible();

    // 4. Reload the page (F5) on /#/basket.
    await page.reload();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(quantityCell).toHaveText("1");
    await expect(page.getByText("Total Price: 1.99¤")).toBeVisible();
  });
});
