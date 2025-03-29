import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.tech.$post>
type RequestType = InferRequestType<typeof client.api.tech.$post>["json"]

export const useCreateTech = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.tech.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['tech']});
            toast.success("Tech created successfully.");
        },
        onError:()=>{
            toast.error("Failed to create tech");
            
        }
    })

    

}
