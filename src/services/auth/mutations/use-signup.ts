import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/services/api";

export default function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
