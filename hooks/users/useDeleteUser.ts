import { useMutation } from "@tanstack/react-query";

async function deleteUserAPI(id?: string) {
     if (!id) throw new Error("ID is required");
  const res = await fetch(`/api/users/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add user");
  return data;
}

export default function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUserAPI,
  });
}

