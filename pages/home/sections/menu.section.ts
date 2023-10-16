import { Locator, Page } from "@playwright/test";
import { SidebarMenuSection } from "./sidebar-menu.section";

export class MenuSection {
  private readonly menuSection: Locator;
  private readonly viewMenuButton: Locator;

  constructor(private readonly page: Page) {
    this.menuSection = this.page.locator(".header_container");
    this.viewMenuButton = this.menuSection.locator("#react-burger-menu-btn");
  }

  public async clickViewMenu() {
    await this.viewMenuButton.click();
    return new SidebarMenuSection(this.page);
  }
}
