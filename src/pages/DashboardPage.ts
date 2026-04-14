import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly dashboardHeader: Locator;

  constructor(private readonly page: Page) {
    this.dashboardHeader = page.locator("h6:has-text('Dashboard')");
  }

  async waitForDashboardLoaded(): Promise<void> {
    await this.dashboardHeader.waitFor({ state: "visible" });
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}
