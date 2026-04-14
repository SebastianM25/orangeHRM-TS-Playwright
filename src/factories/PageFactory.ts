import { type Page } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";

export class PageFactory {
  static loginPage(page: Page): LoginPage {
    return new LoginPage(page);
  }

  static dashboardPage(page: Page): DashboardPage {
    return new DashboardPage(page);
  }
}
