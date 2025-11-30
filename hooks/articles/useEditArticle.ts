import { useMutation } from "@tanstack/react-query";

async function editArticleAPI(payload: any) {
  const res = await fetch("/api/articles/put", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to Edit Article");
  return data;
}

export default function useEditArticle() {
  return useMutation({
    mutationFn: editArticleAPI,
  });
}
