// import Header from "@/components/header";

// function ContactPage() {
//     return ( 
//         <div>
//             <Header />
//             <div className="pt-18">
//             contact page

//             </div>
//         </div>
//      );
// }

// export default ContactPage;



"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const router = useRouter();
  return (
    <div className="bg-gradient-to-b from-[#f5f3ef] to-white min-h-screen">
        <Header />
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Have questions about Ethiopian green coffee, partnerships, or our
            platform? We’re here to help.
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
            Let’s Talk Coffee ☕
          </h2>
          <p className="text-gray-600">
            We connect Ethiopian farmers with global buyers through transparency,
            quality, and trust.
          </p>

          <Card className="border-green-200 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <p>
                <span className="font-semibold text-green-800">
                  📍 Location:
                </span>{" "}
                Bahir Dar, Ethiopia
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  📧 Email:
                </span>{" "}
                birhanugezahegn099@gmail.com
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  📞 Phone:
                </span>{" "}
                +251 961 06 43 70
              </p>
              <p>
                <span className="font-semibold text-green-800">
                  🌍 Working Hours:
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
                Send us a message
              </h3>
              <h1><i>not functional for now</i></h1>

              <form className="space-y-4">
                <Input placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Input placeholder="Subject" />
                <Textarea
                  placeholder="Write your message..."
                  rows={5}
                  required
                />
                <Button className="w-full bg-green-800 hover:bg-green-900">
                  Send Message
                </Button>
              </form>
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
            Partner With Ethiopian Coffee Farmers
          </h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Whether you’re a farmer or buyer, our platform helps you grow
            sustainably and profitably.
          </p>
          <Button onClick={()=>router.push("/")} variant="outline" className="text-black cursor-pointer border-black">
            Get Started
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
