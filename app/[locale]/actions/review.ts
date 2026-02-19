
"use server";

import prisma  from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  productId: z.string().optional(),
  farmerId: z.string().optional(),
  orderId: z.string(),
  type: z.enum(["PRODUCT", "FARMER"]),
});

export async function AddReview(values: unknown) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = ReviewSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid review data",
    };
  }

  const { rating, comment, productId, farmerId, orderId, type } =
    parsed.data;

  try {
    // 1️ Check order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.user_id !== userId) {
      return { success: false, message: "Order not found" };
    }

    if (order.status !== "CONFIRMED") {
      return {
        success: false,
        message: "You can only review confirmed orders",
      };
    }

    // 2️ Prevent duplicate
    const existingReview = await prisma.review.findUnique({
      where: {
        order_id_type: {
          order_id: orderId,
          type,
        },
      },
    });

    if (existingReview) {
      return {
        success: false,
        message: "You already submitted this review",
      };
    }

    // 3️ Validate product/farmer
    if (type === "PRODUCT") {
      if (!productId)
        return { success: false, message: "Product required" };

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product)
        return { success: false, message: "Product not found" };
    }

    if (type === "FARMER") {
      if (!farmerId)
        return { success: false, message: "Farmer required" };

      const farmer = await prisma.farmer.findUnique({
        where: { id: farmerId },
      });

      if (!farmer)
        return { success: false, message: "Farmer not found" };
    }
    console.log({
      user_id: userId,
      order_id: orderId,
      rating,
      comment,
      type,
      product_id: type === "PRODUCT" ? productId : null,
      farmer_id: type === "FARMER" ? farmerId : null,
    });
    

    // 4️ Create review
   await prisma.review.create({
      data: {
        user_id: userId,
        order_id: orderId,
        rating,
        comment,
        type,
        product_id: type === "PRODUCT" ? productId : null,
        farmer_id: type === "FARMER" ? farmerId : null,
      },
    });


    return { success: true };
  } catch (error) {
    console.error("Review Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit review",
    };
  }
}
