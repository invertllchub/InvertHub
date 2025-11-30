import { useMutation } from "@tanstack/react-query";

async function deleteJobAPI(id?: string) {
     if (!id) throw new Error("ID is required");
  const res = await fetch(`/api/jobs/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useDeleteJob() {
  return useMutation({
    mutationFn: deleteJobAPI,
  });
}

