import { Sector } from "recharts";

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
export function ExpenseTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: any[];
  total: number;
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";
  const color = item.payload?.fill ?? "#888780";

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-md text-sm">
      <p className="text-xs text-gray-400 mb-1">{item.name}</p>
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: color }}
        />
        <span className="font-semibold text-base text-gray-800">
          ₱{item.value.toLocaleString()}
        </span>
        <span className="ml-auto text-gray-400 text-xs">{pct}%</span>
      </div>
    </div>
  );
}

export // ─── Active donut shape ──────────────────────────────────────────────────────
function renderActiveShape(props: any) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 11, fill: "#9ca3af" }}
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 16, fontWeight: 600, fill: "#111827" }}
      >
        ₱{value.toLocaleString()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="white"
        strokeWidth={2}
      />
    </g>
  );
}
