
"use server";

import { auth } from "@clerk/nextjs/server";
import { getOrCreateCart } from "./cart";
import prisma from "@/lib/prisma";

export async function addToCart(productId: string) {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  // Make sure the user has a cart
  const cart = await getOrCreateCart();
  console.log("cart : ",cart)

  if (!cart) {
    return { error: "Cart not found" };
  }

//   Add or increment product
  const item = await prisma.cartItem.upsert({
    where: {
      cart_id_product_id: {
        cart_id: cart.id,
        product_id: productId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      cart_id: cart.id,
      product_id: productId,
      quantity: 1,
    },
  });

  return { success: true, item };
}


export async function updateQuantity(
  id: string,
  action: "increment" | "decrement"
) {
  if (action === "increment") {
    return prisma.cartItem.update({
      where: { id },
      data: { quantity: { increment: 1 } },
    });
  }

  // Decrement → but only if quantity is > 0
  return prisma.cartItem.updateMany({
    where: { id, quantity: { gt: 0 } },
    data: { quantity: { decrement: 1 } },
  });
}


export async function deleteCartItemById(id: string, userId: string) {
  return await prisma.cartItem.deleteMany({
    where: {
      id,
      cart: { user_id: userId }  // ensures the item belongs to the logged-in user. otherwise it is open to attachers
    },
  });
}

