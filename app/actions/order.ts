"use server"

import prisma from "@/lib/prisma";
import { addressSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { Cart } from "@prisma/client";
import z from "zod";


interface cartProps {
    cart : Cart
}

export const createOrder = async ()=>{
    const {userId} = await auth();
    if(!userId){
        return null
    }

   try{
    const order = await prisma.order.create({
        data: {
          user_id: userId,
          address_id: "addressId",
          status: "PENDING",
        },
      });

      if(order){
        return {
            success: true,
            error:false,
            message: "Order Placed Successfully!"
        }
      }
    
   }catch(error){
    console.log(error)
    return {
        success: false,
        error: true,
        message: "Failed to Place order!"
    }
   }
}


// export const createOrderItems = async({cart}:cartProps)=>{
//     const {userId} = await auth();
//     if(!userId){
//         return null
//     }

//     try{
//         await prisma.orderItem.createMany({
//             data: cart.items.map((item) => ({
//               order_id: order.id,
//               product_id: item.product_id,
//               quantity: item.quantity,
//               price: item.product.price,
//             })),
//           });
        

//     }catch(error){
//         console.log("Catch Error Occured during creating order items : ",error)
//     }
// }


type AddressInput = z.infer<typeof addressSchema>

export const createAddress = async (input: AddressInput) => {
  
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    // Validate input
    const data = addressSchema.parse(input)

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      })
    }
    

    // Create address
    const address = await prisma.address.create({
      data: {
        userId,
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        region: data.region,
        country: data.country,
        postalCode: data.postalCode,
        type: data.type ,
        isDefault: data.isDefault,
      },
    });

    if(!address){
      return{
        success: false,
        error: true,
        message: "Failed to Save Address!"
      }
    }
    
   return {
    success: true,
    error: false,
    message: "Address Saved successfuly!",
    data:address
  }
  } catch (error) {
    console.error("Error occurred while inserting the address:", error)
    return{
      success: false,
      error: true,
      message: "Catch Error occured while Saving Address!"
    }
  }
}