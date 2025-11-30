import { useMutation } from "@tanstack/react-query";

async function addProjectAPI(formData: FormData) {
  const res = await fetch("/api/projects/post", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useAddProject() {
  return useMutation({
    mutationFn: addProjectAPI,
  });
}
