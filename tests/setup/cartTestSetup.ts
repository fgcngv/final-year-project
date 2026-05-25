import { vi } from "vitest";

/**
 * =========================
 * MOCK: Next.js redirect
 * =========================
 * - Prevents NEXT_REDIRECT crash
 * - Lets us assert redirect calls safely
 */
export const mockRedirect = vi.fn(() => {
  throw new Error("NEXT_REDIRECT");
});

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

/**
 * =========================
 * MOCK: Clerk auth
 * =========================
 */
export const mockAuth = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

/**
 * =========================
 * MOCK: Prisma (Cart system)
 * =========================
 * Fully isolated fake DB layer
 */
export const prismaMock = {
  product: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },

  cart: {
    upsert: vi.fn(),
  },

  cartItem: {
    findUnique: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
    deleteMany: vi.fn(),
  },

  $transaction: vi.fn(async (cb) => cb(prismaMock)),
};

/**
 * Prisma mock injection
 */
vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));