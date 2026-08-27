import type { ChartDataPoint } from "./types";

type LineChartProps = {
  data: ChartDataPoint[];
  label: string;
  valueLabel: string;
  minValue?: number;
  maxValue?: number;
};

const width = 360;
const height = 180;
const padding = { top: 16, right: 16, bottom: 36, left: 16 };

export function LineChart({
  data,
  label,
  valueLabel,
  minValue,
  maxValue,
}: LineChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5">
        <p className="text-sm text-muted-foreground">
          There is not enough data to display a trend yet.
        </p>
      </div>
    );
  }

  const values = data.map((point) => point.value);
  const min = minValue ?? Math.min(...values);
  const max = maxValue ?? Math.max(...values);
  const range = Math.max(max - min, 1);
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const points = data.map((point, index) => {
    const x =
      padding.left +
      (data.length === 1
        ? chartWidth / 2
        : (index / (data.length - 1)) * chartWidth);
    const y = padding.top + ((max - point.value) / range) * chartHeight;

    return { ...point, x, y };
  });

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="h-auto min-w-[22.5rem] w-full text-primary"
      >
        <title>{label}</title>
        <desc>
          {data
            .map((point) => `${point.label}: ${point.value} ${valueLabel}`)
            .join(", ")}
        </desc>
        {[0, 0.5, 1].map((position) => (
          <line
            key={position}
            x1={padding.left}
            x2={width - padding.right}
            y1={padding.top + chartHeight * position}
            y2={padding.top + chartHeight * position}
            stroke="currentColor"
            strokeOpacity="0.12"
          />
        ))}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
        />
        {points.map((point) => (
          <g key={point.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="var(--card)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={height - 12}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
