import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.group.update)[":id"]["$post"]>
type RequestType = InferRequestType<(typeof client.api.group.update)[":id"]["$post"]>["json"]

export const useUpdateTech = (id:string)=>{


    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.group.update[":id"]["$post"]({
                json,
                param:{
                    id
                }
            });

            return response.json();
        },
        
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['group']});
            toast.success("Tech updated.");
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to update tech");
            
        }
    })

    

}
