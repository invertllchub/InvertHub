import { useMutation } from "@tanstack/react-query";

async function editPassAPI(payload: any) {
  const res = await fetch("/api/users/editPass", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useEditPass() {
  return useMutation({
    mutationFn: editPassAPI,
  });
}
