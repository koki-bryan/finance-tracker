import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No transactions found",
  description = "Get started by creating a new transaction, or try adjusting your filters.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <FolderOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
