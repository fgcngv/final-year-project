// import { LucideIcon } from "lucide-react";
// import { CardContent, Card, CardHeader, CardTitle } from "../ui/card";
// import Link from "next/link";
// import { Button } from "../ui/button";

// interface CardProps {
//   total?: number;
//   cardName: string;
//   link: string;
//   icon: LucideIcon; // <--- correctly typed icon
// }

// function Cards({ total, cardName, link, icon: Icon }: CardProps) {
//   return (
//     <Card className="rounded-2xl shadow-md p-4">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-xl font-semibold">{cardName}</CardTitle>

//         {/* Use dynamic icon */}
//         <Icon className="h-8 w-8" />
//       </CardHeader>

//       <CardContent>
//         <p className="text-4xl font-bold">{total}</p>

//         <Link href={link}>
//           <Button variant="outline" className="mt-4 w-full cursor-pointer">
//             View All
//           </Button>
//         </Link>
//       </CardContent>
//     </Card>
//   );
// }

// export default Cards;









import { LucideIcon } from "lucide-react";
import { CardContent, Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface CardProps {
  total?: number;
  cardName: string;
  link: string;
  icon: LucideIcon; // icon type
  className?: string; // <-- new optional className prop
}

function Cards({ total, cardName, link, icon: Icon, className }: CardProps) {
  return (
    <Card
      className={`rounded-2xl shadow-md p-4 transition-colors duration-500 bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] ${className || ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">{cardName}</CardTitle>

        {/* Dynamic icon */}
        <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold">{total ?? 0}</p>

        <Link href={link}>
          <Button
            variant="outline"
            className="mt-4 w-full cursor-pointer text-gray-800 dark:text-[#f5f5dc] border-gray-300 dark:border-[#3c2a21]"
          >
            View All
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default Cards;