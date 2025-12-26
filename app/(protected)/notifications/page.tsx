

import AllNotifications from "@/components/notifications/allNotifications";
import { getAllNotification } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

async function NotificationsPage() {
    const {userId} = await auth();
    console.log("id : ",userId)
    if(!userId){
        return <h1 className="text-2xl font-bold text-red-700 text-center w-full">UnAuthorized!</h1>
    }

    const res = await getAllNotification();
    
    if (!res.success) {
        toast.error(res.message);
        return <div>{res.message}</div>
      }

      const data = res?.data;
      console.log("data : ",data)

      if(!data){
        return <div className="text-2xl font-bold text-gray-500 text-center w-full p-4">No notification found!</div>
      }
    return ( 
        <div>
            <AllNotifications notificationData={data} />
        </div>
     );
}

export default NotificationsPage;