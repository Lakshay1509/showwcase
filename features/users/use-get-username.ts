import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUsername = (username: string) => {
  const query = useQuery({
    enabled: !!username,
    queryKey: ["users", { username }],
    queryFn: async () => {
      const response = await client.api.profile.username[":username"].$get({
        param: { username },
      });

      if (!response.ok) throw new Error("Failed to fetch account.");

      const data = await response.json();

      
      
      // Return the data object or an empty object to avoid undefined
      return data || {};
    },
  });

  return query;
};