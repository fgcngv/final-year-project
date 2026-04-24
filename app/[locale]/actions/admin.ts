"use server"

import { toast } from "sonner";
import { PrismaClient, Status,NotificationType } from "@prisma/client";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getRole } from "@/utils/role";
import prisma from "@/lib/prisma";


export const deleteData = async (id:string,table:string)=>{
  try{
    switch(table){
        case "user":
            const deleted = await prisma.user.delete({
                where:{id}
            });
            if(!deleted){
                return{success:false,error:true,message:"Deletion Failed!"}
            }

            toast.success("Data Deleted Successfuly!")
            return{
                success:true,error:false,message:"Data Deleted Successfuly!"
            }
    }

  }catch(error){
    console.log("error deleting data : ",error);
    return{error:true,success:false,message:"Catch error: not deleted!"}
  }
}



// export async function updateUserStatus(
//   userId: string,
//   newStatus: Status
// ) {

//   const {userId:user_id} = await auth();
//   if(!user_id){
//     return {error:true,message:"Not Authenticated!"}
//   }

//   // check whether user is admin or not
//   const admin = await getRole();
//   // Validate status
//   if (!Object.values(Status).includes(newStatus)) {
//     return {error:true,message:"Invalid status"

//     }
//   }

 
//   // Check if requester is actually an admin
//   if (admin !== "ADMIN" && admin !== "admin") {
//     return { 
//       error:true,message:"Unauthorized: Only admins can update user status"
//     }
//   }

//   // Update user status in the database
//   const updatedUser = await prisma.user.update({
//     where: { id: userId },
//     data: { status: newStatus },
//   });

//   if(!updatedUser){
//     return {error:true,message:"Failed to updated user status!"}
//   }

//   return {error:false,message:"Status Updated Successfully!", updatedUser};
// }

type EntityType = "user" | "product" | "farmer";

// export async function updateStatus(
//   entity: EntityType,
//   id: string,
//   newStatus: Status
// ) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return { error: true, message: "Not authenticated" };
//     }

//     const role = await getRole();

//     // Only admins allowed
//     if (role?.toUpperCase() !== "ADMIN") {
//       return {
//         error: true,
//         message: "Unauthorized: Admin access required",
//       };
//     }

//     // Validate status
//     if (!Object.values(Status).includes(newStatus)) {
//       return {
//         error: true,
//         message: "Invalid status value",
//       };
//     }

//     let updatedRecord;

//     //Handle different tables
//     switch (entity) {
//       case "user":
//         updatedRecord = await prisma.user.update({
//           where: { id },
//           data: { status: newStatus },
//         });
//         break;
//       case "farmer":
//         updatedRecord = await prisma.farmer.update({
//           where: { id },
//             data: { status: newStatus },
//         });
//         break;

//       case "product":
//         updatedRecord = await prisma.product.update({
//           where: { id },
//           data: { status: newStatus },
//         });
//         break;

//       default:
//         return {
//           error: true,
//           message: "Invalid entity type",
//         };
//     }

//     if (!updatedRecord) {
//       return {
//         error: true,
//         message: "Update failed",
//       };
//     }

//     return {
//       error: false,
//       message: "Status updated successfully",
//       data: updatedRecord,
//     };
//   } catch (error) {
//     console.error("Update status error:", error);

//     return {
//       error: true,
//       message: "Internal server error",
//     };
//   }
// }



export async function updateStatus(
  entity: EntityType,
  id: string,
  newStatus: Status
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: true, message: "Not authenticated" };
    }

    const role = await getRole();

    if (role?.toUpperCase() !== "ADMIN") {
      return { error: true, message: "Unauthorized: Admin access required" };
    }

    if (!Object.values(Status).includes(newStatus)) {
      return { error: true, message: "Invalid status value" };
    }

    let updatedRecord: any;
    let notifications: { user_id: string; title: string; message: string }[] = [];

    switch (entity) {
      case "user":
        updatedRecord = await prisma.user.update({
          where: { id },
          data: { status: newStatus },
        });

        notifications.push({
          user_id: id,
          title: "Account Status Updated",
          message: `Your account status is now "${newStatus}"`,
        });
        break;

      case "farmer":
        updatedRecord = await prisma.farmer.update({
          where: { id },
          data: { status: newStatus },
        });

        // Notify the farmer
        notifications.push({
          user_id: id,
          title: "Farmer Status Updated",
          message: `Your account status is now "${newStatus}"`,
        });

        // Optionally, notify all buyers about status change of this farmer's products
        const buyerIds = await prisma.user.findMany({
          where: { role: "BUYER" },
          select: { id: true },
        });

        notifications.push(
          ...buyerIds.map((b) => ({
            user_id: b.id,
            title: "Farmer Status Changed",
            message: `Farmer "${updatedRecord.first_name} ${updatedRecord.last_name}" is now "${newStatus}"`,
          }))
        );
        break;

      case "product":
        updatedRecord = await prisma.product.update({
          where: { id },
          data: { status: newStatus },
        });

        // Notify buyers who have this product in wishlist
        const usersToNotify = await prisma.wishlist.findMany({
          where: { product_id: id },
          select: { user_id: true },
        });

        notifications.push(
          ...usersToNotify.map((u) => ({
            user_id: u.user_id,
            title: "Product Status Updated",
            message: `"${updatedRecord.product_name}" is now "${newStatus}"`,
          }))
        );
        break;

      default:
        return { error: true, message: "Invalid entity type" };
    }

    // Create all notifications at once
    if (notifications.length > 0) {
      await prisma.notification.createMany({
        data: notifications.map((n) => ({
          ...n,
          type: NotificationType.SYSTEM,
          priority: 2,
        })),
      });
    }

    return { error: false, message: "Status updated successfully", data: updatedRecord };
  } catch (error) {
    console.error("Update status error:", error);
    return { error: true, message: "Internal server error" };
  }
}


// export async function getReports() {
//   const { userId } = await auth();

//   if (!userId) {
//     return { success: false, error: "Unauthorized" };
//   }

//   try {
//     const reports = await prisma.report.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return { success: true, data: reports };
//   } catch (err) {
//     console.error(err);
//     return { success: false, error: "Failed to fetch reports" };
//   }
// }
export async function getReports() {
  const reports = await prisma.report.findMany({
    include: {
      reporter: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          product_name: true,
        },
      },
      farmer: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      order: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    data: reports,
  };
}

export async function updateReportStatus({
  reportId,
  status,
}: {
  reportId: string;
  status: "UNDER_REVIEW" | "RESOLVED" | "REJECTED";
}) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updated = await prisma.report.update({
      where: { id: reportId },
      data: {
        status,
        handledBy: userId,
      },
    });

    return { success: true, data: updated };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update report" };
  }
}