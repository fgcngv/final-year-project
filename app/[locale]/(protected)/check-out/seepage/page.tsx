import OrderSummary from "@/components/checkout/OrderSummary";
import { getCartByUserId } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";
import { Link } from "lucide-react";


async function SeePage() {
    const { userId } = await auth();
    if (!userId) return <div>Not Authenticated</div>;
  
    const data = await getCartByUserId(userId);

  
    if (!data || "error" in data)
      return (
        <div className="h-screen flex flex-col bg-green-900 text-2xl text-white font-bold justify-center items-center">
          <h1>You have no Cart Stored</h1>
          <Link
            href="/product"
            className="bg-green-950 p-1 rounded hover:underline "
          >
            Buy Products
          </Link>
        </div>
      );

     const cartItemss = data?.items;
     console.log("orderItems : orderItems : " ,data)

      const subtotal = cartItemss.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0);
      const shippingFee = 0;
      const total = subtotal + shippingFee;
    
    return ( 
        <div>
                        <OrderSummary 
                          items={cartItemss}
                          subtotal={subtotal}
                          shippingFee={shippingFee}
                          total={total}
                        />
        </div>
     );
}

export default SeePage;