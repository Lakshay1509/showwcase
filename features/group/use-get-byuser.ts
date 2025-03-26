import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUserGroup = (username: string) => {
  const query = useQuery({
    enabled: !!username,
    queryKey: ['group', { username }],
    queryFn: async () => {
      const response = await client.api.group.user[":username"].$get({
        param: { username },
      });

      if (!response.ok) throw new Error("Failed to fetch groups.");

      const data = await response.json();

      return data || {};
    },
  });

  return query;
};