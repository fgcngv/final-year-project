export const dynamic = "force-dynamic";

import AboutPage from "@/components/aboutPage";
import { getCartByUserId } from "@/utils/services/cart";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { auth } from "@clerk/nextjs/server";

async function About() {
  let cartQuantity = 0;
  const {userId} = await auth();
  const cart = await getCartByUserId(userId || "");
  if(!cart || "error" in cart){
    return <div> <AboutPage /></div>
  }
 
  cart?.items.map((item)=>(
    cartQuantity += item?.quantity
  ));
  
       const unread = await getAllUnreadNotifications();
 
  return ( 
    <div>
      <AboutPage notification={unread?.data?.length} cartQuantity={cartQuantity} />
    </div>
   );
}

export default About;