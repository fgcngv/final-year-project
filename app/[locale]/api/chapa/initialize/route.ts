
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {

    // 1️ Authenticate user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2 Parse request body
    const body = await req.json();

    const payment_id = body.payment_id;
    if (!payment_id) {
      return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
    }

    // 3️ Fetch payment
    const payment = await prisma.payment.findUnique({
      where: { id: payment_id },
      include: { orders: true },
    });

    //if no payment found or payment is already paid, return error.because we only want to initialize unpaid payments
    if (!payment || payment.status !== "UNPAID") {
      return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
    }

    // 4️ Fetch user email
    const user = await prisma.user.findUnique({
      where: { id: payment.user_id },
    });

    if (!user?.email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    // 5 Generate short tx_ref (<50 chars). this is used to link Chapa payment back to our DB record. we use payment id + random uuid part to ensure uniqueness and security.
    const shortUuid = uuidv4().split("-")[0]; // first 8 chars

    const paymentPart = payment.id.slice(0, 30); // take first 30 chars if very long
const tx_ref = `payment-${paymentPart}-${shortUuid}`;

    // 6️ Prepare request body. used by Chapa to show payment details and for callback verification. 
    const chapaRequestBody = {
      amount: payment.amount,
      currency: "ETB",
      email: "birhanugezahegn099@gmail.com", // real email
      // email: user.email,
      tx_ref,
      callback_url: process.env.CHAPA_CALLBACK_URL,
      return_url: `${process.env.CHAPA_RETURN_URL}?tx_ref=${tx_ref}`,
      customization: {
        title: "Order Payment",
        description: `Payment for ${payment.orders.length} orders`
      },
    };

    // 7️ Save tx_ref in DB
    await prisma.payment.update({
      where: { id: payment.id },
      data: { transactionRef: tx_ref },
    });

    // 8️ Call Chapa API
    const chapaRes = await fetch(`${process.env.CHAPA_BASE_URL}/v1/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaRequestBody),
    });

    const data = await chapaRes.json();

    if (!data?.data?.checkout_url) {
      return NextResponse.json({ error: "Server error", details: data }, { status: 500 });
    }
    

    // 9️ Return checkout URL to frontend
    return NextResponse.json({ checkout_url: data.data.checkout_url });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}











// # Chapa Payment Initialization Flow

// File Purpose:

// This route initializes a payment session with Chapa and returns a checkout URL to the frontend.

// After receiving the checkout URL:

// - frontend redirects buyer to Chapa payment page
// - buyer completes payment there
// - Chapa later calls your callback route

// ---

// # Main Responsibilities

// This route:

// 1. Authenticates user
// 2. Validates payment request
// 3. Finds unpaid payment record
// 4. Generates secure transaction reference
// 5. Saves transaction reference
// 6. Sends initialization request to Chapa
// 7. Returns Chapa checkout URL

// ---

// # Full Payment Architecture

// ```txt id="0u7m9y"
// Frontend Checkout Button
//         ↓
// POST /api/chapa/initialize
//         ↓
// Generate tx_ref
//         ↓
// Save tx_ref in DB
//         ↓
// Call Chapa API
//         ↓
// Receive checkout_url
//         ↓
// Return URL to frontend
//         ↓
// Redirect buyer to Chapa
//         ↓
// Buyer Pays
//         ↓
// Chapa Callback Route