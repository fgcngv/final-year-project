export const dynamic = "force-dynamic";


import BuyerDashboard from "@/components/buyer/BuyerDashboard";
import Header from "@/components/header";
import { Table } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function UserPage() {
    const {userId} = await auth();
    const data = await prisma.user.findMany();
    console.log(data)
    if(!userId){
        redirect("sign-in")
    }

    
      // Handle unauthenticated users FIRST
      if (!userId) {
        redirect("/sign-in");
      }
    
      // Now it is safe to query Prisma
      const cart = await getCartByUserIdForCartQuantity(userId);
    
      let cartQuantity = 0;
      cart?.items?.forEach(item => {
        cartQuantity += item.quantity;
      });
    
      const user = await currentUser(); // safe now
      const unread = await getAllUnreadNotifications();
    
      if (!user) {
        redirect("/sign-in");
      }
    
    return ( 
        <div>
                  <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
           <BuyerDashboard />
           {/* <BuyerOrders /> */}
        </div>
     );
}

export default UserPage;