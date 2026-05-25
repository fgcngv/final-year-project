

// npx playwright test


import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/en/sign-in");

  // Fill credentials
  await page.getByLabel(/email/i).fill("birhanugezahegn099@gmail.com");
  await page.locator('input[type="password"]').fill("7043@beki");

  // Click ONLY the primary submit button (not Google login)
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  // =========================
  // IMPORTANT: Clerk may redirect to MFA step
  // =========================

  try {
    // wait for successful login redirect (adjust to your app route)
    await page.waitForURL("**/chats", { timeout: 15000 });
  } catch (e) {
    console.log(" Login did not complete. Possibly MFA required.");

    // detect MFA screen
    const mfaVisible = await page
      .getByText(/verification|code|factor|authenticate/i)
      .isVisible()
      .catch(() => false);

    if (mfaVisible) {
      throw new Error(
        "Clerk MFA is enabled. Playwright cannot complete OTP automatically."
      );
    }

    throw e;
  }

  // Save session only if login succeeded
  await page.context().storageState({ path: authFile });

  await expect(page).toHaveURL(/\/chats/);
});