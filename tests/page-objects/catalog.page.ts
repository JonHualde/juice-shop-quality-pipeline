import type { Locator, Page } from "@playwright/test";

export class CatalogPage {
  constructor(private readonly page: Page) {}

  private card(productName: string): Locator {
    return this.page.getByRole("article").filter({ hasText: productName });
  }

  // Toast shown once the product is in the basket
  addedConfirmation(productName: string): Locator {
    return this.page.getByText(`Placed ${productName} into basket.`);
  }

  async addToBasket(productName: string): Promise<void> {
    await this.card(productName)
      .getByRole("button", { name: "Add to Basket" })
      .click();
  }
}
