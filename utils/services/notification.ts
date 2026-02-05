"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";




export const getAllNotification = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: true,
        message: "Unauthorized",
      };
    }

    const notifications = await prisma.notification.findMany({
      where: {
        user_id: userId, // 🔒 Secure gate
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      error: false,
      data: notifications, // [] is OK
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);

    return {
      success: false,
      error: true,
      message: "Something went wrong while fetching notifications",
    };
  }
};


export const getAllUnreadNotifications = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: true,
        message: "Unauthorized",
      };
    }

    const notifications = await prisma.notification.findMany({
      where: {
        user_id: userId, 
        read: false
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      error: false,
      data: notifications, // [] is OK
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);

    return {
      success: false,
      error: true,
      message: "Something went wrong while fetching notifications",
    };
  }
};




export const getNotificationById = async (id: string) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: true,
        message: "Unauthorized",
      };
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        user_id: userId, // only fetch user's own notifications
      },
    });

    if (!notification) {
      return {
        success: false,
        error: true,
        message: "Notification not found",
      };
    }

    return {
      success: true,
      error: false,
      data: notification,
    };
  } catch (error) {
    console.error("Error fetching notification:", error);

    return {
      success: false,
      error: true,
      message: "Something went wrong while fetching notification",
    };
  }
};




export const countUnReadNotifications = async()=>{
    try{
        const { userId } = await auth();

        if(!userId){
            return "Not Authenticated!!"
        }

        const count = prisma.notification.count({
            where: {
              user_id: userId,
              read: false,
            },
          });

          if (!count) {
            return {
              error: true,
              success: false,
              message: "Failed to count notifications!",
            };
          }
      
          return {
            error: false,
            success: true,
            data: count,
          };
          

    }catch(error){
        console.log("error : ",error);
        return {
            error: true,
            success: false,
            message: "Failed to count notifications!",
          };
    }
}



export const markNotificationAsRead = async (notificationId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: true,
      message: "Unauthorized",
    };
  }

  await prisma.notification.updateMany({
    where: {
      id: notificationId,
      user_id: userId, // 🔒 critical gate
    },
    data: {
      read: true,
    },
  });

  return {
    success: true,
    error: false,
  };
};


export const deleteNotification = async (id: string) => {
  const {userId} = await auth();

  if(!userId) return null;

  try {
    const deletedNotification = await prisma.notification.delete({
      where: { id },
    });

    return {
      success: true,
      error: false,
      message: "Notification deleted successfully!",
      notification: deletedNotification, // optional, useful for frontend updates
    };
  } catch (error: any) {
    console.error("Failed to delete notification:", error);

    return {
      success: false,
      error: true,
      message: error.message || "Failed to delete notification!",
    };
  }
};
