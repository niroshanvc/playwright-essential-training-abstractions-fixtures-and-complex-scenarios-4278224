import { test, expect } from "@playwright/test";

test("Validate confirmation alert message", async ({ context, page }) => {
  await page.goto("http://localhost:5173/");
  // since we are handling brand new window, we need to use context
  const contactPagePromise = context.waitForEvent("page");
  await page.getByRole("link", { name: "Contact" }).click();
  const contactPage = await contactPagePromise;
  // In Contact new window
  await contactPage.locator("#name").fill("Testy Bunny");
  await contactPage.locator("#email").fill("testy@mail.com");
  await contactPage.locator("#message").fill("New Message entered");
  // handle the first confirmation
  contactPage.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Send this message?");
    await dialog.accept(); // click Ok to confirm
    // handle the second confirmation
    contactPage.once("dialog", async (dialog2) => {
      expect(dialog2.message()).toContain("Message sent successfully!");
      await dialog2.dismiss(); // click Ok on the alert
    });
  });
  // before click on the Send Message button we have to handle the confirmation alert.
  await contactPage.getByRole("button", { name: "Send Message" }).click();
  await expect(contactPage.locator("#name")).toHaveValue("");
});
