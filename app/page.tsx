

import Header from "@/components/header";
import HomePage from "@/components/home-components/home";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAllProducts } from "./actions/products";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { getAllUsers } from "@/utils/services/admin";

export default async function Home() {
  // ✅ auth() is synchronous
  const { userId, sessionClaims } = await auth();

  // ✅ Handle unauthenticated users FIRST
  if (!userId) {
    redirect("/sign-in");
  }

  // ✅ Now it is safe to query Prisma
  const cart = await getCartByUserIdForCartQuantity(userId);

  let cartQuantity = 0;
  cart?.items?.forEach(item => {
    cartQuantity += item.quantity;
  });

  const user = await currentUser(); // safe now

  if (!user) {
    redirect("/sign-in");
  }

  const productsData = await getAllProducts();
  const role = sessionClaims?.metadata?.role;


  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    "";

  // ✅ Safe upsert
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email,
      address: "",
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      role: "BUYER",
    },
  });

  if (!productsData) {
    return <div>No products found</div>;
  }

  const unread = await getAllUnreadNotifications();

  return (
    <div className="pt-2">
      <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
      <HomePage products={productsData.data ?? []} role={role || "/"} />
    </div>
  );
}
