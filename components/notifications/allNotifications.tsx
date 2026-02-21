
"use client";

import Link from "next/link";
import { BellDot, Trash2 } from "lucide-react";
import Header from "@/components/header";
import { useTheme } from "@/components/checkTheme";
import { Notification } from "@prisma/client";
import { timeAgo } from "@/utils/notification_time";
import { toast } from "sonner";
import { useState } from "react";
import { deleteNotification } from "@/utils/services/notification"; // import your helper

interface NotificationProps {
  notificationData: Notification[];
}

export default function AllNotifications({ notificationData }: NotificationProps) {
  const {  language } = useTheme();
  const [notifications, setNotifications] = useState(notificationData);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "ENGLISH"
        ? "Are you sure you want to delete this notification?"
        : language === "AMHARIC"
        ? "እባክዎ ይህን ማሳወቂያ ማጥፋት ትፈልጋለህ?"
        : "Ergaawwan kana haquu barbaaddaa?"
    );

    if (!confirmDelete) return;

    try {
      const result = await deleteNotification(id);

      if ( result === null ) {
        throw new Error("Not Authenticated!");
      }

      if ( !result.success) {
        throw new Error(result.message);
      }

      // Remove locally
      setNotifications((prev) => prev.filter((n) => n.id !== id));

      toast.success(
        language === "ENGLISH"
          ? "Notification deleted"
          : language === "AMHARIC"
          ? "ማሳወቂያ ተሰርዟል"
          : "Ergaawwan haqame"
      );
    } catch (error: any) {
      console.error(error);
      toast.error(
        language === "ENGLISH"
          ? error.message || "Failed to delete notification"
          : language === "AMHARIC"
          ? error.message || "ማሳወቂያን ማጥፋት አልተሳካም"
          : error.message || "Ergaawwan haqachuu hin dandeenye"
      );
    }
  };

  return (
<div className="max-w-3xl mx-auto px-4 py-18">
  {/* Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      {language === "ENGLISH"
        ? "Notifications"
        : language === "AMHARIC"
        ? "ማሳወቂያዎች"
        : "Ergaawwan"}
    </h1>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {language === "ENGLISH"
        ? "Stay updated with the latest activities"
        : language === "AMHARIC"
        ? "ከአዳዲስ እንቅስቃሴዎች ጋር ዘመናዊ ይሁኑ"
        : "Hojiilee fi Odeeffannoowwan haaraa hordofaa"}
    </p>
  </div>

  {/* Notification List */}
  <div className="space-y-3">
    {notifications.map((n) => {
      const isUnread = !n.read;

      return (
        <div
          key={n.id}
          className={`
            flex items-start justify-between gap-4 p-4 rounded-xl border transition
            ${isUnread 
              ? "bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700" 
              : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            }
            hover:bg-gray-100 dark:hover:bg-gray-700
          `}
        >
          <Link
            href={`/notifications/${n.id}`}
            className="flex-1 flex items-start gap-4"
          >
            {/* Icon */}
            <div className="relative">
              <BellDot className="text-blue-600 dark:text-blue-400" />
              {isUnread && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">{n.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{n.message}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {timeAgo(n.createdAt)}
              </p>
            </div>
          </Link>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(n.id)}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
          >
            <Trash2 className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      );
    })}
  </div>
</div>
  );
}
