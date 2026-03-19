import OrdersTable from "@/components/admin/OrdersTable";
import { AdminOrderByUserId } from "@/utils/services/order";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function OrderByUserIdOByOrderId(props: { params: Promise<{ id: string }> }) {
    const {userId} = await auth();
    if(!userId){
        redirect("/sign-in")
    }

const param = await props.params;
const user_id = param.id;

const userOrder = await AdminOrderByUserId(user_id);

const userOrderData = userOrder?.data;

if(userOrderData?.length === 0){
    return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold dark:bg-black dark:text-white ">No Order Found!</div>
}

if(!userOrderData){
    return <div>Order not found</div>
}

    return ( 
        <div>
            <div className=" p-2 flex items-center justify-center ">
                <h1 className="text-2xl font-bold text-black dark:text-white">{`${userOrderData[0].user.first_name} ${userOrderData[0].user.last_name}`} </h1>
            </div>
                 <OrdersTable
                    orders={userOrderData}
                    totalOrders={userOrder.totalOrders}
                    totalRevenue={userOrder.totalRevenue}
                    statusStats={userOrder.statusStats}
                  />
        </div>
     );
}

export default OrderByUserIdOByOrderId;