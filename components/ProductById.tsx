"use client";

import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Heart, Leaf, Star } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/utils/services/cartItem";
import { toast } from "sonner";
import { useTheme } from "./checkTheme";
import Header from "./header";
import Link from "next/link";
import LoaderBtn from "./loaderBtn";


export default function ProductById({ product,isDashboard }: {product:any,isDashboard?:boolean}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  let language = theme;

  const handleAddToCart = async (id: string) => {
    setLoadingId(id);

    const data = await addToCart(id);

    if (!data) {
      toast.error("Failed to add cart item!");
    }
    toast.success("Product Added to Cart Successfully!");

    setLoadingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-6"
    >
      <Header />
      <Card className="shadow-2xl rounded-3xl overflow-hidden border border-gray-200 bg-white mt-5">
        <CardHeader className="border-b bg-gradient-to-r from-green-100 to-green-50 py-6">
          <CardTitle className="text-4xl font-bold text-center flex items-center justify-center gap-2">
            <Leaf className="text-green-600" size={32} />
            {language === "ENGLISH"
              ? " Product Details"
              : language === "AFAN_OROMO"
              ? " Bal'ina oomishaa ."
              : language === "AMHARIC"
              ? "የምርት ዝርዝር "
              : ""}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 grid gap-10 md:grid-cols-2 items-start">
          {/* PRODUCT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src={product?.image || "/globe.svg"}
              alt="product image"
              className="w-full h-80 object-cover rounded-2xl shadow-md border"
            />

            <div className="absolute top-4 right-4 bg-white shadow-md rounded-full p-2">
              <Star className="text-yellow-500 hover:fill-amber-400" />
            </div>
          </motion.div>

          {/* PRODUCT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* NAME + PRICE */}
            <div>
              <h1 className="text-4xl font-extrabold text-green-700">
                ${product?.price}
              </h1>
              <h2 className="text-2xl font-semibold mt-2">
                {product?.product_name}
              </h2>
                {
                  !isDashboard && (
                    <div className="flex items-center bg-gray-400 p-2 max-w-75 rounded-2xl gap-1">
                    <div className="bg-pink-400 p-2 rounded-full text-green-600 font-bold" >
                        {product?.farmer?.first_name.charAt(0)}
                        {product?.farmer?.last_name.charAt(0)}
                    </div>
                    <div>
                    <p className="text-gray-600 text-md mt-1">
                  Farmer:{" "}
                  <span className="font-medium">
                    {product?.farmer?.first_name} {product?.farmer?.last_name}
                  </span>
                </p>
                    </div>
                    <div className="bg-green-800 p-1 rounded text-pink-400 font-bold">
                    <LoaderBtn btnName="Chat" linkTo="/chats" className="bg-green-800 p-1 rounded text-pink-400 font-bold"/>
                    </div>
                  </div>
                  )
                }
            </div>

            {/* DETAILS */}
            <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-xl shadow-inner">
              {product?.product_detail || "No detailed description available."}
            </p>

            <p className="text-gray-700 text-md">
              <span className="font-semibold">Status:</span> {product?.status}
            </p>

            {/* BUTTONS */}
                {
                  !isDashboard && (
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="flex items-center gap-2 rounded-xl px-6 py-3 text-base shadow-md hover:shadow-lg">
                      <Heart size={18} />
                      {language === "ENGLISH"
                        ? " Add to Wishlist "
                        : language === "AFAN_OROMO"
                        ? " Tarree fedhitti dabali ."
                        : language === "AMHARIC"
                        ? "ወደ ፍላጎት ዝርዝር ጨምር"
                        : ""}
                    </Button>
      
                    <Button
                      className=" rounded-xl cursor-pointer bg-green-600 hover:bg-green-700"
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
                  </div>
                  )
                }

                {
                  isDashboard && (
                    <Button
                    className=" rounded-xl cursor-pointer bg-green-600 hover:bg-green-700"
                  >Edit </Button>
                  )
                }
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// {
//   language === "ENGLISH"
//   ? " " : language === "AFAN_OROMO"
//   ? " " : language === "AMHARIC"
//   ? " " : ""
// }
