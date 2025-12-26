import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ThemeProvider from "@/Providers/LanguageProvider";
import PopupNotification from "@/components/popupNotification";
import { getAllUnreadNotifications } from "@/utils/services/notification";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EGCSP",
  description: "Ethiopian Green Coffee Shoping Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const notification = await getAllUnreadNotifications();
  
  notification.data && console.log("notification : ",notification?.data[0])
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
      {/* PopUp notification */}
      <div className="relative">
       {
        notification.data && <PopupNotification leftNotifications={notification.data.length - 1} data={notification?.data[0]} />
       }
      </div>
          <Toaster position="top-right" richColors />
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
