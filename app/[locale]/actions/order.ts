"use server";

import prisma from "@/lib/prisma";
import { addressSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { Cart } from "@prisma/client";
import z from "zod";

interface cartProps {
  cart: Cart;
}

// export const createOrder = async (address_id:string)=>{
//     const {userId} = await auth();
//     if(!userId){
//         return null
//     }

//    try{
//     const order = await prisma.order.create({
//         data: {
//           user_id: userId,
//           address_id: address_id,
//           status: "PENDING",
//         },
//       });

//       if(order){
//         return {
//             success: true,
//             error:false,
//             message: "Order Placed Successfully!"
//         }
//       }

//    }catch(error){
//     console.log(error)
//     return {
//         success: false,
//         error: true,
//         message: "Failed to Place order!"
//     }
//    }
// }

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

// app/actions/order.ts

interface CartItem {
  product_id: string;
  quantity: number;
  price: number;
}

///////////////////////////////////////////////

// export const createOrder = async (items: CartItem[]) => {
//   const { userId } = await auth();
//   if (!userId) {
//     return {
//       success: false,
//       error: true,
//       message: "User not authenticated",
//     };
//   }

//   // get user address
//   const address = await prisma.address.findFirst({ where: { userId } });
//   if (!address) return { success: false, message: "No address found, please save your address information!" };

//   try {
//     // 1. Create the order
//     const order = await prisma.order.create({
//       data: {
//         user_id: userId,
//         address_id : address?.id,
//         status: "PENDING",
//       },
//     });

//     if (!order) {
//       return {
//         success: false,
//         error: true,
//         message: "Failed to create order",
//       };
//     }

//     // 2. Create order items
//     await Promise.all(
//       items.map((item) =>
//         createOrderItem({
//           order_id: order.id,
//           product_id: item.product_id,
//           quantity: item.quantity,
//           price: item.price,
//         })
//       )
//     );

//     return {
//       success: true,
//       error: false,
//       message: "Order placed successfully!",
//       order_id: order.id,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       error: true,
//       message: "Failed to place order",
//     };
//   }
// };

// // Server action to create a single order item
// interface OrderItemInput {
//   order_id: string;
//   product_id: string;
//   quantity: number;
//   price: number;
// }

// export const createOrderItem = async ({
//   order_id,
//   product_id,
//   quantity,
//   price,
// }: OrderItemInput) => {
//   try {
//     const orderItem = await prisma.orderItem.create({
//       data: {
//         order_id,
//         product_id,
//         quantity,
//         price,
//       },
//     });

//     return orderItem;
//   } catch (error) {
//     console.error("Failed to create order item:", error);
//     throw new Error("Failed to create order item");
//   }
// };

///////////////////////////////////////////////
export const createOrder = async (items: CartItem[]) => {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: true, message: "User not authenticated" };
  }

  const address = await prisma.address.findFirst({
    where: { userId },
  });

  if (!address) {
    return {
      success: false,
      error: true,
      message: "No address found, please save your address information!",
    };
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      // 1️⃣ Create order
      const order = await tx.order.create({
        data: {
          user_id: userId,
          address_id: address.id,
          status: "PENDING",
        },
      });

      // 2️⃣ Process each cart item safely
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.product_id },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.status !== "ACTIVE") {
          throw new Error(`${product.product_name} is not available`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.product_name}`);
        }

        // 3️⃣ Create order item
        await tx.orderItem.create({
          data: {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price, // trust DB, not client
          },
        });

        // 4️⃣ Reduce stock
        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
            status: product.stock - item.quantity === 0 ? "PAUSED" : "ACTIVE",
          },
        });

        // 5️⃣ Create notification for farmer
        await tx.notification.create({
          data: {
            user_id: product.farmer_id, // farmer gets notified
            title: "Product Sold",
            message: `${product.product_name} was purchased (${item.quantity})`,
            type: "ORDER",
            product_id: product.id,
          },
        });
      }

      return order;
    });

    return {
      success: true,
      error: false,
      message: "Order placed successfully!",
      order_id: order.id,
    };
  } catch (error: any) {
    console.error("Order creation failed:", error.message);
    return {
      success: false,
      error: true,
      message: error.message || "Failed to place order",
    };
  }
};

type AddressInput = z.infer<typeof addressSchema>;

export const createAddress = async (input: AddressInput) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Validate input
    const data = addressSchema.parse(input);

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
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
        type: data.type,
        isDefault: data.isDefault,
      },
    });

    if (!address) {
      return {
        success: false,
        error: true,
        message: "Failed to Save Address!",
      };
    }

    return {
      success: true,
      error: false,
      message: "Address Saved successfuly!",
      data: address,
    };
  } catch (error) {
    console.error("Error occurred while inserting the address:", error);
    return {
      success: false,
      error: true,
      message: "Catch Error occured while Saving Address!",
    };
  }
};
