import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import CreateNewGroup from "./AddGroupForm";
import { useCreateGroup } from "@/features/group/use-create-new";
import {z} from "zod"
  
  
const formSchema = z.object({
    name: z.string().min(3).max(20),
  });
  
  type FormValues = z.infer<typeof formSchema>;
  
  const AddGroup = () => {

    const mutation = useCreateGroup();

    const onSubmit = (values:FormValues)=>{

        mutation.mutate(values)

    }


    return (
      <div>
        <Sheet >
          <SheetTrigger >
           <div className="px-2 py-1 bg-black text-white rounded-lg text-sm ">Add Group</div>
          </SheetTrigger>
          <SheetContent className="p-1">
          <SheetHeader>
          <SheetTitle>Add the name of the group to create</SheetTitle>
          
            </SheetHeader>
              
            <CreateNewGroup onSubmit={onSubmit} disabled={mutation.isPending}/>
          </SheetContent>
        </Sheet>
      </div>
    );
  };
  
  export default AddGroup;
  