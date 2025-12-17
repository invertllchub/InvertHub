import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types/articles";

export const fetchArticle = async (slug: string): Promise<Article> => {
  const res = await fetch(`/api/articles/getOne?slug=${slug}`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetArticle(slug: string, p0: { enabled: boolean; }) {
    return useQuery({
        queryKey: ["article", slug],
        queryFn: () => fetchArticle(slug),
        enabled: !!slug,
    });
}
