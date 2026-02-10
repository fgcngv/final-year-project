"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";

export async function getUserMatchesPrsm() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated.");
  }

  const matches = await prisma.chatMatches.findMany({
    where: {
      isActive: true,
      OR: [{ user1_id: userId }, { user2_id: userId }],
    },
    include: {
      user1: true,
      user2: true,
    },
  });

  if (!matches) return null;

  console.log("SERVER matches:", matches);

  return matches;
}
