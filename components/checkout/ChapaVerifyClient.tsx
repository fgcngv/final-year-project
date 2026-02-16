// // app/[locale]/(protected)/check-out/verify/ChapaVerifyClient.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function ChapaVerifyClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [status, setStatus] = useState("Verifying payment...");

//   useEffect(() => {
//     const tx_ref = searchParams.get("tx_ref");
//     if (!tx_ref) {
//       setStatus("Transaction reference missing!");
//       return;
//     }

//     fetch(`/api/chapa/verify?tx_ref=${tx_ref}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setStatus("Payment successful! Redirecting...");
//           setTimeout(() => router.push("/check-out/success"), 2000);
//         } else {
//           setStatus("Payment failed! Redirecting...");
//           setTimeout(() => router.push("/check-out/failed"), 2000);
//         }
//       })
//       .catch(() => {
//         setStatus("Verification error! Redirecting...");
//         setTimeout(() => router.push("/check-out/failed"), 2000);
//       });
//   }, [searchParams, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h1 className="text-xl font-bold">{status}</h1>
//     </div>
//   );
// }










"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChapaVerifyClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    const locale = searchParams.get("locale") || "en";

    if (!tx_ref) {
      setStatus("Transaction reference missing!");
      return;
    }

    const apiUrl = `/${locale}/api/chapa/verify?tx_ref=${tx_ref}`;
    setLogs((prev) => [...prev, `Calling API: ${apiUrl}`]);

    fetch(apiUrl)
      .then(async (res) => {
        const text = await res.text();
        setLogs((prev) => [...prev, `Raw response:\n${text}`]);

        // Try parsing JSON safely
        let data: any = null;
        try {
          data = JSON.parse(text);
          setLogs((prev) => [...prev, `Parsed JSON: ${JSON.stringify(data, null, 2)}`]);
        } catch (err) {
          setLogs((prev) => [...prev, `Failed to parse JSON: ${err}`]);
          setStatus("Verification failed! See logs below.");
          return;
        }

        setLogs((prev) => [...prev, `TX_REF used: ${tx_ref}`]);

        if (data.success) {
          setStatus("Payment successful!");
        } else {
          setStatus("Payment failed! Check logs below.");
        }
      })
      .catch((err) => {
        setStatus("Verification error! See logs below.");
        setLogs((prev) => [...prev, `Fetch error: ${err}`]);
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-4">{status}</h1>
      
      <div className="bg-white shadow rounded p-4 overflow-auto max-h-[60vh]">
        <h2 className="text-lg font-semibold mb-2">Debug Logs:</h2>
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {logs.join("\n")}
        </pre>
      </div>
    </div>
  );
}
