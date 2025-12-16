// "use client";

// import { Product } from "@/app/generated/prisma/client";
// import { useUser } from "@clerk/nextjs";
// // pages/index.tsx
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { addToCart } from "@/utils/services/cartItem";

// interface roleProps {
//   role: "admin" | "buyer" | "seller" | "lab_technician" | "cashier";
//   products: Product[];
// }

// // const products = [
// //   {
// //     id: 1,
// //     name: "Djimma Green Coffee",
// //     image: "/images/djimmah-green-coffee.jpg",
// //     price: 15,
// //   },
// //   {
// //     id: 2,
// //     name: "Yirgacheffe Green Coffee",
// //     image: "/images/washed-yirgacheffe.jpg",
// //     price: 18,
// //   },
// //   {
// //     id: 3,
// //     name: "Wombera Green Coffee",
// //     image: "/images/wombera.jpg",
// //     price: 20,
// //   },
// // ];

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 50 },
//   show: { opacity: 1, y: 0 },
// };

// export default function HomePage({role,products}:roleProps) {
//     const [loadingId, setLoadingId] = useState<string | null>(null);

//     const router = useRouter();
//     const {user} = useUser();
//     // console.log("user : ",user);

//     const handleAddToCart = async (id: string) => {
//       setLoadingId(id);
//       await addToCart(id);
//       setLoadingId(null);
//       alert("Added to cart!");
//     };

//     const handleBuyNow = (id: string) => {
//       alert(`Redirecting to checkout for product ${id}`);
//     };

//     const handleButton = () =>{
//         if(user){
//             router.push("/product");
//         }else{
//             router.push("/sign-in");
//         }
//     }

//   return (
//     <div className="min-h-screen bg-[#fefaf3]">
//       {/* Hero Section */}
//       <motion.section
//         className="relative h-screen flex flex-col justify-center items-center text-center bg-[url('/images/coffee-hero.jpg')] bg-cover bg-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//       >
//         <motion.h1
//           className="text-5xl md:text-6xl font-bold text-green-700 drop-shadow-lg"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         >
//           Discover Ethiopian Green Coffee
//         </motion.h1>
//         <motion.p
//           className="mt-4 text-xl text-green-700 drop-shadow-md"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6, duration: 1 }}
//         >
//           Fresh, premium, directly from Ethiopian farms
//         </motion.p>
//         <motion.button
//             onClick={handleButton}
//           whileHover={{ scale: 1.1 }}
//           className="mt-8 px-6 py-3 bg-[#6b4226] text-white font-semibold rounded-md shadow-lg cursor-pointer"
//         >
//           {user ? "Shop Now " : "Sign-In or Sign-Up"}
//         </motion.button>
//         {user && (
//             <Link href={`${role}`} className="hover:underline">Goto Dashboard</Link>
//           )}
//       </motion.section>

//       {/* Featured Products */}
//       <section className="py-20 px-4 md:px-20">
//         <h2 className="text-4xl font-bold mb-10 text-center">
//           Featured Products
//         </h2>
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 border"
//           variants={container}
//           initial="hidden"
//           animate="show"
//         >
//         {products.map((product) => (
//           <motion.div
//             key={product.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Card className="rounded-2xl shadow-md hover:shadow-xl transition border">
//               <CardContent className="p-4">
//                 <img
//                   src={product.image}
//                   alt={product.product_name || "Product image"}
//                   className="w-full h-48 object-cover rounded-xl"
//                   loading="lazy"
//                 />
//                 <h2 className="text-lg font-semibold mt-3">
//                   {product.product_name}
//                 </h2>
//                 <p className="text-xl font-bold text-green-600">
//                   ₹ {product.price}
//                 </p>
//               </CardContent>

//               <CardFooter className="flex flex-col gap-3 p-4">
//                 <Button
//                   className="w-full rounded-xl cursor-pointer"
//                   onClick={()=> handleAddToCart(product?.id)}
//                   disabled={loadingId === product.id}
//                 >
//                   {loadingId === product.id ? "Adding..." : "Add to Cart"}
//                 </Button>

//                 <Button
//                   className="w-full rounded-xl cursor-pointer"
//                   variant="secondary"
//                   onClick={() => handleBuyNow(product.id)}
//                 >
//                   Buy Now
//                 </Button>
//                 <Button
//                   className="w-full rounded-xl cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold"
//                   variant="secondary"
//                   onClick={() => handleBuyNow(product.id)}
//                 >
//                   Detail
//                 </Button>

//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//         </motion.div>
//       </section>
//     </div>
//   );
// }

// // Recommended Home Page Sections

// // A good home page for your project could include:

// // Hero Section (animated slider/banner)

// // Showcase Ethiopian coffee varieties

// // Framer Motion fade-in/out or slide animation

// // Call-to-action: "Shop Now"

// // Featured Products Section

// // Grid of products (animated fade-up or staggered appearance)

// // Categories Section

// // Highlight Sidama, Yirgacheffe, Jimma, etc.

// // Hover animations for images

// // Services/Benefits Section

// // Worldwide delivery, 24/7 support, fresh coffee, etc.

// // Card animations

// // Brands / Partners Section

// // Logo carousel with sliding animation

// // Footer

// // Contact info, social links, newsletter subscription

// Enhanced, premium UI version of your HomePage component
"use client";


import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { addToCart } from "@/utils/services/cartItem";
import { ShoppingCart, ArrowRight, Coffee } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../checkTheme";
import { Product } from "@prisma/client";
import PopupNotification from "../popupNotification";

