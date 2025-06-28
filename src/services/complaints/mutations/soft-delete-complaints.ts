import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComplaint } from "@/services/api";

export function useDeleteComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
}
