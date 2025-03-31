import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

interface EditTagsSheetProps {
  defaultValues?: string[];
}
  
import MultiSelectTags from "./MultiSelectTags";
  
  
  
  
  const EditTagsSheet = ({defaultValues}:EditTagsSheetProps) => {
    return (
      <div>
        <Sheet >
          <SheetTrigger>
           <div className="mt-4  px-2 py-1 bg-black text-white rounded-lg text-sm ">Edit Tags</div>
          </SheetTrigger>
          <SheetContent className="p-1">
          <SheetHeader>
          <SheetTitle>Add or edit the tags</SheetTitle>
          
            </SheetHeader>
              <MultiSelectTags defaultValues={defaultValues} />
            
          </SheetContent>
        </Sheet>
      </div>
    );
  };
  
  export default EditTagsSheet;
  