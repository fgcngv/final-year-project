"use client"


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import ChartCard from "./chartCard";

export const mockLineData = [
  { date: "Jan", orders: 120 },
  { date: "Feb", orders: 180 },
  { date: "Mar", orders: 260 },
  { date: "Apr", orders: 310 },
  { date: "May", orders: 420 },
  { date: "Jun", orders: 510 },
];

  
export  function OrdersChart() {
    return (
      <ChartCard title="Orders Over Time">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={mockLineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    );
  }
  