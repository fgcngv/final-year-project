
// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import ChartCard from "./chartCard";

// interface TopProductsChartProps {
//   data: {
//     name: string;
//     sales: number;
//   }[];
// }

// export function TopProductsChart({ data }: TopProductsChartProps) {
//   return (
//     <ChartCard title="Top Products">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} layout="vertical">
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" />
//           <YAxis
//             dataKey="name"
//             type="category"
//             width={150}
//           />
//           <Tooltip />
//           <Bar dataKey="sales" radius={[0, 6, 6, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartCard>
//   );
// }







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
  theme?: "light" | "dark"; // optional theme prop
}

export function TopProductsChart({ data, theme = "light" }: TopProductsChartProps) {
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
    borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
    color: theme === "dark" ? "#f5f5dc" : "#111827",
  };

  const gridStroke = theme === "dark" ? "#4b4b4b" : "#e5e7eb";

  return (
    <ChartCard title="Top Products">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="sales" radius={[0, 6, 6, 0]} fill={theme === "dark" ? "#22c55e" : "#10b981"} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}