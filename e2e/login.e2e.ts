import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home/home.page";

let homePage: HomePage;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    loginPage.navigate();
  });

  test("should login successfully", async () => {
    const actual = await loginPage.login("standard_user", "secret_sauce");

    if (typeof actual === "string") {
      throw new Error("Test failed to login");
    } else {
      await actual.verifyCategoryListIsVisible();
    }
  });

  test("should display error message if username and password do not match", async () => {
    const expected =
      "Epic sadface: Username and password do not match any user in this service";
    const actual = await loginPage.login("standard_uer", "secret_sauce");

    if (typeof actual === "string") {
      expect(actual).toEqual(expected);
    } else {
      throw new Error("User should fail to log in");
    }
  });

  test("should not login without username", async () => {
    const expected = "Epic sadface: Username is required";
    await loginPage.fillInPassword("something");
    await loginPage.clickLogin();

    const result = await loginPage.getErrorMessage();

    expect(result).toEqual(expected);
  });

  test("should not login without password", async () => {
    const expected = "Epic sadface: Password is required";
    await loginPage.fillInUsername("something");
    await loginPage.clickLogin();

    const result = await loginPage.getErrorMessage();

    expect(result).toEqual(expected);
  });

  test("should display error for locked out user", async () => {
    const expected = "Epic sadface: Sorry, this user has been locked out.";
    const actual = await loginPage.login("locked_out_user", "secret_sauce");

    expect(actual).toEqual(expected);
  });
});
