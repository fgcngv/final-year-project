import { zodResolver } from "@hookform/resolvers/zod";
import { address_Type } from "@prisma/client";
import z, { email } from "zod";


export const AddProductSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Too long")
    // Allow letters (all languages), numbers, space, ., -
    .regex(/^[\p{L}\p{N}\s.,-]+$/u, "Invalid characters"),

  price: z.coerce
    .number()
    .min(1, "Price must be greater than 0"),

  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),

  product_detail: z
    .string()
    .max(500, "Description too long")
    .optional(),

  status: z.string(),

  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
});

// Allows letters, numbers, spaces, and common punctuation
const safeTextRegex = /^[a-zA-Z0-9\s,.'!?@#&()\-_:;/]+$/

// Name: letters + spaces + apostrophes + hyphens only
const nameRegex = /^[a-zA-Z\s'-]+$/

// Prevent emojis
const noEmojiRegex = /^[^\p{Extended_Pictographic}]+$/u

// export const ContactFormSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, { message: "Name must be at least 2 characters long" })
//     .max(50, { message: "Name must be less than 50 characters" })
//     .regex(nameRegex, {
//       message:
//         "Name can only contain letters, spaces, apostrophes, and hyphens",
//     })
//     .regex(noEmojiRegex, {
//       message: "Emoji are not allowed in name",
//     }),

//   email: z
//     .string()
//     .trim()
//     .min(1, { message: "Email is required" })
//     .max(100, { message: "Email is too long" })
//     .email({ message: "Please enter a valid email address" }),

//   subject: z
//     .string()
//     .trim()
//     .min(3, { message: "Subject must be at least 3 characters long" })
//     .max(100, { message: "Subject must be less than 100 characters" })
//     .regex(safeTextRegex, {
//       message: "Subject contains invalid characters",
//     })
//     .regex(noEmojiRegex, {
//       message: "Emoji are not allowed in subject",
//     }),

//   message: z
//     .string()
//     .trim()
//     .min(10, { message: "Message must be at least 10 characters long" })
//     .max(1000, { message: "Message must be less than 1000 characters" })
//     .regex(safeTextRegex, {
//       message: "Message contains invalid characters",
//     })
//     .regex(noEmojiRegex, {
//       message: "Emoji are not allowed in message",
//     }),
// })



export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message:
        "Name must be at least 2 characters long",
    })
    .max(50, {
      message:
        "Name must be less than 50 characters",
    })
    .regex(nameRegex, {
      message:
        "Name can only contain letters, spaces, apostrophes, and hyphens",
    })
    .regex(noEmojiRegex, {
      message:
        "Emoji are not allowed in name",
    }),

  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .max(100, {
      message: "Email is too long",
    })
    .email({
      message:
        "Please enter a valid email address",
    }),

  subject: z
    .string()
    .trim()
    .min(3, {
      message:
        "Subject must be at least 3 characters",
    })
    .max(100, {
      message:
        "Subject must be less than 100 characters",
    })
    .regex(safeTextRegex, {
      message:
        "Subject contains invalid characters",
    })
    .regex(noEmojiRegex, {
      message:
        "Emoji are not allowed in subject",
    }),

  message: z
    .string()
    .trim()
    .min(10, {
      message:
        "Message must be at least 10 characters long",
    })
    .max(1000, {
      message:
        "Message must be less than 1000 characters",
    })
    .regex(safeTextRegex, {
      message:
        "Message contains invalid characters",
    })
    .regex(noEmojiRegex, {
      message:
        "Emoji are not allowed in message",
    }),
});

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



const addressRegex = /^[a-zA-Z0-9\s,.'/#-]+$/

export const FarmerRegistrationSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, {
      message: "First name should be greater than 1 character",
    })
    .max(50, {
      message: "First name must be less than 50 characters",
    })
    .regex(nameRegex, {
      message:
        "First name can only contain letters, spaces, apostrophes, and hyphens",
    })
    .regex(noEmojiRegex, {
      message: "Emoji are not allowed in first name",
    }),

  last_name: z
    .string()
    .trim()
    .min(2, {
      message: "Last name should be greater than 1 character",
    })
    .max(50, {
      message: "Last name must be less than 50 characters",
    })
    .regex(nameRegex, {
      message:
        "Last name can only contain letters, spaces, apostrophes, and hyphens",
    })
    .regex(noEmojiRegex, {
      message: "Emoji are not allowed in last name",
    }),

  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .max(100, {
      message: "Email is too long",
    })
    .email({
      message: "Please enter a valid email address",
    }),

  address: z
    .string()
    .trim()
    .min(2, {
      message: "Address should be greater than 1 character",
    })
    .max(255, {
      message: "Address must be less than 255 characters",
    })
    .regex(addressRegex, {
      message: "Address contains invalid characters",
    })
    .regex(noEmojiRegex, {
      message: "Emoji are not allowed in address",
    }),

  image: z.any().optional(),

  language: z.enum(["ENGLISH"]).default("ENGLISH"),

  role: z.enum(["SELLER"]).default("SELLER"),

  status: z.enum(["ACTIVE"]).default("ACTIVE"),
})