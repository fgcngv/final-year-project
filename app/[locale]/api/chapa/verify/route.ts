



// import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const tx_ref = searchParams.get("tx_ref");

//     if (!tx_ref) {
//       return new Response(
//         JSON.stringify({ success: false, error: "tx_ref missing" }),
//         { status: 400 }
//       );
//     }

//     // Verify with Chapa
//     let result;
//     try {
//       const verifyRes = await fetch(
//         `${process.env.CHAPA_BASE_URL}/v1/transaction/verify/${tx_ref}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           },
//         }
//       );

//       result = await verifyRes.json();
//     } catch (err) {
//       // console.error("Chapa API failed:", err);
//       return new Response(
//         JSON.stringify({ success: false, error: "Chapa API error" }),
//         { status: 500 }
//       );
//     }

//     if (result.status !== "success" || result.data?.status !== "success") {
//       // console.log("Chapa transaction failed:", result);
//       return new Response(
//         JSON.stringify({ success: false, error: "Transaction not successful", result })
//       );
//     }

//     // Update DB if not already paid
//     const payment = await prisma.payment.findFirst({
//       where: { transactionRef: tx_ref },
//       include: { order: { include: { items: true } } },
//     });

//     if (!payment) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Payment not found" }),
//         { status: 404 }
//       );
//     }

//     if (payment.status !== "PAID") {
//       await prisma.$transaction(async (tx) => {
//         await tx.payment.update({
//           where: { id: payment.id },
//           data: { status: "PAID", paidAt: new Date() },
//         });

//         await tx.order.update({
//           where: { id: payment.order_id },
//           data: { status: "PAID" },
//         });

//         for (const item of payment.order.items) {
//           await tx.product.update({
//             where: { id: item.product_id },
//             data: { stock: { decrement: item.quantity } },
//           });
//         }
//       });
//     }

//     // Return orderId for redirect
//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         paymentId: payment.id, 
//         orderId: payment.order_id 
//       })
//     );
//   } catch (err) {
//     // console.error("Unexpected server error:", err);
//     return new Response(
//       JSON.stringify({ success: false, error: "Server error" }),
//       { status: 500 }
//     );
//   }
// }






import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tx_ref = searchParams.get("tx_ref");

    if (!tx_ref) {
      return Response.json({ success: false, error: "tx_ref missing" }, { status: 400 });
    }

    // 1. VERIFY CHAPA
    const verifyRes = await fetch(
      `${process.env.CHAPA_BASE_URL}/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );

    const result = await verifyRes.json();

    if (result.status !== "success" || result.data?.status !== "success") {
      return Response.json(
        { success: false, error: "Transaction not successful", result },
        { status: 400 }
      );
    }

    // 2. FIND PAYMENT (NO RELATION GUESSING)
    const payment = await prisma.payment.findFirst({
      where: { transactionRef: tx_ref },
    });

    if (!payment) {
      return Response.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    // 3. GET ORDERS DIRECTLY VIA payment_id (THIS IS KEY FIX)
    const orders = await prisma.order.findMany({
      where: { payment_id: payment.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (payment.status === "PAID") {
      return Response.json({
        success: true,
        message: "Already processed",
        paymentId: payment.id,
        orderIds: orders.map((o) => o.id),
      });
    }

    // 4. TRANSACTION UPDATE
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      for (const order of orders) {
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "PAID",
          },
        });

        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.product_id },
            data: {
              stock: { decrement: item.quantity },
            },
          });
        }
      }
    });

    return Response.json({
      success: true,
      paymentId: payment.id,
      orderIds: orders.map((o) => o.id),
    });
  } catch (err) {
    console.error("CHAPA VERIFY ERROR:", err);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}