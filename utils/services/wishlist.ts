"use server";

import prisma from "@/lib/prisma";
// import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(productId: string) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "Not authenticated",
    };
  }

  try {
    const existing = await prisma.wishlist.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId,
        },
      },
    });

    // REMOVE if exists
    if (existing) {
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });

      return {
        success: true,
        liked: false,
        message: "Removed from wishlist",
      };
    }

    // ADD if not exists
    await prisma.wishlist.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
    });

    return {
      success: true,
      liked: true,
      message: "Added to wishlist",
    };

    revalidatePath("/");
revalidatePath("/wishlist");

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}



// GET wishlist
export const getWishlist = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, message: "Not authenticated", data: [] };
  }

  const wishlist = await prisma.wishlist.findMany({
    where: { user_id: userId },
    include: {
      product: {
        include: {
          farmer: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { success: true, data: wishlist };
};

// REMOVE wishlist item
export const removeFromWishlist = async (productId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false };
  }

  await prisma.wishlist.delete({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
  });

  return { success: true };
};