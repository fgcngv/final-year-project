import { zodResolver } from "@hookform/resolvers/zod";
import { address_Type } from "@prisma/client";
import z, { email } from "zod";

// export const AddProductSchema = z.object({
//     product_name:z.string().min(3,"product name should be greater than 2 character").trim(),
//     // farmer_id:z.string(),
//     price: z.coerce.number().positive(),
//     image:z.string(),
//     product_detail:z.string().max(500,"detail would be at most 500 character"),
//     status: z.string().default("ACTIVE"),
// });

// updated AddProductSchema
export const AddProductSchema = z.object({
  product_name:z.string().min(3,"product name should be greater than 2 character").trim(),
  // farmer_id:z.string(),
  price: z.coerce.number().positive(),
  image: z
  .any()
  .refine((file) => file instanceof File, "Image is required"),
  product_detail:z.string().max(500,"detail would be at most 500 character"),
  status: z.string().default("ACTIVE"),
});



export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  subject: z.string(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});


// address schema 

export const addressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  addressLine1: z.string().min(3),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  region: z.string().min(2),
  country: z.string().default("Ethiopia"),
  postalCode: z.string().optional(),
  // type: z.enum(["HOME", "WORK"]),
  type: z.nativeEnum(address_Type), 
  isDefault: z.boolean().default(false),
})
