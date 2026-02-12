import FarmerProfile from "@/components/farmer/FarmerProfile";
import Header from "@/components/header";
import { getFarmerById } from "@/utils/services/admin";
import { getAllNotification } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";

async function FarmerProfileById(props: {
    params: Promise<{ id: string }>;
  }) {
    const {userId} = await auth();
    if(!userId) return <div>Not Authenticated!</div>

    const param = await props.params;
    console.log(" parma : ",param.id)

    const farmerData = await getFarmerById(param.id);
    const unread = await getAllNotification();

    return ( 
        <div>
          <Header notification={unread?.data?.length} />
            <FarmerProfile isOwnPage={false} farmer={farmerData.data} />
        </div>
     );
}

export default FarmerProfileById;