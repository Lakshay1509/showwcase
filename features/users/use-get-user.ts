import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUser = () => {
  const query = useQuery({
    
    queryKey: [""],
    queryFn: async () => {
      const response = await client.api.profile.default.$get({
        
      });

      if (!response.ok) throw new Error("Failed to fetch account.");

      const data = await response.json();

      return data || {};
    },
  });

  return query;
};