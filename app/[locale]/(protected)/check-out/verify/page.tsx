// export const dynamic = "force-dynamic"; // first
// "use client";

import ChapaVerifyClient from "@/components/checkout/ChapaVerifyClient";

export const dynamic = "force-dynamic"; // ensures Next.js treats as dynamic


export default function Page() {
  // server component just renders client
  return <ChapaVerifyClient />;
}