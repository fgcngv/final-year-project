"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./chartCard";

export const mockRoleData = [
  { name: "Buyers", value: 860 },
  { name: "Farmers", value: 240 },
  { name: "Admins", value: 8 },
  { name: "Cashiers", value: 16 },
  { name: "LabTechnicians", value: 12 },
];

const Role_COLORS = {
  Buyers:"#38bdf8",
  Farmers: "#22c55e",     // green
  Admins: "#ef7888",   // red
  Cashiers: "#f59e0b",  // amber
  LabTechnicians:"#38b22"
};


export function UserRoleChart() {
    return (
      <ChartCard title="User Roles">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockRoleData}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
            >
                          {mockRoleData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={Role_COLORS[entry.name as keyof typeof Role_COLORS]}
                            />
                          ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    );
  }
  