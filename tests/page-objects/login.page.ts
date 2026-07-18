import type { Locator, Page } from "@playwright/test";
import type { TestUser } from "../types";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly invalidCredentialsMessage: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel("Text field for the login email");
    this.passwordInput = page.getByLabel("Text field for the login password");
    this.submitButton = page.getByRole("button", {
      name: "Login",
      exact: true,
    });
    this.invalidCredentialsMessage = page.getByText(
      "Invalid email or password.",
    );
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/login");
    await this.emailInput.waitFor({ state: "visible" });
  }

  async signIn(user: TestUser): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
}
