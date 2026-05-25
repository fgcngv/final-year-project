

// This now tests:

//  Clerk authentication
//  protected routes
//  Stream token generation (getStreamUserToken)
//  Stream connection
//  channel creation (createOrGetChannel)
//  message sending
//  realtime UI rendering

import { test, expect } from "@playwright/test";

test.describe("Stream Chat Realtime", () => {

  test("authenticated user can open chat room", async ({ page }) => {

    // go directly to chats page
    await page.goto("/en/chats");

    // ensure authenticated
    await expect(page.locator("body")).not.toContainText("Not Authenticated");

    // find first chat
    const firstChat = page.locator("a[href^='/chats/']").first();

    const count = await firstChat.count();

    // if no chats exist skip safely
    test.skip(count === 0, "No chat matches available");

    // open chat
    await firstChat.click();

    // verify dynamic chat route
    await expect(page).toHaveURL(/\/chats\/.+/);

    // verify Stream chat initialized
    await expect(page.locator("input[placeholder='Type a message...']")).toBeVisible();

  });

  test("authenticated user can send message", async ({ page }) => {

    await page.goto("/en/chats");

    const firstChat = page.locator("a[href^='/chats/']").first();

    const count = await firstChat.count();

    test.skip(count === 0, "No chat matches available");

    await firstChat.click();

    // wait for stream chat input
    const messageInput = page.locator(
      "input[placeholder='Type a message...']"
    );

    await expect(messageInput).toBeVisible();

    // unique message
    const message = `playwright-test-${Date.now()}`;

    // type message
    await messageInput.fill(message);

    // send
    await page.locator("button[type='submit']").click();

    // verify message appears
    await expect(page.locator(`text=${message}`)).toBeVisible();

  });

});