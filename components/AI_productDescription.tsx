

// "use client";

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import AnimatedTypewriter from "./ai-clone/animated_type";
// import { useState } from "react";
// import { Volume2, Sparkles } from "lucide-react";
// import { toast } from "sonner";
// import { Product } from "@prisma/client";

// // interface Product {
// //   id: string;
// //   product_name: string;
// // }

// // 🔊 SPEAK FUNCTION
// const speak = (text: string) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US"; // later you can change to am-ET / om-ET
//   speechSynthesis.speak(utterance);
// };

// function AIProductDescription(product:Product) {
//   const [aiText, setAiText] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // const product: Product = {
//   //   id: "1",
//   //   product_name: "Yirgacheffe Coffee",
//   // };

//   // 🚀 GENERATE AI
//   const generateAI = async () => {
//     try {
//       setLoading(true);
//       const locale = "en";
//               const res = await fetch(`/${locale}/api/generate-description`,  {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: product.product_name,
//           category: "Coffee",
//         }),
//       });

//       if (!res.ok) throw new Error("API failed");

//       const data = await res.json();

//       setAiText(data.description);

//       console.log("Ai text : ",aiText)

//     } catch (error) {
//       console.error(error);
//       toast.error("AI failed to generate description");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <Card className="max-w-xl w-full shadow-xl rounded-2xl">
//         <CardHeader>
//           <CardTitle className="text-center text-xl">
//             🤖 AI Product Description
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* AI TEXT */}
//           {aiText ? (
//             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
//               <AnimatedTypewriter response={[aiText]} />
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center">
//               Click AI button to generate description
//             </p>
//           )}
//         </CardContent>

//         <CardFooter className="flex gap-3 justify-center">
//           {/* GENERATE BUTTON */}
//           <Button
//             onClick={generateAI}
//             className="bg-purple-600 text-white flex items-center gap-2"
//           >
//             <Sparkles size={18} />
//             {loading ? "Generating..." : "Generate AI"}
//           </Button>

//           {/* SPEAK BUTTON */}
//           <Button
//             onClick={() => aiText && speak(aiText)}
//             disabled={!aiText}
//             className="bg-green-600 text-white"
//           >
//             <Volume2 />
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// export default AIProductDescription;










"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import AnimatedTypewriter from "./ai-clone/animated_type";
import { useState } from "react";
import { Volume2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@prisma/client";

// 🔊 SPEAK FUNCTION
const speak = (text: string) => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // can add am-ET / om-ET later
  speechSynthesis.speak(utterance);
};

// 🔹 CREATE PROMPT USING REAL PRODUCT DATA
const createPrompt = (product: Product) => {
  return `
You are a coffee expert writing an engaging product description for online shoppers.

Include the following details in a friendly, persuasive way:
- Name: ${product.product_name}
- Price: $${product.price.toFixed(2)}
- Stock: ${product.stock} available
- Product details: ${product.product_detail || "No extra details"}
- Emphasize flavor, origin, and sustainability if known
- Include brewing tips and why it’s unique
Keep it concise, clear, and attractive for buyers.
`;
};

interface AIProductDescriptionProps {
  product: Product;
}

export default function AIProductDescription({ product }: AIProductDescriptionProps) {
  const [aiText, setAiText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    try {
      setLoading(true);
      const prompt = createPrompt(product);

      const locale = "en";
      const res = await fetch(`/${locale}/api/generate-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setAiText(data.description);
      console.log("AI generated text:", data.description);

    } catch (error) {
      console.error(error);
      toast.error("AI failed to generate description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="max-w-xl w-full shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">🤖 AI Product Description</CardTitle>
        </CardHeader>

        <CardContent>
          {aiText ? (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
              <AnimatedTypewriter response={[aiText]} />
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Click AI button to generate description
            </p>
          )}
        </CardContent>

        <CardFooter className="flex gap-3 justify-center">
          <Button
            onClick={generateAI}
            className="bg-purple-600 text-white flex items-center gap-2"
            disabled={loading}
          >
            <Sparkles size={18} />
            {loading ? "Generating..." : "Generate AI"}
          </Button>

          <Button
            onClick={() => speak(aiText!)}
            disabled={!aiText}
            className="bg-green-600 text-white"
          >
            <Volume2 />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}