import Profile from "@/components/buyer/profile";
import FarmerProfile from "@/components/farmer/FarmerProfile";
import Header from "@/components/header";
import { getRole } from "@/utils/role";
import { getFarmerById, getUserById } from "@/utils/services/admin";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllNotification } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";

async function FarmerProfileById(props: {
    params: Promise<{ id: string }>;
  }) {
    const {userId} = await auth();
    if(!userId) return <div>Not Authenticated!</div>

    const param = await props.params;

    const farmerData = await getFarmerById(param.id);
    const userData = await getUserById(param.id);
    const unread = await getAllNotification();
    const role = await getRole();

        const cart = await getCartByUserIdForCartQuantity(userId);
      
        let cartQuantity = 0;
        cart?.items?.forEach(item => {
          cartQuantity += item.quantity;
        });

    return ( 
        <div>
          <Header  cartQuantity={cartQuantity} notification={unread?.data?.length} />
          {
            role.toUpperCase() === "FARMER" && (
              <FarmerProfile isOwnPage={false} farmer={farmerData.data} />
            )
          }
          {
            role.toUpperCase() !=="FARMER" && (
              <Profile  isOwnPage={false} user={userData.data}/>
            )
          }
        </div>
     );
}

export default FarmerProfileById;