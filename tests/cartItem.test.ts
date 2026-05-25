vi.mock("@/lib/prisma", () => {
    const prismaMock: any = {
      product: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
      },
  
      cart: {
        upsert: vi.fn(),
      },
  
      cartItem: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
        updateMany: vi.fn(),
        deleteMany: vi.fn(),
      },
  
      notification: {
        create: vi.fn(),
      },
  
      // 🔥 CRITICAL FIX (transaction support)
      $transaction: vi.fn(async (callback: any) => {
        return callback(prismaMock);
      }),
    };
  
    return {
      default: prismaMock,
    };
  });

import { describe, it, expect, vi, beforeEach } from "vitest";

// =========================
// 1. MOCK CLERK AUTH FIRST (VERY IMPORTANT)
// =========================
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";

// =========================
// 2. MOCK NEXT REDIRECT (PREVENT CRASH)
// =========================
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    // instead of crashing, we throw a controlled error
    throw new Error("NEXT_REDIRECT");
  }),
}));

// =========================
// 3. MOCK PRISMA COMPLETELY
// =========================

import prisma from "@/lib/prisma";
import { addToCart, updateQuantity, deleteCartItemById } from "@/utils/services/cartItem";

// =========================
// TEST SUITE
// =========================
describe("Cart Service Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================
  // 1. USER NOT LOGGED IN
  // =========================
  it("should redirect if user is not logged in", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    await expect(addToCart("p1", 1)).rejects.toThrow("NEXT_REDIRECT");
  });

  // =========================
  // 2. PRODUCT NOT FOUND
  // =========================
  it("should fail if product not found", async () => {
    (auth as any).mockResolvedValue({ userId: "u1" });

    (prisma.product.findUnique as any).mockResolvedValue(null);

    const result = await addToCart("p1", 1);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Product not found");
  });

  // =========================
  // 3. OWN PRODUCT CHECK
  // =========================
  it("should fail if user tries to buy own product", async () => {
    (auth as any).mockResolvedValue({ userId: "u1" });

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "u1",
      stock: 10,
    });

    const result = await addToCart("p1", 1);

    expect(result.success).toBe(false);
  });

  // =========================
  // 4. INSUFFICIENT STOCK
  // =========================
  it("should fail if stock is insufficient", async () => {
    (auth as any).mockResolvedValue({ userId: "u1" });

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "f1",
      stock: 1,
    });

    const result = await addToCart("p1", 5);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Only");
  });

  // =========================
  // 5. ADD TO CART SUCCESS
  // =========================
  it("should add item to cart successfully", async () => {
    (auth as any).mockResolvedValue({ userId: "u1" });

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "f1",
      stock: 10,
      product_name: "Apple",
    });

    (prisma.cart.upsert as any).mockResolvedValue({
      id: "cart1",
    });

    (prisma.cartItem.findUnique as any).mockResolvedValue(null);

    (prisma.cartItem.create as any).mockResolvedValue({
      id: "item1",
    });

    const result = await addToCart("p1", 2);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Added to cart!");
  });

  // =========================
  // 6. INCREMENT QUANTITY
  // =========================
  it("should increment cart quantity", async () => {
    (prisma.cartItem.update as any).mockResolvedValue({});

    const result = await updateQuantity("item1", "increment");

    expect(prisma.cartItem.update).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  // =========================
  // 7. DECREMENT QUANTITY
  // =========================
  it("should decrement cart quantity", async () => {
    (prisma.cartItem.updateMany as any).mockResolvedValue({});

    const result = await updateQuantity("item1", "decrement");

    expect(prisma.cartItem.updateMany).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  // =========================
  // 8. DELETE ITEM
  // =========================
  it("should delete cart item for correct user", async () => {
    (prisma.cartItem.deleteMany as any).mockResolvedValue({ count: 1 });

    const result = await deleteCartItemById("item1", "u1");

    expect(prisma.cartItem.deleteMany).toHaveBeenCalled();
    expect(result.count).toBe(1);
  });
});