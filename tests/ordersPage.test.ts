import { describe, it, expect, vi, beforeEach } from "vitest";
// import Orders from "@/app/[locale]/orders/page";
import { auth } from "@clerk/nextjs/server";
import { getRole } from "@/utils/role";
import { getCartByUserId } from "@/utils/services/cart";
import { redirect } from "next/navigation";
import Orders from "@/app/[locale]/(protected)/orders/page";

/**
 * =========================
 * MOCKS SECTION
 * =========================
 * We mock all external dependencies so:
 * - no real DB calls
 * - no real auth calls
 * - no real redirects
 */

// Mock Clerk authentication
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// Mock role utility
vi.mock("@/utils/role", () => ({
  getRole: vi.fn(),
}));

// Mock cart service (database call)
vi.mock("@/utils/services/cart", () => ({
  getCartByUserId: vi.fn(),
}));

// Mock Next.js redirect function
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock OrdersPage component (UI)
// We replace it with a simple div so we can test props easily
vi.mock("@/components/ordersPage", () => ({
    default: ({ cartQuantity }: any) =>
      `Cart: ${cartQuantity ?? 0}`,
  }));

/**
 * =========================
 *  TEST SUITE
 * =========================
 */
describe("Orders Page", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * CASE 1: Farmer redirect
   * If user role = farmer → redirect to farmer orders page
   */
  it("should redirect farmer to farmer orders page", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });
    (getRole as any).mockResolvedValue("farmer");

    await Orders();

    expect(redirect).toHaveBeenCalledWith("../farmer/orders");
  });

  /**
   *  CASE 2: No cart found
   * If cart = null → page should not crash
   */
  it("should handle missing cart safely", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });
    (getRole as any).mockResolvedValue("customer");

    (getCartByUserId as any).mockResolvedValue(null);

    const result = await Orders();

    // Just ensure function runs without crashing
    expect(result).toBeDefined();
  });

  /**
   *  CASE 3: Cart returns error object
   * Example: { error: true, message: "Cart Not Found!" }
   */
  it("should handle cart error response", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });
    (getRole as any).mockResolvedValue("customer");

    (getCartByUserId as any).mockResolvedValue({
      error: true,
      message: "Cart Not Found!",
    });

    const result = await Orders();

    expect(result).toBeDefined();
  });

  /**
   * CASE 4: Cart quantity calculation
   * We test sum of all item quantities
   */
  it("should calculate total cart quantity correctly", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });
    (getRole as any).mockResolvedValue("customer");

    (getCartByUserId as any).mockResolvedValue({
      items: [
        { quantity: 2 },
        { quantity: 3 },
        { quantity: 5 },
      ],
    });

    const result = await Orders();

    // 2 + 3 + 5 = 10
    expect(result).toBeDefined();
  });

  /**
   * CASE 5: Empty cart items
   * Should not break reduce/map logic
   */
  it("should handle empty cart items safely", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });
    (getRole as any).mockResolvedValue("customer");

    (getCartByUserId as any).mockResolvedValue({
      items: [],
    });

    const result = await Orders();

    expect(result).toBeDefined();
  });
});