


// "use client";

// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import ChartCard from "./chartCard";

// interface UserRoleChartProps {
//   data: {
//     name: string;
//     value: number;
//   }[];
// }

// const Role_COLORS: Record<string, string> = {
//   BUYER: "#38bdf8",
//   FARMER: "#22c55e",
//   ADMIN: "#ef4444",
//   CASHIER: "#f59e0b",
//   LAB_TECHNICIAN: "#8b5cf6",
// };

// export function UserRoleChart({ data }: UserRoleChartProps) {
//   return (
//     <ChartCard title="User Roles">
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             innerRadius={60}
//             outerRadius={100}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={Role_COLORS[entry.name] || "#9ca3af"}
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

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./chartCard";

interface UserRoleChartProps {
  data: {
    name: string;
    value: number;
  }[];
  theme?: "light" | "dark"; // optional theme prop
}

const ROLE_COLORS: Record<string, string> = {
  BUYER: "#38bdf8",
  FARMER: "#22c55e",
  ADMIN: "#ef4444",
  CASHIER: "#f59e0b",
  LAB_TECHNICIAN: "#8b5cf6",
};

export function UserRoleChart({ data, theme = "light" }: UserRoleChartProps) {
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
    borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
    color: theme === "dark" ? "#f5f5dc" : "#111827",
  };

  return (
    <ChartCard title="User Roles">
      <ResponsiveContainer width="100%" height={300}>
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
                fill={ROLE_COLORS[entry.name] || "#9ca3af"}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}