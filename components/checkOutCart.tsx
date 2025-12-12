
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { CartItem } from "@/app/generated/prisma/client";
// import { toast } from "sonner";

// interface CheckoutProps {
//   cartItems: CartItem[];
//   total: number;
//   onCheckout: (method: "CASH" | "ONLINE") => void;
// }

// export default function CheckoutModal({ cartItems, total, onCheckout }: CheckoutProps) {
//   const [selectedMethod, setSelectedMethod] = useState<"CASH" | "ONLINE" | null>(null);
//   const [loading, setLoading] = useState(false);

//   if (!cartItems || cartItems.length === 0) {
//     return <div className="text-center py-10 text-gray-500 text-lg">Your cart is empty.</div>;
//   }

//   const handlePaymentClick = async (method: "CASH" | "ONLINE") => {
//     setSelectedMethod(method);
//     setLoading(true);

//     try {
//       await onCheckout(method);
//     } catch (err) {
//       toast.error("Something went wrong! Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Choose Payment Method</h2>

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//           <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>item.product.product_name x {item.quantity}</span>
//                 <span>₹ item.product.price * item.quantity.toFixed2</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between font-bold text-lg mt-4 border-t pt-3">
//             <span>Total</span>
//             <span>₹ {total.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <Button
//             className={`w-full rounded-xl ${selectedMethod === "CASH" ? "bg-green-600 text-white" : ""}`}
//             onClick={() => handlePaymentClick("CASH")}
//             disabled={loading}
//           >
//             {loading && selectedMethod === "CASH" ? "Processing..." : "Cash on Delivery"}
//           </Button>

//           <Button
//             className={`w-full rounded-xl ${selectedMethod === "ONLINE" ? "bg-blue-600 text-white" : ""}`}
//             onClick={() => handlePaymentClick("ONLINE")}
//             disabled={loading}
//           >
//             {loading && selectedMethod === "ONLINE" ? "Redirecting..." : "Pay Online"}
//           </Button>

//           <Button
//             variant="outline"
//             className="w-full rounded-xl mt-2"
//             onClick={() => setSelectedMethod(null)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }













// Enhanced, premium UI version of your HomePage component
"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { addToCart } from "@/utils/services/cartItem";
import { ShoppingCart, ArrowRight, Coffee } from "lucide-react";
import { Product } from "@prisma/client";

interface roleProps {
  role: "admin" | "buyer" | "seller" | "lab_technician" | "cashier";
  products: Product[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export const dummyProducts = [
  {
    id: "prod_001",
    product_name: "Yirgacheffe Grade 1 Coffee",
    image: "/images/coffee-yirgacheffe.jpg",
    price: 18.5,
    quantity: 1,
  },
  {
    id: "prod_002",
    product_name: "Sidamo Washed Green Coffee",
    image: "/images/coffee-sidamo.jpg",
    price: 22.0,
    quantity: 2,
  },
  {
    id: "prod_003",
    product_name: "Jimma Natural Green Coffee",
    image: "/images/coffee-jimma.jpg",
    price: 15.75,
    quantity: 1,
  },
];


export default function HomePage({ role, products }: roleProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  const handleAddToCart = async (id: string) => {
    setLoadingId(id);
    await addToCart(id);
    setLoadingId(null);
    alert("Added to cart!");
  };

  const handleBuyNow = (id: string) => {
    alert(`Redirecting to checkout for product ${id}`);
  };

  const handleButton = () => {
    if (user) router.push("/product");
    else router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f4efe7]">

      {/* HERO SECTION */}
      <motion.section
        className="relative min-h-[90vh] flex flex-col justify-center items-center text-center bg-[url('/images/coffee-hero.jpg')] bg-cover bg-center bg-fixed shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <motion.h1
          className="relative text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-wide"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Discover Ethiopian Green Coffee
        </motion.h1>

        <motion.p
          className="relative mt-4 text-2xl text-white/90 drop-shadow-md max-w-2xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Fresh, premium, directly from smallholder Ethiopian farms.
        </motion.p>

        {/* HERO BUTTON */}
        <motion.button
          onClick={handleButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2"
        >
          {user ? "Shop Now" : "Sign-In or Sign-Up"}
          <ArrowRight />
        </motion.button>

        {user && (
          <Link
            href={`${role}`}
            className="relative mt-3 text-white hover:underline"
          >
            Go to Dashboard
          </Link>
        )}
      </motion.section>

      {/* FEATURED SECTION */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-[#4b2e16] mb-12 flex items-center justify-center gap-3">
          <Coffee className="text-green-700" /> Featured Coffee Products
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {dummyProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition bg-white border hover:border-green-600">
                {/* IMAGE */}
                <CardContent className="p-4">
                  <div className="relative w-full h-48">
                    <img
                      src={product.image}
                      alt={product.product_name || "Product image"}
                      className="w-full h-full object-cover rounded-2xl"
                      loading="lazy"
                    />
                  </div>

                  {/* NAME + PRICE */}
                  <h2 className="text-lg font-semibold mt-4 text-[#3b2a1c]">
                    {product.product_name}
                  </h2>
                  <p className="text-2xl font-bold text-green-700 mt-1">
                    ₹ {product.price}
                  </p>
                </CardContent>

                {/* ACTION BUTTONS */}
                <CardFooter className="flex flex-col gap-3 p-4">
                  <Button
                    className="w-full rounded-xl flex items-center gap-2"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingId === product.id}
                  >
                    <ShoppingCart size={18} />
                    {loadingId === product.id ? "Adding..." : "Add to Cart"}
                  </Button>

                  <Button
                    className="w-full rounded-xl"
                    variant="secondary"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    Buy Now
                  </Button>

                  <Link
                    href={`/product/${product.id}`}
                    className="w-full"
                  >
                    <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
