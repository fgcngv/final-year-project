


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Client({ matches }: any) {
  const [chats] = useState(matches);
  const router = useRouter();

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  }

  return (
    <div>
      {chats.map((chat: any) => (
        <Link key={chat.id} href={`/chats/${chat.id}`}>
          {chat.id}
        </Link>
      ))}
    </div>
  );
}
