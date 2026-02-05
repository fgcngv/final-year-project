import UsersList from "@/components/usersList";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function Users() {
   const data = await prisma.user.findMany();
   const {userId} = await auth()
   console.log(userId)

   if(!userId){
    return
   }
   
    return ( 
        <div>
            <UsersList data={data} deleteType="user"  />
        </div>
     );
}

export default Users;