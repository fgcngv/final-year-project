
// types/product.ts
import { Status } from "@prisma/client";

export interface Product {
  id: string;
  image: string;
  product_name: string;
  price: number;
  status: Status;
  createdAt: Date;
  description: {
    origion: string;
  } | null;
  orderItems: {
    quantity: number;
  }[];
}
