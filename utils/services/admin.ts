import prisma from "@/lib/prisma";


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

interface LanguageProps {
    id:string,
    userType: "user" | "farmer"
}


export async function getUserLanguage({ id, userType }: LanguageProps) {
  switch (userType) {
    case "user":
      return await prisma.user.findUnique({
        where: { id },
        select: { language: true },
      });

    case "farmer":
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
          user:true,
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
