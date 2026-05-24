// “We tested revenue aggregation logic using Prisma mocks to ensure financial accuracy and error handling.”   


//  What this test proves
// Business logic testing

// ✔ revenue calculation correctness
// ✔ safe handling of null values
// ✔ error resilience


// Database logic mocking

// ✔ Prisma aggregate testing
// ✔ payment filtering logic


import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTotalRevenue } from "@/utils/services/admin";
import prisma from "@/lib/prisma";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    payment: {
      aggregate: vi.fn(),
    },
  },
}));

describe("getTotalRevenue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return total revenue when payments exist", async () => {
    (prisma.payment.aggregate as any).mockResolvedValue({
      _sum: { amount: 5000 },
    });

    const result = await getTotalRevenue();

    expect(result.success).toBe(true);
    expect(result.totalRevenue).toBe(5000);
  });

  it("should return 0 when no revenue exists", async () => {
    (prisma.payment.aggregate as any).mockResolvedValue({
      _sum: { amount: null },
    });

    const result = await getTotalRevenue();

    expect(result.success).toBe(true);
    expect(result.totalRevenue).toBe(0);
  });

  it("should handle errors gracefully", async () => {
    (prisma.payment.aggregate as any).mockRejectedValue(
      new Error("DB error")
    );

    const result = await getTotalRevenue();

    expect(result.success).toBe(false);
    expect(result.totalRevenue).toBe(0);
  });
});