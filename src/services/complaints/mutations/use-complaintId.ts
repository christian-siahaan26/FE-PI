import { R_TOKEN } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export function useComplaintById(complaintId: number) {
  return useQuery({
    queryKey: ["getComplaintById", complaintId],
    queryFn: async () => {
      const response = await fetch(
        `https://be-complaints.vercel.app/api/complaints/${complaintId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(R_TOKEN)}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch complaint data");
      }
      return response.json();
    },
    enabled: !!complaintId,
  });
}
