import FarmerDashboard from "@/components/farmer/farmer_dashboard";
import Header from "@/components/header";
import { getAllOrderItems, getAllOrders } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";

async function FarmerPage() {
  const {userId} = await auth();

  if(!userId){
    return <div>Not Authenticated!</div>
  }
  
  const orderItems = await getAllOrderItems();
  const itemsData = orderItems?.data;

  console.log("orderItems : ",orderItems)
    return ( 
        <div>
            <div className="">
              <FarmerDashboard />
            </div>
        </div>
     );
}

export default FarmerPage;