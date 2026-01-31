
// "use server";

// import { StreamChat } from "stream-chat";
// import { createClient } from "../supabase/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "../prisma";
// import { StreamClient } from "@stream-io/node-sdk";


// export async function getStreamUserToken() {
//   const supabase = await createClient();

//   const {userId} = await auth();

//   if (!userId) {
//     return { success: false, error: "User not authenticated" };
//   }

//   const userData = await prisma.user.findUnique({
//     where:{id:userId}
//   })

//   if (!userData) {
//     console.error("Error fetching user data");
//     throw new Error("Failed to fetch user data");
//   }

//   const serverClient = StreamChat.getInstance(
//     process.env.STREAM_API_KEY!,
//     process.env.STREAM_SECRET_KEY!
//   );

//   const token = serverClient.createToken(userId);

//   await serverClient.upsertUser({
//     id: userId,
//     name: userData.first_name,
//     image: userData.last_name || undefined,
//   });

//   return {
//     token,
//     userId: userId,
//     userName: userData.first_name,
//     userImage: userData.last_name || undefined,
//   };
// }

// export async function createOrGetChannel(otherUserId: string) {
//   const supabase = await createClient();

//   const {userId} = await auth();

//   if (!userId) {
//     return { success: false, error: "User not authenticated" };
//   }


//   const { data: matches, error: matchError } = await supabase
//     .from("matches")
//     .select("*")
//     .or(
//       `and(user1_id.eq.${userId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${userId})`
//     )
//     .eq("is_active", true)
//     .single();

//   if (matchError || !matches) {
//     throw new Error("Users are not matched. Cannot create chat channel.");
//   }

//   const sortedIds = [userId, otherUserId].sort();
//   const combinedIds = sortedIds.join("_");

//   let hash = 0;
//   for (let i = 0; i < combinedIds.length; i++) {
//     const char = combinedIds.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }

//   const channelId = `match_${Math.abs(hash).toString(36)}`;

//   const serverClient = StreamChat.getInstance(
//     process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//     process.env.STREAM_API_SECRET!
//   );

//     const otherUserData = await prisma.user.findUnique({
//         where:{id:otherUserId}
//     });

//   if (!otherUserData) {
//     console.error("Error fetching user data");
//     throw new Error("Failed to fetch user data");
//   }

//   const channel = serverClient.channel("messaging", channelId, {
//     members: [userId, otherUserId],
//     created_by_id: userId,
//   });

//   await serverClient.upsertUser({
//     id: otherUserId,
//     name: otherUserData.first_name,
//     image: otherUserData.last_name || undefined,
//   });

//   try {
//     await channel.create();
//     console.log("Channel created successfully:", channelId);
//   } catch (error) {
//     console.log("Channel creation error:", error);

//     if (error instanceof Error && !error.message.includes("already exists")) {
//       throw error;
//     }
//   }

//   return {
//     channelType: "messaging",
//     channelId,
//   };
// }



// export async function getStreamVideoToken(userId: string) {
//   const videoClient = new StreamClient(
//     process.env.STREAM_API_KEY!,
//     process.env.STREAM_SECRET_KEY!
//   );

//   return videoClient.createToken(userId);
// }
