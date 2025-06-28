import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComplaints } from "@/services/api";

export function useCreateComplaints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComplaints,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
}
