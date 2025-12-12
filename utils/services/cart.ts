

"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getOrCreateCart() {
  const { userId } = await auth();
  if (!userId) return null;

  // Upsert ensures cart always exists
  const cart = await prisma.cart.upsert({
    where: { user_id: userId },
    update: {},
    create: { user_id: userId },
  });

  return cart;
}




export async function getCart() {
  const { userId } = await auth();
  if (!userId) return null;

  return await prisma.cart.findUnique({
    where: { user_id: userId },
    include: {
      items: {
        include: {
          product: true,
          
        },
      },
    },
  });
}



export async function getCartByUserId(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { user_id: userId },
    include: {
      items: {
        include: {
          product: true, // include product details for each CartItem
        },
      },
      user: true, // optional: include user info
    },
  });

  return cart;
}


export async function getCartByUserIdForCartQuantity(user_id: string) {
  const cart = await prisma.cart.findUnique({
    where: { user_id },   // <-- FIXED
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });

  return cart;
}


export async function countCartItemsByCartId(cart_id: string) {
  const totalCartItem = await prisma.cartItem.count({ where: { cart_id } });

  return {totalCartItem};
}

