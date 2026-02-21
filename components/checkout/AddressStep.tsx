"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, Building, Plus, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { z } from "zod";
import { addressSchema } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddress } from "@/app/[locale]/actions/order";
import { toast } from "sonner";
import { address_Type } from "@prisma/client";

export default function AddressStep() {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [showNewAddress, setShowNewAddress] = useState(false);

  type AddressFormValues = z.input<typeof addressSchema>;

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      country: "Ethiopia",
      postalCode: "",
      type: address_Type.HOME,
      isDefault: false,
    },
  });

  const onSubmit: SubmitHandler<AddressFormValues> = async (values) => {
    try {
      const parsedValues = addressSchema.parse(values);
      const res = await createAddress(parsedValues);
      if (res.error) {
        toast.error(res?.message);
      }

      toast.success(res?.message);
    } catch (error) {
      console.log("Catch error : ", error);
    }
    console.log(values);
  };

  return (
<Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
      <MapPin className="h-6 w-6 text-green-600" />
      Shipping Address
    </CardTitle>
    <p className="text-gray-600 dark:text-gray-400">
      Where should we deliver your coffee?
    </p>
  </CardHeader>

  <CardContent className="space-y-6">
    {/* Add New Address Toggle */}
    <Button
      type="button"
      variant="outline"
      className="w-full justify-start gap-2 border-dashed text-gray-900 dark:text-white border-gray-400 dark:border-gray-600"
      onClick={() => setShowNewAddress(!showNewAddress)}
    >
      <Plus className="h-4 w-4" />
      {showNewAddress ? "Cancel new address" : "Add new address"}
    </Button>

    {/* New Address Form */}
    {showNewAddress && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 animate-in fade-in"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tesfaye Lemma"
                        {...field}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+251 91 234 5678"
                        {...field}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex. Bole arabsa..."
                      {...field}
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex. Addis Abeba"
                        {...field}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      Region
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex. Amhara/Oromia..."
                        {...field}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex. 1000"
                        {...field}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800 dark:hover:bg-green-600">
            Save Address
          </Button>
        </form>
      </Form>
    )}
  </CardContent>
</Card>
  );
}
