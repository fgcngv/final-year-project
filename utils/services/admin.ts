"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getUserById(id:string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      return {
        success: false,
        error: true,
        message: "User with this id not found!",
      };
    }

    return {
      data:data,

    };
  } catch (error) {
    console.log("error occured in catch");
    return {
      success: false,
      error: true,
      message: "Something went wrong in catch!",
    };
  }
}

export async function getFarmerById(id: string) {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id },
      include: {
        products: {
          where: { status: "ACTIVE" },
          include: {
            description: true,
            orderItems: true,
          },
        },
      },
    });

    if (!farmer) {
      return {
        success: false,
        error: true,
        message: "Farmer with this id not found!",
      };
    }

    // Compute stats
    const totalProducts = farmer.products.length;

    const totalSold = farmer.products.reduce((sum, product) => {
      return (
        sum +
        product.orderItems.reduce(
          (s, item) => s + item.quantity,
          0
        )
      );
    }, 0);

    const totalRevenue = farmer.products.reduce((sum, product) => {
      return (
        sum +
        product.orderItems.reduce(
          (s, item) => s + item.quantity * item.price,
          0
        )
      );
    }, 0);

    return {
      success: true,
      data: {
        ...farmer,
        stats: {
          totalProducts,
          totalSold,
          totalRevenue,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching farmer:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!",
    };
  }
}



interface LanguageProps {
    id:string,
    userType: "BUYER" | "SELLER"
}


export async function getUserLanguage({ id, userType }: LanguageProps) {
  switch (userType) {
    case "BUYER":
      return await prisma.user.findUnique({
        where: { id },
        select: { language: true },
      });

    case "SELLER":
      return await prisma.farmer.findUnique({
        where: { id },
        select: { language: true },
      });

    default:
      return null; // optional, for safety
  }
}



export const getAllUsers = async () => {
  try {
    // Fetch users and count at the same time
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        include: {
          cart: true
        }
      }),

      prisma.user.count()

    ]);

    if (users.length === 0) {
      return {
        success: false,
        error: true,
        message: "No users found!"
      };
    }

    return {
      success: true,
      error: false,
      message: "All users fetched!",
      data: users,
      totalUsers
    };

  } catch (error) {
    console.error("Error while fetching users:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!"
    };
  }
};


export const getAllFarmers = async () => {
  try {
    // Fetch users and count at the same time
    const [farmers, totalFarmers] = await Promise.all([
      prisma.farmer.findMany(),

      prisma.farmer.count()

    ]);

    if (farmers.length === 0) {
      return {
        success: false,
        error: true,
        message: "No Farmers found!"
      };
    }

    return {
      success: true,
      error: false,
      message: "All farmers fetched!",
      data: farmers,
      totalFarmers
    };

  } catch (error) {
    console.error("Error while fetching Farmers:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!"
    };
  }
};


export const getAllOrders = async () => {
  try {
    // Fetch users and count at the same time
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        include:{
          notification:true,
          address:true,
          user:true,
          payment:true
          // product:true
        }
      }),

      prisma.order.count()

    ]);

    if (orders.length === 0) {
      return {
        success: false,
        error: true,
        message: "No Order found!"
      };
    }

    return {
      success: true,
      error: false,
      message: "All Orders fetched!",
      data: orders,
      totalOrders
    };

  } catch (error) {
    console.error("Error while fetching Orders:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!"
    };
  }
};


export const getAllOrderItems = async () => {
  try {
    // Fetch users and count at the same time
    const [orderItems] = await Promise.all([
      prisma.orderItem.findMany({
        include:{
          order:{
            include:{
              user:true,
              items:true
            }
          },
          product:true,
          // product:true
        }
      }),


    ]);

    if (orderItems.length === 0) {
      return {
        success: false,
        error: true,
        message: "No OrdeItem found!"
      };
    }

    return {
      success: true,
      error: false,
      message: "All OrderItems fetched!",
      data: orderItems,
    };

  } catch (error) {
    console.error("Error while fetching OrderItems:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!"
    };
  }
};


// export const getAllMessages = async() =>{
//   const {userId,sessionClaims } = await auth();

//   try{
//     const role = sessionClaims?.metadata?.role;

//     if(!userId || role !== "ADMIN"){
//       return null
//     }
  
//      const data = await prisma.contact.findMany();
  
//      if(!data){
//       return {error:true,message:"Failed to load Messages!"}
//      }

//      return data;

//   }catch(error){
//     console.log(error);
//     return {error:true,message:"Something went wrong!"}
//   }
// }

export const getAllMessages = async () => {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const role = sessionClaims?.metadata?.role;
  if (role?.toUpperCase() !== "ADMIN") {
    throw new Error("Not authorized");
  }

  return await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
};


