import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[name='username'][placeholder='Username']");
    this.passwordInput = page.locator("input[name='password'][placeholder='Password']");
    this.loginButton = page.locator("button[type='submit'].orangehrm-login-button");
  }

  async gotoLoginPage(): Promise<void> {
    const loginPath = process.env.LOGIN_PATH ?? "/web/index.php/auth/login";
    await this.page.goto(loginPath);
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
