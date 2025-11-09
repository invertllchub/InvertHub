// utils/CloudinaryUpload.ts

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  // تحديد نوع الملف تلقائيًا
  let resourceType: "image" | "video" | "raw" = "raw";

  if (file.type.startsWith("image/")) {
    resourceType = "image";
  } else if (file.type.startsWith("video/")) {
    resourceType = "video";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // تحديد الفولدر حسب نوع الملف
  if (resourceType === "image" || resourceType === "video") {
    formData.append("folder", "INVERT-HUB");
  } else {
    formData.append("folder", "CVs");
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Upload failed");
  }

  const data = await res.json();
  return data.secure_url; 
}
