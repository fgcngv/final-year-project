

// npx playwright test tests/e2e/order.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Order Creation Flow", () => {

  test("should create an order successfully", async ({ page }) => {

    // 1. Go to cart
    await page.goto("/en/cart");

    // 2. Ensure cart has items
    const cartItems = page.locator("[data-testid='cart-item']");
    await expect(cartItems.first()).toBeVisible();

    // 3. Click checkout button
    await page.getByRole("button", { name: /checkout/i }).click();

    // 4. Wait for checkout page
    await expect(page).toHaveURL(/checkout/);

    // 5. Fill shipping details (adjust fields to your UI)
    await page.getByLabel(/address/i).fill("Addis Ababa Bole Road");
    await page.getByLabel(/phone/i).fill("0912345678");

    // 6. Place order
    await page.getByRole("button", { name: /place order/i }).click();

    // 7. Confirm success page or message
    await expect(page.getByText(/order placed/i)).toBeVisible();
  });

});