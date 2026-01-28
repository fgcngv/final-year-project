// import Header from "@/components/header";
// import HomePage from "@/components/home-components/home";
// import prisma from "@/lib/prisma";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getAllProducts } from "./actions/products";
// import { getUserLanguage } from "@/utils/services/admin";
// import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";

// export default async function Home() {
//   const { userId, sessionClaims } = await auth();

//   const cart = await getCartByUserIdForCartQuantity(userId ? userId : "");
//   let cartQuantity = 0;

//   cart?.items?.map((item) => (cartQuantity += item.quantity));
//   console.log("cartQuantity: ", cartQuantity);
//   const user = await currentUser();
//   const productsData = await getAllProducts();
//   // console.log("productsData : ",productsData.data)
//   let role = sessionClaims?.metadata?.role;

//   // console.log("sessionclaims ; ",role);

//   if (!user || !userId) {
//     // This usually means the route requires auth
//     // Redirect or return a 401
//     redirect("/sign-in");
//   }

//   const id = user.id;

//   // Clerk email (take primary or the first one)
//   const email =
//     user.primaryEmailAddress?.emailAddress ||
//     user.emailAddresses?.[0]?.emailAddress ||
//     "";

//   // Use Prisma upsert — safer & cleaner
//   const data = await prisma.user.upsert({
//     where: { id },
//     update: {}, // nothing to update for now
//     create: {
//       id,
//       email,
//       address: "",
//       first_name: user.firstName || "",
//       last_name: user.lastName || "",
//       role: "BUYER",
//     },
//   });

//   if (!productsData) {
//     return <div>Not products found in the database</div>;
//   }

//   return (
//     <div className="pt-2">
//       <Header cartQuantity={cartQuantity} />
//       <HomePage products={productsData?.data ?? []} role={role || "/"} />
//     </div>
//   );
// }







import Header from "@/components/header";
import HomePage from "@/components/home-components/home";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAllProducts } from "./actions/products";
import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import { getAllUsers } from "@/utils/services/admin";

export default async function Home() {
  // ✅ auth() is synchronous
  const { userId, sessionClaims } = await auth();

  // ✅ Handle unauthenticated users FIRST
  if (!userId) {
    redirect("/sign-in");
  }

  // ✅ Now it is safe to query Prisma
  const cart = await getCartByUserIdForCartQuantity(userId);

  let cartQuantity = 0;
  cart?.items?.forEach(item => {
    cartQuantity += item.quantity;
  });

  const user = await currentUser(); // safe now

  if (!user) {
    redirect("/sign-in");
  }

  const productsData = await getAllProducts();
  const role = sessionClaims?.metadata?.role;


  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    "";

  // ✅ Safe upsert
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email,
      address: "",
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      role: "BUYER",
    },
  });

  if (!productsData) {
    return <div>No products found</div>;
  }

  const unread = await getAllUnreadNotifications();

  return (
    <div className="pt-2">
      <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
      <HomePage products={productsData.data ?? []} role={role || "/"} />
    </div>
  );
}
