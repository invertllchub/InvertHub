import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/users";

const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(`/api/users/getOne?id=${id}`);
  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result.data.data;
};

export default function useGetUser(id: string, p0: { enabled: boolean; }) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}
