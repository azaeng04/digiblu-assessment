import { Locator, Page, expect } from "@playwright/test";
import { MenuSection } from "./sections/menu.section";

export class HomePage {
  private readonly productList: Locator;
  private readonly menu: MenuSection;

  constructor(private readonly page: Page) {
    this.productList = this.page.locator(".inventory_list");
    this.menu = new MenuSection(this.page);
  }

  public async navigate() {
    return this.page.goto("/inventory.html");
  }

  public async verifyCategoryListIsVisible() {
    const isVisible = await this.productList.isVisible();
    expect(isVisible).toBe(true);
  }

  public async logout() {
    const sidebar = await this.menu.clickViewMenu();
    return sidebar.clickLogout();
  }
}
