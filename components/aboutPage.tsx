"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/checkTheme";
import Header from "@/components/header";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import LoaderBtn from "./loaderBtn";

export default function AboutPage({ cartQuantity }: { cartQuantity?: number }) {
  const { theme, toggleTheme } = useTheme();
  let language = theme;
  const router = useRouter();

  const ta = useTranslations("about");

  return (
    <div className="bg-gradient-to-b from-[#f5f3ef] to-white text-gray-800">
      {/* HERO */}

      <Header cartQuantity={cartQuantity} />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900">
            {ta("title")}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            {ta("definition")}
          </p>
          <LoaderBtn btnName={ta("find")} linkTo="/product" className="bg-green-800 cursor-pointer hover:bg-green-900 active:bg-green-400 "/>

        </motion.div>
      </section>

      <Separator />

      {/* ORIGIN STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-green-900 mb-4"></h2>
          <p className="text-gray-600 leading-relaxed">{ta("longDef")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-md border-green-200">
            <CardContent className="p-6 space-y-4">
              <p className="font-semibold text-green-800">{ta("sourcing")}</p>
              <p className="font-semibold text-green-800">{ta("quality")}</p>
              <p className="font-semibold text-green-800">{ta("relations")}</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold">{ta("builtfor")}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: ta("cardtitle1"),
                desc: ta("carddes1"),
              },
              {
                title: ta("cardtitle2"),
                desc: ta("carddes2"),
              },
              {
                title: ta("cardtitle3"),
                desc: ta("carddes3"),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-white text-gray-800">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FARMERS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-900">{ta("empower")}</h2>
          <p className="text-gray-600">{ta("digitaltools")}</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f3ef] py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-900">{ta("join")}</h2>
          <p className="text-gray-600">{ta("forb")}</p>
          <div className="flex justify-center gap-4">
          <LoaderBtn btnName={ta("btn1")} linkTo="/registration/farmer" className="bg-green-800 cursor-pointer hover:bg-green-900 active:bg-green-400 "/>
          <LoaderBtn btnName={ta("btn2")} linkTo="/product" className="bg-gray-100 border text-black cursor-pointer hover:bg-gray-300 active:bg-green-400 "/>

          </div>
        </motion.div>
      </section>
    </div>
  );
}

// {
//     language === "ENGLISH" ? " " :
//     language === "AMHARIC" ? " " :
//     language === "AFAN_OROMO" ? " " :""
// }
