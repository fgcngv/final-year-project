"use client"

import ChartCard from "./chartCard";

export const mockPaymentData = [
  { name: "Paid", value: 620 },
  { name: "Unpaid", value: 180 },
  { name: "Partial", value: 90 },
];

  


const PAYMENT_COLORS = {
  Paid: "#22c55e",     // green
  Unpaid: "#ef4444",   // red
  Partial: "#f59e0b",  // amber
};

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function PaymentStatusChart() {
  return (
    <ChartCard title="Payment Status">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={mockPaymentData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {mockPaymentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PAYMENT_COLORS[entry.name as keyof typeof PAYMENT_COLORS]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
