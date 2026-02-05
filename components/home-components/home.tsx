

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





// old code before adding language translation by i18nexus

// "use client";


// import { useUser } from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { addToCart } from "@/utils/services/cartItem";
// import { ShoppingCart, ArrowRight, Coffee } from "lucide-react";
// import { toast } from "sonner";
// import { useTheme } from "../checkTheme";
// import { Product } from "@prisma/client";
// import PopupNotification from "../popupNotification";
// import LoaderBtn from "../loaderBtn";

// interface roleProps {
//   role: "ADMIN" | "BUYER" | "SELLER" | "LAB_TECHNICIAN" | "CASHIER" | "/";
//   products: Product[];
// }

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2 },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 50 },
//   show: { opacity: 1, y: 0 },
// };

// export default function HomePage({ role, products }: roleProps) {
//   const [loadingId, setLoadingId] = useState<string | null>(null);
//   const router = useRouter();
//   const { user } = useUser();


//   // language option
//     const { theme, toggleTheme } = useTheme();
//     let language = theme;
//  console.log("theme : ",theme)

//   const handleAddToCart = async (id: string) => {
//     setLoadingId(id);
//     await addToCart(id);
//     setLoadingId(null);
//     toast.success("Added to cart!");
//   };

//   const handleBuyNow = (id: string) => {
//     alert(`Redirecting to checkout for product ${id}`);
//   };

//   const handleButton = () => {
//     if (user) router.push("/product");
//     else router.push("/sign-in");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f4efe7]">

//       {/* HERO SECTION */}
//       <motion.section
//         className="relative min-h-[90vh] flex flex-col justify-center items-center text-center bg-[url('/cup_coffee.png')] bg-cover bg-center bg-fixed shadow-inner"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-black/70" />

//         <motion.h1
//           className="relative text-5xl md:text-7xl font-extrabold  drop-shadow-lg tracking-wide text-green-700"
//           initial={{ y: -40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {language === "ENGLISH"
//             ? "Discover Ethiopian Green Coffee"
//             : language === "AFAN_OROMO"
//             ? "Buna magariisa Itoophiyaa argadhaa ."
//             : language === "AMHARIC"
//             ? " የኢትዮጵያ አረንጓዴ ቡናን ያግኙ "
//             : ""}
//         </motion.h1>

//         <motion.p
//           className="relative mt-4 text-2xl drop-shadow-md max-w-2xl bg-white p-2 rounded text-green-500"
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         >
//           {language === "ENGLISH"
//             ? " Fresh, premium, directly from smallholder Ethiopian farms."
//             : language === "AFAN_OROMO"
//             ? "Buna haaraa, gatii olaanaa, kallattiin qonna Itoophiyaa xixiqqaa irraa."
//             : language === "AMHARIC"
//             ? "ትኩስ፣ ፕሪሚየም እና ቀጥታ ከትንሹ የኢትዮጵያ ገበሬዎች እርሻ[አገልግሎት] የመጡ። "
//             : " "}
//         </motion.p>

//         {/* HERO BUTTON */}
//         <motion.button
//           onClick={handleButton}
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.97 }}
//           className="relative cursor-pointer mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2"
//         >
//           {language === "ENGLISH"
//             ? user
//               ? "Shop Now"
//               : "Sign-In or Sign-Up"
//             : language === "AFAN_OROMO"
//             ? user
//               ? " Amma Bitadhaa"
//               : "Seenaa Yookiin Galmaa'aa"
//             : language === "AMHARIC"
//             ? user
//               ? " አሁን ይሸምቱ "
//               : "በመለያ ይግቡ ወይም ይመዝገቡ"
//             : ""}
//           <ArrowRight />
//         </motion.button>

//         {user && (
//           <Link
//             href={`/${role}`}
//             className="relative mt-3 text-white hover:underline"
//           >
//             {language === "ENGLISH"
//               ? "Go To Dashboard"
//               : language === "AFAN_OROMO"
//               ? " Gara Daashboordii deemaa ."
//               : language === "AMHARIC"
//               ? " ወደ ዳሽቦርድ ይሂዱ"
//               : ""}
//           </Link>
//         )}
//       </motion.section>

