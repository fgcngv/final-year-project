










// "use client";

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import AnimatedTypewriter from "./ai-clone/animated_type";
// import { useState } from "react";
// import { PDescription } from "@prisma/client";
// import { Volume2 } from "lucide-react";
// import { toast } from "sonner";

// interface productDescriptionProps {
//   id: string;
//   data?: PDescription;
// }

// // --- AI Response Generator ---
// function generateAIResponse(field: string, value: string) {



//   switch (field) {
//     case "origion":
//       return `The product’s origin is described as: "${value}". This typically refers to the region where the coffee beans were grown. Origin plays a huge role in flavor, aroma, and bean quality—so understanding it helps consumers know what to expect from the cup profile.`;

//     case "flavorNotes":
//       return `The flavor notes are "${value}". These notes highlight the sensory experience customers can expect when enjoying this product.`;

//     case "isSustainable":
//       return `Sustainability details: "${value}". This indicates how environmentally conscious the production process is.`;

//     case "processingMethod":
//       return `The processing method is "${value}". This describes how the coffee was handled after harvest, which directly affects flavor and texture.`;

//     case "roastLevel":
//       return `Roast level: "${value}". This level of roasting shapes the bean’s flavor intensity, aroma, and acidity.`;

//     default:
//       return `Here are more details: "${value}".`;
//   }
// }

// const speakProductDetail = (text: string) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   speechSynthesis.speak(utterance);
// };


// function AIProductDescription({ id, data }: productDescriptionProps) {
//   const [aiResponse, setAiResponse] = useState(false);
  

//   function handleAiResponse() {
//     setAiResponse(true);
//   }

//   const aiText = data?.origion
//     ? generateAIResponse("origion", data?.origion)
//     : "";


//     // /////////////////////////


//     const [aiText2, setAiText] = useState<string | null>(null);
//     const [loadingAI, setLoadingAI] = useState<string | null>(null);

//     interface Product {
//       id:string,
//       product_name:string
//     }
    
//     const generateAI = async (product: Product) => {
//       try {
//         setLoadingAI(product.id);
//     const locale = "en";
//         const res = await fetch(`/${locale}/api/generate-description`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: product.product_name,
//             category: "Coffee",
//           }),
//         });
    
//         if (!res.ok) {
//           throw new Error("API failed");
//         }
    
//         const data = await res.json();
    
//         setAiText(data.description);
    
//       } catch (error) {
//         console.error(error); // 🔥 ADD THIS
//         toast.error("AI failed to generate description");
//       } finally {
//         setLoadingAI(null);
//       }
//     };
//   // /
//   const product ={
//     id:"adjj",
//     product_name:"Yirga chefe"
//   }

//   return (
//     <div>
//       <Card className="max-w-[945px]">
//         <CardHeader>
//           <CardTitle>
//             <h1 className="text-2xl text-center">
//               <i>Ask AI about the product</i>
//             </h1>
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div>
//             {/* User Question Bubble */}
//             <div className="flex items-end justify-end">
//           {
//             aiResponse && (
//               <div className="bg-gray-400 p-2 rounded-2xl">
//               What about the origin of this product?
//             </div>
//             )
//           }
//             </div>

//             {/* AI Response Display */}
//             <div className="flex flex-col justify-start items-start mt-3">
//               {/* {aiResponse && (
//                 <AnimatedTypewriter response={[aiText2 || ""]} />
//               )} */}

//                {aiResponse && (
//                 <AnimatedTypewriter response={[aiText2 || ""]} />
//               )}

//               {/* Trigger Button */}
//                 <div className="flex  mt-3 gap-1 justify-center items-center">
//                 <Button className="cursor-pointer" onClick={handleAiResponse}>
//                 Ask AI about the origin
//               </Button>
//               <Button onClick={()=>speakProductDetail(aiText)} className="cursor-pointer"><Volume2 /></Button>
//                 </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//         <Button
//   onClick={() => generateAI(product)}
//   className="bg-purple-600 text-white"
// >
//   {loadingAI === product.id ? "..." : "✨ AI"}
// </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// export default AIProductDescription;






















// // "use client"

// // import { PDescription } from "@/app/generated/prisma/client";
// // import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// // import { Button } from "./ui/button";
// // import AnimatedTypewriter from "./ai-clone/animated_type";
// // import { useState } from "react";


// // interface productDescriptionProps {
// //     id:string,
// //     data?:PDescription
// // }

// // const QuestionProps = [
// //     {
// //         question:""
// //     }
// // ]

// // function AIProductDescription({id,data}:productDescriptionProps) {
// //     const response = ["asdlkfjasdfasdfoiwefasdfa sdasdfa;lsj as dsdpu"];
// //     const [aiResponse,setAiResponse] = useState(false);

// //     function handleAiResponse(){
// //         setAiResponse(true);
// //     }


// //     return (  
// //         <div>
// //             <Card className="max-w-[945px]">
// //                 <CardHeader>
// //                     <CardTitle>
// //                     <h1>Questions May Raised</h1>
// //                     </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                     <div>
// //                         <div  className=" flex items-end justify-end">
// //                         <div className="bg-gray-400 p-1 rounded-2xl">
// //                           What about the origin of this product?
// //                         </div>
// //                         </div>
// //                         <div className="flex justify-start items-start flex-col">
// //                         {data?.origion}
// //                         {
// //                           data?.origion &&   aiResponse && (
// //                                 <AnimatedTypewriter response={[data?.origion]}/>
// //                             )
// //                         }
// //                         <Button className="cursor-pointer"
// //                             onClick={handleAiResponse}
// //                         >
// //                             What about the {data?.origion} of this product?</Button>
// //                         </div>
// //                     </div>
// //                 </CardContent>
// //             </Card>

