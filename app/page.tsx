

import Header from "@/components/header";
import HomePage from "@/components/home-components/home";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAllProducts } from "./actions/products";
import { getUserLanguage } from "@/utils/services/admin";

export default async function Home() {
  const user = await currentUser();
  const productsData = await getAllProducts()
  // console.log("productsData : ",productsData.data)
  const { userId,sessionClaims } = await auth();
  let role = sessionClaims?.metadata?.role;



// console.log("sessionclaims ; ",role);

  if (!user || !userId) {
    // This usually means the route requires auth
    // Redirect or return a 401
    redirect("/sign-in")
   
  }

  const id = user.id;

  // Clerk email (take primary or the first one)
  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    "";

  // Use Prisma upsert — safer & cleaner
  const data = await prisma.user.upsert({
    where: { id },
    update: {}, // nothing to update for now
    create: {
      id,
      email,
      address: "",
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      role: "BUYER",
    },
  });

  if(!productsData){
    return <div>Not products found in the database</div>
  }




  return (
    <div className="pt-2">
      <Header />
      <HomePage products={productsData?.data ?? []} role={role || "/"} />
    </div>
  );
}
