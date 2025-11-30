import { useMutation } from "@tanstack/react-query";

async function editEmailAPI(payload: any) {
  const res = await fetch("/api/users/editEmail", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useEditEmail() {
  return useMutation({
    mutationFn: editEmailAPI,
  });
}
