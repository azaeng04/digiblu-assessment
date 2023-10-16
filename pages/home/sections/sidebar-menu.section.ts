import { Locator, Page } from "@playwright/test";

export class SidebarMenuSection {
  private readonly sidebarMenu: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.sidebarMenu = this.page.locator(".bm-menu");
    this.logoutLink = this.sidebarMenu.getByText("Logout");
  }

  public async clickLogout() {
    return this.logoutLink.click();
  }
}
