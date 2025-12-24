
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import Header from "@/components/header";

export default function NotificationDetailPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
        <Header />
      {/* Back Button */}
      <Link
        href="/notifications"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={16} />
        Back to notifications
      </Link>

      {/* Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Bell className="text-blue-600" />
          </div>
          <h1 className="text-xl font-bold">New Product Added</h1>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Farmer1 has added new coffee products to the marketplace.
          Check them out before they sell out!
          <Link href={``} className="font-bold text-blue-700 ml-2 hover:underline">Check!</Link>
        </p>

        <div className="mt-6 text-sm text-gray-500">
          Received • 2 minutes ago
        </div>
      </div>
    </div>
  );
}
