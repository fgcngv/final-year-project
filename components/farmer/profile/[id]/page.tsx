import FarmerProfile from "@/components/farmer/FarmerProfile";
import { getFarmerById } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";

async function FarmerProfileById(props: {
    params: Promise<{ id: string }>;
  }) {
    const {userId} = await auth();
    if(!userId) return <div>Not Authenticated!</div>

    const param = await props.params;
    console.log(" parma : ",param.id)

    const farmerData = await getFarmerById(param.id);

    return ( 
        <div>
            <FarmerProfile isOwnPage={true} farmer={farmerData.data} />
        </div>
     );
}

export default FarmerProfileById;