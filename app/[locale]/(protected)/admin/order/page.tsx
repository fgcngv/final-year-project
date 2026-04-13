

import OrdersTable from "@/components/admin/OrdersTable";
import { getAllOrders } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  // OPTIONAL: Check role from DB if ADMIN

  const result = await getAllOrders();
  console.log("all orders : ",result)

  if(!result || !result.data){
    return <div>No orders Exist</div>
  }

  if (!result.success) {
    return (
      <div className="p-6 text-red-600">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Orders Dashboard</h1>

      <OrdersTable
        orders={result.data}
        totalOrders={result.totalOrders}
        totalRevenue={result.totalRevenue}
        statusStats={result.statusStats}
      />
    </div>
  );
}
