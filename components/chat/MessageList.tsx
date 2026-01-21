
// "use client";

// import { supabase } from "@/lib/supabaseClient";
// import { useEffect, useState } from "react";
// import MessageBubble from "./MessageBubble";

// type Message = {
//   id: string;
//   sender_id: string;
//   content: string | null;
//   image_url: string | null;
//   created_at: string;
// };

// export default function MessageList({
//   conversationId,
// }: {
//   conversationId: string;
// }) {
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     // initial load
//     const loadMessages = async () => {
//       const { data } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("conversation_id", conversationId)
//         .order("created_at", { ascending: true });

//       if (data) setMessages(data);
//     };

//     loadMessages();

//     // realtime
//     const channel = supabase
//       .channel("chat-" + conversationId)
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "messages",
//           filter: `conversation_id=eq.${conversationId}`,
//         },
//         (payload) => {
//           setMessages((prev) => [...prev, payload.new as Message]);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [conversationId]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//       {messages.map((msg) => (
//         <MessageBubble key={msg.id} message={msg} />
//       ))}
//     </div>
//   );
// }



import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function MessageList({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 1. Load existing messages
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };
    loadMessages();

    // 2. Realtime subscription
    const channel = supabase
      .channel("chat-" + conversationId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => setMessages((prev) => [...prev, payload.new as Message])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
