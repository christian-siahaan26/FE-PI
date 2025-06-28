import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComplaint } from "@/services/api";
import { UpdateComplaintDto } from "@/types/complaint";

export function useUpdateComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (complaintData: UpdateComplaintDto) => updateComplaint(complaintData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["complaintsCompletes"] });
    },
  });
}
