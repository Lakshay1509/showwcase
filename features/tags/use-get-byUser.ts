import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTagsByUser = () => {
  const query = useQuery({
    
    queryKey: ["getTagsByUser"],
    queryFn: async () => {
      const response = await client.api.tags.user.$get({

      });

      if (!response.ok) throw new Error("Failed to fetch account.");

      const data = await response.json();

      
      
     
      return data || {};
    },
  });

  return query;
};