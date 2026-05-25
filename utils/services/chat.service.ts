import { auth } from "@clerk/nextjs/server";
import { getUserMatches } from "@/lib/supabase/action/matches";
import { getAllUsers } from "@/utils/services/admin";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllNotification } from "@/utils/services/notification";

export async function getChatPageData() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "NOT_AUTHENTICATED" };
  }

  const matches = await getUserMatches();
  const users = await getAllUsers();
  const cart = await getCartByUserIdForCartQuantity(userId);
  const notifications = await getAllNotification();

  let cartQuantity = 0;
  cart?.items?.forEach(i => (cartQuantity += i.quantity));

  return {
    userId,
    matches,
    users: users?.data,
    cartQuantity,
    unread: notifications?.data?.length ?? 0,
  };
}