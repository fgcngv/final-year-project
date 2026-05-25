// "use client";

// import { updateUserLanguage } from "@/app/[locale]/actions/updateLanguage";
// import { useTransition } from "react";
// import Link from "next/link";
// import { Menu, X, Search, ShoppingCart, User, Bell } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
// import { useState } from "react";
// import MobileHeader from "./mobileHeader";
// import { useRouter } from "next/navigation";
// import { useTheme } from "./checkTheme";
// import LocaleSwitcher from "./LocaleSwitcher";
// import ThemeToggle from "./theme/theme-toggle";
// import { DropdownMenu } from "./ui/dropdown-menu";
// import LoaderBtn from "./loaderBtn";

// export default function Header({
//   cartQuantity,
//   notification,
// }: {
//   cartQuantity?: number;
//   notification?: number;
// }) {
//   const { user, } = useUser();
//   const role = user?.publicMetadata?.role;
  
//   let orderLink = "";
//   (role === "admin" || role === "ADMIN") ?orderLink = `${role}/order` : orderLink = `${role}`;


//   const headerLinks = [
//     { name: "Home", link: "/", key: "home" },
//     { name: "Shop", link: "/product", key: "shop" },
//     { name: "About", link: "/about", key: "about" },
//     { name: "Contact_Us", link: "/contact", key: "contact" },
//     { name: "Orders", link: `/${orderLink}`, key: "orders" },
//     { name: "Today's_Market", link: `/todays_market`, key: "today-market" },
//     { name: "Chat_Members", link: `/chats/${user?.id}`, key: "chatmembers" },
//     { name: "Dashboard", link: `/${role}`, key: "dashboard" },
//     { name: "Profile", link: `/profile/${user?.id}`, key: "profile" },
//   ];

//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const router = useRouter();

//   const userId = user?.id;

//   const [isPending, startTransition] = useTransition();

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const lang = e.target.value;

//     startTransition(() => {
//       updateUserLanguage(lang);
//     });

//     router.refresh();
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-black text-white px-6 py-4 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* LOGO */}
//         <Link
//   href="/"
//   className="
//     relative inline-flex items-center justify-center
//     text-2xl font-extrabold tracking-wider
//     text-green-700
//     px-1 py-1.5 rounded-xl
//     transition-all duration-300 ease-out

//     hover:text-green-800
//     hover:bg-green-600
//     active:scale-95

//     before:absolute before:inset-0
//     before:rounded-xl
//     before:bg-green-200
//     before:opacity-0
//     before:scale-75
//     before:transition-all before:duration-300

//     hover:before:opacity-100
//     hover:before:scale-100

//     shadow-sm hover:shadow-md

//     max-[355px]:hidden
//     overflow-hidden
//   "
// >
//   <span className="relative z-10">EGC</span>
// </Link>
//         <div className=" hidden min-[477px]:block ">
//           <ThemeToggle />
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden min-[1317px]:flex items-center gap-10 text-sm font-medium">
//           {headerLinks.map((link) => (
//             <Link
//               href={link.link}
//               key={link.key}
//               className="hover:text-green-500 transition"
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* SEARCH */}
//           <div className="flex items-center bg-gray-800 px-3 rounded-full">
//           </div>
//         </nav>

//         {/* RIGHT SECTION: Cart + User */}
//         <div className="flex items-center gap-4">
//           {/* CART */}

//           {/* Language Option*/}
//           <div>
//             <LocaleSwitcher />
//           </div>

//           <div className="relative active:text-green-500 hover:text-green-700 p-1 cursor-pointer">
//             <Link href={userId ? `/cart/${userId}` : "/cart"}>
//               <ShoppingCart className="w-7 h-7" />
//             </Link>
//             <span className="absolute -top-2 -right-2 bg-green-600 text-xs font-bold rounded-full px-2 py-0.5">
//               {cartQuantity}
//             </span>
//           </div>

//           {/* notification */}
//           {notification && notification > 0 ? (
//             <div className="relative hidden min-[298px]:block ">
//               <Link
//                 href={`/notifications`}
//                 className="hover:text-red-400 active:text-red-600"
//               >
//                 <Bell size={22} />
//               </Link>
//               <span className="absolute  w-6 -top-5 -right-3 items-center justify-center flex bg-red-500 rounded-full">
//                 {notification}
//               </span>
//             </div>
//           ) : null}

//           {/* AUTH */}
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           <SignedOut>
//             <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
//               <SignInButton />
//             </Button>
//           </SignedOut>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="min-[1317px]:hidden cursor-pointer hover:bg-gray-700 p-1 rounded"
//             onClick={() => setIsMobileOpen(!isMobileOpen)}
//           >
//             {isMobileOpen ? (
//               <X className="w-7 h-7" />
//             ) : (
//               <Menu className="w-7 h-7" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE HEADER DROPDOWN */}
//       {isMobileOpen && <MobileHeader />}
//     </header>
//   );
// }











"use client";

import { updateUserLanguage } from "@/app/[locale]/actions/updateLanguage";
import { useTransition, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingCart,
  Bell,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import MobileHeader from "./mobileHeader";
import { useRouter } from "next/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./theme/theme-toggle";

export default function Header({
  cartQuantity,
  notification,
  wishlistCount,
}: {
  cartQuantity?: number;
  notification?: number;
  wishlistCount?: number;
}) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const userId = user?.id;

  const orderLink =
    role === "admin" || role === "ADMIN"
      ? `${role}/order`
      : `${role}`;

  const headerLinks = [
    { name: "Home", link: "/", key: "home" },
    { name: "Shop", link: "/product", key: "shop" },
    { name: "About", link: "/about", key: "about" },
    { name: "Contact", link: "/contact", key: "contact" },
    { name: "Orders", link: `/${orderLink}`, key: "orders" },
    { name: "Market", link: "/todays_market", key: "market" },
    { name: "Chat", link: `/chats/${user?.id}`, key: "chat" },
    { name: "Dashboard", link: `/${role}`, key: "dashboard" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      updateUserLanguage(e.target.value);
    });
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-3">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-extrabold text-green-600"
        >
          EGC
        </Link>

        {/* THEME (hidden on very small screens) */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {headerLinks.map((link) => (
            <Link
              key={link.key}
              href={link.link}
              className="hover:text-green-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Locale */}
          <div className="hidden min-[337px]:block">
            <LocaleSwitcher />
          </div>

          {/* CART */}
          <Link
            href={userId ? `/cart/${userId}` : "/cart"}
            className="relative p-1"
          >
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
            {cartQuantity ? (
              <span className="absolute -top-2 -right-2 bg-green-600 text-xs px-1.5 py-0.5 rounded-full">
                {cartQuantity}
              </span>
            ) : null}
          </Link>

          {/* WISHLIST */}
          <Link href="/wishlist" className="relative p-1">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
            {wishlistCount ? (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            ) : null}
          </Link>

          {/* NOTIFICATION */}
{/* NOTIFICATION */}
<Link
  href="/notifications"
  className="relative p-1 flex items-center"
>
  <Bell className="w-6 h-6 sm:w-7 sm:h-7" />

  {notification && notification > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
      {notification}
    </span>
  )}
</Link>

          {/* AUTH */}
          <div className="hidden sm:block">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1">
                <SignInButton />
              </Button>
            </SignedOut>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="xl:hidden p-1"
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

      {/* MOBILE MENU */}
      {isMobileOpen && <MobileHeader />}
    </header>
  );
}