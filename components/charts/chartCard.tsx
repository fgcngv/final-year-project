
export default function ChartCard({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="rounded-2xl bg-background p-6 shadow-sm border">
        <h3 className="font-semibold mb-4">{title}</h3>
        {children}
      </div>
    );
  }
  