
"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { addToCart } from "@/utils/services/cartItem";
import { ShoppingCart, ArrowRight, Coffee } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../checkTheme";
import { Product } from "@prisma/client";
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
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage({ role, products }: roleProps) {
  const { user } = useUser();
  const router = useRouter();
  const tc = useTranslations("home");
  const tb = useTranslations("button");
  const tcc = useTranslations("cart");
  const { theme } = useTheme();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  /* =========================
     SEARCH (Professional Way)
  ========================== */

  const filteredProducts = useMemo(() => {
    const cleaned = searchTerm.trim().toLowerCase();

    if (!cleaned) return products;

    return products.filter((product) =>
      product.product_name.toLowerCase().includes(cleaned)
    );
  }, [searchTerm, products]);

  /* =========================
     QUANTITY HANDLING
  ========================== */

  const getQty = (id: string) => quantities[id] || 1;

  const increaseQty = (id: string, stock: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(getQty(id) + 1, stock || 1),
    }));
  };

  const decreaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, getQty(id) - 1),
    }));
  };

  /* =========================
     ACTIONS
  ========================== */

  const handleAddToCart = async (id: string) => {
    setLoadingId(id);
    const result = await addToCart(id, getQty(id));
    setLoadingId(null);

    if (result.success) toast.success(tcc("added"));
    else toast.error(result.message);
  };

  const handleBuyNow = (id: string) => {
    alert(`Redirecting to checkout for product ${id}`);
  };

  const handleButton = () => {
    if (user) router.push("/product");
    else router.push("/sign-in");
  };

  /* =========================
     UI
  ========================== */

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f4efe7]">
      {/* HERO */}
      <motion.section
        className="relative min-h-[90vh] flex flex-col justify-center items-center text-center bg-[url('/cup_coffee.png')] bg-cover bg-center bg-fixed shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <motion.h1
          className="relative text-5xl md:text-7xl font-extrabold tracking-wide text-green-700"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {tc("greeting")}
        </motion.h1>

        <motion.p
          className="relative mt-4 text-2xl max-w-2xl bg-white p-2 rounded text-green-500"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {tc("info")}
        </motion.p>

        <motion.button
          onClick={handleButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl flex items-center gap-2"
        >
          {user ? tc("shopnnowbtn") : tc("signoption")}
          <ArrowRight />
        </motion.button>

        {user && (
          <Link
            href={`/${role}`}
            className="relative mt-3 text-white hover:underline"
          >
            {tb("dashboardbtn")}
          </Link>
        )}
      </motion.section>
      {!user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=" p-1 flex justify-around"
        >
          <Link
            href="/about"
            className="relative active:bg-[#6A4325]/30 cursor-pointer mt-10 px-8 py-4 bg-[#6A4325]/90 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl flex items-center gap-2"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="relative cursor-pointer mt-10 px-8 py-4 bg-[#6A4325]/90 active:bg-[#6A4325]/30 hover:bg-[#6A4325] text-white font-semibold rounded-xl shadow-xl flex items-center gap-2"
          >
            Contact Us
          </Link>
        </motion.div>
      )}
      {/* FEATURED */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-[#4b2e16] mb-8 flex items-center justify-center gap-3">
          <Coffee className="text-green-700" />
          {tc("featured")}
        </h2>

        {/* SEARCH INPUT */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-2xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 mb-10">No products found.</p>
        )}

        {/* PRODUCT GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="rounded-3xl shadow-md hover:shadow-xl border border-gray-200 hover:border-green-500 transition-all duration-300 bg-white overflow-hidden flex flex-col">
                {/* IMAGE */}
                <div className="relative group">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-full h-52 object-cover transition-all duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  <Button
                    onClick={() => handleBuyNow(product.id)}
                    variant="secondary"
                    className="absolute bottom-3 right-3 bg-blue-700 text-white hover:bg-blue-600"
                    disabled={product.stock === 0}
                  >
                    {tb("buy")}
                  </Button>
                </div>

                {/* CONTENT */}
                <CardContent className="p-5 flex flex-col gap-2 flex-grow">
                  <h2 className="text-lg font-semibold">
                    {product.product_name}
                  </h2>

                  <p className="text-2xl font-bold text-green-700">
                    {product.price} Brr
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      onClick={() => decreaseQty(product.id)}
                      size="sm"
                      className="bg-red-700 text-white"
                    >
                      -
                    </Button>

                    <span>{getQty(product.id)}</span>

                    <Button
                      onClick={() =>
                        increaseQty(product.id, product.stock || 1)
                      }
                      size="sm"
                      disabled={product.stock === 0}
                      className="bg-green-700 text-white"
                    >
                      +
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500">
                    {product.stock > 0
                      ? `${product.stock} left in stock`
                      : "Out of stock"}
                  </p>
                </CardContent>

                {/* FOOTER */}
                <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingId === product.id || product.stock === 0}
                    className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-700"
                  >
                    <ShoppingCart size={18} />
                    {loadingId === product.id ? tc("adding") : tb("add")}
                  </Button>

                  <Link href={`/product/${product.id}`} className="w-full">
                    <LoaderBtn
                      disable={product.stock === 0}
                      btnName={tb("detail")}
                      className="w-full bg-green-600 text-white hover:bg-green-700"
                    />
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
