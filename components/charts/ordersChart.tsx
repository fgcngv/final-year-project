// // "use client"


// // import {
// //     LineChart,
// //     Line,
// //     XAxis,
// //     YAxis,
// //     Tooltip,
// //     ResponsiveContainer,
// //   } from "recharts";
// // import ChartCard from "./chartCard";

// // export const mockLineData = [
// //   { date: "Jan", orders: 120 },
// //   { date: "Feb", orders: 180 },
// //   { date: "Mar", orders: 260 },
// //   { date: "Apr", orders: 310 },
// //   { date: "May", orders: 420 },
// //   { date: "Jun", orders: 510 },
// // ];

  
// // export  function OrdersChart() {
// //     return (
// //       <ChartCard title="Orders Over Time">
// //         <ResponsiveContainer width="100%" height={280}>
// //           <LineChart data={mockLineData}>
// //             <XAxis dataKey="date" />
// //             <YAxis />
// //             <Tooltip />
// //             <Line type="monotone" dataKey="orders" strokeWidth={2} />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </ChartCard>
// //     );
// //   }
  














// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import ChartCard from "./chartCard";

// interface OrdersChartProps {
//   data: {
//     date: string;
//     orders: number;
//   }[];
// }

// export function OrdersChart({ data }: OrdersChartProps) {
//   return (
//     <ChartCard title="Orders Over Time">
//       <ResponsiveContainer width="100%" height={280}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="orders"
//             strokeWidth={3}
//             dot={{ r: 4 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </ChartCard>
//   );
// }









"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ChartCard from "./chartCard";

interface OrdersChartProps {
  data: {
    date: string;
    orders: number;
  }[];
  theme?: "light" | "dark"; // <-- optional theme prop
}

export function OrdersChart({ data, theme = "light" }: OrdersChartProps) {
  // Colors based on theme
  const axisColor = theme === "dark" ? "#f5f5dc" : "#4b5563"; // light or dark text
  const gridColor = theme === "dark" ? "#3c2a21" : "#e5e7eb"; // dark/light grid
  const lineColor = theme === "dark" ? "#34d399" : "#10b981"; // green line

  return (
    <ChartCard  title="Orders Over Time">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={axisColor} />
          <YAxis allowDecimals={false} stroke={axisColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f140d" : "#fff",
              borderColor: theme === "dark" ? "#3c2a21" : "#d1d5db",
              color: theme === "dark" ? "#f5f5dc" : "#111827",
            }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}