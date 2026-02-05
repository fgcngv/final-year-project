import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import Header from "@/components/header";
import { countUnReadNotifications, getAllUnreadNotifications, getNotificationById, markNotificationAsRead } from "@/utils/services/notification";
import { timeAgo } from "@/utils/notification_time";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NotificationDetailPage(props: { params: Promise<{ id: string }> }) {

    const {userId} = await auth();

    const param = await props?.params;
    const id = param.id;
    const res = await getNotificationById(id);
    console.log("res : ",res)
    if(!res?.success){
        return null
    }
    const data = res?.data;

    // mark this message as read
    await markNotificationAsRead(id);

    const unread = await getAllUnreadNotifications();
   
    if(!userId){
            redirect("/sign-in");
    }
    
      const cart = await getCartByUserIdForCartQuantity(userId);
    
      let cartQuantity = 0;
      cart?.items?.forEach(item => {
        cartQuantity += item.quantity;
      });


  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <Header cartQuantity={cartQuantity} notification={unread?.data?.length} />
      {/* Back Button */}
      <Link
        href="/notifications"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={16} />
        Back to notifications
      </Link>

      {/* Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Bell className="text-blue-600" />
          </div>
          <h1 className="text-xl font-bold">{data?.title}</h1>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {data?.message} Check them
          out before they sell out!
          <Link
            href={``}
            className="font-bold text-blue-700 ml-2 hover:underline"
          >
            Check!
          </Link>
        </p>

        <div className="mt-6 text-sm text-gray-500">
           { data && timeAgo(data?.createdAt)}
        </div>
      </div>
    </div>
  );
}