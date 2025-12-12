"use server"

import prisma from "@/lib/prisma";


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
  
  
//   export const addProduct = async ({farmer_id,values}:ProductProps)=>{
  
//     try{
//       // const product = await prisma.product.findUnique({where:{id:product_id && farmer_id}});

//       // if(product){
//       //   return {message:"product already exist please add only number of product for this farmer"}
//       // }

//       const data = await prisma.product.create({
//         data:{
//           product_name:values?.product_name,
//           price:values?.price || 1,
//           image:values?.image,
//           product_detail:values?.product_detail,
//           farmer_id:farmer_id || "",
//           status: values?.status.toUpperCase() 

//         }
//       });

//       if(!data){
//         return{success:false,error:true,message:"Failed to add product!"}
//       }

//       return{
//         success:true,
//         error:false,
//         message:"Product added successfuly!"
//       }

//     }catch(error){
//       console.log("catch error while adding product! : ",error);
//       return{
//         success:false,
//         error:true,
//         message:"Something went wrong in catch!"
//       }
//     }
// }


export const addProduct = async ({ farmer_id, values }: ProductProps) => {
  try {
    const data = await prisma.product.create({
      data: {
        product_name: values.product_name,
        price: values.price,
        image: values.image,
        product_detail: values.product_detail || null,
        farmer_id: farmer_id!, // ensure NOT empty b/c it is a foreign key
        status: values.status.toUpperCase(), // MUST MATCH ENUM
      },
    });

    return {
      success: true,
      error: false,
      message: "Product added successfully!",
    };
  } catch (error) {
    console.log("catch error while adding product!: ", error);
    return {
      success: false,
      error: true,
      message: "Something went wrong in catch!!!!",
    };
  }
};


