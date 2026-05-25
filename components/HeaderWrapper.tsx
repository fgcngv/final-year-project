// import Header from "./Header";
import { getWishlistCount } from "@/utils/services/wishlistCount";
import Header from "./header";

export default async function HeaderWrapper({
  cartQuantity,
  notification,
}: {
  cartQuantity?: number;
  notification?: number;
}) {
  const wishlistCount = await getWishlistCount();

  return (
    <Header
      cartQuantity={cartQuantity}
      notification={notification}
      wishlistCount={wishlistCount}
    />
  );
}