"use client";

import { updateUserLanguage } from "@/app/actions/updateLanguage";
import { useTransition } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useState } from "react";
import MobileHeader from "./mobileHeader";
import { useRouter } from "next/navigation";
import { useTheme } from "./checkTheme";

const headerLinks = [
  { name: "Home", link: "/", key: "home" },
  { name: "Shop", link: "/product", key: "shop" },
  { name: "About", link: "/about", key: "about" },
  { name: "Contact Us", link: "/contact", key: "contact" },
  { name: "Orders", link: "/orders", key: "orders" },
];

export default function Header({ cartQuantity,notification }: { cartQuantity?: number,notification?:number }) {
  // Language Option
  const { theme, toggleTheme } = useTheme();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  const { user } = useUser();
  const userId = user?.id;

  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;

    startTransition(() => {
      updateUserLanguage(lang);
    });

    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white px-6 py-4 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl text-green-600 font-bold tracking-wide"
        >
          EGC
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {headerLinks.map((link) => (
            <Link
              href={link.link}
              key={link.key}
              className="hover:text-green-500 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* SEARCH */}
          <div className="flex items-center bg-gray-800 px-3 rounded-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              className="bg-transparent outline-none ml-2 text-sm placeholder-gray-400 p-2"
              placeholder="Search products..."
            />
          </div>
        </nav>

        {/* RIGHT SECTION: Cart + User */}
        <div className="flex items-center gap-4">
          {/* CART */}

          {/* Language Option*/}
          <div>
            <Button
              onClick={toggleTheme}
              className="cursor-pointer font-bold bg-green-600 hover:bg-green-700 active:bg-green-800"
            >
              {theme}
            </Button>
          </div>

          <div className="relative cursor-pointer">
            <Link href={userId ? `/cart/${userId}` : "/cart"}>
              <ShoppingCart className="w-7 h-7" />
            </Link>
            <span className="absolute -top-2 -right-2 bg-green-600 text-xs font-bold rounded-full px-2 py-0.5">
              {cartQuantity}
            </span>
          </div>

          {/* notification */}
   {
    notification && notification > 0 ?(
                <div className="relative hidden min-[330px]:block ">
            <Link href={`/notifications`}>
              <Bell size={22} />
            </Link>
            <span className="absolute  w-6 -top-5 -right-3 items-center justify-center flex bg-red-500 rounded-full">
              {notification}
            </span>
          </div>
    ) : null
   }

          {/* AUTH */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
              <SignInButton />
            </Button>
          </SignedOut>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden cursor-pointer hover:bg-gray-700 p-1 rounded"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE HEADER DROPDOWN */}
      {isMobileOpen && <MobileHeader />}
    </header>
  );
}

// "use client";

// import { updateUserLanguage } from "@/app/actions/updateLanguage";
// import { useTransition, useState } from "react";
// import Link from "next/link";
// import { Menu, X, Search, ShoppingCart } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
// import MobileHeader from "./mobileHeader";
// import { useRouter } from "next/navigation";
// import { useTheme } from "./checkTheme";

// const headerLinksEnglish = [
//   { name: "Home", link: "/", key: "home" },
//   { name: "Shop", link: "/shop", key: "shop" },
//   { name: "About", link: "/about", key: "about" },
//   { name: "Contact Us", link: "/contact", key: "contact" },
//   { name: "Orders", link: "/orders", key: "orders" },
// ];

// const headerLinksOromo = [
//   { name: "Seensa", link: "/", key: "home" },
//   { name: "Gabaa", link: "/shop", key: "shop" },
//   { name: "Waa'ee Keenya", link: "/about", key: "about" },
//   { name: "Nu Qunnamuuf", link: "/contact", key: "contact" },
//   { name: "Ajajoota", link: "/orders", key: "orders" },
// ];

// const headerLinksAmharic = [
//   { name: "መግቢያ ገፅ", link: "/", key: "home" },
//   { name: "መገበያያ", link: "/shop", key: "shop" },
//   { name: "ስለ እኛ", link: "/about", key: "about" },
//   { name: "አግኙን", link: "/contact", key: "contact" },
//   { name: "ትዕዛዞች", link: "/orders", key: "orders" },
// ];

// interface LanguageProps {
//   language?: "ENGLISH" | "AMHARIC" | "AFAN_OROMO";
// }

// export default function Header({ language = "ENGLISH" }: LanguageProps) {
//   const { theme, toggleTheme } = useTheme();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const router = useRouter();

//   const { user } = useUser();
//   const userId = user?.id;

//   const [isPending, startTransition] = useTransition();

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const lang = e.target.value;

//     startTransition(() => {
//       updateUserLanguage(lang);
//     });

//     router.refresh();
//   };

//   // FIXED: Correct dynamic language selection
//   let headerLinks = headerLinksEnglish;
//   if (language === "AMHARIC") headerLinks = headerLinksAmharic;
//   if (language === "AFAN_OROMO") headerLinks = headerLinksOromo;
// // console.log("language Props : ",language)
//   return (
//     <header className="fixed top-0 left-0 right-0 bg-black text-white px-6 py-4 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* LOGO */}
//         <Link href="/" className="text-2xl text-green-600 font-bold tracking-wide">
//           EGC
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
//           {headerLinks.map((link) => (
//             <Link key={link.key} href={link.link} className="hover:text-green-500 transition">
//               {link.name}
//             </Link>
//           ))}

//           {/* SEARCH */}
//           <div className="flex items-center bg-gray-800 px-3 rounded-full">
//             <Search className="w-5 h-5 text-gray-400" />
//             <input
//               className="bg-transparent outline-none ml-2 text-sm placeholder-gray-400"
//               placeholder="Search products..."
//             />
//           </div>
//         </nav>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-4">
//           {/* THEME TOGGLE */}
//           <Button
//             onClick={toggleTheme}
//             className="cursor-pointer font-bold bg-green-600 hover:bg-green-700 active:bg-green-800"
//           >
//             {theme}
//           </Button>

//           {/* CART */}
//           <div className="relative cursor-pointer">
//             <Link href={userId ? `/cart/${userId}` : "/cart"}>
//               <ShoppingCart className="w-7 h-7" />
//             </Link>
//             <span className="absolute -top-2 -right-2 bg-green-600 text-xs font-bold rounded-full px-2 py-0.5">
//               2
//             </span>
//           </div>

//           {/* AUTH */}
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           <SignedOut>
//             <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
//               <SignInButton />
//             </Button>
//           </SignedOut>

//           {/* Mobile Menu */}
//           <button
//             className="md:hidden cursor-pointer hover:bg-gray-700 p-1 rounded"
//             onClick={() => setIsMobileOpen(!isMobileOpen)}
//           >
//             {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
//           </button>
//         </div>
//       </div>

//       {isMobileOpen && <MobileHeader />}
//     </header>
//   );
// }
