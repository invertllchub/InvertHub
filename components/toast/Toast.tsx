"use client"
import React from 'react'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaTimesCircle  } from 'react-icons/fa'

export type ToastStatus = "loading" | "success" | "error"

interface ToastOptions {
    message?: string
    toastId?: string | number
}

export const showToast = (status: ToastStatus, options?: ToastOptions) => {
  const { message, toastId } = options || {}

  switch (status) {
    case "loading":
    return toast.loading(
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="h-10 w-10 border-4 border-gray-400 border-t-black rounded-full animate-spin"></div>
        <span>{message || "Loading..."}</span>
      </div>,
      { autoClose: false, icon: false }
    )

    case "success":
      if (toastId) {
        toast.update(toastId, {
          render: (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-green-600">
              <FaCheckCircle size={40}/> 
              <span>{message || "Success!"}</span>
            </div>
          ),
          type: "success",
          isLoading: false,
          icon: false,
          autoClose: 3000,
        })
      }
      break

    case "error":
      if (toastId) {
        toast.update(toastId, {
          render: (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-red-600">
              <FaTimesCircle size={40}/> 
              <span>{message || "Error!"}</span>
            </div>
          ),
          type: "error",
          isLoading: false,
          icon: false,
          autoClose: 3000,
        })
      }
      break
  }
}
