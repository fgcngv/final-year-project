
import { describe, it, expect, vi, beforeEach } from "vitest";
import { registerFarmer } from "@/app/[locale]/actions/general";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

// MOCK PRISMA
vi.mock("@/lib/prisma", () => ({
  default: {
    farmer: {
      create: vi.fn(),
    },
  },
}));

// MOCK CLERK
vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: vi.fn(),
}));

describe("registerFarmer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register farmer successfully", async () => {
    // Fake farmer returned from DB
    const mockFarmer = {
      id: "123",
      first_name: "Abebe",
      last_name: "Kebede",
      email: "abebe@test.com",
    };

    // Mock prisma create
    (prisma.farmer.create as any).mockResolvedValue(mockFarmer);

    // Mock clerk update
    const updateUserMock = vi.fn();

    (clerkClient as any).mockResolvedValue({
      users: {
        updateUser: updateUserMock,
      },
    });

    const result = await registerFarmer({
      id: "123",
      first_name: "Abebe",
      last_name: "Kebede",
      email: "abebe@test.com",
      address: "Addis Ababa",
      language: "ENGLISH",
      role: "SELLER",
      status: "ACTIVE",
    });

    expect(result.success).toBe(true);

    expect(prisma.farmer.create).toHaveBeenCalled();

    expect(updateUserMock).toHaveBeenCalledWith("123", {
      publicMetadata: {
        role: "farmer",
      },
    });
  });

  it("should handle duplicate email error", async () => {
    // Mock Prisma duplicate error
    (prisma.farmer.create as any).mockRejectedValue({
      code: "P2002",
    });

    const result = await registerFarmer({
      id: "123",
      first_name: "Abebe",
      last_name: "Kebede",
      email: "duplicate@test.com",
      address: "Addis Ababa",
      language: "ENGLISH",
      role: "SELLER",
      status: "ACTIVE",
    });

    expect(result.success).toBe(false);

    expect(result.message).toBe(
      "A farmer with this email already exists."
    );
  });
});