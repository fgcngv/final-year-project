

// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "../ui/select";

// import { updateUserProfile } from "@/app/[locale]/actions/general";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Language } from "@prisma/client";

// // ✅ Schema
// const EditProfileSchema = z.object({
//   first_name: z.string().min(2),
//   last_name: z.string().min(2),
//   email: z.string().email(),
//   address: z.string().optional(),
//   language: z.string(),
// });

// type Props = {
//   userData: any;
// };

// export default function EditProfileForm({ userData }: Props) {
//   const { user } = useUser();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(EditProfileSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       address: "",
//       language: "ENGLISH",
//     },
//   });

//   // Prefill (IMPORTANT)
//   useEffect(() => {
//     if (userData) {
//       form.reset({
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         email: userData.email,
//         address: userData.address || "",
//         language: userData.language,
//       });
//     }
//   }, [userData, form]);

//   const onSubmit: SubmitHandler<
//     z.infer<typeof EditProfileSchema>
//   > = async (values) => {
//     if (!user?.id) return;

//     setLoading(true);

//     try {
//       const res = await updateUserProfile({
//         id: user.id,
//         values: {
//           ...values,
//           language: Language[values.language as keyof typeof Language],
//         },
//       });

//       if (!res.success) throw new Error(res.message);

//       toast.success(res.message);
//       router.refresh();
//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

//         <FormField
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="address"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="language"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Language</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ENGLISH">English</SelectItem>
//                   <SelectItem value="AMHARIC">Amharic</SelectItem>
//                   <SelectItem value="AFAN_OROMO">Afan Oromo</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" disabled={loading}>
//           {loading ? "Updating..." : "Update Profile"}
//         </Button>
//       </form>
//     </Form>
//   );
// }











"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../ui/alert-dialog";

import { updateUserProfile } from "@/app/[locale]/actions/general";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Language } from "@prisma/client";

// ✅ Schema
const EditProfileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  address: z.string().optional(),
  language: z.string(),
});

type Props = {
  userData: any;
};

export default function EditProfileForm({ userData }: Props) {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      language: "ENGLISH",
    },
  });

  // ✅ Prefill
  useEffect(() => {
    if (userData) {
      form.reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        address: userData.address || "",
        language: userData.language,
      });
    }
  }, [userData, form]);

  // 👉 Step 1: Open confirmation
  const onSubmit: SubmitHandler<
    z.infer<typeof EditProfileSchema>
  > = async (values) => {
    setPendingData(values);
    setOpenConfirm(true);
  };

  // 👉 Step 2: Confirm update
  const handleConfirmUpdate = async () => {
    if (!user?.id || !pendingData) return;

    setLoading(true);

    try {
      const res = await updateUserProfile({
        id: user.id,
        values: {
          ...pendingData,
          language:
            Language[
              pendingData.language as keyof typeof Language
            ],
        },
      });

      if (!res.success) throw new Error(res.message);

      toast.success(res.message);
      router.refresh();
      setOpenConfirm(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="AMHARIC">Amharic</SelectItem>
                    <SelectItem value="AFAN_OROMO">Afan Oromo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            Update Profile
          </Button>
        </form>
      </Form>

      {/* ✅ CONFIRMATION DIALOG */}
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm Profile Update
            </AlertDialogTitle>

            <AlertDialogDescription>
              You are about to update:
              <ul className="list-disc pl-4 mt-2 text-sm">
                <li>
                  Name: {pendingData?.first_name}{" "}
                  {pendingData?.last_name}
                </li>
                <li>Email: {pendingData?.email}</li>
                <li>Language: {pendingData?.language}</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Yes, Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}