import { Locator, Page } from "@playwright/test";
import { HomePage } from "./home/home.page";

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginModal: Locator;

  constructor(private readonly page: Page) {
    this.username = this.page.getByPlaceholder("Username");
    this.password = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByText("Login");
    this.errorMessage = this.page.locator(".error-message-container.error");
    this.loginModal = this.page.locator(".login_wrapper-inner");
  }

  public async getErrorMessage() {
    const isErrorVisible = await this.errorMessage.isVisible();
    if (!isErrorVisible) return null;
    const error = await this.errorMessage.textContent();
    return error;
  }

  public async navigate() {
    return this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  public async login(username: string, password: string) {
    await this.fillInUsername(username);
    await this.fillInPassword(password);
    await this.clickLogin();
    return (await this.getErrorMessage()) ?? new HomePage(this.page);
  }

  public async clickLogin() {
    return this.loginButton.click();
  }

  public async fillInUsername(username: string) {
    return this.username.fill(username);
  }

  public async fillInPassword(password: string) {
    return this.password.fill(password);
  }

  public async verifyLoginModalIsVisible() {
    const loginIsVisible = await this.loginModal.isVisible();
    return loginIsVisible;
  }
}
