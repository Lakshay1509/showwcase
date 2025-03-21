import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.profile.update)[":id"]["$patch"]>
type RequestType = InferRequestType<(typeof client.api.profile.update)[":id"]["$patch"]>["json"]

export const useEditAccount = (id:string)=>{

    // if(id === " "){
    //     throw new Error("User id is required");
    // }

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
        },
        onError:(error)=>{
            console.error(error);
            
        }
    })

    

}
