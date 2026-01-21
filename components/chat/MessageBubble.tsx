
// import { useAuth } from "@clerk/nextjs";

// export default function MessageBubble({ message }: any) {
//   const { userId } = useAuth();
//   const isMine = message.sender_id === userId;

//   return (
//     <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
//           isMine
//             ? "bg-green-600 text-white"
//             : "bg-white border"
//         }`}
//       >
//         {message.content}
//         {message.image_url && (
//           <img
//             src={message.image_url}
//             alt="image"
//             className="mt-2 rounded"
//           />
//         )}
//       </div>
//     </div>
//   );
// }







import { useAuth } from "@clerk/nextjs";

export default function MessageBubble({ message }: { message: any }) {
  const { userId } = useAuth();
  const isMine = message.sender_id === userId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMine ? "bg-green-600 text-white" : "bg-white border"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
