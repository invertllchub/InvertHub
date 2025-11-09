"use client";

import { Trash2 } from "lucide-react";
import { showToast } from "../jobs/Toast";
import { supabase } from "@/lib/supabaseClient";

type DeleteBtnProps = {
  page: string;
  id?: string | number;
  selectedIds?: string[] | number[];
  onDeleted?: () => void;
};

function DeleteBtn({ page, id, selectedIds = [], onDeleted }: DeleteBtnProps) {
  const handleDeleteOne = async () => {
    const toastId = showToast("loading", {
      message: "Deleting project...",
    });

    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from(page).delete().eq("id", id);

      if (error) throw error;

      showToast("success", {
        message: "Project deleted successfully",
        toastId,
      });

      onDeleted?.(); // تحديث القائمة بعد الحذف
    } catch (err) {
      console.error("❌ Delete error:", err);
      showToast("error", {
        message: "Something went wrong while deleting",
        toastId,
      });
    }
  };

  const handleDeleteSelected = async () => {
    const toastId = showToast("loading", {
      message: "Deleting selected items...",
    });

    if (selectedIds.length === 0) {
      showToast("error", {
        message: "No items selected",
        toastId,
      });
      return;
    }

    if (!confirm(`Delete ${selectedIds.length} selected items?`)) return;

    try {
      const { error } = await supabase.from(page).delete().in("id", selectedIds);

      if (error) throw error;

      showToast("success", {
        message: "Selected items deleted successfully",
        toastId,
      });

      onDeleted?.();
    } catch (err) {
      console.error("❌ Delete error:", err);
      showToast("error", {
        message: "Error deleting selected items",
        toastId,
      });
    }
  };

  return (
    <div
      title={id ? "Delete this project" : "Delete selected projects"}
      className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
      onClick={id ? handleDeleteOne : handleDeleteSelected}
    >
      <Trash2 size={20} />
    </div>
  );
}

export default DeleteBtn;
