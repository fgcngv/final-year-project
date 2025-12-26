// "use client";

// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import { X } from "lucide-react";
// import { useState } from "react";
// import { Notification } from "@prisma/client";

// interface NotificationProp {
//   data: Notification
// }

// function PopupNotification({data}:NotificationProp) {
//   const [showNotification, setShowNotification] = useState(true);

//   if (!showNotification) {
//     return null;
//   }

//   return (
//     <Card className=" top-20 sm:left-7 fixed z-100 border border-gray-500  bg-transparent p-2 rounded-2xl">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-center font-bold text-gray-800">
//             Notifications{" "}
//           </CardTitle>
//           <Button
//             onClick={() => setShowNotification(!showNotification)}
//             className="cursor-pointer"
//           >
//             {" "}
//             <X />{" "}
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div>
//           <Link
//             href={`/notifications/1`}
//             className="flex gap-1.5 border p-1 rounded border-gray-400 hover:bg-gray-400 bg-gray-300"
//           >
//             <img
//               src="/green_coffee.png"
//               alt="farmer1"
//               width={50}
//               height={50}
//               className="rounded-full"
//             />
//             <div>
//               <span className="font-bold text-sm">{data?.title}</span>
//               <div>{data?.message}</div>
//             </div>
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default PopupNotification;







"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Notification } from "@prisma/client";

interface NotificationProp {
  data: Notification;
  leftNotifications?:number
}

function PopupNotification({ data,leftNotifications }: NotificationProp) {
  const [showNotification, setShowNotification] = useState(true);

  if (!showNotification) return null;

  // Truncate message if longer than 20 characters
  const truncateMessage = (message: string, maxLength: number = 20) => {
    if (!message) return "";
    return message.length > maxLength
      ? message.slice(0, maxLength) + "…"
      : message;
  };

  if(!data){
    return null
  }

  return (
    <Card className="top-20 sm:left-7 fixed z-50 border border-gray-500 bg-transparent p-2 rounded-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-center font-bold text-gray-800">
            Notifications
          </CardTitle>
          <Button
            onClick={() => setShowNotification(false)}
            className="cursor-pointer"
          >
            <X />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <Link
            href={`/notifications/${data.id}`} // use actual notification id
            className="flex gap-1.5 border p-1 rounded border-gray-400 hover:bg-gray-400 bg-gray-300 active:bg-gray-500"
          >
            <img
              src="/green_coffee.png"
              alt="farmer1"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <span className="font-bold text-sm">{data?.title}</span>
              <div className="text-sm">
                {truncateMessage(data?.message || "")}
              </div>
            </div>
            
          </Link>
            {
              leftNotifications ? <Link href={`/notifications`} className="bg-gray-500 text-sm rounded-2xl px-2 p-1 text-center active:bg-gray-300">and {leftNotifications} others</Link>:null
            }
        </div>
      </CardContent>
    </Card>
  );
}

export default PopupNotification;
