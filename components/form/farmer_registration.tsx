
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { FarmerRegistrationSchema } from "@/lib/schema";
import { registerFarmer } from "@/app/[locale]/actions/general";
import { toast } from "sonner";
import { Language, Role, Status } from "@prisma/client";
import Header from "../header";
import { updateClerk } from "@/app/[locale]/actions/updateClerkMD";

export default function FarmerRegistrationForm() {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [useClerkData, setUseClerkData] = useState(false);

  const id = user?.id;

  const form = useForm({
    resolver: zodResolver(FarmerRegistrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      language: "ENGLISH",
      role: "SELLER",
      status: "ACTIVE",
    },
  });

  // Autofill from Clerk
  useEffect(() => {
    if (useClerkData && user) {
      form.setValue("first_name", user.firstName || "");
      form.setValue("last_name", user.lastName || "");
      form.setValue("email", user.primaryEmailAddress?.emailAddress || "");
    }
  }, [useClerkData, user, form]);

  const onSubmit: SubmitHandler<
    z.infer<typeof FarmerRegistrationSchema>
  > = async (values) => {
    if (!id || !user) return;

    setLoading(true);

    try {
      //  Use Clerk data if selected
      const finalData = useClerkData
        ? {
            ...values,
            first_name: user.firstName || "",
            last_name: user.lastName || "",
            email: user.primaryEmailAddress?.emailAddress || "",
          }
        : values;

      const result = await registerFarmer({
        id,
        first_name: finalData.first_name,
        last_name: finalData.last_name,
        email: finalData.email,
        address: finalData.address || null,
        language: Language[finalData.language as keyof typeof Language],

        //  FORCE ROLE
        role: Role.SELLER,

        status: Status.ACTIVE,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      //  Updating Clerk role
      await updateClerk("farmer");

      toast.success("Farmer registered successfully");
      form.reset();
      router.push("/");
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
              Fill the form or use your account information
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/*  Clerk Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={useClerkData}
                    onChange={(e) => setUseClerkData(e.target.checked)}
                  />
                  <label className="text-sm text-gray-600">
                    Use my account information
                  </label>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={useClerkData}
                            placeholder="First name"
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
                            disabled={useClerkData}
                            placeholder="Last name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email + Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={useClerkData}
                            type="email"
                            placeholder="email@example.com"
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
                          <Input {...field} placeholder="Village / City" />
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
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
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
                  className="w-full h-12 text-lg bg-green-700 hover:bg-green-800"
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
