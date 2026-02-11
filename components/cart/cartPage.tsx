


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash } from "lucide-react";
import { deleteCartItemById, updateQuantity } from "@/utils/services/cartItem";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "../checkTheme";
import Header from "../header";
import LoaderBtn from "../loaderBtn";

interface CartItemProps {
  cartQuantity?:number;
  cart_id: string;
  user_id: string;
  total: number;
  items: {
    id: string; // CartItem id
    quantity: number;
    product: {
      id: string;
      product_name: string;
      price: number;
      image: string;
      product_detail: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  notification?:number
}

export default function CartPage({
  cartQuantity,
  cart_id,
  user_id,
  items,
  total,
  notification
}: CartItemProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(items);
  const [deleteloading, setDeleteLoading] = useState<string>("");

  const { theme } = useTheme();

  // ✅ FIXED — ALWAYS returns a valid union type
  const language: "ENGLISH" | "AMHARIC" | "AFAN_OROMO" =
    theme === "AMHARIC"
      ? "AMHARIC"
      : theme === "AFAN_OROMO"
      ? "AFAN_OROMO"
      : "ENGLISH";


  const handleIncrement = async (
    id: string,
    action: "increment" | "decrement"
  ) => {
    // Local UI update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : item.quantity > 0
                  ? item.quantity - 1
                  : 0,
            }
          : item
      )
    );

    await updateQuantity(id, action);
    router.refresh();
  };

  // const handleDelete = async (id: string) => {
  //   setDeleteLoading(id);

  //   const deleteData = await deleteCartItemById(id, user_id);

  //   if (!deleteData) {
  //     toast.error("Failed to delete Cart Item!");
  //   }

  //   toast.success("Cart Item Deleted Successfully!");
  //   setDeleteLoading("");
  //   router.refresh();
  // };
  const handleDelete = async (id: string) => {
    setDeleteLoading(id);
  
    const deleteData = await deleteCartItemById(id, user_id);
  
    if (!deleteData) {
      toast.error("Failed to delete Cart Item!");
      setDeleteLoading("");
      return;
    }
  
    // Update local state immediately
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  
    toast.success("Cart Item Deleted Successfully!");
    setDeleteLoading("");
    
    router.refresh();
  };

  
  return (
    <div className="flex flex-col gap-4">
      {/* <Header language={language} /> */}
      <Header cartQuantity={cartQuantity} notification={notification} />
      <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="h-8 p-10"></div>

        <h1 className="text-2xl font-bold mb-6">
          {language === "ENGLISH"
            ? "Your Cart"
            : language === "AFAN_OROMO"
            ? "Kuusaa keessan"
            : "የእርስዎ ቁሳቁስ ሰብስብ"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: PRODUCTS */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 rounded-2xl shadow-sm">
                <CardContent className="flex items-center gap-4 p-0">
                  <img
                    src={item.product.image}
                    alt={item.product.product_name}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {item.product.product_name}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {item.product.product_detail}
                    </p>

                    <p className="font-bold mt-1">{item.product.price} Brr</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full cursor-pointer"
                        onClick={() => handleIncrement(item.id, "decrement")}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="font-semibold">{item.quantity}</span>

                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full cursor-pointer"
                        onClick={() => handleIncrement(item.id, "increment")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Delete button */}
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={deleteloading === item.id}
                    className={cn(
                      "cursor-pointer hover:bg-red-900",
                      deleteloading === item.id ? "" : ""
                    )}
                    onClick={() => handleDelete(item.id)}
                  >
                    {language === "ENGLISH" ? (
                      deleteloading === item.id ? (
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )
                    ) : language === "AFAN_OROMO" ? (
                      deleteloading === item.id ? (
                        "Balleessaa Jira..."
                      ) : (
                        <Trash className="h-4 w-4" />
                      )
                    ) : deleteloading === item.id ? (
                      "በመሰረዝ ላይ..."
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {items.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-lg">
                {language === "ENGLISH"
                  ? "Your cart is empty."
                  : language === "AFAN_OROMO"
                  ? "Kuusan keessan duwwaadha."
                  : "ጋሪዎ ባዶ ነው።"}
                  <LoaderBtn btnName="Browse Coffee" className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 border text-black font-bold" linkTo="/product"/>
              </div>
            )}
          </div>

          {/* RIGHT: TOTAL SUMMARY */}
          {
            cartItems.length > 0 ? 
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4">
              {language === "ENGLISH"
                ? "Order Summary"
                : language === "AFAN_OROMO"
                ? "Cuunfaa Ajaja"
                : "የትዕዛዝ ማጠቃለያ"}
            </h2>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>
                {language === "ENGLISH"
                  ? "Subtotal"
                  : language === "AFAN_OROMO"
                  ? "Kanfaltii Oomishaa"
                  : "ድምር"}
              </span>
              <span>{total.toFixed(2)} Brr</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>
                {language === "ENGLISH"
                  ? "Shipping"
                  : language === "AFAN_OROMO"
                  ? "Fe'umsa"
                  : "መላኪያ"}
              </span>
              <span> 0.00 Brr</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
              <span>
                {language === "ENGLISH"
                  ? "Total"
                  : language === "AFAN_OROMO"
                  ? "Walii Gala"
                  : "አጠቃላይ"}
              </span>
              <span>{total.toFixed(2)} Brr</span>
            </div>


            <LoaderBtn btnName={`
            ${language === "ENGLISH"
                ? "Checkout"
                : language === "AFAN_OROMO"
                ? "Xummuraa"
                : "ጨርሰው ይውጡ"}`} 
                className="w-full mt-5 py-3 text-lg rounded-xl cursor-pointer" 
                linkTo="/check-out"
                />
          </div>
            : null
          }
        </div>
      </div>
    </div>
  );
}
