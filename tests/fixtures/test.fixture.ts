import { test as base } from "@playwright/test";
import { registerNewUser } from "../api-clients/users.api-client";
import { buildTestUser } from "../factories/test-user.factory";
import { AccountMenuComponent } from "../page-objects/components/account-menu.component";
import { StartupDialogsComponent } from "../page-objects/components/startup-dialogs.component";
import { LoginPage } from "../page-objects/login.page";
import type { TestUser } from "../types";

type AppFixtures = {
  registeredUser: TestUser;
  loginPage: LoginPage;
  accountMenu: AccountMenuComponent;
  startupDialogs: StartupDialogsComponent;
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
});

export { expect } from "@playwright/test";
