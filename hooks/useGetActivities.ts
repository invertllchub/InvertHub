// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { Activity } from "@/types/activities";


const fetchActivities = async (): Promise<Activity[]> => {
    const res = await fetch('/api/activities/get');
    const result = await res.json()

    return result ?? []
};

export default function useGetActivities (): UseQueryResult<Activity[]> {
    return useQuery({
        queryKey: ["activities"],
        queryFn: fetchActivities,
        staleTime: 1000 * 60 * 5
    })
}