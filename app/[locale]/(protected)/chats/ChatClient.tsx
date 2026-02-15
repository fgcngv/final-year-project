

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { User } from "@clerk/nextjs/server";

// interface ChatData {
//   id: string;
//   user: User;
//   lastMessage?: string;
//   lastMessageTime: string;
//   unreadCount: number;
// }

// interface ChatProps {
//   matches: ChatData[]
// }


// export default function ChatClient({ matches }: ChatProps) {
//   console.log("matchesmatchesmatches : ",matches)
//   const [chats] = useState(matches);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
  

//   function formatTime(timestamp: string) {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 1) return "Just now";
//     if (diffInHours < 24)
//       return date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     if (diffInHours < 48) return "Yesterday";
//     return date.toLocaleDateString();
//   }

//   const otherUserId = (matche:ChatData)=>{
     
//   }

//   // return (
//   //   <div>
//   //     {chats.map((chat: any) => (
//   //       <Link key={chat.id} href={`/chats/${chat.id}`}>
//   //         {chat.id}
//   //       </Link>
//   //     ))}
//   //   </div>
//   // );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">
//             Loading your matches...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto px-4 py-8">
//         <header className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Messages
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             {chats.length} conversation{chats.length !== 1 ? "s" : ""}
//           </p>
//         </header>

//         {chats.length === 0 ? (
//           <div className="text-center max-w-md mx-auto p-8">
//             <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="text-4xl">💬</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//               No conversations yet
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Start swiping to find matches and begin conversations!
//             </p>
//             <Link
//               href="/matches"
//               className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
//             >
//               Start Swiping
//             </Link>
//           </div>
//         ) : (
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//               {chats.map((chat:any, key:any) => (
//                 <Link
//                   key={key}
//                   href={`/chats/${chat.id}`}
//                   className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                 >
//                   <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//                     <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
//                       <img
//                         // src={chat.user.last_name}
//                         // alt={chat.user.first_name}
//                         src={chat.user1_id}
//                         alt={chat.user2_id}
//                         className="w-full h-full object-cover"
//                       />
//                       {chat.unreadCount > 0 && (
//                         <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
//                           {chat.unreadCount}
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0 ml-4">
//                       <div className="flex items-center justify-between mb-1">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
//                           {chat.user1_id}
//                         </h3>
//                         <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
//                           {formatTime(chat.user1_id)}
//                         </span>
//                       </div>

//                       <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                         {chat.user1_id}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Header from "@/components/header";
// import { User } from "@clerk/nextjs/server";

interface ChatData {
  id: string;
  user: User;
  lastMessage?: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ChatProps {
  matches: ChatData[]
  users?: User[]
  userId?:string
  headerQuantity?:number
  unreadNotifition?:number
}


export default function ChatClient({ matches,users,userId,headerQuantity,unreadNotifition }: ChatProps) {
  console.log("matchesmatchesmatches : ",matches)
  const [chats] = useState(matches);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

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

  const otherUserId = (matche:ChatData)=>{
     
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your matches...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <Header cartQuantity={headerQuantity} notification={unreadNotifition} />
      <div className="container mt-18 mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {chats.length} conversation{chats.length !== 1 ? "s" : ""}
          </p>
        </header>

        {chats.length === 0 ? (
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No conversations yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start swiping to find matches and begin conversations!
            </p>
            <Link
              href="/matches"
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
            >
              Start Swiping
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-g">
            <div className=" flex flex-col bg-gray-300 gap-2 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {chats.map((chat:any, key:any) => (
                <Link
                  key={key}
                  href={`/chats/${chat.id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {
                    users && userId && (
                        userId === chat.user1_id ? 
                        users.map((user)=>(
                          user.id === chat.user2_id && (
                            <div className="flex bg-white hover:bg-gray-200 items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src="/image.png"
                                // alt={chat.user.first_name}
                                className="w-full h-full object-cover"
                              />
                              {chat.unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                  {chat.unreadCount}
                                </div>
                              )}
                            </div>
        
                            <div className="flex-1 min-w-0 ml-4">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                  {user.first_name} {user.last_name}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                                  {formatTime(chat.created_at)}
                                </span>
                              </div>
        
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.email}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.language}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.role}
                              </p>
                            </div>
                          </div>
                          )

                        ))
                         :userId === chat.user2_id ?
                         users.map((user)=>(
                          user.id === chat.user1_id && (
                            <div className="flex  bg-white hover:bg-gray-200  items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src="/image.png"
                                // alt={chat.user.first_name}
                                className="w-full h-full object-cover"
                              />
                              {chat.unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                  {chat.unreadCount}
                                </div>
                              )}
                            </div>
        
                            <div className="flex-1 min-w-0 ml-4">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                  {user.first_name} {user.last_name}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                                  {formatTime(chat.created_at)}
                                </span>
                              </div>
        
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.email}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.language}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {user.role}
                              </p>
                            </div>
                          </div>
                          )

                        ))
                          :null
                   
                    )
                  }
                  {/* <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        // src={chat.user.last_name}
                        // alt={chat.user.first_name}
                        src={chat.user1_id}
                        alt={chat.user2_id}
                        className="w-full h-full object-cover"
                      />
                      {chat.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 ml-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {chat.user1_id}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {formatTime(chat.user1_id)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {chat.user1_id}
                      </p>
                    </div>
                  </div> */}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
