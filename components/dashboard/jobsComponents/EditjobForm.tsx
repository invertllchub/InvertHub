"use client";

// Types
import { Job, JobStatus } from "@/types/jobs";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditJobFormFields } from "@/schemas/jobs/EditJobSchema";
import { EditJobSchema } from "@/schemas/jobs/EditJobSchema";
// Toast
import { showToast } from "@/components/toast/Toast";
// Functions
import { ConvertObjectToTextarea } from "@/utils/ConvertObjectToTextarea";
import { ConvertTextareaToObject } from "@/utils/ConvertTextareaToObject";
// React Query Hook
import { useQueryClient } from "@tanstack/react-query";
import useEditJob from "@/hooks/jobs/useEditJob";
// Components
import PublishBtn from "../Buttons/PublishBtn";
import formatDateForInput from "@/utils/FormatDateForInput";



type JobProps = {
  job: Job;
  status: string;
};

export default function EditJobForm({ job, status }: JobProps) {
   const queryClient = useQueryClient();
  const { mutate } = useEditJob();
  const jobId = job.id;

    const EmpolymentTypeList = [
    { value: "FullTime", label: "Full-Time" },
    { value: "PartTime", label: "Part-Time" },
    { value: "Hybrid", label: "Full-Time / Part-Time" },
    { value: "Intern", label: "Intern" },
  ];

  const ExperienceLevelList = [
    { value: "Junior", label: "Junior" },
    { value: "MidLevel", label: "Mid-level" },
    { value: "Senior", label: "Senior" },
  ];


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditJobFormFields>({
    resolver: zodResolver(EditJobSchema),
    defaultValues: {
      title: job.title,
      location: job.location,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      closingDate: formatDateForInput(job.closingDate),
      description: job.description,
      keyResponsibilities: ConvertObjectToTextarea(job.keyResponsibilities),
      requirements: ConvertObjectToTextarea(job.requirements),
      benefits: ConvertObjectToTextarea(job.benefits),
    } as any,
  });

const onSubmit: SubmitHandler<EditJobFormFields> = async (data) => {
  const toastId = showToast("loading", {
    message: "Updating job details...",
  });

  const payload = {
    id: jobId,  
    title: data.title,
    location: data.location,
    employmentType: data.employmentType,
    experienceLevel: data.experienceLevel,
    status: status as JobStatus,
    closingDate: data.closingDate,
    description: data.description,
    keyResponsibilities: ConvertTextareaToObject(data.keyResponsibilities || ""),
    requirements: ConvertTextareaToObject(data.requirements || ""),
    benefits: ConvertTextareaToObject(data.benefits || ""),
  };

  mutate(payload, {
    onSuccess: () => {
      showToast("success", {
        message: "Job updated successfully!",
        toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      reset();
    },
    onError: (err: any) => {
      showToast("error", {
        message: err.message || "Failed to update job",
        toastId,
      });
    },
  });
};


  return (
    <form id="edit-job-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Front End Developer"
            {...register("title")}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.title && (
            <div className="text-red-500">
              {errors.title.message?.toString()}
            </div>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="e.g. Remote"
            {...register("location")}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.location && (
            <div className="text-red-500">
              {errors.location.message?.toString()}
            </div>
          )}
        </div>

        {/* Employment Type */}
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 font-medium mb-1">
            Employment Type
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            {EmpolymentTypeList.map((option) => (
              <label
                key={option.value}
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("employmentType")}
                  className="w-4 h-4 text-[#473472] border-gray-300 focus:ring-[#473472]"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.employmentType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.employmentType.message?.toString()}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 font-medium mb-1">
            Experience Level
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            {ExperienceLevelList.map((option) => (
              <label
                key={option.value}
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("experienceLevel")}
                  className="w-4 h-4 text-[#473472] border-gray-300 focus:ring-[#473472]"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.experienceLevel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experienceLevel.message?.toString()}
            </p>
          )}
        </div>

        {/* Closing Date */}
        <div className="flex-1">
          <label
            htmlFor="closingDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Closing Date
          </label>
          <input
            id="closingDate"
            type="date"
            placeholder="Select closing date"
            {...register("closingDate")}
            className="w-full rounded-lg border border-gray-200
              px-4 py-3 shadow-md focus:none outline-0
              placeholder-gray-400"
          />
          {errors.closingDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.closingDate.message?.toString()}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Job Description"
            rows={7}
            {...register("description")}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.description && (
            <div className="text-red-500">
              {errors.description.message?.toString()}
            </div>
          )}
        </div>

        {/* Resposibilities */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Key Responsibilities (one per line)
          </label>
          <textarea
            rows={7}
            {...register("keyResponsibilities")}
            placeholder={"e.g.\nHealth insurance\nRemote work flexibility"}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.keyResponsibilities && (
            <div className="text-red-500">
              {errors.keyResponsibilities.message?.toString()}
            </div>
          )}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requirements (one per line)
          </label>
          <textarea
            rows={7}
            {...register("requirements")}
            placeholder={
              "e.g.\n3+ years experience with React\nKnowledge of Tailwind CSS"
            }
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.requirements && (
            <div className="text-red-500">
              {errors.requirements.message?.toString()}
            </div>
          )}
        </div>

        {/* Benefits*/}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Benefits (one per line)
          </label>
          <textarea
            rows={7}
            {...register("benefits")}
            placeholder={"e.g.\nHealth insurance\nRemote work flexibility"}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.benefits && (
            <div className="text-red-500">
              {errors.benefits.message?.toString()}
            </div>
          )}
        </div>
      </div>

      {/* ---------------------- Submit Button ---------------------- */}
      <div className="flex justify-center md:justify-end mt-15">
        <PublishBtn
          text={isSubmitting ? "Saving..." : "Save Changes"}
          form="edit-job-form"
        />
      </div>
    </form>
    
  );
}
