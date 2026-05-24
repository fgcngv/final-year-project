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
    return { success: false, message: "User not authenticated" };
  }

  const address = await prisma.address.findFirst({
    where: { userId },
  });

  if (!address) {
    return { success: false, message: "No address found" };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {

      // 1. GET PRODUCTS
      const products = await tx.product.findMany({
        where: {
          id: { in: items.map((i) => i.product_id) },
        },
      });

      // 2. GROUP PRODUCTS BY FARMER
      const grouped: Record<string, any[]> = {};

      for (const item of items) {
        const product = products.find((p) => p.id === item.product_id);

        if (!product) {
          throw new Error("Product not found");
        }

        if (!grouped[product.farmer_id]) {
          grouped[product.farmer_id] = [];
        }

        grouped[product.farmer_id].push({
          ...item,
          product,
        });
      }

      let totalAmount = 0;
      const createdOrders = [];

      // 3. CREATE ORDER FOR EACH FARMER
      for (const farmerId in grouped) {

        const farmerItems = grouped[farmerId];

        const order = await tx.order.create({
          data: {
            user_id: userId,
            address_id: address.id,
            status: "PENDING",
          },
        });

        for (const item of farmerItems) {

          // CHECK STOCK
          if (item.product.stock < item.quantity) {
            throw new Error(
              `Insufficient stock for ${item.product.product_name}`
            );
          }

          // CREATE ORDER ITEM
          await tx.orderItem.create({
            data: {
              order_id: order.id,
              product_id: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            },
          });

          // UPDATE STOCK
          await tx.product.update({
            where: { id: item.product.id },
            data: {
              stock: item.product.stock - item.quantity,
            },
          });

          // CALCULATE TOTAL
          totalAmount += item.product.price * item.quantity;

          // CREATE NOTIFICATION FOR FARMER
          await tx.notification.create({
            data: {
              user_id: item.product.farmer_id,
              title: "New Order Received",
              message: `${item.quantity} x ${item.product.product_name} has been ordered.`,
              type: "ORDER",
              product_id: item.product.id,
            },
          });
        }

        createdOrders.push(order);
      }

      // 4. CREATE PAYMENT
      const payment = await tx.payment.create({
        data: {
          user_id: userId,
          amount: totalAmount,
          method: "CARD",
          status: "UNPAID",
          provider: "CHAPA",
        },
      });

      // 5. LINK PAYMENT TO ORDERS
      for (const order of createdOrders) {
        await tx.order.update({
          where: { id: order.id },
          data: {
            payment_id: payment.id,
          },
        });
      }

      // 6. DELETE CART
      await tx.cart.delete({
        where: {
          user_id: userId,
        },
      });

      return {
        payment,
        orders: createdOrders,
      };
    });

    return {
      success: true,
      payment_id: result.payment.id,
      amount: result.payment.amount,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
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
