// Reqct Query
import { useQuery, UseQueryResult } from "@tanstack/react-query";
// Types
import { Job } from "@/types/jobs";
// Supabse
import { supabase } from "@/lib/supabaseClient";

const fetchJobs = async (): Promise<Job[]> => {
    const {data} = await supabase
    .from("jobs")
    .select("*")

    return data ?? []
};

export default function useGetJobs (): UseQueryResult<Job[]> {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
        staleTime: 1000 * 60 * 5
    })
};