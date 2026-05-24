import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";
import { GET } from "@/app/[locale]/api/chapa/callback/route";

//  Mock Prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    payment: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    order: {
      update: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    payout: {
      create: vi.fn(),
    },
    notification: {
      create: vi.fn(),
    },
    $transaction: vi.fn(async (cb) => await cb(prisma)),
  },
}));

// Mock fetch (Chapa verify API)
global.fetch = vi.fn();

describe("Chapa Callback API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect failed if tx_ref is missing", async () => {
    const req = new Request("http://localhost/api");

    const res = await GET(req);

    expect(res.status).toBe(307);
  });

  it("should redirect failed if payment not found", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({
        status: "success",
        data: { status: "success" },
      }),
    });

    (prisma.payment.findFirst as any).mockResolvedValue(null);

    const req = new Request("http://localhost/api?tx_ref=123");

    const res = await GET(req);

    expect(res.status).toBe(307);
  });

  it("should redirect failed if payment already PAID", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({
        status: "success",
        data: { status: "success" },
      }),
    });

    (prisma.payment.findFirst as any).mockResolvedValue({
      id: "p1",
      status: "PAID",
      orders: [],
    });

    const req = new Request("http://localhost/api?tx_ref=123");

    const res = await GET(req);

    expect(res.status).toBe(307);
  });

  it("should process successful payment flow", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({
        status: "success",
        data: { status: "success" },
      }),
    });

    (prisma.payment.findFirst as any).mockResolvedValue({
      id: "p1",
      user_id: "u1",
      status: "UNPAID",
      orders: [
        {
          id: "o1",
          items: [
            {
              product_id: "prod1",
              quantity: 2,
              price: 100,
            },
          ],
        },
      ],
    });

    (prisma.product.findUnique as any).mockResolvedValue({
      id: "prod1",
      farmer_id: "f1",
    });

    const req = new Request("http://localhost/api?tx_ref=123");

    const res = await GET(req);

    expect(prisma.payment.findFirst).toHaveBeenCalled();
    expect(res.status).toBe(307);
  });
});