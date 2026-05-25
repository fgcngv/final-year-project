// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getWishlistCount = async () => {
  const { userId } = await auth();

  if (!userId) return 0;

  const count = await prisma.wishlist.count({
    where: {
      user_id: userId,
    },
  });

  return count;
};