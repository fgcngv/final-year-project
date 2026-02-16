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

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    console.log("tx_ref : ",tx_ref)

    if (!tx_ref) {
      setStatus("Transaction reference missing!");
      console.error("Missing tx_ref in URL!");
      return;
    }

    setStatus("Fetching verification from server...");

    // fetch(`/api/chapa/verify?tx_ref=${tx_ref}`)
    //   .then(async (res) => {
    //     const data = await res.json();

    //     console.log("==== Chapa Verify Response ====");
    //     console.log("HTTP Status:", res.status);
    //     console.log("Response JSON:", data);
    //     console.log("TX_REF used:", tx_ref);
    //     console.log("===============================");

    //     if (data.success) {
    //       setStatus("Payment successful!");
    //     } else {
    //       setStatus("Payment failed! Check console for details.");
    //     }
    //   })
    //   .catch((err) => {
    //     setStatus("Verification error! Check console for details.");
    //     console.error("Fetch error:", err);
        
    //   });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4">{status}</h1>
      <p className="text-sm text-gray-600">
        Open the browser console to see detailed information about the payment verification.
      </p>
    </div>
  );
}