interface roleProps {
  role: "ADMIN" | "BUYER" | "SELLER" | "LAB_TECHNICIAN" | "CASHIER" | "/";
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

export default function HomePage({ role, products }: roleProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();


  // language option
    const { theme, toggleTheme } = useTheme();
    let language = theme;
 console.log("theme : ",theme)

  const handleAddToCart = async (id: string) => {
    setLoadingId(id);
    await addToCart(id);
    setLoadingId(null);
    toast.success("Added to cart!");
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
          className="relative text-5xl md:text-7xl font-extrabold  drop-shadow-lg tracking-wide text-green-700"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {language === "ENGLISH"
            ? "Discover Ethiopian Green Coffee"
            : language === "AFAN_OROMO"
            ? "Buna magariisa Itoophiyaa argadhaa ."
            : language === "AMHARIC"
            ? " የኢትዮጵያ አረንጓዴ ቡናን ያግኙ "
            : ""}
        </motion.h1>

        <motion.p
          className="relative mt-4 text-2xl drop-shadow-md max-w-2xl bg-white p-2 rounded text-green-500"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {language === "ENGLISH"
            ? " Fresh, premium, directly from smallholder Ethiopian farms."
            : language === "AFAN_OROMO"
            ? "Buna haaraa, gatii olaanaa, kallattiin qonna Itoophiyaa xixiqqaa irraa."
            : language === "AMHARIC"
            ? "ትኩስ፣ ፕሪሚየም እና ቀጥታ ከትንሹ የኢትዮጵያ ገበሬዎች እርሻ[አገልግሎት] የመጡ። "
            : " "}
        </motion.p>

        {/* HERO BUTTON */}
        <motion.button
          onClick={handleButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative cursor-pointer mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2"
        >
          {language === "ENGLISH"
            ? user
              ? "Shop Now"
              : "Sign-In or Sign-Up"
            : language === "AFAN_OROMO"
            ? user
              ? " Amma Bitadhaa"
              : "Seenaa Yookiin Galmaa'aa"
            : language === "AMHARIC"
            ? user
              ? " አሁን ይሸምቱ "
              : "በመለያ ይግቡ ወይም ይመዝገቡ"
            : ""}
          <ArrowRight />
        </motion.button>

        {user && (
          <Link
            href={`/${role}`}
            className="relative mt-3 text-white hover:underline"
          >
            {language === "ENGLISH"
              ? "Go To Dashboard"
              : language === "AFAN_OROMO"
              ? " Gara Daashboordii deemaa ."
              : language === "AMHARIC"
              ? " ወደ ዳሽቦርድ ይሂዱ"
              : ""}
          </Link>
        )}
      </motion.section>

      {/* FEATURED SECTION */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-[#4b2e16] mb-12 flex items-center justify-center gap-3">
          <Coffee className="text-green-700" />
          {language === "ENGLISH"
            ? "Featured Coffee Products"
            : language === "AFAN_OROMO"
            ? "Oomishaalee bunaa adda ta'an "
            : language === "AMHARIC"
            ? " ተለይተው የቀረቡ የቡና ምርቶች"
            : ""}
        </h2>

        <div
          className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/green_coffee.png')` }}
        >
          {/* Optional gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />

          <motion.div
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 sm:p-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={item}>
                <Card className="rounded-3xl shadow-md hover:shadow-xl border border-gray-200 hover:border-green-500 transition-all duration-300 bg-white/95 backdrop-blur-md overflow-hidden flex flex-col">
                  {/* IMAGE */}
                  <div className="relative group">
                    <img
                      // src={product.image}
                      src="/cup_coffee.png"
                      alt={product.product_name}
                      className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
                      loading="lazy"
                    />

                    {/* Floating Buy Now Button */}
                    <Button
                      onClick={() => handleBuyNow(product.id)}
                      variant="secondary"
                      className="absolute cursor-pointer bottom-3 right-3 px-4 py-2 rounded-xl bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-600 transition-all"
                    >
                      {language === "ENGLISH"
                        ? "Buy Now"
                        : language === "AFAN_OROMO"
                        ? "Amma Bitadhaa"
                        : language === "AMHARIC"
                        ? " አሁን ግዛ"
                        : ""}
                    </Button>
                  </div>

                  {/* CONTENT */}
                  <CardContent className="p-5 flex flex-col gap-2 flex-grow">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
                      {product.product_name}
                    </h2>

                    <p className="text-2xl font-bold text-green-700">
                       {product.price} Brr
                    </p>
                  </CardContent>

                  {/* FOOTER BUTTONS */}
                  <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={loadingId === product.id}
                      className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                      <ShoppingCart size={18} />
                      {language === "ENGLISH"
                        ? loadingId === product.id
                          ? "Adding..."
                          : "Add to Cart"
                        : language === "AFAN_OROMO"
                        ? loadingId === product.id
                          ? "Dabalaa jira..."
                          : "Gara Kuusaatti Dabalaa"
                        : language === "AMHARIC"
                        ?  loadingId === product.id
                        ? "እየጨመሩ..."
                        : "ወደ ግዢው ቅርጫት ይጨምሩ"
                        : ""}
                    </Button>

                    <Link href={`/product/${product.id}`} className="w-full">
                      <Button className="w-full cursor-pointer rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                        {language === "ENGLISH"
                          ? "View Detail"
                          : language === "AFAN_OROMO"
                          ? "Bal'ina isaa ilaalaa"
                          : language === "AMHARIC"
                          ? " ዝርዝሮችን ይመልከቱ"
                          : ""}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>
    </div>
  );
}
