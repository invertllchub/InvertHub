import React from "react";
// React-hook-form and validation with Zod
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobApplicationFormFields } from "../../schemas/jobs/JobApplySchema";
import { JobApplySchema } from "../../schemas/jobs/JobApplySchema";
// Reach-phone-liberary
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// Types
import { Job } from "@/types/jobs";
// Functions
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";
// Toast
import { showToast } from "../toast/Toast";

type JobProps = {
  job: Job;
};

function JobApplication({ job }: JobProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationFormFields>({
    resolver: zodResolver(JobApplySchema),
  });

  const onSubmit: SubmitHandler<JobApplicationFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Submitting application...",
    });

    try {
      let cvUrl = "";

      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY!;

      const file = (data.CV as FileList)[0];
      if (file) {
        cvUrl = await uploadToCloudinary(file);
      }

      const jobTitle = job.title;
      const formData = new FormData();
      formData.append("Job Title", jobTitle);
      formData.append("Full Name", data.fullName);
      formData.append("Gender", data.gender);
      formData.append("Email", data.email);
      formData.append("Phone Number", data.phoneNumber);
      formData.append("CoverLetter", data.coverLetter);
      formData.append("CV_Link", cvUrl);

      const response = await fetch("/api/jobApplication", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", {
          message: "Application submitted successfully!",
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
        message: "Failed to submit the application, please try again later.",
        toastId,
      });
    }
  };

  return (
    <div className="w-full flex flex-row-reverse gap-4 justify-between md:my-10 bg-white py-3 md:py-6 px-6 md:px-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-7/12 mx-auto flex flex-col gap-4 mt-10 bg-white md:rounded-md md:shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Apply for {job?.title}</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              placeholder="Full Name"
              className="border p-3 rounded-lg focus:outline-none"
            />
            {errors.fullName && (
              <div className="text-red-500">
                {errors.fullName.message?.toString()}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              {...register("gender")}
              className="border p-3 rounded-lg focus:outline-none cursor-pointer"
            >
              <option value="" hidden>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <div className="text-red-500">
                {errors.gender.message?.toString()}
              </div>
            )}
          </div>
        </div>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Email Address"
          className="border p-3 rounded-lg focus:outline-none"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message?.toString()}</div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone Number</label>
          <div className="w-full flex gap-2">
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
                  className="border p-3 rounded-lg focus:outline-none w-full"
                />
              )}
            />
          </div>
          {errors.phoneNumber && (
            <div className="text-red-500">
              {errors.phoneNumber.message?.toString()}
            </div>
          )}
        </div>

        <label htmlFor="coverLetter">Cover Letter</label>
        <textarea
          id="coverLetter"
          {...register("coverLetter")}
          placeholder="Cover Letter..."
          rows={6}
          className="border p-3 rounded-lg focus:outline-none"
        />

        <label htmlFor="cv">Upload your CV</label>
        <input
          id="cv"
          type="file"
          {...register("CV")}
          accept=".pdf,.doc,.docx"
          className="
                block w-full text-sm text-gray-600 border rounded-lg 
                file:mr-4 file:py-2 file:px-4 file:cursor-pointer
                file:rounded-l-lg file:border
                file:text-sm file:font-semibold
                file:bg-black file:text-white"
        />
        {errors.CV && (
          <div className="text-red-500">{errors.CV.message?.toString()}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-6/12 md:w-3/12 mx-auto my-10 bg-black text-white py-3 rounded-lg cursor-pointer"
        >
          {isSubmitting ? "Loading..." : "Send Application"}
        </button>
      </form>
    </div>
  );
}

export default JobApplication;
