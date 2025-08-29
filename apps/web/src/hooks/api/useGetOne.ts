import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type QueryOptions = {
  path: string;
  queryKey: string;
  id: string;
};

export const useGetOne = <R>({ path, queryKey, id }: QueryOptions) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async (): Promise<R> => {
      const response = await axiosInstance.get(path);

      return response.data;
    },
  });
};
