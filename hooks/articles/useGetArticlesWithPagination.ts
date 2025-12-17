import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Article } from "@/types/articles";


export interface PaginationInfo {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ArticleResponse {
    success: boolean;
    message: string;
    errors: any;
    data: {
        data: Article[];
        pagination: PaginationInfo;
    };
}

export const fetchArticles = async (page: number, limit: number, searchValue: string): Promise<ArticleResponse> => {
    const res = await fetch(`/api/articles/getAllWithPagination?SearchPram=${searchValue}&pageNumber=${page}&pageSize=${limit}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json;
};

export default function useGetArticlesWithPagination(currentPage: number, limit: number, searchValue: string): UseQueryResult<ArticleResponse, Error> {
    return useQuery<ArticleResponse, Error>({
        queryKey: ["articles", currentPage, searchValue],
        queryFn: () => fetchArticles(currentPage, limit, searchValue),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 3
    });
}
