import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ThemeProvider from "@/Providers/LanguageProvider";
import PopupNotification from "@/components/popupNotification";

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
      {/* PopUp notification */}
      <div className="relative">
      <PopupNotification />
      </div>
          <Toaster position="top-right" richColors />
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
