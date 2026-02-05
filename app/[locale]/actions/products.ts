"use server"

import prisma from "@/lib/prisma";

export const getAllProducts= async ()=>{
    try{
        const data = await prisma.product.findMany({
            include:{
                cartItems:true,
                orderItems:true,
                wishlist:true,
                farmer:true 
            }
        });

        if(!data){
            return{
                success:false,
                error:true,
                massage:"No product found!"
            }
        }

        return{
            success:true,
            error:false,
            massage:"All product fetched!",
            data:data
        }

    }catch(error){
        // console.log("error ocured during product fetching in catch! : ",error);
        return{
            success:false,
            error:true,
            massage:"Something went wrong in catch!"
        }

    }
}


export const getProductById = async(id:string)=>{
    const data = await prisma.product.findUnique({
        where:{id},
        include:{
            farmer:true
        }
    });

    if(!data){
        return {success: false,error:true,message:"Product Not Found!"}
    }

    return {success:true,error:false,data:data,message:"Product Fetched Successfuly!"}
}



// export const deleteProductById = async (id: string) => {
//     try {
//       const deletedProduct = await prisma.product.delete({
//         where: { id }
//       });
  
//       return {
//         success: true,
//         error: false,
//         data: deletedProduct
//       };
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return {
//         success: false,
//         error: true,
//         message: "Error while deleting product"
//       };
//     }
//   };
  


export const deleteProductById = async (id: string) => {
  try {
    // 1️⃣ Check if product is in any cart
    const inCart = await prisma.cartItem.findFirst({
      where: { product_id: id },
    });

    if (inCart) {
      return {
        success: false,
        error: true,
        message: "Cannot delete: Product is in someone's cart!",
      };
    }

    // 2️⃣ Check if product exists in any order (optional, recommended)
    const inOrder = await prisma.orderItem.findFirst({
      where: { product_id: id },
    });

    if (inOrder) {
      return {
        success: false,
        error: true,
        message: "Cannot delete: Product is part of an order!",
      };
    }

    // 3️⃣ Safe to delete
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return {
      success: true,
      error: false,
      data: deletedProduct,
      message: "Product deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: true,
      message: "Error while deleting product",
    };
  }
};
