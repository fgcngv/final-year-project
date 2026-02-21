// "use client";

// import ChartCard from "./chartCard";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

// interface PaymentStatusChartProps {
//   data: {
//     name: string;
//     value: number;
//   }[];
// }

// const PAYMENT_COLORS: Record<string, string> = {
//   PAID: "#22c55e",    // green
//   UNPAID: "#ef4444",  // red
//   PARTIAL: "#f59e0b", // amber
// };

// export function PaymentStatusChart({ data }: PaymentStatusChartProps) {
//   return (
//     <ChartCard title="Payment Status">
//       <ResponsiveContainer width="100%" height={280}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             innerRadius={60}
//             outerRadius={100}
//             paddingAngle={3}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={PAYMENT_COLORS[entry.name] || "#9ca3af"}
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

import ChartCard from "./chartCard";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PaymentStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
  theme?: "light" | "dark"; // <-- optional theme prop
}

const PAYMENT_COLORS: Record<string, string> = {
  PAID: "#22c55e",    // green
  UNPAID: "#ef4444",  // red
  PARTIAL: "#f59e0b", // amber
};

export function PaymentStatusChart({
  data,
  theme = "light",
}: PaymentStatusChartProps) {
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
    borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
    color: theme === "dark" ? "#f5f5dc" : "#111827",
  };

  return (
    <ChartCard title="Payment Status">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PAYMENT_COLORS[entry.name] || "#9ca3af"}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}