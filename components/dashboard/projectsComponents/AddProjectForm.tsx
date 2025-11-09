import React, { useState } from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProjectSchema } from "@/schemas/AddProjectSchema";
import { AddProjectFormFields } from "@/schemas/AddProjectSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";
// Cloudinary function
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";
// supabase
import { supabase } from "@/lib/supabaseClient"; 

function AddProjectForm() {
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setValue("pathImg", file);
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
    const toastId = showToast("loading", {
      message: "Submitting Project Application...",
    });

    try {
      let uploadedImageUrl = "";
      if (data.pathImg) {
        uploadedImageUrl = await uploadToCloudinary(data.pathImg);
      }

      const payload = {
        title: data.projectName,
        description: data.projectDescription,
        pathImg: uploadedImageUrl,
        link: data.projectLink,
      };


      const { data: result, error } = await supabase
        .from("projects")
        .insert([payload]);

      if (error) {
        console.error("❌ Supabase error:", error.message);
        showToast("error", {
          message: "Failed to add project: " + error.message,
          toastId,
        });
        return;
      }

      showToast("success", {
        message: "✅ Project added successfully!",
        toastId,
      });

      reset();
      setPreview("");
    } catch (error) {
      console.error("⚠️ Error submitting project:", error);
      showToast("error", {
        message: "Something went wrong. Please try again later.",
        toastId,
      });
    }
  };

  return (
    <form id="add-project-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">
        <div className="w-full">
          <label className="block mb-1 font-medium">Project Name</label>
          <input
            type="text"
            placeholder="Project Title"
            {...register("projectName")}
            className="border p-3 rounded-lg w-full"
          />
          {errors.projectName && (
            <div className="text-red-600">{errors.projectName.message}</div>
          )}
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Project Description"
            {...register("projectDescription")}
            className="border p-3 rounded-lg w-full h-28"
          />
          {errors.projectDescription && (
            <div className="text-red-600">
              {errors.projectDescription.message}
            </div>
          )}
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Project Image</label>
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
          {errors.pathImg && (
            <div className="text-red-600">{errors.pathImg.message}</div>
          )}
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Project Link</label>
          <input
            type="text"
            placeholder="https://example.com"
            {...register("projectLink")}
            className="border p-3 rounded-lg w-full"
          />
          {errors.projectLink && (
            <div className="text-red-600">{errors.projectLink.message}</div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddProjectForm;
