// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { DashboardStatisticsResponse } from "@/types/statistics";

const fetchStatistics = async (): Promise<DashboardStatisticsResponse> => {
  const res = await fetch("/api/statics/get");
  const result = await res.json();

  return result;
};

export default function useGetStatistics(): UseQueryResult<DashboardStatisticsResponse> {
  return useQuery({
    queryKey: ["statics"],
    queryFn: fetchStatistics,
    staleTime: 1000 * 60 * 5,
  });
}
