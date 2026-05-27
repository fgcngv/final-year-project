

import prisma from "@/lib/prisma";

export async function checkUserStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      status: true,
    },
  });

  return user?.status;
}