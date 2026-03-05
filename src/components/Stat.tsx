interface StatProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}

export function Stat({ label, value, unit, trend }: StatProps) {
  const trendColor =
    trend === "up"
      ? "text-open"
      : trend === "down"
        ? "text-red-400"
        : "text-foreground";

  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-xl font-semibold font-mono ${trendColor}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
        {unit && (
          <span className="text-sm text-muted-foreground ml-1">{unit}</span>
        )}
      </p>
    </div>
  );
}
