import { expect, test } from "@playwright/test";
import { beforeEach } from "node:test";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login.page";

let homePage: HomePage;
let loginPage: LoginPage;

test.describe("Home Page", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
  });

  test("should throw error when attempting to navigate to a page without logging in", async () => {
    const expected =
      "Epic sadface: You can only access '/inventory.html' when you are logged in.";

    await homePage.navigate();
    const actual = await loginPage.getErrorMessage();

    expect(actual).toEqual(expected);
  });
});

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.navigate();
  });

  test("should logout successfully", async () => {
    await homePage.logout();

    await loginPage.verifyLoginModalIsVisible();
  });
});
