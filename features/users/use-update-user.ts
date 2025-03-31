import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.profile.update)[":id"]["$patch"]>
type RequestType = InferRequestType<(typeof client.api.profile.update)[":id"]["$patch"]>["json"]

export const useEditAccount = (id:string)=>{


    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.profile.update[":id"]["$patch"]({
                json,
                param:{
                    id
                }
            });

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['users']});
            toast.success("Account updated successfully");
            
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to update account");
            
        }
    })

    

}
