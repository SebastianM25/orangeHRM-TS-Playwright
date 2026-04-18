import { expect, test } from "@playwright/test";
import { PageFactory } from "../src/factories/PageFactory";

test("OrangeHRM login redirects to dashboard", async ({ page }) => {
  const username = process.env.ORANGE_USERNAME ?? "Admin";
  const password = process.env.ORANGE_PASSWORD ?? "admin123";
  const dashboardPath = process.env.DASHBOARD_PATH ?? "/web/index.php/dashboard/index";

  const loginPage = PageFactory.loginPage(page);
  const dashboardPage = PageFactory.dashboardPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login(username, password);

  await expect(page).toHaveURL(new RegExp(`${dashboardPath}$`));
  await dashboardPage.waitForDashboardLoaded();
  await expect(dashboardPage.dashboardHeader).toBeVisible();
});

test("OrangeHRM login fails with invalid password", async ({ page }) => {
  const dashboardPath = process.env.DASHBOARD_PATH ?? "/web/index.php/dashboard/index";
  const loginPage = PageFactory.loginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login("Admin", "wrong-password");

  await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  await expect(loginPage.invalidCredentialsMessage).toHaveText(/Invalid credentials/);
  await expect(page).not.toHaveURL(new RegExp(`${dashboardPath}$`));
});

test("OrangeHRM login requires a username", async ({ page }) => {
  const loginPage = PageFactory.loginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login("", "admin123");

  await expect(loginPage.requiredFieldMessages).toHaveCount(1);
  await expect(loginPage.requiredFieldMessages.first()).toHaveText("Required");
});

test("OrangeHRM login requires both fields when submitted empty", async ({ page }) => {
  const loginPage = PageFactory.loginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.submitEmptyLoginForm();

  await expect(loginPage.requiredFieldMessages).toHaveCount(2);
  await expect(loginPage.requiredFieldMessages).toHaveText(["Required", "Required"]);
});
