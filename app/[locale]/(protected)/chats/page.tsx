
import { getChatPageData } from "@/utils/services/chat.service";
import ChatClient from "./ChatClient";
// import { getChatPageData } from "@/services/chat.service";

export default async function ChatPage() {
  const data = await getChatPageData();

  if ("error" in data) {
    return <div>Not Authenticated!</div>;
  }

  return (
    <ChatClient
      matches={data.matches}
      users={data.users}
      userId={data.userId}
      headerQuantity={data.cartQuantity}
      unreadNotifition={data.unread}
    />
  );
}