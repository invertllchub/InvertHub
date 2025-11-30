import { useMutation } from "@tanstack/react-query";

async function editProjectAPI(formData: FormData) {
  const res = await fetch("/api/projects/put", {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useEditProject() {
  return useMutation({
    mutationFn: editProjectAPI,
  });
}
