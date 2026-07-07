import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByTestId('register-link').click();
  await page.getByTestId('first-name').fill('Essential ');
  await page.getByTestId('last-name').fill('Training');
  await page.getByTestId('dob').fill('2001-04-28');
  await page.getByTestId('country').selectOption('LK');
  await page.getByTestId('postal_code').fill('55555');
  await page.getByTestId('house_number').fill('42');
  await page.getByTestId('phone').fill('55555555555');
  await page.getByTestId('email').fill('linkedinlearning2@test.com');
  await page.getByTestId('password').fill('qazQAZ1*%');
  await page.getByTestId('register-submit').click();
});