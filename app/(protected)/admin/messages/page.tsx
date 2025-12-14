import Header from "@/components/header";
import { getAllMessages } from "@/utils/services/admin";

async function Messages() {
    const messages = await getAllMessages();
    console.log("messages : ",messages)
    return ( 
        <div>
            <div className="h-screen flex justify-center items-center">
            Messages
            </div>
        </div>
     );
}

export default Messages;