// //         </div>
// //     );
// // }

// // export default AIProductDescription;











// // "use client";

// // import { PDescription } from "@/app/generated/prisma/client";
// // import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// // import { Button } from "./ui/button";
// // import AnimatedTypewriter from "./ai-clone/animated_type";
// // import { useState, useEffect } from "react";

// // interface productDescriptionProps {
// //   id: string;
// //   data?: PDescription;
// // }

// // // --- AI Response Generator ---
// // function generateAIResponse(field: string, value: string) {
// //   switch (field) {
// //     case "origion":
// //       return `The product’s origin is described as: "${value}". This typically refers to the region where the coffee beans were grown. Origin plays a huge role in flavor, aroma, and bean quality—so understanding it helps consumers know what to expect from the cup profile.`;

// //     case "flavorNotes":
// //       return `The flavor notes are "${value}". These notes highlight the sensory experience customers can expect when enjoying this product.`;

// //     case "isSustainable":
// //       return `Sustainability details: "${value}". This indicates how environmentally conscious the production process is.`;

// //     case "processingMethod":
// //       return `The processing method is "${value}". This describes how the coffee was handled after harvest, which directly affects flavor and texture.`;

// //     case "roastLevel":
// //       return `Roast level: "${value}". This level of roasting shapes the bean’s flavor intensity, aroma, and acidity.`;

// //     case "end":
// //       return "Not more response found!";

// //     default:
// //       return `Here are more details: "${value}".`;
// //   }
// // }

// // function AIProductDescription({ id, data }: productDescriptionProps) {
// //   const [aiResponse, setAiResponse] = useState(false);
// //   const [increment, setIncrement] = useState<number | null>(null);

// //   // Load increment from localStorage on mount
// //   useEffect(() => {
// //     if (typeof window !== "undefined") {
// //       const saved = localStorage.getItem("increment");
// //       if (saved !== null) setIncrement(Number(saved));
// //     }
// //   }, []);

// //   function handleAiResponse() {
// //     setAiResponse(true);

// //     setIncrement((prev) => {
// //       let newValue;

// //       if (prev === null) {
// //         newValue = 0;
// //       } else if (prev > 4) {
// //         newValue = null;
// //       } else {
// //         newValue = prev + 1;
// //       }

// //       // Save to localStorage only in browser
// //       if (typeof window !== "undefined") {
// //         if (newValue === null) {
// //           localStorage.removeItem("increment");
// //         } else {
// //           localStorage.setItem("increment", String(newValue));
// //         }
// //       }

// //       return newValue;
// //     });
// //   }

// //   const cloneArray = [
// //     "origion",
// //     "flavorNotes",
// //     "isSustainable",
// //     "processingMethod",
// //     "roastLevel",
// //     "end",
// //   ];

// //   const dataArray = [
// //     data?.origion,
// //     data?.flavorNotes,
// //     data?.isSustainable,
// //     data?.processingMethod,
// //     data?.roastLevel,
// //     "No more response",
// //   ];

// //   const aiText =
// //     increment !== null && data?.origion
// //       ? generateAIResponse(
// //           cloneArray[increment],
// //           dataArray[increment] as string
// //         )
// //       : "";

// //   return (
// //     <div>
// //       <Card className="max-w-[945px]">
// //         <CardHeader>
// //           <CardTitle>
// //             <h1 className="text-2xl text-center">
// //               <i>Ask AI about the product</i>
// //             </h1>
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent>
// //           <div>
// //             {/* User Question Bubble */}
// //             <div className="flex items-end justify-end">
// //               {aiResponse && (
// //                 <div className="bg-gray-400 p-2 rounded-2xl">
// //                   What about the origin of this product?
// //                 </div>
// //               )}
// //             </div>

// //             {/* AI Response */}
// //             <div className="flex flex-col justify-start items-start mt-3">
// //               {aiResponse && <AnimatedTypewriter response={[aiText]} />}

// //               <Button className="cursor-pointer mt-3" onClick={handleAiResponse}>
// //                 Ask AI about the origin
// //               </Button>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// // export default AIProductDescription;














"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import AnimatedTypewriter from "./ai-clone/animated_type";
import { useState } from "react";
import { Volume2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  product_name: string;
}

// 🔊 SPEAK FUNCTION
const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // later you can change to am-ET / om-ET
  speechSynthesis.speak(utterance);
};

function AIProductDescription() {
  const [aiText, setAiText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const product: Product = {
    id: "1",
    product_name: "Yirgacheffe Coffee",
  };

  // 🚀 GENERATE AI
  const generateAI = async () => {
    try {
      setLoading(true);
      const locale = "en";
              const res = await fetch(`/${locale}/api/generate-description`,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.product_name,
          category: "Coffee",
        }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setAiText(data.description);

      console.log("Ai text : ",aiText)

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
          <CardTitle className="text-center text-xl">
            🤖 AI Product Description
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* AI TEXT */}
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
          {/* GENERATE BUTTON */}
          <Button
            onClick={generateAI}
            className="bg-purple-600 text-white flex items-center gap-2"
          >
            <Sparkles size={18} />
            {loading ? "Generating..." : "Generate AI"}
          </Button>

          {/* SPEAK BUTTON */}
          <Button
            onClick={() => aiText && speak(aiText)}
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

export default AIProductDescription;