import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteAccount } from "@/features/group/use-delete-group";
import { Trash} from "lucide-react";
import { Button } from "./ui/button";



interface DeleteGroupProps {
    id : string
}

const DeleteGroup = ({id}:DeleteGroupProps) => {

    const mutation = useDeleteAccount(id);


    const handleSubmit = () => {

       mutation.mutate();
        
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger>
            <Trash className="h-4 w-4 cursor-pointer"/>
            </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your group
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
};

export default DeleteGroup;
