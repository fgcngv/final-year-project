import BuyerPopup from "@/components/farmer/buyerPopup";
import BuyerModalShadcn from "@/components/farmer/buyerPopup";
import FarmerOrdersProducts from "@/components/farmer/farmerOrdersProduct";
import Header from "@/components/header";
import { getAllOrderItems, getUserById } from "@/utils/services/admin";
import { getAllProductByFarmerId } from "@/utils/services/product";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function OrdersPage() {
  const { userId } = await auth();


  if (!userId) {
    return <div>Not Authenticated! please <Link href={"../sign-in"}>Login</Link> to access this page!!</div>;
  }
  const buyer = await getUserById(userId)
console.log("buyer by id : ",buyer)


  const orderItems = await getAllOrderItems();
  const orderItemsData = orderItems?.data;

  console.log("orderItemsData : ", orderItemsData);

  const FarmerProduct = await getAllProductByFarmerId();

  // console.log("farmer products : ",FarmerProduct)
  return (
    <div>
      <Header />
      <div className=" ">
        <FarmerOrdersProducts products={FarmerProduct} />
        {/* <table>
          <thead>
            <th>Image</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price </th>
            <th>Status</th>
            <th>Order Date</th>
          </thead>
          <tbody>
            {orderItemsData?.map((items) => (
              <tr>
                <td>
                  <img
                    width={40}
                    height={40}
                    src={items?.product?.image}
                    alt={items.product.product_name}
                  />
                </td>
                <td>{items?.product?.product_name} </td>
                <td>{items?.quantity} </td>
                <td>{items?.product?.price * items?.quantity}</td>
                <td>
                  <td>{items?.order?.status} </td>
                </td>
                <td>
                  {items?.order?.createdAt
                    ? new Date(items.order.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className="overflow-x-auto">
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
                          : items?.order?.status === "SCHEDULED"
                          ? "bg-blue-100 text-blue-800"
                          : items?.order?.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-red-600"
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
                  <td>
                    <BuyerPopup />
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
