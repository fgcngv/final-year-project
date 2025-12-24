"use client"

import Link from "next/link";
import { BellDot } from "lucide-react";
import Header from "@/components/header";
import { useTheme } from "@/components/checkTheme";

const notifications = [
  {
    id: "1",
    title: "New Product Added",
    message: "Farmer1 added new coffee beans",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: "2",
    title: "Order Shipped",
    message: "Your order has been shipped",
    time: "1 hour ago",
    unread: false,
  },
];

export default function AllNotifications() {
    const { theme:language} = useTheme();
    
    
  return (
    <div className="max-w-3xl mx-auto px-4 py-18">
        <Header />

      {/* Notification Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
            {
                language === "ENGLISH" ? "Notifications" :
                language === "AMHARIC" ? "ማሳወቂያዎች " :
                language === "AFAN_OROMO" ? "Ergaawwan" : ""
            }
        </h1>
        <p className="text-sm text-gray-500">
          {
                language === "ENGLISH" ? "Stay updated with the latest activities" :
                language === "AMHARIC" ? "ከአዳዲስ እንቅስቃሴዎች ጋር ዘመናዊ ይሁኑ " :
                language === "AFAN_OROMO" ? "Hojiilee fi Odeeffannoowwan haaraa hordofaa" : ""
            }
        </p>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={`/notifications/${n.id}`}
            className={`flex items-start gap-4 p-4 rounded-xl border transition 
              ${n.unread ? "bg-blue-50 border-blue-200" : "bg-white"}
              hover:bg-gray-100`}
          >
            {/* Icon */}
            <div className="relative">
              <BellDot className="text-blue-600" />
              {n.unread && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
