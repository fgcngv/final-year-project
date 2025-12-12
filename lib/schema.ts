import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const AddProductSchema = z.object({
    product_name:z.string().min(3,"product name should be greater than 2 character").trim(),
    // farmer_id:z.string(),
    price: z.coerce.number().positive(),
    image:z.string(),
    product_detail:z.string().max(500,"detail would be at most 500 character"),
    status: z.string().default("ACTIVE"),
});