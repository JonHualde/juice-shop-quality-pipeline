// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

const PRODUCT = "Apple Juice (1000ml)";

test.describe("Basket", () => {
  test("Remove a product from the basket - @e2e @critical", async ({
    basketPage,
    catalogPage,
    page,
    signedInCustomer: _customer,
  }) => {
    // 1. From the seed state, add the product, open the basket, raise the quantity to 2.
    await catalogPage.addToBasket(PRODUCT);
    await expect(catalogPage.addedConfirmation(PRODUCT)).toBeVisible();
    await basketPage.open();
    await expect(page).toHaveURL(/\/#\/basket$/);

    const row = basketPage.row(PRODUCT);
    await row.increase();
    await expect(row.quantity).toHaveText("2");
    await expect(basketPage.total("3.98¤")).toBeVisible();

    // 2. Delete the line: it goes whatever the quantity.
    await row.remove();
    await expect(row.row).toHaveCount(0);
    await expect(basketPage.total("0¤")).toBeVisible();
    await expect(basketPage.checkoutButton).toBeDisabled();
    await expect(basketPage.cartButton).toContainText("0");

    // 3. Reload: the removal was saved.
    await page.reload();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(row.row).toHaveCount(0);
    await expect(basketPage.total("0¤")).toBeVisible();
    await expect(basketPage.checkoutButton).toBeDisabled();
  });
});
