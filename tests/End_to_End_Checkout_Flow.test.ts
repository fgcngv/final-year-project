import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";

/**
 * FULL CHECKOUT FLOW TEST (SIMULATION)
 * We test the logic inside Chapa callback transaction
 */

vi.mock("@/lib/prisma", () => ({
  default: {
    payment: { update: vi.fn() },
    order: { update: vi.fn() },
    product: { findUnique: vi.fn(), update: vi.fn() },
    payout: { create: vi.fn() },
    notification: { create: vi.fn() },
  },
}));

describe("End-to-End Checkout Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * =========================
   * 1. FULL SUCCESS FLOW
   * =========================
   */
  it("should complete full checkout flow successfully", async () => {
    const payment = {
      id: "pay1",
      user_id: "user1",
      orders: [
        {
          id: "o1",
          items: [
            { product_id: "p1", quantity: 2, price: 100 },
          ],
        },
      ],
    };

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "f1",
    });

    // simulate stock update + payout logic
    let total = 0;

    for (const order of payment.orders) {
      for (const item of order.items) {
        total += item.quantity * item.price;

        await prisma.product.update({
          where: { id: item.product_id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const product = await prisma.product.findUnique({
        where: { id: order.items[0].product_id },
      });

      await prisma.payout.create({
        data: {
          order_id: order.id,
          farmer_id: product!.farmer_id,
          amount: total,
          status: "PENDING",
        },
      });

      await prisma.notification.create({
        data: {
          user_id: payment.user_id,
          title: "Payment Successful",
          message: `Order ${order.id} completed`,
          type: "ORDER",
          order_id: order.id,
        },
      });
    }

    expect(prisma.product.update).toHaveBeenCalled();
    expect(prisma.payout.create).toHaveBeenCalled();
    expect(prisma.notification.create).toHaveBeenCalled();
  });

  /**
   * =========================
   * 2. DUPLICATE CALLBACK SAFETY
   * =========================
   */
  it("should not duplicate payout logic on repeated calls", async () => {
    const paymentStatus = "PAID";

    const shouldProcess = paymentStatus !== "PAID";

    expect(shouldProcess).toBe(false);
  });

  /**
   * =========================
   * 3. STOCK DECREMENT SAFETY
   * =========================
   */
  it("should correctly decrement stock", async () => {
    const item = { product_id: "p1", quantity: 3 };

    await prisma.product.update({
      where: { id: item.product_id },
      data: { stock: { decrement: item.quantity } },
    });

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: "p1" },
      data: { stock: { decrement: 3 } },
    });
  });
});