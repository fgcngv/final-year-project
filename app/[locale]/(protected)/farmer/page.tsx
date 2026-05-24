// import FarmerDashboard from "@/components/farmer/farmer_dashboard";
// import Header from "@/components/header";
// import { getAllOrderItems, getAllOrders } from "@/utils/services/admin";
// import { auth } from "@clerk/nextjs/server";

import FarmerDashboard from "@/components/farmer/farmer_dashboard";
import { getFarmerDashboard } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";

// async function FarmerPage() {
//   const {userId} = await auth();

//   if(!userId){
//     return <div>Not Authenticated!</div>
//   }
  
//   const orderItems = await getAllOrderItems();
//   const itemsData = orderItems?.data;

//   console.log("orderItemsss : ",orderItems)
//     return ( 
//         <div>
//             <div className="">
//               <FarmerDashboard />
//             </div>
//         </div>
//      );
// }

// export default FarmerPage;



// import { getFarmerDashboard } from "@/lib/dashboard/farmer";
// import FarmerDashboard from "./FarmerDashboard";

export default async function Page() {
  const {userId:farmerId} = await auth();

  const data = await getFarmerDashboard(farmerId as string);

  console.log("data : ",data)
  

  return <FarmerDashboard data={data} />;
}