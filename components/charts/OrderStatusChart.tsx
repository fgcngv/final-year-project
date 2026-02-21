

// "use client";

// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
// import ChartCard from "./chartCard";

// interface OrderStatusChartProps {
//   data: {
//     name: string;
//     value: number;
//   }[];
// }

// const Order_COLORS: Record<string, string> = {
//   PENDING: "#f59e0b",
//   PAID: "#3b82f6",
//   SHIPPED: "#8b5cf6",
//   DELIVERED: "#22c55e",
//   CANCELLED: "#ef4444",
// };

// export function OrderStatusChart({ data }: OrderStatusChartProps) {
//   return (
//     <ChartCard title="Order Status">
//       <ResponsiveContainer width="100%" height={280}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             innerRadius={70}
//             outerRadius={100}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={Order_COLORS[entry.name] || "#9ca3af"}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </ChartCard>
//   );
// }













"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import ChartCard from "./chartCard";

interface OrderStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
  theme?: "light" | "dark"; // <-- optional theme
}

const ORDER_COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  PAID: "#3b82f6",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#22c55e",
  CANCELLED: "#ef4444",
};

export function OrderStatusChart({
  data,
  theme = "light",
}: OrderStatusChartProps) {
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
    borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
    color: theme === "dark" ? "#f5f5dc" : "#111827",
  };

  return (
    <ChartCard title="Order Status">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ORDER_COLORS[entry.name] || "#9ca3af"}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}