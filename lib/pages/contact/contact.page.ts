import { type Locator, type Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly subjectField: Locator;
  readonly message: Locator;
  readonly sendButton : Locator;
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page;
    this.subjectField = page.getByRole("combobox", { name: "Subject" });
    this.message = page.locator('[data-test="message"]');
    this.sendButton = page.locator(".btnSubmit");
    this.successMessage = page.getByRole("alert");
  }

  async fillContact(
    subject: string, messageText: string) {
    await this.subjectField.selectOption(subject);
    await this.message.fill(messageText);
    await this.sendButton.click();
  }

  async getSuccessMessage() {
    await this.successMessage.textContent();
  }

  async gotoContact() {
    await this.page.goto("/contact");
  }
}