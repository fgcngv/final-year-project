import prisma from "@/lib/prisma";
import { getRole } from "../role";
import { auth } from "@clerk/nextjs/server";

export async function getProductDescriptionByProductId(productId: string) {
  try {
    
    const description = await prisma.pDescription.findUnique({
      where: { product_id: productId },
    });

    if (!description) {
      return {
        success: false,
        error: true,
        message: "Product description not found!",
      };
    }

    return { success: true, data: description };
  } catch (error) {
    console.error("Prisma error:", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong!",
    };
  }
}


export async function getAllProductByFarmerId() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const role = await getRole();
  if (role !== "farmer") {
    throw new Error("Forbidden");
  }

  const products = await prisma.product.findMany({
    where: { farmer_id: userId },
    select: {
      id: true,
      product_name: true,
      price: true,
      image:true,
      status: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          order: {
            select: { status: true }
          }
        }
      },
      description:{
        select:{origion:true}
      }
    }
  });
  

  return products;
}
