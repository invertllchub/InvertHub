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

const fetchJobs = async (): Promise<JobsResponse> => {
    const res = await fetch(`/api/jobs/getAll`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json;
};

export default function useGetJobs(): UseQueryResult<JobsResponse, Error> {
    return useQuery<JobsResponse, Error>({
        queryKey: ["jobs"],
        queryFn: () => fetchJobs(),
        staleTime: 1000 * 60 * 5,
    });
}
