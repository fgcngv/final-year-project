

// export const dynamic = "force-dynamic";


// import OrderConfirmation from "@/components/checkout/OrderConfirmation";
// import { getOrderById } from "@/utils/services/order";


// async function PaymentSuccess({
//     params,
//   }: {
//     params: Promise<{ orderId: string }>;
//   }) {

//     const { orderId } = await params;

//     console.log("order id : ",orderId)

//     const order = await getOrderById(orderId);
//     if(order.data){
//         console.log("order data : ",order.data);
//     }
//     // const orderData = order?.data;
//     // console.log(orderData)

//     return ( 
//         <div>
            
//             {order.data && (
//                 <OrderConfirmation totalAmount={order.data[0].totalAmount} items={order.data[0].items.length} orderId={orderId} 
//                 deliveryTo={`${order.data[0].address.addressLine1 ,order.data[0].address.city, order.data[0].address.country}`}
//                 deliveryDate={order.data[0].createdAt}
//                 />
//             )}
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