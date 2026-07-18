import { expect, test } from "../fixtures/test.fixture";

test.describe("Authentication", () => {
  test.beforeEach(async ({ loginPage, startupDialogs }) => {
    await loginPage.goto();
    await startupDialogs.dismissIfVisible();
  });

  test("A user can sign in and sign out - @e2e @critical @smoke", async ({
    accountMenu,
    loginPage,
    page,
    registeredUser,
  }) => {
    await loginPage.signIn(registeredUser);

    await expect(page).toHaveURL(/\/#\/search$/);

    await accountMenu.open();
    await expect(accountMenu.userProfileItem).toContainText(
      registeredUser.email,
    );

    await accountMenu.logout();
    await accountMenu.open();

    await expect(accountMenu.anonymousLoginItem).toBeVisible();
  });

  test("Invalid password is rejected - @e2e @critical @regression", async ({
    loginPage,
    page,
    registeredUser,
  }) => {
    await loginPage.signIn({
      ...registeredUser,
      password: `${registeredUser.password}-invalid`,
    });

    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/\/#\/login$/);
    await expect(loginPage.submitButton).toBeVisible();
  });
});
