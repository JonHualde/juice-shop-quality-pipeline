// spec: specs/basket.md
// seed: tests/e2e/seed.spec.ts
import { expect, test } from "../../fixtures/test.fixture";

const PRODUCT = "Apple Juice (1000ml)";

test.describe("Basket", () => {
  test("Add a product to the basket - @e2e @critical", async ({
    basketPage,
    catalogPage,
    page,
    signedInCustomer,
  }) => {
    // 1. Starting from the seed state, confirm the basket badge shows 0.
    await expect(basketPage.cartButton).toContainText("0");

    // 2. On the catalog, click 'Add to Basket' on the product card (1.99¤).
    await catalogPage.addToBasket(PRODUCT);
    await expect(catalogPage.addedConfirmation(PRODUCT)).toBeVisible();
    await expect(basketPage.cartButton).toContainText("1");

    // 3. Open the basket.
    await basketPage.open();
    await expect(page).toHaveURL(/\/#\/basket$/);
    await expect(basketPage.heading(signedInCustomer.email)).toBeVisible();

    const row = basketPage.row(PRODUCT);
    await expect(row.row).toHaveCount(1);
    await expect(row.name).toHaveText(PRODUCT);
    await expect(row.quantity).toHaveText("1");
    await expect(row.price).toHaveText("1.99¤");
    await expect(basketPage.total("1.99¤")).toBeVisible();
    await expect(basketPage.checkoutButton).toBeEnabled();
  });
});
