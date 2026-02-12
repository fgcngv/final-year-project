import FarmerProfile from "@/components/farmer/FarmerProfile";
import Header from "@/components/header";
import { getFarmerById } from "@/utils/services/admin";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllNotification } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function FarmerProfileById(props: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return <div>Not Authenticated!</div>;

  const param = await props.params;
  if (param.id !== userId)
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-red-700">
        This page is allowed only for farmers!{" "}
        <Link
          className="p-2 text-blue-600 underline hover:underline-offset-0"
          href={"/"}
        >
          Go back
        </Link>
      </div>
    );

  const farmerData = await getFarmerById(param.id);
  const unread = await getAllNotification();

  const cart = await getCartByUserIdForCartQuantity(userId);

  let cartQuantity = 0;
  cart?.items?.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return (
    <div>
      <Header cartQuantity={cartQuantity} notification={unread?.data?.length} />
      <FarmerProfile isOwnPage={true} farmer={farmerData.data} />
    </div>
  );
}

export default FarmerProfileById;
