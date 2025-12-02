// React Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { Activity } from "@/types/activities";


const fetchUserActivities = async (): Promise<Activity[]> => {
    const res = await fetch('/api/activities/getOne');
    const result = await res.json()

    return result ?? []
};

export default function useGetUserActivities (): UseQueryResult<Activity[]> {
    return useQuery({
        queryKey: ["userActivities"],
        queryFn: fetchUserActivities,
        staleTime: 1000 * 60 * 5
    })
}