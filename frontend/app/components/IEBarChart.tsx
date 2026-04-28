import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { IESummary } from "~/contexts/TransactionContext";
import { IETooltip } from "./ui/IEBarChartEdits";

interface IEBarChartProps {
  data: IESummary[];
}

// ─── Colors ──────────────────────────────────────────────────────────────────
const INCOME_COLOR = "#5DCAA5";
const EXPENSE_COLOR = "#D85A30";

// ─── Chart ────────────────────────────────────────────────────────────────────
const IEBarChart = ({ data }: IEBarChartProps) => {
  const chartData = data.reduce((acc, curr) => {
    // ✅ Format date here so XAxis picks it up automatically
    const label = new Date(curr.date_trunc).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const existing = acc.find((item) => item.date_trunc === label);
    if (existing) {
      existing[curr.type] = parseFloat(curr.sum);
    } else {
      acc.push({
        date_trunc: label,
        income: curr.type === "income" ? parseFloat(curr.sum) : 0,
        expense: curr.type === "expense" ? parseFloat(curr.sum) : 0,
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} barCategoryGap="30%" barGap={4}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="date_trunc"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={<IETooltip />}
          cursor={{ fill: "#f9fafb", radius: 4 }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-gray-500 capitalize">{value}</span>
          )}
        />
        <Bar dataKey="income" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" fill={EXPENSE_COLOR} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IEBarChart;
