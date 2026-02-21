

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ChapaVerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

        let data: any = null;
        try {
          data = JSON.parse(text);
          setLogs((prev) => [
            ...prev,
            `Parsed JSON: ${JSON.stringify(data, null, 2)}`,
          ]);
        } catch (err) {
          setLogs((prev) => [...prev, `Failed to parse JSON: ${err}`]);
          setStatus("Verification failed! See logs below.");
          return;
        }

        setLogs((prev) => [...prev, `TX_REF used: ${tx_ref}`]);

        if (data.success) {
          setStatus("Payment successful! Redirecting...");

          // Use orderId from API/database to navigate dynamically
          const orderId = data.orderId || "unknown"; // replace with real orderId if available
          setTimeout(() => router.push(`/check-out/success/${orderId}`), 2000);
        } else {
          setStatus("Payment failed! Check logs below.");
        }
      })
      .catch((err) => {
        setStatus("Verification error! See logs below.");
        setLogs((prev) => [...prev, `Fetch error: ${err}`]);
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {status}
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded p-4 overflow-auto max-h-[60vh] border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Debug Logs:
        </h2>
        <pre className="text-sm font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          <code>{logs.join("\n")}</code>
        </pre>
      </div>
    </div>
  );
}
