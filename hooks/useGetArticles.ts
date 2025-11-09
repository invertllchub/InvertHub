// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { Article } from "@/types/articles";
// Supabase
import { supabase } from "@/lib/supabaseClient";

const fetchArticle = async (): Promise<Article[]> => {
    const {data} = await supabase
    .from("articles")
    .select("*")

    return data ?? []
};

export default function useGetArticles (): UseQueryResult<Article[]> {
    return useQuery({
        queryKey: ["articles"],
        queryFn: fetchArticle,
        staleTime: 1000 * 60 * 5
    })
}