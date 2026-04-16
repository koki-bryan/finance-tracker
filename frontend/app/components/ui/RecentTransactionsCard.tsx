import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { type Transaction, CATEGORIES } from "~/contexts/TransactionContext";

type RecentTransactionsType = {
  transaction: Transaction;
};

const RecentTransactionsCard = ({ transaction }: RecentTransactionsType) => {
  const category = CATEGORIES.find((c) => c.id === transaction.category_id);

  const isIncome = category?.type === "income";
  const convertDate = new Date(transaction.date);
  return (
    <div className="flex justify-between border-b border-gray-200 p-2 mb-1">
      <div className="flex gap-2 items-center min-w-0 pb-1">
        {/* Icon */}
        <div
          className={`p-2 rounded-lg shrink-0 ${isIncome ? "bg-green-200" : "bg-red-200"}`}
        >
          {isIncome ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
        </div>
        <div className="text-xs md:text-sm min-w-0">
          {/* Description */}
          <p className="font-medium truncate">{transaction.description}</p>

          {/* Category */}
          <p className="text-[10px] text-xs">{category?.name}</p>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col text-xs md:text-sm text-right shrink-0">
        <p className={`${isIncome ? "text-green-600" : "text-red-600"}`}>
          {isIncome ? "+" : "-"}
          {parseFloat(transaction.amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
        </p>

        {/* Date */}
        <p>
          {new Intl.DateTimeFormat("en-PH", { dateStyle: "medium" }).format(
            convertDate,
          )}
        </p>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
