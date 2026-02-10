import { getUserMatches } from "@/lib/supabase/action/matches";
import { supabase } from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function MatcheFarmerAndUser({
  params,
}: {
  params: Promise<{ farmerId: string }>;
}) {
  const { farmerId } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const userMatches = await getUserMatches();
  console.log("userMatches : ", userMatches);

  // Check if user is matched with this farmer
  const match = userMatches.find(
    (m) =>
      (m.user1_id === userId || m.user2_id === userId) &&
      (m.user1_id === farmerId || m.user2_id === farmerId)
  );

  if (match) {
    redirect(`/chats/${match.id}`);
  }

  const { data: newMatch, error: insertError } = await supabase
    .from("matches")
    .insert([
      {
        user1_id: userId,
        user2_id: farmerId,
        created_at: new Date().toISOString(),
        is_active: true, // optional field
      },
    ])
    .select()
    .single(); // return the newly created row

  if (insertError || !newMatch) {
    console.error("Error creating match:", insertError);
    return <div>Could not create match</div>;
  }

  // Redirect to new chat
  redirect(`/chats/${newMatch.id}`);

  return <div>MatcheFarmerAndUser </div>;
}

export default MatcheFarmerAndUser;
