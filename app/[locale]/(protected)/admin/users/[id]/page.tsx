import UserDetail from "@/components/cards/userDetail";
import prisma from "@/lib/prisma";
import { getUserById } from "@/utils/services/admin";

async function UserById(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params?.id;
  const data = await getUserById(id as string);
  console.log("data ; ", data);

  if (!data || data.error || !data.data) {
    return <div>User Not Found!</div>;
  }

  console.log(data);
  console.log("params L ", params?.id);
  return (
    <div>
      <UserDetail param={params?.id} userData={data?.data} />
    </div>
  );
}

export default UserById;
