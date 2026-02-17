
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import ChartCard from "./chartCard";

interface TopProductsChartProps {
  data: {
    name: string;
    sales: number;
  }[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  return (
    <ChartCard title="Top Products">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
          />
          <Tooltip />
          <Bar dataKey="sales" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
