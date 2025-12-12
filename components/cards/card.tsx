import { LucideIcon } from "lucide-react";
import { CardContent, Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface CardProps {
  total?: number;
  cardName: string;
  link: string;
  icon: LucideIcon; // <--- correctly typed icon
}

function Cards({ total, cardName, link, icon: Icon }: CardProps) {
  return (
    <Card className="rounded-2xl shadow-md p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">{cardName}</CardTitle>

        {/* Use dynamic icon */}
        <Icon className="h-8 w-8" />
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold">{total}</p>

        <Link href={link}>
          <Button variant="outline" className="mt-4 w-full cursor-pointer">
            View All
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default Cards;
