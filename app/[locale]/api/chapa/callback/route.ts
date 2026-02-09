// import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const tx_ref = searchParams.get("tx_ref");
  
//     if (!tx_ref) return new Response("Invalid callback", { status: 400 });
  
//     // Verify with Chapa
//     const verifyRes = await fetch(
//       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         },
//       }
//     );
  
//     const verifyData = await verifyRes.json();
  
//     if (verifyData.status === "success") {
//       await prisma.$transaction(async (tx) => {
//         const payment = await tx.payment.update({
//           where: { id: tx_ref },
//           data: {
//             status: "PAID",
//             paidAt: new Date(),
//             transactionRef: verifyData.data.tx_ref,
//           },
//         });
  
//         // 🔥 NOW reduce stock safely
//         const items = await tx.orderItem.findMany({
//           where: { order_id: payment.order_id },
//           include: { product: true },
//         });
  
//         for (const item of items) {
//           await tx.product.update({
//             where: { id: item.product_id },
//             data: {
//               stock: { decrement: item.quantity },
//             },
//           });
//         }
  
//         await tx.order.update({
//           where: { id: payment.order_id },
//           data: { status: "DELIVERED" },
//         });
//       });
//     }
  
//     return new Response("OK");
//   }
  











import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return NextResponse.redirect("/check-out/failed");
  }

  const verifyRes = await fetch(
    `${process.env.CHAPA_BASE_URL}/v1/transaction/verify/${tx_ref}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    }
  );

  

  const result = await verifyRes.json();

  console.log("CHAPA VERIFY RESULT:", result);

if (result.status !== "success") {
  console.error("Chapa payment failed:", result);
  return NextResponse.redirect("/check-out/failed");
}

  if (result.status !== "success") {
    return NextResponse.redirect("/check-out/failed");
  }

  const payment = await prisma.payment.findFirst({
    where: { transactionRef: tx_ref },
    include: {
      order: {
        include: { items: true },
      },
    },
  });

  if (!payment || payment.status === "PAID") {
    return NextResponse.redirect("/check-out/success");
  }

  await prisma.$transaction(async (tx) => {
    // mark payment
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    // mark order
    await tx.order.update({
      where: { id: payment.order_id },
      data: { status: "PAID" },
    });

    // reduce stock
    for (const item of payment.order.items) {
      await tx.product.update({
        where: { id: item.product_id },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }
  });

  return NextResponse.redirect("/check-out/success");
}
