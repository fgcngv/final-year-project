"use server"

import { toast } from "sonner";
import { PrismaClient, Status } from "@prisma/client";
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



export async function updateUserStatus(
  userId: string,
  newStatus: Status
) {

  const {userId:user_id} = await auth();
  if(!user_id){
    return {error:true,message:"Not Authenticated!"}
  }

  // check whether user is admin or not
  const admin = await getRole();
  // Validate status
  if (!Object.values(Status).includes(newStatus)) {
    return {error:true,message:"Invalid status"

    }
  }

 
  // Check if requester is actually an admin
  if (admin !== "ADMIN" && admin !== "admin") {
    return { 
      error:true,message:"Unauthorized: Only admins can update user status"
    }
  }

  // Update user status in the database
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
  });

  if(!updatedUser){
    return {error:true,message:"Failed to updated user status!"}
  }

  return {error:false,message:"Status Updated Successfully!", updatedUser};
}