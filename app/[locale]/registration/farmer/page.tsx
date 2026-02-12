import FarmerRegistrationForm from "@/components/form/farmer_registration";
import { getRole } from "@/utils/role";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


async function FarmerRegistration() {
    const {userId} = await auth();
    if(!userId) redirect('/sign-in');

    const role = await getRole();
    console.log("role : ",role);

    if(role === "seller" || role=== "SELLER" || role === "farmer") redirect('/farmer');
    return ( 
        <div>
            {/* <FarmerRegistrationForm /> */}
            farmer profile page
        </div>
     );
}

export default FarmerRegistration;