import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.profile.update)["$patch"]>
type RequestType = InferRequestType<(typeof client.api.profile.update)["$patch"]>["json"]

export const useEditAccount = (id:string)=>{


    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json: RequestType) => {
            
                const response = await client.api.profile.update["$patch"]({ json });

                if (!response.ok) {
                    if (response.status === 409) {
                        toast.error("Username already exists");
                    } else {
                        toast.error("Failed to update account");
                    }
                    throw new Error("Failed request");
                }

                const data = await response.json();
                queryClient.invalidateQueries({ queryKey: ["default"] });
                queryClient.invalidateQueries({ queryKey: ["users"] });
                toast.success("Account updated successfully");
                return data;

            
        },
    
        // onSuccess:()=>{
            
        //     queryClient.invalidateQueries({queryKey:['users']});
        //     queryClient.invalidateQueries({queryKey:['default']});
        //     toast.success("Account updated successfully");
            
        // },
        // onError:()=>{
            
        //     toast.error("Failed to update account");
            
        // }
    })

    

}
