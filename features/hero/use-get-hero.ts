import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetHero = (username: string) => {
  const query = useQuery({
    enabled: !!username,
    queryKey: ['hero', { username }],
    queryFn: async () => {
      const response = await client.api.hero.user[":username"].$get({
        param: { username },
      });

      if (!response.ok) throw new Error("Failed to fetch hero.");

      const data = await response.json();

      return data || {};
    },
  });

  return query;
};