import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import loginState from "./.auth/user.json";

const authFile = ".auth/user.json";

export const test = base.extend<{ login: void }>({
  login: [
    async ({ page }, use, testInfo) => {
      if (loginState.cookies.length > 0)
      {
        
      } else {
        throw new Error("User needs to be logged in first");
      }

      await use();
    },
    { auto: true },
  ],
});
