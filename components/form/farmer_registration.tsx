
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
import Header from "../header";

export default function FarmerRegistrationForm() {
  const { user } = useUser();
  const id = user?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: "",
      image: "",
      price: 0,
      quantity: 0, // added quantity
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
      form.reset(); // optional: reset form after success
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };



  return (
<div className="flex justify-center items-center h-screen">
    <Header />

<Card className="max-w-2xl ">
    <CardHeader>Use a clear image</CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frist Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="tex" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
</div>

  );
}
