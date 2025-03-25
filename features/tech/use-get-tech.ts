import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTech = () => {
  const query = useQuery({

    queryKey: ["tech",],
    queryFn: async () => {
      const response = await client.api.tech.$get();

      if (!response.ok) throw new Error("Failed to fetch tech.");

      const data = await response.json();

      
      
     
      return data || {};
    },
  });

  return query;
};