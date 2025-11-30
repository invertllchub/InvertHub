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

const fetchProjects = async (): Promise<ProjectResponse> => {
  const res = await fetch(`/api/projects/getAll`);
  const json = await res.json();

  if (!res.ok) throw new Error(json.message);

  return json;
};

export default function useGetProjects(): UseQueryResult<ProjectResponse, Error> {
    return useQuery<ProjectResponse, Error>({
        queryKey: ["projects"],
        queryFn: () => fetchProjects(),
        staleTime: 1000 * 60 * 5,
    });
}
