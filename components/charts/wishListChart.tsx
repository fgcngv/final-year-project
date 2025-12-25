"use client"


import ChartCard from "./chartCard";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const mockWishlistData = [
  { name: "Yirgacheffe Grade 1", count: 240 },
  { name: "Guji Natural", count: 210 },
  { name: "Sidamo Organic", count: 190 },
  { name: "Harrar Longberry", count: 160 },
  { name: "Limu Washed", count: 120 },
];

export function WishlistChart() {
    return (
      <ChartCard title="Most Wishlisted Products">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockWishlistData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    );
  }
  