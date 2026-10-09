import { test as base } from "@playwright/test";
import { registerNewUser } from "../api-clients/users.api-client";
import { buildTestUser } from "../factories/test-user.factory";
import { BasketPage } from "../page-objects/basket.page";
import { CatalogPage } from "../page-objects/catalog.page";
import { AccountMenuComponent } from "../page-objects/components/account-menu.component";
import { StartupDialogsComponent } from "../page-objects/components/startup-dialogs.component";
import { LoginPage } from "../page-objects/login.page";
import type { TestUser } from "../types";

type AppFixtures = {
  registeredUser: TestUser;
  loginPage: LoginPage;
  accountMenu: AccountMenuComponent;
  startupDialogs: StartupDialogsComponent;
  catalogPage: CatalogPage;
  basketPage: BasketPage;
  // A fresh customer, signed in, on the catalog: the agents' seed state
  signedInCustomer: TestUser;
};

export const test = base.extend<AppFixtures>({
  registeredUser: async ({ request }, use) => {
    const registeredUser = buildTestUser();
    await registerNewUser(request, registeredUser);
    await use(registeredUser);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountMenu: async ({ page }, use) => {
    await use(new AccountMenuComponent(page));
  },

  startupDialogs: async ({ page }, use) => {
    await use(new StartupDialogsComponent(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },

  signedInCustomer: async (
    { loginPage, page, registeredUser, startupDialogs },
    use,
  ) => {
    await loginPage.goto();
    await startupDialogs.dismissAll();
    await loginPage.signIn(registeredUser);
    await page.waitForURL(/\/#\/search$/);
    await use(registeredUser);
  },
});

export { expect } from "@playwright/test";
