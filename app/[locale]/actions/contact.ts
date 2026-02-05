"use server";

import prisma from "@/lib/prisma";
import { ContactFormSchema } from "@/lib/schema";

export async function AddContact(values: unknown) {
  const parsed = ContactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    await prisma.contact.create({
      data: parsed.data,
    });

    return { success: true };
  } catch (error) {
    console.error("Prisma error:", error);
    return {
      success: false,
      message: "Failed to submit message",
    };
  }
}
