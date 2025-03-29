import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AddMetadataHero from "./AddMetadataHero";




const AddHero = () => {
  return (
    <div>
      <Sheet >
        <SheetTrigger>
         <div className="px-2 py-1 bg-[#D4AF37] text-white rounded-lg text-sm ">Add Hero</div>
        </SheetTrigger>
        <SheetContent className="p-1">
        <SheetHeader>
        <SheetTitle>Add the url of the product to add</SheetTitle>
        
          </SheetHeader>
            <AddMetadataHero />
          
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddHero;
