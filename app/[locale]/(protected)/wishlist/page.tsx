import { getWishlist } from "@/utils/services/wishlist";
import WishlistClient from "@/components/wishlist/WishlistClient";
import { auth } from "@clerk/nextjs/server";

export default async function WishlistPage() {
  const {userId} = await auth();
  if (!userId) {
    return;
  }

  const result = await getWishlist();


  if (!result.success) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load wishlist
      </div>
    );
  }

  return <WishlistClient items={result.data} />;
}