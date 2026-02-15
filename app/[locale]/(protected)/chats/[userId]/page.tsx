
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserMatches } from "@/lib/supabase/action/matches";
import ChatClient from "@/components/chat/ChatClient";
import prisma from "@/lib/prisma";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllNotification } from "@/utils/services/notification";


export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
    const { userId: chatId } = await params;
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  
    const matches = await getUserMatches();
    const match = matches.find((m) => m.id === chatId);
    if (!match) redirect("/chats");
  
    // Find the "other" user
    const otherUserId = match.user1_id === userId ? match.user2_id : match.user1_id;
    const otherUser = await prisma.user.findUnique({ where: { id: otherUserId } });
    // if (!otherUser) redirect("/chats");
    if (!otherUser) redirect("/chats");


          const cart = await getCartByUserIdForCartQuantity(userId);
        
          let cartQuantity = 0;
          cart?.items?.forEach(item => {
            cartQuantity += item.quantity;
          });
          
    
      const unread = await getAllNotification();
  
    return <ChatClient cartQuantity={cartQuantity} unreadNotification={unread?.data?.length}  otherUser={otherUser} />;
  }
  
