
// export default function ChartCard({
//     title,
//     children,
//   }: {
//     title: string;
//     children: React.ReactNode;
//   }) {
//     return (
//       <div className="rounded-2xl bg-background p-6 shadow-sm border">
//         <h3 className="font-semibold mb-4">{title}</h3>
//         {children}
//       </div>
//     );
//   }
  




export default function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-6 shadow-sm border transition-colors duration-500 bg-white dark:bg-[#1f140d] text-gray-800 dark:text-[#f5f5dc] border-gray-200 dark:border-[#3c2a21]">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}