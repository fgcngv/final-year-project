import UserDetail from "@/components/cards/userDetail";
import prisma from "@/lib/prisma";
import { getUserById, getUserSessions } from "@/utils/services/admin";


async function UserById(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params?.id;
  const data = await getUserById(id as string);
  const userSession = await getUserSessions(id);

  console.log("data ; ", data);
  console.log("user session : ",userSession)

  if (!data || data.error || !data.data) {
    return <div>User Not Found!</div>;
  }


  return (
    <div>
      <UserDetail param={params?.id} userData={data?.data} userSession={userSession?.sessions} />
    </div>
  );
}

export default UserById;

