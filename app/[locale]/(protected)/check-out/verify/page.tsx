
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function ChapaVerifyPage() {
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



function verify() {
    return ( 
        <div>hello</div>
     );
}

export default verify;