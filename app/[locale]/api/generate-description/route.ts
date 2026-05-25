
export async function POST(req: Request) {
    try {
      const { id, product_name, price, stock, product_detail } = await req.json();
  
      // 🔹 Full AI prompt including all relevant info
      const prompt = `
  Generate a short, engaging product description for an Ethiopian online coffee shop.
  
  Product Name: ${product_name}
  Price: ${price} Ethiopian Birr
  Stock: ${stock} units available
  Details: ${product_detail || "No additional details provided."}
  
  The description should highlight:
  - Flavor profile
  - Origin and quality
  - Sustainability or uniqueness if possible
  - Encourage the customer to buy
  Keep it concise, appealing, and suitable for an online product page.
  `;
  
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 150 } }),
        }
      );
  
      const text = await response.text();
      console.log("HF RAW RESPONSE:", text);
  
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        return Response.json({ description: text || "AI service not available right now." });
      }
  
      if (data?.error?.includes("loading")) {
        return Response.json({ description: "AI is loading, please try again..." });
      }
  
      const description = data?.[0]?.generated_text?.trim() || "Fresh Ethiopian coffee from local farmers.";
     console.log(" ffffff ffff  ; ", description)
      return Response.json({ description });
    } catch (error) {
      console.error("SERVER ERROR:", error);
      return Response.json({ description: "Server error" }, { status: 500 });
    }
  }






// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { prompt } = body;

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "Prompt required" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/google/flan-t5-large",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const err = await response.text();

//       console.log("HF ERROR:", err);

//       return NextResponse.json(
//         { error: "HF failed" },
//         { status: 500 }
//       );
//     }

//     const result = await response.json();

//     const generated =
//       result?.[0]?.generated_text ||
//       "No AI description generated.";

//     return NextResponse.json({
//       description: generated,
//     });

//   } catch (error) {
//     console.log("SERVER ERROR:", error);

//     return NextResponse.json(
//       { error: "Server failed" },
//       { status: 500 }
//     );
//   }
// }