// tests/createOrder.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createOrder } from "@/app/[locale]/actions/order";
// import { createOrder } from "@/utils/services/order";

// =========================
// MOCK AUTH
// =========================
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// =========================
// MOCK PRISMA
// =========================
vi.mock("@/lib/prisma", () => ({
  default: {
    address: {
      findFirst: vi.fn(),
    },

    product: {
      findMany: vi.fn(),
      update: vi.fn(),
    },
    
    notification: {
      create: vi.fn(),
    },

    order: {
      create: vi.fn(),
      update: vi.fn().mockResolvedValue({
        id: "order1",
        payment_id: "payment1",
      }),
    },

    orderItem: {
      create: vi.fn().mockResolvedValue({
        id: "item1",
      }),
    },

    payment: {
      create: vi.fn(),
    },

    cart: {
      delete: vi.fn().mockResolvedValue(true),
    },

    $transaction: vi.fn(async (callback) =>
      callback({
        product: prisma.product,
        order: prisma.order,
        orderItem: prisma.orderItem,
        payment: prisma.payment,
        cart: prisma.cart,
        notification: prisma.notification,
      })
    ),
  },
}));

describe("createOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================
  // TEST: USER NOT AUTHENTICATED
  // =========================
  it("should return error if user not authenticated", async () => {
    (auth as any).mockResolvedValue({
      userId: null,
    });

    const result = await createOrder([]);

    expect(result.success).toBe(false);
    expect(result.message).toBe("User not authenticated");
  });

  // =========================
  // TEST: ADDRESS NOT FOUND
  // =========================
  it("should return error if address not found", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    (prisma.address.findFirst as any).mockResolvedValue(null);

    const result = await createOrder([]);

    expect(result.success).toBe(false);
    expect(result.message).toBe("No address found");
  });

  // =========================
  // TEST: SUCCESSFUL ORDER CREATION
  // =========================
  it("should create order successfully", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    // Mock address
    (prisma.address.findFirst as any).mockResolvedValue({
      id: "address1",
    });

    // Mock products
    (prisma.product.findMany as any).mockResolvedValue([
      {
        id: "product1",
        farmer_id: "farmer1",
        stock: 10,
        price: 100,
        product_name: "Tomato",
      },
    ]);

    // Mock order creation
    (prisma.order.create as any).mockResolvedValue({
      id: "order1",
    });

    // Mock payment creation
    (prisma.payment.create as any).mockResolvedValue({
      id: "payment1",
      amount: 200,
    });

    const result = await createOrder([
      {
        product_id: "product1",
        quantity: 2,
        price: 100,
      },
    ]);

    expect(prisma.order.create).toHaveBeenCalled();
    expect(prisma.orderItem.create).toHaveBeenCalled();
    expect(prisma.payment.create).toHaveBeenCalled();
    expect(prisma.cart.delete).toHaveBeenCalled();

    expect(result.success).toBe(true);
    expect(result.payment_id).toBe("payment1");
    expect(result.amount).toBe(200);
  });

  // =========================
  // TEST: INSUFFICIENT STOCK
  // =========================
  it("should fail if product stock is insufficient", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    (prisma.address.findFirst as any).mockResolvedValue({
      id: "address1",
    });

    // Product stock smaller than quantity
    (prisma.product.findMany as any).mockResolvedValue([
      {
        id: "product1",
        farmer_id: "farmer1",
        stock: 1,
        price: 100,
        product_name: "Tomato",
      },
    ]);

    (prisma.order.create as any).mockResolvedValue({
      id: "order1",
    });

    const result = await createOrder([
      {
        product_id: "product1",
        quantity: 5,
        price: 100,
      },
    ]);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Insufficient stock");
  });

  // =========================
  // TEST: PRODUCT NOT FOUND
  // =========================
  it("should fail if product not found", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    (prisma.address.findFirst as any).mockResolvedValue({
      id: "address1",
    });

    // Empty products array
    (prisma.product.findMany as any).mockResolvedValue([]);

    const result = await createOrder([
      {
        product_id: "missing-product",
        quantity: 1,
        price: 100,
      },
    ]);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Product not found");
  });

  // =========================
  // TEST: DATABASE ERROR
  // =========================
  it("should handle database errors gracefully", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    (prisma.address.findFirst as any).mockResolvedValue({
      id: "address1",
    });

    // Force prisma transaction error
    (prisma.$transaction as any).mockRejectedValue(
      new Error("Database error")
    );

    const result = await createOrder([
      {
        product_id: "product1",
        quantity: 1,
        price: 100,
      },
    ]);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Database error");
  });
});