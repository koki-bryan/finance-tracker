// ─── Colors ──────────────────────────────────────────────────────────────────
const INCOME_COLOR = "#5DCAA5";
const EXPENSE_COLOR = "#D85A30";

export // ─── Custom Tooltip ───────────────────────────────────────────────────────────
function IETooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  const income = payload.find((p: any) => p.dataKey === "income")?.value ?? 0;
  const expense = payload.find((p: any) => p.dataKey === "expense")?.value ?? 0;
  const net = income - expense;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-md text-sm min-w-40">
      <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: INCOME_COLOR }}
            />
            <span className="text-gray-500 text-xs">Income</span>
          </div>
          <span className="font-semibold text-gray-800">
            ₱{income.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: EXPENSE_COLOR }}
            />
            <span className="text-gray-500 text-xs">Expense</span>
          </div>
          <span className="font-semibold text-gray-800">
            ₱{expense.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="border-t border-gray-100 mt-1 pt-1.5 flex items-center justify-between">
          <span className="text-xs text-gray-400">Net</span>
          <span
            className="font-semibold text-xs"
            style={{ color: net >= 0 ? INCOME_COLOR : EXPENSE_COLOR }}
          >
            {net >= 0 ? "+" : ""}₱
            {net.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
