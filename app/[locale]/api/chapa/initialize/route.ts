
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { v4 as uuidv4 } from "uuid";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     console.log("INIT CHAPA CALLED");

//     console.log("ENV CHECK:", {
//       base: process.env.CHAPA_BASE_URL,
//       callback: process.env.CHAPA_CALLBACK_URL,
//       return: process.env.CHAPA_RETURN_URL,
//     });

//     console.log("Calling Chapa from:", process.env.CHAPA_CALLBACK_URL);


//     // 1️ Authenticate user
//     const { userId } = await auth();
//     console.log("AUTH USERID:", userId);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 2 Parse request body
//     const body = await req.json();
//     console.log("REQUEST BODY:", body);

//     const payment_id = body.payment_id;
//     if (!payment_id) {
//       return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
//     }

//     // 3️ Fetch payment
//     const payment = await prisma.payment.findUnique({
//       where: { id: payment_id },
//       include: { order: true },
//     });
//     console.log("PAYMENT FETCHED:", payment);

//     if (!payment || payment.status !== "UNPAID") {
//       return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
//     }

//     // 4️ Fetch user email
//     const user = await prisma.user.findUnique({
//       where: { id: payment.user_id },
//     });

//     if (!user?.email) {
//       return NextResponse.json({ error: "User email not found" }, { status: 400 });
//     }

//     // 5 Generate short tx_ref (<50 chars)
//     const shortUuid = uuidv4().split("-")[0]; // first 8 chars
//     let orderIdPart = payment.order_id.slice(0, 30); // take first 30 chars if very long
// const tx_ref = `order-${orderIdPart}-${shortUuid}`;
//     console.log("TX_REF:", tx_ref);

//     // 6️ Prepare request body
//     const chapaRequestBody = {
//       amount: payment.amount,
//       currency: "ETB",
//       email: "birhanugezahegn099@gmail.com", // real email
//       tx_ref,
//       callback_url: process.env.CHAPA_CALLBACK_URL,
//       return_url: process.env.CHAPA_RETURN_URL,
//       customization: {
//         title: "Order Payment",
//         description: `Payment for order ${payment.order_id}`,
//       },
//     };
//     console.log("CHAPA REQUEST BODY:", chapaRequestBody);

//     // 7️ Save tx_ref in DB
//     await prisma.payment.update({
//       where: { id: payment.id },
//       data: { transactionRef: tx_ref },
//     });

//     // 8️ Call Chapa API
//     const chapaRes = await fetch(`${process.env.CHAPA_BASE_URL}/v1/transaction/initialize`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(chapaRequestBody),
//     });

//     const data = await chapaRes.json();
//     console.log("CHAPA RESPONSE:", data);

//     if (!data?.data?.checkout_url) {
//       console.error("CHAPA INIT FAILED:", data);
//       return NextResponse.json({ error: "Server error", details: data }, { status: 500 });
//     }
    

//     // 9️ Return checkout URL to frontend
//     return NextResponse.json({ checkout_url: data.data.checkout_url });

//   } catch (err) {
//     console.error("CHAPA INIT ERROR:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }











import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("INIT CHAPA CALLED");

    console.log("ENV CHECK:", {
      base: process.env.CHAPA_BASE_URL,
      callback: process.env.CHAPA_CALLBACK_URL,
      return: process.env.CHAPA_RETURN_URL,
    });

    console.log("Calling Chapa from:", process.env.CHAPA_CALLBACK_URL);


    // 1️ Authenticate user
    const { userId } = await auth();
    console.log("AUTH USERID:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2 Parse request body
    const body = await req.json();
    console.log("REQUEST BODY:", body);

    const payment_id = body.payment_id;
    if (!payment_id) {
      return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
    }

    // 3️ Fetch payment
    const payment = await prisma.payment.findUnique({
      where: { id: payment_id },
      include: { order: true },
    });
    console.log("PAYMENT FETCHED:", payment);

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

    // 5 Generate short tx_ref (<50 chars)
    const shortUuid = uuidv4().split("-")[0]; // first 8 chars
    let orderIdPart = payment.order_id.slice(0, 30); // take first 30 chars if very long
const tx_ref = `order-${orderIdPart}-${shortUuid}`;
    console.log("TX_REF:", tx_ref);

    // 6️ Prepare request body
    const chapaRequestBody = {
      amount: payment.amount,
      currency: "ETB",
      email: "birhanugezahegn099@gmail.com", // real email
      tx_ref,
      callback_url: process.env.CHAPA_CALLBACK_URL,
      return_url: process.env.CHAPA_RETURN_URL,
      customization: {
        title: "Order Payment",
        description: `Payment for order ${payment.order_id}`,
      },
    };
    console.log("CHAPA REQUEST BODY:", chapaRequestBody);

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
    
    console.log("CHAPA STATUS:", chapaRes.status);
  

    const data = await chapaRes.json();
    console.log("CHAPA RESPONSE:", data);

    if (!data?.data?.checkout_url) {
      console.error("CHAPA INIT FAILED:", data);
      return NextResponse.json({ error: "Server error", details: data }, { status: 500 });
    }
    

    // 9️ Return checkout URL to frontend
    return NextResponse.json({ checkout_url: data.data.checkout_url });

  } catch (err) {
    console.error("CHAPA INIT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
