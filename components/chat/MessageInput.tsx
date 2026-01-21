

// "use client";

// import { sendMessage } from "@/app/actions/chat";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function MessageInput({ conversationId }: { conversationId: string }) {
//   const [text, setText] = useState("");

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const res = await sendMessage(conversationId, text);

//     if (!res?.success) {
//       toast.error(res?.message || "Failed to send message");
//       console.error(res);
//     } else {
//       toast.success(res.message);
//       setText(""); // clear input only on success
//     }
//   };

//   return (
//     <div className="border-t p-3 flex gap-2">
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
//       />
//       <button
//         onClick={handleSend}
//         className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
//       >
//         Send
//       </button>
//     </div>
//   );
// }







"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/app/actions/chat";

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;

    setLoading(true);
    const res = await sendMessage(conversationId, text);
    setLoading(false);

    if (!res?.success) {
      toast.error(res?.message || "Failed to send message");
      console.error(res);
    } else {
      toast.success(res.message);
      setText(""); // clear input only on success
    }
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
        disabled={loading}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-green-600 text-white px-4 rounded hover:bg-green-700 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
