import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const tx_ref = searchParams.get("tx_ref");
  
    if (!tx_ref) return new Response("Invalid callback", { status: 400 });
  
    // Verify with Chapa
    const verifyRes = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );
  
    const verifyData = await verifyRes.json();
  
    if (verifyData.status === "success") {
      await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.update({
          where: { id: tx_ref },
          data: {
            status: "PAID",
            paidAt: new Date(),
            transactionRef: verifyData.data.tx_ref,
          },
        });
  
        // 🔥 NOW reduce stock safely
        const items = await tx.orderItem.findMany({
          where: { order_id: payment.order_id },
          include: { product: true },
        });
  
        for (const item of items) {
          await tx.product.update({
            where: { id: item.product_id },
            data: {
              stock: { decrement: item.quantity },
            },
          });
        }
  
        await tx.order.update({
          where: { id: payment.order_id },
          data: { status: "DELIVERED" },
        });
      });
    }
  
    return new Response("OK");
  }
  