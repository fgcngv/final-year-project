import UsersList from "@/components/usersList";
import prisma from "@/lib/prisma";
import { getRole } from "@/utils/role";
import { getAllFarmers } from "@/utils/services/admin";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function Farmers() {
  const role = await getRole();

  console.log(role);
  const { data } = await getAllFarmers();
  if (!data) {
    return <div>Farmers Not Found!</div>;
  }
  console.log("farmer data :", data[0].id);
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    return;
  }

  return (
    <div>
      <UsersList data={data} deleteType="farmer" />
    </div>
  );
}

export default Farmers;
