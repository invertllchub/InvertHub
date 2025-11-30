import { useMutation } from "@tanstack/react-query";

async function editProfileAPI(payload: any) {
  const res = await fetch("/api/profile/put", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useEditProfile() {
  return useMutation({
    mutationFn: editProfileAPI,
  });
}
