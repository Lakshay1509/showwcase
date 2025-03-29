import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"


type ResponseType = InferResponseType<(typeof client.api.metadata)["$post"]>
type RequestType = InferRequestType<(typeof client.api.metadata)["$post"]>["json"]

export const useGetMetdata = ()=>{


    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.metadata["$post"]({
                json,
            });

            return response.json();
        },
        
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['tech']});
            toast.success("Tech fetched successfully.");
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to fetch tech");
            
        }
    })

    

}
