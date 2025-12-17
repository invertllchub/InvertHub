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

const fetchArticles = async (): Promise<ArticleResponse> => {
  const res = await fetch(`/api/articles/getAll`);
  const json = await res.json();

  if (!res.ok) throw new Error(json.message);

  return json;
};

export default function useGetProjects(): UseQueryResult<ArticleResponse, Error> {
    return useQuery<ArticleResponse, Error>({
        queryKey: ["articles"],
        queryFn: () => fetchArticles(),
        staleTime: 1000 * 60 * 5,
    });
}
