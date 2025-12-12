
// import { useState } from "react";
// import CheckoutModal from "@/components/CheckoutModal";
// import { Button } from "@/components/ui/button";

import { getAllProducts } from "@/app/actions/products";

// export default function CartPage(...) {
//   const [checkoutOpen, setCheckoutOpen] = useState(false);

//   const handleCheckout = async (method: "CASH" | "ONLINE") => {
//     // call your API here
//     // redirect if online payment
//     setCheckoutOpen(false);
//   };

//   return (
//     <div>
//       {/* ... your cart items and total ... */}

//       <Button onClick={() => setCheckoutOpen(true)}>Checkout</Button>

//       {checkoutOpen && (
//         <CheckoutModal
//           cartItems={cartItems}
//           total={total}
//           onCheckout={handleCheckout}
//         />
//       )}
//     </div>
//   );
// }



async function CheckOutPage() {
    const product = await getAllProducts()
    return ( 
        <div>

            checkout page
            </div>
     );
}

export default CheckOutPage;