//       {/* FEATURED SECTION */}
//       <section className="py-20 px-6 md:px-20">
//         <h2 className="text-4xl font-bold text-center text-[#4b2e16] mb-12 flex items-center justify-center gap-3">
//           <Coffee className="text-green-700" />
//           {language === "ENGLISH"
//             ? "Featured Coffee Products"
//             : language === "AFAN_OROMO"
//             ? "Oomishaalee bunaa adda ta'an "
//             : language === "AMHARIC"
//             ? " ተለይተው የቀረቡ የቡና ምርቶች"
//             : ""}
//         </h2>

//         <div
//           className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat"
//           style={{ backgroundImage: `url('/green_coffee.png')` }}
//         >
//           {/* Optional gradient overlay for contrast */}
//           <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />

//           <motion.div
//             className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 sm:p-10"
//             variants={container}
//             initial="hidden"
//             animate="show"
//           >
//             {products.map((product) => (
//               <motion.div key={product.id} variants={item}>
//                 <Card className="rounded-3xl shadow-md hover:shadow-xl border border-gray-200 hover:border-green-500 transition-all duration-300 bg-white/95 backdrop-blur-md overflow-hidden flex flex-col">
//                   {/* IMAGE */}
//                   <div className="relative group">
//                     <img
//                       // src={product.image}
//                       src={`${product?.image}`}
//                       alt={product.product_name}
//                       className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
//                       loading="lazy"
//                     />

//                     {/* Floating Buy Now Button */}
//                     <Button
//                       onClick={() => handleBuyNow(product.id)}
//                       variant="secondary"
//                       className="absolute cursor-pointer bottom-3 right-3 px-4 py-2 rounded-xl bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-600 transition-all"
//                     >
//                       {language === "ENGLISH"
//                         ? "Buy Now"
//                         : language === "AFAN_OROMO"
//                         ? "Amma Bitadhaa"
//                         : language === "AMHARIC"
//                         ? " አሁን ግዛ"
//                         : ""}
//                     </Button>
//                   </div>

//                   {/* CONTENT */}
//                   <CardContent className="p-5 flex flex-col gap-2 flex-grow">
//                     <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
//                       {product.product_name}
//                     </h2>

//                     <p className="text-2xl font-bold text-green-700">
//                        {product.price} Brr
//                     </p>
//                   </CardContent>

//                   {/* FOOTER BUTTONS */}
//                   <CardFooter className="p-5 pt-0 flex flex-col gap-3">
//                     <Button
//                       onClick={() => handleAddToCart(product.id)}
//                       disabled={loadingId === product.id}
//                       className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition"
//                     >
//                       <ShoppingCart size={18} />
//                       {language === "ENGLISH"
//                         ? loadingId === product.id
//                           ? "Adding..."
//                           : "Add to Cart"
//                         : language === "AFAN_OROMO"
//                         ? loadingId === product.id
//                           ? "Dabalaa jira..."
//                           : "Gara Kuusaatti Dabalaa"
//                         : language === "AMHARIC"
//                         ?  loadingId === product.id
//                         ? "እየጨመሩ..."
//                         : "ወደ ግዢው ቅርጫት ይጨምሩ"
//                         : ""}
//                     </Button>

//                     <Link href={`/product/${product.id}`} className="w-full">
//                       <LoaderBtn
//                          btnName={language === "ENGLISH"
//                           ? "View Detail"
//                           : language === "AFAN_OROMO"
//                           ? "Bal'ina isaa ilaalaa"
//                           : language === "AMHARIC"
//                           ? " ዝርዝሮችን ይመልከቱ"
//                           : ""}
//                           className="w-full cursor-pointer rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
//                        />
//                     </Link>
//                   </CardFooter>
//                 </Card>
//               </motion.div>
//             ))}

//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }







