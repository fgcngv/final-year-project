"use server"

import prisma from "@/lib/prisma";
import { Language, Role, Status } from "@prisma/client";



import { auth, clerkClient } from "@clerk/nextjs/server";

export const setUserDefaultRole = async (userId: string) => {
  try {
    const client = await clerkClient();

    const user = await client.users.getUser(userId);

    //  Only assign if no role exists
    if (!user.publicMetadata?.role) {
      await client.users.updateUser(userId, {
        publicMetadata: {
          role: "buyer",
        },
      });
    }

    return {
      success: true,
      error: false,
      message: "Default role set to buyer",
    };
  } catch (error: any) {
    console.error("Error setting default role:", error);

    return {
      success: false,
      error: true,
      message: "Failed to set default role",
    };
  }
};



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
//     // 1️ Create product
//     const product = await prisma.product.create({
//       data: {
//         product_name: values.product_name,
//         price: values.price,
//         stock: values.quantity,
//         image: values.image,
//         product_detail: values.product_detail || null,
//         farmer_id: farmer_id!, // foreign key
//         status: values.status.toUpperCase(), // enum-safe
//       },
//     });

//     // 2️ Find users to notify (BUYERS + ADMINS)
//     const usersToNotify = await prisma.user.findMany({
//       where: {
//         role: {
//           in: ["BUYER", "ADMIN"],
//         },
//       },
//       select: {
//         id: true,
//       },
//     });

//     // 3️ Create notifications
//     if (usersToNotify.length > 0) {
//       await prisma.notification.createMany({
//         data: usersToNotify.map((user) => ({
//           user_id: user.id,
//           title: "New Product Added",
//           message: `${product.product_name} is now available.`,
//           type: "PRODUCT",
//           product_id: product.id,
//           priority: 2,
//         })),
//       });
//     }

//     return {
//       success: true,
//       error: false,
//       message: "Product added successfully!",
//     };
//   } catch (error) {
//     console.error("Error while adding product:", error);

//     return {
//       success: false,
//       error: true,
//       message: "Failed to add product. You may not approved by Admin! please contact them!",
//     };
//   }
// };


export const addProduct = async ({ farmer_id, values }: ProductProps) => {
  try {
    // 1. Create product
    const product = await prisma.product.create({
      data: {
        product_name: values.product_name,
        price: values.price,
        stock: values.quantity,
        image: values.image,
        product_detail: values.product_detail || null,
        farmer_id: farmer_id!,
        status: values.status.toUpperCase(),
      },
    });

    // 2. Translation helper
    const getNotificationContent = (lang: string, productName: string) => {
      switch (lang) {
        case "AMHARIC":
          return {
            title: "አዲስ ምርት ተጨመረ",
            message: `${productName} አሁን ይገኛል።`,
          };
        case "OROMO":
          return {
            title: "Oomishni haaraan dabalameera",
            message: `${productName} amma ni argama.`,
          };
        default:
          return {
            title: "New Product Added",
            message: `${productName} is now available.`,
          };
      }
    };

    // 3. Get users (BUYER + ADMIN)
    const usersToNotify = await prisma.user.findMany({
      where: {
        role: {
          in: ["BUYER", "ADMIN"],
        },
      },
      select: {
        id: true,
        language: true,
      },
    });

    // 4. Create notifications for users
    const userNotifications = usersToNotify.map((user) => {
      const content = getNotificationContent(
        user.language,
        product.product_name
      );

      return prisma.notification.create({
        data: {
          user_id: user.id,
          title: content.title,
          message: content.message,
          type: "PRODUCT",
          product_id: product.id,
          priority: 2,
        },
      });
    });

    //  5. Get farmer
    const farmer = await prisma.farmer.findUnique({
      where: { id: farmer_id! },
      select: {
        id: true,
        language: true,
      },
    });

    // 6. Create farmer notification (IMPORTANT )
    let farmerNotification: any = null;

    if (farmer) {
      const content = getNotificationContent(
        farmer.language,
        product.product_name
      );

      farmerNotification = prisma.notification.create({
        data: {
          user_id: farmer.id, // ⚠️ works ONLY if farmer exists in User table
          title: content.title,
          message: content.message,
          type: "PRODUCT",
          product_id: product.id,
          priority: 1,
        },
      });
    }

    // 7. Execute all notifications
    await Promise.all([
      ...userNotifications,
      farmerNotification,
    ].filter(Boolean));

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
      message:
        "Failed to add product. You may not be approved by Admin! Please contact them!",
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

        // 2Update Clerk role to "seller"
        const client = await clerkClient();
        await client.users.updateUser(id, {
          publicMetadata: {
            role: "farmer", // upgrade buyer → seller
          },
        });
    

    return {
      success: true,
      error: false,
      data: farmer,
      message: "Farmer registered successfully ",
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


export const updateFarmerLocation = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: true,
        message: "Unauthorized",
      };
    }

    const updated = await prisma.farmer.update({
      where: { id: userId },
      data: {
        latitude,
        longitude,
        locationUpdatedAt: new Date(),
      },
    });

    return {
      success: true,
      error: false,
      data: updated,
      message: "Location updated successfully ",
    };
  } catch (error) {
    console.error("Error updating location:", error);

    return {
      success: false,
      error: true,
      message: error,
    };
  }
};