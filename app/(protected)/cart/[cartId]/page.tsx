// import CartPage from "@/components/cart/cartPage";
// import { getCart, getCartByUserId } from "@/utils/services/cart";
// import { auth } from "@clerk/nextjs/server";

// async function CartById() {
//     const {userId} = await auth();
//     if(!userId){
//         return <div>Not Authenticated</div>
//     }

//     const data = await getCartByUserId(userId);

//     console.log("cartdata : ",data)
//     if(!data){
//         return <div>You have no Cart Stored</div>
//     }
//     return (
//         <div>
//             <CartPage cart_id={data?.id} user_id={userId} items={data?.items} total={10}/>
//         </div>
//      );
// }

// export default CartById;

import CartPage from "@/components/cart/cartPage";
import { getCartByUserId } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function CartById() {
  let cartQuantity = 0;
  const { userId } = await auth();
  if (!userId) return <div>Not Authenticated</div>;

  const data = await getCartByUserId(userId);

  if (!data || "error" in data)
    return (
      <div className="h-screen flex flex-col bg-green-900 text-2xl text-white font-bold justify-center items-center">
        <h1>You have no Cart Stored</h1>
        <Link
          href="/product"
          className="bg-green-950 p-1 rounded hover:underline "
        >
          Buy Products
        </Link>
      </div>
    );

  // calculate cart quantity
  data?.items?.map((item) => (cartQuantity += item?.quantity));

  console.log("quantity : ", cartQuantity);

  return (
    <div>
      <CartPage
        cartQuantity={cartQuantity}
        cart_id={data.id}
        user_id={userId}
        items={data.items}
        total={data.items.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0
        )}
      />
    </div>
  );
}

export default CartById;
