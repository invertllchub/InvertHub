import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";

const fetchProject = async (id: string): Promise<Project> => {
  const res = await fetch(`/api/projects/getOne?id=${id}`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetProject(id: string, p0: { enabled: boolean; }) {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => fetchProject(id),
        enabled: !!id,
    });
}
