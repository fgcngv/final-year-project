"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  MapPin,
  Globe,
  Calendar,
  Coffee,
  Edit,
  Edit2,
  Eye,
  EyeOff,
  AlertTriangle,
  Ban,
  Pause,
} from "lucide-react";
import LoaderBtn from "../loaderBtn";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import EditProfileForm from "./editProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// 🔹 Define props type (adjust if you create proper TypeScript types)
type FarmerProfileProps = {
  user: any;
  isOwnPage?: boolean;
  status?: string;
};

export default function Profile({
  user,
  isOwnPage = true,
  status,
}: FarmerProfileProps) {
  const userInfo = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Farmer not found.</p>
      </div>
    );
  }

  const [displayCoffee, setDisplayCoffee] = useState(false);
  const router = useRouter();
  return (
    <div className="mt-12 min-h-screen bg-background text-foreground px-4 md:px-10 py-8 transition-colors">
      {/* ================= HEADER SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card
          className={cn(
            "relative md:col-span-2 rounded-2xl shadow-lg border bg-card overflow-hidden transition",
            user.status === "INACTIVE" && "border-red-500",
            user.status === "DORMANT" && "border-yellow-500",
            user.status === "PAUSED" && "border-blue-500"
          )}
        >
          {/* STATUS BANNER */}
          {(user.status === "INACTIVE" ||
            user.status === "DORMANT" ||
            user.status === "PAUSED") && (
            <div
              className={cn(
                "absolute top-0 left-0 w-full px-4 py-3 flex items-center gap-2 text-white z-10 backdrop-blur-md",
                user.status === "INACTIVE" && "bg-red-600/90",
                user.status === "DORMANT" && "bg-yellow-500/90",
                user.status === "PAUSED" && "bg-blue-600/90"
              )}
            >
              <AlertTriangle size={18} />
              <span className="font-semibold text-sm md:text-base">
                {user.status === "INACTIVE" &&
                  "Account is inactive — actions are disabled"}
                {user.status === "DORMANT" &&
                  "Warning: Account under review. Please contact admin"}
                {user.status === "PAUSED" &&
                  "Account is paused — temporarily unavailable"}
              </span>
            </div>
          )}

          <CardContent className="p-6 flex flex-col md:flex-row gap-6 pt-16 md:pt-10">
            {/*  IMAGE + STATUS DOT */}
            <div className="relative">
              <img
                src={
                  isOwnPage || userInfo.user?.id === user.id
                    ? userInfo.user?.imageUrl
                    : user.image
                }
                alt={user.first_name}
                className="w-40 h-40 object-cover rounded-2xl border shadow-sm"
              />
              {/* STATUS DOT */}
              <span
                className={cn(
                  "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white",
                  user.status === "INACTIVE" && "bg-red-500",
                  user.status === "DORMANT" && "bg-yellow-400",
                  user.status === "PAUSED" && "bg-blue-500",
                  user.status === "ACTIVE" && "bg-green-500"
                )}
              />
            </div>

            {/*  CONTENT */}
            <div className="flex-1 space-y-3">
              {/* NAME + BADGE */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {user.first_name} {user.last_name}
                </h1>

                <Badge
                  className={cn(
                    "font-semibold px-3 py-1 rounded-full",
                    user.status === "INACTIVE" && "bg-red-600 text-white",
                    user.status === "DORMANT" && "bg-yellow-500 text-black",
                    user.status === "PAUSED" && "bg-blue-600 text-white",
                    user.status === "ACTIVE" && "bg-green-600 text-white"
                  )}
                >
                  {user.status}
                </Badge>
              </div>

              {/*  NAME */}
              {user.farmName && (
                <p className="text-lg text-muted-foreground font-medium">
                  {user.farmName}
                </p>
              )}

              {/* META INFO */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {user.address && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} /> {user.address}
                  </div>
                )}
                {user.language && (
                  <div className="flex items-center gap-1">
                    <Globe size={16} /> {user.language}
                  </div>
                )}
                {user.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    Member since{" "}
                    {`${new Date(user.created_at).getDay()}-${new Date(
                      user.created_at
                    ).getMonth()}-${new Date(user.created_at).getFullYear()}`}
                  </div>
                )}
              </div>

              {/* EMAIL */}
              <Link
                className="text-emerald-600 font-semibold hover:underline"
                href={`mailto:${user.email}`}
              >
                {user.email}
              </Link>

              {/*  STATUS INFO CARDS */}
              {user.status === "INACTIVE" && (
                <div className="p-4 rounded-xl flex gap-1 items-center  bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-700 dark:text-red-300 text-sm">
                  <Ban /> This account is inactive. Messaging and transactions
                  are disabled.
                </div>
              )}

              {user.status === "DORMANT" && (
                <div className="p-4 rounded-xl flex gap-1 items-center  bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 text-yellow-800 text-sm">
                  <AlertTriangle className="font-bold" /> This account is under
                  warning. Activity may be restricted.
                </div>
              )}

              {user.status === "PAUSED" && (
                <div className="p-4 rounded-xl flex gap-1 items-center  bg-blue-50 dark:bg-blue-900/30 border border-blue-200 text-blue-700 dark:text-blue-300 text-sm">
                  <Pause /> This account is temporarily paused. The Acount may
                  return soon.
                </div>
              )}

              {/* BIO */}
              {user.bio && (
                <p className="text-muted-foreground pt-2 leading-relaxed">
                  {user.bio}
                </p>
              )}

              {/* ACTIONS */}
              {userInfo.user?.id === user.id ? (
                <div>
                  <h1 className="bg-green-600 text-xl font-bold text-center rounded-2xl text-white p-2">
                    This is your own profile
                  </h1>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 rounded-xl flex gap-2 bg-emerald-700 hover:bg-emerald-600">
                        <Edit2 size={18} />
                        Edit Profile
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>

                      <EditProfileForm userData={user} />
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Button
                  disabled={
                    user.status === "INACTIVE" || user.status === "PAUSED"
                  }
                  className={cn(
                    "mt-4 rounded-xl flex gap-2 transition",
                    user.status === "INACTIVE" || user.status === "PAUSED"
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-emerald-700 hover:bg-emerald-600"
                  )}
                  onClick={() => router.push(`/chatMatche/${user.id}`)}
                >
                  <MessageCircle size={18} />
                  {user.status === "INACTIVE" && "Unavailable"}
                  {user.status === "PAUSED" && "Temporarily Unavailable"}
                  {user.status !== "INACTIVE" &&
                    user.status !== "PAUSED" &&
                    "Message Farmer"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
