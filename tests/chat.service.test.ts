import { describe, it, expect, vi, beforeEach } from "vitest";

// MOCK AUTH
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// MOCK DEPENDENCIES
vi.mock("@/lib/supabase/action/matches", () => ({
  getUserMatches: vi.fn(),
}));

vi.mock("@/utils/services/admin", () => ({
  getAllUsers: vi.fn(),
}));

vi.mock("@/utils/services/cart", () => ({
  getCartByUserIdForCartQuantity: vi.fn(),
}));

vi.mock("@/utils/services/notification", () => ({
  getAllNotification: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";
// import { getChatPageData } from "@/services/chat.service";

import { getUserMatches } from "@/lib/supabase/action/matches";
import { getAllUsers } from "@/utils/services/admin";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllNotification } from "@/utils/services/notification";
import { getChatPageData } from "@/utils/services/chat.service";

describe("Chat Service", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return not authenticated", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    const result = await getChatPageData();

    expect(result.error).toBe("NOT_AUTHENTICATED");
  });

  it("should return full chat data", async () => {
    (auth as any).mockResolvedValue({ userId: "u1" });

    (getUserMatches as any).mockResolvedValue([
      { id: "m1", user1_id: "u1", user2_id: "u2" },
    ]);

    (getAllUsers as any).mockResolvedValue({
      data: [{ id: "u1" }, { id: "u2" }],
    });

    (getCartByUserIdForCartQuantity as any).mockResolvedValue({
      items: [{ quantity: 2 }, { quantity: 3 }],
    });

    (getAllNotification as any).mockResolvedValue({
      data: [1, 2, 3],
    });

    const result = await getChatPageData();

    expect(result.userId).toBe("u1");
    expect(result.cartQuantity).toBe(5);
    expect(result.unread).toBe(3);
  });
});