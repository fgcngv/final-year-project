import OrdersPage from "@/components/ordersPage";
import { getRole } from "@/utils/role";
import { getCartByUserId } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Orders() {
    let cartQuantity = 0;
    const {userId} = await auth();
    const cart = await getCartByUserId(userId || "");
    const role = await getRole();

    if(role === "farmer"){
        redirect("../farmer/orders");
    }
    
    if(!cart ||"error" in cart){
        return <div><OrdersPage /> </div>
    }

    cart?.items?.map((item)=>(
        cartQuantity += item?.quantity
    ));

    return ( 
        <div>
            <OrdersPage cartQuantity={cartQuantity} />
        </div>
     );
}

export default Orders;