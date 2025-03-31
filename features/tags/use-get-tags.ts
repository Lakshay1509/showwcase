import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTags = () => {
  const query = useQuery({
    queryKey: ["defaultTags"],
    queryFn: async () => {
      try {
        const response = await client.api.tags.$get();
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tags: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.tags) {
          throw new Error("Invalid data format received");
        }

        return data;
      } catch (error) {
        console.error("Tags fetch error:", error);
        throw error;
      }
    },
  });

  return query;
};