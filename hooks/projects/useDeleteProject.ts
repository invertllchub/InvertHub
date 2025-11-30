import { useMutation } from "@tanstack/react-query";

async function deleteProjectAPI(id?: string) {
     if (!id) throw new Error("ID is required");
  const res = await fetch(`/api/projects/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useDeleteProject() {
  return useMutation({
    mutationFn: deleteProjectAPI,
  });
}

