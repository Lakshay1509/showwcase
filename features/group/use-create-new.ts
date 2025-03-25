import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"


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
        },
        onError:(error)=>{
            console.error(error);
            
        }
    })

    

}
