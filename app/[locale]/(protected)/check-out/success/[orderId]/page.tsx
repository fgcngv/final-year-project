

export const dynamic = "force-dynamic";


import OrderConfirmation from "@/components/checkout/OrderConfirmation";


async function PaymentSuccess({
    params,
  }: {
    params: Promise<{ orderId: string }>;
  }) {

    const { orderId } = await params;

    console.log("order id : ",orderId)

    return ( 
        <div>
            
            <OrderConfirmation orderId={orderId} />
        </div>
     );
}

export default PaymentSuccess;