

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";


// export default function VerifyingPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const tx_ref = searchParams.get("tx_ref");
//     if (!tx_ref) {
//       router.replace("/check-out/failed");
//       return;
//     }

//     async function verify() {
//       const res = await fetch(`/api/chapa/verify?tx_ref=${tx_ref}`);
//       const data = await res.json();


//       console.log("data : ",data)

//       if (data.success) {
//         router.replace("/check-out/success");
//       } else {
//         router.replace("/check-out/failed");
//       }
//     }

//     verify();
//   }, [router]);

//   return <p>Verifying your payment...</p>;
// }






export const dynamic = "force-dynamic";
"use client";


import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");

  useEffect(() => {
    if (!tx_ref) {
      router.replace("/check-out/failed");
      return;
    }

    async function verify() {
      const locale = window.location.pathname.split("/")[1];

      const res = await fetch(
        `/${locale}/api/chapa/verify?tx_ref=${tx_ref}`
      );

      const data = await res.json();

      console.log("data:", data);

      if (data.success) {
        router.replace(`/${locale}/check-out/success`);
      } else {
        router.replace(`/${locale}/check-out/failed`);
      }
    }

    verify();
  }, [router, tx_ref]);

  return <p>Verifying your payment...</p>;
}
