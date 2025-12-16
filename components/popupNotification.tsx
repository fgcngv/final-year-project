"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";

function PopupNotification() {
  const [showNotification, setShowNotification] = useState(true);

  if (!showNotification) {
    return null;
  }

  return (
    <Card className=" top-20 sm:left-7 fixed z-100 border border-gray-500  bg-transparent p-2 rounded-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-center font-bold text-gray-800">
            Notifications{" "}
          </CardTitle>
          <Button
            onClick={() => setShowNotification(!showNotification)}
            className="cursor-pointer"
          >
            {" "}
            <X />{" "}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Link
            href={``}
            className="flex gap-1.5 border p-1 rounded border-gray-400 hover:bg-gray-400 bg-gray-300"
          >
            <img
              src="/green_coffee.png"
              alt="farmer1"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <span className="font-bold text-sm">Farmer1</span>
              <div>Added New Products</div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default PopupNotification;
