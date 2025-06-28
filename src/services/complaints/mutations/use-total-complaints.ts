import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "@/services/api";

export function useTotalComplaints() {
  return useQuery({
    queryKey: ["complaintsCompletes"],
    queryFn: () => getComplaints(),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5,
    // retry: 2,
  });
}
