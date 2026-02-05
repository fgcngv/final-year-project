
import AboutPage from "@/components/aboutPage";
import { getCartByUserId } from "@/utils/services/cart";
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
  
  console.log(cartQuantity)
  return ( 
    <div>
      <AboutPage cartQuantity={cartQuantity} />
    </div>
   );
}

export default About;