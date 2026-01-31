

"use server";

import { auth } from "@clerk/nextjs/server";
// import { UserProfile } from "@/app/profile/page";
import { createClient } from "../server";
// import { createClient } from "../supabase/server";

interface UserPreferences {
  gender_preference?: string[];
  [key: string]: unknown;
}

export async function getPotentialMatches(): Promise<any[]> {
  const supabase:any = await createClient();

  const {userId} = await auth();

  if (!userId) throw new Error("Not authenticated.");


    const { data: matches, error } = await supabase
    .from("matches")
    .select("*")
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq("is_active", true);


  if (error) throw new Error("Failed to fetch potential matches");




  return matches;
}


export async function getUserMatches() {
  const supabase = await createClient();
  const {userId} = await auth();

  if (!userId) throw new Error("Not authenticated.");

  const { data: matches, error } = await supabase
  .from("matches")
  .select("*")
  .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
  .eq("is_active", true);

console.log("SERVER matches:", matches);
console.log("SERVER error:", error);


  if (error) throw new Error("Failed to fetch matches");


  for (const match of matches || []) {
    const otherUserId =
      match.user1_id === userId ? match.user2_id : match.user1_id;

  }

  return matches;
}