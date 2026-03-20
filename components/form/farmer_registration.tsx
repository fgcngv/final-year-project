"use client";

import { useState } from "react";
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
import { AddProductSchema, FarmerRegistrationSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import z from "zod";
import { addProduct, registerFarmer } from "@/app/[locale]/actions/general";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { Plus } from "lucide-react";
import Header from "../header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Language, Role, Status } from "@prisma/client";


export default function FarmerRegistrationForm() {
  const { user } = useUser();
  const router = useRouter();

  const id = user?.id;
  
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FarmerRegistrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "", // added quantity
      language: "ENGLISH",
      role: "SELLER",
      status: "ACTIVE",
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof FarmerRegistrationSchema>
  > = async (values) => {
    if (!id) return;
    
    setLoading(true);

    try {

      // Register farmer (ENUM SAFE)
      const result = await registerFarmer({
        id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        address: values.address || null,
        language: Language[values.language as keyof typeof Language],
        role: Role[values.role as keyof typeof Role],
        status: Status[values.status as keyof typeof Status],
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Farmer registered successfully 🌱");
      form.reset();
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />

      <div className="container mt-15 mx-auto px-4 py-8 flex justify-center">
        <Card className="w-full max-w-3xl shadow-lg rounded-2xl border-green-100">
          <CardHeader className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-green-800">
              Farmer Registration
            </h2>
            <p className="text-sm text-muted-foreground">
              Please fill the form carefully and upload a clear image
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter first name"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter last name"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="example@email.com"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Village / City"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Language */}
                <FormField
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Choose language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ENGLISH">English</SelectItem>
                            <SelectItem value="AFAN_OROMO">
                              Afan Oromo
                            </SelectItem>
                            <SelectItem value="AMHARIC">Amharic</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="
    w-full h-12 text-lg font-semibold
    bg-green-700 hover:bg-green-800
    active:scale-[0.98] transition
  "
                >
                  {loading ? "Registering..." : "Register Farmer"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
