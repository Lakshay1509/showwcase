import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUser = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["users", { id }],
    queryFn: async () => {
      const response = await client.api.profile[":id"].$get({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to fetch account.");

      const data = await response.json();

      
      
     
      return data || {};
    },
  });

  return query;
};