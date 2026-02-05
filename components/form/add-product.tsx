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
// import { supabase } from "@/lib/supabaseClient"; // MAKE SURE THIS EXISTS

export default function AddProduct() {
  const { user } = useUser();
  const id = user?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: "",
      // farmer_id: user?.id ?? "",
      image: "",
      price: 0,
      product_detail: "",
      status: "active",
    },
  });

  //  updated onsubmit function
  const onSubmit: SubmitHandler<z.infer<typeof AddProductSchema>> = async (
    values
  ) => {
    if (!id) return;

    setLoading(true);

    try {
      const file = values.image;

      // 1. Generate unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;

      // 2. Upload to Supabase Storage
      const { error } = await supabase.storage
        .from("Ethiopian-green-coffee-product-images")
        .upload(fileName, file);

      if (error) {
        throw new Error(error.message);
      }

      // 3. Get public URL
      const { data } = supabase.storage
        .from("Ethiopian-green-coffee-product-images")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      // 4. Send data to server action
      const added = await addProduct({
        farmer_id: id,
        values: {
          ...values,
          image: imageUrl,
        },
      });

      toast.success(added.message);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-green-600 font-bold text-white flex justify-center items-center cursor-pointer hover:bg-green-700 active:bg-green-800 rounded-md">
        <Plus className="mr-2 h-4 w-4" />
        Add New Product
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Upload a product image and details.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>Use a clear image</CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="product_detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="hover:bg-black/10 active:bg-black/25"
                >
                  {loading ? "Uploading..." : "Add Product"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
