import {test, expect} from "@playwright/test";

test.describe("Menu Page", () => {
  const bagelType = "Plain";
  test(`Add ${bagelType} Begal to Cart`, async ({ page }) => {
    await page.goto("http://localhost:5173/menu.html");
  
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(`Add ${bagelType} bagel to cart?`);
      await dialog.accept();

      page.once("dialog", async (dialog2) => {
        expect(dialog2.message()).toContain(`${bagelType} bagel added to cart!`);
        await dialog2.accept();
      });
    });
    await page.getByRole("cell", {name: new RegExp(`^${bagelType}`)})
    .locator("..").getByRole("button").click();
    // double dot mean, move up to the parent locator, i.e. particular row.
  });
});
