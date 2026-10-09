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

  async dismissAll(): Promise<void> {
    // isVisible() does not wait, so it raced with the Angular dialog rendering
    // and left the modal backdrop in place, intercepting every later click.
    // Juice Shop always shows both on a fresh browser context, so wait for them.
    await this.dismiss(this.welcomeBanner);
    await this.dismiss(this.cookieMessage);
  }

  private async dismiss(control: Locator): Promise<void> {
    await control.waitFor({ state: "visible" });
    await control.click();
    await control.waitFor({ state: "hidden" });
  }
}
