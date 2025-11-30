"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { showToast } from "@/components/toast/Toast";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/modal/CustomModal";

type DeleteSectionProps = {
  id: string;
  item: string;
  deleteFn: (id: string, options?: any) => void;   
};

export default function DeleteBtn({ id, item, deleteFn }: DeleteSectionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    setModalOpen(false);

    if (!id) return;
    setLoading(true);

    const toastId = showToast("loading", { message: `Deleting ${item}...` });

    deleteFn(id, {
      onSuccess: () => {
        showToast("success", { message: `${item} deleted successfully!`, toastId });
        setLoading(false);
        router.back();
      },
      onError: (err: any) => {
        showToast("error", { message: err.message || `Failed to delete ${item}`, toastId });
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
      
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          🗑️ Delete {item}
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Removing an item is a permanent action. Once deleted, all related data will be lost 
          and cannot be restored. Use this option only if you're sure.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="
            flex items-center gap-2 justify-center cursor-pointer
            bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700
            transition-all duration-200
            px-5 py-3 rounded-xl border border-red-200 shadow-sm font-medium
            active:scale-95
          "
        >
          <Trash2 size={20} />
          {loading ? "Deleting..." : `Delete ${item}`}
        </button>
      </div>

      <CustomModal
        isOpen={modalOpen}
        title="⚠️ Confirm Deletion"
        description={`Are you sure you want to delete this ${item}? This action cannot be undone.`}
        loading={loading}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
