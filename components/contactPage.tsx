

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { ContactFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { AddContact } from "@/app/[locale]/actions/contact";
import { useTheme } from "./checkTheme";
import { useTranslations } from "next-intl";
import LoaderBtn from "./loaderBtn";

export default function ContactForm({
  cartQuantity,
}: {
  cartQuantity?: number;
}) {

  const t = useTranslations('contact');
  const tf = useTranslations('form');
  const tb = useTranslations('button');

  const router = useRouter();
  const [loading, setLoading] = useState(false);


  type ContactFormValues = z.infer<typeof ContactFormSchema>;
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setLoading(true);

    const res = await AddContact(values);

    if (res.success) {
      toast.success(t('success'));
      form.reset();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  }

  // return (
  //   <div className="bg-gradient-to-b from-[#f5f3ef] to-white min-h-screen">
  //     <Header cartQuantity={cartQuantity} />
  //     {/* HERO */}
  //     <section className="max-w-7xl mx-auto px-6 py-20 text-center">
  //       <motion.div
  //         initial={{ opacity: 0, y: 30 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.7 }}
  //         className="space-y-6"
  //       >
  //         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
  //             📞 {t('contactus')}
  //         </h1>
  //         <p className="max-w-2xl mx-auto text-gray-600">
  //           {t('question')}
  //         </p>
  //       </motion.div>
  //     </section>

  //     <Separator />

  //     {/* CONTENT */}
  //     <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
  //       {/* CONTACT INFO */}
  //       <motion.div
  //         initial={{ opacity: 0, x: -30 }}
  //         whileInView={{ opacity: 1, x: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.6 }}
  //         className="space-y-6"
  //       >
  //         <h2 className="text-3xl font-bold text-green-900">
  //         ☕ { t('talk')}
  //         </h2>
  //         <p className="text-gray-600">
  //           .
  //           {t('weconnect')}
  //         </p>

  //         <Card className="border-green-200 shadow-sm">
  //           <CardContent className="p-6 space-y-4">
  //             <p>
  //               <span className="font-semibold text-green-800">
  //               📍 { t('location')}
  //               </span>{" "}
  //               {t('place')}
  //             </p>
  //             <p>
  //               <span className="font-semibold text-green-800">📧 Email:</span>{" "}
  //               birhanugezahegn099@gmail.com
  //             </p>
  //             <p>
  //               <span className="font-semibold text-green-800">
  //               📞 { t('phone')}
  //               </span>{" "}
  //               +251 961 06 43 70
  //             </p>
  //             <p>
  //               <span className="font-semibold text-green-800">
  //               🌍 { t('workinghours')}
  //               </span>{" "}
  //              {t('hour')}
  //             </p>
  //           </CardContent>
  //         </Card>
  //       </motion.div>

  //       {/* CONTACT FORM */}
  //       <motion.div
  //         initial={{ opacity: 0, x: 30 }}
  //         whileInView={{ opacity: 1, x: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.6 }}
  //       >
  //         <Card className="shadow-md">
  //           <CardContent className="p-6 space-y-6">
  //             <h3 className="text-xl font-bold text-green-900">
  //               {t('sendmes')}
  //             </h3>

  //             <Form {...form}>
  //               <form
  //                 onSubmit={form.handleSubmit(onSubmit)}
  //                 className="space-y-4"
  //               >
  //                 {/* Name */}
  //                 <FormField
  //                   control={form.control}
  //                   name="name"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Name</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder={tf('name')} {...field} />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />

  //                 {/* Email */}
  //                 <FormField
  //                   control={form.control}
  //                   name="email"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Email</FormLabel>
  //                       <FormControl>
  //                         <Input
  //                           type="email"
  //                           placeholder={tf('email')}
  //                           {...field}
  //                         />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />

  //                 {/* Subject */}
  //                 <FormField
  //                   control={form.control}
  //                   name="subject"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Subject</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder={tf('subject')} {...field} />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />

  //                 {/* Message */}
  //                 <FormField
  //                   control={form.control}
  //                   name="message"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Message</FormLabel>
  //                       <FormControl>
  //                         <Textarea
  //                           placeholder={tf('message')}
  //                           rows={5}
  //                           {...field}
  //                         />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />

  //                 <Button
  //                   type="submit"
  //                   className="w-full cursor-pointer font-bold bg-green-800 hover:bg-green-900"
  //                 >
  //                   {
  //                     loading ? tb('submitting') : tb('submit')
  //                   }

  //                 </Button>
  //               </form>
  //             </Form>
  //           </CardContent>
  //         </Card>
  //       </motion.div>
  //     </section>

  //     {/* CTA */}
  //     <section className="bg-green-900 text-white py-16">
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.95 }}
  //         whileInView={{ opacity: 1, scale: 1 }}
  //         viewport={{ once: true }}
  //         className="text-center space-y-6 px-6"
  //       >
  //         <h2 className="text-3xl font-bold">
  //           {t('partner')}
  //         </h2>
  //         <p className="text-green-100 max-w-2xl mx-auto">
  //           {t('helps')}
  //         </p>
  //         <LoaderBtn btnName={tb('getstarted')} className="text-black cursor-pointer hover:bg-gray-300 active:bg-gray-400  bg-gray-200 border-black" linkTo="/"/>
  //       </motion.div>
  //     </section>
  //   </div>
  // );

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#f5f3ef] to-white
        dark:from-[#1a120b] dark:to-[#0f0a06]
        text-gray-800 dark:text-[#f5f5dc]
        transition-colors duration-500
      "
    >
      <Header cartQuantity={cartQuantity} />
  
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-400 transition-colors">
            📞 {t("contactus")}
          </h1>
  
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            {t("question")}
          </p>
        </motion.div>
      </section>
  
      <Separator className="dark:bg-[#3c2a21]" />
  
      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-400">
            ☕ {t("talk")}
          </h2>
  
          <p className="text-gray-600 dark:text-gray-300">
            {t("weconnect")}
          </p>
  
          <Card
            className="
              border border-green-200 dark:border-[#3c2a21]
              shadow-sm
              bg-white dark:bg-[#1f140d]
              transition-colors
            "
          >
            <CardContent className="p-6 space-y-4">
              <p>
                <span className="font-semibold text-green-800 dark:text-green-400">
                  📍 {t("location")}
                </span>{" "}
                {t("place")}
              </p>
  
              <p>
                <span className="font-semibold text-green-800 dark:text-green-400">
                  📧 Email:
                </span>{" "}
                birhanugezahegn099@gmail.com
              </p>
  
              <p>
                <span className="font-semibold text-green-800 dark:text-green-400">
                  📞 {t("phone")}
                </span>{" "}
                +251 961 06 43 70
              </p>
  
              <p>
                <span className="font-semibold text-green-800 dark:text-green-400">
                  🌍 {t("workinghours")}
                </span>{" "}
                {t("hour")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
  
        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className="
              shadow-md
              bg-white dark:bg-[#1f140d]
              border border-gray-200 dark:border-[#3c2a21]
              transition-colors
            "
          >
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-400">
                {t("sendmes")}
              </h3>
  
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tf("name")}
                            className="
                              bg-white dark:bg-[#2b1c12]
                              border-gray-300 dark:border-[#3c2a21]
                              text-black dark:text-[#f5f5dc]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={tf("email")}
                            className="
                              bg-white dark:bg-[#2b1c12]
                              border-gray-300 dark:border-[#3c2a21]
                              text-black dark:text-[#f5f5dc]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tf("subject")}
                            className="
                              bg-white dark:bg-[#2b1c12]
                              border-gray-300 dark:border-[#3c2a21]
                              text-black dark:text-[#f5f5dc]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={tf("message")}
                            className="
                              bg-white dark:bg-[#2b1c12]
                              border-gray-300 dark:border-[#3c2a21]
                              text-black dark:text-[#f5f5dc]
                            "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <Button
                    type="submit"
                    className="
                      w-full font-bold
                      bg-green-800 hover:bg-green-900
                      dark:bg-green-700 dark:hover:bg-green-600
                      text-white transition-colors
                    "
                  >
                    {loading ? tb("submitting") : tb("submit")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
  
      {/* CTA */}
      <section className="bg-green-900 dark:bg-[#2b1c12] text-white py-16 transition-colors">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-6 px-6"
        >
          <h2 className="text-3xl font-bold">
            {t("partner")}
          </h2>
  
          <p className="text-green-100 dark:text-gray-300 max-w-2xl mx-auto">
            {t("helps")}
          </p>
  
          <LoaderBtn
            btnName={tb("getstarted")}
            linkTo="/"
            className="
              bg-gray-200 hover:bg-gray-300
              dark:bg-[#3c2a21] dark:hover:bg-[#5a3d2b]
              text-black dark:text-white
              border border-black dark:border-[#5a3d2b]
              transition-colors
            "
          />
        </motion.div>
      </section>
    </div>
  );
}
