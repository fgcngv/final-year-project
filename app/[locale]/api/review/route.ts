
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Auth
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, comment, productId, farmerId, orderId, type } = body;

    // 2️⃣ Basic Validation
    if (!orderId || !type || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (type !== "PRODUCT" && type !== "FARMER") {
      return NextResponse.json(
        { error: "Invalid review type" },
        { status: 400 }
      );
    }

    // 3️⃣ Check Order Exists & Belongs To User
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.user_id !== userId) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Ensure Order is CONFIRMED
    if (order.status !== "CONFIRMED") {
      return NextResponse.json(
        { error: "You can only review confirmed orders" },
        { status: 400 }
      );
    }

    // 5️⃣ Prevent Duplicate Review
    const existingReview = await prisma.review.findUnique({
      where: {
        order_id_type: {
          order_id: orderId,
          type,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already submitted this review" },
        { status: 400 }
      );
    }

    // 6️⃣ Validate Target Entity
    if (type === "PRODUCT") {
      if (!productId) {
        return NextResponse.json(
          { error: "Product ID required" },
          { status: 400 }
        );
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
    }

    if (type === "FARMER") {
      if (!farmerId) {
        return NextResponse.json(
          { error: "Farmer ID required" },
          { status: 400 }
        );
      }

      const farmer = await prisma.farmer.findUnique({
        where: { id: farmerId },
      });

      if (!farmer) {
        return NextResponse.json(
          { error: "Farmer not found" },
          { status: 404 }
        );
      }
    }

    // 7️⃣ Create Review
    const review = await prisma.review.create({
      data: {
        user_id: userId,
        order_id: orderId,
        type,
        rating,
        comment,
        product_id: type === "PRODUCT" ? productId : null,
        farmer_id: type === "FARMER" ? farmerId : null,
      },
    });

    return NextResponse.json(
      { message: "Review submitted successfully", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
