import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast, Toaster } from "sonner";

type ResponseType = InferResponseType<typeof client.api.profile.create.$post>;
type RequestType = InferRequestType<
  typeof client.api.profile.create.$post
>["json"];

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.profile.create.$post({ json });

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("Username already exists");
        } else {
          toast.error("Failed to create account");
        }
        throw new Error("Failed request");
      }

      const data = await response.json();
      queryClient.invalidateQueries({ queryKey: ["default"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Account created successfully");
      return data;
    },
  });
};
