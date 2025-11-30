import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Job } from "@/types/jobs";


export interface PaginationInfo {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface JobsResponse {
    success: boolean;
    message: string;
    errors: any;
    data: {
        data: Job[];
        pagination: PaginationInfo;
    };
}

export const fetchJobs = async (page: number, limit: number, searchValue: string): Promise<JobsResponse> => {
    const res = await fetch(`/api/jobs/getAllWithPagination?SearchPram=${searchValue}&pageNumber=${page}&pageSize=${limit}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to fetch jobs");

    return json;
};

export default function useGetJobsWithPagination(currentPage: number, limit: number, searchValue: string): UseQueryResult<JobsResponse, Error> {
    return useQuery<JobsResponse, Error>({
        queryKey: ["jobs", currentPage, searchValue],
        queryFn: () => fetchJobs(currentPage, limit, searchValue),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 3
    });
}
