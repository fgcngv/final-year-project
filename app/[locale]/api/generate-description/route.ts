

// export async function POST(req: Request) {
//     try {
//       const { name, category } = await req.json();
  
//       const prompt = `
//   Generate a short, simple product description for Ethiopian farmers.
  
//   Product: ${name}
//   Category: ${category}
  
//   Make it easy to understand and friendly.
//   `;
  
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//         //  "https://api-inference.huggingface.co/models/google/flan-t5-small",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${process.env.HF_TOKEN}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             inputs: prompt,
//           }),
//         }
//       );
  
//       const text = await response.text();
  
//       let data;
  
//       try {
//         data = JSON.parse(text);
//       } catch {
//         console.error("HF RAW RESPONSE:", text);
  
//         return Response.json({
//           description: "AI service not available right now.",
//         });
//       }
  
//       if (data?.error) {
//         return Response.json({
//           description: "AI is loading, please try again...",
//         });
//       }
  
//       const description =
//         data?.[0]?.generated_text ||
//         "Fresh Ethiopian coffee from local farmers.";
  
//       return Response.json({ description });
  
//     } catch (error) {
//       console.error("SERVER ERROR:", error);
  
//       return Response.json(
//         { description: "Server error" },
//         { status: 500 }
//       );
//     }
//   }




export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
  
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
  
      const text = await response.text();
  
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("HF RAW RESPONSE:", text);
        return Response.json({ description: "AI service not available right now." });
      }
  
      if (data?.error) {
        return Response.json({ description: "AI is loading, please try again..." });
      }
  
      const description = data?.[0]?.generated_text || "Fresh Ethiopian coffee from local farmers.";
      return Response.json({ description });
  
    } catch (error) {
      console.error("SERVER ERROR:", error);
      return Response.json({ description: "Server error" }, { status: 500 });
    }
  }