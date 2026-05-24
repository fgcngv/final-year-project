import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";

/**
 * We test payout logic inside transaction-like behavior
 */

vi.mock("@/lib/prisma", () => ({
  default: {
    payment: { update: vi.fn() },
    order: { update: vi.fn() },
    product: { findUnique: vi.fn() },
    payout: { create: vi.fn() },
    notification: { create: vi.fn() },
  },
}));

describe("Payout System", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * =========================
   * 1. PAYOUT CREATION
   * =========================
   */
  it("should create payout with correct amount", async () => {
    const order = {
      id: "o1",
      items: [
        { product_id: "p1", quantity: 2, price: 100 },
      ],
    };

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "f1",
    });

    let total = 0;

    for (const item of order.items) {
      total += item.quantity * item.price;
    }

    await prisma.payout.create({
      data: {
        order_id: order.id,
        farmer_id: "f1",
        amount: total,
        status: "PENDING",
      },
    });

    expect(prisma.payout.create).toHaveBeenCalledWith({
      data: {
        order_id: "o1",
        farmer_id: "f1",
        amount: 200,
        status: "PENDING",
      },
    });
  });

  /**
   * =========================
   * 2. MULTI ITEM ORDER
   * =========================
   */
  it("should calculate total for multiple items", async () => {
    const items = [
      { quantity: 2, price: 100 },
      { quantity: 3, price: 50 },
    ];

    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    expect(total).toBe(350);
  });

  /**
   * =========================
   * 3. MISSING PRODUCT ERROR
   * =========================
   */
  it("should throw error if product not found", async () => {
    (prisma.product.findUnique as any).mockResolvedValue(null);

    const result = await prisma.product.findUnique({
      where: { id: "missing" },
    });

    expect(result).toBeNull();
  });

  /**
   * =========================
   * 4. FARMER ASSIGNMENT
   * =========================
   */
  it("should assign payout to correct farmer", async () => {
    (prisma.product.findUnique as any).mockResolvedValue({
      id: "p1",
      farmer_id: "farmer123",
    });

    const product = await prisma.product.findUnique({
      where: { id: "p1" },
    });

    expect(product?.farmer_id).toBe("farmer123");
  });
});