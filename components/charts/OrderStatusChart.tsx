"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import ChartCard from "./chartCard";

export const mockStatusData = [
  { name: "Pending", value: 120 },
  { name: "Scheduled", value: 80 },
  { name: "Delivered", value: 540 },
  { name: "Cancelled", value: 60 },
];

const Order_COLORS = {
  Pending: "#f59e0b", // amber
  Scheduled: "#38bdf8",
  Delivered: "#22c55e", // green
  Cancelled: "#ef4444", // red
};

export function OrderStatusChart() {
  return (
    <ChartCard title="Order Status">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={mockStatusData}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
          >
            {mockStatusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={Order_COLORS[entry.name as keyof typeof Order_COLORS]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
