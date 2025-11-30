import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "@/types/users";

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  errors: any;
  data: {
    data: User[];
    pagination: PaginationInfo;
  };
}

export const fetchUsers = async (page: number, limit: number, searchValue: string): Promise<UsersResponse> => {
  const res = await fetch(`/api/users/getAll?SearchPram=${searchValue}&pageNumber=${page}&rowsNumber=${limit}`);
  const json = await res.json();

  if (!res.ok) throw new Error(json.message || "Failed to fetch users");

  return json;
};

export default function useGetUsers(currentPage: number, limit: number, searchValue: string): UseQueryResult<UsersResponse, Error> {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", currentPage, searchValue],
    queryFn: () => fetchUsers(currentPage, limit, searchValue),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 3
  });
}
