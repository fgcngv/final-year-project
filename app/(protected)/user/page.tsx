import { Table } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function UserPage() {
    const {userId} = await auth();
    const data = await prisma.user.findMany();
    console.log(data)
    if(!userId){
        redirect("sign-in")
    }
    return ( 
        <div>
           user page
        </div>
     );
}

export default UserPage;