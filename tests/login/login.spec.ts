import { test, expect } from "@fixtures/pages.fixtures";
import { LoginPage } from "@pages/login/login.page";
import { registerUser } from "@datafactory/register";

test("login without page object", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill("niroshanvc@gmail.com");
  await page.locator('[data-test="password"]').fill("QA$%45ko");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jane Doe",);
  await expect(page.locator('[data-test="page-title"]')).toContainText("My account");
});

test("login with page object", async ({ page }) => {
  const email = "niroshanvc@gmail.com";
  const password = "QA$%45ko";
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("login with newly registered user", async ({ page }) => {
  const email = `test${Date.now()}@test.com`;
  const password = "fjdWEdfs82@";

  await registerUser(email, password);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);
  await page
    .getByTestId("nav-menu")
    .waitFor({ state: "visible", timeout: 10000 });

  await expect(page.getByTestId("nav-menu")).toContainText("Test User");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("login with newly registered user - using fixture", async ({ page, loginPage }) => {
  const email = `test${Date.now()}@test.com`;
  const password = "fjdWEdfs82@";

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email, password);
  await page
    .getByTestId("nav-menu")
    .waitFor({ state: "visible", timeout: 10000 });

  await expect(page.getByTestId("nav-menu")).toContainText("Test User");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});