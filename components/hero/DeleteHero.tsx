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

import { useDeleteHero } from "@/features/hero/use-delete-hero";
import { Trash} from "lucide-react";




interface DeleteHeroProps {
    id : string
}

const DeleteHero = ({id}:DeleteHeroProps) => {

    const mutation = useDeleteHero(id);


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
              This action cannot be undone. This will permanently delete your project 
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

export default DeleteHero;
