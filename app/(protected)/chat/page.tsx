// "use client";

// import MessageList from "@/components/chat/MessageList";
// import MessageInput from "@/components/chat/MessageInput";

// export default function ChatPage({
//   params,
// }: {
//   params: { conversationId: string };
// }) {
//   return (
//     <div className="flex border border-red-600  w-screen flex-col h-screen max-w-xl justify-center ">
//       <div className="border-b p-4 font-semibold">
//         Chat
//       </div>

//       <MessageList conversationId={params.conversationId} />
//       <MessageInput conversationId={params.conversationId} />
//     </div>
//   );
// }



"use client";

import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

export default function ChatPage({
  params,
}: {
  params: { conversationId: string };
}) {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen w-full py-8 px-4">
      {/* Chat container */}
      <div className="flex flex-col w-full max-w-xl h-[90vh] bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-green-600 text-white">
          <h1 className="text-lg font-semibold">Chat</h1>
          {/* Optional: add a close/minimize button or avatar here */}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <MessageList conversationId={params.conversationId} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t bg-white">
          <MessageInput conversationId={params.conversationId} />
        </div>
      </div>
    </div>
  );
}
