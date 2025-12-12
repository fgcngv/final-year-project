import prisma from "@/lib/prisma";

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
