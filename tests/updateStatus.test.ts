// tests/updateStatus.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getRole } from "@/utils/role";
// import { updateStatus } from "@/utils/services/admin";
import { Status } from "@prisma/client";
import { updateStatus } from "@/app/[locale]/actions/admin";

// =========================
// MOCK AUTH
// =========================
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// =========================
// MOCK ROLE
// =========================
vi.mock("@/utils/role", () => ({
  getRole: vi.fn(),
}));

// =========================
// MOCK PRISMA
// =========================
vi.mock("@/lib/prisma", () => ({
  default: {
    user: {
      update: vi.fn(),
      findMany: vi.fn(),
    },

    farmer: {
      update: vi.fn(),
    },

    product: {
      update: vi.fn(),
    },

    wishlist: {
      findMany: vi.fn(),
    },

    notification: {
      createMany: vi.fn(),
    },
  },
}));

describe("updateStatus", () => {
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

    const result = await updateStatus(
      "user",
      "user1",
      Status.ACTIVE
    );

    expect(result.error).toBe(true);
    expect(result.message).toBe("Not authenticated");
  });

  // =========================
  // TEST: NON ADMIN ACCESS
  // =========================
  it("should return error if user is not admin", async () => {
    (auth as any).mockResolvedValue({
      userId: "user1",
    });

    (getRole as any).mockResolvedValue("BUYER");

    const result = await updateStatus(
      "user",
      "user1",
      Status.ACTIVE
    );

    expect(result.error).toBe(true);
    expect(result.message).toContain("Unauthorized");
  });

  // =========================
  // TEST: INVALID STATUS
  // =========================
  it("should return error for invalid status", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    const result = await updateStatus(
      "user",
      "user1",
      "INVALID_STATUS" as any
    );

    expect(result.error).toBe(true);
    expect(result.message).toBe("Invalid status value");
  });

  // =========================
  // TEST: UPDATE USER STATUS
  // =========================
  it("should update user status successfully", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    (prisma.user.update as any).mockResolvedValue({
      id: "user1",
      status: Status.ACTIVE,
    });

    const result = await updateStatus(
      "user",
      "user1",
      Status.ACTIVE
    );

    expect(prisma.user.update).toHaveBeenCalled();

    expect(prisma.notification.createMany).toHaveBeenCalled();

    expect(result.error).toBe(false);
    expect(result.message).toBe("Status updated successfully");
  });

  // =========================
  // TEST: UPDATE FARMER STATUS
  // =========================
  it("should update farmer status successfully", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    (prisma.farmer.update as any).mockResolvedValue({
      id: "farmer1",
      first_name: "John",
      last_name: "Doe",
      status: Status.ACTIVE,
    });

    // buyers to notify
    (prisma.user.findMany as any).mockResolvedValue([
      { id: "buyer1" },
      { id: "buyer2" },
    ]);

    const result = await updateStatus(
      "farmer",
      "farmer1",
      Status.ACTIVE
    );

    expect(prisma.farmer.update).toHaveBeenCalled();

    expect(prisma.notification.createMany).toHaveBeenCalled();

    expect(result.error).toBe(false);
  });

  // =========================
  // TEST: UPDATE PRODUCT STATUS
  // =========================
  it("should update product status successfully", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    (prisma.product.update as any).mockResolvedValue({
      id: "product1",
      product_name: "Tomato",
      status: Status.ACTIVE,
    });

    // users with wishlist
    (prisma.wishlist.findMany as any).mockResolvedValue([
      { user_id: "user1" },
      { user_id: "user2" },
    ]);

    const result = await updateStatus(
      "product",
      "product1",
      Status.ACTIVE
    );

    expect(prisma.product.update).toHaveBeenCalled();

    expect(prisma.notification.createMany).toHaveBeenCalled();

    expect(result.error).toBe(false);
  });

  // =========================
  // TEST: INVALID ENTITY
  // =========================
  it("should return error for invalid entity", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    const result = await updateStatus(
      "invalid" as any,
      "id1",
      Status.ACTIVE
    );

    expect(result.error).toBe(true);
    expect(result.message).toBe("Invalid entity type");
  });

  // =========================
  // TEST: DATABASE ERROR
  // =========================
  it("should handle database errors gracefully", async () => {
    (auth as any).mockResolvedValue({
      userId: "admin1",
    });

    (getRole as any).mockResolvedValue("ADMIN");

    (prisma.user.update as any).mockRejectedValue(
      new Error("Database error")
    );

    const result = await updateStatus(
      "user",
      "user1",
      Status.ACTIVE
    );

    expect(result.error).toBe(true);
    expect(result.message).toBe("Internal server error");
  });
});