
"use server";

import { auth } from "@clerk/nextjs/server";
import { getOrCreateCart } from "./cart";
import prisma from "@/lib/prisma";

// export async function addToCart(productId: string) {
//   const { userId } = await auth();
//   if (!userId) return { error: "Not authenticated" };

//   // Make sure the user has a cart
//   const cart = await getOrCreateCart();
//   console.log("cart : ",cart)

//   if (!cart) {
//     return { error: "Cart not found" };
//   }

// //   Add or increment product
//   const item = await prisma.cartItem.upsert({
//     where: {
//       cart_id_product_id: {
//         cart_id: cart.id,
//         product_id: productId,
//       },
//     },
//     update: {
//       quantity: { increment: 1 },
//     },
//     create: {
//       cart_id: cart.id,
//       product_id: productId,
//       quantity: 1,
//     },
//   });

//   return { success: true, item };
// }


// utils/services/cartItem.ts


interface AddToCartInput {
  product_id: string;
  quantity: number;
}

export const addToCart = async (product_id: string, quantity: number = 1) => {
  const { userId } = await auth();
  if (!userId) return { success: false, message: "User not authenticated" };

  if (!product_id || quantity <= 0) {
    return { success: false, message: "Invalid product or quantity" };
  }

  // Start transaction
  return await prisma.$transaction(async (tx) => {
    // 1️ Get product
    const product = await tx.product.findUnique({
      where: { id: product_id },
    });

    if (!product) return { success: false, message: "Product not found" };

    // 2️⃣ Check stock (just to warn the user, but do NOT decrement)
    if (product.stock < quantity) {
      return { success: false, message: `Only ${product.stock} left in stock` };
    }

    // 3️⃣ Get or create user's cart
    const cart = await tx.cart.upsert({
      where: { user_id: userId },
      update: {},
      create: { user_id: userId },
    });

    // 4️⃣ Check if product already in cart
    const cartItem = await tx.cartItem.findUnique({
      where: { cart_id_product_id: { cart_id: cart.id, product_id } },
    });

    if (cartItem) {
      // Update quantity
      await tx.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      await tx.cartItem.create({
        data: {
          cart_id: cart.id,
          product_id,
          quantity,
        },
      });
    }

    // ✅ Remove stock decrement here

    // Optional: notify farmer that someone added to cart
    await tx.notification.create({
      data: {
        user_id: product.farmer_id,
        title: "Product Added to Cart",
        message: `${product.product_name} has been added to a cart (${quantity})`,
        type: "ORDER",
        product_id: product.id,
      },
    });

    return { success: true, message: "Added to cart!" };
  });
};



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

