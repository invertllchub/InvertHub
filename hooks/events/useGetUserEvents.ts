import { useQuery } from "@tanstack/react-query";
import { Events } from "@/types/events";

const fetchUserEvents= async (id: string): Promise<Events[]> => {
  const res = await fetch(`/api/events/getOne?id=${id}`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetUserEvents(id: string, p0: { enabled: boolean; }) {
    return useQuery({
        queryKey: ["user-events", id],
        queryFn: () => fetchUserEvents(id),
        enabled: !!id,
    });
}
