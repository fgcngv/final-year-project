import { describe, it, expect, vi, beforeEach } from "vitest";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getAllUnreadNotifications } from "@/utils/services/notification";
// import { getAllUnreadNotifications } from "@/utils/services/notifications";

// Mock auth
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    notification: {
      findMany: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

describe("Notification System", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * =========================
   * 1. UNAUTHORIZED USER
   * =========================
   */
  it("should return unauthorized if user is not logged in", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    const result = await getAllUnreadNotifications();

    expect(result).toEqual({
      success: false,
      error: true,
      message: "Unauthorized",
    });
  });

  /**
   * =========================
   * 2. GET UNREAD NOTIFICATIONS
   * =========================
   */
  it("should return unread notifications for user", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });

    (prisma.notification.findMany as any).mockResolvedValue([
      { id: "n1", read: false },
      { id: "n2", read: false },
    ]);

    const result = await getAllUnreadNotifications();

    expect(prisma.notification.findMany).toHaveBeenCalledWith({
      where: {
        user_id: "user1",
        read: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
  });

  /**
   * =========================
   * 3. EMPTY NOTIFICATIONS
   * =========================
   */
  it("should return empty array when no unread notifications exist", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });

    (prisma.notification.findMany as any).mockResolvedValue([]);

    const result = await getAllUnreadNotifications();

    expect(result).toEqual({
      success: true,
      error: false,
      data: [],
    });
  });

  /**
   * =========================
   * 4. DATABASE ERROR
   * =========================
   */
  it("should handle database errors gracefully", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });

    (prisma.notification.findMany as any).mockRejectedValue(
      new Error("DB error")
    );

    const result = await getAllUnreadNotifications();

    expect(result).toEqual({
      success: false,
      error: true,
      message: "Something went wrong while fetching notifications",
    });
  });

  /**
   * =========================
   * 5. MARK AS READ FLOW
   * =========================
   */
  it("should mark notifications as read", async () => {
    (auth as any).mockResolvedValue({ userId: "user1" });

    (prisma.notification.updateMany as any).mockResolvedValue({
      count: 3,
    });

    // simulate update function (you can replace with real service later)
    const markAsRead = async () => {
      const { userId } = await auth();

      if (!userId) return;

      return prisma.notification.updateMany({
        where: {
          user_id: userId,
          read: false,
        },
        data: {
          read: true,
        },
      });
    };

    const result = await markAsRead();

    expect(prisma.notification.updateMany).toHaveBeenCalledWith({
      where: {
        user_id: "user1",
        read: false,
      },
      data: {
        read: true,
      },
    });

    expect(result?.count).toBe(3);
  });
});