import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly requiredFieldMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[name='username'][placeholder='Username']");
    this.passwordInput = page.locator("input[name='password'][placeholder='Password']");
    this.loginButton = page.locator("button[type='submit'].orangehrm-login-button");
    this.invalidCredentialsMessage = page.locator(".oxd-alert-content-text").filter({ hasText: "Invalid credentials" });
    this.requiredFieldMessages = page.locator(".oxd-input-field-error-message", { hasText: "Required" });
  }

  async gotoLoginPage(): Promise<void> {
    const baseUrl = process.env.BASE_URL ?? "https://opensource-demo.orangehrmlive.com";
    const loginPath = process.env.LOGIN_PATH ?? "/web/index.php/auth/login";
    const loginUrl = loginPath.startsWith("http") ? loginPath : new URL(loginPath, baseUrl).toString();
    await this.page.goto(loginUrl);
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async submitEmptyLoginForm(): Promise<void> {
    await this.loginButton.click();
  }
}
