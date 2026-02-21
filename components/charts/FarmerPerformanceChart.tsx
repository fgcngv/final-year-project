

// "use client";

// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import ChartCard from "./chartCard";

// interface FarmerPerformanceChartProps {
//   data: {
//     name: string;
//     revenue: number;
//   }[];
// }

// export function FarmerPerformanceChart({
//   data,
// }: FarmerPerformanceChartProps) {
//   return (
//     <ChartCard title="Top Farmers">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
//           <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartCard>
//   );
// }



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
import { useTheme } from "next-themes";

interface FarmerPerformanceChartProps {
  data: {
    name: string;
    revenue: number;
  }[];
}

export function FarmerPerformanceChart({
  data,
}: FarmerPerformanceChartProps) {
  const {theme} = useTheme();
  // Theme-based colors
  const axisColor = theme === "dark" ? "#f5f5dc" : "#4b5563";
  const gridColor = theme === "dark" ? "#3c2a21" : "#e5e7eb";
  const barColor = theme === "dark" ? "#34d399" : "#10b981"; // green shade

  return (
    <ChartCard title="Top Farmers">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={axisColor} />
          <YAxis stroke={axisColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
              borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
              color: theme === "dark" ? "#f5f5dc" : "#111827",
            }}
            formatter={(value) => [`${value} ETB`, "Revenue"]}
          />
          <Bar dataKey="revenue" fill={barColor} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}