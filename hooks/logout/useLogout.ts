import { useMutation } from "@tanstack/react-query";

async function logoutAPI() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutAPI,
  });
}