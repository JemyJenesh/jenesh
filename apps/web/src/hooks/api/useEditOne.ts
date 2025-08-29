import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type QueryOptions = {
  path: string;
  queryKey: string;
  message?: {
    success: string;
    error?: string;
  };
  redirectTo?: string;
};

export const useEditOne = <R, B>({
  path,
  queryKey,
  message,
  redirectTo,
}: QueryOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: B): Promise<R> => {
      const response = await axiosInstance.put(path, body);

      return response.data;
    },
    onSuccess: async () => {
      if (redirectTo) {
        redirect(redirectTo);
      }

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (message?.success) toast.success(message.success);
    },
    onError: async () => {
      if (message?.error) toast.error(message.error);
    },
  });
};
