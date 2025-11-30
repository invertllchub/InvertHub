import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "@/types/project";


export interface PaginationInfo {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ProjectResponse {
    success: boolean;
    message: string;
    errors: any;
    data: {
        data: Project[];
        pagination: PaginationInfo;
    };
}

export const fetchProjects = async (page: number, limit: number, searchValue: string): Promise<ProjectResponse> => {
    const res = await fetch(`/api/projects/getAllWithPagination?SearchPram=${searchValue}&pageNumber=${page}&pageSize=${limit}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json;
};

export default function useGetProjectsWithPagination(currentPage: number, limit: number, searchValue: string): UseQueryResult<ProjectResponse, Error> {
    return useQuery<ProjectResponse, Error>({
        queryKey: ["projects", currentPage, searchValue],
        queryFn: () => fetchProjects(currentPage, limit, searchValue),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 3
    });
}
