

import { getCartByUserId } from "@/utils/services/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

async function CartAmount({ userId }: { userId: string }) {
  const cart = await getCartByUserId(userId);

  if (!cart?.items?.length) {
    return <div>No Cart Items Found!</div>;
  }

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative cursor-pointer">
      <Link href={`/cart/${userId}`}>
        <ShoppingCart className="w-7 h-7" />
      </Link>

      <span className="absolute -top-2 -right-2 bg-green-600 text-xs font-bold rounded-full px-2 py-0.5">
        {totalQuantity}
      </span>
    </div>
  );
}

export default CartAmount;


