import React from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscribeFormSchema } from "@/schemas/SubscribeFormSchema";
import { SubscribeFormFields } from "@/schemas/SubscribeFormSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";

function SubscribeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormFields>({
    resolver: zodResolver(SubscribeFormSchema),
  });

  const onSubmit: SubmitHandler<SubscribeFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "please wait seconds",
    });

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        showToast("success", {
          message: "You have been subscribed successfully",
          toastId,
        });
        reset();
      } else {
        showToast("error", {
          message: "Something went wrong. Please try again.",
          toastId,
        });
      }
    } catch (error) {
      console.error(error);
      showToast("error", {
        message: "Failed to subscribe, please try again later.",
        toastId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
    >
      <input
        type="email"
        {...register("email")}
        placeholder="Your email address"
        className="flex-grow px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      {errors.email && (
        <div className="text-red-600">{errors.email.message}</div>
      )}
      <button
        type="submit"
        className="cursor-pointer bg-gray-900 hover:bg-black text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

export default SubscribeForm;
