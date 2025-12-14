

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/checkTheme";
import Header from "@/components/header";

export default function AboutPage({cartQuantity}:{cartQuantity?:number}) {
        const { theme, toggleTheme } = useTheme();
        let language = theme;

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
            {
                language === "ENGLISH" ? "Ethiopian Green Coffee Marketplace " :
                language === "AMHARIC" ? "የኢትዮጵያ አረንጓዴ ቡና ገበያ " :
                language === "AFAN_OROMO" ? " Gabaa Buna Magariisa Itiyoophiyaa " : ""
            }
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
    
            {
                language === "ENGLISH" ? "Connecting Ethiopian coffee farmers directly with global buyers-transparent, ethical, and traceable from farm to market." :
                language === "AMHARIC" ? "የኢትዮጵያ የቡና ገበሬዎችን በቀጥታ ከዓለም አቀፍ ገዢዎች ጋር ማገናኘት - ግልጽ፣ ሥነ ምግባራዊ እና ከእርሻ ወደ ገበያ የሚተላለፍ " :
                language === "AFAN_OROMO" ? " Qonnaan bultoota buna Itoophiyaa kallattiin bittoota addunyaa waliin walqunnamsiisuu - iftoomina, naamusa, fi qonna irraa hanga gabaatti hordofamuu danda'u" :""
            }
          </p>
          <Button size="lg" className="bg-green-800 cursor-pointer hover:bg-green-900">
{
    language === "ENGLISH" ? " Explore Coffee Origins" :
    language === "AMHARIC" ? "የቡና ምንጮችን ያሳዩ " :
    language === "AFAN_OROMO" ? "Maddoota Bunaa Barbaadaa " :""
}
          </Button>
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
          <h2 className="text-3xl font-bold text-green-900 mb-4">

          </h2>
          <p className="text-gray-600 leading-relaxed">

            
 {
    language === "ENGLISH" ? "Ethiopia is the birthplace of Arabica coffee. For centuries,smallholder farmers have cultivated coffee in rich soils and unique microclimates. Our platform preserves this heritage while openingdirect digital access to global markets." :
    language === "AMHARIC" ? "ኢትዮጵያ የአራቢካ ቡና የትውልድ ቦታ ናት። ለብዙ መቶ ዘመናት አነስተኛ ገበሬዎች በበለጸገ አፈር እና ልዩ በሆኑ ማይክሮ የአየር ንብረት ውስጥ ቡና ያመርታሉ. የእኛ መድረክ ለአለም አቀፍ ገበያዎች ቀጥተኛ ዲጂታል መዳረሻ እያቀረበ ይህንን ቅርስ ይጠብቃል። " :
    language === "AFAN_OROMO" ? "Itoophiyaan bakka dhaloota buna Arabicaati. Jaarraa hedduudhaaf qonnaan bultoonni xixiqqaa biyyee badhaadhaa fi haala qilleensaa xiqqaa adda ta’e keessatti buna misoomsaa turaniiru. Waltajjiin keenya hambaa kana kan eegu yoo ta’u, gabaa addunyaatiif kallattiin dijitaalaa banaadha. " :""
}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-md border-green-200">
            <CardContent className="p-6 space-y-4">
              <p className="font-semibold text-green-800">
   {
    language === "ENGLISH" ? "🌍 Origin-based sourcing " :
    language === "AMHARIC" ? " 🌍 ከመነሻ ቦታ/ከምንጭ ማግኘት" :
    language === "AFAN_OROMO" ? "🌍 Iddoo Itti oomishamee kallattiidhan argattu! " :""
}
              </p>
              <p className="font-semibold text-green-800">
 {
    language === "ENGLISH" ? "☕ High-quality green beans " :
    language === "AMHARIC" ? "☕ ከፍተኛ ጥራት ያላቸው አረንጓዴ ቡና  " :
    language === "AFAN_OROMO" ? "☕ Buna Magariisa Qulqullina Ol'aanadhaan! " :""
}
              </p>
              <p className="font-semibold text-green-800">
 {
    language === "ENGLISH" ? " 🤝 Direct farmer relationships" :
    language === "AMHARIC" ? "🤝 ከገበሬዎች ጋር ቀጥታ ግንኙነቶች " :
    language === "AFAN_OROMO" ? "🤝 Qoteebultoota Waliin Hariiroo Kallattii qabna" :""
}
 </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold">
{
    language === "ENGLISH" ? " Built for Farmers. Trusted by Buyers." :
    language === "AMHARIC" ? "ለገበሬዎች የተሰራ። በገዢዎች የሚታመን. " :
    language === "AFAN_OROMO" ? "Qotee bultootaf kan hojjetame! Bitattootaf Amanamaa kan ta'e!" :""
}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparent Pricing",
                desc: "Farmers set fair prices. Buyers see full cost breakdowns.",
              },
              {
                title: "Traceability",
                desc: "Track coffee from farm, region, and harvest season.",
              },
              {
                title: "Secure Transactions",
                desc: "Modern payment systems with buyer & seller protection.",
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
          <h2 className="text-3xl font-bold text-green-900">
 {
    language === "ENGLISH" ? "Empowering Ethiopian Farmers " :
    language === "AMHARIC" ? "የኢትዮጵያ ገበሬዎችን ኃይል ማበረታታት " :
    language === "AFAN_OROMO" ? " Qonnaan Bultoota Itoophiyaa jajjabeessuu" :""
}
          </h2>
          <p className="text-gray-600">

   {
    language === "ENGLISH" ? "We give farmers digital tools to list coffee, manage orders, and reach international buyers — increasing income and sustainability. " :
    language === "AMHARIC" ? "እኛ ለገበሬዎች ቡናን ለመዝግብ፣ ትዕዛዞቻቸውን ለማስተዳደር እና ከአለም አቀፍ ገዢዎች ጋር ለመደራደር ዲጂታል መሣሪያዎችን እናቀርባለን — የገቢ እና የተከፋፈለ ማህበረሰብ ድጋፍን ይጨምራል። " :
    language === "AFAN_OROMO" ? " Qonnaan bultoonni buna galmeessuuf, ajaja isaanii akka bulchan, fi bitoota addunyaa waliin mari’achuuf meeshaalee dijitaalaa ni kennina — galii fi deeggarsa hawaasaa raabsame dabalatee." :""
}
          </p>
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
          <h2 className="text-3xl font-bold text-green-900">
{
    language === "ENGLISH" ? "Join the Ethiopian Coffee Revolution " :
    language === "AMHARIC" ? "የኢትዮጵያ ቡና አብዮት ይቀላቀሉ " :
    language === "AFAN_OROMO" ? "Nu waliin warraaqsa bunaa addunyaadhaf jedhutti dabalamaa! " :""
}
          </h2>
          <p className="text-gray-600">
{
    language === "ENGLISH" ? "Whether you’re a farmer or a buyer — start your journey with us. " :
    language === "AMHARIC" ? "ገበሬም ሆንክ ገዢ ከእኛ ጋር ጉዞህን ጀምር " :
    language === "AFAN_OROMO" ? "Qotee bulaas taatan Bitataas taatan Nu waliin imala Eegalaa!! " :""
}
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-green-800 cursor-pointer hover:bg-green-900">
{
    language === "ENGLISH" ? "Become a Farmer" :
    language === "AMHARIC" ? "ገበሬ ይሁኑ " :
    language === "AFAN_OROMO" ? " Qotee Bulaa ta'aa" :""
}
            </Button>
            <Button variant="outline" className="cursor-pointer">
{
    language === "ENGLISH" ? "Browse Coffee " :
    language === "AMHARIC" ? "ቡና ይመልከቱ " :
    language === "AFAN_OROMO" ? "Buna Ilaalaa " :""
}
            </Button>
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