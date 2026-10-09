import type { Locator, Page } from "@playwright/test";

// Juice Shop's basket row buttons (decrease, increase, delete) have no
// accessible name, so they are located by their position in the row. This is
// the one place that knows it: if the table layout changes, fix it here.
const CELL = { name: 1, quantity: 2, price: 3 } as const;

export class BasketRow {
  readonly row: Locator;
  readonly name: Locator;
  readonly quantity: Locator;
  readonly price: Locator;

  constructor(page: Page, productName: string) {
    this.row = page.getByRole("row").filter({ hasText: productName });
    const cells = this.row.getByRole("cell");
    this.name = cells.nth(CELL.name);
    this.quantity = cells.nth(CELL.quantity);
    this.price = cells.nth(CELL.price);
  }

  async increase(): Promise<void> {
    await this.quantity.getByRole("button").last().click();
  }

  async decrease(): Promise<void> {
    await this.quantity.getByRole("button").first().click();
  }

  async remove(): Promise<void> {
    await this.row.getByRole("cell").last().getByRole("button").click();
  }
}

export class BasketPage {
  // Header button, also carries the item count badge
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartButton = page.getByRole("button", {
      name: "Show the shopping cart",
    });
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  heading(email: string): Locator {
    return this.page.getByRole("heading", { name: `Your Basket (${email})` });
  }

  total(amount: string): Locator {
    return this.page.getByText(`Total Price: ${amount}`);
  }

  row(productName: string): BasketRow {
    return new BasketRow(this.page, productName);
  }

  async open(): Promise<void> {
    await this.cartButton.click();
  }
}
