


// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { createClient } from "@supabase/supabase-js";

// export async function sendMessage(conversationId: string, content: string) {
//   const { userId, getToken } = await auth();
//   if (!userId) return { success: false, message: "Not authenticated" };

//   const token = await getToken({ template: "supabase" });
//   if (!token) return { success: false, message: "Failed to get JWT" };

//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       global: { headers: { Authorization: `Bearer ${token}` } },
//     }
//   );

//   const { data, error } = await supabase.from("messages").insert({
//     conversation_id: conversationId,
//     sender_id: userId,
//     content,
//   });

//   if (error) {
//     console.error("Supabase insert error:", error);
//     return { success: false, message: error.message };
//   }

//   return { success: true, message: "Message inserted", data };
// }




"use server";

import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function sendMessage(conversationId: string, content: string) {
    const role = await getRole();

  const { userId } = await auth();
  if (!userId) return { success: false, message: "Not authenticated" };

  // Use service_role key for server-side insert
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
  );

  const { data, error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: userId,
    sender_type: role.toLowerCase(),
    content,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, message: error.message };
  }

  return { success: true, message: "Message inserted", data };
}
