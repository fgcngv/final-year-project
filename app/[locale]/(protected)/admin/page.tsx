import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ShoppingBag, Package, Receipt } from "lucide-react";
import { getAllProducts } from "@/app/[locale]/actions/products";
import {
  getAllFarmers,
  getAllOrders,
  getAllPayments,
  getAllUsers,
  getTotalRevenue,
} from "@/utils/services/admin";
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
  const products = ProductsData?.data || [];
  const totalProduct = ProductsData?.data?.length;
  // const { totalUsers } = await getAllUsers();

  const allUsers = await getAllUsers();
  const totalUsers = allUsers?.totalUsers;
  const { totalFarmers } = await getAllFarmers();
  const { totalOrders,data:ordersData } = await getAllOrders();

  const revenueResult = await getTotalRevenue();
const totalRevenue = revenueResult.totalRevenue || 0;

  // ORDERS CHART LOGIC
  const ordersChartData =
  ordersData?.reduce((acc: any[], order) => {
    const date = new Date(order.createdAt);

    const key = `${date.getFullYear()}-${date.getMonth()}`;

    const existing = acc.find((item) => item.key === key);

    if (existing) {
      existing.orders += 1;
    } else {
      acc.push({
        key,
        date: date.toLocaleString("default", { month: "short" }),
        orders: 1,
      });
    }

    return acc;
  }, []) || [];

  ordersChartData.sort((a, b) => (a.key > b.key ? 1 : -1));


  // ORDER STATUS CHART LOGIC
  const orderStatusMap: Record<string, number> = {};

ordersData?.forEach((order) => {
  const status = order.status;

  orderStatusMap[status] = (orderStatusMap[status] || 0) + 1;
});

const orderStatusChartData = Object.entries(orderStatusMap).map(
  ([name, value]) => ({
    name,
    value,
  })
);



// TOP PRODUCTS CHART LOGIC 
const topProductsData = products
  .map((product) => {
    const totalSold =
      product.orderItems?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0;

    return {
      name: product.product_name,
      sales: totalSold,
    };
  })
  .filter((p) => p.sales > 0) // only sold products
  .sort((a, b) => b.sales - a.sales) // descending
  .slice(0, 5); // top 5


  // TOP FARMERS CHART LOGIC 
  const FarmersData = await getAllFarmers();
  const farmers = FarmersData?.data || [];
  const topFarmersData = farmers
  .map((farmer) => {
    const totalRevenue =
      farmer.products?.reduce((farmerSum, product) => {
        const productRevenue =
          product.orderItems?.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          ) || 0;

        return farmerSum + productRevenue;
      }, 0) || 0;

    return {
      name: `${farmer.first_name} ${farmer.last_name}`, 
      revenue: totalRevenue,
    };
  })
  .filter((f) => f.revenue > 0)
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5);


  // USER ROLE CHART LOGIC
  const users = allUsers?.data || [];
  const roleMap: Record<string, number> = {};

  // Users first
  users.forEach((user) => {
    const role = user.role; // BUYER, ADMIN
    roleMap[role] = (roleMap[role] || 0) + 1;
  });
  
  // Adding farmers separately
  roleMap["FARMER"] = farmers.length || 0;
  
  const userRoleChartData = Object.entries(roleMap).map(([name, value]) => ({
    name,
    value,
  }));


  // MOST WISHED LIST PRODUCTS CHART LOGIC
  
// Count wishlists for each product
const wishlistData = products
.map((product) => ({
  name: product.product_name,
  count: product.wishlist?.length || 0,
}))
.filter((p) => p.count > 0)      // only products with at least 1 wishlist
.sort((a, b) => b.count - a.count) // descending
.slice(0, 5);  



// PAYMENT STATUS CHART LOGIC
const allPayments = await getAllPayments();
const payments = allPayments?.data || [];

// Count payments by status
const statusMap: Record<string, number> = {};

payments.forEach((p) => {
  const status = p.status; // "PAID", "UNPAID", "PARTIAL"
  statusMap[status] = (statusMap[status] || 0) + 1;
});

const paymentChartData = Object.entries(statusMap).map(([name, value]) => ({
  name,
  value,
}));


  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 transition-colors duration-500">
  
      {/* KPI Cards */}
      <Cards
        cardName="Total Users"
        icon={Users}
        link="/admin/users"
        total={totalUsers}
        className="bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] shadow-md transition-colors"
      />
  
      <Cards
        cardName="Total Seller"
        icon={ShoppingBag}
        link="/admin/farmers"
        total={totalFarmers}
        className="bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] shadow-md transition-colors"
      />
  
      <Cards
        cardName="Total Products"
        icon={Package}
        link="/admin/product"
        total={totalProduct}
        className="bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] shadow-md transition-colors"
      />
  
      <Cards
        cardName="Total Orders"
        icon={Receipt}
        link="/admin/order"
        total={totalOrders}
        className="bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] shadow-md transition-colors"
      />
  
      {/* Revenue Overview */}
      <Card className="col-span-1 sm:col-span-2 xl:col-span-4 rounded-2xl shadow-md p-6 bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] transition-colors mt-4">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl font-semibold">Revenue Overview</CardTitle>
          <BarChart3 className="h-8 w-8 text-gray-800 dark:text-[#f5f5dc]" />
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold mb-2">{totalRevenue} Birr</p>
          <p className="text-gray-500 dark:text-gray-400">Total revenue generated</p>
        </CardContent>
      </Card>
  
      {/* Charts */}
      <OrdersChart data={ordersChartData} />
      <OrderStatusChart data={orderStatusChartData} />
      <TopProductsChart data={topProductsData} />
      <FarmerPerformanceChart data={topFarmersData} />
      <WishlistChart data={wishlistData}  />
      <UserRoleChart data={userRoleChartData} />
      <PaymentStatusChart data={paymentChartData} />
  
    </div>
  );
}
