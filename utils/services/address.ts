

// utils/services/address.ts

import prisma from "@/lib/prisma";

export async function getUserAddresses(userId: string) {
  return await prisma.address.findFirst({
    where: { userId },
    orderBy: { isDefault: 'desc' }
  });
}

