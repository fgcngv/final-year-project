
"use client";

import ChartCard from "./chartCard";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface WishlistChartProps {
  data: {
    name: string;
    count: number;
  }[];
}

export function WishlistChart({ data }: WishlistChartProps) {
  return (
    <ChartCard title="Most Wishlisted Products">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 50, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip formatter={(value) => [`${value} wishlists`, ""]} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
