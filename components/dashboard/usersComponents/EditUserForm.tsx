"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, EditUserFormFields } from "@/schemas/users/EditUserSchema";
import { showToast } from "@/components/toast/Toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { User } from "@/types/users";
import PublishBtn from "../Buttons/PublishBtn";
import useEditUser from "@/hooks/users/useEditUser";


type JobProps = {
  user: User;
  status: boolean;
};

export default function EditUserForm({ user, status }: JobProps) {
  const defaultImage =
    "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg";
  // const [preview, setPreview] = useState<string>(user.imageUrl || defaultImage);
  const { mutate } = useEditUser();
  const userId = user.id;


  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  function approximateBirthDateFromAge(age: number) {
    const year = new Date().getFullYear() - age;
    return `${year}-01-01`;
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    // watch,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormFields>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      fullName: user.fullName,
      dateOfBirth: approximateBirthDateFromAge(user.age),
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      jobTitle: user.jobTitle,
      address: user.address,
      role: user.role,
    },
  });

  // const profileFile = watch("imageUrl");

  // useEffect(() => {
  //   if (!profileFile) {
  //     setPreview(user.imageUrl || defaultImage);
  //     return;
  //   }
  //   if (profileFile instanceof File) {
  //     const objectUrl = URL.createObjectURL(profileFile);
  //     setPreview(objectUrl);
  //     return () => URL.revokeObjectURL(objectUrl);
  //   }
  //   setPreview(profileFile);
  // }, [profileFile, user.imageUrl]);

  const onSubmit: SubmitHandler<EditUserFormFields> = async (data) => {
    const toastId = showToast("loading", { message: "Updating user information..." });

    const payload = {
      id: userId,
      isActive: status,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      role: data.role,
      address: data.address || "",
      jobTitle: data.jobTitle || "",
      phoneNumber: data.phoneNumber || "",
      imageUrl: defaultImage,
    };

    mutate(payload, {
      onSuccess: () => {
        showToast("success", { message: "User updated successfully!", toastId });
        reset();
      },
      onError: (err: any) => {
        showToast("error", { message: err.message || "Failed to update user", toastId });
      },
    });
  };

  // const handleDeleteImage = () => {
  //   setPreview(defaultImage);
  //   setValue("imageUrl", null);
  // };

  return (
    <form
      id="edit-user-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8 items-center md:items-stretch"
    >
      {/* ---------------------- Personal Info ---------------------- */}
      <section className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🧍 Personal Information</h2>
        <p className="text-gray-500 mb-6">Update the basic personal details of the user.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          {/* <div className="flex flex-col gap-3">
            <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
            <label
              htmlFor="profilePicture"
              className="relative w-28 h-28 rounded-xl border-2 border-gray-200 shadow cursor-pointer"
            >
              <Image
                src={preview || defaultImage}
                alt="Profile"
                fill
                className="object-cover rounded-xl"
              />
              {preview && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  X
                </button>
              )}
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("imageUrl", file, { shouldDirty: true });
              }}
            />
          </div> */}

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              {...register("fullName")}
              className={`w-full border ${
                errors.fullName ? "border-red-400" : "border-gray-200"
              } p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="flex gap-4">
              {genders.map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("gender")}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Birth Date</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`w-full border ${
                errors.dateOfBirth ? "border-red-400" : "border-gray-200"
              } p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all`}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="EG"
                  international
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-200 p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all"
                />
              )}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>
      </section>

      <hr className="4"/>

      {/* ---------------------- Job Info ---------------------- */}
      <section className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🏢 Job Information</h2>
        <p className="text-gray-500 mb-6">Update the professional details of the user.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Front End Developer"
              {...register("jobTitle")}
              className={`w-full border ${
                errors.jobTitle ? "border-red-400" : "border-gray-200"
              } p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all`}
            />
            {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g. Mansoura"
              {...register("address")}
              className={`w-full border ${
                errors.address ? "border-red-400" : "border-gray-200"
              } p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <div className="flex gap-4">
              {roles.map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("role")}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
        </div>
      </section>

      {/* ---------------------- Submit Button ---------------------- */}
      <div className="flex justify-end">
        <PublishBtn
          text={isSubmitting ? "Saving..." : "Save Changes"}
          form="edit-user-form"
        />
      </div>
    </form>
  );
}
