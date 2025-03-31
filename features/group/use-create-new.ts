import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.group.create.$post>
type RequestType = InferRequestType<typeof client.api.group.create.$post>["json"]

export const useCreateGroup = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.group.create.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['group']});
            toast.success("Group created successfully")

        },
        onError:(error)=>{
            console.error(error);
            toast.error("Error creating group")
            
        }
    })

    

}
