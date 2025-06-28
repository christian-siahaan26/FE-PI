import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "@/services/api";

export function useComplaints(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  statusFilter: boolean | undefined
) {
  return useQuery({
    queryKey: ["complaints", page, limit, search, statusFilter],
    queryFn: () => getComplaints(page, limit, search, statusFilter),
    placeholderData: (previousData) => previousData ?? undefined,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5,
    // retry: 2,
  });
}
