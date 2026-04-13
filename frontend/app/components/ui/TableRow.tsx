import React from "react";
import { PenBox, Trash2 } from "lucide-react";
import { type Transaction, CATEGORIES } from "~/contexts/TransactionContext";

type TableRowProps = {
  transaction: Transaction;
};

const TableRow = ({ transaction }: TableRowProps) => {
  const category = CATEGORIES.find((c) => c.id === transaction.category_id);

  const formatDate = new Date(transaction.date);
  return (
    <tr className="border-b border-gray-200">
      <td className="">
        {new Intl.DateTimeFormat("en-PH", { dateStyle: "medium" }).format(
          formatDate,
        )}
      </td>
      <td className="">{transaction.description}</td>
      <td className="">
        {category?.name} {/*Category Name*/}
      </td>
      <td className="">{category?.type}</td>
      <td className="">
        {parseFloat(transaction.amount).toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP",
        })}
      </td>
      <td className="">
        <div className="flex items-center gap-4">
          <button>
            <PenBox className="w-4 h-4 cursor-pointer" />
          </button>
          <button>
            <Trash2 className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
