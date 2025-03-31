import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.hero.create.$post>
type RequestType = InferRequestType<typeof client.api.hero.create.$post>["json"]

export const useCreateHero = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.hero.create.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            
            queryClient.invalidateQueries({queryKey:['hero']});
            toast.success("Created Successfully")
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Error creating")
            
        }
    })

    

}
