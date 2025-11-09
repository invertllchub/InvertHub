// Types
import { Project } from "@/types/project";
// Supabase
import { supabase } from "@/lib/supabaseClient";
// React Query
import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";

const fetchProjects = async (): Promise<Project[]> => {
    const { data} = await supabase
        .from("projects")
        .select("*")

    return data ?? [];
};

export default function useGetProjects(
    options?: Partial<UseQueryOptions<Project[], Error>>
): UseQueryResult<Project[]> {
    return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, 
    ...options,
    });
}
