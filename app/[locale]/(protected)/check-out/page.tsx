

// "use client";

import AddressStep from "@/components/checkout/AddressStep";
import SeePage from "./seepage/page";
import Header from "@/components/header";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";




async function CheckoutPage() {
 const {userId} = await auth();
 if (!userId) {
  redirect("/sign-in");
}

    const cart = await getCartByUserIdForCartQuantity(userId);
  
    let cartQuantity = 0;
    cart?.items?.forEach(item => {
      cartQuantity += item.quantity;
    });
    
    const unread = await getAllUnreadNotifications();
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
      <h1 className="text-3xl font-bold mb-6 mt-20 text-center md:text-left">
        Checkout
      </h1>

      <div className="md:flex md:gap-8 w-full">
        {/* Left Column - Address / Shipping */}
        <div className="md:w-2/3 mb-6 md:mb-0">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <AddressStep />
          </div>
        </div>

        {/* Right Column - Order Summary / Review */}
        <div className="md:w-1/3">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <SeePage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;