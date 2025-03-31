import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTagsByUser = (username:string) => {
  const query = useQuery({
    
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await client.api.tags.user[":username"].$get({

        param: { username }

      });

      if (!response.ok) throw new Error("Failed to fetch account.");

      const data = await response.json();
     
      return data || {};
    },
  });

  return query;
};