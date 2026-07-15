import { test, expect } from "@fixtures/pages.fixture";
import * as fs from "fs";

test("Create an order", async ({ page }) => {
  page.goto("http://localhost:5173/order.html");
  await page
    .locator("#designUpload")
    .setInputFiles("lib/uploads/image-file.png");
  await page.locator("#instructions").fill("Nothing to say");
  await page.locator("#quantity").fill("100");

  // handle success alert
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("uploaded successfully!");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Place Order" }).click();

  // download
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Receipt" }).click();
  const download = await downloadPromise;

  // javascript call to get the file name
  const fileName = __dirname + download.suggestedFilename();
  // Wait for the download process to complete and save the downloaded file somewhere.
  await download.saveAs(fileName);

  const fileContent = fs.readFileSync(fileName, "utf8");
  console.log("Content: ", fileContent);
  //remove the file from the file location
  fs.unlinkSync(fileName);
});