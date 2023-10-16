import { FullConfig, chromium } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

const storageStatePath = ".auth/user.json";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  await page.context().storageState({ path: storageStatePath });
  await browser.close();
}

export default globalSetup;
