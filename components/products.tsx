"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/header";
import { addToCart } from "@/utils/services/cartItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "./checkTheme";

interface Product {
  id: string;
  product_name: string;
  image: string;
  price: number;
}

interface ProductsProps {
  cartQuantity?: number,
  products: Product[];
}

export default function ProductsPage({ products,cartQuantity }: ProductsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  let language = theme;

  const router = useRouter();
  if (!products || products.length === 0) {
    return (
      <div className="flex h-screen w-full bg-green-900 text-2xl font-bold text-center items-center justify-center">
        <Header cartQuantity={cartQuantity} />

        <div className="flex flex-col gap-2 text-white">
          {language === "ENGLISH"
            ? " No Products Found!"
            : language === "AFAN_OROMO"
            ? " Oomishni Hin Jiru! "
            : language === "AMHARIC"
            ? " ምንም ምርቶች አልተገኙም! "
            : ""}

          {language === "ENGLISH" ? (
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 cursor-pointer font-bold"
            >
              Back To Home
            </Button>
          ) : language === "AFAN_OROMO" ? (
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 cursor-pointer font-bold"
            >
              Deebi'i
            </Button>
          ) : language === "AMHARIC" ? (
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 cursor-pointer font-bold"
            >
              ተመለስ
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  const handleAddToCart = async (id: string) => {
    setLoadingId(id);

    const data = await addToCart(id);

    if (!data) {
      toast.error("Failed to add cart item!");
    }
    toast.success("Product Added to Cart Successfully!");

    setLoadingId(null);
  };

  const handleBuyNow = (id: string) => {
    alert(`Redirecting to checkout for product ${id}`);
  };

  return (
    <div className="min-h-screen px-4 md:px-12 py-16">
      <Header />
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === "ENGLISH"
          ? " All Products"
          : language === "AFAN_OROMO"
          ? "Oomishaalee Hunda "
          : language === "AMHARIC"
          ? " ሁሉም ምርቶች"
          : ""}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-xl transition border">
              <Button
                className=" rounded-xl bg-blue-600 text-white font-bold w-30 cursor-pointer"
                variant="secondary"
                onClick={() => handleBuyNow(product.id)}
              >
                {language === "ENGLISH"
                  ? " Buy Now"
                  : language === "AFAN_OROMO"
                  ? "Amma Biti "
                  : language === "AMHARIC"
                  ? " አሁን ግዛ"
                  : ""}
              </Button>
              <CardContent className="p-4">
                <img
                  // src={product.image}
                  src={`${product?.image}`}
                  alt={product.product_name || "Product image"}
                  className="w-full h-48 object-cover rounded-xl"
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold mt-3">
                  {product.product_name}
                </h2>
                <p className="text-xl font-bold text-green-600">
                  {product.price} Brr
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 p-4 ">
                <div className="flex justify-between  w-full items-center ">
                  <Button
                    className=" rounded-xl cursor-pointer"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingId === product.id}
                  >
                    {language === "ENGLISH"
                      ? loadingId === product.id
                        ? "Adding..."
                        : "Add to Cart"
                      : language === "AFAN_OROMO"
                      ? loadingId === product.id
                        ? "Dabalaa Jira..."
                        : "Kuusaatti Dabali"
                      : language === "AMHARIC"
                      ? loadingId === product.id
                        ? "እየጨመሩ ነው..."
                        : "ወደ ግዢው ቅርጫት ጨምር"
                      : ""}
                  </Button>
                  <Button
                    className=" rounded-xl cursor-pointer bg-green-600 font-bold text-white hover:bg-green-700"
                    variant="secondary"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    {language === "ENGLISH"
                      ? "Detail "
                      : language === "AFAN_OROMO"
                      ? " Odeeffannoo Bal'aa "
                      : language === "AMHARIC"
                      ? " ዝርዝር"
                      : ""}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// {
//   language === "ENGLISH"
//   ? " " :language === "AFAN_OROMO"
//   ? " " :language === "AMHARIC"
//   ? " " : ""
// }
