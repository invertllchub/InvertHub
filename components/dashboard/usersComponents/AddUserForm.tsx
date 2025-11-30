"use client";
import { useState } from "react";
// import Image from "next/image";
// React Hook Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema } from "@/schemas/users/AddUserSchema";
import { AddUserFormFields } from "@/schemas/users/AddUserSchema";
// React-Phone-Number
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// Toast
import { showToast } from "@/components/toast/Toast";
// Icons
import { Eye, EyeOff  } from 'lucide-react';
// React Query Hook
import useAddUser from "@/hooks/users/useAddUser";
// import { uploadToCloudinary } from "@/utils/CloudinaryUpload";


export default function AddUserForm() {
  const defaultImage = "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg"
  // const [preview, setPreview] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const { mutate } = useAddUser();

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddUserFormFields>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: { role: "user" },
  });

//   const profileFile = watch("imageUrl");

// useEffect(() => {
//   if (profileFile) {
//     const previewUrl = URL.createObjectURL(profileFile);
//     setPreview(previewUrl);
//     return () => URL.revokeObjectURL(previewUrl);
//   } else {
//     setPreview(null);
//   }
// }, [profileFile]);


const onSubmit: SubmitHandler<AddUserFormFields> = async (data) => {
  const toastId = showToast("loading", {
    message: "Submitting user Application...",
  });

      // let uploadedImageUrl = "";
      // if (data.imageUrl) {
      //   uploadedImageUrl = await uploadToCloudinary(data.imageUrl);
      // }

  const payload = {
    isActive: true,
    fullName: data.fullName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    role: data.role,
    email: data.email,
    hashPassword: data.hashPassword,
    address: data.address || "",
    jobTitle: data.jobTitle || "",
    phoneNumber: data.phoneNumber || "",
    imageUrl: defaultImage,
  };

  mutate(payload, {
    onSuccess: (res) => {
      console.log("✅ API Success Response:", res);
      showToast("success", {
        message: "User created successfully!",
        toastId,
      });
      reset();
    },
    onError: (err: any) => {
      console.error("❌ API Error Response:", err);
      showToast("error", {
        message: err.message || "Failed to submit user",
        toastId,
      });
    },
  });
};


  // const handleDeleteImage = () => {
  //   setValue("imageUrl", null, { shouldDirty: true });
  // };

  return (
    <form id="add-user-form" onSubmit={handleSubmit(onSubmit)}>
      {/* ---------------------- Section 1 ---------------------- */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🧍‍♂️ Personal Information
        </h2>
        <p className="text-gray-500 mb-6">
          Basic personal details for identifying the user.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Profile Picture */}
          {/* <div className="flex flex-col gap-3">
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <label
              htmlFor="profilePicture"
              className="relative w-28 h-28 rounded-full border-4 border-gray-200 shadow-md cursor-pointer"
            >
              <Image
                src={
                  preview || defaultImage}
                alt="Profile"
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-full"
              />
                {preview && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute -top-5 -right-5 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer"
                  >
                    X
                  </button>
                )}
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("imageUrl", file, { shouldDirty: true });
              }}
              hidden
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageUrl.message?.toString()}
              </p>
            )}
          </div> */}

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium mb-1">
              Select Gender
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              {genders.map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("gender")}
                    className="w-4 h-4 text-[#473472] border-gray-300 focus:ring-[#473472]"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message?.toString()}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="e.g. Mohamed"
              {...register("fullName")}
              className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
            />
            {errors.fullName && (
              <div className="text-red-500">{errors.fullName.message?.toString()}</div>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Birth Date</label>
            <input
              id="birthDate"
              type="date"
              placeholder="Select Birth Date"
              {...register("dateOfBirth")}
              className="w-full rounded-lg border border-gray-200
                px-4 py-3 shadow-md focus:none outline-0
                placeholder-gray-400"
            />
            {errors.dateOfBirth && (
              <div className="text-red-500">{errors.dateOfBirth.message?.toString()}</div>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
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
                  className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
                />
              )}
            />
            {errors.phoneNumber && (
              <div className="text-red-500">
                {errors.phoneNumber.message?.toString()}
              </div>
            )}
          </div>

        </div>
      </div>

      <hr className="my-8"/>

      {/* ---------------------- Section 2 ---------------------- */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🏢 Job Information
        </h2>
        <p className="text-gray-500 mb-6">
          Details about the user's professional background.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Job Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Front End Developer"
              {...register("jobTitle")}
              className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
            />
            {errors.jobTitle && (
              <div className="text-red-500">
                {errors.jobTitle.message?.toString()}
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="e.g. Mansoura"
              {...register("address")}
              className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
            />
            {errors.address && (
              <div className="text-red-500">
                {errors.address.message?.toString()}
              </div>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium mb-1">
              Select Role
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              {roles.map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("role")}
                    className="w-4 h-4 text-[#473472] border-gray-300 focus:ring-[#473472]"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="my-8"/>

      {/* ---------------------- Section 3 ---------------------- */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🔐 Account Details
        </h2>
        <p className="text-gray-500 mb-6">
          Credentials used to log in to the system.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="e.g. example@gmail.com"
              {...register("email")}
              className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
            />
            {errors.email && (
              <div className="text-red-500">
                {errors.email.message?.toString()}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="e.g. 123456"
                {...register("hashPassword")}
                className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
              />
              <button 
              type="button"
              className="absolute right-5 bottom-4"
              onClick={() => setShow(!show)}
              >
                {show ? (
                  <Eye size={20}/>
                ) : (
                  <EyeOff size={20}/>
                )}
              </button>
            </div>
            {errors.hashPassword && (
              <div className="text-red-500">
                {errors.hashPassword.message?.toString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
