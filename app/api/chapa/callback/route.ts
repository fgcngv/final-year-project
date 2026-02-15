

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//   console.log("🔥 CHAPA CALLBACK HIT");
//   console.log("Full URL:", req.url);

//   const { searchParams } = new URL(req.url);
//   const tx_ref = searchParams.get("tx_ref");

//   console.log("Search Params:", searchParams.toString());

//   if (!tx_ref) {
//     return NextResponse.redirect("/check-out/failed");
//   }

//   const verifyRes = await fetch(
//     `${process.env.CHAPA_BASE_URL}/v1/transaction/verify/${tx_ref}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//       },
//     }
//   );

  

//   const result = await verifyRes.json();

//   console.log("CHAPA VERIFY RESULT:", result);

// if (result.status !== "success" || result.data?.status !== "success") {
//   console.error("Chapa payment failed:", result);
//   return NextResponse.redirect("/check-out/failed");
// }


//   const payment = await prisma.payment.findFirst({
//     where: { transactionRef: tx_ref },
//     include: {
//       order: {
//         include: { items: true },
//       },
//     },
//   });

//   if (!payment || payment.status === "PAID") {
//     return NextResponse.redirect("/check-out/failed");
//   }

//   await prisma.$transaction(async (tx) => {
//     // mark payment
//     await tx.payment.update({
//       where: { id: payment.id },
//       data: {
//         status: "PAID",
//         paidAt: new Date(),
//       },
//     });

//     // mark order
//     await tx.order.update({
//       where: { id: payment.order_id },
//       data: { status: "PAID" },
//     });

//     // reduce stock
//     for (const item of payment.order.items) {
//       await tx.product.update({
//         where: { id: item.product_id },
//         data: {
//           stock: { decrement: item.quantity },
//         },
//       });
//     }
//   });

//   return NextResponse.redirect("/check-out/success");
// }





















import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  console.log(" CHAPA CALLBACK HIT");
  console.log("Full URL:", req.url);

  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  const locale = "en";

  console.log("Search Params:", searchParams.toString());

  if (!tx_ref) {
    return NextResponse.redirect(`/${locale}/check-out/failed`);
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

  if (result.status !== "success" || result.data?.status !== "success") {
    console.error("Chapa payment failed:", result);
    return NextResponse.redirect(`/${locale}/check-out/failed`);
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
    return NextResponse.redirect(`/${locale}/check-out/failed`);
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

    // 4️ Calculate total amount
    const totalAmount = payment.order.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // 5️ Get farmer_id
    const firstProduct = await tx.product.findUnique({
      where: { id: payment.order.items[0].product_id },
    });

    if (!firstProduct) {
      throw new Error("Product not found for payout");
    }

    // 6️ CREATE PAYOUT
    await tx.payout.create({
      data: {
        order_id: payment.order_id,
        farmer_id: firstProduct.farmer_id,
        amount: totalAmount,
        status: "PENDING",
      },
    });
  });

  return NextResponse.redirect(`/${locale}/check-out/success`);
}
