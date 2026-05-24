// utils/services/user.ts
console.log("USER SERVICE FILE LOADED");
import prisma from "@/lib/prisma";

export async function getUserById(id: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      return {
        success: false,
        error: true,
        message: "User with this id not found!",
      };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: "Something went wrong!",
    };
  }
}