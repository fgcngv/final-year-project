
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");
  if (!tx_ref) return new Response(JSON.stringify({ success: false }), { status: 400 });

  const payment = await prisma.payment.findFirst({
    where: { transactionRef: tx_ref },
    include: { order: { include: { items: true } } },
  });

  if (!payment) return new Response(JSON.stringify({ success: false }), { status: 404 });

  if (payment.status === "PAID") {
    return new Response(JSON.stringify({ success: true }));
  }

  return new Response(JSON.stringify({ success: false }));
}
