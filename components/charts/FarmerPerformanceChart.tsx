"use client"


import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./chartCard";

export const mockFarmerData = [
  { name: "Abebe Tesfaye", revenue: 12500 },
  { name: "Kebede Alemu", revenue: 9800 },
  { name: "Mulugeta Bekele", revenue: 8600 },
  { name: "Hanna Worku", revenue: 7200 },
  { name: "Tadesse Girma", revenue: 6100 },
];


export function FarmerPerformanceChart() {
    return (
      <ChartCard title="Top Farmers">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockFarmerData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    );
  }
  