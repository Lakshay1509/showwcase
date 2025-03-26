import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet";
  import { Button } from "./ui/button";
  import { Pencil } from "lucide-react"; 
import MultiSelectForm from "./MultiSelectForm";
  
  interface EditTechSheetProps {
    id : string;
    name: string;
    techs: {
      id: number;
      name: string;
      img_url?: string | null;
    }[];
  }
  
  const EditTechSheet = ({ name, techs,id }: EditTechSheetProps) => {

    const techIds = techs.map(tech => String(tech.id));

    
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit {name}</SheetTitle>
            <SheetDescription>
              Manage technologies in the {name} group
            </SheetDescription>
          </SheetHeader>
          <MultiSelectForm defaultValues={techIds} id={id}/>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default EditTechSheet;