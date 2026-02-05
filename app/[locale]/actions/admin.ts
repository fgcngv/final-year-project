import prisma from "@/lib/prisma";
import { toast } from "sonner";

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


