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