import { expect, test } from "../fixtures/test.fixture";

test.describe("Account navigation", () => {
  test.beforeEach(
    async ({ loginPage, registeredUser, startupDialogs }) => {
      await loginPage.goto();
      await startupDialogs.dismissAll();
      await loginPage.signIn(registeredUser);
    },
  );

  test("A signed-in user can reach order history - @e2e @regression", async ({
    accountMenu,
    page,
  }) => {
    await accountMenu.goToOrderHistory();

    await expect(page).toHaveURL(/\/#\/order-history$/);
    await expect(
      page
        .locator("app-order-history")
        .getByText("Order History", { exact: true }),
    ).toBeVisible();
  });

  test("A signed-in user can reach change password - @e2e @regression", async ({
    accountMenu,
    page,
  }) => {
    await accountMenu.goToChangePassword();

    await expect(page).toHaveURL(/\/#\/privacy-security\/change-password$/);
    await expect(
      page.getByRole("heading", { name: "Change Password" }),
    ).toBeVisible();
  });
});
