import { request, expect } from "@playwright/test";

export async function registerUser(emailData: string, passwordData: string) {
  const registerUserContext = await request.newContext();
  const apiUrl = process.env.API_URL;
  if (!apiUrl) throw new Error('API_URL is not defined in the environment variables');

  const response = await registerUserContext.post(apiUrl + "/users/register", {
    data: {
      first_name: "Essential",
      last_name: "Training",
      dob: "2001-04-28",
      phone: "55555555555",
      email: emailData,
      password: passwordData,
      address: {
        street: "42",
        city: "New York",
        state: "New York",
        country: "US",
        postal_code: "55555",
      },
    },
  });

  expect(response.status()).toBe(200);
  return response.status();
}
