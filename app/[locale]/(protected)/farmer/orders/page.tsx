import BuyerPopup from "@/components/farmer/buyerPopup";
import FarmerOrdersProducts from "@/components/farmer/farmerOrdersProduct";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { getAllOrderItems, getUserById } from "@/utils/services/admin";
import { updateOrderStatus } from "@/utils/services/order";
import { getAllProductByFarmerId } from "@/utils/services/product";
import { auth } from "@clerk/nextjs/server";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner";

async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div>
        Not Authenticated! please <Link href={"../sign-in"}>Login</Link> to
        access this page!!
      </div>
    );
  }
  // const buyer = await getUserById(userId);
  // console.log("buyer by id : ", buyer);

  const orderItems = await getAllOrderItems();
  const orderItemsData = orderItems?.data;

  const FarmerProduct = await getAllProductByFarmerId();

  // console.log("farmer products : ",FarmerProduct)
  // return (
  //   <div>
  //     {/* <Header /> */}
  //     <div className=" ">
  //       <FarmerOrdersProducts products={FarmerProduct} />

  //       {/* MOBILE VIEW */}
  //       <div className="space-y-4 p-1 md:hidden mt-10  border-green-800 border-4 rounded-2xl mt-20">
  //         <h1 className="text-2xl p-2 text-green-700 font-bold text-center">
  //           {orderItems?.data?.length !== 0 ? "All Orders" : "No Order Found"}
  //         </h1>
  //         <h2 className="flex items-center text-2xl text-green-500 font-bold w-full">{orderItems?.data?.length} order{orderItems?.data?.length && orderItems?.data?.length > 1 ?"s":""}</h2>
  //         {orderItemsData?.map((items) => (
  //           <div
  //             key={items.id}
  //             className="rounded-xl border bg-white p-4 shadow-sm"
  //           >
  //             <div className="flex gap-3">
  //               <img
  //                 src={items.product.image}
  //                 className="h-14 w-14 rounded-lg object-cover"
  //                 alt=""
  //               />

  //               <div className="flex-1">
  //                 <p className="font-semibold text-gray-800">
  //                   {items.product.product_name}
  //                 </p>
  //                 <p className="text-sm text-gray-500">
  //                   Qty: {items.quantity} kg
  //                 </p>
  //                 <p className="text-sm text-gray-500">
  //                   Price: ${items.product.price * items.quantity}
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="mt-3 flex items-center justify-between">
  //               <span
  //                 className={`rounded-full px-3 py-1 text-xs font-semibold ${
  //                   items.order.status === "PENDING"
  //                     ? "bg-yellow-100 text-yellow-800"
  //                     : items.order.status === "DELIVERED"
  //                     ? "bg-green-100 text-green-800"
  //                     : "bg-blue-100 text-blue-800"
  //                 }`}
  //               >
  //                 {items.order.status === "PAID"
  //                   ? "Payment Verified"
  //                   : items.order.status}
  //               </span>

  //               <BuyerPopup user={items.order.user} />
  //             </div>

  //             <p className="mt-2 text-xs text-gray-400">
  //               {new Date(items.order.createdAt).toLocaleDateString()}
  //             </p>

  //             <div>
  //               {items?.order?.status === "PAID" ? (
  //                 <>
  //                   <form
  //                     action={async () => {
  //                       "use server";
  //                       await updateOrderStatus(items.order.id, "SHIPPED");
  //                     }}
  //                   >
  //                     <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white px-2 py-1 rounded text-xs">
  //                       Mark Shipped
  //                     </button>
  //                   </form>

  //                   <form
  //                     action={async () => {
  //                       "use server";
  //                       await updateOrderStatus(items.order.id, "DELIVERED");
  //                     }}
  //                   >
  //                     <button className="bg-green-600 hover:bg-green-700 active:bg-green-900 text-white px-2 py-1 rounded text-xs">
  //                       Mark Delivered
  //                     </button>
  //                   </form>
  //                 </>
  //               ) : items?.order?.status === "SHIPPED" ? (
  //                 <>
  //                   <form
  //                     action={async () => {
  //                       "use server";
  //                       await updateOrderStatus(items.order.id, "DELIVERED");
  //                     }}
  //                   >
  //                     <button className="bg-green-600 hover:bg-green-700 active:bg-green-900 text-white px-2 py-1 rounded text-xs">
  //                       Mark Delivered
  //                     </button>
  //                   </form>
  //                 </>
  //               ) : null}
  //             </div>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Desktop View */}
  //       <div className="hidden overflow-x-auto md:block  border-green-800 border-4 rounded-2xl mt-20">
  //         <h1 className="text-2xl p-2 text-green-700 font-bold text-center">
  //           All Orders
  //         </h1>
  //         <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
  //           <thead className="bg-emerald-100">
  //             <tr>
  //               <th className="px-4 py-2 text-left text-sm font-medium text-emerald-900">
  //                 Image
  //               </th>
  //               <th className="px-4 py-2 text-left text-sm font-medium text-emerald-900">
  //                 Product
  //               </th>
  //               <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
  //                 Quantity
  //               </th>
  //               <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
  //                 Price
  //               </th>
  //               <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
  //                 Status
  //               </th>
  //               <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
  //                 Order Date
  //               </th>
  //               <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
  //                 Actions
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody className="bg-white divide-y divide-gray-200">
  //             {orderItemsData?.map((items) => (
  //               <tr
  //                 key={items?.id}
  //                 className="hover:bg-emerald-50 transition-colors"
  //               >
  //                 <td className="px-4 py-2">
  //                   <img
  //                     className="w-10 h-10 rounded-full object-cover"
  //                     src={items?.product?.image}
  //                     alt={items?.product?.product_name}
  //                   />
  //                 </td>
  //                 <td className="px-4 py-2 font-medium text-gray-800">
  //                   {items?.product?.product_name}
  //                 </td>
  //                 <td className="px-4 py-2 text-center">{items?.quantity}</td>
  //                 <td className="px-4 py-2 text-center">
  //                   ${items?.product?.price * items?.quantity}
  //                 </td>
  //                 <td className="px-4 py-2 text-center">
  //                   <span
  //                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
  //                       items?.order?.status === "PENDING"
  //                         ? "bg-yellow-100 text-yellow-800"
  //                         : items?.order?.status === "SHIPPED"
  //                         ? "bg-purple-100 text-purple-800"
  //                         : items?.order?.status === "PROCESSING"
  //                         ? "bg-blue-100 text-blue-800"
  //                         : items?.order?.status === "DELIVERED"
  //                         ? "bg-green-100 text-green-800"
  //                         : items?.order?.status === "CANCELLED"
  //                         ? "bg-gray-100 text-red-600"
  //                         : "bg-gray-100 text-gray-600"
  //                       // fallback for CONFIRMED or unknown
  //                     }`}
  //                   >
  //                     {items?.order?.status}
  //                   </span>
  //                 </td>
  //                 <td className="px-4 py-2 text-center text-sm text-gray-500">
  //                   {items?.order?.createdAt
  //                     ? new Date(items.order.createdAt).toLocaleDateString()
  //                     : "-"}
  //                 </td>
  //                 <td className="px-4 py-2 text-center space-x-2">
  //                   {items?.order?.status === "PAID" && (
  //                     <>
  //                       <form
  //                         action={async () => {
  //                           "use server";
  //                           await updateOrderStatus(items.order.id, "SHIPPED");
  //                         }}
  //                       >
  //                         <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
  //                           Mark Shipped
  //                         </button>
  //                       </form>

  //                       <form
  //                         action={async () => {
  //                           "use server";
  //                           await updateOrderStatus(
  //                             items.order.id,
  //                             "DELIVERED"
  //                           );
  //                         }}
  //                       >
  //                         <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
  //                           Mark Delivered
  //                         </button>
  //                       </form>
  //                     </>
  //                   )}
  //                   <BuyerPopup user={items.order.user} />
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );


  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div>
        <FarmerOrdersProducts products={FarmerProduct} />
  
        {/* ================= MOBILE VIEW ================= */}
        <div className="space-y-4 p-4 md:hidden mt-20 border border-emerald-600/40 dark:border-emerald-500/30 rounded-2xl bg-card shadow-sm">
          
          <h1 className="text-2xl p-2 text-emerald-700 dark:text-emerald-400 font-bold text-center">
            {orderItems?.data?.length !== 0 ? "All Orders" : "No Order Found"}
          </h1>
  
          <h2 className="flex items-center text-xl text-emerald-600 dark:text-emerald-400 font-semibold w-full">
            {orderItems?.data?.length} order
            {orderItems?.data?.length && orderItems?.data?.length > 1 ? "s" : ""}
          </h2>
  
          {orderItemsData?.map((items) => (
            <div
              key={items.id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm transition-colors"
            >
              <div className="flex gap-3">
                <img
                  src={items.product.image}
                  className="h-14 w-14 rounded-lg object-cover"
                  alt=""
                />
  
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {items.product.product_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {items.quantity} kg
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: ${items.product.price * items.quantity}
                  </p>
                </div>
              </div>
  
              {/* Status + Buyer */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    items.order.status === "PENDING"
                      ? "bg-amber-200 text-amber-900 dark:bg-amber-500/20 dark:text-amber-400"
                      : items.order.status === "SHIPPED"
                      ? "bg-purple-200 text-purple-900 dark:bg-purple-500/20 dark:text-purple-400"
                      : items.order.status === "DELIVERED"
                      ? "bg-emerald-200 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-400"
                      : items.order.status === "PAID"
                      ? "bg-blue-200 text-blue-900 dark:bg-blue-500/20 dark:text-blue-400"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {items.order.status === "PAID"
                    ? "Payment Verified"
                    : items.order.status}
                </span>
  
                <BuyerPopup user={items.order.user} />
              </div>
  
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(items.order.createdAt).toLocaleDateString()}
              </p>
  
              {/* Actions */}
              <div className="mt-3 flex gap-2 flex-wrap">
                {items?.order?.status === "PAID" && (
                  <>
                    <form
                      action={async () => {
                        "use server";
                        await updateOrderStatus(items.order.id, "SHIPPED");
                      }}
                    >
                      <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition">
                        Mark Shipped
                      </button>
                    </form>
  
                    <form
                      action={async () => {
                        "use server";
                        await updateOrderStatus(items.order.id, "DELIVERED");
                      }}
                    >
                      <button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs transition">
                        Mark Delivered
                      </button>
                    </form>
                  </>
                )}
  
                {items?.order?.status === "SHIPPED" && (
                  <form
                    action={async () => {
                      "use server";
                      await updateOrderStatus(items.order.id, "DELIVERED");
                    }}
                  >
                    <button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs transition">
                      Mark Delivered
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
  
        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden overflow-x-auto md:block border border-emerald-600/40 dark:border-emerald-500/30 rounded-2xl mt-20 bg-card shadow-sm">
          
          <h1 className="text-2xl p-4 text-emerald-700 dark:text-emerald-400 font-bold text-center">
            All Orders
          </h1>
  
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-emerald-100 dark:bg-emerald-900/40">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Product
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Quantity
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Price
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Order Date
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody className="bg-card divide-y divide-border">
              {orderItemsData?.map((items) => (
                <tr
                  key={items?.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={items?.product?.image}
                      alt={items?.product?.product_name}
                    />
                  </td>
  
                  <td className="px-4 py-3 font-medium text-foreground">
                    {items?.product?.product_name}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    {items?.quantity}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    ${items?.product?.price * items?.quantity}
                  </td>
  
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        items?.order?.status === "PENDING"
                          ? "bg-amber-200 text-amber-900 dark:bg-amber-500/20 dark:text-amber-400"
                          : items?.order?.status === "SHIPPED"
                          ? "bg-purple-200 text-purple-900 dark:bg-purple-500/20 dark:text-purple-400"
                          : items?.order?.status === "PROCESSING"
                          ? "bg-blue-200 text-blue-900 dark:bg-blue-500/20 dark:text-blue-400"
                          : items?.order?.status === "DELIVERED"
                          ? "bg-emerald-200 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : items?.order?.status === "CANCELLED"
                          ? "bg-red-200 text-red-900 dark:bg-red-500/20 dark:text-red-400"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {items?.order?.status}
                    </span>
                  </td>
  
                  <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                    {items?.order?.createdAt
                      ? new Date(items.order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
  
                  <td className="px-4 py-3 text-center space-x-2">
                    {items?.order?.status === "PAID" && (
                      <>
                        <form
                          action={async () => {
                            "use server";
                            await updateOrderStatus(
                              items.order.id,
                              "SHIPPED"
                            );
                          }}
                        >
                          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition">
                            Mark Shipped
                          </button>
                        </form>
  
                        <form
                          action={async () => {
                            "use server";
                            await updateOrderStatus(
                              items.order.id,
                              "DELIVERED"
                            );
                          }}
                        >
                          <button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs transition">
                            Mark Delivered
                          </button>
                        </form>
                      </>
                    )}
  
                    <BuyerPopup user={items.order.user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
