
// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Header from "@/components/header";
// import { addToCart } from "@/utils/services/cartItem";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useTheme } from "./checkTheme";
// import LoaderBtn from "./loaderBtn";
// import { useTranslations } from "next-intl";
// import Link from "next/link";

// interface Product {
//   id: string;
//   product_name: string;
//   image: string;
//   price: number;
//   stock: number; // <-- include stock for validation
// }

// interface ProductsProps {
//   cartQuantity?: number;
//   products: Product[];
//   notification?: number;
// }

// export default function ProductsPage({
//   products,
//   cartQuantity,
//   notification,
// }: ProductsProps) {
//   const [loadingId, setLoadingId] = useState<string | null>(null);
//   const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});
//   const { theme } = useTheme();
//   const language = theme;

//   const router = useRouter();

//   // translation
//   const tp = useTranslations("products");
//   const tb = useTranslations("button");
//   const tc = useTranslations("cart");

//   if (!products || products.length === 0) {
//     return (
//       <div className="flex h-screen w-full bg-green-900 text-2xl font-bold text-center items-center justify-center">
//         <Header cartQuantity={cartQuantity} />
//         <div className="flex flex-col gap-2 text-white">
//           {language === "ENGLISH"
//             ? " No Products Found!"
//             : language === "AFAN_OROMO"
//             ? " Oomishni Hin Jiru! "
//             : language === "AMHARIC"
//             ? " ምንም ምርቶች አልተገኙም! "
//             : ""}
//           <Button
//             onClick={() => router.push("/")}
//             className="bg-green-600 cursor-pointer font-bold"
//           >
//             {language === "ENGLISH"
//               ? "Back To Home"
//               : language === "AFAN_OROMO"
//               ? "Deebi'i"
//               : "ተመለስ"}
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const handleQuantityChange = (productId: string, qty: number) => {
//     setQuantityMap((prev) => ({ ...prev, [productId]: qty }));
//   };

//   const handleAddToCart = async (product: Product) => {
//     const quantity = quantityMap[product.id] || 1;

//     if (quantity > product.stock) {
//       toast.error(
//         language === "ENGLISH"
//           ? `Only ${product.stock} left in stock`
//           : language === "AFAN_OROMO"
//           ? `Qofa ${product.stock} hafe jira`
//           : `ብቻ ${product.stock} ቀሩ ነው`
//       );
//       return;
//     }

//     setLoadingId(product.id);
//     const data = await addToCart(product.id, quantity);

//     if (!data?.success) {
//       toast.error(data?.message || "Failed to add cart item!");
//     } else {
//       toast.success(tc("added"));
//     }
//     setLoadingId(null);
//   };

//   const handleBuyNow = (product: Product) => {
//     alert(
//       language === "ENGLISH"
//         ? `Redirecting to checkout for ${product.product_name}`
//         : language === "AFAN_OROMO"
//         ? `${product.product_name} gara kaffaltii deemaa jirta`
//         : `${product.product_name} ወደ ክፍያ ተመልሷል`
//     );
//   };

//   return (
//     <div className="min-h-screen px-4 md:px-12 py-16">
//       <Header notification={notification} cartQuantity={cartQuantity} />
//       <h1 className="text-3xl font-bold mb-8 text-center">{tp("title")}</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <motion.div
//             key={product.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Card
//               className={`rounded-2xl relative shadow-md hover:shadow-xl transition border ${
//                 product.stock === 0 ? " bg-red-300" : " "
//               }`}
//             >
//               <CardContent className={`p-4 flex flex-col gap-2 `}>
//                 <Link href={`product/${product.id}`} className="cursor-pointer">
//                   <div className="relative group">
//                     <img
//                       src={`${product?.image}`}
//                       alt={product.product_name || "Product image"}
//                       // className="w-full h-48 object-cover rounded-xl"
//                       className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
//                       loading="lazy"
//                     />
//                   </div>
//                 </Link>
//                 <h2 className="text-lg font-semibold">
//                   {product.product_name}
//                 </h2>
//                 <p className="text-xl font-bold text-green-600">
//                   {product.price} Brr
//                 </p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <input
//                     type="number"
//                     min={1}
//                     max={product.stock}
//                     value={quantityMap[product.id] || 1}
//                     onChange={(e) =>
//                       handleQuantityChange(product.id, Number(e.target.value))
//                     }
//                     className="w-20 p-1 rounded border text-center"
//                   />
//                   <span className="text-sm text-gray-500">
//                     {product.stock === 0
//                       ? "Finished Product!"
//                       : language === "ENGLISH"
//                       ? `Stock: ${product.stock}`
//                       : language === "AFAN_OROMO"
//                       ? `Qabeenya: ${product.stock}`
//                       : `እቃ ቀሪ: ${product.stock}`}
//                   </span>
//                 </div>
//               </CardContent>

//               <CardFooter className="flex flex-col gap-3 p-4">
//                 <div className="flex justify-between items-center w-full">
//                   <Button
//                     className="rounded-xl cursor-pointer"
//                     onClick={() => handleAddToCart(product)}
//                     disabled={loadingId === product.id || product.stock === 0}
//                   >
//                     {loadingId === product.id ? "loading..." : tb("add")}
//                   </Button>

//                   <LoaderBtn
//                     btnName={tb("detail")}
//                     linkTo={`/product/${product.id}`}
//                     className="rounded-xl cursor-pointer bg-green-600 font-bold text-white hover:bg-green-700"
//                     disable={product.stock === 0}
//                   />
//                 </div>
//               </CardFooter>
//               <Button
//                 className="rounded-xl bg-blue-600 absolute top-10 left-10 text-white font-bold"
//                 onClick={() => handleBuyNow(product)}
//                 disabled={product.stock === 0}
//               >
//                 {tb("buy")}
//               </Button>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/header";
import { addToCart } from "@/utils/services/cartItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "./checkTheme";
import LoaderBtn from "./loaderBtn";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Product {
  id: string;
  product_name: string;
  image: string;
  price: number;
  stock: number;
}

interface ProductsProps {
  cartQuantity?: number;
  products: Product[];
  notification?: number;
}

export default function ProductsPage({
  products,
  cartQuantity,
  notification,
}: ProductsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const { theme } = useTheme();
  const router = useRouter();

  const tp = useTranslations("products");
  const tb = useTranslations("button");
  const tc = useTranslations("cart");
  const language = theme;

  /* =====================
     SEARCH LOGIC + HIGHLIGHT
  ====================== */
  const filteredProducts = useMemo(() => {
    const cleaned = searchTerm.trim().toLowerCase();
    if (!cleaned) return products;

    return products.filter((product) =>
      product.product_name.toLowerCase().includes(cleaned)
    );
  }, [searchTerm, products]);

  const highlightText = (text: string) => {
    const cleaned = searchTerm.trim();
    if (!cleaned) return text;

    const regex = new RegExp(`(${cleaned})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, idx) =>
      regex.test(part) ? (
        <mark key={idx} className="bg-yellow-300 text-black">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex h-screen w-full bg-green-900 text-2xl font-bold text-center items-center justify-center">
        <Header cartQuantity={cartQuantity} />
        <div className="flex flex-col gap-2 text-white">
          {language === "ENGLISH"
            ? "No Products Found!"
            : language === "AFAN_OROMO"
            ? "Oomishni Hin Jiru!"
            : "ምንም ምርቶች አልተገኙም!"}
          <Button
            onClick={() => router.push("/")}
            className="bg-green-600 cursor-pointer font-bold"
          >
            {language === "ENGLISH"
              ? "Back To Home"
              : language === "AFAN_OROMO"
              ? "Deebi'i"
              : "ተመለስ"}
          </Button>
        </div>
      </div>
    );
  }

  /* =====================
     QUANTITY HANDLING
  ====================== */
  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantityMap((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = async (product: Product) => {
    const quantity = quantityMap[product.id] || 1;

    if (quantity > product.stock) {
      toast.error(
        language === "ENGLISH"
          ? `Only ${product.stock} left in stock`
          : language === "AFAN_OROMO"
          ? `Qofa ${product.stock} hafe jira`
          : `ብቻ ${product.stock} ቀሩ ነው`
      );
      return;
    }

    setLoadingId(product.id);
    const data = await addToCart(product.id, quantity);

    if (!data?.success) {
      toast.error(data?.message || "Failed to add cart item!");
    } else {
      toast.success(tc("added"));
    }
    setLoadingId(null);
  };

  const handleBuyNow = (product: Product) => {
    alert(
      language === "ENGLISH"
        ? `Redirecting to checkout for ${product.product_name}`
        : language === "AFAN_OROMO"
        ? `${product.product_name} gara kaffaltii deemaa jirta`
        : `${product.product_name} ወደ ክፍያ ተመልሷል`
    );
  };

  /* =====================
     UI
  ====================== */
  return (
    <div className="min-h-screen px-4 md:px-12 py-16">
      <Header notification={notification} cartQuantity={cartQuantity} />

      <h1 className="text-3xl font-bold mb-4 text-center">{tp("title")}</h1>

      {/* SEARCH INPUT */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-2xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mb-10">No products found.</p>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className={`rounded-2xl relative shadow-md hover:shadow-xl transition border ${
                product.stock === 0 ? " bg-red-300" : " "
              }`}
            >
              <CardContent className="p-4 flex flex-col gap-2 ">
                <Link href={`product/${product.id}`} className="cursor-pointer">
                  <div className="relative group">
                    <img
                      src={`${product.image}`}
                      alt={product.product_name || "Product image"}
                      className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-3xl"
                      loading="lazy"
                    />
                  </div>
                </Link>

                {/* Highlighted Product Name */}
                <h2 className="text-lg font-semibold">
                  {highlightText(product.product_name)}
                </h2>

                <p className="text-xl font-bold text-green-600">{product.price} Brr</p>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantityMap[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    className="w-20 p-1 rounded border text-center"
                  />
                  <span className="text-sm text-gray-500">
                    {product.stock === 0
                      ? "Finished Product!"
                      : language === "ENGLISH"
                      ? `Stock: ${product.stock}`
                      : language === "AFAN_OROMO"
                      ? `Qabeenya: ${product.stock}`
                      : `እቃ ቀሪ: ${product.stock}`}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 p-4">
                <div className="flex justify-between items-center w-full">
                  <Button
                    className="rounded-xl cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingId === product.id || product.stock === 0}
                  >
                    {loadingId === product.id ? "loading..." : tb("add")}
                  </Button>

                  <LoaderBtn
                    btnName={tb("detail")}
                    linkTo={`/product/${product.id}`}
                    className="rounded-xl cursor-pointer bg-green-600 font-bold text-white hover:bg-green-700"
                    disable={product.stock === 0}
                  />
                </div>
              </CardFooter>

              <Button
                className="rounded-xl bg-blue-600 absolute top-10 left-10 text-white font-bold"
                onClick={() => handleBuyNow(product)}
                disabled={product.stock === 0}
              >
                {tb("buy")}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
