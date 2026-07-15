import { test, expect } from "@fixtures/pages.fixture";

test("validate promo code popup", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Get Promo Code" }).click();
  const newPopup = await popupPromise;

  // interact wih the popup window
  await expect(newPopup.locator("p")).toHaveText("The promo code is: B6G2");
})