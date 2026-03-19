
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "./header";

export default function TodaysMarketPage() {
  return (
    <div className="p-6 space-y-6">
        <Header />
      {/* Top Section */}
      <div className="grid grid-cols-1 mt-15 md:grid-cols-3 gap-6">
        {/* Official Price */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>🇪🇹 Official Coffee Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-semibold">Grade 1: 320 ETB/kg</p>
            <p>Jimma Coffee: 290 ETB/kg</p>
            <p>Yirga Cheffe Coffee : 260 ETB/kg</p>
            <Badge variant="secondary">Updated Today 9:00 AM</Badge>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Market Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p> Listings: 1,240</p>
            <p> Farmers: 530</p>
            <p> Buyers: 210</p>
            <p> Volume: 18,200 kg</p>
          </CardContent>
        </Card>

        {/* Seller Suggestion */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Sell Smart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Suggested Range: 300 - 330 ETB/kg
            </p>
            <Input placeholder="Enter your price" />
            <Button className="w-full">List Product</Button>
          </CardContent>
        </Card>
      </div>

      {/* Listings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Live Market Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Abebe Coffee Farm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p> Jimma</p>
                <p>Grade: 1</p>
                <p>Quantity: 500 kg</p>
                <p className="font-semibold text-lg">315 ETB/kg</p>
                <div className="flex gap-2">
                  <Button variant="default">Buy Now</Button>
                  <Button variant="outline">Negotiate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Insights */}
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p> Jimma Coffee prices are rising due to demand.</p>
          <p> Farmers: Good time to sell.</p>
          <p> Buyers: Prices may increase soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
