
// "use client";

// import ChartCard from "./chartCard";
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

// interface WishlistChartProps {
//   data: {
//     name: string;
//     count: number;
//   }[];
// }

// export function WishlistChart({ data }: WishlistChartProps) {
//   return (
//     <ChartCard title="Most Wishlisted Products">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} layout="vertical" margin={{ left: 50, right: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" />
//           <YAxis type="category" dataKey="name" width={150} />
//           <Tooltip formatter={(value) => [`${value} wishlists`, ""]} />
//           <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#22c55e" />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartCard>
//   );
// }









"use client";

import ChartCard from "./chartCard";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface WishlistChartProps {
  data: {
    name: string;
    count: number;
  }[];
  theme?: "light" | "dark"; // optional theme prop
}

export function WishlistChart({ data, theme = "light" }: WishlistChartProps) {
  // Dynamic tooltip styles based on theme
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
    borderColor: theme === "dark" ? "#333" : "#d1d5db",
    color: theme === "dark" ? "#f5f5f5" : "#111827",
  };

  // Optional: dynamic bar color based on theme
  const barColor = theme === "dark" ? "#4ade80" : "#22c55e";

  return (
    <ChartCard title="Most Wishlisted Products">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 50, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#444" : "#e5e7eb"} />
          <XAxis type="number" stroke={theme === "dark" ? "#f5f5f5" : "#111827"} />
          <YAxis type="category" dataKey="name" width={150} stroke={theme === "dark" ? "#f5f5f5" : "#111827"} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} wishlists`, ""]} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}