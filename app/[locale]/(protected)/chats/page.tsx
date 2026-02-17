
import { getUserMatches } from "@/lib/supabase/action/matches";
import ChatClient from "./ChatClient";
import { getAllUsers } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";
import { getAllNotification } from "@/utils/services/notification";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";

export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const {userId} = await auth();
  if(!userId) return <div>Not Authenticated!</div>

  const matches = await getUserMatches();
  const AllUsers = await getAllUsers();
  console.log("all users : ",AllUsers)

      const cart = await getCartByUserIdForCartQuantity(userId);
    
      let cartQuantity = 0;
      cart?.items?.forEach(item => {
        cartQuantity += item.quantity;
      });
      

  const unread = await getAllNotification();

  return  <ChatClient headerQuantity={cartQuantity} unreadNotifition={unread?.data?.length} matches={matches} userId={userId} users={AllUsers?.data} />

}
