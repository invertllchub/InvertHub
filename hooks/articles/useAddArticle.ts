import { useMutation } from "@tanstack/react-query";

async function addArticleAPI(payload: any) {
  const res = await fetch("/api/articles/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to add Article");
  return data;
}

export default function useAddArticle() {
  return useMutation({
    mutationFn: addArticleAPI,
  });
}