// new code after language translation by i18nexus

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
import LoaderBtn from "../loaderBtn";
import { useTranslations } from "next-intl";

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

  const tc = useTranslations('home');
  const tb = useTranslations('button');


  // language option
    const { theme, toggleTheme } = useTheme();
    let language = theme;
 console.log("theme : ",theme)

  const handleAddToCart = async (id: string, quantity: number) => {
    setLoadingId(id);
    const result = await addToCart(id, quantity);
    setLoadingId(null);
  
    if (result.success) toast.success(tc('added'));
    else toast.error(result.message);
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
        className="relative min-h-[90vh] flex flex-col justify-center items-center text-center bg-[url('/cup_coffee.png')] bg-cover bg-center bg-fixed shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <motion.h1
          className="relative text-5xl md:text-7xl font-extrabold  drop-shadow-lg tracking-wide text-green-700"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {tc('greeting')}
        </motion.h1>

        <motion.p
          className="relative mt-4 text-2xl drop-shadow-md max-w-2xl bg-white p-2 rounded text-green-500"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {tc('info')}
        </motion.p>

        {/* HERO BUTTON */}
        <motion.button
          onClick={handleButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative cursor-pointer mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2"
        >
          {
            user ? tc('shopnnowbtn') : tc('signoption')
          }
          <ArrowRight />
        </motion.button>

        {user && (
          <Link
            href={`/${role}`}
            className="relative mt-3 text-white hover:underline"
          >
            {tb('dashboardbtn')}
          </Link>
        )}
      </motion.section>

      {/* FEATURED SECTION */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-[#4b2e16] mb-12 flex items-center justify-center gap-3">
          <Coffee className="text-green-700" />
          {tc('featured')}
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
  {products.map((product) => {
    const [qty, setQty] = useState(1); // quantity state for each product

    return (
      <motion.div key={product.id} variants={item}>
        <Card className={`rounded-3xl shadow-md hover:shadow-xl border border-gray-200 hover:border-green-500 transition-all duration-300${product.stock === 0 ? " bg-red-300" : " bg-white/95"} backdrop-blur-md overflow-hidden flex flex-col`}>
          {/* IMAGE */}
          <div className="relative group">
            <img
              src={`${product?.image}`}
              alt={product.product_name}
              className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
              loading="lazy"
            />

            {/* Floating Buy Now Button */}
            <Button
              onClick={() => handleBuyNow(product.id)}
              variant="secondary"
              className="absolute cursor-pointer bottom-3 right-3 px-4 py-2 rounded-xl bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-600 transition-all"
              disabled={product.stock === 0}
            >
              {tb('buy')}
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

            {/* Quantity selector */}
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => setQty(Math.max(1, qty - 1))}
                size="sm"
                className="bg-red-700 font-bold text-2xl hover:bg-red-800 active:bg-red-500 cursor-pointer"
              >
                -
              </Button>
              <span>{qty}</span>
              <Button
                onClick={() =>
                  setQty(Math.min(qty + 1, product.stock || 1))
                }
                size="sm"
                disabled={product.stock === 0}
                className="bg-green-700 font-bold text-2xl hover:bg-green-800 active:bg-green-500 cursor-pointer"
              >
                +
              </Button>
            </div>

            {/* Stock info */}
            <p className="text-sm text-gray-500 mt-1">
              {product.stock > 0
                ? `${product.stock} left in stock`
                : "Out of stock"}
            </p>
          </CardContent>

          {/* FOOTER BUTTONS */}
          <CardFooter className="p-5 pt-0 flex flex-col gap-3">
            <Button
              onClick={() => handleAddToCart(product.id, qty)}
              disabled={loadingId === product.id || product.stock === 0}
              className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              <ShoppingCart size={18} />
              {loadingId === product.id ? tc('adding') : tb('add')}
            </Button>

            <Link href={`/product/${product.id}`} className="w-full">
              <LoaderBtn
                 disable={product.stock === 0}
                btnName={tb('detail')}
                className="w-full cursor-pointer rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              />
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    );
  })}
</motion.div>

        </div>
      </section>
    </div>
  );
}
