import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { PageFactory } from "../src/factories/PageFactory";

dotenv.config();

test("OrangeHRM login redirects to dashboard", async ({ page }) => {
  const username = process.env.ORANGE_USERNAME;
  const password = process.env.ORANGE_PASSWORD;
  const dashboardPath = process.env.DASHBOARD_PATH ?? "/web/index.php/dashboard/index";

  if (!username || !password) {
    throw new Error("Missing ORANGE_USERNAME or ORANGE_PASSWORD in .env file.");
  }

  const loginPage = PageFactory.loginPage(page);
  const dashboardPage = PageFactory.dashboardPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login(username, password);

  await expect(page).toHaveURL(new RegExp(`${dashboardPath}$`));
  await dashboardPage.waitForDashboardLoaded();
  await expect(dashboardPage.dashboardHeader).toBeVisible();
});
