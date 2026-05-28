"use server";

import prisma from "@/lib/prisma";
import { ContactFormSchema } from "@/lib/schema";

export const AddContact = async (
  rawData: unknown
) => {
  try {
    // SERVER-SIDE VALIDATION
    const validated =
      ContactFormSchema.parse(rawData);

    const contact =
      await prisma.contact.create({
        data: validated,
      });

    return {
      success: true,
      data: contact,
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message:
        error?.message ||
        "Failed to send message",
    };
  }
};