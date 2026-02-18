import DeleteDialog from "@/components/dialog/deleteDialog";
import BuyerPopup from "@/components/farmer/buyerPopup";
import FarmerOrdersProducts from "@/components/farmer/farmerOrdersProduct";
import Header from "@/components/header";
import ReviewForm from "@/components/review/ReviewForm";
import { Button } from "@/components/ui/button";
import { getAllOrderItems, getUserById } from "@/utils/services/admin";
import { updateOrderStatus } from "@/utils/services/order";
import { getAllProductByFarmerId } from "@/utils/services/product";
import { auth } from "@clerk/nextjs/server";
import { OrderStatus } from "@prisma/client";
// import { DialogTrigger } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import ReviewDialog from "@/components/review/reviewDialog";

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

  return (
    <div>
      {/* <Header /> */}
      <div className=" ">
        {/* MOBILE VIEW */}
        <div className="space-y-4 p-1 md:hidden mt-10  border-green-800 border-4 rounded-2xl mt-20">
          <h1 className="text-2xl p-2 text-green-700 font-bold text-center">
            {orderItems?.data?.length !== 0 ? "All Orders" : "No Order Found"}
          </h1>
          <h2 className="flex items-center text-2xl text-green-500 font-bold w-full">
            {orderItems?.data?.length} order
            {orderItems?.data?.length && orderItems?.data?.length > 1
              ? "s"
              : ""}
          </h2>
          {orderItemsData?.map((items) => (
            <div
              key={items.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <img
                  src={items.product.image}
                  className="h-14 w-14 rounded-lg object-cover"
                  alt=""
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {items.product.product_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {items.quantity} kg
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ${items.product.price * items.quantity}
                  </p>
                </div>
                <ReviewDialog items={items} />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    items.order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : items.order.status === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {items.order.status === "PAID"
                    ? "Payment Verified"
                    : items.order.status}
                </span>

                <div className="flex items-center justify-center">
                  <BuyerPopup user={items.order.user} />
                  <DeleteDialog deleteType="order_item" id={items.id} />
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {new Date(items.order.createdAt).toLocaleDateString()}
              </p>

              <div>
                {items?.order?.status === "PAID" ? (
                  <>
                    <form
                      action={async () => {
                        "use server";
                        await updateOrderStatus(items.order.id, "SHIPPED");
                      }}
                    >
                      <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white px-2 py-1 rounded text-xs">
                        Mark Shipped
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await updateOrderStatus(items.order.id, "DELIVERED");
                      }}
                    >
                      <button className="bg-green-600 hover:bg-green-700 active:bg-green-900 text-white px-2 py-1 rounded text-xs">
                        Mark Delivered
                      </button>
                    </form>
                  </>
                ) : items?.order?.status === "SHIPPED" ? (
                  <>
                    <form
                      action={async () => {
                        "use server";
                        await updateOrderStatus(items.order.id, "DELIVERED");
                      }}
                    >
                      <button className="bg-green-600 hover:bg-green-700 active:bg-green-900 text-white px-2 py-1 rounded text-xs">
                        Mark Delivered
                      </button>
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden overflow-x-auto md:block  border-green-800 border-4 rounded-2xl mt-20">
          <h1 className="text-2xl p-2 text-green-700 font-bold text-center">
            All Orders
          </h1>
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-emerald-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-emerald-900">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-emerald-900">
                  Product
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
                  Quantity
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
                  Price
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
                  Order Date
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-emerald-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderItemsData?.map((items) => (
                <tr
                  key={items?.id}
                  className="hover:bg-emerald-50 transition-colors"
                >
                  <td className="px-4 py-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={items?.product?.image}
                      alt={items?.product?.product_name}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {items?.product?.product_name}
                  </td>
                  <td className="px-4 py-2 text-center">{items?.quantity}</td>
                  <td className="px-4 py-2 text-center">
                    ${items?.product?.price * items?.quantity}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        items?.order?.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : items?.order?.status === "SHIPPED"
                          ? "bg-purple-100 text-purple-800"
                          : items?.order?.status === "PROCESSING"
                          ? "bg-blue-100 text-blue-800"
                          : items?.order?.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : items?.order?.status === "CANCELLED"
                          ? "bg-gray-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                        // fallback for CONFIRMED or unknown
                      }`}
                    >
                      {items?.order?.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-500">
                    {items?.order?.createdAt
                      ? new Date(items.order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {items?.order?.status === "PAID" && (
                      <>
                        <form
                          action={async () => {
                            "use server";
                            await updateOrderStatus(items.order.id, "SHIPPED");
                          }}
                        >
                          <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
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
                          <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                            Mark Delivered
                          </button>
                        </form>
                      </>
                    )}
                    <div className="flex items-center justify-center">
                      <BuyerPopup user={items.order.user} />
                      <DeleteDialog deleteType="order_item" id={items.id} />
                    </div>
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
