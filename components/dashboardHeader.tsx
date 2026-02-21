// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


// interface roleProps {
//   role:"ADMIN" | "BUYER" | "SELLER" | "LAB_TECHNICIAN" | "CASHIER";
// }


// function DashboardHeader({role}:roleProps) {
//   return (
//     <div className="flex justify-between items-center p-6 sm:py-10 w-full bg-black  text-white">
//       <span className="cursor-pointer  ">{role}</span>
//       <nav className=" w-[75%] flex flex-col sm:flex-row items-center justify-around">
//         <div className="flex items-center">
//           <input
//             className="border bg-green-600 p-2 rounded border-r-0 text-center ml-1 hidden sm:inline"
//             placeholder="Search Product"
//           />
//         </div>
//       </nav>

//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//     </div>
//   );
// }

// export default DashboardHeader;




import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./theme/theme-toggle";

function DashboardHeader({ role }: { role: string }) {
  return (
    <div className="flex items-center justify-between font-bold text-2xl  px-4 py-3 w-full bg-transparent text-black  sm:px-6">
      {/* LEFT */}
      <span className="text-sm font-semibold uppercase tracking-wide">
        {role}
      </span>
      <ThemeToggle />

      {/* CENTER (desktop only) */}
      <div className="hidden sm:block">
        <input
          className="rounded-md bg-green-700 px-3 py-1 text-sm outline-none"
          placeholder="Search product..."
        />
      </div>

      {/* RIGHT */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}

export default DashboardHeader;
