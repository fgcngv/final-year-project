import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllUsers } from "@/utils/services/admin";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  default: {
    user: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

describe("getAllUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return users and totalUsers when authenticated", async () => {
    (auth as any).mockResolvedValue({ userId: "123" });

    (prisma.user.findMany as any).mockResolvedValue([
      { id: 1, name: "Test User", cart: [] },
    ]);

    (prisma.user.count as any).mockResolvedValue(1);

    const result = await getAllUsers();

    expect(result?.success).toBe(true);
    expect(result?.totalUsers).toBe(1);
    expect(result?.data?.length).toBe(1);
  });

  it("should return undefined when not authenticated", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    const result = await getAllUsers();

    expect(result).toEqual({
        success: false,
        error: true,
        message: "Unauthorized",
      });
  });

  it("should handle empty users list", async () => {
    (auth as any).mockResolvedValue({ userId: "123" });

    (prisma.user.findMany as any).mockResolvedValue([]);
    (prisma.user.count as any).mockResolvedValue(0);

    const result = await getAllUsers();

    expect(result?.success).toBe(false);
    expect(result?.message).toBe("No users found!");
  });

  it("should handle database error", async () => {
    (auth as any).mockResolvedValue({ userId: "123" });

    (prisma.user.findMany as any).mockRejectedValue(new Error("DB error"));

    const result = await getAllUsers();

    expect(result?.success).toBe(false);
    expect(result?.message).toBe("Something went wrong!");
  });
});