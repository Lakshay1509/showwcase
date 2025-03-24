import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import MetadataForm from "./AddTech";




const AddTechStack = () => {
  return (
    <div>
      <Sheet >
        <SheetTrigger>
         <div className="px-2 py-1 bg-black text-white rounded-lg text-sm ">Add</div>
        </SheetTrigger>
        <SheetContent className="p-1">
        <SheetHeader>
        <SheetTitle>Add the url of the tool to add</SheetTitle>
        
          </SheetHeader>
            <MetadataForm />
          
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddTechStack;
