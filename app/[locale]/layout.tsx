// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "sonner";

// import { ClerkProvider } from "@clerk/nextjs";

// import "./globals.css";
// import ThemeProvider from "@/Providers/LanguageProvider";
// import PopupNotification from "@/components/popupNotification";
// import { getAllUnreadNotifications } from "@/utils/services/notification";
// import Footer from "@/components/footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "EGCSP",
//   description: "Ethiopian Green Coffee Shoping Platform",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   const notification = await getAllUnreadNotifications();

//   notification.data && console.log("notification : ",notification?.data[0])
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >

//       {/* PopUp notification */}
//       <div className="relative">
//        {
//         notification.data && <PopupNotification leftNotifications={notification.data.length - 1} data={notification?.data[0]} />
//        }
//       </div>
//           <Toaster position="top-right" richColors />
//           <ThemeProvider>{children}</ThemeProvider>

//           <Footer />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }











// new

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ThemeProvider from "@/Providers/LanguageProvider";
import PopupNotification from "@/components/popupNotification";
import { getAllUnreadNotifications } from "@/utils/services/notification";
import Footer from "@/components/footer";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const notification = await getAllUnreadNotifications();

  notification.data && console.log("notification : ", notification?.data[0]);
  return (
    <ClerkProvider>
     <html lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* PopUp notification */}
            <div className="relative">
              {notification.data && (
                <PopupNotification
                  leftNotifications={notification.data.length - 1}
                  data={notification?.data[0]}
                />
              )}
            </div>
            <Toaster position="bottom-right" richColors />
            <ThemeProvider>{children}</ThemeProvider>

            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
