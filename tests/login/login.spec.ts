import { test, expect } from "@playwright/test";
import { LoginPage } from "../../lib/pages/login.page";
import { registerUser } from "../../lib/datafactory/register";

test("login without page object", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});


test("login with newly registered user", async ({ page}) => {
  const email = `test${Date.now()}@test.com`;
  const password = "qa0zQAZ1*%";

  await registerUser(email, password);

  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.doLogin(email, password);

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Essential Training",
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account",
  );
});