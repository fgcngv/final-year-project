

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import z from "zod";
import { addProduct } from "@/app/[locale]/actions/general";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddProduct() {
  const { user } = useUser();
  const id = user?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const tf = useTranslations("form");

  const form = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: "",
      image: undefined,
      price: 0,
      quantity: 0,
      product_detail: "",
      status: "active",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AddProductSchema>> = async (
    values
  ) => {
    if (!id) return;

    setLoading(true);

    try {
      const file = values.image;

      if (!file) {
        toast.error("Image is required");
        return;
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;

      // Upload image
      const { error } = await supabase.storage
        .from("Ethiopian-green-coffee-product-images")
        .upload(fileName, file);

      if (error) throw new Error(error.message);

      // Get public URL
      const { data } = supabase.storage
        .from("Ethiopian-green-coffee-product-images")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      // Send to backend
      const added = await addProduct({
        farmer_id: id,
        values: {
          ...values,
          image: imageUrl,
        },
      });

      toast.success(added.message);
      router.refresh();
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-green-600 font-bold text-white flex items-center hover:bg-green-700 active:bg-green-800 rounded-md">
        <Plus className="mr-2 h-4 w-4" />
        {tf("newProduct")}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{tf("newProduct")}</DialogTitle>
          <DialogDescription>
            {tf("productImageDescription")}
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader> {tf("productImageDescription")}</CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Product Name */}
                <FormField
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tf("productName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tf("productPrice")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
                <FormField
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tf("productQuantity")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image */}
                <FormField
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tf("productImage")}</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  name="product_detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tf("productDescription")}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? tf("Uploading") : tf("submit")}
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}