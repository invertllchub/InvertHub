import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types/jobs";

const fetchJob = async (id: string): Promise<Job> => {
  const res = await fetch(`/api/jobs/getOne?id=${id}`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetJob(id: string, p0: { enabled: boolean; }) {
    return useQuery({
        queryKey: ["job", id],
        queryFn: () => fetchJob(id),
        enabled: !!id,
    });
}
