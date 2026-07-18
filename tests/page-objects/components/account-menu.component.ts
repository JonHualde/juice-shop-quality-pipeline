import type { Locator, Page } from "@playwright/test";

export class AccountMenuComponent {
  readonly userProfileItem: Locator;
  readonly anonymousLoginItem: Locator;

  private readonly trigger: Locator;
  private readonly logoutItem: Locator;
  private readonly ordersAndPaymentItem: Locator;
  private readonly orderHistoryItem: Locator;
  private readonly privacyAndSecurityItem: Locator;
  private readonly changePasswordItem: Locator;

  constructor(page: Page) {
    this.trigger = page.getByRole("button", {
      name: "Show/hide account menu",
    });
    this.userProfileItem = page.getByRole("menuitem", {
      name: "Go to user profile",
    });
    this.anonymousLoginItem = page.getByRole("menuitem", {
      name: "Go to login page",
    });
    this.logoutItem = page.getByRole("menuitem", { name: "Logout" });
    this.ordersAndPaymentItem = page.getByRole("menuitem", {
      name: "Show Orders and Payment Menu",
    });
    this.orderHistoryItem = page.getByRole("menuitem", {
      name: "Go to order history page",
    });
    this.privacyAndSecurityItem = page.getByRole("menuitem", {
      name: "Show Privacy and Security Menu",
    });
    this.changePasswordItem = page.getByRole("menuitem", {
      name: "Go to change password page",
    });
  }

  async open(): Promise<void> {
    if ((await this.trigger.getAttribute("aria-expanded")) !== "true") {
      await this.trigger.click();
    }
  }

  async logout(): Promise<void> {
    await this.logoutItem.click();
  }

  async goToOrderHistory(): Promise<void> {
    await this.open();
    await this.ordersAndPaymentItem.click();
    await this.orderHistoryItem.click();
  }

  async goToChangePassword(): Promise<void> {
    await this.open();
    await this.privacyAndSecurityItem.click();
    await this.changePasswordItem.click();
  }
}
