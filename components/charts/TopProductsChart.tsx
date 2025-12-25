"use client"



import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./chartCard";

export const mockProductData = [
  { name: "Yirgacheffe Grade 1", sales: 420 },
  { name: "Sidamo Organic", sales: 380 },
  { name: "Harrar Longberry", sales: 310 },
  { name: "Guji Natural", sales: 260 },
  { name: "Limu Washed", sales: 190 },
];


export function TopProductsChart() {
  return (
    <ChartCard title="Top Products">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockProductData} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="sales" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
