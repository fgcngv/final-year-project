

// "use client";

// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import { X,Bell} from "lucide-react";
// import { useState } from "react";
// import { Notification } from "@prisma/client";

// interface NotificationProp {
//   data: Notification;
//   leftNotifications?:number
// }

// function PopupNotification({ data,leftNotifications }: NotificationProp) {
//   const [showNotification, setShowNotification] = useState(true);

//   if (!showNotification) return null;

//   // Truncate message if longer than 20 characters
//   const truncateMessage = (message: string, maxLength: number = 20) => {
//     if (!message) return "";
//     return message.length > maxLength
//       ? message.slice(0, maxLength) + "…"
//       : message;
//   };

//   if(!data){
//     return null
//   }

//   return (
//     <Card className="top-20 sm:left-7 fixed z-50 border border-gray-500 bg-transparent p-2 rounded-2xl">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-center font-bold text-gray-800">
//             Notifications
//           </CardTitle>
//           <Button
//             onClick={() => setShowNotification(false)}
//             className="cursor-pointer"
//           >
//             <X />
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div>
//           <Link
//             href={`/notifications/${data.id}`} // use actual notification id
//             className="flex gap-1.5 border p-1 rounded border-gray-400 hover:bg-gray-400 justify-center items-center bg-gray-300 active:bg-gray-500"
//           >
//             {/* <img
//               src="/green_coffee.png"
//               alt="farmer1"
//               width={50}
//               height={50}
//               className="rounded-full"
//             /> */}
//             <Bell className="text-green-600" size={30}/>
//             <div>
//               <span className="font-bold text-sm">{data?.title}</span>
//               <div className="text-sm">
//                 {truncateMessage(data?.message || "")}
//               </div>
//             </div>
            
//           </Link>
//             {
//               leftNotifications ? <Link href={`/notifications`} className="bg-gray-500 text-sm rounded-2xl px-2 p-1 text-center active:bg-gray-300">and {leftNotifications}  other{leftNotifications >1 ? 's' :null}</Link>:null
//             }
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
import { X, Bell } from "lucide-react";
import { useState } from "react";
import { Notification } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProp {
  data: Notification;
  leftNotifications?: number;
}

function PopupNotification({ data, leftNotifications }: NotificationProp) {
  const [showNotification, setShowNotification] = useState(true);

  if (!data) return null;

  const truncateMessage = (message: string, maxLength: number = 20) =>
    message.length > maxLength ? message.slice(0, maxLength) + "…" : message;

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="top-20 sm:left-7 fixed z-50 w-80"
        >
          <Card className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-center font-bold text-gray-900 dark:text-white">
                  Notifications
                </CardTitle>
                <Button
                  onClick={() => setShowNotification(false)}
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <Link
                href={`/notifications/${data.id}`}
                className="flex gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 items-center transition-colors"
              >
                <Bell className="text-green-600 dark:text-green-400" size={24} />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {data.title}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {truncateMessage(data.message || "")}
                  </span>
                </div>
              </Link>

              {leftNotifications && (
                <Link
                  href="/notifications"
                  className="inline-block mt-1 bg-gray-300 dark:bg-gray-600 text-sm rounded-2xl px-2 py-1 text-center text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  and {leftNotifications} other{leftNotifications > 1 ? "s" : ""}
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PopupNotification;