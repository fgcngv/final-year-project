import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // authenticate the user
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const userData = await prisma.user.findUnique({ where: { id: userId } });
    if (!userData) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const serverClient = StreamChat.getInstance(
      process.env.STREAM_API_KEY!,
      process.env.STREAM_SECRET_KEY!
    );

    const token = serverClient.createToken(userId);

    await serverClient.upsertUser({
      id: userId,
      name: userData.first_name,
      image: userData.last_name || undefined,
    });

    return NextResponse.json({
      token,
      userId,
      userName: userData.first_name,
      userImage: userData.last_name || undefined,
    });
  } catch (err) {
    console.error("Stream token error:", err);
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
  }
}
