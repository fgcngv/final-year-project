// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// // export async function POST(req: Request) {
// //   try {
// //     const { payment_id } = await req.json();

// //     if (!payment_id) {
// //       return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
// //     }

// //     // Fetch payment including order + user
// //     const payment = await prisma.payment.findUnique({
// //       where: { id: payment_id },
// //       include: {
// //         order: {
// //           include: {
// //             user: {
// //               select: { language: true },
// //             },
// //           },
// //         },
// //       },
// //     });

// //     if (!payment) {
// //       return NextResponse.json({ error: "Payment not found" }, { status: 404 });
// //     }

// //     const userLanguage = payment.order.user?.language || "en"; // fallback

// //     // Call Chapa API
// //     const chapaRes = await fetch("https://api.chapa.co/v1/transaction/initialize", {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         amount: payment.amount,
// //         currency: "ETB",
// //         tx_ref: payment.id,
// //         email: "test@email.com",
// //         callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/${userLanguage}/api/chapa/callback`,
// //         return_url: `${process.env.NEXT_PUBLIC_APP_URL}/${userLanguage}/payment/success`,
// //         customization: {
// //           title: "Coffee Order",
// //           description: "Marketplace payment",
// //         },
// //       }),
// //     });

// //     const data = await chapaRes.json();

// //     if (!chapaRes.ok || !data?.data?.checkout_url) {
// //       console.error("Chapa error:", data);
// //       return NextResponse.json(
// //         { error: "Chapa initialization failed", details: data },
// //         { status: 500 }
// //       );
// //     }

// //     return NextResponse.json({ checkout_url: data.data.checkout_url });
// //   } catch (err) {
// //     console.error("Chapa init error:", err);
// //     return NextResponse.json(
// //       { error: "Server error during payment init" },
// //       { status: 500 }
// //     );
// //   }
// // }











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

//     const { userId } = await auth();
//     console.log("AUTH USERID:", userId);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     console.log("REQUEST BODY:", body);

//     const  payment_id  = body.payment_id;

//     if (!payment_id) {
//       return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
//     }


//     const payment = await prisma.payment.findUnique({
//       where: { id: payment_id },
//       include: { order: true },
//     });

    

//     console.log("PAYMENT FETCHED:", payment);

//     if (!payment) {
//       return NextResponse.json({ error: "Payment not found" }, { status: 404 });
//     }

//     if (!payment || payment.status !== "UNPAID") {
//       return NextResponse.json(
//         { error: "Invalid payment" },
//         { status: 400 }
//       );
//     }

//     // ✅ Fetch real user email
// const user = await prisma.user.findUnique({
//   where: { id: payment.user_id },
// });

// if (!user?.email) {
//   return NextResponse.json({ error: "User email not found" }, { status: 400 });
// }

//     // Generate tx_ref
//     const shortUuid = uuidv4().split("-")[0]; // first 8 chars
//     const tx_ref = `order-${payment.order_id}-${shortUuid}`; 
//     console.log("TX_REF:", tx_ref);

//     // Log the body you will send to Chapa
// console.log("CHAPA REQUEST BODY:", {
//   amount: payment.amount,
//   currency: "ETB",
//   email: payment.user_id + "@example.com",
//   tx_ref,
//   callback_url: process.env.CHAPA_CALLBACK_URL,
//   return_url: process.env.CHAPA_RETURN_URL,
//   customization: {
//     title: "Order Payment",
//     description: `Payment for order ${payment.order_id}`,
//   },
// });

//     // Save tx_ref
//     await prisma.payment.update({
//       where: { id: payment.id },
//       data: { transactionRef: tx_ref },
//     });

    
//     const chapaRes = await fetch(`${process.env.CHAPA_BASE_URL}/v1/transaction/initialize`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: payment.amount,
//         currency: "ETB",
//         email: payment.user_id + "@example.com",
//         tx_ref,
//         callback_url: process.env.CHAPA_CALLBACK_URL,
//         return_url: process.env.CHAPA_RETURN_URL,
//         customization: {
//           title: "Order Payment",
//           description: `Payment for order ${payment.order_id}`,
//         },
//       }),
//     });

//     const data = await chapaRes.json();
//     console.log("CHAPA RESPONSE:", data);


//     if (!data?.data?.checkout_url) {
//       return NextResponse.json({ error: "Chapa init failed" }, { status: 500 });
//     }

//     return NextResponse.json({
//       checkout_url: data.data.checkout_url,
//     });
//   } catch (err) {
//     console.error(err);
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

    // 1️⃣ Authenticate user
    const { userId } = await auth();
    console.log("AUTH USERID:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse request body
    const body = await req.json();
    console.log("REQUEST BODY:", body);

    const payment_id = body.payment_id;
    if (!payment_id) {
      return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
    }

    // 3️⃣ Fetch payment
    const payment = await prisma.payment.findUnique({
      where: { id: payment_id },
      include: { order: true },
    });
    console.log("PAYMENT FETCHED:", payment);

    if (!payment || payment.status !== "UNPAID") {
      return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
    }

    // 4️⃣ Fetch user email
    const user = await prisma.user.findUnique({
      where: { id: payment.user_id },
    });

    if (!user?.email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    // 5️⃣ Generate short tx_ref (<50 chars)
    const shortUuid = uuidv4().split("-")[0]; // first 8 chars
    let orderIdPart = payment.order_id.slice(0, 30); // take first 30 chars if very long
const tx_ref = `order-${orderIdPart}-${shortUuid}`;
    console.log("TX_REF:", tx_ref);

    // 6️⃣ Prepare request body
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

    // 7️⃣ Save tx_ref in DB
    await prisma.payment.update({
      where: { id: payment.id },
      data: { transactionRef: tx_ref },
    });

    // 8️⃣ Call Chapa API
    const chapaRes = await fetch(`${process.env.CHAPA_BASE_URL}/v1/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaRequestBody),
    });

    const data = await chapaRes.json();
    console.log("CHAPA RESPONSE:", data);

    if (!data?.data?.checkout_url) {
      return NextResponse.json(
        { error: "Chapa init failed", details: data },
        { status: 500 }
      );
    }

    // 9️⃣ Return checkout URL to frontend
    return NextResponse.json({ checkout_url: data.data.checkout_url });

  } catch (err) {
    console.error("CHAPA INIT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
