
// "use client";

import { LucideIcon } from "lucide-react";
import { CardContent, Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import LoaderBtn from "../loaderBtn";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface CardProps {
  total?: number;
  cardName: string;
  link: string;
  icon: LucideIcon; // icon type
  className?: string; // <-- new optional className prop
}

async function Cards({ total, cardName, link, icon: Icon, className }: CardProps) {
  const ta = await getTranslations("admin");
  const tb = await getTranslations("button");
  return (
    <Card
      className={`rounded-2xl shadow-md p-4 transition-colors duration-500 bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] ${className || ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">{ta(cardName)}</CardTitle>

        {/* Dynamic icon */}
        <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold">{total ?? 0}</p>
        <LoaderBtn className="mt-4 w-full bg-transparent cursor-pointer text-gray-800 dark:text-[#f5f5dc]  border-2 border-gray-300 dark:border-[#3c2a21] hover:text-white dark:hover:text-black" btnName={tb("detail")} linkTo={link} />

      </CardContent>
    </Card>
  );
}

export default Cards;