import { Card, CardContent } from "../ui/card";

export default function StatCard({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string;
    icon: React.ReactNode;
  }) {
    return (
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        </CardContent>
      </Card>
    );
  }