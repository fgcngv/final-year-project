// import Header from "@/components/header";

import AboutPage from "@/components/aboutPage";
import { getCartByUserId } from "@/utils/services/cart";
import { auth } from "@clerk/nextjs/server";

// function AboutPage() {
//     return ( 
//         <div>
//             <Header />
//             <div className="pt-18">
//             about page

//             </div>
//         </div>
//      );
// }

// export default AboutPage;


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