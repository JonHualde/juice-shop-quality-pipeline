// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

const PRODUCT = "Apple Juice (1000ml)";

test.describe("Basket", () => {
  test("Change the quantity of a basket item - @e2e @regression", async ({
    basketPage,
    catalogPage,
    page,
    signedInCustomer: _customer,
  }) => {
    // 1. From the seed state, add the product and open the basket.
    await catalogPage.addToBasket(PRODUCT);
    await expect(catalogPage.addedConfirmation(PRODUCT)).toBeVisible();
    await basketPage.open();
    await expect(page).toHaveURL(/\/#\/basket$/);

    const row = basketPage.row(PRODUCT);
    await expect(row.quantity).toHaveText("1");
    await expect(basketPage.total("1.99¤")).toBeVisible();

    // 2. Increase the quantity.
    await row.increase();
    await expect(row.quantity).toHaveText("2");
    await expect(row.price).toHaveText("1.99¤");
    await expect(basketPage.total("3.98¤")).toBeVisible();

    // 3. Decrease the quantity.
    await row.decrease();
    await expect(row.quantity).toHaveText("1");
    await expect(basketPage.total("1.99¤")).toBeVisible();

    // 4. Reload: the quantity comes back from the server.
    await page.reload();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(row.quantity).toHaveText("1");
    await expect(basketPage.total("1.99¤")).toBeVisible();
  });
});
