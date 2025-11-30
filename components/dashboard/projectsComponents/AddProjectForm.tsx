import { useState } from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProjectSchema } from "@/schemas/projects/AddProjectSchema";
import { AddProjectFormFields } from "@/schemas/projects/AddProjectSchema";
// Toast
import { showToast } from "@/components/toast/Toast";
// React Query Hooks
import useAddProject from "@/hooks/projects/useAddProject";

function AddProjectForm() {
  const { mutate } = useAddProject();
  const [preview, setPreview] = useState<string>("");

const handleFileChange = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setValue("ImageUrl", file);
};

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddProjectFormFields>({
    resolver: zodResolver(AddProjectSchema),
  });



  const onSubmit: SubmitHandler<AddProjectFormFields> = async (data) => {
    const toastId = showToast("loading", { message: "Submitting project..." });

    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Image", data.ImageUrl);
    formData.append("Link", data.Link);
    formData.append("Description", data.Description);


    mutate(formData, {
      onSuccess: () => {
        showToast("success", {
          message: "Project created successfully!",
          toastId,
        });
        reset();
      },
      onError: (err: any) => {
        showToast("error", {
          message: err.message || "Failed to submit project",
          toastId,
        });
      },
    });
  };
  
  return (
    <form id="add-project-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 ">

        {/* project Name */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            placeholder="e.g. Akarati"
            {...register("Name")}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.Name && (
            <div className="text-red-600">{errors.Name.message}</div>
          )}
        </div>

        {/* project Link */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Project Link
          </label>
          <input
            type="text"
            placeholder="https://www.Example.com"
            {...register("Link")}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.Link && (
            <div className="text-red-600">{errors.Link.message}</div>
          )}
        </div>

        {/* project Description */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            placeholder="Project Description"
            {...register("Description")}
            rows={7}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-md focus:none outline-0"
          />
          {errors.Description && (
            <div className="text-red-600">
              {errors.Description.message}
            </div>
          )}
        </div>

        {/* project Image */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Project Image
          </label>
          <div
            className="relative border-2 border-dashed rounded-md p-4 text-center cursor-pointer 
            min-h-[200px] flex items-center justify-center"
            onClick={() => document.getElementById("fileInput")?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) {
                handleFileChange(file);
              }
            }}
          >
            {!preview ? (
              <p>Drag & drop image here or click to upload</p>
            ) : (
              <>
                <img
                  src={preview}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview("");
                    setValue("ImageUrl", null);
                  }}
                  type="button"
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex 
                items-center justify-center opacity-100 hover:opacity-90 transition cursor-pointer z-10"
                >
                  ✕
                </button>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileChange(file);
                }
              }}
            />
          </div>
          {errors.ImageUrl && (
            <div className="text-red-600">{errors.ImageUrl.message?.toString()}</div>
          )}
        </div>

      </div>
    </form>
  );
}

export default AddProjectForm;
