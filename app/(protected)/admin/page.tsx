
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ShoppingBag, Package, Receipt } from "lucide-react";
import { getAllProducts } from "@/app/actions/products";
import { getAllFarmers, getAllOrders, getAllUsers } from "@/utils/services/admin";
import Cards from "@/components/cards/card";
import { UserRoleChart } from "@/components/charts/userRoleChart";
import { OrdersChart } from "@/components/charts/ordersChart";
import { OrderStatusChart } from "@/components/charts/OrderStatusChart";
import { PaymentStatusChart } from "@/components/charts/PaymentStatusChart";
import { TopProductsChart } from "@/components/charts/TopProductsChart";
import { FarmerPerformanceChart } from "@/components/charts/FarmerPerformanceChart";
import { WishlistChart } from "@/components/charts/wishListChart";

export default async function AdminDashboard() {
  // stats = { users, sellers, products, orders, revenue }
  const ProductsData = await getAllProducts();
  const totalProduct = ProductsData?.data?.length;
  const { totalUsers } = await getAllUsers();
  const {totalFarmers } = await getAllFarmers();
  const {totalOrders} = await getAllOrders();

  const FarmersData = await getAllFarmers();
  console.log("FarmersData : ",FarmersData.data)


  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <Cards cardName="Total Users" icon={Users} link="/admin/users" total={totalUsers}  />

      <Cards cardName="Total Seller" icon={ShoppingBag} link="/admin/sellers" total={totalFarmers}  />

      <Cards cardName="Total Products" icon={Package} link="/admin/products" total={totalProduct}  />

      <Cards cardName="Total Orders" icon={Receipt} link="/admin/orders" total={totalOrders}  />
{/* 
      <Cards cardName="Revenue Overview" icon={BarChart3} link="/admin/sellers" total={0}  /> */}

      <Card className="col-span-1 sm:col-span-2 xl:col-span-4 rounded-2xl shadow-md p-6 mt-4">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl font-semibold">Revenue Overview</CardTitle>
          <BarChart3 className="h-8 w-8" />
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold mb-2">$2344</p>
          <p className="text-muted-foreground">Total revenue generated</p>
        </CardContent>
      </Card>
       <OrdersChart />
       <OrderStatusChart />
       <PaymentStatusChart />
       <TopProductsChart />
       <FarmerPerformanceChart />
       <WishlistChart />
       <UserRoleChart />
    </div>
  );
}