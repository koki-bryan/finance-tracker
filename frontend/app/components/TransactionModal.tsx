import { X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, useTransactions } from "~/contexts/TransactionContext";
import {
  createTransaction,
  getTransactions,
} from "~/services/transactionService";

interface TransactionModalProps {
  onClose: () => void;
}

const EXPENSE_STYLE = "bg-red-100 border-red-400 text-red-600";
const INCOME_STYLE = "bg-green-100 border-green-400 text-green-600";
const DEFAULT_STYLE = "bg-gray-100 border-gray-400 text-gray-500";
const MODAL_LABEL_STYLE = "font-poppins text-gray-500";

const TransactionModal = ({ onClose }: TransactionModalProps) => {
  const [modalTransactionType, setModalTransactionType] = useState<
    "income" | "expense" | null
  >("expense"); // FOR STYLES ONLY

  const { fetchTransactions } = useTransactions();
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const filteredCategories =
    type === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.type === type);

  const handleType = (selectedType: "income" | "expense") => {
    setModalTransactionType(selectedType);
    setType(selectedType);
    setCategory("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cat = Number(category);
    const amt = Number(amount);
    if (
      !category ||
      Number.isNaN(cat) ||
      Number.isNaN(amt) ||
      !description.trim() ||
      !date
    ) {
      console.log("Missing or invalid fields");
      return;
    }
    const modifiedDate = new Date(date).toISOString().split("T")[0];

    try {
      const payload = {
        category: cat,
        amount: amt,
        description,
        date: modifiedDate,
      };

      const res = await createTransaction(payload);

      if (!res) return;
      await fetchTransactions();

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <form
        className="bg-white max-w-md w-full rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex p-4 flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            {/* Modal Title */}
            <h1 className="font-poppins text-lg font-semibold">
              Add Transaction
            </h1>
            <button onClick={onClose} type="button" className="cursor-pointer">
              <X />
            </button>
          </div>

          <hr className="border border-gray-300 w-full mt-2" />

          {/* Type Div */}
          <div className="flex flex-col">
            <h1 className={`${MODAL_LABEL_STYLE}`}>Type</h1>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => handleType("expense")}
                type="button"
                className={`flex-1 py-2 rounded-md border text-sm font-semibold mt-2 transition-colors ease-in-out duration-300 cursor-pointer ${modalTransactionType === "expense" ? EXPENSE_STYLE : DEFAULT_STYLE}`}
              >
                Expense
              </button>
              <button
                onClick={() => handleType("income")}
                type="button"
                className={`flex-1 py-2 rounded-md border text-sm font-semibold mt-2 transition-colors ease-in-out duration-300 cursor-pointer ${modalTransactionType === "income" ? INCOME_STYLE : DEFAULT_STYLE}`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Amount Div */}
          <div className="flex flex-col">
            <label htmlFor="amount" className={`${MODAL_LABEL_STYLE}`}>
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border p-2 border-gray-400 rounded-lg mt-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Category Div */}
          <div className="flex flex-col">
            <h2 className={`${MODAL_LABEL_STYLE}`}>Category</h2>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-lg border-gray-300 text-sm px-4 font-poppins mt-2"
            >
              <option value="">Select a category</option>
              {filteredCategories.map((category) => (
                // VALUE IS CATEGORY ID, NOT THE WORD
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description Div */}
          <div className="flex flex-col">
            <label htmlFor="description" className={`${MODAL_LABEL_STYLE}`}>
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="border p-2 border-gray-400 rounded-lg mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Date Div */}
          <div className="flex flex-col">
            <label htmlFor="date" className={`${MODAL_LABEL_STYLE}`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="border p-2 border-gray-400 rounded-lg mt-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Submit Cancel Buttons */}
          <div className="flex gap-2 w-full">
            <button
              onClick={onClose}
              type="button"
              className={`flex-1 py-2 rounded-md text-sm font-semibold mt-2 ${DEFAULT_STYLE} border border-gray-200! cursor-pointer`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-2 rounded-md border text-sm font-semibold mt-2 transition-colors ease-in-out duration-300 bg-indigo-600 text-white cursor-pointer`}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionModal;
