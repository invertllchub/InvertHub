// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { AuditSummaryResponse } from "@/types/events";


const fetchLastEvents = async (): Promise<AuditSummaryResponse> => {
    const res = await fetch('/api/events/get');
    const result = await res.json()

    return result 
};

export default function useGetLastEvents (): UseQueryResult<AuditSummaryResponse> {
    return useQuery({
        queryKey: ["last-events"],
        queryFn: fetchLastEvents,
        staleTime: 1000 * 60 * 5
    })
}