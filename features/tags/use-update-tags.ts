import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.tags.update)["$post"]>
type RequestType = InferRequestType<(typeof client.api.tags.update)["$post"]>["json"]

export const useUpdateTags = ()=>{


    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.tags.update["$post"]({
                json,
            });

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['tags','get']});
        },
        onError:(error)=>{
            console.error(error);
            
        }
    })

    

}
