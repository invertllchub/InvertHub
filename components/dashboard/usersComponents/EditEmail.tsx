"use client";

// React-hook-Form & Zod Validation
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEmailSchema, EditEmailFormFields } from "@/schemas/users/EditEmailSchema";
// Toast
import { showToast } from "@/components/toast/Toast";
// Types
import { User } from "@/types/users";
// Components
import PublishBtn from "../Buttons/PublishBtn";
// React Query & Hooks
import useEditEmail from "@/hooks/users/useEditEmail";

export default function EditEmail({ user }: { user: User }) {
  const { mutate } = useEditEmail();
  const userId = user.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditEmailFormFields>({
    resolver: zodResolver(EditEmailSchema),
    defaultValues: { newEmail: user.email },
  });

  const onSubmit: SubmitHandler<EditEmailFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Updating email address...",
    });

    const payload = { 
      id: userId,
      newEmail: data.newEmail 
    };


    mutate(payload, {
      onSuccess: () => {
        showToast("success", {
          message: "Email updated successfully",
          toastId,
        });
        reset();
      },
      onError: (err: any) => {
        showToast("error", {
          message: err.message || "Failed to update email",
          toastId,
        });
      },
    });
  };

  return (
    <form
      id="edit-email-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10"
    >
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          ✉️ Update Email Address
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Keep your account secure by ensuring your email address is valid and up to date.  
          This email will be used for login and receive system notifications.
        </p>

        {/* INPUT WRAPPER */}
        <div className="w-full max-w-md">
          <label className="block text-gray-700 font-medium mb-2">
            Change Email Address ?
          </label>

          <input
            type="email"
            placeholder="example@mail.com"
            {...register("newEmail")}
            className={`w-full border ${
              errors.newEmail ? "border-red-400" : "border-gray-200"
            } p-3 rounded-xl shadow-sm
            focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500
            transition-all duration-200 outline-none`}
          />

          {/* ERROR MESSAGE */}
          {errors.newEmail && (
            <p className="text-red-500 text-sm mt-2">
              {errors.newEmail.message?.toString()}
            </p>
          )}
        </div>
      </div>

      <div>
        <PublishBtn
          text={isSubmitting ? "Saving..." : "Save Changes"}
          form="edit-email-form"
        />
      </div>
    </form>
  );
}
