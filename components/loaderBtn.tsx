"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoaderBtnProps {
  btnName: string;
  className?: string;
  linkTo?: string;
}

function LoaderBtn({ btnName, className, linkTo }: LoaderBtnProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setLoading(true);
    linkTo ? router.push(linkTo) : null;
    // setLoading(false);
  };

  return (
    <Button
      onClick={handleNavigation}
      className={cn("cursor-pointer font-bold", className)}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          loading...
        </div>
      ) : (
        btnName
      )}
    </Button>
  );
}

export default LoaderBtn;
