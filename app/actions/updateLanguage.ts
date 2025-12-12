
"use server";

import prisma from "@/lib/prisma";   // adjust path if needed
import { auth } from "@clerk/nextjs/server";

export async function updateUserLanguage(lang: string) {
const {userId} = await auth()

  if (!userId) return;

  await prisma.user.update({
    where: { id: userId },
    data: { language: lang.toUpperCase() as any } // ENUM match
  });
}
