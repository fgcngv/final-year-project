// "use client"

// import Link from "next/link";
// import { BellDot } from "lucide-react";
// import Header from "@/components/header";
// import { useTheme } from "@/components/checkTheme";
// import { Notification } from "@prisma/client";

// interface NotificationProps {
//   notificationData: Notification[]
// }

// const notifications = [
//   {
//     id: "1",
//     title: "New Product Added",
//     message: "Farmer1 added new coffee beans",
//     time: "2 minutes ago",
//     unread: true,
//   },
//   {
//     id: "2",
//     title: "Order Shipped",
//     message: "Your order has been shipped",
//     time: "1 hour ago",
//     unread: false,
//   },
// ];

// export default function AllNotifications({notificationData}:NotificationProps) {
//     const { theme:language} = useTheme();
    
//     const calculateNotificationTime = (notifiedDate:string)=>{
//       const past = new Date(notifiedDate);
//       const now = new Date();
      
//       const diffMs = now.getTime() - past.getTime();

//       return diffMs;
//     }
    
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-18">
//         <Header />

//       {/* Notification Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">
//             {
//                 language === "ENGLISH" ? "Notifications" :
//                 language === "AMHARIC" ? "ማሳወቂያዎች " :
//                 language === "AFAN_OROMO" ? "Ergaawwan" : ""
//             }
//         </h1>
//         <p className="text-sm text-gray-500">
//           {
//                 language === "ENGLISH" ? "Stay updated with the latest activities" :
//                 language === "AMHARIC" ? "ከአዳዲስ እንቅስቃሴዎች ጋር ዘመናዊ ይሁኑ " :
//                 language === "AFAN_OROMO" ? "Hojiilee fi Odeeffannoowwan haaraa hordofaa" : ""
//             }
//         </p>
//       </div>

//       {/* Notification List */}
//       <div className="space-y-3">
//         {notificationData.map((n) => (
//           <Link
//             key={n.id}
//             href={`/notifications/${n.id}`}
//             className={`flex items-start gap-4 p-4 rounded-xl border transition 
//               ${n.read ? "bg-blue-50 border-blue-200" : "bg-white"}
//               hover:bg-gray-100`}
//           >
//             {/* Icon */}
//             <div className="relative">
//               <BellDot className="text-blue-600" />
//               {n.read && (
//                 <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
//               )}
//             </div>

//             {/* Content */}
//             <div className="flex-1">
//               <p className="font-semibold">{n.title}</p>
//               <p className="text-sm text-gray-600">{n.message}</p>
//               <p className="text-xs text-gray-400 mt-1">{n.createdAt as string}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }





"use client";

import Link from "next/link";
import { BellDot } from "lucide-react";
import Header from "@/components/header";
import { useTheme } from "@/components/checkTheme";
import { Notification } from "@prisma/client";
import { timeAgo } from "@/utils/notification_time";

interface NotificationProps {
  notificationData: Notification[];
}

// ✅ Time ago helper


export default function AllNotifications({ notificationData }: NotificationProps) {
  const { theme: language } = useTheme();

  return (
    <div className="max-w-3xl mx-auto px-4 py-18">
      <Header />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {language === "ENGLISH"
            ? "Notifications"
            : language === "AMHARIC"
            ? "ማሳወቂያዎች"
            : language === "AFAN_OROMO"
            ? "Ergaawwan"
            : ""}
        </h1>
        <p className="text-sm text-gray-500">
          {language === "ENGLISH"
            ? "Stay updated with the latest activities"
            : language === "AMHARIC"
            ? "ከአዳዲስ እንቅስቃሴዎች ጋር ዘመናዊ ይሁኑ"
            : language === "AFAN_OROMO"
            ? "Hojiilee fi Odeeffannoowwan haaraa hordofaa"
            : ""}
        </p>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notificationData.map((n) => {
          const isUnread = !n.read;

          return (
            <Link
              key={n.id}
              href={`/notifications/${n.id}`}
              className={`flex items-start gap-4 p-4 rounded-xl border transition
                ${isUnread ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}
                hover:bg-gray-100`}
            >
              {/* Icon */}
              <div className="relative">
                <BellDot className="text-blue-600" />
                {isUnread && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-600">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {timeAgo(n.createdAt)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
