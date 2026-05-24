import { describe, it, expect, vi, beforeEach } from "vitest";
// import { POST } from "@/app/locale/api/chapa/initialize/route";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { POST } from "@/app/[locale]/api/chapa/initialize/route";

// mocks
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  default: {
    payment: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
  },
}));

global.fetch = vi.fn();

describe("Chapa Initialize API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 401 if user not authenticated", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({ payment_id: "123" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
  });

  it("should return error if payment_id missing", async () => {
    (auth as any).mockResolvedValue({ userId: "user_1" });

    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.error).toBe("Missing payment_id");
  });

  it("should return checkout_url on success", async () => {
    (auth as any).mockResolvedValue({ userId: "user_1" });

    (prisma.payment.findUnique as any).mockResolvedValue({
      id: "pay_1",
      status: "UNPAID",
      amount: 100,
      user_id: "u1",
      orders: [],
    });

    (prisma.user.findUnique as any).mockResolvedValue({
      email: "test@mail.com",
    });

    (prisma.payment.update as any).mockResolvedValue({});

    (global.fetch as any).mockResolvedValue({
      json: async () => ({
        data: {
          checkout_url: "https://chapa.test/checkout",
        },
      }),
    });

    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({ payment_id: "pay_1" }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.checkout_url).toBe("https://chapa.test/checkout");
  });
});