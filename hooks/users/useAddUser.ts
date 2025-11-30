import { useMutation } from "@tanstack/react-query";

async function addUserAPI(payload: any) {
  const res = await fetch("/api/users/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useAddUser() {
  return useMutation({
    mutationFn: addUserAPI,
  });
}

