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
