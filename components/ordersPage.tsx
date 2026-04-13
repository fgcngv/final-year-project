
import Header from "@/components/header";
import { getAllUnreadNotifications } from "@/utils/services/notification";

async function OrdersPage({cartQuantity}:{cartQuantity?:number}) {
          const unread = await getAllUnreadNotifications();
    return ( 
        <div>
            <Header notification={unread?.data?.length} cartQuantity={cartQuantity}/>
            <div className="pt-18">
            orders page

            </div>
        </div>
     );
}

export default OrdersPage;