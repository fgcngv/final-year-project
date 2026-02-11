import { getAllProducts } from "@/app/[locale]/actions/products";
import { useTheme } from "@/components/checkTheme";
import ProductsPage from "@/components/products";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";

async function Products() {
  let cartQuantity = 0;
  const { userId } = await auth();
  const { data } = await getAllProducts();

  console.log(data);

  const cart = await getCartByUserIdForCartQuantity(userId || "");
  cart?.items?.map((item) => (cartQuantity += item?.quantity));
  console.log(cartQuantity);
  if (!data) {
    return <div>No Product Found</div>;
  }

      const unread = await getAllUnreadNotifications();
  

  return (
    <div>
      <ProductsPage cartQuantity={cartQuantity} notification={unread?.data?.length}  products={data} />
    </div>
  );
}

export default Products;
