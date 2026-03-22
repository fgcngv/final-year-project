"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateClerk = async (role: string) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // calling clerkClient()
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    });

    return {
      success: true,
      message: "Role updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update role",
    };
  }
};