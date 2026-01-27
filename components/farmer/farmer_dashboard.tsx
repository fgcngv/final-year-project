
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Package, DollarSign, MapPin } from "lucide-react";

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Farmer Dashboard</h1>
            <p className="text-emerald-700">Welcome back, Abebe 🌱</p>
          </div>
          <Button className="bg-emerald-700 hover:bg-emerald-800">
            Add New Harvest
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <StatCard title="Total Harvest" value="2,450 kg" icon={<Leaf />} />
          <StatCard title="Available Lots" value="6" icon={<Package />} />
          <StatCard title="Monthly Earnings" value="$4,200" icon={<DollarSign />} />
          <StatCard title="Demand Trend" value="High" icon={<TrendingUp />} />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Harvest Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Harvest Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <HarvestRow region="Yirgacheffe" progress={80} grade="Grade 1" />
              <HarvestRow region="Sidamo" progress={55} grade="Grade 2" />
              <HarvestRow region="Guji" progress={35} grade="Grade 1" />
            </CardContent>
          </Card>

          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <MapPin size={16} /> Oromia, Ethiopia
              </div>
              <div>Farm Size: <strong>3.2 hectares</strong></div>
              <div>Certification:</div>
              <div className="flex gap-2">
                <Badge>Organic</Badge>
                <Badge variant="outline">Fair Trade</Badge>
              </div>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <SaleRow buyer="Export Buyer – Germany" amount="$1,200" status="Completed" />
              <SaleRow buyer="Local Cooperative" amount="$850" status="Pending" />
              <SaleRow buyer="Roastery – UAE" amount="$2,150" status="Completed" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
          {icon}
        </div>
        <div>
          <p className="text-sm text-emerald-600">{title}</p>
          <p className="text-xl font-semibold text-emerald-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function HarvestRow({ region, progress, grade }: { region: string; progress: number; grade: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{region}</span>
        <Badge variant="secondary">{grade}</Badge>
      </div>
      <Progress value={progress} />
    </div>
  );
}

function SaleRow({ buyer, amount, status }: { buyer: string; amount: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>
        <p className="font-medium">{buyer}</p>
        <p className="text-emerald-600">{amount}</p>
      </div>
      <Badge variant={status === "Completed" ? "default" : "outline"}>
        {status}
      </Badge>
    </div>
  );
}
