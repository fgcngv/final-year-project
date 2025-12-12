import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


interface roleProps {
  role:"admin" | "buyer" | "seller" | "lab_technician" | "cashier";
}


function DashboardHeader({role}:roleProps) {
  return (
    <div className="flex justify-between items-center p-6 sm:py-10 w-full bg-black  text-white">
      <span className="cursor-pointer  ">{role}</span>
      <nav className=" w-[75%] flex flex-col sm:flex-row items-center justify-around">
        <div className="flex items-center">
          <input
            className="border bg-green-600 p-2 rounded border-r-0 text-center ml-1 hidden sm:inline"
            placeholder="Search Product"
          />
        </div>
      </nav>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default DashboardHeader;
