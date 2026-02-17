"use server";

import prisma from "@/lib/prisma";
import { addressSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { Cart } from "@prisma/client";
import z from "zod";

interface CartItem {
  product_id: string;
  quantity: number;
  price: number;
}

export const createOrder = async (items: CartItem[]) => {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: true, message: "User not authenticated" };
  }

  const address = await prisma.address.findFirst({
    where: { userId },
  });

  if (!address) {
    return {
      success: false,
      error: true,
      message: "No address found, please save your address information!",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 0️ Find user's cart
      const cart = await tx.cart.findUnique({
        where: { user_id: userId },
        include: { items: true },
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // 1️ Create Order
      const order = await tx.order.create({
        data: {
          user_id: userId,
          address_id: address.id,
          status: "PENDING",
        },
      });

      let totalAmount = 0;

      // 2️ Create OrderItems (NO stock deduction here)
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.product_id },
        });

        if (!product) throw new Error("Product not found");
        if (product.status !== "ACTIVE") {
          throw new Error(`${product.product_name} is not available`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.product_name}`);
        }

        await tx.orderItem.create({
          data: {
            order_id: order.id,
            product_id: product.id,
            quantity: item.quantity,
            price: product.price,
          },
        });

        totalAmount += product.price * item.quantity;
      }

      // 3️ Create Payment (UNPAID)
      const payment = await tx.payment.create({
        data: {
          order_id: order.id,
          user_id: userId,
          amount: totalAmount,
          method: "CARD",
          status: "UNPAID",
          provider: "CHAPA",
        },
      });

      // 4️ DELETE CART (IMPORTANT)
      await tx.cart.delete({
        where: { user_id: userId },
      });

      return { order, payment };
    });

    return {
      success: true,
      order_id: result.order.id,
      payment_id: result.payment.id,
      amount: result.payment.amount,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Order creation failed",
    };
  }
};

type AddressInput = z.infer<typeof addressSchema>;



export const createAddress = async (input: AddressInput) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Validate input
    const data = addressSchema.parse(input);

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    // Create address
    const address = await prisma.address.create({
      data: {
        userId,
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        region: data.region,
        country: data.country,
        postalCode: data.postalCode,
        type: data.type,
        isDefault: data.isDefault,
      },
    });

    if (!address) {
      return {
        success: false,
        error: true,
        message: "Failed to Save Address!",
      };
    }

    return {
      success: true,
      error: false,
      message: "Address Saved successfuly!",
      data: address,
    };
  } catch (error) {
    console.error("Error occurred while inserting the address:", error);
    return {
      success: false,
      error: true,
      message: "Catch Error occured while Saving Address!",
    };
  }
};
