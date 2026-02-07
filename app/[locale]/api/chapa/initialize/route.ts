import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { payment_id } = await req.json();

    if (!payment_id) {
      return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
    }

    // Fetch payment including order + user
    const payment = await prisma.payment.findUnique({
      where: { id: payment_id },
      include: {
        order: {
          include: {
            user: {
              select: { language: true },
            },
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const userLanguage = payment.order.user?.language || "en"; // fallback

    // Call Chapa API
    const chapaRes = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: payment.amount,
        currency: "ETB",
        tx_ref: payment.id,
        email: "test@email.com",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/${userLanguage}/api/chapa/callback`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/${userLanguage}/payment/success`,
        customization: {
          title: "Coffee Order",
          description: "Marketplace payment",
        },
      }),
    });

    const data = await chapaRes.json();

    if (!chapaRes.ok || !data?.data?.checkout_url) {
      console.error("Chapa error:", data);
      return NextResponse.json(
        { error: "Chapa initialization failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ checkout_url: data.data.checkout_url });
  } catch (err) {
    console.error("Chapa init error:", err);
    return NextResponse.json(
      { error: "Server error during payment init" },
      { status: 500 }
    );
  }
}
