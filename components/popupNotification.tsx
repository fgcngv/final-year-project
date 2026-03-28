



"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X, Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Notification } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface NotificationProp {
  data: Notification;
  leftNotifications?: number;
}

function PopupNotification({ data, leftNotifications }: NotificationProp) {
  const [showNotification, setShowNotification] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_CLOSE_TIME = 5000;

  useEffect(() => {
    if (!showNotification) return;

    if (!isHovered) {
      timerRef.current = setTimeout(() => {
        setShowNotification(false);
      }, AUTO_CLOSE_TIME);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showNotification, isHovered]);

  if (!data) return null;

  const truncateMessage = (message: string, maxLength: number = 40) =>
    message.length > maxLength ? message.slice(0, maxLength) + "…" : message;

  const tn = useTranslations("notification")

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) setShowNotification(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="top-20 sm:left-7 fixed z-50 w-80"
        >
          <Card className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl relative overflow-hidden">
            
            {/* Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: AUTO_CLOSE_TIME / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-green-500"
            />

            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-bold text-gray-900 dark:text-white text-lg ">
                  {tn("topic")}
                </CardTitle>
                <Button
                  onClick={() => setShowNotification(false)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-200 bg-gray-400 cursor-pointer dark:hover:bg-gray-700"
                >
                  <X size={18} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <Link
                href={`/notifications/${data.id}`}
                className="flex gap-3 border border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-[0.98] items-center transition"
              >
                <Bell className="text-green-600 dark:text-green-400" size={24} />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {data.title}
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {truncateMessage(data.message || "")}
                  </span>
                </div>
              </Link>

              {leftNotifications && (
                <Link
                  href="/notifications"
                  className="flex justify-center max-w-40 mt-1 bg-gray-300 dark:bg-gray-600 text-xs rounded-xl px-3 py-1 text-center text-gray-800 dark:text-gray-200 hover:bg-gray-400 items-center dark:hover:bg-gray-500 transition"
                >
                  <span className="text-2xl text-green-500 font-bold">+</span> 
                  <span>{leftNotifications} {tn("moremsg")}
                  {leftNotifications > 1 ? "s" : ""}</span>
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