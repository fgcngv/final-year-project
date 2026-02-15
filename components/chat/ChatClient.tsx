
"use client";

import { useEffect, useState, useRef } from "react";
import { User } from "@prisma/client";
import { StreamChat, Channel, Event } from "stream-chat";
import {
  getStreamUserToken,
  createOrGetChannel,
} from "@/lib/chatActions/stream";
import { ArrowRight, Video } from "lucide-react";
import Header from "../header";
import { toast } from "sonner";

interface ChatClientProps {
  otherUser: User;
  cartQuantity?:number
  unreadNotification?:number
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
  user_id: string;
}

export default function ChatClient({ otherUser,cartQuantity,unreadNotification }: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // SEND MESSAGE (optimistic)
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !channel) return;

    const tempId = crypto.randomUUID();
    const text = newMessage.trim();

    // Optimistic message
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        text,
        sender: "me",
        timestamp: new Date(),
        user_id: "me",
      },
    ]);

    setNewMessage("");

    try {
      const res = await channel.sendMessage({ text });

      // Replace temp message with real one
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? {
                id: res.message.id,
                text: res.message.text || "",
                sender: "me",
                timestamp: new Date(
                  res.message.created_at || new Date()
                ),
                user_id: res.message.user?.id || "",
              }
            : m
        )
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  }

  // INIT CHAT
  useEffect(() => {
    let chatClient: StreamChat;
    let chatChannel: Channel;

    async function initChat() {
      try {
        const { token, userId, userName, userImage } =
          await getStreamUserToken();

        chatClient = StreamChat.getInstance("v58enct5fzhv");

        await chatClient.connectUser(
          { id: userId!, name: userName, image: userImage },
          token
        );

        const { channelType, channelId } =
          await createOrGetChannel(otherUser.id);

        chatChannel = chatClient.channel(channelType!, channelId);
        await chatChannel.watch();

        const state = await chatChannel.query({ messages: { limit: 50 } });

        setMessages(
          state.messages.map((msg) => ({
            id: msg.id,
            text: msg.text || "",
            sender: msg.user?.id === userId ? "me" : "other",
            timestamp: new Date(msg.created_at || new Date()),
            user_id: msg.user?.id || "",
          }))
        );

        // Receiver-only listener
        const onNewMessage = (event: Event) => {
          if (!event.message) return;
        
          const msg = event.message; // ✅ local variable now known to exist
        
          // Ignore own messages
          if (msg.user?.id === userId) return;
        
          setMessages((prev) =>
            prev.some((m) => m.id === msg.id)
              ? prev
              : [
                  ...prev,
                  {
                    id: msg.id,
                    text: msg.text || "",
                    sender: "other",
                    timestamp: new Date(msg.created_at || new Date()),
                    user_id: msg.user?.id || "",
                  },
                ]
          );
        };
        

        chatChannel.on("message.new", onNewMessage);

        setClient(chatClient);
        setChannel(chatChannel);

        // Cleanup
        return () => {
          chatChannel.off("message.new", onNewMessage);
        };
      } catch (err) {
        console.error("Failed to initialize chat:", err);
      }
    }

    const cleanupPromise = initChat();

    return () => {
      cleanupPromise?.then((cleanup) => cleanup?.());
      chatClient?.disconnectUser();
    };
  }, [otherUser.id]);

  return (
    <div>
      <Header cartQuantity={cartQuantity} notification={unreadNotification} />

      <div className="flex justify-center items-center min-h-screen bg-[#F5EFE6] p-4 pt-20">
        <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-[#FFFDF8] rounded-2xl shadow-lg border border-[#D6C7B0] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-[#4B2E1E] text-[#FAF7F2] justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#7A4A2E] flex items-center justify-center">
                ☕
              </div>
              <div>
                <p className="font-semibold">{otherUser.first_name}</p>
                <p className="text-xs text-[#E7D8C6]">Coffee Partner</p>
              </div>
            </div>

            <button
              onClick={() =>
                toast.success("Hid kezi video call min yiseralehal!!")
              }
              className="p-3 rounded-full hover:bg-[#3B2316]"
            >
              <Video />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    msg.sender === "me"
                      ? "bg-[#6F4E37] text-white rounded-br-none"
                      : "bg-[#EDE4D5] rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[11px] opacity-70 text-right">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex gap-3 px-4 py-3 border-t"
          >
            <input
              className="flex-1 px-4 py-2 rounded-full border"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message…"
            />
            <button className="px-4 py-2 rounded-full bg-[#4B2E1E] text-white">
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
