// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { Article } from "@/types/articles";


const fetchArticle = async (): Promise<Article[]> => {
    const res = await fetch('/api/articles/get');
    const result = await res.json()

    return result ?? []
};

export default function useGetArticles (): UseQueryResult<Article[]> {
    return useQuery({
        queryKey: ["articles"],
        queryFn: fetchArticle,
        staleTime: 1000 * 60 * 5
    })
}