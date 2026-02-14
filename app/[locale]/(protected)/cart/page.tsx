export const dynamic = "force-dynamic";


import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";

async function CartPage() {
    const {userId} = await auth();
    if(!userId){
        return <div>Not Authenticated</div>
    }

    return ( 
        <div>cart page</div>
     );
}

export default CartPage;