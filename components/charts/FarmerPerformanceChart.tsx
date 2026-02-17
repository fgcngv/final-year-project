

"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import ChartCard from "./chartCard";

interface FarmerPerformanceChartProps {
  data: {
    name: string;
    revenue: number;
  }[];
}

export function FarmerPerformanceChart({
  data,
}: FarmerPerformanceChartProps) {
  return (
    <ChartCard title="Top Farmers">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
