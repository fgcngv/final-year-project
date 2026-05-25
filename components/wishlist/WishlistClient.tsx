"use client";

import { Heart, Trash2 } from "lucide-react";
import { removeFromWishlist } from "@/utils/services/wishlist";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WishlistClient({ items }: { items: any[] }) {
  const router = useRouter();

  const handleRemove = async (productId: string) => {
    const res = await removeFromWishlist(productId);

    if (res.success) {
      toast.success("Removed from wishlist");
      router.refresh();
    } else {
      toast.error("Failed to remove");
    }
  };

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <Heart className="w-12 h-12 mb-3" />
        <p>Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
          >
            <img
              src={item.product.image}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h2 className="mt-3 font-semibold">
              {item.product.product_name}
            </h2>

            <p className="text-green-600 font-bold">
              {item.product.price} Birr
            </p>

            <p className="text-sm text-gray-500">
              Farmer: {item.product.farmer.first_name}{" "}
              {item.product.farmer.last_name}
            </p>

            <button
              onClick={() => handleRemove(item.product_id)}
              className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}