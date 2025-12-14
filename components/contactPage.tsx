

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import z from "zod";
import { ContactFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { AddContact } from "@/app/actions/contact";
import { useTheme } from "./checkTheme";

export default function ContactForm({cartQuantity}:{cartQuantity?:number}) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const {theme,toggleTheme} = useTheme();
    let language = theme;

    type ContactFormValues = z.infer<typeof ContactFormSchema>;
    const form =  useForm<ContactFormValues>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        }
    });

    async function onSubmit(values: ContactFormValues) {
        setLoading(true);
      
        const res = await AddContact(values);
      
        if (res.success) {
          toast.success("Your message was submitted successfully!");
          form.reset();
        } else {
          toast.error(res.message);
        }
      
        setLoading(false);
      }
      

  return (
    <div className="bg-gradient-to-b from-[#f5f3ef] to-white min-h-screen">
        <Header cartQuantity={cartQuantity} />
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
            {
              language === "ENGLISH" ? " 📞 Contact Us" :
              language === "AMHARIC" ? " 📞 ያግኙን" :
              language === "AFAN_OROMO" ? " 📞 Nu Qunnamaa " : ""
            }
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">

            {
              language === "ENGLISH" ? "Have questions about Ethiopian green coffee, partnerships, or our platform? We’re here to help." :
              language === "AMHARIC" ? " ስለ ኢትዮጵያ አረንጓዴ ቡና፣ አጋርነቶች ወይም መድረካችን ጥያቄዎች ካሉዎት፣ እኛ ለመርዳት እዚህ ነን።" :
              language === "AFAN_OROMO" ? " Waa'ee Buna Magariisa Itiyoophiyaa irratti Gaaffii Qabduu? Nuti isin Gargaaruf Waltajjiin Keenya Banaadha! " : ""
            }
          </p>
        </motion.div>
      </section>

      <Separator />

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
          <h2 className="text-3xl font-bold text-green-900">
            {
              language === "ENGLISH" ? "  Let’s Talk Coffee ☕" :
              language === "AMHARIC" ? " በቡና ላይ እንነጋገር ☕" :
              language === "AFAN_OROMO" ? " Bunarratti Haa Haasofnu☕ " : ""
            }
          </h2>
          <p className="text-gray-600">
            .
            {
              language === "ENGLISH" ? " We connect Ethiopian farmers with global buyers through transparency,quality, and trust" :
              language === "AMHARIC" ? " የኢትዮጵያ ገበሬዎችን ከአለም አቀፍ ገዢዎች ጋር በግልጽነት፣ በጥራት እና በመተማመን እናገናኛለን" :
              language === "AFAN_OROMO" ? " Qotee bultoota Itiyoophiyaa fayyadamtoota bunaa addunyaarra jiran waliin bifa iftoomina,amanamummaa fi qulqullina qabuun wal qunnamsiifna " : ""
            }
          </p>

          <Card className="border-green-200 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <p>
                <span className="font-semibold text-green-800">
                  {
              language === "ENGLISH" ? " 📍 Location:" :
              language === "AMHARIC" ? " 📍 አድራሻ:" :
              language === "AFAN_OROMO" ? "📍 Argama " : ""
            }
                </span>{" "}
                {
              language === "ENGLISH" ? " Bahir Dar, Ethiopia" :
              language === "AMHARIC" ? " ባህር ዳር፣ ኢትዮጵያ" :
              language === "AFAN_OROMO" ? " Baahir Daar, Itoophiyaa " : ""
            }
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  📧 Email:
                </span>{" "}
                birhanugezahegn099@gmail.com
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  
                  {
              language === "ENGLISH" ? " 📞 Phone:" :
              language === "AMHARIC" ? " 📞 ስልክ" :
              language === "AFAN_OROMO" ? " 📞 Lakk Bilbilaa " : ""
            }
                </span>{" "}
                +251 961 06 43 70
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  {
              language === "ENGLISH" ? " 🌍 Working Hours:" :
              language === "AMHARIC" ? " 🌍 የስራ ሰዓት" :
              language === "AFAN_OROMO" ? "🌍 Yeroo Hojii " : ""
            }
                </span>{" "}
                Mon – Fri, 9:00 AM – 6:00 PM (EAT)
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
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-green-900">
                {
              language === "ENGLISH" ? " Send us a message" :
              language === "AMHARIC" ? " መልእክት ላኩልን።" :
              language === "AFAN_OROMO" ? " Yaada ykn Ergaa " : ""
            }
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your Email" {...field} />
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
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer font-bold bg-green-800 hover:bg-green-900"
        >
         {
           language === "ENGLISH" ? loading ? "Submitting..." : "Send Message" :
           language === "AMHARIC" ? loading ? "በመላክ ላይ... " : " መልዕክት ላክ" : 
           language === "AFAN_OROMO" ? loading ? "Ergaa jira..." : "Ergi" : ""
         }
        </Button>
      </form>
    </Form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 text-white py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-6 px-6"
        >
          <h2 className="text-3xl font-bold">
            {
              language === "ENGLISH" ? " Partner With Ethiopian Coffee Farmers" :
              language === "AMHARIC" ? " ከኢትዮጵያ ቡና ገበሬዎች ጋር አጋር" :
              language === "AFAN_OROMO" ? " Qonnaan bultoota Buna Itoophiyaa Waliin Michuu Ta'aa " : ""
            }
          </h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            {
              language === "ENGLISH" ? " Whether you’re a farmer or buyer, our platform helps you grow sustainably and profitably." :
              language === "AMHARIC" ? "ገበሬም ሆኑ ገዢ፣ የእኛ መድረክ ዘላቂ እና ትርፋማ በሆነ መንገድ እንዲያድጉ ያግዝዎታል።" :
              language === "AFAN_OROMO" ? " Qonnaan bulaa yookiin bitaa yoo taatan waltajjiin keenya itti fufiinsaan bu’aa argamsiisuun akka guddattaniif sin gargaara. " : ""
            }
          </p>
          <Button disabled={loading} onClick={()=>router.push("/")} variant="outline" className="text-black cursor-pointer border-black">
            {
              language === "ENGLISH" ? " Get Started" :
              language === "AMHARIC" ? " መጀመር" :
              language === "AFAN_OROMO" ? " Eegalaa " : ""
            }
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
