// export const dynamic = "force-dynamic";


// import OrderConfirmation from "@/components/checkout/OrderConfirmation";


// function PaymentSuccess() {
//     return ( 
//         <div>
//             <OrderConfirmation orderId="cmlewco1j001h0kuporfbrjjh" />
//         </div>
//      );
// }

// export default PaymentSuccess;




export const dynamic = "force-dynamic";

import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import { getOrdersByPaymentId } from "@/utils/services/order";

export default async function PaymentSuccess({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;

  const result = await getOrdersByPaymentId(paymentId);

  if (!result.success || !result.data) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load order confirmation.
      </div>
    );
  }

  return <OrderConfirmation orders={result.data} paymentId={paymentId} />;
}