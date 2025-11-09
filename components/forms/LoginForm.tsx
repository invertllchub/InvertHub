"use client";
import React from "react";
import Link from "next/link";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormFields } from "../../schemas/LoginSchema";
import { LoginSchema } from "../../schemas/LoginSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";
// Next Navigation
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Please wait a few seconds to login...",
    });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        showToast("error", {
          message: result.message || "Login failed!",
          toastId,
        });
        return;
      }

      const { token, role } = result;

      document.cookie = `token=${token}; path=/; max-age=86400;`;
      document.cookie = `role=${role}; path=/; max-age=86400;`;

      showToast("success", {
        message: "Login has been done successfully!",
        toastId,
      });

      reset();

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      showToast("error", {
        message: "Failed to login, please try again later.",
        toastId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter Your User Name.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2"
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter Your Password.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2"
          />
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 px-4 rounded-lg shadow-md 
                mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                transition duration-200 ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer"
                }`}
        >
          {isSubmitting ? "Logining" : "Login"}
        </button>
        <p className="text-sm text-gray-600">
          Not registered yet?{" "}
          <Link
            href="/Signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
