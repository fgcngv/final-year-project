"use server"

import prisma from "@/lib/prisma";
import { Language, Role, Status } from "@prisma/client";


export async function deleteDataById(
    id: string,
  
    deleteType: "user" | "farmer" | "product" | "order" | "order_item" | "cart" | "cart_item" | "wishlist"
  ) {
    try {
      switch (deleteType) {
        case "user":
          await prisma.user.delete({ where: { id: id } });
          break;
  
        case "farmer":
          await prisma.farmer.delete({ where: { id: id } });
          break;
  
        case "product":
          await prisma.product.delete({ where: { id: id } });
          break;
  
        case "order":
          await prisma.order.delete({ where: { id: id } });
          break;

        case "cart":
          await prisma.cart.delete({ where: { id: id } });
          break;

        case "cart_item" :
          await prisma.cartItem.delete({ where: { id: id } });
          break;

        case "order_item" :
            await prisma.orderItem.delete({where:{id:id}});
            break;

        case "wishlist":
            await prisma.wishlist.delete({where:{id:id}});
      }
  
  
      return {
        success: true,
        message: "Data deleted successfully",
        status: 200,
      };
    } catch (error) {
      console.log(error);
  
      return {
        success: false,
        message: "Internal Server Error",
        status: 500,
      };
    }
  }
  

  interface ProductProps {
    farmer_id?:string,
    product_id?:string,
    values:any
  }
  




// export const addProduct = async ({ farmer_id, values }: ProductProps) => {
//   try {
//     const data = await prisma.product.create({
//       data: {
//         product_name: values.product_name,
//         price: values.price,
//         image: values.image,
//         product_detail: values.product_detail || null,
//         farmer_id: farmer_id!, // ensure NOT empty b/c it is a foreign key
//         status: values.status.toUpperCase(), // MUST MATCH ENUM
//       },
//     });

//     return {
//       success: true,
//       error: false,
//       message: "Product added successfully!",
//     };
//   } catch (error) {
//     console.log("catch error while adding product!: ", error);
//     return {
//       success: false,
//       error: true,
//       message: "Something went wrong in catch!!!!",
//     };
//   }
// };






// add Product with notification





export const addProduct = async ({ farmer_id, values }: ProductProps) => {
  try {
    // 1️⃣ Create product
    const product = await prisma.product.create({
      data: {
        product_name: values.product_name,
        price: values.price,
        stock: values.quantity,
        image: values.image,
        product_detail: values.product_detail || null,
        farmer_id: farmer_id!, // foreign key
        status: values.status.toUpperCase(), // enum-safe
      },
    });

    // 2️⃣ Find users to notify (BUYERS + ADMINS)
    const usersToNotify = await prisma.user.findMany({
      where: {
        role: {
          in: ["BUYER", "ADMIN"],
        },
      },
      select: {
        id: true,
      },
    });

    // 3️⃣ Create notifications
    if (usersToNotify.length > 0) {
      await prisma.notification.createMany({
        data: usersToNotify.map((user) => ({
          user_id: user.id,
          title: "New Product Added",
          message: `${product.product_name} is now available.`,
          type: "PRODUCT",
          product_id: product.id,
          priority: 2,
        })),
      });
    }

    return {
      success: true,
      error: false,
      message: "Product added successfully!",
    };
  } catch (error) {
    console.error("Error while adding product:", error);

    return {
      success: false,
      error: true,
      message: "Failed to add product. You may not approved by Admin! please contact them!",
    };
  }
};




interface FarmerRegistrationProps {
  id:string
  first_name:string
  last_name: string
  email:string
  address?:string | null
  language:Language
  role: Role
  status:Status
}







export const registerFarmer = async ({
  id,
  first_name,
  last_name,
  email,
  address,
  language,
  role,
  status,
}: FarmerRegistrationProps) => {
  try {
    const farmer = await prisma.farmer.create({
      data: {
        id,
        first_name,
        last_name,
        email,
        address: address || null,

        language:
          Language[language as keyof typeof Language] ??
          Language.ENGLISH,

        role:
          Role[role as keyof typeof Role] ??
          Role.SELLER,

        status:
          Status[status as keyof typeof Status] ??
          Status.ACTIVE,
      },
    });

    return {
      success: true,
      error: false,
      data: farmer,
      message: "Farmer registered successfully 🌱",
    };
  } catch (error: any) {
    console.error("Error while registering farmer:", error);

    // Handle duplicate email nicely
    if (error.code === "P2002") {
      return {
        success: false,
        error: true,
        message: "A farmer with this email already exists.",
      };
    }

    return {
      success: false,
      error: true,
      message: "Failed to register farmer. Please try again.",
    };
  }
};
