










"use client";

import { PDescription } from "@/app/generated/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import AnimatedTypewriter from "./ai-clone/animated_type";
import { useState } from "react";

interface productDescriptionProps {
  id: string;
  data?: PDescription;
}

// --- AI Response Generator ---
function generateAIResponse(field: string, value: string) {
  switch (field) {
    case "origion":
      return `The product’s origin is described as: "${value}". This typically refers to the region where the coffee beans were grown. Origin plays a huge role in flavor, aroma, and bean quality—so understanding it helps consumers know what to expect from the cup profile.`;

    case "flavorNotes":
      return `The flavor notes are "${value}". These notes highlight the sensory experience customers can expect when enjoying this product.`;

    case "isSustainable":
      return `Sustainability details: "${value}". This indicates how environmentally conscious the production process is.`;

    case "processingMethod":
      return `The processing method is "${value}". This describes how the coffee was handled after harvest, which directly affects flavor and texture.`;

    case "roastLevel":
      return `Roast level: "${value}". This level of roasting shapes the bean’s flavor intensity, aroma, and acidity.`;

    default:
      return `Here are more details: "${value}".`;
  }
}

function AIProductDescription({ id, data }: productDescriptionProps) {
  const [aiResponse, setAiResponse] = useState(false);
  

  function handleAiResponse() {
    setAiResponse(true);
  }

  const aiText = data?.origion
    ? generateAIResponse("origion", data?.origion)
    : "";

  return (
    <div>
      <Card className="max-w-[945px]">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl text-center">
              <i>Ask AI about the product</i>
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            {/* User Question Bubble */}
            <div className="flex items-end justify-end">
          {
            aiResponse && (
              <div className="bg-gray-400 p-2 rounded-2xl">
              What about the origin of this product?
            </div>
            )
          }
            </div>

            {/* AI Response Display */}
            <div className="flex flex-col justify-start items-start mt-3">
              {aiResponse && (
                <AnimatedTypewriter response={[aiText]} />
              )}

              {/* Trigger Button */}
              <Button className="cursor-pointer mt-3" onClick={handleAiResponse}>
                Ask AI about the origin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIProductDescription;






















// "use client"

// import { PDescription } from "@/app/generated/prisma/client";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import AnimatedTypewriter from "./ai-clone/animated_type";
// import { useState } from "react";


// interface productDescriptionProps {
//     id:string,
//     data?:PDescription
// }

// const QuestionProps = [
//     {
//         question:""
//     }
// ]

// function AIProductDescription({id,data}:productDescriptionProps) {
//     const response = ["asdlkfjasdfasdfoiwefasdfa sdasdfa;lsj as dsdpu"];
//     const [aiResponse,setAiResponse] = useState(false);

//     function handleAiResponse(){
//         setAiResponse(true);
//     }


//     return (  
//         <div>
//             <Card className="max-w-[945px]">
//                 <CardHeader>
//                     <CardTitle>
//                     <h1>Questions May Raised</h1>
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div>
//                         <div  className=" flex items-end justify-end">
//                         <div className="bg-gray-400 p-1 rounded-2xl">
//                           What about the origin of this product?
//                         </div>
//                         </div>
//                         <div className="flex justify-start items-start flex-col">
//                         {data?.origion}
//                         {
//                           data?.origion &&   aiResponse && (
//                                 <AnimatedTypewriter response={[data?.origion]}/>
//                             )
//                         }
//                         <Button className="cursor-pointer"
//                             onClick={handleAiResponse}
//                         >
//                             What about the {data?.origion} of this product?</Button>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//         </div>
//     );
// }

// export default AIProductDescription;











// "use client";

// import { PDescription } from "@/app/generated/prisma/client";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import AnimatedTypewriter from "./ai-clone/animated_type";
// import { useState, useEffect } from "react";

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

//     case "end":
//       return "Not more response found!";

//     default:
//       return `Here are more details: "${value}".`;
//   }
// }

// function AIProductDescription({ id, data }: productDescriptionProps) {
//   const [aiResponse, setAiResponse] = useState(false);
//   const [increment, setIncrement] = useState<number | null>(null);

//   // Load increment from localStorage on mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("increment");
//       if (saved !== null) setIncrement(Number(saved));
//     }
//   }, []);

//   function handleAiResponse() {
//     setAiResponse(true);

//     setIncrement((prev) => {
//       let newValue;

//       if (prev === null) {
//         newValue = 0;
//       } else if (prev > 4) {
//         newValue = null;
//       } else {
//         newValue = prev + 1;
//       }

//       // Save to localStorage only in browser
//       if (typeof window !== "undefined") {
//         if (newValue === null) {
//           localStorage.removeItem("increment");
//         } else {
//           localStorage.setItem("increment", String(newValue));
//         }
//       }

//       return newValue;
//     });
//   }

//   const cloneArray = [
//     "origion",
//     "flavorNotes",
//     "isSustainable",
//     "processingMethod",
//     "roastLevel",
//     "end",
//   ];

//   const dataArray = [
//     data?.origion,
//     data?.flavorNotes,
//     data?.isSustainable,
//     data?.processingMethod,
//     data?.roastLevel,
//     "No more response",
//   ];

//   const aiText =
//     increment !== null && data?.origion
//       ? generateAIResponse(
//           cloneArray[increment],
//           dataArray[increment] as string
//         )
//       : "";

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
//               {aiResponse && (
//                 <div className="bg-gray-400 p-2 rounded-2xl">
//                   What about the origin of this product?
//                 </div>
//               )}
//             </div>

//             {/* AI Response */}
//             <div className="flex flex-col justify-start items-start mt-3">
//               {aiResponse && <AnimatedTypewriter response={[aiText]} />}

//               <Button className="cursor-pointer mt-3" onClick={handleAiResponse}>
//                 Ask AI about the origin
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default AIProductDescription;
