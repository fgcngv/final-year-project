
// "use client"


// import Image from "next/image";
// import { useState } from "react";
// import ChatMessage from "./chatMessage";
// import ChatForm from "@/components/chat/chatForm";
// import Header from "@/components/header";

// export default function Home()  {
//   const [messages,setMessages] = useState<{sender: string,message:string}[]>([]);

//   const [username,setUsername] = useState("");

//   const handleSendMessage = (message:string)=>{
//     console.log(message)
//   }

//  return(
//   <div className="flex mt-24 justify-center w-full">
//     <Header />
//     {
//         <div className="w-full max-w-3xl mx-auto">
//         <h1 className=" p-4 mb-4 text-2xl font-bold">Room: 1</h1>
//          <div className="h-[500px] overflow-y-auto p-4 bg-gray-200 border-2 rounded-lg">
//            {
//             messages.map((msg,index)=>(
//               <ChatMessage key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender === username} />
//             ))
//           }
//          </div>
//          <ChatForm onSendMessage={handleSendMessage} />
//       </div>
//     }
//   </div>
//  )
// }

function ChatPage() {
    return ( 
        <div>chat page</div>
     );
}

export default ChatPage;