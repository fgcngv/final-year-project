"use server"


import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";



export const OrdersByBuyerId = async () => {
    const { userId } = await auth();
  
    if (!userId) {
      return { success: false, error: true, message: "User not authenticated" };
    }
  
    try {
      const orders = await prisma.order.findMany({
        where: { user_id: userId },
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  product_name: true,
                  image: true,
                  price: true,
                },
              },
            },
          },
          payment: true,
          address: true,
        },
      });
  
      if (orders.length === 0) {
        return { success: true, error: false, data: [], message: "No orders yet!" };
      }
  
      const mappedOrders = orders.map((order) => ({
        id: order.id,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        totalAmount: order.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        ),
        address: order.address,
        items: order.items.map((item) => ({
          id: item.id,
          product_name: item.product.product_name,
          image: item.product.image,
          quantity: item.quantity,
          price: item.price,
        })),
        payment: order.payment
          ? {
              method: order.payment.method,
              status: order.payment.status,
            }
          : null,
      }));
  
      return {
        success: true,
        error: false,
        data: mappedOrders,
      };
    } catch (err) {
      console.error("Error fetching buyer orders:", err);
      return {
        success: false,
        error: true,
        message: "Error occurred while fetching your orders!",
      };
    }
  };

  export const getOrderById = async (orderId:string) => {
    const { userId } = await auth();
  
    if (!userId) {
      return { success: false, error: true, message: "User not authenticated" };
    }
  
    try {
      const orders = await prisma.order.findMany({
        where: { id: orderId },
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  product_name: true,
                  image: true,
                  price: true,
                  farmer:true
                },
              },
            },
          },
          payment: true,
          address: true,
          user:true
        },
      });
  
      if (orders.length === 0) {
        return { success: true, error: false, data: [], message: "No orders yet!" };
      }
  
      const mappedOrders = orders.map((order) => ({
        id: order.id,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        totalAmount: order.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        ),
        address: order.address,
        items: order.items.map((item) => ({
          id: item.id,
          product_name: item.product.product_name,
          image: item.product.image,
          quantity: item.quantity,
          price: item.price,
        })),
        payment: order.payment
          ? {
              method: order.payment.method,
              status: order.payment.status,
            }
          : null,
      }));
  
      return {
        success: true,
        error: false,
        data: mappedOrders,
      };
    } catch (err) {
      console.error("Error fetching buyer orders:", err);
      return {
        success: false,
        error: true,
        message: "Error occurred while fetching your orders!",
      };
    }
  };



export const ConfirmOrderDelivery = async (orderId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payout: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    if (order.user_id !== userId) {
      return { success: false, message: "Not your order" };
    }


    if (order.status !== "DELIVERED") {
      return { success: false, message: "Order not delivered yet" };
    }

    if (!order.payout) {
      return { success: false, message: "Payout record not found!" };
    }
    

    //  TRANSACTION (important)
    await prisma.$transaction(async (tx) => {
      // 1️ Update order
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED",
          confirmedAt: new Date(),
        },
      });
    
      // 2️ Update payout ONLY if exists
      if (order.payout) {
        await tx.payout.update({
          where: { order_id: orderId },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        });
      }
    
      // 3️ Notify farmer
      const farmerId = order.items[0].product.farmer_id;
    
      await tx.notification.create({
        data: {
          user_id: farmerId,
          title: "Order Confirmed 🎉",
          message: "Buyer confirmed delivery. Payment released.",
          type: "ORDER",
          order_id: orderId,
        },
      });
    });
    
    return { success: true, message: "Order confirmed successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!(remembering msg for me:i need to solve the chapa error before fixing this error" };
  }
};




  export const CancelOrder = async (orderId:string,action?:string)=>{
    const {userId} = await auth();

    if (!orderId || typeof orderId !== "string") {
        return {
            success:false,
            error:true,
            message: "Missing orderId"
        };
      }
    
      try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
          return {
            success:false,
            error:true,
            message: "Unauthorized" 
          };
        }
    
        // Fetch order
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true, payment: true },
        });
    
        if (!order) {
          return {
            success:false,
            error:true,
            message: "Order not found"
          };
        }
    
        // Only the buyer who owns the order can cancel
        if (order.user_id !== userId ) {
          return {
            success:false,
            error:true,
            message: "Forbidden"
          };
        }
    
        // Only PENDING orders can be cancelled
        if (order.status !== "PENDING") {
          return {
            success: false,
            erro:true,
            message: `Cannot cancel order with status "${order.status}"`,
          };
        }
    
        // Update order status to CANCELLED
        const cancelledOrder = await prisma.order.update({
          where: { id: orderId },
          data: { status: "CANCELLED" },
        });
    
        return {
          success: true,
          erro:false,
          message: "Order cancelled successfully",
          order: cancelledOrder,
        };
      } catch (err) {
        console.error("Error cancelling order:", err);
        return {
          success: false,
          error:true,
          message: "Server error: Failed to cancel order",
        };
      }
  }