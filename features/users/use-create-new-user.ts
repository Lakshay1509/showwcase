import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.profile.create.$post>
type RequestType = InferRequestType<typeof client.api.profile.create.$post>["json"]

export const useCreateAccount = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.profile.create.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['users', 'group','tech', 'tags']});
        },
        onError:(error)=>{
            console.error(error);
            
        }
    })

    

}
