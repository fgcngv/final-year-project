// import { test, expect } from "@playwright/test";

// test.describe("Chat System E2E", () => {

//   test("should load chat list page", async ({ page }) => {
//     await page.goto("/chats");

//     // i18n-safe route
//     await expect(page).toHaveURL(/\/(en\/)?chats/);

//     // either authenticated OR guest
//     const body = page.locator("body");

//     await expect(body).toBeVisible();
//   });

//   test("should display chat conversations", async ({ page }) => {
//     await page.goto("/chats");

//     const body = page.locator("body");

//     // Handle unauthenticated state
//     if (await body.textContent()?.then(t => t?.includes("Not Authenticated!"))) {
//       await expect(body).toContainText("Not Authenticated!");
//       return;
//     }

//     // Authenticated flow
//     const chatItems = page.locator("a[href*='/chats/']");

//     await page.waitForLoadState("networkidle");

//     const hasChats = await chatItems.count();

//     if (hasChats > 0) {
//       await expect(chatItems.first()).toBeVisible();
//     } else {
//       await expect(body).toContainText("No conversations");
//     }
//   });

//   test("should open a chat conversation", async ({ page }) => {
//     await page.goto("/chats");

//     const body = page.locator("body");

//     if (await body.textContent()?.then(t => t?.includes("Not Authenticated!"))) {
//       return;
//     }

//     const chatLink = page.locator("a[href*='/chats/']").first();

//     if (await chatLink.count() > 0) {
//       await chatLink.click();

//       await expect(page).toHaveURL(/\/chats\/.+/);
//     }
//   });

//   test("should show unread message badge when applicable", async ({ page }) => {
//     await page.goto("/chats");

//     const body = page.locator("body");

//     if (await body.textContent()?.then(t => t?.includes("Not Authenticated!"))) {
//       return;
//     }

//     const badge = page.locator(".bg-red-500");

//     if (await badge.count() > 0) {
//       await expect(badge.first()).toBeVisible();
//     }
//   });

// });





import { test, expect } from "@playwright/test";

test.describe("Authenticated Chat System", () => {

  test("user can access protected chats page", async ({ page }) => {
    await page.goto("/en/chats");

    await expect(page).toHaveURL(/\/en\/chats/);

    await expect(page.getByText("Messages")).toBeVisible();
  });

  test("chat list renders correctly", async ({ page }) => {
    await page.goto("/en/chats");

    await page.waitForLoadState("networkidle");

    const body = page.locator("body");

    await expect(body).not.toContainText("Not Authenticated!");
  });

  test("user can open a conversation", async ({ page }) => {
    await page.goto("/en/chats");

    const chatLink = page.locator("a[href*='/chats/']").first();

    if (await chatLink.count()) {
      await chatLink.click();

      await expect(page).toHaveURL(/\/en\/chats\/.+/);

      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("notifications badge can render", async ({ page }) => {
    await page.goto("/en/chats");

    const badge = page.locator(".bg-red-500");

    if (await badge.count() > 0) {
      await expect(badge.first()).toBeVisible();
    }
  });
});