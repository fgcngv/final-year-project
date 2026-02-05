

// app/api/address/route.ts
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
 
  if (!userId) {
    return NextResponse.json([], { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(addresses);
}
