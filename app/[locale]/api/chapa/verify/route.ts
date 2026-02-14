
// import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const tx_ref = searchParams.get("tx_ref");
//   if (!tx_ref) return new Response(JSON.stringify({ success: false }), { status: 400 });

//   const payment = await prisma.payment.findFirst({
//     where: { transactionRef: tx_ref },
//     include: { order: { include: { items: true } } },
//   });

//   if (!payment) return new Response(JSON.stringify({ success: false }), { status: 404 });

//   if (payment.status === "PAID") {
//     return new Response(JSON.stringify({ success: true }));
//   }

//   return new Response(JSON.stringify({ success: false }));
// }












import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }

  // Verify directly with Chapa
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
    return new Response(JSON.stringify({ success: false }));
  }

  //  Now update DB if not already paid
  const payment = await prisma.payment.findFirst({
    where: { transactionRef: tx_ref },
    include: { order: { include: { items: true } } },
  });

  if (!payment) {
    return new Response(JSON.stringify({ success: false }), { status: 404 });
  }

  if (payment.status !== "PAID") {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: "PAID", paidAt: new Date() },
      });

      await tx.order.update({
        where: { id: payment.order_id },
        data: { status: "PAID" },
      });

      for (const item of payment.order.items) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { stock: { decrement: item.quantity } },
        });
      }
    });
  }

  return new Response(JSON.stringify({ success: true }));
}



