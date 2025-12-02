"use client";
import { useState } from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormFields } from "../../schemas/auth/LoginSchema";
import { LoginSchema } from "../../schemas/auth/LoginSchema";
// Toast
import { showToast } from "@/components/toast/Toast";
// Icons
import { Eye, EyeOff  } from 'lucide-react';
// React Query Hook
import { useLogin } from "@/hooks/login/useLogin";
// Navigation
import { useRouter } from "next/navigation";

function LoginForm() {
  const { mutate } = useLogin();
  const router = useRouter();
  const [show, setShow] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Please wait a few seconds to login...",
    });

    const payload = {
      email: data.email,
      password: data.password
    }

    mutate(payload, {
      onSuccess: () => {
        router.push("/dashboard"); 
        showToast("success", {
          message: "Login Successfuly!",
          toastId,
        });
      },
      onError: (err: any) => {
        showToast("error", {
          message: err.message || "Login Failed",
          toastId,
        });
      },
    });
  };

  return (
    <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            {...register("email")}
            placeholder="Enter Your Email"
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2"
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              autoComplete="current-password"
              type={show ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Your Password.."
              className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2"
            />
            <button 
            type="button"
            className="absolute right-3 bottom-5"
            onClick={() => setShow(!show)}
            >
              {show ? (
                <Eye size={20}/>
              ) : (
                <EyeOff size={20}/>
              )}
            </button>
          </div>

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
      </div>
    </form>
  );
}


export default LoginForm;
