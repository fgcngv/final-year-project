"use server"


import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// // get orders by farmer
// export async function getOrderByFarmerId() {
//       const { userId } = await auth();
//       if (!userId) return null;

//     try{
//         const orderData = await prisma.order.findMany({
//             where:{}
//         })
//     }catch(error){
//         console.log("Catch Error : ",error);
//         return{
//             success:false,
//             erorr:true,
//             message:"Catch Error while fetching the order!"
//         }
//     }
// }