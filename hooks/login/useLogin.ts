import { useMutation } from "@tanstack/react-query";

async function loginAPI(data: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.message || "Login failed");

  return json;
}

export function useLogin() {
  return useMutation({
    mutationFn: loginAPI,
  });
}
