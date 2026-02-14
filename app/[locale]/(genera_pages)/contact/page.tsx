export const dynamic = "force-dynamic";

import ContactForm from "@/components/contactPage";
import { getCartByUserId } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";

async function ContactPage() {
  let cartQuantity = 0;
  const {userId} = await auth();
  const cart = await getCartByUserId(userId || "");

   if(!cart || "error" in cart){
    return <div><ContactForm /></div>
   }
   
   cart?.items?.map((item)=>(
    cartQuantity += item?.quantity
   ));

  return ( 
    <div>
      <ContactForm cartQuantity={cartQuantity} />
    </div>
   );
}

export default ContactPage;