import type { Locator, Page } from "@playwright/test";

export class StartupDialogsComponent {
  private readonly welcomeBanner: Locator;
  private readonly cookieMessage: Locator;

  constructor(page: Page) {
    this.welcomeBanner = page.getByRole("button", {
      name: "Close Welcome Banner",
    });
    this.cookieMessage = page.getByRole("button", {
      name: "dismiss cookie message",
    });
  }

  async dismissIfVisible(): Promise<void> {
    if (await this.welcomeBanner.isVisible()) {
      await this.welcomeBanner.click();
    }

    if (await this.cookieMessage.isVisible()) {
      await this.cookieMessage.click();
    }
  }
}
