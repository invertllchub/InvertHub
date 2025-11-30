"use client";

import { useState } from "react";
// React-hook-Form & Zod Validation
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditPassFormFields, EditPassSchema } from "@/schemas/users/EditPasswordSchema";
// Toast
import { showToast } from "@/components/toast/Toast";
// Types
import { User } from "@/types/users";
// Components
import PublishBtn from "../Buttons/PublishBtn";
// Icons
import { Eye, EyeOff } from "lucide-react";
// React Query & Hooks
import useEditPass from "@/hooks/users/useEditPass";

export default function EditPassword({ user }: { user: User }) {
  const [show, setShow] = useState(false);
  const { mutate } = useEditPass();
  const userId = user.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditPassFormFields>({
    resolver: zodResolver(EditPassSchema),
  });

  const onSubmit: SubmitHandler<EditPassFormFields> = (data) => {
    const toastId = showToast("loading", { message: "Updating password..." });

    const payload = { 
      id: userId, 
      newPassword: data.newPassword 
    };

    mutate(payload, {
      onSuccess: () => {
        showToast("success", { message: "Password updated successfully", toastId });
        reset();
      },
      onError: (err: any) => {
        showToast("error", { message: err.message || "Failed to update password", toastId });
      },
    });
  };

  return (
    <form
      id="edit-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10"
    >
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          🔐 Update Password
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Keep your account secure by updating your password regularly.
        </p>

        {/* INPUT WRAPPER */}
        <div className="w-full max-w-md">
          <label className="block text-gray-700 font-medium mb-2">
            New Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword")}
              className={`w-full border ${
                errors.newPassword ? "border-red-400" : "border-gray-200"
              } p-3 rounded-xl shadow-sm
              focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500
              transition-all duration-200 outline-none`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {show ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.newPassword.message?.toString()}
            </p>
          )}
        </div>
      </div>

      <div>
        <PublishBtn
          text={isSubmitting ? "Saving..." : "Save Changes"}
          form="edit-password-form"
        />
      </div>
    </form>
  );
}
