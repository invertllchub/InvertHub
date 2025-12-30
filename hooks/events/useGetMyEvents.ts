import { useQuery } from "@tanstack/react-query";
import { Events } from "@/types/events";

const fetchMyEvents = async (): Promise<Events[]> => {
  const res = await fetch(`/api/events/getMyLogs`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetMyEvents() {
    return useQuery({
        queryKey: ["my-events"],
        queryFn: () => fetchMyEvents(),
    });
}
