

// import Header from "@/components/header";
// import HomePage from "@/components/home-components/home";
// import prisma from "@/lib/prisma";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { getAllProducts } from "./actions/products";
// import { getCartByUserIdForCartQuantity } from "@/utils/services/cart";
// import { getAllUnreadNotifications } from "@/utils/services/notification";
// import { getAllUsers } from "@/utils/services/admin";
// import { useTranslations } from "next-intl";


// export default async function Home() {
//   // const t = useTranslations('home');
//   // auth() is synchronous
//   const { userId, sessionClaims } = await auth();

//   // Handle unauthenticated users FIRST
//   if (!userId) {
//     redirect("/sign-in");
//   }

//   //  Now it is safe to query Prisma
//   const cart = await getCartByUserIdForCartQuantity(userId);

//   let cartQuantity = 0;
//   cart?.items?.forEach(item => {
//     cartQuantity += item.quantity;
//   });

//   const user = await currentUser(); // safe now

//   if (!user) {
//     redirect("/sign-in");
//   }

//   const productsData = await getAllProducts();
//   const role = sessionClaims?.metadata?.role;


//   const email =
//     user.primaryEmailAddress?.emailAddress ||
//     user.emailAddresses?.[0]?.emailAddress ||
//     "";

//   // ✅ Safe upsert
//   await prisma.user.upsert({
//     where: { id: user.id },
//     update: {},
//     create: {
//       id: user.id,
//       email,
//       address: "",
//       first_name: user.firstName || "",
//       last_name: user.lastName || "",
//       role: "BUYER",
//     },
//   });

//   if (!productsData) {
//     return <div>No products found</div>;
//   }

//   const unread = await getAllUnreadNotifications();
//   return (
//     <div className="pt-2">
//       <div>
//         hello
//       </div>
//       <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
//       <HomePage products={productsData.data ?? []} role={role || "/"} />
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
import { useTranslations } from "next-intl";


export default async function Home() {
  const { userId, sessionClaims } = await auth();

  let cartQuantity = 0;
  let role = undefined;
  let unreadCount = 0;

  let user = null;

  // ✅ Only run user logic if logged in
  if (userId) {
    user = await currentUser();

    if (user) {
      const cart = await getCartByUserIdForCartQuantity(userId);

      cart?.items?.forEach((item) => {
        cartQuantity += item.quantity;
      });

      const unread = await getAllUnreadNotifications();
      unreadCount = unread?.data?.length ?? 0;

      role = sessionClaims?.metadata?.role;

      const email =
        user.primaryEmailAddress?.emailAddress ||
        user.emailAddresses?.[0]?.emailAddress ||
        "";

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
    }
  }

  const productsData = await getAllProducts();

  if (!productsData) {
    return <div>No products found</div>;
  }

  const unread = await getAllUnreadNotifications();

  return (
    <div className="pt-2">
      <div>
        hello
      </div>
      <Header notification={unread?.data?.length} cartQuantity={cartQuantity} />
      <HomePage products={productsData.data ?? []} role={role || "/"} />
    </div>
  );
}
