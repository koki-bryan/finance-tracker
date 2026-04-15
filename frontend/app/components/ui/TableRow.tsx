import React from "react";
import { PenBox, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { type Transaction, CATEGORIES } from "~/contexts/TransactionContext";

type TableRowProps = {
  transaction: Transaction;
};

const INCOME_STYLE = "text-green-700 bg-green-100";
const EXPENSE_STYLE = "text-red-700 bg-red-100";

const TableRow = ({ transaction }: TableRowProps) => {
  const category = CATEGORIES.find((c) => c.id === transaction.category_id);

  const isIncome = category?.type === "income";

  const formatDate = new Date(transaction.date);
  return (
    <tr className="border-b border-gray-200">
      {/* Date */}
      <td className="">
        {new Intl.DateTimeFormat("en-PH", { dateStyle: "medium" }).format(
          formatDate,
        )}
      </td>

      {/* Description */}
      <td className="">{transaction.description}</td>

      {/*Category Name*/}
      <td className="">{category?.name}</td>

      {/* Category Type */}
      <td className="">
        <div
          className={`flex gap-1 items-center rounded-full p-1 w-fit ${isIncome ? INCOME_STYLE : EXPENSE_STYLE}`}
        >
          {category?.type === "income" ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {category?.type}
        </div>
      </td>

      {/* Amount */}
      <td
        className={`${isIncome ? "text-green-700" : "text-red-700"} whitespace-nowrap`}
      >
        <span className="flex items-center tabular-nums">
          {isIncome ? "+" : "-"}
          {parseFloat(transaction.amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
        </span>
      </td>
      <td className="">
        <div className="flex items-center gap-2">
          <button className="hover:bg-indigo-100 cursor-pointer p-2 rounded-lg">
            <PenBox className="w-4 h-4 cursor-pointer text-indigo-600" />
          </button>
          <button className="hover:bg-red-100 cursor-pointer p-2 rounded-lg">
            <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
