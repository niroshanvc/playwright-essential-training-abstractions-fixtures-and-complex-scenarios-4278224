import { createMessage } from "@datafactory/messages";
import { registerUser } from "@datafactory/register";
import { MessagesPage } from "@pages/account/messages.page";
import { ContactPage } from "@pages/contact/contact.page";
import { LoginPage } from "@pages/login/login.page";
import { test, expect } from "@playwright/test";

test("Customer reply to a message.", async ({ context, page }) => {
  const timeStamp = Date.now(); // Gets current epoch time in milliseconds
  const email = `new_user_${timeStamp}@test.com`;
  const password = "123@$%!@DERGa12551";
  const dropdownOptions = "payments";
  const messageText =
    "This is a really long message that goes on an on for at least 50 characters";
  const messageUserAuthFile = ".auth/messageUser.json";

  await test.step("Create a new user", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await registerUser(email, password);
    await loginPage.login(email, password);

    await expect(page.locator('[data-test="nav-menu"]')).toContainText(
      "Test User",
    );

    await context.storageState({ path: messageUserAuthFile }); // save the token and cookies
  });

  await test.step("Create a new message with datafactory", async () => {
    await createMessage(
      "Testy Message Name",
      messageText,
      dropdownOptions,
      messageUserAuthFile,
    );
  });

  await test.step("reply and validate message", async () => {
    const messagePage = new MessagesPage(page);
    await messagePage.gotoMessages();
    await expect(messagePage.table).toContainText(messageText.substring(0, 25));
    await expect(messagePage.table).toContainText(dropdownOptions);

    await messagePage.firstDetailLink.click();
    await expect(messagePage.messagesList).toContainText(messageText);

    const replyMessage = "Reply texts";
    await messagePage.replyInput.fill(replyMessage);
    await messagePage.replyButton.click();
    await expect(messagePage.replyList).toContainText(replyMessage);
  });
});
