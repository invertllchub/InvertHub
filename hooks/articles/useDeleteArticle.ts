import { useMutation } from "@tanstack/react-query";

async function deleteArticleAPI(id?: string) {
     if (!id) throw new Error("ID is required");
  const res = await fetch(`/api/articles/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export default function useDeleteArticle() {
  return useMutation({
    mutationFn: deleteArticleAPI,
  });
}

