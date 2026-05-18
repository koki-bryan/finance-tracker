import React, { useState } from "react";
import { PenBox, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import {
  type Transaction,
  CATEGORIES,
  useTransactions,
} from "~/contexts/TransactionContext";
import { deleteTransaction } from "~/services/transactionService";
import { DeleteModal } from "./DeleteModal";
import UpdateTransactionModal from "../UpdateTransactionModal";

type TableRowProps = {
  transaction: Transaction;
};

const INCOME_STYLE = "text-green-700 bg-green-100";
const EXPENSE_STYLE = "text-red-700 bg-red-100";

const TableRow = ({ transaction }: TableRowProps) => {
  const { fetchTransactions } = useTransactions();
  const category = CATEGORIES.find((c) => c.id === transaction.category_id);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 👈 add this
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const isIncome = category?.type === "income";

  const formatDate = new Date(transaction.date);

  const handleDelete = async () => {
    deleteTransaction(transaction.id);
    fetchTransactions();
  };
  return (
    <>
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
        <td className="text-gray-800">{category?.name}</td>

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
            <button 
              className="hover:bg-indigo-100 cursor-pointer p-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                setShowUpdateModal(true);
              }}
            >
              <PenBox className="w-4 h-4 cursor-pointer text-indigo-600" />
            </button>
            <button
              className="hover:bg-red-100 cursor-pointer p-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            >
              <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
            </button>
          </div>
        </td>
      </tr>
      {showDeleteModal && (
        <DeleteModal
          description={transaction.description}
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showUpdateModal && (
        <UpdateTransactionModal
          transaction={transaction}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
};

export default TableRow;
