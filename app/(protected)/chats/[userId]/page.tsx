
// "use client";

// import { getUserMatches } from "@/lib/supabase/action/matches";
// import { useUser } from "@clerk/nextjs";
// import { User } from "@prisma/client";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ChatConversationPage() {
//   const [otherUser, setOtherUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();
//   const params = useParams();
//   const chatId = params.userId as string; // ✅ FIX
//   console.log("param id : ",chatId)

//   const { user, isLoaded, isSignedIn } = useUser();

//   useEffect(() => {
//     if (!isLoaded) return;
//     if (!isSignedIn) {
//       router.push("/sign-in");
//       return;
//     }

//     async function loadUserData() {
//       try {
//         const userMatches = await getUserMatches();

//         const matchedUser = userMatches.find(
//           (match) => match.id === chatId
//         );

//         if (!matchedUser) {
//           router.replace("/chats");
//           return;
//         }

//         setOtherUser(matchedUser);
//       } catch (error) {
//         console.error(error);
//         router.replace("/chats");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadUserData();
//   }, [chatId, isLoaded, isSignedIn, router]);
// }







import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserMatches } from "@/lib/supabase/action/matches";
import ChatClient from "@/components/chat/ChatClient";
import prisma from "@/lib/prisma";

// export default async function Page({
//   params,
// }: {
//   params: { userId: string };
// }) {
//   const { userId:id } = await auth();
//   const { userId} = await params;

//   if (!id) redirect("/sign-in");

//   console.log("PARAMS:", params);


//   const matches = await getUserMatches(); // ✅ SAFE (server → server)

//   const match = matches.find((m) => m.id === userId);

// //   if (!match) redirect("/chats");
// if(!matches){
//     console.log("Not matches")
// }

//   return <ChatClient otherUser={match} />;
// }


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
    if (!otherUser) redirect("/chats");
  
    return <ChatClient otherUser={otherUser} />;
  }
  
