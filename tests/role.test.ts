import { describe, it, expect, vi } from "vitest";
import { checkRole, getRole } from "@/utils/role";

// Mock Clerk auth
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";

describe("Role utilities", () => {
  it("should return user role from metadata", async () => {
    (auth as any).mockResolvedValue({
      sessionClaims: {
        metadata: {
          role: "farmer",
        },
      },
    });

    const role = await getRole();

    expect(role).toBe("farmer");
  });

  it("should return buyer as default role", async () => {
    (auth as any).mockResolvedValue({
      sessionClaims: {},
    });

    const role = await getRole();

    expect(role).toBe("buyer");
  });

  it("should return true for matching role", async () => {
    (auth as any).mockResolvedValue({
      sessionClaims: {
        metadata: {
          role: "admin",
        },
      },
    });

    const result = await checkRole("admin" as any);

    expect(result).toBe(true);
  });

  it("should return false for non-matching role", async () => {
    (auth as any).mockResolvedValue({
      sessionClaims: {
        metadata: {
          role: "buyer",
        },
      },
    });

    const result = await checkRole("admin" as any);

    expect(result).toBe(false);
  });
});