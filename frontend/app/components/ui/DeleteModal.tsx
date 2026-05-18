import React from "react";
import { Trash2, X } from "lucide-react";
import ClientPortal from "~/components/ui/ClientPortal";

type DeleteModalProps = {
  onConfirm: () => void;
  onClose: () => void;
  description: string;
};

export const DeleteModal = ({
  onConfirm,
  onClose,
  description,
}: DeleteModalProps) => {
  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Delete Transaction</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">"{description}"</span>?
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    </ClientPortal>
  );
};
