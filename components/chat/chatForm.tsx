
"use client"

import { useState } from "react";

function ChatForm({onSendMessage}:{onSendMessage:(message:string)=>void}) {
    const [message,setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(message.trim() !==""){
            onSendMessage(message);
            setMessage("");
        }
    }
    return ( 
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <input type="text" placeholder="Type your message here..." className="flex p-1 px-4 border rounded-l-2xl" onChange={handleSubmit} />
            <button type="submit" className="bg-blue-600 p-1 rounded-r-xl font-bold cursor-pointer hover:bg-blue-700 active:bg-blue-800 border">Send</button>
        </form>
     );
}

export default ChatForm;