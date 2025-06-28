import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/services/api";

export default function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
