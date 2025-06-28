import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "@/services/api";

export function useCompleteComplaints() {
  return useQuery({
    queryKey: ["complaintsCompletes"],
    queryFn: () => getComplaints(),
  });
}
